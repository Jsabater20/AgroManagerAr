import { Injectable } from '@nestjs/common';
import {
  EstadoActividad,
  OrigenMovimientoFinanciero,
  TipoCostoProductivo,
  TipoMovimiento,
} from '@prisma/client';
import { AlertasService } from '../alertas/alertas.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  periodoAnteriorCerrado,
  periodoMensualCerrado,
  periodoSemanalCerrado,
  PeriodoReporte,
  ZONA_HORARIA_REPORTES_DEFAULT,
} from './reportes-periodos';
import { generarResumenInteligente } from './resumen-inteligente';
import type { UpdatePreferenciasReporteDto } from './dto/update-preferencias-reporte.dto';

const ESTADOS_ACTIVOS: EstadoActividad[] = [
  EstadoActividad.PENDIENTE,
  EstadoActividad.EN_PROGRESO,
  EstadoActividad.PAUSADA,
];

type ContextoReportes = {
  esOwner: boolean;
  usuarioOrganizacionId?: number;
  puedeVerFinanzas: boolean;
  campoIds?: number[];
};

@Injectable()
export class ReportesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
    private readonly planService: PlanService,
    private readonly alertasService: AlertasService,
  ) {}

  async obtenerCapacidades(usuarioId: number, organizacionId: number) {
    const contexto = await this.obtenerContexto(usuarioId, organizacionId);
    const esPro = await this.planService.isOrgPro(organizacionId);

    return {
      plan: esPro ? 'PRO' : 'FREE',
      zonaHoraria: ZONA_HORARIA_REPORTES_DEFAULT,
      permisos: {
        esOwner: contexto.esOwner,
        puedeVerFinanzas: contexto.puedeVerFinanzas,
      },
      funcionalidades: {
        resumenBasicoManual: true,
        semanalMensual: esPro,
        porLoteYCampania: esPro,
        pdfProfesional: esPro,
        resumenInteligente: esPro,
        automatizacion: esPro,
        envioPorCorreo: false,
      },
      periodosSugeridos: {
        semanal: periodoSemanalCerrado(),
        mensual: periodoMensualCerrado(),
      },
    };
  }

  async obtenerPreferencias(usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Reportes');
    const preferencias = await this.prisma.preferenciaReporte.findUnique({
      where: { usuarioId_organizacionId: { usuarioId, organizacionId } },
      select: {
        tipoPeriodo: true,
        vistaDesglose: true,
        envioAutomatico: true,
        frecuenciaEnvio: true,
        updatedAt: true,
      },
    });

    return preferencias ?? {
      tipoPeriodo: 'MENSUAL',
      vistaDesglose: 'LOTES',
      envioAutomatico: false,
      frecuenciaEnvio: 'MENSUAL',
      updatedAt: null,
    };
  }

  async actualizarPreferencias(
    usuarioId: number,
    organizacionId: number,
    datos: UpdatePreferenciasReporteDto,
  ) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Reportes');
    const preferenciaActual = await this.prisma.preferenciaReporte.findUnique({
      where: { usuarioId_organizacionId: { usuarioId, organizacionId } },
      select: { envioAutomatico: true },
    });
    if (datos.envioAutomatico && !preferenciaActual?.envioAutomatico) {
      await this.planService.checkProAccess(organizacionId, 'Envío automático de informes');
    }
    return this.prisma.preferenciaReporte.upsert({
      where: { usuarioId_organizacionId: { usuarioId, organizacionId } },
      create: {
        usuarioId,
        organizacionId,
        tipoPeriodo: datos.tipoPeriodo ?? 'MENSUAL',
        vistaDesglose: datos.vistaDesglose ?? 'LOTES',
        envioAutomatico: datos.envioAutomatico ?? false,
        frecuenciaEnvio: datos.frecuenciaEnvio ?? 'MENSUAL',
      },
      update: {
        ...(datos.tipoPeriodo ? { tipoPeriodo: datos.tipoPeriodo } : {}),
        ...(datos.vistaDesglose ? { vistaDesglose: datos.vistaDesglose } : {}),
        ...(datos.envioAutomatico !== undefined ? { envioAutomatico: datos.envioAutomatico } : {}),
        ...(datos.frecuenciaEnvio ? { frecuenciaEnvio: datos.frecuenciaEnvio } : {}),
      },
      select: {
        tipoPeriodo: true,
        vistaDesglose: true,
        envioAutomatico: true,
        frecuenciaEnvio: true,
        updatedAt: true,
      },
    });
  }

  async listarHistorial(usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Reportes');
    return this.prisma.historialReporte.findMany({
      where: { usuarioId, organizacionId },
      select: {
        id: true,
        tipo: true,
        fechaReferencia: true,
        periodoDesde: true,
        periodoHasta: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async generarSemanal(
    usuarioId: number,
    organizacionId: number,
    fechaReferencia?: Date,
  ) {
    const referencia = fechaReferencia ?? new Date();
    const periodo = periodoSemanalCerrado(referencia);
    const reporte = await this.generarPeriodico(
      usuarioId,
      organizacionId,
      periodo,
    );
    await this.registrarHistorial(usuarioId, organizacionId, 'SEMANAL', referencia, periodo);
    return reporte;
  }

  async generarMensual(
    usuarioId: number,
    organizacionId: number,
    fechaReferencia?: Date,
  ) {
    const referencia = fechaReferencia ?? new Date();
    const periodo = periodoMensualCerrado(referencia);
    const reporte = await this.generarPeriodico(
      usuarioId,
      organizacionId,
      periodo,
    );
    await this.registrarHistorial(usuarioId, organizacionId, 'MENSUAL', referencia, periodo);
    return reporte;
  }

  async generarDesgloseProductivo(
    usuarioId: number,
    organizacionId: number,
    tipoPeriodo: 'SEMANAL' | 'MENSUAL',
    fechaReferencia?: Date,
  ) {
    const contexto = await this.obtenerContexto(usuarioId, organizacionId);
    await this.planService.checkProAccess(
      organizacionId,
      'Desglose de reportes por lote y campaña',
    );
    const referencia = fechaReferencia ?? new Date();
    const periodo = tipoPeriodo === 'SEMANAL'
      ? periodoSemanalCerrado(referencia)
      : periodoMensualCerrado(referencia);
    const organizacion = await this.prisma.organizacion.findUniqueOrThrow({
      where: { id: organizacionId },
      select: { id: true, nombre: true },
    });
    const filtroCampo = contexto.campoIds ? { id: { in: contexto.campoIds } } : {};
    const filtroCampoEnRelacion = contexto.campoIds ? { campoId: { in: contexto.campoIds } } : {};
    const rango = { gte: periodo.desde, lt: periodo.hasta };

    const [lotes, cosechas, campanias, costos] = await Promise.all([
      this.prisma.lote.findMany({
        where: { campo: { organizacionId, ...filtroCampo } },
        select: {
          id: true,
          nombre: true,
          hectareas: true,
          campo: { select: { id: true, nombre: true } },
          siembras: {
            where: { fechaSiembra: { lt: periodo.hasta } },
            select: {
              id: true,
              estado: true,
              fechaSiembra: true,
              campaniaId: true,
              tipoCultivo: { select: { nombre: true } },
            },
          },
        },
        orderBy: [{ campo: { nombre: 'asc' } }, { nombre: 'asc' }],
      }),
      this.prisma.cosecha.findMany({
        where: {
          fechaCosecha: rango,
          siembra: { lote: { campo: { organizacionId, ...filtroCampo } } },
        },
        select: {
          totalKg: true,
          rendimientoKgHa: true,
          siembra: { select: { loteId: true, campaniaId: true } },
        },
      }),
      this.prisma.campania.findMany({
        where: {
          organizacionId,
          fechaInicio: { lt: periodo.hasta },
          OR: [{ fechaFin: null }, { fechaFin: { gte: periodo.desde } }],
          siembras: { some: { lote: { ...filtroCampoEnRelacion } } },
        },
        select: {
          id: true,
          nombre: true,
          fechaInicio: true,
          fechaFin: true,
          siembras: {
            where: { lote: { ...filtroCampoEnRelacion } },
            select: {
              id: true,
              lote: { select: { id: true, hectareas: true } },
              tipoCultivo: { select: { nombre: true } },
              estado: true,
            },
          },
        },
        orderBy: { fechaInicio: 'desc' },
      }),
      contexto.puedeVerFinanzas
        ? this.prisma.costoProductivo.findMany({
            where: {
              organizacionId,
              fecha: rango,
              ...(contexto.campoIds ? {
                OR: [
                  { campoId: { in: contexto.campoIds } },
                  { lote: { campoId: { in: contexto.campoIds } } },
                  { siembra: { lote: { campoId: { in: contexto.campoIds } } } },
                  { maquinaria: { campoId: { in: contexto.campoIds } } },
                ],
              } : {}),
            },
            select: {
              loteId: true,
              campaniaId: true,
              tipo: true,
              monto: true,
              siembra: { select: { loteId: true, campaniaId: true } },
            },
          })
        : Promise.resolve([]),
    ]);

    const costosPorLote = new Map<number, { reales: number; estimados: number }>();
    const costosPorCampania = new Map<number, { reales: number; estimados: number }>();
    for (const costo of costos) {
      const resumenCosto = costo.tipo === TipoCostoProductivo.REAL ? 'reales' : 'estimados';
      const loteId = costo.loteId ?? costo.siembra?.loteId;
      const campaniaId = costo.campaniaId ?? costo.siembra?.campaniaId;
      if (loteId) this.acumularCosto(costosPorLote, loteId, resumenCosto, Number(costo.monto));
      if (campaniaId) this.acumularCosto(costosPorCampania, campaniaId, resumenCosto, Number(costo.monto));
    }

    const cosechasPorLote = new Map<number, { totalKg: number; rendimientoTotal: number; registros: number }>();
    const cosechasPorCampania = new Map<number, number>();
    for (const cosecha of cosechas) {
      const loteId = cosecha.siembra.loteId;
      const acumulado = cosechasPorLote.get(loteId) ?? { totalKg: 0, rendimientoTotal: 0, registros: 0 };
      acumulado.totalKg += cosecha.totalKg;
      acumulado.rendimientoTotal += cosecha.rendimientoKgHa;
      acumulado.registros += 1;
      cosechasPorLote.set(loteId, acumulado);
      if (cosecha.siembra.campaniaId) {
        cosechasPorCampania.set(
          cosecha.siembra.campaniaId,
          (cosechasPorCampania.get(cosecha.siembra.campaniaId) ?? 0) + cosecha.totalKg,
        );
      }
    }

    const desglose = {
      organizacion,
      periodo: this.serializarPeriodo(periodo),
      alcance: {
        campoIds: contexto.campoIds ?? null,
        incluyeCostos: contexto.puedeVerFinanzas,
      },
      lotes: lotes.map((lote) => {
        const cosecha = cosechasPorLote.get(lote.id);
        const costosLote = costosPorLote.get(lote.id) ?? { reales: 0, estimados: 0 };
        const cultivos = [...new Set(lote.siembras.map((siembra) => siembra.tipoCultivo.nombre))];
        const siembrasDelPeriodo = lote.siembras.filter((siembra) => siembra.fechaSiembra >= periodo.desde).length;
        return {
          id: lote.id,
          nombre: lote.nombre,
          hectareas: lote.hectareas,
          campo: lote.campo,
          cultivos,
          siembrasActivas: lote.siembras.filter((siembra) => siembra.estado === 'EN_CURSO').length,
          siembrasDelPeriodo,
          cosechaKg: this.redondear(cosecha?.totalKg ?? 0),
          rendimientoPromedioKgHa: cosecha?.registros
            ? this.redondear(cosecha.rendimientoTotal / cosecha.registros)
            : null,
          costos: contexto.puedeVerFinanzas ? {
            reales: this.redondear(costosLote.reales),
            estimados: this.redondear(costosLote.estimados),
            realPorHa: lote.hectareas ? this.redondear(costosLote.reales / lote.hectareas) : null,
          } : null,
        };
      }),
      campanias: campanias.map((campania) => {
        const costosCampania = costosPorCampania.get(campania.id) ?? { reales: 0, estimados: 0 };
        const loteIds = new Set(campania.siembras.map((siembra) => siembra.lote.id));
        const hectareas = [...loteIds].reduce((total, loteId) => {
          const siembra = campania.siembras.find((item) => item.lote.id === loteId);
          return total + (siembra?.lote.hectareas ?? 0);
        }, 0);
        return {
          id: campania.id,
          nombre: campania.nombre,
          fechaInicio: campania.fechaInicio,
          fechaFin: campania.fechaFin,
          siembras: campania.siembras.length,
          lotes: loteIds.size,
          hectareas: this.redondear(hectareas),
          cultivos: [...new Set(campania.siembras.map((siembra) => siembra.tipoCultivo.nombre))],
          siembrasActivas: campania.siembras.filter((siembra) => siembra.estado === 'EN_CURSO').length,
          cosechaKg: this.redondear(cosechasPorCampania.get(campania.id) ?? 0),
          costos: contexto.puedeVerFinanzas ? {
            reales: this.redondear(costosCampania.reales),
            estimados: this.redondear(costosCampania.estimados),
            realPorHa: hectareas ? this.redondear(costosCampania.reales / hectareas) : null,
          } : null,
        };
      }),
    };
    await this.registrarHistorial(
      usuarioId,
      organizacionId,
      'DESGLOSE_PRODUCTIVO',
      referencia,
      periodo,
    );
    return desglose;
  }

  private async generarPeriodico(
    usuarioId: number,
    organizacionId: number,
    periodo: PeriodoReporte,
  ) {
    const contexto = await this.obtenerContexto(usuarioId, organizacionId);
    await this.planService.checkProAccess(
      organizacionId,
      'Reportes semanales y mensuales',
    );

    const organizacion = await this.prisma.organizacion.findUniqueOrThrow({
      where: { id: organizacionId },
      select: { id: true, nombre: true },
    });
    const periodoAnterior = periodoAnteriorCerrado(periodo);
    const [actividad, maquinaria, finanzas, finanzasAnteriores, alertas] = await Promise.all([
      this.obtenerActividad(usuarioId, organizacionId, contexto, periodo),
      this.obtenerMaquinaria(organizacionId, contexto.campoIds, periodo),
      contexto.puedeVerFinanzas
        ? this.obtenerFinanzas(organizacionId, contexto.campoIds, periodo)
        : null,
      contexto.puedeVerFinanzas
        ? this.obtenerFinanzas(organizacionId, contexto.campoIds, periodoAnterior)
        : null,
      this.obtenerAlertas(organizacionId, contexto.campoIds, contexto.puedeVerFinanzas),
    ]);

    const comparacionAnterior = finanzas && finanzasAnteriores
      ? {
          ingresos: this.variacionPorcentual(finanzas.ingresos, finanzasAnteriores.ingresos),
          egresos: this.variacionPorcentual(finanzas.egresos, finanzasAnteriores.egresos),
          saldo: this.variacionPorcentual(finanzas.saldo, finanzasAnteriores.saldo),
        }
      : null;

    return {
      tipo: periodo.tipo,
      organizacion,
      periodo: this.serializarPeriodo(periodo),
      generadoEn: new Date(),
      alcance: {
        incluyeFinanzas: contexto.puedeVerFinanzas,
        campoIds: contexto.campoIds ?? null,
      },
      actividad,
      maquinaria,
      finanzas: finanzas && { ...finanzas, comparacionAnterior },
      alertas,
      resumen: this.crearResumen(actividad, maquinaria, finanzas, alertas),
      resumenInteligente: generarResumenInteligente({
        actividad,
        maquinaria,
        finanzas: finanzas && { ...finanzas, comparacionAnterior },
        alertas,
      }),
      criterios: {
        costos: 'Los costos reales se informan por separado de los egresos manuales para evitar duplicaciones.',
        estimados: 'Los costos estimados no modifican el saldo: sirven como referencia de desvíos.',
        periodo: 'El informe utiliza períodos cerrados en horario de Argentina.',
      },
    };
  }

  private async obtenerContexto(usuarioId: number, organizacionId: number): Promise<ContextoReportes> {
    const accesoReportes = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Reportes',
    );
    const puedeVerFinanzas = accesoReportes.esOwner || await this.tieneModuloFinanzas(
      usuarioId,
      organizacionId,
    );
    const campoIds = accesoReportes.esOwner
      ? undefined
      : (await this.prisma.asignacionCampo.findMany({
          where: {
            usuarioOrganizacionId: accesoReportes.usuarioOrganizacionId,
            activo: true,
          },
          select: { campoId: true },
        })).map((asignacion) => asignacion.campoId);

    return { ...accesoReportes, puedeVerFinanzas, campoIds };
  }

  private async obtenerActividad(
    usuarioId: number,
    organizacionId: number,
    contexto: ContextoReportes,
    periodo: PeriodoReporte,
  ) {
    const actividades = await this.prisma.actividadMiembro.findMany({
      where: {
        organizacionId,
        activo: true,
        ...(contexto.esOwner ? {} : { usuarioOrganizacionId: contexto.usuarioOrganizacionId }),
        OR: [
          {
            estado: EstadoActividad.COMPLETADA,
            fechaRealFin: { gte: periodo.desde, lt: periodo.hasta },
          },
          { estado: { in: ESTADOS_ACTIVOS } },
        ],
      },
      select: {
        id: true,
        titulo: true,
        recursoTipo: true,
        recursoId: true,
        fechaInicio: true,
        fechaEstimadaFin: true,
        fechaRealFin: true,
        estado: true,
        prioridad: true,
        usuarioOrganizacion: { select: { usuario: { select: { nombre: true } } } },
      },
      orderBy: [{ fechaEstimadaFin: 'asc' }, { fechaInicio: 'asc' }],
      take: 100,
    });
    const ahora = new Date();
    const resumen = actividades.map((actividad) => ({
      id: actividad.id,
      titulo: actividad.titulo,
      responsable: actividad.usuarioOrganizacion.usuario.nombre,
      recursoTipo: actividad.recursoTipo,
      recursoId: actividad.recursoId,
      fechaInicio: actividad.fechaInicio,
      fechaEstimadaFin: actividad.fechaEstimadaFin,
      fechaRealFin: actividad.fechaRealFin,
      estado: actividad.estado,
      prioridad: actividad.prioridad,
    }));

    return {
      completadas: resumen.filter((actividad) => actividad.estado === EstadoActividad.COMPLETADA).length,
      pendientes: resumen.filter((actividad) => ESTADOS_ACTIVOS.includes(actividad.estado)).length,
      vencidas: resumen.filter((actividad) =>
        ESTADOS_ACTIVOS.includes(actividad.estado)
        && actividad.fechaEstimadaFin
        && actividad.fechaEstimadaFin < ahora,
      ).length,
      realizadas: resumen.filter((actividad) => actividad.estado === EstadoActividad.COMPLETADA),
      proximas: resumen.filter((actividad) =>
        ESTADOS_ACTIVOS.includes(actividad.estado)
        && actividad.fechaInicio >= periodo.desde
        && actividad.fechaInicio < periodo.hasta,
      ),
      alcance: contexto.esOwner ? 'ORGANIZACION' : `USUARIO_${usuarioId}`,
    };
  }

  private async obtenerMaquinaria(
    organizacionId: number,
    campoIds: number[] | undefined,
    periodo: PeriodoReporte,
  ) {
    const filtroCampo = campoIds ? { campoId: { in: campoIds } } : {};
    const [mantenimientos, gastos] = await Promise.all([
      this.prisma.mantenimientoMaquinaria.findMany({
        where: {
          fecha: { gte: periodo.desde, lt: periodo.hasta },
          maquinaria: { organizacionId, ...filtroCampo },
        },
        select: {
          id: true,
          tipo: true,
          descripcion: true,
          fecha: true,
          costo: true,
          maquinaria: { select: { nombre: true } },
        },
        orderBy: { fecha: 'desc' },
        take: 30,
      }),
      this.prisma.gastoMaquinaria.findMany({
        where: {
          fecha: { gte: periodo.desde, lt: periodo.hasta },
          maquinaria: { organizacionId, ...filtroCampo },
        },
        select: {
          id: true,
          tipo: true,
          descripcion: true,
          fecha: true,
          monto: true,
          maquinaria: { select: { nombre: true } },
        },
        orderBy: { fecha: 'desc' },
        take: 30,
      }),
    ]);

    return {
      mantenimientos: mantenimientos.length,
      gastosRegistrados: gastos.length,
      costoMantenimientos: this.redondear(mantenimientos.reduce((total, item) => total + (item.costo ?? 0), 0)),
      gastoMaquinaria: this.redondear(gastos.reduce((total, item) => total + item.monto, 0)),
      recientes: [
        ...mantenimientos.map((item) => ({
          id: `mantenimiento-${item.id}`,
          tipo: 'MANTENIMIENTO',
          titulo: item.descripcion || item.tipo,
          maquinaria: item.maquinaria.nombre,
          fecha: item.fecha,
          monto: item.costo ?? 0,
        })),
        ...gastos.map((item) => ({
          id: `gasto-${item.id}`,
          tipo: 'GASTO',
          titulo: item.descripcion,
          maquinaria: item.maquinaria.nombre,
          fecha: item.fecha,
          monto: item.monto,
        })),
      ].sort((primero, segundo) => segundo.fecha.getTime() - primero.fecha.getTime()).slice(0, 10),
    };
  }

  private async obtenerFinanzas(
    organizacionId: number,
    campoIds: number[] | undefined,
    periodo: PeriodoReporte,
  ) {
    const rango = { gte: periodo.desde, lt: periodo.hasta };
    const filtroMovimientos = campoIds ? {
      OR: [
        { campoId: { in: campoIds } },
        { siembra: { lote: { campoId: { in: campoIds } } } },
      ],
    } : {};
    const filtroCostos = campoIds ? {
      OR: [
        { campoId: { in: campoIds } },
        { lote: { campoId: { in: campoIds } } },
        { siembra: { lote: { campoId: { in: campoIds } } } },
        { maquinaria: { campoId: { in: campoIds } } },
      ],
    } : {};
    const [movimientos, costos] = await Promise.all([
      this.prisma.movimientoFinanciero.findMany({
        where: { organizacionId, fecha: rango, ...filtroMovimientos },
        select: { tipo: true, origen: true, monto: true },
      }),
      this.prisma.costoProductivo.findMany({
        where: { organizacionId, fecha: rango, ...filtroCostos },
        select: { tipo: true, rubro: true, monto: true },
      }),
    ]);
    const ingresos = movimientos
      .filter((movimiento) => movimiento.tipo === TipoMovimiento.INGRESO)
      .reduce((total, movimiento) => total + movimiento.monto, 0);
    const egresosManuales = movimientos
      .filter((movimiento) => movimiento.tipo === TipoMovimiento.EGRESO && movimiento.origen !== OrigenMovimientoFinanciero.COSTO_PRODUCTIVO)
      .reduce((total, movimiento) => total + movimiento.monto, 0);
    const costosReales = costos
      .filter((costo) => costo.tipo === TipoCostoProductivo.REAL)
      .reduce((total, costo) => total + Number(costo.monto), 0);
    const costosEstimados = costos
      .filter((costo) => costo.tipo === TipoCostoProductivo.ESTIMADO)
      .reduce((total, costo) => total + Number(costo.monto), 0);
    const costosPorRubro = costos
      .filter((costo) => costo.tipo === TipoCostoProductivo.REAL)
      .reduce<Record<string, number>>((acumulado, costo) => {
        acumulado[costo.rubro] = this.redondear((acumulado[costo.rubro] ?? 0) + Number(costo.monto));
        return acumulado;
      }, {});
    const egresos = egresosManuales + costosReales;

    return {
      ingresos: this.redondear(ingresos),
      egresosManuales: this.redondear(egresosManuales),
      costosReales: this.redondear(costosReales),
      costosEstimados: this.redondear(costosEstimados),
      egresos: this.redondear(egresos),
      saldo: this.redondear(ingresos - egresos),
      desvioCostos: this.redondear(costosReales - costosEstimados),
      costosPorRubro,
    };
  }

  private async obtenerAlertas(
    organizacionId: number,
    campoIds: number[] | undefined,
    puedeVerFinanzas: boolean,
  ) {
    const alertas = await this.alertasService.listarParaOrganizaciones([organizacionId], campoIds);
    const visibles = puedeVerFinanzas
      ? alertas
      : alertas.filter((alerta) => ![
          'COSTO_SUPERA_ESTIMADO',
          'ACTIVIDAD_COMPLETADA_SIN_COSTO_REAL',
        ].includes(alerta.tipo));
    return {
      total: visibles.length,
      prioritarias: visibles.filter((alerta) => alerta.severidad === 'CRITICA').length,
      items: visibles.slice(0, 10),
    };
  }

  private crearResumen(
    actividad: { completadas: number; vencidas: number },
    maquinaria: { mantenimientos: number; gastosRegistrados: number },
    finanzas: { saldo: number } | null,
    alertas: { prioritarias: number },
  ) {
    const partes = [`Se completaron ${actividad.completadas} trabajos en el período.`];
    if (actividad.vencidas) partes.push(`Hay ${actividad.vencidas} trabajos vencidos para revisar.`);
    if (finanzas) partes.push(`El saldo operativo del período fue de $${finanzas.saldo.toLocaleString('es-AR')}.`);
    if (maquinaria.mantenimientos || maquinaria.gastosRegistrados) {
      partes.push(`Se registraron ${maquinaria.mantenimientos} mantenimientos y ${maquinaria.gastosRegistrados} gastos de maquinaria.`);
    }
    if (alertas.prioritarias) partes.push(`Hay ${alertas.prioritarias} alertas prioritarias que requieren atención.`);
    return partes;
  }

  private serializarPeriodo(periodo: PeriodoReporte) {
    return {
      tipo: periodo.tipo,
      desde: periodo.desde,
      hasta: periodo.hasta,
      etiqueta: periodo.etiqueta,
      zonaHoraria: periodo.zonaHoraria,
      cerrado: periodo.cerrado,
    };
  }

  private async registrarHistorial(
    usuarioId: number,
    organizacionId: number,
    tipo: 'SEMANAL' | 'MENSUAL' | 'DESGLOSE_PRODUCTIVO',
    fechaReferencia: Date,
    periodo: PeriodoReporte,
  ) {
    await this.prisma.historialReporte.create({
      data: {
        usuarioId,
        organizacionId,
        tipo,
        fechaReferencia,
        periodoDesde: periodo.desde,
        periodoHasta: periodo.hasta,
      },
    });
  }

  private variacionPorcentual(actual: number, anterior: number) {
    if (!anterior) return null;
    return this.redondear(((actual - anterior) / Math.abs(anterior)) * 100);
  }

  private redondear(valor: number) {
    return Math.round((valor + Number.EPSILON) * 100) / 100;
  }

  private acumularCosto(
    acumulados: Map<number, { reales: number; estimados: number }>,
    id: number,
    tipo: 'reales' | 'estimados',
    monto: number,
  ) {
    const actual = acumulados.get(id) ?? { reales: 0, estimados: 0 };
    actual[tipo] += monto;
    acumulados.set(id, actual);
  }

  private async tieneModuloFinanzas(usuarioId: number, organizacionId: number) {
    try {
      await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Finanzas');
      return true;
    } catch {
      return false;
    }
  }
}
