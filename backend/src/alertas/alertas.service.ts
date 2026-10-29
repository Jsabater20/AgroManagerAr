import { Injectable } from '@nestjs/common';
import { EstadoActividad, TipoCostoProductivo, TipoRecursoActividad } from '@prisma/client';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { PrismaService } from '../prisma/prisma.service';

export type AlertaOperativa = {
  id: string;
  tipo: 'TRABAJO_VENCIDO' | 'COSTO_SUPERA_ESTIMADO';
  severidad: 'ADVERTENCIA' | 'CRITICA';
  titulo: string;
  mensaje: string;
  enlace: string;
  organizacionId: number;
  dedupeKey: string;
};

type CostoAgrupado = {
  organizacionId: number;
  recurso: string;
  etiqueta: string;
  estimado: number;
  real: number;
};

const ESTADOS_ACTIVOS: EstadoActividad[] = [
  EstadoActividad.PENDIENTE,
  EstadoActividad.EN_PROGRESO,
  EstadoActividad.PAUSADA,
];

@Injectable()
export class AlertasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
    private readonly notificacionesService: NotificacionesService,
  ) {}

  async obtenerParaOrganizacion(usuarioId: number, organizacionId: number) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Dashboard',
    );
    const campoIds = acceso.esOwner
      ? undefined
      : (await this.prisma.asignacionCampo.findMany({
          where: {
            usuarioOrganizacionId: acceso.usuarioOrganizacionId,
            activo: true,
          },
          select: { campoId: true },
        })).map((asignacion) => asignacion.campoId);
    const alertas = await this.listarParaOrganizaciones([organizacionId], campoIds);

    if (acceso.esOwner) {
      await this.sincronizarNotificacionesOwner(alertas);
    }

    return alertas;
  }

  async listarParaOrganizaciones(
    organizacionIds: number[],
    campoIds?: number[],
  ): Promise<AlertaOperativa[]> {
    if (!organizacionIds.length || (campoIds && !campoIds.length)) return [];

    const inicioHoy = new Date();
    inicioHoy.setHours(0, 0, 0, 0);
    const [actividades, costos] = await Promise.all([
      this.prisma.actividadMiembro.findMany({
        where: {
          organizacionId: { in: organizacionIds },
          activo: true,
          estado: { in: ESTADOS_ACTIVOS },
          fechaEstimadaFin: { lt: inicioHoy },
        },
        select: {
          id: true,
          organizacionId: true,
          titulo: true,
          fechaEstimadaFin: true,
          recursoTipo: true,
          recursoId: true,
        },
        orderBy: { fechaEstimadaFin: 'asc' },
        take: 40,
      }),
      this.prisma.costoProductivo.findMany({
        where: {
          organizacionId: { in: organizacionIds },
          ...(campoIds ? { campoId: { in: campoIds } } : {}),
        },
        select: {
          organizacionId: true,
          tipo: true,
          monto: true,
          campoId: true,
          loteId: true,
          campaniaId: true,
          campo: { select: { nombre: true } },
          lote: { select: { nombre: true } },
          campania: { select: { nombre: true } },
        },
      }),
    ]);

    const actividadesVisibles = campoIds
      ? await this.filtrarActividadesPorCampos(actividades, campoIds)
      : actividades;
    const alertasTrabajos = actividadesVisibles.map((actividad) => {
      const dias = Math.max(
        1,
        Math.floor((inicioHoy.getTime() - actividad.fechaEstimadaFin!.getTime()) / 86_400_000),
      );
      const severidad = dias >= 7 ? 'CRITICA' as const : 'ADVERTENCIA' as const;
      return {
        id: `trabajo-vencido-${actividad.id}`,
        tipo: 'TRABAJO_VENCIDO' as const,
        severidad,
        titulo: `Trabajo vencido: ${actividad.titulo}`,
        mensaje: `Superó su fecha estimada hace ${dias} día${dias === 1 ? '' : 's'}.`,
        enlace: `/org/${actividad.organizacionId}/tareas`,
        organizacionId: actividad.organizacionId,
        dedupeKey: `alerta-trabajo-vencido-${actividad.id}`,
      };
    });

    const costosAgrupados = new Map<string, CostoAgrupado>();
    for (const costo of costos) {
      const destino = this.obtenerDestinoCosto(costo);
      if (!destino) continue;
      const key = `${costo.organizacionId}:${destino.recurso}`;
      const grupo = costosAgrupados.get(key) ?? {
        organizacionId: costo.organizacionId,
        recurso: destino.recurso,
        etiqueta: destino.etiqueta,
        estimado: 0,
        real: 0,
      };
      if (costo.tipo === TipoCostoProductivo.REAL) grupo.real += Number(costo.monto);
      else grupo.estimado += Number(costo.monto);
      costosAgrupados.set(key, grupo);
    }
    const alertasCostos = [...costosAgrupados.values()]
      .filter((grupo) => grupo.estimado > 0 && grupo.real > grupo.estimado * 1.15)
      .map((grupo) => {
        const exceso = Math.round(((grupo.real / grupo.estimado) - 1) * 100);
        const severidad = exceso >= 35 ? 'CRITICA' as const : 'ADVERTENCIA' as const;
        return {
          id: `costo-supera-estimado-${grupo.organizacionId}-${grupo.recurso}`,
          tipo: 'COSTO_SUPERA_ESTIMADO' as const,
          severidad,
          titulo: `Costo por encima de lo previsto: ${grupo.etiqueta}`,
          mensaje: `El costo real supera la proyección en ${exceso}% (${this.formatearPesos(grupo.real)} real vs. ${this.formatearPesos(grupo.estimado)} estimado).`,
          enlace: `/org/${grupo.organizacionId}/rentabilidad`,
          organizacionId: grupo.organizacionId,
          dedupeKey: `alerta-costo-supera-estimado-${grupo.organizacionId}-${grupo.recurso}`,
        };
      });

    return [...alertasTrabajos, ...alertasCostos]
      .sort((a, b) => Number(b.severidad === 'CRITICA') - Number(a.severidad === 'CRITICA'));
  }

  private async sincronizarNotificacionesOwner(alertas: AlertaOperativa[]) {
    const organizacionIds = [...new Set(alertas.map((alerta) => alerta.organizacionId))];
    if (!organizacionIds.length) return;
    const organizaciones = await this.prisma.organizacion.findMany({
      where: { id: { in: organizacionIds } },
      select: { id: true, propietarioId: true },
    });
    const ownerPorOrganizacion = new Map(
      organizaciones.map((organizacion) => [organizacion.id, organizacion.propietarioId]),
    );
    await Promise.all(alertas.map((alerta) => {
      const ownerId = ownerPorOrganizacion.get(alerta.organizacionId);
      if (!ownerId) return Promise.resolve(false);
      return this.notificacionesService.crearNotificacionSiNoExiste(ownerId, {
        tipo: 'ALERTA_OPERATIVA',
        titulo: alerta.titulo,
        mensaje: alerta.mensaje,
        enlace: alerta.enlace,
        dedupeKey: alerta.dedupeKey,
      });
    }));
  }

  private async filtrarActividadesPorCampos<T extends {
      recursoTipo: TipoRecursoActividad;
      recursoId: number | null;
    }>(
    actividades: T[],
    campoIds: number[],
  ): Promise<T[]> {
    const idsPorTipo = new Map<TipoRecursoActividad, number[]>();
    for (const actividad of actividades) {
      if (!actividad.recursoId) continue;
      const ids = idsPorTipo.get(actividad.recursoTipo) ?? [];
      ids.push(actividad.recursoId);
      idsPorTipo.set(actividad.recursoTipo, ids);
    }
    const [lotes, siembras, maquinarias] = await Promise.all([
      this.prisma.lote.findMany({ where: { id: { in: idsPorTipo.get(TipoRecursoActividad.LOTE) ?? [] } }, select: { id: true, campoId: true } }),
      this.prisma.siembra.findMany({ where: { id: { in: idsPorTipo.get(TipoRecursoActividad.SIEMBRA) ?? [] } }, select: { id: true, lote: { select: { campoId: true } } } }),
      this.prisma.maquinaria.findMany({ where: { id: { in: idsPorTipo.get(TipoRecursoActividad.MAQUINARIA) ?? [] } }, select: { id: true, campoId: true } }),
    ]);
    const loteCampo = new Map(lotes.map((lote) => [lote.id, lote.campoId]));
    const siembraCampo = new Map(siembras.map((siembra) => [siembra.id, siembra.lote.campoId]));
    const maquinariaCampo = new Map(maquinarias.map((maquinaria) => [maquinaria.id, maquinaria.campoId]));
    const camposPermitidos = new Set(campoIds);

    return actividades.filter((actividad) => {
      if (!actividad.recursoId) return false;
      if (actividad.recursoTipo === TipoRecursoActividad.CAMPO) {
        return camposPermitidos.has(actividad.recursoId);
      }
      if (actividad.recursoTipo === TipoRecursoActividad.LOTE) {
        return camposPermitidos.has(loteCampo.get(actividad.recursoId) ?? 0);
      }
      if (actividad.recursoTipo === TipoRecursoActividad.SIEMBRA) {
        return camposPermitidos.has(siembraCampo.get(actividad.recursoId) ?? 0);
      }
      if (actividad.recursoTipo === TipoRecursoActividad.MAQUINARIA) {
        return camposPermitidos.has(maquinariaCampo.get(actividad.recursoId) ?? 0);
      }
      return false;
    });
  }

  private obtenerDestinoCosto(costo: {
    loteId: number | null;
    campaniaId: number | null;
    campoId: number | null;
    lote: { nombre: string } | null;
    campania: { nombre: string } | null;
    campo: { nombre: string } | null;
  }) {
    if (costo.loteId && costo.lote) {
      return { recurso: `LOTE:${costo.loteId}`, etiqueta: `Lote ${costo.lote.nombre}` };
    }
    if (costo.campaniaId && costo.campania) {
      return { recurso: `CAMPANIA:${costo.campaniaId}`, etiqueta: `Campaña ${costo.campania.nombre}` };
    }
    if (costo.campoId && costo.campo) {
      return { recurso: `CAMPO:${costo.campoId}`, etiqueta: `Campo ${costo.campo.nombre}` };
    }
    return null;
  }

  private formatearPesos(valor: number) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
