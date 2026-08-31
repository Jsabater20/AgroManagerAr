import { BarChart3, CircleDollarSign, Sprout, Wheat } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { empresasApi, type RentabilidadConsolidadaEmpresa } from '../../api/empresas.api';
import { Header, PageState } from './EmpresaMiembrosPage';

export default function EmpresaRentabilidadPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const [organizacionId, setOrganizacionId] = useState<number>();
  const organizacionesQuery = useQuery({ queryKey: ['empresa-organizaciones', id], queryFn: () => empresasApi.obtenerOrganizaciones(id), enabled: id > 0 });
  const rentabilidadQuery = useQuery({ queryKey: ['empresa-rentabilidad', id, organizacionId], queryFn: () => empresasApi.obtenerRentabilidad(id, { organizacionId }), enabled: id > 0 });
  if (organizacionesQuery.isLoading || rentabilidadQuery.isLoading) return <PageState message="Calculando la rentabilidad empresarial..." />;
  if (organizacionesQuery.isError || rentabilidadQuery.isError || !rentabilidadQuery.data) return <PageState message="No pudimos cargar la rentabilidad empresarial." />;

  const reporte = rentabilidadQuery.data;
  return <div className="mx-auto max-w-6xl space-y-6 p-6">
    <Header empresaId={id} title="Rentabilidad y comparativas" description="Resultado económico y producción por establecimiento y campaña." icon={BarChart3} />
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Establecimiento <select value={organizacionId ?? ''} onChange={(event) => setOrganizacionId(event.target.value ? Number(event.target.value) : undefined)} className="ml-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-700"><option value="">Todos los autorizados</option>{(organizacionesQuery.data ?? []).map((organizacion) => <option key={organizacion.id} value={organizacion.id}>{organizacion.nombre}</option>)}</select></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Kpi icon={CircleDollarSign} label="Saldo neto" value={pesos(reporte.resumen.saldo)} /><Kpi icon={BarChart3} label="Rentabilidad" value={`${reporte.resumen.rentabilidad}%`} /><Kpi icon={Wheat} label="Producción" value={`${numero(reporte.resumen.produccionKg)} kg`} /><Kpi icon={Sprout} label="Ingresos" value={pesos(reporte.resumen.ingresos)} /></div>
    <Comparativo reporte={reporte} />
    <Campanias campanias={reporte.campanias} />
  </div>;
}

function Kpi({ icon: Icon, label, value }: { icon: typeof BarChart3; label: string; value: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon className="text-emerald-700" size={20} /><p className="mt-4 text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p></article>;
}

function Comparativo({ reporte }: { reporte: RentabilidadConsolidadaEmpresa }) {
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-slate-900">Comparativo por establecimiento</h2></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Establecimiento</th><th className="px-5 py-3">Producción</th><th className="px-5 py-3">Ingresos</th><th className="px-5 py-3">Egresos</th><th className="px-5 py-3">Saldo</th><th className="px-5 py-3">Rentabilidad</th></tr></thead><tbody className="divide-y divide-slate-100">{reporte.porEstablecimiento.map((establecimiento) => <tr key={establecimiento.id}><td className="px-5 py-4 font-semibold text-slate-900">{establecimiento.nombre}</td><td className="px-5 py-4 text-slate-600">{numero(establecimiento.produccionKg)} kg</td><td className="px-5 py-4 text-emerald-700">{pesos(establecimiento.ingresos)}</td><td className="px-5 py-4 text-red-700">{pesos(establecimiento.egresos)}</td><td className={establecimiento.saldo >= 0 ? 'px-5 py-4 font-semibold text-emerald-700' : 'px-5 py-4 font-semibold text-red-700'}>{pesos(establecimiento.saldo)}</td><td className="px-5 py-4"><Rentabilidad valor={establecimiento.rentabilidad} /></td></tr>)}{!reporte.porEstablecimiento.length && <tr><td className="px-5 py-8 text-center text-slate-500" colSpan={6}>Sin datos para mostrar.</td></tr>}</tbody></table></div></section>;
}

function Campanias({ campanias }: { campanias: RentabilidadConsolidadaEmpresa['campanias'] }) {
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-slate-900">Rentabilidad por campaña</h2></div><div className="divide-y divide-slate-100">{campanias.map((campania) => <article key={campania.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"><div><p className="font-semibold text-slate-900">{campania.nombre}</p><p className="mt-1 text-xs text-slate-500">{campania.organizacion?.nombre ?? 'Sin establecimiento'} · {campania.siembras} siembras · {numero(campania.produccionKg)} kg</p></div><div className="flex items-center gap-5 text-sm"><div><p className="text-xs text-slate-500">Margen</p><p className={campania.saldo >= 0 ? 'font-bold text-emerald-700' : 'font-bold text-red-700'}>{pesos(campania.saldo)}</p></div><Rentabilidad valor={campania.rentabilidad} /></div></article>)}{!campanias.length && <p className="px-5 py-10 text-center text-sm text-slate-500">No hay campañas para los establecimientos seleccionados.</p>}</div></section>;
}

function Rentabilidad({ valor }: { valor: number }) { return <span className={valor >= 20 ? 'rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700' : valor > 0 ? 'rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700' : 'rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700'}>{valor}% rentab.</span>; }
function pesos(valor: number) { return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor); }
function numero(valor: number) { return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(valor); }
