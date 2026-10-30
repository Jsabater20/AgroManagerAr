export const ZONA_HORARIA_REPORTES_DEFAULT = 'America/Argentina/Buenos_Aires';

export type PeriodoReporte = {
  tipo: 'SEMANAL' | 'MENSUAL';
  zonaHoraria: string;
  desde: Date;
  hasta: Date;
  etiqueta: string;
  cerrado: true;
};

type PartesFecha = {
  anio: number;
  mes: number;
  dia: number;
  hora: number;
  minuto: number;
  segundo: number;
};

const obtenerPartes = (fecha: Date, zonaHoraria: string): PartesFecha => {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: zonaHoraria,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(fecha);
  const valor = (tipo: Intl.DateTimeFormatPartTypes) => Number(
    partes.find((parte) => parte.type === tipo)?.value ?? 0,
  );

  return {
    anio: valor('year'),
    mes: valor('month'),
    dia: valor('day'),
    hora: valor('hour'),
    minuto: valor('minute'),
    segundo: valor('second'),
  };
};

const offsetZonaEnMs = (fecha: Date, zonaHoraria: string) => {
  const partes = obtenerPartes(fecha, zonaHoraria);
  const representacionUtc = Date.UTC(
    partes.anio,
    partes.mes - 1,
    partes.dia,
    partes.hora,
    partes.minuto,
    partes.segundo,
  );
  return representacionUtc - fecha.getTime();
};

export const fechaLocalComoUtc = (
  anio: number,
  mes: number,
  dia: number,
  zonaHoraria = ZONA_HORARIA_REPORTES_DEFAULT,
) => {
  const valorLocalEnUtc = Date.UTC(anio, mes - 1, dia, 0, 0, 0);
  let fecha = new Date(valorLocalEnUtc);
  for (let intento = 0; intento < 2; intento += 1) {
    fecha = new Date(valorLocalEnUtc - offsetZonaEnMs(fecha, zonaHoraria));
  }
  return fecha;
};

const etiquetaPeriodo = (desde: Date, hasta: Date, zonaHoraria: string) => {
  const formato = new Intl.DateTimeFormat('es-AR', {
    timeZone: zonaHoraria,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const ultimoDia = new Date(hasta.getTime() - 1);
  return `${formato.format(desde)} al ${formato.format(ultimoDia)}`;
};

export const periodoSemanalCerrado = (
  referencia = new Date(),
  zonaHoraria = ZONA_HORARIA_REPORTES_DEFAULT,
): PeriodoReporte => {
  const local = obtenerPartes(referencia, zonaHoraria);
  const calendario = new Date(Date.UTC(local.anio, local.mes - 1, local.dia));
  const diaSemana = calendario.getUTCDay() || 7;
  const inicioSemanaActual = new Date(calendario);
  inicioSemanaActual.setUTCDate(inicioSemanaActual.getUTCDate() - diaSemana + 1);
  const inicioSemanaAnterior = new Date(inicioSemanaActual);
  inicioSemanaAnterior.setUTCDate(inicioSemanaAnterior.getUTCDate() - 7);

  const desde = fechaLocalComoUtc(
    inicioSemanaAnterior.getUTCFullYear(),
    inicioSemanaAnterior.getUTCMonth() + 1,
    inicioSemanaAnterior.getUTCDate(),
    zonaHoraria,
  );
  const hasta = fechaLocalComoUtc(
    inicioSemanaActual.getUTCFullYear(),
    inicioSemanaActual.getUTCMonth() + 1,
    inicioSemanaActual.getUTCDate(),
    zonaHoraria,
  );

  return {
    tipo: 'SEMANAL',
    zonaHoraria,
    desde,
    hasta,
    etiqueta: etiquetaPeriodo(desde, hasta, zonaHoraria),
    cerrado: true,
  };
};

export const periodoMensualCerrado = (
  referencia = new Date(),
  zonaHoraria = ZONA_HORARIA_REPORTES_DEFAULT,
): PeriodoReporte => {
  const local = obtenerPartes(referencia, zonaHoraria);
  const inicioMesActual = new Date(Date.UTC(local.anio, local.mes - 1, 1));
  const inicioMesAnterior = new Date(inicioMesActual);
  inicioMesAnterior.setUTCMonth(inicioMesAnterior.getUTCMonth() - 1);

  const desde = fechaLocalComoUtc(
    inicioMesAnterior.getUTCFullYear(),
    inicioMesAnterior.getUTCMonth() + 1,
    1,
    zonaHoraria,
  );
  const hasta = fechaLocalComoUtc(local.anio, local.mes, 1, zonaHoraria);

  return {
    tipo: 'MENSUAL',
    zonaHoraria,
    desde,
    hasta,
    etiqueta: etiquetaPeriodo(desde, hasta, zonaHoraria),
    cerrado: true,
  };
};

export const periodoAnteriorCerrado = (periodo: PeriodoReporte): PeriodoReporte => {
  const referenciaAnterior = new Date(periodo.desde.getTime() - 1);
  return periodo.tipo === 'SEMANAL'
    ? periodoSemanalCerrado(referenciaAnterior, periodo.zonaHoraria)
    : periodoMensualCerrado(referenciaAnterior, periodo.zonaHoraria);
};
