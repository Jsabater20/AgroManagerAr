import { Injectable } from '@nestjs/common';
import {
  EstadoActividad,
  OrigenMovimientoFinanciero,
  TipoCostoProductivo,
  TipoMovimiento,
} from '@prisma/client';
import { AlertasService } from '../alertas/alertas.service';
import { EmpresaAccessService } from '../empresas/empresa-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { periodoMensualCerrado, periodoSemanalCerrado } from './reportes-periodos';
import { generarResumenInteligente } from './resumen-inteligente';

const ESTADOS_ACTIVOS: EstadoActividad[] = [
  EstadoActividad.PENDIENTE,
  EstadoActividad.EN_PROGRESO,
  EstadoActividad.PAUSADA,
];

type ResumenEstablecimiento = {
  campos: number;
  superficieHa: number;
  cosechaKg: number;
  completadas: number;
  pendientes: number;
  vencidas: number;
  alertas: number;
  alertasPrioritarias: number;
  ingresos: number;
  egresosManuales: number;
  costosReales: number;
  costosEstimados: number;
};

@Injectable()
export class ReportesEmpresaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly empresaAccessService: EmpresaAccessService,
    private readonly alertasService: AlertasService,
  ) {}

  async obtenerConsolidado(
    usuarioId: number,
    empresaId: number,
    tipoPeriodo: 'SEMANAL' | 'MENSUAL',
    fechaReferencia?: Date,
  ) {
    const accesoOperativo = await this.empresaAccessService.requerirConsultaOperativa(usuarioId, empresaId);
    const organizacionIds = accesoOperativo.organizacionesIds;
    const organizacionesFinancieras = await this.obtenerOrganizacionesFinancieras(
      usuarioId,
      empresaId,
      organizacionIds,
    );
    const referencia = fechaReferencia ?? new Date();
    const periodo = tipoPeriodo === 'SEMANAL'
      ? periodoSemanalCerrado(referencia)
      : periodoMensualCerrado(referencia);
    const rango = { gte: periodo.desde, lt: periodo.hasta };
    const ahora = new Date();

    const [organizaciones, campos, cosechas, actividades, movimientos, costos, alertas] = await Promise.all([
      this.prisma.organizacion.findMany({
        where: { id: { in: organizacionIds } },
        select: { id: true, nombre: true },
        orderBy: { nombre: 'asc' },
      }),
      this.prisma.campo.findMany({
        where: { organizacionId: { in: organizacionIds } },
        select: { organizacionId: true, hectareas: true },
      }),
      this.prisma.cosecha.findMany({
        where: { fechaCosecha: rango, siembra: { lote: { campo: { organizacionId: { in: organizacionIds } } } } },
        select: { totalKg: true, siembra: { select: { lote: { select: { campo: { select: { organizacionId: true } } } } } } },
      }),
      this.prisma.actividadMiembro.findMany({
        where: {
          organizacionId: { in: organizacionIds },
          activo: true,
          OR: [
            { estado: EstadoActividad.COMPLETADA, fechaRealFin: rango },
            { estado: { in: ESTADOS_ACTIVOS } },
          ],
        },
        select: { organizacionId: true, estado: true, fechaEstimadaFin: true },
      }),
      organizacionesFinancieras.length
        ? this.prisma.movimientoFinanciero.findMany({
            where: { organizacionId: { in: organizacionesFinancieras }, fecha: rango },
            select: { organizacionId: true, tipo: true, origen: true, monto: true },
          })
        : Promise.resolve([]),
      organizacionesFinancieras.length
        ? this.prisma.costoProductivo.findMany({
            where: { organizacionId: { in: organizacionesFinancieras }, fecha: rango },
            select: { organizacionId: true, tipo: true, monto: true },
          })
        : Promise.resolve([]),
      this.alertasService.listarParaOrganizaciones(organizacionIds),
    ]);

    const datosPorOrganizacion = new Map<number, ResumenEstablecimiento>(organizaciones.map((organizacion) => [
      organizacion.id,
      {
        campos: 0, superficieHa: 0, cosechaKg: 0, completadas: 0, pendientes: 0,
        vencidas: 0, alertas: 0, alertasPrioritarias: 0, ingresos: 0,
        egresosManuales: 0, costosReales: 0, costosEstimados: 0,
      },
    ]));
    const datos = (organizacionId: number) => datosPorOrganizacion.get(organizacionId)!;

    for (const campo of campos) {
      if (campo.organizacionId) {
        datos(campo.organizacionId).campos += 1;
        datos(campo.organizacionId).superficieHa += campo.hectareas;
      }
    }
    for (const cosecha of cosechas) {
      const organizacionId = cosecha.siembra.lote.campo.organizacionId;
      if (organizacionId) datos(organizacionId).cosechaKg += cosecha.totalKg;
    }
    for (const actividad of actividades) {
      const resumen = datos(actividad.organizacionId);
      if (actividad.estado === EstadoActividad.COMPLETADA) resumen.completadas += 1;
      if (ESTADOS_ACTIVOS.includes(actividad.estado)) {
        resumen.pendientes += 1;
        if (actividad.fechaEstimadaFin && actividad.fechaEstimadaFin < ahora) resumen.vencidas += 1;
      }
    }
    for (const movimiento of movimientos) {
      if (!movimiento.organizacionId) continue;
      const resumen = datos(movimiento.organizacionId);
      if (movimiento.tipo === TipoMovimiento.INGRESO) resumen.ingresos += movimiento.monto;
      if (movimiento.tipo === TipoMovimiento.EGRESO && movimiento.origen !== OrigenMovimientoFinanciero.COSTO_PRODUCTIVO) {
        resumen.egresosManuales += movimiento.monto;
      }
    }
    for (const costo of costos) {
      const resumen = datos(costo.organizacionId);
      if (costo.tipo === TipoCostoProductivo.REAL) resumen.costosReales += Number(costo.monto);
      if (costo.tipo === TipoCostoProductivo.ESTIMADO) resumen.costosEstimados += Number(costo.monto);
    }
    for (const alerta of alertas) {
      const esAlertaFinanciera = [
        'COSTO_SUPERA_ESTIMADO',
        'ACTIVIDAD_COMPLETADA_SIN_COSTO_REAL',
      ].includes(alerta.tipo);
      if (esAlertaFinanciera && !organizacionesFinancieras.includes(alerta.organizacionId)) continue;
      const resumen = datos(alerta.organizacionId);
      resumen.alertas += 1;
      if (alerta.severidad === 'CRITICA') resumen.alertasPrioritarias += 1;
    }

    const establecimientos = organizaciones.map((organizacion) => {
      const resumen = datos(organizacion.id);
      const accesoFinanciero = organizacionesFinancieras.includes(organizacion.id);
      const egresos = resumen.egresosManuales + resumen.costosReales;
      return {
        id: organizacion.id,
        nombre: organizacion.nombre,
        operacion: {
          campos: resumen.campos,
          superficieHa: this.redondear(resumen.superficieHa),
          cosechaKg: this.redondear(resumen.cosechaKg),
          completadas: resumen.completadas,
          pendientes: resumen.pendientes,
          vencidas: resumen.vencidas,
          alertas: resumen.alertas,
          alertasPrioritarias: resumen.alertasPrioritarias,
        },
        finanzas: accesoFinanciero ? {
          ingresos: this.redondear(resumen.ingresos),
          egresos: this.redondear(egresos),
          costosReales: this.redondear(resumen.costosReales),
          costosEstimados: this.redondear(resumen.costosEstimados),
          saldo: this.redondear(resumen.ingresos - egresos),
        } : null,
      };
    });
    const operacion = establecimientos.reduce((total, establecimiento) => ({
      campos: total.campos + establecimiento.operacion.campos,
      superficieHa: total.superficieHa + establecimiento.operacion.superficieHa,
      cosechaKg: total.cosechaKg + establecimiento.operacion.cosechaKg,
      completadas: total.completadas + establecimiento.operacion.completadas,
      pendientes: total.pendientes + establecimiento.operacion.pendientes,
      vencidas: total.vencidas + establecimiento.operacion.vencidas,
      alertas: total.alertas + establecimiento.operacion.alertas,
      alertasPrioritarias: total.alertasPrioritarias + establecimiento.operacion.alertasPrioritarias,
    }), { campos: 0, superficieHa: 0, cosechaKg: 0, completadas: 0, pendientes: 0, vencidas: 0, alertas: 0, alertasPrioritarias: 0 });
    const conFinanzas = establecimientos.filter((establecimiento) => establecimiento.finanzas);
    const finanzas = conFinanzas.length ? conFinanzas.reduce((total, establecimiento) => ({
      ingresos: total.ingresos + (establecimiento.finanzas?.ingresos ?? 0),
      egresos: total.egresos + (establecimiento.finanzas?.egresos ?? 0),
      costosReales: total.costosReales + (establecimiento.finanzas?.costosReales ?? 0),
      costosEstimados: total.costosEstimados + (establecimiento.finanzas?.costosEstimados ?? 0),
      saldo: total.saldo + (establecimiento.finanzas?.saldo ?? 0),
    }), { ingresos: 0, egresos: 0, costosReales: 0, costosEstimados: 0, saldo: 0 }) : null;
    const resumenFinanciero = finanzas && {
      ingresos: this.redondear(finanzas.ingresos),
      egresos: this.redondear(finanzas.egresos),
      costosReales: this.redondear(finanzas.costosReales),
      costosEstimados: this.redondear(finanzas.costosEstimados),
      saldo: this.redondear(finanzas.saldo),
      desvioCostos: this.redondear(finanzas.costosReales - finanzas.costosEstimados),
      comparacionAnterior: null,
    };

    return {
      empresa: { id: accesoOperativo.empresa.id, nombre: accesoOperativo.empresa.nombre },
      periodo,
      accesoFinanciero: {
        nivel: organizacionesFinancieras.length === 0 ? 'SIN_ACCESO' : organizacionesFinancieras.length === organizacionIds.length ? 'COMPLETO' : 'PARCIAL',
        establecimientosIncluidos: organizacionesFinancieras.length,
      },
      resumen: { operacion: this.redondearOperacion(operacion), finanzas: resumenFinanciero },
      establecimientos,
      resumenInteligente: generarResumenInteligente({
        actividad: { completadas: operacion.completadas, pendientes: operacion.pendientes, vencidas: operacion.vencidas },
        maquinaria: { mantenimientos: 0, gastosRegistrados: 0 },
        finanzas: resumenFinanciero,
        alertas: { total: operacion.alertas, prioritarias: operacion.alertasPrioritarias },
      }),
    };
  }

  private async obtenerOrganizacionesFinancieras(usuarioId: number, empresaId: number, operativas: number[]) {
    try {
      const acceso = await this.empresaAccessService.requerirConsultaFinanciera(usuarioId, empresaId);
      return acceso.organizacionesIds.filter((organizacionId) => operativas.includes(organizacionId));
    } catch {
      return [];
    }
  }

  private redondearOperacion<T extends Record<string, number>>(operacion: T): T {
    return Object.fromEntries(Object.entries(operacion).map(([clave, valor]) => [clave, this.redondear(valor)])) as T;
  }

  private redondear(valor: number) {
    return Math.round((valor + Number.EPSILON) * 100) / 100;
  }
}
