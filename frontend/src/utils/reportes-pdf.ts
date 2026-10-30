import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { DesgloseProductivo, ReportePeriodico } from '../api/reportes.api';

type DocumentoConTabla = jsPDF & { lastAutoTable?: { finalY: number } };

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const formatoNumero = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 });

function encabezado(doc: jsPDF, titulo: string, organizacion: string, periodo: string) {
  const anchoPagina = doc.internal.pageSize.getWidth();
  doc.setFillColor(5, 92, 61);
  doc.rect(0, 0, anchoPagina, 31, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('AgroManager AR', 14, 13);
  doc.setFontSize(10);
  doc.text(titulo, 14, 20);
  doc.setFontSize(8.5);
  doc.text(`${organizacion} · ${periodo}`, 14, 26);
  doc.setTextColor(51, 65, 85);
}

function seccion(doc: jsPDF, titulo: string, y: number) {
  doc.setFontSize(11);
  doc.setTextColor(5, 92, 61);
  doc.text(titulo, 14, y);
  doc.setTextColor(51, 65, 85);
}

function siguienteY(doc: jsPDF) {
  return (doc as DocumentoConTabla).lastAutoTable?.finalY ?? 37;
}

function pieDePagina(doc: jsPDF) {
  const paginas = doc.getNumberOfPages();
  for (let pagina = 1; pagina <= paginas; pagina += 1) {
    doc.setPage(pagina);
    const anchoPagina = doc.internal.pageSize.getWidth();
    const altoPagina = doc.internal.pageSize.getHeight();
    doc.setDrawColor(203, 213, 225);
    doc.line(14, altoPagina - 10, anchoPagina - 14, altoPagina - 10);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generado el ${new Date().toLocaleString('es-AR')}`, 14, altoPagina - 5);
    doc.text(`Página ${pagina} de ${paginas}`, anchoPagina - 14, altoPagina - 5, { align: 'right' });
  }
}

function tabla(doc: jsPDF, y: number, encabezados: string[], filas: (string | number)[][]) {
  autoTable(doc, {
    startY: y,
    head: [encabezados],
    body: filas.length ? filas : [['Sin datos para mostrar']],
    theme: 'grid',
    headStyles: { fillColor: [5, 92, 61], textColor: 255, fontStyle: 'bold', fontSize: 8.5 },
    bodyStyles: { textColor: [51, 65, 85], fontSize: 8 },
    alternateRowStyles: { fillColor: [240, 253, 244] },
    styles: { cellPadding: 2.5, overflow: 'linebreak' },
    margin: { left: 14, right: 14 },
  });
}

export function descargarReportePeriodicoPdf(reporte: ReportePeriodico) {
  const doc = new jsPDF();
  const etiqueta = reporte.tipo === 'SEMANAL' ? 'Informe semanal de gestión' : 'Informe mensual de gestión';
  encabezado(doc, etiqueta, reporte.organizacion.nombre, reporte.periodo.etiqueta);

  seccion(doc, 'Resumen operativo', 40);
  tabla(doc, 44, ['Trabajos completados', 'Pendientes', 'Vencidos', 'Mantenimientos', 'Alertas'], [[
    reporte.actividad.completadas,
    reporte.actividad.pendientes,
    reporte.actividad.vencidas,
    reporte.maquinaria.mantenimientos,
    reporte.alertas.total,
  ]]);

  let y = siguienteY(doc) + 10;
  if (reporte.finanzas) {
    seccion(doc, 'Resumen económico', y);
    tabla(doc, y + 4, ['Ingresos', 'Egresos', 'Costos reales', 'Saldo operativo'], [[
      formatoPesos.format(reporte.finanzas.ingresos),
      formatoPesos.format(reporte.finanzas.egresos),
      formatoPesos.format(reporte.finanzas.costosReales),
      formatoPesos.format(reporte.finanzas.saldo),
    ]]);
    y = siguienteY(doc) + 10;
  }

  seccion(doc, 'Trabajos del período', y);
  const actividades = [...reporte.actividad.realizadas, ...reporte.actividad.proximas];
  tabla(doc, y + 4, ['Trabajo', 'Responsable', 'Estado', 'Prioridad', 'Fecha estimada'], actividades.slice(0, 30).map((actividad) => [
    actividad.titulo,
    actividad.responsable,
    actividad.estado.replaceAll('_', ' '),
    actividad.prioridad,
    actividad.fechaEstimadaFin ? new Date(actividad.fechaEstimadaFin).toLocaleDateString('es-AR') : '—',
  ]));

  y = siguienteY(doc) + 10;
  seccion(doc, 'Alertas a revisar', y);
  tabla(doc, y + 4, ['Alerta', 'Severidad', 'Detalle'], reporte.alertas.items.slice(0, 20).map((alerta) => [
    alerta.titulo,
    alerta.severidad,
    alerta.mensaje,
  ]));

  y = siguienteY(doc) + 10;
  if (reporte.resumenInteligente) {
    seccion(doc, 'Análisis inteligente', y);
    tabla(doc, y + 4, ['Prioridad', 'Hallazgo', 'Acción sugerida'], reporte.resumenInteligente.hallazgos.map((hallazgo) => [
      hallazgo.nivel,
      `${hallazgo.titulo}: ${hallazgo.descripcion}`,
      hallazgo.accionSugerida ?? '—',
    ]));
    y = siguienteY(doc) + 10;
  }

  seccion(doc, 'Lectura del período', y);
  doc.setFontSize(9);
  reporte.resumen.forEach((item, indice) => {
    const lineas = doc.splitTextToSize(`• ${item}`, 180);
    doc.text(lineas, 14, y + 5 + (indice * 10));
  });

  pieDePagina(doc);
  doc.save(`informe-${reporte.tipo.toLowerCase()}-${reporte.organizacion.nombre.toLowerCase().replaceAll(' ', '-')}.pdf`);
}

export function descargarDesgloseProductivoPdf(desglose: DesgloseProductivo) {
  const doc = new jsPDF({ orientation: 'landscape' });
  encabezado(doc, 'Desglose productivo por lotes y campañas', desglose.organizacion.nombre, desglose.periodo.etiqueta);

  seccion(doc, 'Lotes', 40);
  tabla(doc, 44, ['Campo', 'Lote', 'Ha', 'Cultivos', 'Siembras activas', 'Cosecha', 'Rendimiento', 'Costo real'], desglose.lotes.map((lote) => [
    lote.campo.nombre,
    lote.nombre,
    formatoNumero.format(lote.hectareas),
    lote.cultivos.join(', ') || '—',
    lote.siembrasActivas,
    `${formatoNumero.format(lote.cosechaKg)} kg`,
    lote.rendimientoPromedioKgHa == null ? '—' : `${formatoNumero.format(lote.rendimientoPromedioKgHa)} kg/ha`,
    lote.costos ? formatoPesos.format(lote.costos.reales) : 'Sin permiso',
  ]));

  const y = siguienteY(doc) + 10;
  seccion(doc, 'Campañas', y);
  tabla(doc, y + 4, ['Campaña', 'Lotes', 'Ha', 'Cultivos', 'Siembras', 'Cosecha', 'Costo real'], desglose.campanias.map((campania) => [
    campania.nombre,
    campania.lotes,
    formatoNumero.format(campania.hectareas),
    campania.cultivos.join(', ') || '—',
    campania.siembras,
    `${formatoNumero.format(campania.cosechaKg)} kg`,
    campania.costos ? formatoPesos.format(campania.costos.reales) : 'Sin permiso',
  ]));

  pieDePagina(doc);
  doc.save(`desglose-productivo-${desglose.organizacion.nombre.toLowerCase().replaceAll(' ', '-')}.pdf`);
}
