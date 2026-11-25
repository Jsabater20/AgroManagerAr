import type { ReportePeriodico } from '../api/reportes.api';

export function obtenerAccionesRecomendadas(reporte: ReportePeriodico) {
  const accionesDelAnalisis = [...(reporte.resumenInteligente?.hallazgos ?? [])]
    .sort((primero, segundo) => prioridadHallazgo(primero.nivel) - prioridadHallazgo(segundo.nivel))
    .map((hallazgo) => hallazgo.accionSugerida ?? `${hallazgo.titulo}: ${hallazgo.descripcion}`);

  const acciones = [
    ...accionesDelAnalisis,
    ...(reporte.actividad.vencidas ? [`Revisar y reorganizar ${reporte.actividad.vencidas} trabajo${reporte.actividad.vencidas === 1 ? '' : 's'} vencido${reporte.actividad.vencidas === 1 ? '' : 's'}.`] : []),
    ...(reporte.alertas.prioritarias ? [`Atender ${reporte.alertas.prioritarias} alerta${reporte.alertas.prioritarias === 1 ? '' : 's'} prioritaria${reporte.alertas.prioritarias === 1 ? '' : 's'}.`] : []),
    ...(reporte.riesgoHidrico.resumen.altoRiesgo ? [`Revisar ${reporte.riesgoHidrico.resumen.altoRiesgo} campo${reporte.riesgoHidrico.resumen.altoRiesgo === 1 ? '' : 's'} con riesgo hídrico alto.`] : []),
  ];

  return [...new Set(acciones)].slice(0, 3);
}

export function crearResumenEjecutivoParaCompartir(reporte: ReportePeriodico) {
  const acciones = obtenerAccionesRecomendadas(reporte);
  const lineas = [
    `AgroManager AR — Informe ${reporte.tipo.toLowerCase()}`,
    `${reporte.organizacion.nombre} · ${reporte.periodo.etiqueta}`,
    '',
    `Operación: ${reporte.actividad.completadas} trabajos completados, ${reporte.actividad.pendientes} pendientes y ${reporte.actividad.vencidas} vencidos.`,
    `Alertas: ${reporte.alertas.total} activas (${reporte.alertas.prioritarias} prioritarias).`,
  ];

  if (reporte.finanzas) {
    lineas.push(`Saldo operativo: ${formatoPesos(reporte.finanzas.saldo)}.`);
  }
  if (reporte.riesgoHidrico.resumen.altoRiesgo || reporte.riesgoHidrico.resumen.accionesPendientes) {
    lineas.push(`Seguimiento hídrico: ${reporte.riesgoHidrico.resumen.altoRiesgo} campo(s) con riesgo alto y ${reporte.riesgoHidrico.resumen.accionesPendientes} acción(es) pendiente(s).`);
  }
  if (acciones.length) {
    lineas.push('', 'Próximos pasos:', ...acciones.map((accion) => `• ${accion}`));
  } else {
    lineas.push('', 'No hay prioridades críticas registradas para este período.');
  }

  return lineas.join('\n');
}

function prioridadHallazgo(nivel: 'POSITIVO' | 'INFORMACION' | 'ATENCION' | 'CRITICO') {
  return {
    CRITICO: 0,
    ATENCION: 1,
    INFORMACION: 2,
    POSITIVO: 3,
  }[nivel];
}

function formatoPesos(valor: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor);
}
