import { ClipboardList, Download, FileSpreadsheet, FileText, Landmark } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { empresasApi } from '../../api/empresas.api';
import { exportToExcel, exportToPdf } from '../../utils/export';
import { Header, PageState } from './EmpresaMiembrosPage';

export default function EmpresaExportacionesPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const dashboardQuery = useQuery({ queryKey: ['empresa-dashboard', id], queryFn: () => empresasApi.obtenerDashboard(id), enabled: id > 0 });
  const finanzasQuery = useQuery({ queryKey: ['empresa-finanzas', id], queryFn: () => empresasApi.obtenerFinanzas(id), enabled: id > 0 });
  const rentabilidadQuery = useQuery({ queryKey: ['empresa-rentabilidad', id], queryFn: () => empresasApi.obtenerRentabilidad(id), enabled: id > 0 });
  const actividadesQuery = useQuery({ queryKey: ['empresa-actividades-exportacion', id], queryFn: () => empresasApi.obtenerActividades(id, { limite: 250 }), enabled: id > 0 });
  if (dashboardQuery.isLoading || finanzasQuery.isLoading || rentabilidadQuery.isLoading || actividadesQuery.isLoading) return <PageState message="Preparando los informes empresariales..." />;
  if (dashboardQuery.isError || finanzasQuery.isError || rentabilidadQuery.isError || actividadesQuery.isError || !dashboardQuery.data || !finanzasQuery.data || !rentabilidadQuery.data || !actividadesQuery.data) return <PageState message="No pudimos preparar las exportaciones. Requiere permisos de gestión empresarial." />;

  const dashboard = dashboardQuery.data;
  const finanzas = finanzasQuery.data;
  const rentabilidad = rentabilidadQuery.data;
  const actividades = actividadesQuery.data;
  const descargarResumenPdf = () => exportToPdf(`Resumen ejecutivo · ${dashboard.empresa.nombre}`, ['Indicador', 'Valor'], [
    ['Establecimientos', dashboard.empresa.establecimientos], ['Superficie', `${numero(dashboard.resumen.superficieHa)} ha`], ['Campos', dashboard.resumen.campos], ['Animales', dashboard.resumen.animales], ['Maquinarias', dashboard.resumen.maquinarias], ['Miembros activos', dashboard.resumen.miembros], ['Trabajos activos', dashboard.trabajos.pendientes + dashboard.trabajos.enProgreso + dashboard.trabajos.pausadas], ['Ingresos', pesos(finanzas.resumen.ingresos)], ['Egresos', pesos(finanzas.resumen.egresos)], ['Saldo neto', pesos(finanzas.resumen.saldo)], ['Rentabilidad', `${rentabilidad.resumen.rentabilidad}%`], ['Producción', `${numero(rentabilidad.resumen.produccionKg)} kg`],
  ] as never, `resumen-ejecutivo-${id}`);
  const descargarFinanzas = () => exportToExcel(finanzas.porEstablecimiento.map((establecimiento) => ({ Establecimiento: establecimiento.nombre, Ingresos: establecimiento.ingresos, Egresos: establecimiento.egresos, Saldo: establecimiento.saldo, Movimientos: establecimiento.movimientos })), `finanzas-empresa-${id}`, 'Finanzas');
  const descargarRentabilidad = () => exportToExcel(rentabilidad.campanias.map((campania) => ({ Establecimiento: campania.organizacion?.nombre ?? '-', Campaña: campania.nombre, Siembras: campania.siembras, 'Producción kg': campania.produccionKg, Ingresos: campania.ingresos, Egresos: campania.egresos, Margen: campania.saldo, 'Rentabilidad %': campania.rentabilidad })), `rentabilidad-empresa-${id}`, 'Rentabilidad');
  const descargarActividades = () => exportToExcel(actividades.map((actividad) => ({ Establecimiento: actividad.organizacion.nombre, Trabajo: actividad.titulo, Responsable: `${actividad.usuarioOrganizacion.usuario.nombre} ${actividad.usuarioOrganizacion.usuario.apellido}`, Estado: actividad.estado, Prioridad: actividad.prioridad, Inicio: fecha(actividad.fechaInicio), 'Fin estimado': fecha(actividad.fechaEstimadaFin), Recurso: actividad.contexto || actividad.recursoTipo })), `actividades-empresa-${id}`, 'Actividades');

  return <div className="mx-auto max-w-6xl space-y-6 p-6"><Header empresaId={id} title="Exportaciones empresariales" description="Descargá informes consolidados de los establecimientos autorizados." icon={Download} /><div className="grid gap-4 md:grid-cols-2"><ExportCard icon={FileText} title="Resumen ejecutivo" description="Indicadores operativos, financieros y de rentabilidad en PDF." action="Descargar PDF" onClick={descargarResumenPdf} /><ExportCard icon={Landmark} title="Finanzas por establecimiento" description="Ingresos, egresos, saldo y movimientos en Excel." action="Descargar Excel" onClick={descargarFinanzas} /><ExportCard icon={FileSpreadsheet} title="Rentabilidad por campaña" description="Producción, margen y rentabilidad consolidada en Excel." action="Descargar Excel" onClick={descargarRentabilidad} /><ExportCard icon={ClipboardList} title="Actividades consolidadas" description="Trabajos, responsables y fechas de los establecimientos en Excel." action="Descargar Excel" onClick={descargarActividades} /></div><p className="text-sm text-slate-500">Los archivos incluyen únicamente los establecimientos a los que tenés acceso dentro de la empresa.</p></div>;
}

function ExportCard({ icon: Icon, title, description, action, onClick }: { icon: typeof Download; title: string; description: string; action: string; onClick: () => void }) { return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-700"><Icon size={20} /></div><h2 className="mt-4 font-bold text-slate-900">{title}</h2><p className="mt-2 min-h-10 text-sm text-slate-500">{description}</p><button onClick={onClick} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"><Download size={16} />{action}</button></article>; }
function pesos(valor: number) { return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor); }
function numero(valor: number) { return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(valor); }
function fecha(valor: string | null) { return valor ? new Intl.DateTimeFormat('es-AR', { dateStyle: 'short' }).format(new Date(valor)) : 'Sin fecha estimada'; }
