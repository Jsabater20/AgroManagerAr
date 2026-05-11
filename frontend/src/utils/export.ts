import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ─── Excel ────────────────────────────────────────────────────────────────────

export function exportToExcel(
  rows: Record<string, unknown>[],
  filename: string,
  sheetName = 'Datos',
) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// ─── PDF ──────────────────────────────────────────────────────────────────────

export function exportToPdf(
  title: string,
  columns: string[],
  rows: (string | number)[][][],
  filename: string,
) {
  const doc = new jsPDF({ orientation: 'landscape' });

  // Header
  doc.setFontSize(16);
  doc.setTextColor(22, 101, 52); // green-800
  doc.text('AgroManager AR', 14, 15);

  doc.setFontSize(12);
  doc.setTextColor(55, 65, 81); // gray-700
  doc.text(title, 14, 23);

  doc.setFontSize(9);
  doc.setTextColor(156, 163, 175); // gray-400
  doc.text(
    `Generado el ${new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}`,
    14,
    29,
  );

  autoTable(doc, {
    startY: 34,
    head: [columns],
    body: rows as string[][],
    theme: 'striped',
    headStyles: { fillColor: [22, 101, 52], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8.5, textColor: [55, 65, 81] },
    alternateRowStyles: { fillColor: [240, 253, 244] },
    styles: { cellPadding: 3 },
  });

  doc.save(`${filename}.pdf`);
}
