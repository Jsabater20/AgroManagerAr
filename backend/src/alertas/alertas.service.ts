import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EstadoActividad, Prisma, TipoCostoProductivo, TipoRecursoActividad } from '@prisma/client';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { MailerService } from '../mailer/mailer.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePreferenciasAlertasDto } from './dto/update-preferencias-alertas.dto';

export type AlertaOperativa = {
  id: string;
  tipo:
    | 'TRABAJO_VENCIDO'
    | 'TRABAJO_SIN_INICIAR'
    | 'TRABAJO_COMIENZA_HOY'
    | 'TRABAJO_PROXIMO_A_VENCER'
    | 'ACTIVIDAD_COMPLETADA_SIN_COSTO_REAL'
    | 'MAQUINARIA_MANTENIMIENTO_VENCIDO'
    | 'MAQUINARIA_MANTENIMIENTO_PROXIMO'
    | 'MAQUINARIA_SEGURO_VENCIDO'
    | 'MAQUINARIA_SEGURO_PROXIMO_A_VENCER'
    | 'MAQUINARIA_VTV_VENCIDA'
    | 'MAQUINARIA_VTV_PROXIMA_A_VENCER'
    | 'COSTO_SUPERA_ESTIMADO';
  severidad: 'ADVERTENCIA' | 'CRITICA';
  titulo: string;
  mensaje: string;
  enlace: string;
  organizacionId: number;
  dedupeKey: string;
  origenTipo: string;
  origenId: string;
};

type CostoAgrupado = {
  organizacionId: number;
  recurso: string;
  etiqueta: string;
  estimado: number;
  real: number;
};

type EstadoAlertaGestion = 'ACTIVA' | 'REVISADA' | 'RESUELTA';
type SeveridadAlertaGestion = 'INFORMATIVA' | 'ATENCION' | 'PRIORITARIA';

type FiltroAlertasGestion = {
  estado?: string;
  severidad?: string;
};

const PREFERENCIAS_ALERTAS_POR_DEFECTO = {
  alertasActivas: true,
  notificacionEnApp: true,
  notificacionPush: true,
  notificacionEmail: false,
  soloPrioritarias: false,
};

const ESTADOS_ACTIVOS: EstadoActividad[] = [
  EstadoActividad.PENDIENTE,
  EstadoActividad.EN_PROGRESO,
  EstadoActividad.PAUSADA,
];

@Injectable()
export class AlertasService {
  private readonly logger = new Logger(AlertasService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
    private readonly planService: PlanService,
    private readonly notificacionesService: NotificacionesService,
    private readonly mailerService: MailerService,
  ) {}

  async obtenerPreferencias(usuarioId: number, organizacionId: number) {
    await this.requerirOwnerDashboard(usuarioId, organizacionId);
    const [preferencias, usuario] = await Promise.all([
      this.prisma.preferenciaAlerta.findUnique({
        where: { usuarioId_organizacionId: { usuarioId, organizacionId } },
      }),
      this.prisma.usuario.findUnique({
        where: { id: usuarioId },
        select: { emailVerificado: true },
      }),
    ]);

    return {
      ...PREFERENCIAS_ALERTAS_POR_DEFECTO,
      ...preferencias,
      emailVerificado: usuario?.emailVerificado ?? false,
    };
  }

