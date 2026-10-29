import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';

export type AgroBotIndicador = {
  etiqueta: string;
  valor: string;
  detalle?: string;
};

export type AgroBotReferencia = {
  etiqueta: string;
  href: string;
};

export type AgroBotRespuesta = {
  texto: string;
  indicadores?: AgroBotIndicador[];
  referencias?: AgroBotReferencia[];
  basadaEnDatos: boolean;
};

type Periodo = {
  desde: Date;
  hasta: Date;
  etiqueta: string;
};

type CampoVisible = {
  id: number;
  nombre: string;
  hectareas: number;
};

type ActividadVisible = {
  titulo: string;
  estado: string;
  prioridad: string;
  fechaInicio: Date;
  fechaEstimadaFin: Date | null;
  fechaRealFin: Date | null;
};

type MovimientoVisible = {
  tipo: string;
  monto: number;
  fecha: Date;
  concepto: string;
  categoria: string;
};

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

@Injectable()
export class AgroBotConsultasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
  ) {}

  async responder(
    usuarioId: number,
    organizacionId: number,
    mensaje: string,
  ): Promise<AgroBotRespuesta | null> {
    const consulta = this.normalizar(mensaje);

    if (this.esResumen(consulta)) {
      return this.resumenEstablecimiento(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['por hectarea', 'por ha'])) {
      return this.gastoPorHectarea(usuarioId, organizacionId, consulta);
    }
    if (this.incluye(consulta, ['lote mas costoso', 'lote mas caro'])) {
      return this.loteMasCostoso(usuarioId, organizacionId);
    }
    if (
      this.incluye(consulta, ['campana']) &&
      this.incluye(consulta, ['mayor gasto', 'mayores gastos', 'mas gasto', 'mas costosa', 'mas cara'])
    ) {
      return this.campaniaMasCostosa(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['superaron el presupuesto', 'supero el presupuesto', 'desvio de presupuesto'])) {
      return this.desviosDePresupuesto(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['evolucionaron mis gastos', 'evolucion de gastos', 'evolucionar los gastos'])) {
      return this.evolucionGastos(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['gasto de maquinaria', 'gastos de maquinaria', 'gastos maquinaria'])) {
      return this.gastosMaquinaria(usuarioId, organizacionId, consulta);
    }
    if (this.incluye(consulta, ['mantenimiento proximo', 'mantenimientos proximos', 'mantenimiento pendiente'])) {
      return this.mantenimientosProximos(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['maquinaria se utilizo', 'maquinaria se uso', 'equipos se utilizaron'])) {
      return this.maquinariaEnTrabajos(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['cuantas hectareas', 'hectareas tengo', 'hectareas registradas'])) {
      return this.hectareasRegistradas(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['actividades se realizaron', 'trabajos se realizaron'])) {
      const respuesta = await this.actividadesDeLote(usuarioId, organizacionId, consulta);
      if (respuesta) return respuesta;
    }
    if (this.incluye(consulta, ['costaron los trabajos', 'costo del lote', 'costos del lote'])) {
      const respuesta = await this.costosDeLote(usuarioId, organizacionId, consulta);
      if (respuesta) return respuesta;
    }
    if (this.incluye(consulta, ['atrasad', 'vencid'])) {
      return this.trabajosAtrasados(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['actividades esta semana', 'trabajos esta semana', 'realizaron esta semana'])) {
      return this.trabajosRealizados(usuarioId, organizacionId, this.obtenerPeriodo(consulta, 'semana'));
    }
    if (this.incluye(consulta, ['proximos trabajos', 'proximas tareas', 'trabajos programados'])) {
      return this.proximosTrabajos(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['tareas pendientes', 'trabajos pendientes', 'tengo pendiente'])) {
      return this.trabajosPendientes(usuarioId, organizacionId);
    }
    if (this.incluye(consulta, ['cuanto gaste', 'cuanto gasto', 'mis gastos', 'mis egresos'])) {
      return this.gastosDelPeriodo(
        usuarioId,
        organizacionId,
        consulta,
        this.obtenerPeriodo(consulta),
      );
    }

    return null;
  }

  async contextoParaIa(usuarioId: number, organizacionId: number): Promise<string> {
    const [campos, actividades, movimientos] = await Promise.all([
      this.camposAutorizados(usuarioId, organizacionId).catch((): CampoVisible[] => []),
      this.actividadesAutorizadas(usuarioId, organizacionId).catch((): ActividadVisible[] => []),
      this.movimientosAutorizados(usuarioId, organizacionId).catch((): MovimientoVisible[] => []),
    ]);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const hectareas = campos.reduce((total, campo) => total + campo.hectareas, 0);
    const pendientes = actividades.filter((actividad) =>
      ['PENDIENTE', 'EN_PROGRESO', 'PAUSADA'].includes(actividad.estado),
    );
    const atrasadas = pendientes.filter(
      (actividad) => actividad.fechaEstimadaFin && actividad.fechaEstimadaFin < hoy,
    );
    const ingresos = movimientos
      .filter((movimiento) => movimiento.tipo === 'INGRESO')
      .reduce((total, movimiento) => total + movimiento.monto, 0);
    const egresos = movimientos
      .filter((movimiento) => movimiento.tipo === 'EGRESO')
      .reduce((total, movimiento) => total + movimiento.monto, 0);

    return [
      'Datos autorizados del establecimiento activo:',
      `Campos visibles: ${campos.length}; superficie: ${this.numero(hectareas)} ha.`,
      `Trabajos activos visibles: ${pendientes.length}; atrasados: ${atrasadas.length}.`,
      `Movimientos visibles: ingresos ${this.dinero(ingresos)}; egresos ${this.dinero(egresos)}.`,
      'Estos datos son referencia. No inventes valores ni supongas registros no incluidos.',
    ].join('\n');
  }

  private async resumenEstablecimiento(usuarioId: number, organizacionId: number) {
    const [campos, actividades] = await Promise.all([
      this.camposAutorizados(usuarioId, organizacionId),
      this.actividadesAutorizadas(usuarioId, organizacionId).catch((): ActividadVisible[] => []),
    ]);
    const hectareas = campos.reduce((total, campo) => total + campo.hectareas, 0);
    const activas = actividades.filter((actividad) =>
      ['PENDIENTE', 'EN_PROGRESO', 'PAUSADA'].includes(actividad.estado),
    );
    const referencias: AgroBotReferencia[] = [{ etiqueta: 'Ver campos', href: this.ruta(organizacionId, 'campos') }];
    if (actividades.length) referencias.push({ etiqueta: 'Ver trabajos', href: this.ruta(organizacionId, 'tareas') });

    return {
      texto: `En el establecimiento activo tenes ${campos.length} campo${campos.length === 1 ? '' : 's'} visibles y ${this.numero(hectareas)} ha registradas. Hay ${activas.length} trabajo${activas.length === 1 ? '' : 's'} activo${activas.length === 1 ? '' : 's'} que podes seguir desde Tareas.`,
      indicadores: [
        { etiqueta: 'Campos visibles', valor: String(campos.length) },
        { etiqueta: 'Superficie', valor: `${this.numero(hectareas)} ha` },
        { etiqueta: 'Trabajos activos', valor: String(activas.length) },
      ],
      referencias,
      basadaEnDatos: true,
    };
  }

  private async gastosDelPeriodo(
    usuarioId: number,
    organizacionId: number,
    consulta: string,
    periodo: Periodo,
  ) {
    const movimientos = await this.movimientosAutorizados(usuarioId, organizacionId, periodo);
    const tema = this.temaDeGasto(consulta);
    const egresosBase = movimientos.filter((movimiento) => movimiento.tipo === 'EGRESO');
    const egresos = tema
      ? egresosBase.filter((movimiento) => tema.coincide(movimiento))
      : egresosBase;
    const total = egresos.reduce((suma, movimiento) => suma + movimiento.monto, 0);
    const etiquetaTema = tema ? ` de ${tema.etiqueta}` : '';

    return {
      texto: egresos.length
        ? `Registraste ${this.dinero(total)}${etiquetaTema} en ${periodo.etiqueta}, en ${egresos.length} movimiento${egresos.length === 1 ? '' : 's'} visible${egresos.length === 1 ? '' : 's'}.`
        : `No hay egresos visibles${etiquetaTema} registrados en ${periodo.etiqueta}.`,
      indicadores: [
        { etiqueta: 'Egresos', valor: this.dinero(total), detalle: periodo.etiqueta },
        { etiqueta: 'Movimientos', valor: String(egresos.length) },
      ],
      referencias: [{ etiqueta: 'Ver finanzas', href: this.ruta(organizacionId, 'finanzas') }],
      basadaEnDatos: true,
    };
  }

  private async gastoPorHectarea(usuarioId: number, organizacionId: number, consulta: string) {
    const [campos, movimientos] = await Promise.all([
      this.camposAutorizados(usuarioId, organizacionId),
      this.movimientosAutorizados(usuarioId, organizacionId, this.obtenerPeriodo(consulta)),
    ]);
    const hectareas = campos.reduce((total, campo) => total + campo.hectareas, 0);
    const egresos = movimientos
      .filter((movimiento) => movimiento.tipo === 'EGRESO')
      .reduce((total, movimiento) => total + movimiento.monto, 0);
    const porHa = hectareas > 0 ? egresos / hectareas : 0;

    return {
      texto: hectareas > 0
        ? `El gasto visible es de ${this.dinero(porHa)} por hectarea en ${this.obtenerPeriodo(consulta).etiqueta}, considerando ${this.numero(hectareas)} ha registradas.`
        : 'No puedo calcular el gasto por hectarea porque no hay superficie visible registrada.',
      indicadores: [
        { etiqueta: 'Gasto por ha', valor: this.dinero(porHa) },
        { etiqueta: 'Superficie', valor: `${this.numero(hectareas)} ha` },
      ],
      referencias: [{ etiqueta: 'Ver finanzas', href: this.ruta(organizacionId, 'finanzas') }],
      basadaEnDatos: true,
    };
  }

  private async loteMasCostoso(usuarioId: number, organizacionId: number) {
    const costos = await this.costosAutorizados(usuarioId, organizacionId);
    const totales = new Map<number, { nombre: string; campoNombre: string; monto: number }>();
    for (const costo of costos.filter((costo) => costo.tipo === 'REAL')) {
      const lote = costo.lote ?? costo.siembra?.lote;
      if (!lote) continue;
      const actual = totales.get(lote.id) ?? { nombre: lote.nombre, campoNombre: lote.campo.nombre, monto: 0 };
      actual.monto += Number(costo.monto);
      totales.set(lote.id, actual);
    }
    const mayor = [...totales.entries()].sort((a, b) => b[1].monto - a[1].monto)[0];
    if (!mayor) return this.sinDatos('No hay costos reales vinculados a lotes para identificar el lote mas costoso.', organizacionId, 'rentabilidad');

    return {
      texto: `El lote con mayor costo productivo real registrado es ${mayor[1].nombre}, de ${mayor[1].campoNombre}, con ${this.dinero(mayor[1].monto)}. Solo se consideran costos vinculados a un lote.`,
      indicadores: [
        { etiqueta: 'Lote', valor: mayor[1].nombre, detalle: mayor[1].campoNombre },
        { etiqueta: 'Costo real', valor: this.dinero(mayor[1].monto) },
      ],
      referencias: [{ etiqueta: 'Ver rentabilidad', href: this.ruta(organizacionId, 'rentabilidad') }],
      basadaEnDatos: true,
    };
  }

  private async campaniaMasCostosa(usuarioId: number, organizacionId: number) {
    const costos = await this.costosAutorizados(usuarioId, organizacionId);
    const totales = new Map<number, { nombre: string; monto: number }>();
    for (const costo of costos.filter((costo) => costo.tipo === 'REAL')) {
      const campania = costo.campania ?? costo.siembra?.campania;
      if (!campania) continue;
      const actual = totales.get(campania.id) ?? { nombre: campania.nombre, monto: 0 };
      actual.monto += Number(costo.monto);
      totales.set(campania.id, actual);
    }
    const mayor = [...totales.entries()].sort((a, b) => b[1].monto - a[1].monto)[0];
    if (!mayor) return this.sinDatos('No hay costos reales asociados a campanas para compararlas.', organizacionId, 'rentabilidad');

    return {
      texto: `La campana con mayor costo productivo real registrado es ${mayor[1].nombre}, con ${this.dinero(mayor[1].monto)}.`,
      indicadores: [
        { etiqueta: 'Campana', valor: mayor[1].nombre },
        { etiqueta: 'Costo real', valor: this.dinero(mayor[1].monto) },
      ],
      referencias: [{ etiqueta: 'Ver campanas', href: this.ruta(organizacionId, 'campanias') }],
      basadaEnDatos: true,
    };
  }

  private async desviosDePresupuesto(usuarioId: number, organizacionId: number) {
    const costos = await this.costosAutorizados(usuarioId, organizacionId);
    const grupos = new Map<string, { etiqueta: string; estimado: number; real: number }>();
    for (const costo of costos) {
      const lote = costo.lote ?? costo.siembra?.lote;
      const clave = lote ? `lote-${lote.id}` : costo.campaniaId ? `campania-${costo.campaniaId}` : null;
      if (!clave) continue;
      const etiqueta = lote
        ? `${lote.nombre} (${lote.campo.nombre})`
        : costo.campania?.nombre ?? 'Campana sin nombre';
      const grupo = grupos.get(clave) ?? { etiqueta, estimado: 0, real: 0 };
      if (costo.tipo === 'REAL') grupo.real += Number(costo.monto);
      else grupo.estimado += Number(costo.monto);
      grupos.set(clave, grupo);
    }
    const desvios = [...grupos.values()]
      .filter((grupo) => grupo.estimado > 0 && grupo.real > grupo.estimado)
      .map((grupo) => ({ ...grupo, porcentaje: ((grupo.real - grupo.estimado) / grupo.estimado) * 100 }))
      .sort((a, b) => b.porcentaje - a.porcentaje);
    if (!desvios.length) {
      return this.sinDatos('No hay trabajos con costo real superior al presupuesto dentro de los datos visibles.', organizacionId, 'rentabilidad');
    }
    const principal = desvios[0];
    return {
      texto: `${desvios.length} destino${desvios.length === 1 ? '' : 's'} supera${desvios.length === 1 ? '' : 'n'} el presupuesto. El mayor desvio es ${principal.etiqueta}: ${this.dinero(principal.real)} reales frente a ${this.dinero(principal.estimado)} estimados (${this.numero(principal.porcentaje)}% por encima).`,
      indicadores: [
        { etiqueta: 'Desvios detectados', valor: String(desvios.length) },
        { etiqueta: 'Mayor desvio', valor: `${this.numero(principal.porcentaje)}%`, detalle: principal.etiqueta },
      ],
      referencias: [{ etiqueta: 'Ver rentabilidad', href: this.ruta(organizacionId, 'rentabilidad') }],
      basadaEnDatos: true,
    };
  }

  private async evolucionGastos(usuarioId: number, organizacionId: number) {
    const hoy = new Date();
    const desde = new Date(hoy.getFullYear(), hoy.getMonth() - 5, 1);
    const hasta = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
    const movimientos = await this.movimientosAutorizados(usuarioId, organizacionId, { desde, hasta, etiqueta: 'los ultimos 6 meses' });
    const meses = new Map<string, number>();
    for (const movimiento of movimientos.filter((movimiento) => movimiento.tipo === 'EGRESO')) {
      const fecha = movimiento.fecha;
      const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      meses.set(clave, (meses.get(clave) ?? 0) + movimiento.monto);
    }
    const serie = [...meses.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    if (!serie.length) return this.sinDatos('No hay egresos visibles en los ultimos 6 meses para analizar su evolucion.', organizacionId, 'finanzas');
    const mayor = [...serie].sort((a, b) => b[1] - a[1])[0];
    const ultimo = serie[serie.length - 1];
    return {
      texto: `En los ultimos 6 meses con movimientos, el mayor nivel de egresos fue ${this.dinero(mayor[1])} en ${this.nombreMes(mayor[0])}. El ultimo mes registrado suma ${this.dinero(ultimo[1])}.`,
      indicadores: [
        { etiqueta: 'Mes mas alto', valor: this.dinero(mayor[1]), detalle: this.nombreMes(mayor[0]) },
        { etiqueta: 'Ultimo mes', valor: this.dinero(ultimo[1]), detalle: this.nombreMes(ultimo[0]) },
      ],
      referencias: [{ etiqueta: 'Ver finanzas', href: this.ruta(organizacionId, 'finanzas') }],
      basadaEnDatos: true,
    };
  }

  private async trabajosPendientes(usuarioId: number, organizacionId: number) {
    const actividades = await this.actividadesAutorizadas(usuarioId, organizacionId);
    const pendientes = actividades
      .filter((actividad) => ['PENDIENTE', 'EN_PROGRESO', 'PAUSADA'].includes(actividad.estado))
      .sort((a, b) => a.fechaInicio.getTime() - b.fechaInicio.getTime());
    return this.respuestaTrabajos('Tenes', pendientes, organizacionId, 'pendientes o en curso');
  }

  private async trabajosAtrasados(usuarioId: number, organizacionId: number) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const actividades = await this.actividadesAutorizadas(usuarioId, organizacionId);
    const atrasadas = actividades.filter(
      (actividad) =>
        ['PENDIENTE', 'EN_PROGRESO', 'PAUSADA'].includes(actividad.estado) &&
        actividad.fechaEstimadaFin &&
        actividad.fechaEstimadaFin < hoy,
    );
    return this.respuestaTrabajos('Hay', atrasadas, organizacionId, 'atrasados');
  }

  private async trabajosRealizados(usuarioId: number, organizacionId: number, periodo: Periodo) {
    const actividades = await this.actividadesAutorizadas(usuarioId, organizacionId);
    const realizadas = actividades.filter(
      (actividad) =>
        actividad.estado === 'COMPLETADA' &&
        actividad.fechaRealFin &&
        actividad.fechaRealFin >= periodo.desde &&
        actividad.fechaRealFin < periodo.hasta,
    );
    return this.respuestaTrabajos('Se realizaron', realizadas, organizacionId, `en ${periodo.etiqueta}`);
  }

  private async proximosTrabajos(usuarioId: number, organizacionId: number) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const actividades = (await this.actividadesAutorizadas(usuarioId, organizacionId))
      .filter(
        (actividad) =>
          ['PENDIENTE', 'EN_PROGRESO', 'PAUSADA'].includes(actividad.estado) &&
          actividad.fechaInicio >= hoy,
      )
      .sort((a, b) => a.fechaInicio.getTime() - b.fechaInicio.getTime())
      .slice(0, 5);
    return this.respuestaTrabajos('Los proximos trabajos son', actividades, organizacionId, 'programados');
  }

  private async hectareasRegistradas(usuarioId: number, organizacionId: number) {
    const campos = await this.camposAutorizados(usuarioId, organizacionId);
    const hectareas = campos.reduce((total, campo) => total + campo.hectareas, 0);
    return {
      texto: `Tenes ${this.numero(hectareas)} hectareas registradas en ${campos.length} campo${campos.length === 1 ? '' : 's'} visible${campos.length === 1 ? '' : 's'}.`,
      indicadores: [
        { etiqueta: 'Superficie', valor: `${this.numero(hectareas)} ha` },
        { etiqueta: 'Campos', valor: String(campos.length) },
      ],
      referencias: [{ etiqueta: 'Ver campos', href: this.ruta(organizacionId, 'campos') }],
      basadaEnDatos: true,
    };
  }

  private async actividadesDeLote(usuarioId: number, organizacionId: number, consulta: string) {
    const lote = await this.buscarLoteMencionado(usuarioId, organizacionId, consulta);
    if (!lote) return null;
    const acceso = await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Tareas');
    const actividades = await this.prisma.actividadMiembro.findMany({
      where: {
        organizacionId,
        recursoTipo: 'LOTE',
        recursoId: lote.id,
        ...(acceso.esOwner ? {} : { usuarioOrganizacionId: acceso.usuarioOrganizacionId }),
      },
      select: { titulo: true, estado: true, fechaRealFin: true, fechaInicio: true },
      orderBy: { fechaInicio: 'desc' },
      take: 8,
    });
    const completadas = actividades.filter((actividad) => actividad.estado === 'COMPLETADA');
    return {
      texto: completadas.length
        ? `En ${lote.nombre} se registraron ${completadas.length} actividad${completadas.length === 1 ? '' : 'es'} completada${completadas.length === 1 ? '' : 's'}: ${completadas.map((actividad) => actividad.titulo).join(', ')}.`
        : `No hay actividades completadas vinculadas directamente al lote ${lote.nombre} dentro de los datos visibles.`,
      indicadores: [{ etiqueta: 'Actividades completadas', valor: String(completadas.length), detalle: lote.nombre }],
      referencias: [{ etiqueta: 'Ver lote', href: this.ruta(organizacionId, `campos/${lote.campoId}/lotes/${lote.id}`) }],
      basadaEnDatos: true,
    };
  }

  private async costosDeLote(usuarioId: number, organizacionId: number, consulta: string) {
    const lote = await this.buscarLoteMencionado(usuarioId, organizacionId, consulta);
    if (!lote) return null;
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Reportes');
    const costos = await this.prisma.costoProductivo.findMany({
      where: {
        organizacionId,
        OR: [{ loteId: lote.id }, { siembra: { loteId: lote.id } }],
      },
      select: { tipo: true, monto: true },
    });
    const real = costos.filter((costo) => costo.tipo === 'REAL').reduce((total, costo) => total + Number(costo.monto), 0);
    const estimado = costos.filter((costo) => costo.tipo === 'ESTIMADO').reduce((total, costo) => total + Number(costo.monto), 0);
    return {
      texto: `Para ${lote.nombre} hay ${this.dinero(real)} de costos reales y ${this.dinero(estimado)} estimados vinculados.`,
      indicadores: [
        { etiqueta: 'Costo real', valor: this.dinero(real) },
        { etiqueta: 'Presupuesto', valor: this.dinero(estimado) },
      ],
      referencias: [{ etiqueta: 'Ver rentabilidad', href: this.ruta(organizacionId, 'rentabilidad') }],
      basadaEnDatos: true,
    };
  }

  private async gastosMaquinaria(usuarioId: number, organizacionId: number, consulta: string) {
    const campoIds = await this.idsCamposAutorizados(usuarioId, organizacionId, 'Maquinarias');
    const periodo = this.obtenerPeriodo(consulta);
    const gastos = await this.prisma.gastoMaquinaria.findMany({
      where: {
        fecha: { gte: periodo.desde, lt: periodo.hasta },
        maquinaria: {
          organizacionId,
          ...(campoIds ? { campoId: { in: campoIds } } : {}),
        },
      },
      select: { monto: true },
    });
    const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);
    return {
      texto: gastos.length
        ? `Registraste ${this.dinero(total)} de gastos de maquinaria en ${periodo.etiqueta}.`
        : `No hay gastos de maquinaria visibles en ${periodo.etiqueta}.`,
      indicadores: [{ etiqueta: 'Gastos de maquinaria', valor: this.dinero(total), detalle: periodo.etiqueta }],
      referencias: [{ etiqueta: 'Ver maquinarias', href: this.ruta(organizacionId, 'maquinarias') }],
      basadaEnDatos: true,
    };
  }

  private async mantenimientosProximos(usuarioId: number, organizacionId: number) {
    const campoIds = await this.idsCamposAutorizados(usuarioId, organizacionId, 'Maquinarias');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const limite = new Date(hoy);
    limite.setDate(limite.getDate() + 30);
    const mantenimientos = await this.prisma.mantenimientoMaquinaria.findMany({
      where: {
        proximoMantenimiento: { gte: hoy, lte: limite },
        maquinaria: {
          organizacionId,
          ...(campoIds ? { campoId: { in: campoIds } } : {}),
        },
      },
      select: { proximoMantenimiento: true, maquinaria: { select: { nombre: true } } },
      orderBy: { proximoMantenimiento: 'asc' },
      take: 5,
    });
    return {
      texto: mantenimientos.length
        ? `Hay ${mantenimientos.length} mantenimiento${mantenimientos.length === 1 ? '' : 's'} proximo${mantenimientos.length === 1 ? '' : 's'} en los siguientes 30 dias: ${mantenimientos.map((mantenimiento) => `${mantenimiento.maquinaria.nombre} (${this.fecha(mantenimiento.proximoMantenimiento!)})`).join(', ')}.`
        : 'No hay mantenimientos proximos registrados para los siguientes 30 dias.',
      indicadores: [{ etiqueta: 'Mantenimientos proximos', valor: String(mantenimientos.length), detalle: 'Proximos 30 dias' }],
      referencias: [{ etiqueta: 'Ver maquinarias', href: this.ruta(organizacionId, 'maquinarias') }],
      basadaEnDatos: true,
    };
  }

  private async maquinariaEnTrabajos(usuarioId: number, organizacionId: number) {
    const acceso = await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Tareas');
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Maquinarias');
    const actividades = await this.prisma.actividadMiembro.findMany({
      where: {
        organizacionId,
        recursoTipo: 'MAQUINARIA',
        ...(acceso.esOwner ? {} : { usuarioOrganizacionId: acceso.usuarioOrganizacionId }),
      },
      select: { titulo: true, estado: true, recursoId: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    const ids = [...new Set(actividades.map((actividad) => actividad.recursoId).filter((id): id is number => id !== null))];
    const maquinarias = ids.length
      ? await this.prisma.maquinaria.findMany({ where: { id: { in: ids }, organizacionId }, select: { id: true, nombre: true } })
      : [];
    const nombres = maquinarias.map((maquinaria) => maquinaria.nombre);
    return {
      texto: nombres.length
        ? `Las actividades visibles vinculadas a maquinaria incluyen: ${nombres.join(', ')}.`
        : 'No hay actividades visibles vinculadas directamente a una maquinaria.',
      indicadores: [{ etiqueta: 'Equipos vinculados', valor: String(nombres.length) }],
      referencias: [{ etiqueta: 'Ver trabajos', href: this.ruta(organizacionId, 'tareas') }],
      basadaEnDatos: true,
    };
  }

  private async camposAutorizados(usuarioId: number, organizacionId: number): Promise<CampoVisible[]> {
    const campoIds = await this.idsCamposAutorizados(usuarioId, organizacionId, 'Campos');
    return this.prisma.campo.findMany({
      where: { organizacionId, ...(campoIds ? { id: { in: campoIds } } : {}) },
      select: { id: true, nombre: true, hectareas: true },
      orderBy: { nombre: 'asc' },
    });
  }

  private async buscarLoteMencionado(usuarioId: number, organizacionId: number, consulta: string) {
    const campoIds = await this.idsCamposAutorizados(usuarioId, organizacionId, 'Campos');
    const lotes = await this.prisma.lote.findMany({
      where: { campo: { organizacionId, ...(campoIds ? { id: { in: campoIds } } : {}) } },
      select: { id: true, nombre: true, campoId: true },
    });
    return lotes
      .map((lote) => ({ lote, nombreNormalizado: this.normalizar(lote.nombre) }))
      .sort((a, b) => b.nombreNormalizado.length - a.nombreNormalizado.length)
      .find((item) => consulta.includes(item.nombreNormalizado))?.lote ?? null;
  }

  private async actividadesAutorizadas(
    usuarioId: number,
    organizacionId: number,
  ): Promise<ActividadVisible[]> {
    const acceso = await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Tareas');
    return this.prisma.actividadMiembro.findMany({
      where: { organizacionId, ...(acceso.esOwner ? {} : { usuarioOrganizacionId: acceso.usuarioOrganizacionId }) },
      select: { titulo: true, estado: true, prioridad: true, fechaInicio: true, fechaEstimadaFin: true, fechaRealFin: true },
      orderBy: { fechaInicio: 'asc' },
    });
  }

  private async movimientosAutorizados(
    usuarioId: number,
    organizacionId: number,
    periodo?: Periodo,
  ): Promise<MovimientoVisible[]> {
    const campoIds = await this.idsCamposAutorizados(usuarioId, organizacionId, 'Finanzas');
    return this.prisma.movimientoFinanciero.findMany({
      where: {
        organizacionId,
        ...(periodo ? { fecha: { gte: periodo.desde, lt: periodo.hasta } } : {}),
        ...(campoIds
          ? {
              OR: [
                { campoId: { in: campoIds } },
                { siembra: { lote: { campoId: { in: campoIds } } } },
              ],
            }
          : {}),
      },
      select: { tipo: true, monto: true, fecha: true, concepto: true, categoria: true },
    });
  }

  private async costosAutorizados(usuarioId: number, organizacionId: number) {
    const campoIds = await this.idsCamposAutorizados(usuarioId, organizacionId, 'Reportes');
    return this.prisma.costoProductivo.findMany({
      where: {
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
      },
      select: {
        tipo: true,
        monto: true,
        loteId: true,
        campaniaId: true,
        lote: { select: { id: true, nombre: true, campo: { select: { nombre: true } } } },
        siembra: {
          select: {
            lote: { select: { id: true, nombre: true, campo: { select: { nombre: true } } } },
            campania: { select: { id: true, nombre: true } },
          },
        },
        campania: { select: { id: true, nombre: true } },
      },
    });
  }

  private async idsCamposAutorizados(
    usuarioId: number,
    organizacionId: number,
    modulo: string,
  ): Promise<number[] | null> {
    const acceso = await this.memberAccessService.requireModule(usuarioId, organizacionId, modulo);
    if (acceso.esOwner) return null;
    return (
      await this.prisma.asignacionCampo.findMany({
        where: { usuarioOrganizacionId: acceso.usuarioOrganizacionId, activo: true },
        select: { campoId: true },
      })
    ).map((asignacion) => asignacion.campoId);
  }

  private respuestaTrabajos(
    inicio: string,
    actividades: Array<{ titulo: string; prioridad: string; fechaInicio: Date }>,
    organizacionId: number,
    estado: string,
  ): AgroBotRespuesta {
    const resumen = actividades.slice(0, 4).map((actividad) => `${actividad.titulo} (${this.fecha(actividad.fechaInicio)})`);
    return {
      texto: actividades.length
        ? `${inicio} ${actividades.length} trabajo${actividades.length === 1 ? '' : 's'} ${estado}: ${resumen.join(', ')}${actividades.length > resumen.length ? ', entre otros.' : '.'}`
        : `No hay trabajos ${estado} dentro de los datos visibles.`,
      indicadores: [{ etiqueta: 'Trabajos', valor: String(actividades.length), detalle: estado }],
      referencias: [{ etiqueta: 'Ver trabajos', href: this.ruta(organizacionId, 'tareas') }],
      basadaEnDatos: true,
    };
  }

  private sinDatos(texto: string, organizacionId: number, seccion: string): AgroBotRespuesta {
    return {
      texto,
      referencias: [{ etiqueta: 'Abrir seccion', href: this.ruta(organizacionId, seccion) }],
      basadaEnDatos: true,
    };
  }

  private obtenerPeriodo(consulta: string, predeterminado: 'mes' | 'semana' = 'mes'): Periodo {
    const ahora = new Date();
    if (consulta.includes('esta semana')) {
      return this.periodoSemana(ahora);
    }
    const mes = MESES.findIndex((nombre) => consulta.includes(nombre));
    if (mes >= 0) {
      const anioCoincidente = consulta.match(/\b20\d{2}\b/);
      const anio = anioCoincidente ? Number(anioCoincidente[0]) : ahora.getFullYear();
      return this.periodoMes(anio, mes);
    }
    if (consulta.includes('este ano') || consulta.includes('este año') || consulta.includes('anio actual')) {
      return {
        desde: new Date(ahora.getFullYear(), 0, 1),
        hasta: new Date(ahora.getFullYear() + 1, 0, 1),
        etiqueta: `el ano ${ahora.getFullYear()}`,
      };
    }
    return predeterminado === 'semana' ? this.periodoSemana(ahora) : this.periodoMes(ahora.getFullYear(), ahora.getMonth());
  }

  private periodoMes(anio: number, mes: number): Periodo {
    return {
      desde: new Date(anio, mes, 1),
      hasta: new Date(anio, mes + 1, 1),
      etiqueta: `${MESES[mes]} de ${anio}`,
    };
  }

  private periodoSemana(fecha: Date): Periodo {
    const desde = new Date(fecha);
    desde.setHours(0, 0, 0, 0);
    const dia = desde.getDay() || 7;
    desde.setDate(desde.getDate() - dia + 1);
    const hasta = new Date(desde);
    hasta.setDate(hasta.getDate() + 7);
    return { desde, hasta, etiqueta: 'esta semana' };
  }

  private esResumen(consulta: string) {
    return this.incluye(consulta, ['resumi mi establecimiento', 'resumen de mi establecimiento', 'como esta mi establecimiento']);
  }

  private incluye(texto: string, fragmentos: string[]) {
    return fragmentos.some((fragmento) => texto.includes(fragmento));
  }

  private temaDeGasto(consulta: string) {
    if (this.incluye(consulta, ['fertiliz', 'urea', 'fosfato', 'nitrato'])) {
      return {
        etiqueta: 'fertilizacion',
        coincide: (movimiento: MovimientoVisible) => {
          const detalle = this.normalizar(`${movimiento.concepto} ${movimiento.categoria}`);
          return this.incluye(detalle, ['fertiliz', 'urea', 'fosfato', 'nitrato']);
        },
      };
    }
    return null;
  }

  private normalizar(valor: string) {
    return valor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es-AR')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private ruta(organizacionId: number, seccion: string) {
    return `/org/${organizacionId}/${seccion}`;
  }

  private dinero(valor: number) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }

  private numero(valor: number) {
    return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 }).format(valor);
  }

  private fecha(fecha: Date) {
    return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(fecha);
  }

  private nombreMes(clave: string) {
    const [anio, mes] = clave.split('-');
    return `${MESES[Number(mes) - 1]} de ${anio}`;
  }
}
