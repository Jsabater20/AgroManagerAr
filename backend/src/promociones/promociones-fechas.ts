export const ZONA_HORARIA_PROMOCIONES = 'America/Argentina/Buenos_Aires';

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
  return representacionUtc + fecha.getMilliseconds() - fecha.getTime();
};

export const fechaLocalEnZona = (
  anio: number,
  mes: number,
  dia: number,
  hora = 0,
  minuto = 0,
  segundo = 0,
  milisegundo = 0,
  zonaHoraria = ZONA_HORARIA_PROMOCIONES,
) => {
  const valorLocalEnUtc = Date.UTC(anio, mes - 1, dia, hora, minuto, segundo, milisegundo);
  let fecha = new Date(valorLocalEnUtc);
  for (let intento = 0; intento < 3; intento += 1) {
    fecha = new Date(valorLocalEnUtc - offsetZonaEnMs(fecha, zonaHoraria));
  }
  return fecha;
};

const ultimoDiaDelMes = (anio: number, mes: number) =>
  new Date(Date.UTC(anio, mes, 0)).getUTCDate();

export const sumarMesesCalendario = (
  fechaInicio: Date,
  meses: number,
  zonaHoraria = ZONA_HORARIA_PROMOCIONES,
) => {
  if (!Number.isInteger(meses) || meses < 1) {
    throw new Error('La duración de una promoción debe ser de al menos un mes calendario.');
  }

  const inicio = obtenerPartes(fechaInicio, zonaHoraria);
  const indiceMesDestino = inicio.mes - 1 + meses;
  const anioDestino = inicio.anio + Math.floor(indiceMesDestino / 12);
  const mesDestino = (indiceMesDestino % 12) + 1;
  const diaDestino = Math.min(inicio.dia, ultimoDiaDelMes(anioDestino, mesDestino));

  return fechaLocalEnZona(
    anioDestino,
    mesDestino,
    diaDestino,
    inicio.hora,
    inicio.minuto,
    inicio.segundo,
    fechaInicio.getMilliseconds(),
    zonaHoraria,
  );
};

export const estaDentroDeVentana = (
  fecha: Date,
  inicio: Date,
  finExclusivo: Date,
) => fecha >= inicio && fecha < finExclusivo;