  async actualizarPreferencias(
    usuarioId: number,
    organizacionId: number,
    datos: UpdatePreferenciasAlertasDto,
  ) {
    await this.requerirOwnerDashboard(usuarioId, organizacionId);
    const preferencias = await this.prisma.preferenciaAlerta.upsert({
      where: { usuarioId_organizacionId: { usuarioId, organizacionId } },
      create: { usuarioId, organizacionId, ...PREFERENCIAS_ALERTAS_POR_DEFECTO, ...datos },
      update: datos,
    });
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { emailVerificado: true },
    });

    return { ...preferencias, emailVerificado: usuario?.emailVerificado ?? false };
  }

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

    if (acceso.esOwner) await this.sincronizarAlertasPersistentes(organizacionId, alertas);

    return alertas;
  }

  async listarGestion(
    usuarioId: number,
    organizacionId: number,
    filtro: FiltroAlertasGestion = {},
  ) {
    await this.requerirOwnerDashboard(usuarioId, organizacionId);
    await this.actualizarAlertasGestion(organizacionId);

    const where: Prisma.AlertaGestionWhereInput = { organizacionId };
    if (filtro.estado) {
      if (!this.esEstadoGestionValido(filtro.estado)) {
        throw new BadRequestException('Estado de alerta inválido');
      }
      where.estado = filtro.estado;
    }
    if (filtro.severidad) {
      if (!this.esSeveridadGestionValida(filtro.severidad)) {
        throw new BadRequestException('Severidad de alerta inválida');
      }
      where.severidad = filtro.severidad;
    }

    const alertas = await this.prisma.alertaGestion.findMany({
      where,
      include: {
        lecturas: {
          where: { usuarioId },
          select: { leidaEn: true },
        },
      },
      orderBy: { ultimaEvaluacionEn: 'desc' },
      take: 100,
    });

    return alertas.map(({ lecturas, ...alerta }) => ({
      ...alerta,
      leida: lecturas.length > 0,
    }));
  }

  async resumenGestion(usuarioId: number, organizacionId: number) {
    await this.requerirOwnerDashboard(usuarioId, organizacionId);
    await this.actualizarAlertasGestion(organizacionId);

    const activas = { organizacionId, estado: { in: ['ACTIVA', 'REVISADA'] } };
    const [total, prioritarias, sinLeer] = await Promise.all([
      this.prisma.alertaGestion.count({ where: activas }),
      this.prisma.alertaGestion.count({
        where: { ...activas, severidad: 'PRIORITARIA' },
      }),
      this.prisma.alertaGestion.count({
        where: {
          ...activas,
          lecturas: { none: { usuarioId } },
        },
      }),
    ]);

    return { total, prioritarias, sinLeer };
  }

  async marcarGestionLeida(
    usuarioId: number,
    organizacionId: number,
    alertaId: string,
  ) {
    await this.requerirOwnerDashboard(usuarioId, organizacionId);
    await this.obtenerAlertaGestion(organizacionId, alertaId);

    await this.prisma.alertaLectura.upsert({
      where: { alertaId_usuarioId: { alertaId, usuarioId } },
      update: { leidaEn: new Date() },
      create: { alertaId, usuarioId },
    });
    return { ok: true };
  }

  async revisarGestion(
    usuarioId: number,
    organizacionId: number,
    alertaId: string,
  ) {
    await this.requerirOwnerDashboard(usuarioId, organizacionId);
    await this.obtenerAlertaGestion(organizacionId, alertaId);

    await this.prisma.alertaGestion.updateMany({
      where: { id: alertaId, organizacionId, estado: 'ACTIVA' },
      data: { estado: 'REVISADA', revisadaEn: new Date() },
    });
    await this.prisma.alertaLectura.upsert({
      where: { alertaId_usuarioId: { alertaId, usuarioId } },
      update: { leidaEn: new Date() },
      create: { alertaId, usuarioId },
    });
    return { ok: true };
  }

  async listarParaOrganizaciones(
    organizacionIds: number[],
    campoIds?: number[],
  ): Promise<AlertaOperativa[]> {
    if (!organizacionIds.length || (campoIds && !campoIds.length)) return [];

    const inicioHoy = new Date();
    inicioHoy.setHours(0, 0, 0, 0);
    const inicioManana = new Date(inicioHoy);
    inicioManana.setDate(inicioManana.getDate() + 1);
    const inicioEnTresDias = new Date(inicioHoy);
    inicioEnTresDias.setDate(inicioEnTresDias.getDate() + 3);
    const haceTreintaDias = new Date(inicioHoy);
    haceTreintaDias.setDate(haceTreintaDias.getDate() - 30);
    const inicioEnQuinceDias = new Date(inicioHoy);
    inicioEnQuinceDias.setDate(inicioEnQuinceDias.getDate() + 15);
    const inicioEnTreintaYUnDias = new Date(inicioHoy);
    inicioEnTreintaYUnDias.setDate(inicioEnTreintaYUnDias.getDate() + 31);
    const organizacionesPro = (await Promise.all(
      organizacionIds.map(async (organizacionId) => ({
        organizacionId,
        esPro: await this.planService.isOrgPro(organizacionId),
      })),
    ))
      .filter((organizacion) => organizacion.esPro)
      .map((organizacion) => organizacion.organizacionId);
    const [actividades, costos, actividadesCompletadasSinCosto, maquinarias] = await Promise.all([
      this.prisma.actividadMiembro.findMany({
        where: {
          organizacionId: { in: organizacionIds },
          activo: true,
          estado: { in: ESTADOS_ACTIVOS },
          OR: [
            { fechaEstimadaFin: { lt: inicioEnTresDias } },
            {
              estado: EstadoActividad.PENDIENTE,
              fechaInicio: { lt: inicioManana },
            },
          ],
        },
        select: {
          id: true,
          organizacionId: true,
          titulo: true,
          fechaInicio: true,
          fechaEstimadaFin: true,
          estado: true,
          recursoTipo: true,
          recursoId: true,
        },
        orderBy: { fechaEstimadaFin: 'asc' },
        take: 40,
      }),
      this.prisma.costoProductivo.findMany({
        where: {
          organizacionId: { in: organizacionesPro },
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
      this.prisma.actividadMiembro.findMany({
        where: {
          organizacionId: { in: organizacionesPro },
          activo: true,
          estado: EstadoActividad.COMPLETADA,
          calculoOrigenId: { not: null },
          fechaRealFin: { gte: haceTreintaDias },
          costosProductivos: { none: { tipo: TipoCostoProductivo.REAL } },
        },
        select: {
          id: true,
          organizacionId: true,
          titulo: true,
          fechaRealFin: true,
          recursoTipo: true,
          recursoId: true,
        },
        orderBy: { fechaRealFin: 'desc' },
        take: 40,
      }),
      this.prisma.maquinaria.findMany({
        where: {
          organizacionId: { in: organizacionIds },
          ...(campoIds ? { campoId: { in: campoIds } } : {}),
        },
        select: {
          id: true,
          organizacionId: true,
          nombre: true,
          seguroVencimiento: true,
          vtvVencimiento: true,
          mantenimientos: {
            orderBy: { fecha: 'desc' },
            take: 1,
            select: { id: true, proximoMantenimiento: true },
          },
        },
      }),
    ]);

    const actividadesVisibles = campoIds
      ? await this.filtrarActividadesPorCampos(actividades, campoIds)
      : actividades;
    const alertasVencidos = actividadesVisibles
      .filter((actividad) => actividad.fechaEstimadaFin && actividad.fechaEstimadaFin < inicioHoy)
      .map((actividad) => {
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
        origenTipo: 'ACTIVIDAD_MIEMBRO',
        origenId: String(actividad.id),
      };
      });

    const alertasTrabajos: AlertaOperativa[] = [
      ...alertasVencidos,
      ...actividadesVisibles.flatMap((actividad): AlertaOperativa[] => {
        const fechaFin = actividad.fechaEstimadaFin;
        if (fechaFin && fechaFin < inicioHoy) return [];

        const base = {
          enlace: `/org/${actividad.organizacionId}/tareas`,
          organizacionId: actividad.organizacionId,
          origenTipo: 'ACTIVIDAD_MIEMBRO',
          origenId: String(actividad.id),
        };

        if (
          actividad.estado === EstadoActividad.PENDIENTE
          && actividad.fechaInicio < inicioHoy
        ) {
          const dias = Math.max(
            1,
            Math.floor((inicioHoy.getTime() - actividad.fechaInicio.getTime()) / 86_400_000),
          );
          return [{
            id: `trabajo-sin-iniciar-${actividad.id}`,
            tipo: 'TRABAJO_SIN_INICIAR',
            severidad: dias >= 7 ? 'CRITICA' : 'ADVERTENCIA',
            titulo: `Trabajo pendiente sin iniciar: ${actividad.titulo}`,
            mensaje: `Está programado desde hace ${dias} día${dias === 1 ? '' : 's'} y sigue pendiente.`,
            dedupeKey: `alerta-trabajo-sin-iniciar-${actividad.id}`,
            ...base,
          }];
        }

        if (fechaFin && fechaFin < inicioEnTresDias) {
          const dias = Math.max(
            0,
            Math.floor((fechaFin.getTime() - inicioHoy.getTime()) / 86_400_000),
          );
          return [{
            id: `trabajo-proximo-a-vencer-${actividad.id}`,
            tipo: 'TRABAJO_PROXIMO_A_VENCER',
            severidad: dias === 0 ? 'CRITICA' : 'ADVERTENCIA',
            titulo: `Trabajo próximo a vencer: ${actividad.titulo}`,
            mensaje: dias === 0
              ? 'Su fecha estimada de finalización es hoy.'
              : `Su fecha estimada de finalización es en ${dias} día${dias === 1 ? '' : 's'}.`,
            dedupeKey: `alerta-trabajo-proximo-a-vencer-${actividad.id}`,
            ...base,
          }];
        }

        if (
          actividad.estado === EstadoActividad.PENDIENTE
          && actividad.fechaInicio >= inicioHoy
          && actividad.fechaInicio < inicioManana
        ) {
          return [{
            id: `trabajo-comienza-hoy-${actividad.id}`,
            tipo: 'TRABAJO_COMIENZA_HOY',
            severidad: 'ADVERTENCIA',
            titulo: `Trabajo programado para hoy: ${actividad.titulo}`,
            mensaje: 'Todavía no fue iniciado. Confirmá que la persona responsable pueda realizarlo.',
            dedupeKey: `alerta-trabajo-comienza-hoy-${actividad.id}`,
            ...base,
          }];
        }

        return [];
      }),
    ];

    const actividadesCompletadasVisibles = campoIds
      ? await this.filtrarActividadesPorCampos(actividadesCompletadasSinCosto, campoIds)
      : actividadesCompletadasSinCosto;
    const alertasCostosPendientes: AlertaOperativa[] = actividadesCompletadasVisibles.map((actividad) => {
      const dias = Math.max(
        0,
        Math.floor((inicioHoy.getTime() - actividad.fechaRealFin!.getTime()) / 86_400_000),
      );
      return {
        id: `actividad-completada-sin-costo-real-${actividad.id}`,
        tipo: 'ACTIVIDAD_COMPLETADA_SIN_COSTO_REAL',
        severidad: dias >= 7 ? 'CRITICA' : 'ADVERTENCIA',
        titulo: `Falta registrar el costo real: ${actividad.titulo}`,
        mensaje: dias === 0
          ? 'El trabajo se completó hoy y todavía no tiene un costo real asociado.'
          : `El trabajo se completó hace ${dias} día${dias === 1 ? '' : 's'} y todavía no tiene un costo real asociado.`,
        enlace: `/org/${actividad.organizacionId}/tareas`,
        organizacionId: actividad.organizacionId,
        dedupeKey: `alerta-actividad-completada-sin-costo-real-${actividad.id}`,
        origenTipo: 'ACTIVIDAD_MIEMBRO',
        origenId: String(actividad.id),
      };
    });

    const alertasMaquinarias: AlertaOperativa[] = maquinarias.flatMap((maquinaria) => {
      const organizacionId = maquinaria.organizacionId;
      if (!organizacionId) return [];

      const crearAlertaPorFecha = (
        fecha: Date | null,
        limite: Date,
        tipos: { vencida: AlertaOperativa['tipo']; proxima: AlertaOperativa['tipo'] },
        etiqueta: string,
        dedupeKey: string,
        origenTipo: string,
        origenId: string,
      ): AlertaOperativa | null => {
        if (!fecha || fecha >= limite) return null;

        if (fecha < inicioHoy) {
          const dias = Math.max(
            1,
            Math.floor((inicioHoy.getTime() - fecha.getTime()) / 86_400_000),
          );
          return {
            id: dedupeKey,
            tipo: tipos.vencida,
            severidad: 'CRITICA',
            titulo: `${etiqueta} vencido: ${maquinaria.nombre}`,
            mensaje: `Venció hace ${dias} día${dias === 1 ? '' : 's'}. Registrá la renovación o el mantenimiento realizado.`,
            enlace: `/org/${organizacionId}/maquinarias/${maquinaria.id}`,
            organizacionId,
            dedupeKey,
            origenTipo,
            origenId,
          };
        }

        const dias = Math.max(
          0,
          Math.floor((fecha.getTime() - inicioHoy.getTime()) / 86_400_000),
        );
        return {
          id: dedupeKey,
          tipo: tipos.proxima,
          severidad: dias <= 7 ? 'CRITICA' : 'ADVERTENCIA',
          titulo: `${etiqueta} próximo: ${maquinaria.nombre}`,
          mensaje: dias === 0
            ? 'Vence hoy. Organizá la gestión necesaria para mantener el equipo disponible.'
            : `Vence en ${dias} día${dias === 1 ? '' : 's'}.`,
          enlace: `/org/${organizacionId}/maquinarias/${maquinaria.id}`,
          organizacionId,
          dedupeKey,
          origenTipo,
          origenId,
        };
      };

      const ultimoMantenimiento = maquinaria.mantenimientos[0] ?? null;
      return [
        crearAlertaPorFecha(
          ultimoMantenimiento?.proximoMantenimiento ?? null,
          inicioEnQuinceDias,
          {
            vencida: 'MAQUINARIA_MANTENIMIENTO_VENCIDO',
            proxima: 'MAQUINARIA_MANTENIMIENTO_PROXIMO',
          },
          'Mantenimiento',
          `alerta-maquinaria-mantenimiento-${ultimoMantenimiento?.id ?? maquinaria.id}`,
          'MANTENIMIENTO_MAQUINARIA',
          String(ultimoMantenimiento?.id ?? maquinaria.id),
        ),
        crearAlertaPorFecha(
          maquinaria.seguroVencimiento,
          inicioEnTreintaYUnDias,
          {
            vencida: 'MAQUINARIA_SEGURO_VENCIDO',
            proxima: 'MAQUINARIA_SEGURO_PROXIMO_A_VENCER',
          },
          'Seguro',
          `alerta-maquinaria-seguro-${maquinaria.id}`,
          'MAQUINARIA',
          String(maquinaria.id),
        ),
        crearAlertaPorFecha(
          maquinaria.vtvVencimiento,
          inicioEnTreintaYUnDias,
          {
            vencida: 'MAQUINARIA_VTV_VENCIDA',
            proxima: 'MAQUINARIA_VTV_PROXIMA_A_VENCER',
          },
          'VTV',
          `alerta-maquinaria-vtv-${maquinaria.id}`,
          'MAQUINARIA',
          String(maquinaria.id),
        ),
      ].filter((alerta): alerta is AlertaOperativa => Boolean(alerta));
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
          origenTipo: 'COSTO_PRODUCTIVO_AGRUPADO',
          origenId: grupo.recurso,
        };
      });

    return [...alertasTrabajos, ...alertasCostosPendientes, ...alertasMaquinarias, ...alertasCostos]
      .sort((a, b) => Number(b.severidad === 'CRITICA') - Number(a.severidad === 'CRITICA'));
  }

  @Cron(CronExpression.EVERY_HOUR)
  async revisarAlertasProgramadas() {
    const organizaciones = await this.prisma.organizacion.findMany({
      select: { id: true },
    });

    for (const organizacion of organizaciones) {
      try {
        const alertas = await this.listarParaOrganizaciones([organizacion.id]);
        await this.sincronizarAlertasPersistentes(organizacion.id, alertas);
      } catch {
        this.logger.warn(`No se pudieron actualizar las alertas de la organizacion ${organizacion.id}.`);
      }
    }
  }

  private async sincronizarAlertasPersistentes(
    organizacionId: number,
    alertas: AlertaOperativa[],
  ) {
    const ahora = new Date();
    const existentes = await this.prisma.alertaGestion.findMany({
      where: { organizacionId },
      select: { id: true, clave: true, estado: true, ciclo: true },
    });
    const existentePorClave = new Map(existentes.map((alerta) => [alerta.clave, alerta]));
    const clavesActivas = alertas.map((alerta) => alerta.dedupeKey);
    const activadas: Array<{
      id: string;
      ciclo: number;
      titulo: string;
      mensaje: string;
      enlace: string;
      severidad: SeveridadAlertaGestion;
    }> = [];

    for (const alerta of alertas) {
      const existente = existentePorClave.get(alerta.dedupeKey);
      const severidad = alerta.severidad === 'CRITICA' ? 'PRIORITARIA' : 'ATENCION';
      if (!existente) {
        const creada = await this.prisma.alertaGestion.create({
          data: {
            organizacionId,
            clave: alerta.dedupeKey,
            tipo: alerta.tipo,
            severidad,
            estado: 'ACTIVA',
            titulo: alerta.titulo,
            mensaje: alerta.mensaje,
            enlace: alerta.enlace,
            origenTipo: alerta.origenTipo,
            origenId: alerta.origenId,
            detectadaEn: ahora,
            ultimaEvaluacionEn: ahora,
          },
          select: { id: true, ciclo: true, titulo: true, mensaje: true, enlace: true },
        });
        activadas.push({ ...creada, severidad });
        continue;
      }

      const reabierta = existente.estado === 'RESUELTA';
      const actualizada = await this.prisma.alertaGestion.update({
        where: { id: existente.id },
        data: {
          tipo: alerta.tipo,
          severidad,
          estado: reabierta ? 'ACTIVA' : existente.estado,
          titulo: alerta.titulo,
          mensaje: alerta.mensaje,
          enlace: alerta.enlace,
          origenTipo: alerta.origenTipo,
          origenId: alerta.origenId,
          ciclo: reabierta ? existente.ciclo + 1 : existente.ciclo,
          detectadaEn: reabierta ? ahora : undefined,
          resueltaEn: reabierta ? null : undefined,
          ultimaEvaluacionEn: ahora,
        },
        select: { id: true, ciclo: true, titulo: true, mensaje: true, enlace: true },
      });
      if (reabierta) activadas.push({ ...actualizada, severidad });
    }

    await this.prisma.alertaGestion.updateMany({
      where: {
        organizacionId,
        clave: { notIn: clavesActivas },
        estado: { in: ['ACTIVA', 'REVISADA'] },
      },
      data: { estado: 'RESUELTA', resueltaEn: ahora, ultimaEvaluacionEn: ahora },
    });

    if (!activadas.length) return;

    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: {
        nombre: true,
        propietarioId: true,
        propietario: { select: { email: true, nombre: true, emailVerificado: true } },
      },
    });
    if (!organizacion) return;
    const preferenciasGuardadas = await this.prisma.preferenciaAlerta.findUnique({
      where: {
        usuarioId_organizacionId: {
          usuarioId: organizacion.propietarioId,
          organizacionId,
        },
      },
    });
    const preferencias = { ...PREFERENCIAS_ALERTAS_POR_DEFECTO, ...preferenciasGuardadas };
    if (!preferencias.alertasActivas) return;

    const alertasAEnviar = preferencias.soloPrioritarias
      ? activadas.filter((alerta) => alerta.severidad === 'PRIORITARIA')
      : activadas;
    if (!alertasAEnviar.length) return;

    await Promise.allSettled(alertasAEnviar.map(async (alerta) => {
      const tieneCanalActivo = preferencias.notificacionEnApp
        || preferencias.notificacionPush
        || (preferencias.notificacionEmail && organizacion.propietario.emailVerificado);
      if (!tieneCanalActivo) return;

      const creada = await this.notificacionesService.crearNotificacionSiNoExiste(
        organizacion.propietarioId,
        {
          tipo: 'ALERTA_OPERATIVA',
          titulo: alerta.titulo,
          mensaje: alerta.mensaje,
          enlace: alerta.enlace,
          dedupeKey: `alerta-${alerta.id}-ciclo-${alerta.ciclo}`,
          visibleEnApp: preferencias.notificacionEnApp,
          enviarPush: preferencias.notificacionPush,
        },
      );
      if (!creada || !preferencias.notificacionEmail || !organizacion.propietario.emailVerificado) return;

      await this.mailerService.enviarCorreo({
        email: organizacion.propietario.email,
        asunto: `AgroManager AR: ${alerta.titulo}`,
        html: this.crearContenidoCorreoAlerta({
          nombreUsuario: organizacion.propietario.nombre,
          nombreOrganizacion: organizacion.nombre,
          titulo: alerta.titulo,
          mensaje: alerta.mensaje,
          enlace: alerta.enlace,
          organizacionId,
        }),
      });
    }));
  }

  private crearContenidoCorreoAlerta({
    nombreUsuario,
    nombreOrganizacion,
    titulo,
    mensaje,
    enlace,
    organizacionId,
  }: {
    nombreUsuario: string;
    nombreOrganizacion: string;
    titulo: string;
    mensaje: string;
    enlace: string;
    organizacionId: number;
  }) {
    const escapar = (valor: string) => valor.replace(/[&<>'"]/g, (caracter) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    })[caracter] ?? caracter);
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';
    const destino = `${frontendUrl}${enlace.startsWith('/') ? enlace : `/org/${organizacionId}/${enlace}`}`;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
        <h1 style="color: #047857; margin-bottom: 8px;">Nueva alerta operativa</h1>
        <p>Hola ${escapar(nombreUsuario)},</p>
        <p>Detectamos una alerta en <strong>${escapar(nombreOrganizacion)}</strong>.</p>
        <div style="background: #fff7ed; border: 1px solid #fdba74; border-radius: 10px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px;"><strong>${escapar(titulo)}</strong></p>
          <p style="margin: 0;">${escapar(mensaje)}</p>
        </div>
        <p style="text-align: center; margin: 28px 0;"><a href="${escapar(destino)}" style="display: inline-block; padding: 12px 24px; background: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Ver alerta</a></p>
        <p style="color: #6b7280; font-size: 12px;">Podés cambiar estos avisos desde Reportes → Preferencias de alertas.</p>
      </div>
    `;
  }

  private async actualizarAlertasGestion(organizacionId: number) {
    const alertas = await this.listarParaOrganizaciones([organizacionId]);
    await this.sincronizarAlertasPersistentes(organizacionId, alertas);
  }

  private async requerirOwnerDashboard(usuarioId: number, organizacionId: number) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Dashboard',
    );
    if (!acceso.esOwner) {
      throw new ForbiddenException('Solo el propietario puede gestionar las alertas de la organización');
    }
  }

  private async obtenerAlertaGestion(organizacionId: number, alertaId: string) {
    const alerta = await this.prisma.alertaGestion.findFirst({
      where: { id: alertaId, organizacionId },
      select: { id: true },
    });
    if (!alerta) throw new NotFoundException('Alerta no encontrada');
    return alerta;
  }

  private esEstadoGestionValido(estado: string): estado is EstadoAlertaGestion {
    return ['ACTIVA', 'REVISADA', 'RESUELTA'].includes(estado);
  }

  private esSeveridadGestionValida(severidad: string): severidad is SeveridadAlertaGestion {
    return ['INFORMATIVA', 'ATENCION', 'PRIORITARIA'].includes(severidad);
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
