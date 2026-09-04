import { Landmark, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { empresasApi, type FinanzasConsolidadasEmpresa } from '../../api/empresas.api';
import { Header, PageState } from './EmpresaMiembrosPage';
import { useParams } from 'react-router-dom';

const CATEGORIAS: Record<string, string> = {
  COSECHA: 'Cosecha', VENTA_ANIMAL: 'Venta animal', INSUMO: 'Insumo', SERVICIO: 'Servicio',
  MANTENIMIENTO: 'Mantenimiento', VETERINARIA: 'Veterinaria', COMBUSTIBLE: 'Combustible',
  MANO_DE_OBRA: 'Mano de obra', OTRO: 'Otro',
};

export default function EmpresaFinanzasPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const [organizacionId, setOrganizacionId] = useState<number>();
  const organizacionesQuery = useQuery({ queryKey: ['empresa-organizaciones', id], queryFn: () => empresasApi.obtenerOrganizaciones(id), enabled: id > 0 });
  const finanzasQuery = useQuery({ queryKey: ['empresa-finanzas', id, organizacionId], queryFn: () => empresasApi.obtenerFinanzas(id, { organizacionId }), enabled: id > 0 });
  if (organizacionesQuery.isLoading || finanzasQuery.isLoading) return <PageState message="Consolidando las finanzas empresariales..." />;
  if (organizacionesQuery.isError || finanzasQuery.isError || !finanzasQuery.data) return <PageState message="No pudimos cargar las finanzas empresariales." />;

  const finanzas = finanzasQuery.data;
  return <div className="mx-auto max-w-6xl space-y-6 p-6">
    <Header empresaId={id} title="Finanzas consolidadas" description="Ingresos, egresos y movimientos de los establecimientos autorizados." icon={Landmark} />
    <FiltroEstablecimiento value={organizacionId} onChange={setOrganizacionId} organizaciones={organizacionesQuery.data ?? []} />
    <div className="grid gap-4 sm:grid-cols-3"><Kpi icon={TrendingUp} label="Ingresos" value={pesos(finanzas.resumen.ingresos)} tone="text-emerald-700 bg-emerald-50" /><Kpi icon={TrendingDown} label="Egresos" value={pesos(finanzas.resumen.egresos)} tone="text-red-700 bg-red-50" /><Kpi icon={Wallet} label="Saldo neto" value={pesos(finanzas.resumen.saldo)} tone={finanzas.resumen.saldo >= 0 ? 'text-blue-700 bg-blue-50' : 'text-red-700 bg-red-50'} /></div>
    <section className="grid gap-6 lg:grid-cols-2"><Comparativo establecimientos={finanzas.porEstablecimiento} /><Egresos categorias={finanzas.egresosPorCategoria} /></section>
    <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]"><Evolucion mensual={finanzas.evolucionMensual} /><Movimientos finanzas={finanzas} /></section>
  </div>;
}

function FiltroEstablecimiento({ value, onChange, organizaciones }: { value?: number; onChange: (value?: number) => void; organizaciones: Array<{ id: number; nombre: string }> }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Establecimiento <select value={value ?? ''} onChange={(event) => onChange(event.target.value ? Number(event.target.value) : undefined)} className="ml-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-700"><option value="">Todos los autorizados</option>{organizaciones.map((organizacion) => <option key={organizacion.id} value={organizacion.id}>{organizacion.nombre}</option>)}</select></div>;
}

function Kpi({ icon: Icon, label, value, tone }: { icon: typeof TrendingUp; label: string; value: string; tone: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`inline-flex rounded-xl p-2.5 ${tone}`}><Icon size={19} /></div><p className="mt-4 text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p></article>;
}

function Comparativo({ establecimientos }: { establecimientos: FinanzasConsolidadasEmpresa['porEstablecimiento'] }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Comparativo por establecimiento</h2><div className="mt-4 space-y-3">{establecimientos.map((establecimiento) => <div key={establecimiento.id} className="rounded-xl bg-slate-50 p-4"><div className="flex justify-between gap-3"><p className="font-semibold text-slate-800">{establecimiento.nombre}</p><p className={establecimiento.saldo >= 0 ? 'font-bold text-emerald-700' : 'font-bold text-red-700'}>{pesos(establecimiento.saldo)}</p></div><div className="mt-3 grid grid-cols-2 gap-3 text-xs"><span className="text-slate-500">Ingresos <b className="block text-emerald-700">{pesos(establecimiento.ingresos)}</b></span><span className="text-slate-500">Egresos <b className="block text-red-700">{pesos(establecimiento.egresos)}</b></span></div></div>)}{!establecimientos.length && <SinDatos />}</div></article>;
}

function Egresos({ categorias }: { categorias: FinanzasConsolidadasEmpresa['egresosPorCategoria'] }) {
  const mayor = categorias[0]?.monto ?? 0;
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Egresos por categoría</h2><div className="mt-5 space-y-4">{categorias.map((categoria) => <div key={categoria.categoria}><div className="flex justify-between text-sm"><span className="text-slate-600">{CATEGORIAS[categoria.categoria] ?? categoria.categoria}</span><b className="text-slate-800">{pesos(categoria.monto)}</b></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-red-400" style={{ width: `${mayor ? (categoria.monto / mayor) * 100 : 0}%` }} /></div></div>)}{!categorias.length && <SinDatos />}</div></article>;
}

function Evolucion({ mensual }: { mensual: FinanzasConsolidadasEmpresa['evolucionMensual'] }) {
  const mayor = Math.max(...mensual.flatMap((mes) => [mes.ingresos, mes.egresos]), 1);
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Evolución mensual</h2><div className="mt-5 flex h-48 items-end gap-3 overflow-x-auto">{mensual.map((mes) => <div key={mes.periodo} className="flex min-w-14 flex-1 flex-col items-center gap-2"><div className="flex h-36 items-end gap-1"><span title={`Ingresos ${pesos(mes.ingresos)}`} className="w-3 rounded-t bg-emerald-400" style={{ height: `${(mes.ingresos / mayor) * 100}%` }} /><span title={`Egresos ${pesos(mes.egresos)}`} className="w-3 rounded-t bg-red-400" style={{ height: `${(mes.egresos / mayor) * 100}%` }} /></div><span className="text-xs text-slate-500">{mes.periodo.slice(5)}</span></div>)}{!mensual.length && <SinDatos />}</div><p className="mt-4 text-xs text-slate-500"><span className="text-emerald-600">■</span> Ingresos <span className="ml-3 text-red-500">■</span> Egresos</p></article>;
}

function Movimientos({ finanzas }: { finanzas: FinanzasConsolidadasEmpresa }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Últimos movimientos</h2><div className="mt-4 divide-y divide-slate-100">{finanzas.movimientos.map((movimiento) => <div key={movimiento.id} className="py-3"><div className="flex justify-between gap-3"><p className="truncate font-medium text-slate-800">{movimiento.concepto}</p><b className={movimiento.tipo === 'INGRESO' ? 'text-emerald-700' : 'text-red-700'}>{movimiento.tipo === 'INGRESO' ? '+' : '-'}{pesos(movimiento.monto)}</b></div><p className="mt-1 text-xs text-slate-500">{movimiento.organizacion?.nombre ?? 'Sin establecimiento'} · {fecha(movimiento.fecha)}</p></div>)}{!finanzas.movimientos.length && <SinDatos />}</div></article>;
}

function SinDatos() { return <p className="py-8 text-center text-sm text-slate-500">Sin datos para mostrar.</p>; }
function pesos(valor: number) { return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor); }
function fecha(valor: string) { return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(valor)); }
