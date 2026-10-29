import { Injectable } from '@nestjs/common';
import { OrigenMovimientoFinanciero, Prisma, TipoCostoProductivo, TipoMovimiento } from '@prisma/client';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';

type MetricasEconomicas = {
  ingresos: number;
  egresosManuales: number;
  costosReales: number;
  costosEstimados: number;
  produccionKg: number;
  siembras: number;
};

const crearMetricas = (): MetricasEconomicas => ({
  ingresos: 0,
  egresosManuales: 0,
  costosReales: 0,
  costosEstimados: 0,
  produccionKg: 0,
  siembras: 0,
});

@Injectable()
export class AnaliticaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
    private readonly planService: PlanService,
  ) {}

  async getRentabilidad(usuarioId: number, organizacionId: number) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Reportes',
    );
    await this.planService.checkProAccess(
      organizacionId,
      'Rentabilidad y reportes',
    );

    const campoIds = acceso.esOwner
      ? null
      : (await this.prisma.asignacionCampo.findMany({
          where: {
            usuarioOrganizacionId: acceso.usuarioOrganizacionId,
            activo: true,
          },
          select: { campoId: true },
        })).map((asignacion) => asignacion.campoId);

    const filtroMovimientos: Prisma.MovimientoFinancieroWhereInput = {
      organizacionId,
      ...(campoIds
        ? {
            OR: [
              { campoId: { in: campoIds } },
              { siembra: { lote: { campoId: { in: campoIds } } } },
            ],
          }
        : {}),
    };
    const filtroCostos: Prisma.CostoProductivoWhereInput = {
      organizacionId,
      ...(campoIds
        ? {
            OR: [
              { campoId: { in: campoIds } },
              { lote: { campoId: { in: campoIds } } },
              { siembra: { lote: { campoId: { in: campoIds } } } },
              { maquinaria: { campoId: { in: campoIds } } },
            ],
          }
        : {}),
    };

    const [lotes, campanias, movimientos, costos] = await Promise.all([
      this.prisma.lote.findMany({
        where: {
          campo: {
            organizacionId,
            ...(campoIds ? { id: { in: campoIds } } : {}),
          },
        },
        select: {
          id: true,
          nombre: true,
          hectareas: true,
          campo: { select: { id: true, nombre: true } },
          siembras: {
            select: {
              id: true,
              campaniaId: true,
              estado: true,
              tipoCultivo: { select: { nombre: true } },
              cosechas: { select: { totalKg: true } },
            },
          },
        },
        orderBy: [{ campo: { nombre: 'asc' } }, { nombre: 'asc' }],
      }),
      this.prisma.campania.findMany({
        where: { organizacionId },
        select: {
          id: true,
          nombre: true,
          fechaInicio: true,
          fechaFin: true,
        },
        orderBy: { fechaInicio: 'desc' },
      }),
      this.prisma.movimientoFinanciero.findMany({
        where: filtroMovimientos,
        select: {
          id: true,
          tipo: true,
          categoria: true,
          concepto: true,
          monto: true,
          fecha: true,
          origen: true,
          campoId: true,
          siembraId: true,
        },
      }),
      this.prisma.costoProductivo.findMany({
        where: filtroCostos,
        select: {
          id: true,
          tipo: true,
          rubro: true,
          monto: true,
          fecha: true,
          campoId: true,
          loteId: true,
          siembraId: true,
          campaniaId: true,
        },
      }),
    ]);

    const metricasLotes = new Map<number, MetricasEconomicas>();
    const metricasCampanias = new Map<number, MetricasEconomicas>();
    const siembrasPorId = new Map<number, { loteId: number; campaniaId: number | null }>();
    const lotesPorCampania = new Map<number, Set<number>>();
    const campaniasAccesibles = new Set<number>();

    for (const lote of lotes) {
      const metricas = crearMetricas();
      metricas.siembras = lote.siembras.length;
      metricas.produccionKg = lote.siembras.reduce(
        (total, siembra) =>
          total + siembra.cosechas.reduce((suma, cosecha) => suma + cosecha.totalKg, 0),
        0,
      );
      metricasLotes.set(lote.id, metricas);

      for (const siembra of lote.siembras) {
        siembrasPorId.set(siembra.id, {
          loteId: lote.id,
          campaniaId: siembra.campaniaId,
        });
        if (siembra.campaniaId) {
          campaniasAccesibles.add(siembra.campaniaId);
          const lotesCampania = lotesPorCampania.get(siembra.campaniaId) ?? new Set<number>();
          lotesCampania.add(lote.id);
          lotesPorCampania.set(siembra.campaniaId, lotesCampania);
        }
      }
    }

    for (const campania of campanias) {
      if (!campoIds || campaniasAccesibles.has(campania.id)) {
        metricasCampanias.set(campania.id, crearMetricas());
      }
    }

    const sinAsignar = {
      ingresosManuales: 0,
      egresosManuales: 0,
      costosReales: 0,
      costosEstimados: 0,
    };

    for (const movimiento of movimientos) {
      if (movimiento.origen === OrigenMovimientoFinanciero.COSTO_PRODUCTIVO) {
        continue;
      }

      const siembra = movimiento.siembraId
        ? siembrasPorId.get(movimiento.siembraId)
        : undefined;
      if (!siembra) {
        if (movimiento.tipo === TipoMovimiento.INGRESO) {
          sinAsignar.ingresosManuales += movimiento.monto;
        } else {
          sinAsignar.egresosManuales += movimiento.monto;
        }
        continue;
      }

      const destinoLote = metricasLotes.get(siembra.loteId);
      const destinoCampania = siembra.campaniaId
        ? metricasCampanias.get(siembra.campaniaId)
        : undefined;
      const clave = movimiento.tipo === TipoMovimiento.INGRESO
        ? 'ingresos'
        : 'egresosManuales';
      if (destinoLote) destinoLote[clave] += movimiento.monto;
      if (destinoCampania) destinoCampania[clave] += movimiento.monto;
    }

    const costosPorRubro = new Map<string, { real: number; estimado: number }>();
    for (const costo of costos) {
      const monto = Number(costo.monto);
      const esReal = costo.tipo === TipoCostoProductivo.REAL;
      const rubro = costosPorRubro.get(costo.rubro) ?? { real: 0, estimado: 0 };
      if (esReal) rubro.real += monto;
      else rubro.estimado += monto;
      costosPorRubro.set(costo.rubro, rubro);

      const siembra = costo.siembraId ? siembrasPorId.get(costo.siembraId) : undefined;
      const loteId = costo.loteId ?? siembra?.loteId;
      const campaniaId = costo.campaniaId ?? siembra?.campaniaId;
      const destinoLote = loteId ? metricasLotes.get(loteId) : undefined;
      const destinoCampania = campaniaId
        ? metricasCampanias.get(campaniaId)
        : undefined;

      if (destinoLote) {
        if (esReal) destinoLote.costosReales += monto;
        else destinoLote.costosEstimados += monto;
      }
      if (destinoCampania) {
        if (esReal) destinoCampania.costosReales += monto;
        else destinoCampania.costosEstimados += monto;
      }
      if (!destinoLote && !destinoCampania) {
        if (esReal) sinAsignar.costosReales += monto;
        else sinAsignar.costosEstimados += monto;
      }
    }

    const totalIngresos = this.sumar(movimientos, (movimiento) =>
      movimiento.tipo === TipoMovimiento.INGRESO ? movimiento.monto : 0,
    );
    const totalEgresos = this.sumar(movimientos, (movimiento) =>
      movimiento.tipo === TipoMovimiento.EGRESO ? movimiento.monto : 0,
    );
    const totalProduccionKg = this.sumar(
      [...metricasLotes.values()],
      (metricas) => metricas.produccionKg,
    );
    const totalCostosReales = this.sumar(
      costos,
      (costo) => costo.tipo === TipoCostoProductivo.REAL ? Number(costo.monto) : 0,
    );
    const totalCostosEstimados = this.sumar(
      costos,
      (costo) => costo.tipo === TipoCostoProductivo.ESTIMADO ? Number(costo.monto) : 0,
    );

    const lotesResumen = lotes.map((lote) => ({
      id: lote.id,
      nombre: lote.nombre,
      campo: lote.campo,
      hectareas: lote.hectareas,
      ...this.resumirMetricas(metricasLotes.get(lote.id) ?? crearMetricas(), lote.hectareas),
    }));
    const campaniasResumen = campanias
      .filter((campania) => metricasCampanias.has(campania.id))
      .map((campania) => {
        const metricas = metricasCampanias.get(campania.id) ?? crearMetricas();
        const hectareas = [...(lotesPorCampania.get(campania.id) ?? new Set<number>())]
          .reduce((total, loteId) => total + (lotes.find((lote) => lote.id === loteId)?.hectareas ?? 0), 0);
        return {
          id: campania.id,
          nombre: campania.nombre,
          fechaInicio: campania.fechaInicio,
          fechaFin: campania.fechaFin,
          lotes: lotesPorCampania.get(campania.id)?.size ?? 0,
          hectareas,
          ...this.resumirMetricas(metricas, hectareas),
        };
      });

    const egresosPorCategoria = [...new Set(movimientos.map((movimiento) => movimiento.categoria))]
      .map((categoria) => ({
        categoria,
        monto: this.sumar(
          movimientos,
          (movimiento) => movimiento.tipo === TipoMovimiento.EGRESO && movimiento.categoria === categoria
            ? movimiento.monto
            : 0,
        ),
      }))
      .filter((item) => item.monto > 0)
      .sort((a, b) => b.monto - a.monto);

    return {
      resumen: {
        ingresos: this.redondear(totalIngresos),
        egresos: this.redondear(totalEgresos),
        saldo: this.redondear(totalIngresos - totalEgresos),
        produccionKg: this.redondear(totalProduccionKg),
        costosReales: this.redondear(totalCostosReales),
        costosEstimados: this.redondear(totalCostosEstimados),
        desvioCostos: totalCostosEstimados > 0
          ? this.redondear(totalCostosReales - totalCostosEstimados)
          : null,
      },
      produccion: {
        siembras: [...siembrasPorId.keys()].length,
        enCurso: lotes.flatMap((lote) => lote.siembras).filter((siembra) => siembra.estado === 'EN_CURSO').length,
        cosechadas: lotes.flatMap((lote) => lote.siembras).filter((siembra) => siembra.estado === 'COSECHADA').length,
        perdidas: lotes.flatMap((lote) => lote.siembras).filter((siembra) => siembra.estado === 'PERDIDA').length,
        cosechas: lotes.flatMap((lote) => lote.siembras).reduce((total, siembra) => total + siembra.cosechas.length, 0),
        aplicaciones: 0,
        totalKg: this.redondear(totalProduccionKg),
      },
      lotes: lotesResumen,
      campanias: campaniasResumen,
      costosPorRubro: [...costosPorRubro.entries()]
        .map(([rubro, valores]) => ({
          rubro,
          real: this.redondear(valores.real),
          estimado: this.redondear(valores.estimado),
        }))
        .sort((a, b) => (b.real + b.estimado) - (a.real + a.estimado)),
      egresosPorCategoria,
      sinAsignar: {
        ingresosManuales: this.redondear(sinAsignar.ingresosManuales),
        egresosManuales: this.redondear(sinAsignar.egresosManuales),
        costosReales: this.redondear(sinAsignar.costosReales),
        costosEstimados: this.redondear(sinAsignar.costosEstimados),
      },
      criterioAsignacion:
        'Los movimientos se asignan a un lote o campaña solo cuando están vinculados a una siembra. Los importes sin esa relación no se distribuyen automáticamente.',
    };
  }

  private resumirMetricas(metricas: MetricasEconomicas, hectareas: number) {
    const egresos = metricas.egresosManuales + metricas.costosReales;
    const margen = metricas.ingresos - egresos;
    const tieneSuperficie = hectareas > 0;
    return {
      siembras: metricas.siembras,
      produccionKg: this.redondear(metricas.produccionKg),
      ingresos: this.redondear(metricas.ingresos),
      egresosManuales: this.redondear(metricas.egresosManuales),
      costosReales: this.redondear(metricas.costosReales),
      costosEstimados: this.redondear(metricas.costosEstimados),
      desvioCostos: metricas.costosEstimados > 0
        ? this.redondear(metricas.costosReales - metricas.costosEstimados)
        : null,
      egresos: this.redondear(egresos),
      margen: this.redondear(margen),
      rentabilidad: metricas.ingresos > 0
        ? this.redondear((margen / metricas.ingresos) * 100)
        : null,
      porHectarea: tieneSuperficie
        ? {
            ingresos: this.redondear(metricas.ingresos / hectareas),
            egresos: this.redondear(egresos / hectareas),
            costosReales: this.redondear(metricas.costosReales / hectareas),
            margen: this.redondear(margen / hectareas),
          }
        : null,
    };
  }

  private sumar<T>(items: T[], selector: (item: T) => number): number {
    return items.reduce((total, item) => total + Number(selector(item) ?? 0), 0);
  }

  private redondear(valor: number): number {
    return Math.round((valor + Number.EPSILON) * 100) / 100;
  }
}
