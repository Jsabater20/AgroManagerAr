import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  AlertTriangle,
  Building2,
  CalendarRange,
  ChartNoAxesCombined,
  CircleDollarSign,
  RefreshCw,
  Sprout,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { empresasApi, type ReporteConsolidadoEmpresa } from '../../api/empresas.api';
import { PageState } from './EmpresaMiembrosPage';

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const fechaActual = () => new Date().toISOString().slice(0, 10);

export default function EmpresaReportesPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const [tipo, setTipo] = useState<'SEMANAL' | 'MENSUAL'>('MENSUAL');
  const [fecha, setFecha] = useState(fechaActual);
  const [solicitud, setSolicitud] = useState(1);
  const reporteQuery = useQuery({
    queryKey: ['empresa-reportes-consolidados', id, tipo, fecha, solicitud],
    queryFn: () => empresasApi.obtenerReporteConsolidado(id, {
      tipo,
      fechaReferencia: `${fecha}T12:00:00.000Z`,
    }),
    enabled: Number.isInteger(id) && id > 0 && solicitud > 0,
  });

  if (reporteQuery.isLoading) return <PageState message="Preparando el informe consolidado..." />;
  if (reporteQuery.isError || !reporteQuery.data) return <PageState message="No pudimos cargar el informe empresarial o no tenés acceso." />;
  const reporte = reporteQuery.data;

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="flex items-start gap-4">
        <Link to={`/empresas/${id}/dashboard`} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">← Empresa</Link>
        <div><h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white"><ChartNoAxesCombined size={21} className="text-emerald-700" /> Reportes consolidados</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Compará tus establecimientos autorizados sin mezclar su información.</p></div>
      </header>

      <section className="rounded-3xl bg-gradient-to-r from-emerald-950 to-emerald-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">Informe empresarial</p><h2 className="mt-2 text-3xl font-bold">{reporte.empresa.nombre}</h2><p className="mt-2 text-sm text-emerald-100">Período cerrado: {reporte.periodo.etiqueta}</p></div>
          <div className="flex flex-wrap gap-2"><select value={tipo} onChange={(event) => setTipo(event.target.value as 'SEMANAL' | 'MENSUAL')} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white"><option className="text-slate-900" value="MENSUAL">Último mes cerrado</option><option className="text-slate-900" value="SEMANAL">Última semana cerrada</option></select><input type="date" value={fecha} onChange={(event) => setFecha(event.target.value)} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white [color-scheme:dark]" /><button onClick={() => setSolicitud((valor) => valor + 1)} disabled={reporteQuery.isFetching} className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-800 hover:bg-emerald-50 disabled:opacity-70"><RefreshCw size={16} className={reporteQuery.isFetching ? 'animate-spin' : ''} /> Actualizar</button></div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={Building2} label="Campos" value={reporte.resumen.operacion.campos} detail={`${reporte.resumen.operacion.superficieHa.toLocaleString('es-AR')} ha`} />
        <Metric icon={Sprout} label="Cosecha" value={`${reporte.resumen.operacion.cosechaKg.toLocaleString('es-AR')} kg`} detail="Durante el período" />
        <Metric icon={CalendarRange} label="Trabajos" value={reporte.resumen.operacion.completadas} detail={`${reporte.resumen.operacion.pendientes} pendientes · ${reporte.resumen.operacion.vencidas} vencidos`} />
        <Metric icon={AlertTriangle} label="Alertas" value={reporte.resumen.operacion.alertas} detail={`${reporte.resumen.operacion.alertasPrioritarias} prioritarias`} tone={reporte.resumen.operacion.alertasPrioritarias ? 'amber' : 'emerald'} />
      </section>

      <Finanzas reporte={reporte} />
      <Analisis reporte={reporte} />

      <section><p className="text-sm font-bold text-emerald-700">Por establecimiento</p><h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Comparación del período</h2><div className="mt-4 grid gap-4 lg:grid-cols-2">{reporte.establecimientos.map((establecimiento) => <EstablecimientoCard key={establecimiento.id} establecimiento={establecimiento} />)}</div></section>
    </div>
  );
}

function Finanzas({ reporte }: { reporte: ReporteConsolidadoEmpresa }) {
  if (!reporte.resumen.finanzas) return <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900/70 dark:bg-blue-950/25 dark:text-blue-100">Tu rol permite consultar la operación, pero no las finanzas consolidadas.</section>;
  const finanzas = reporte.resumen.finanzas;
  return <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/70 dark:bg-emerald-950/25"><div className="flex items-center gap-2"><CircleDollarSign size={19} className="text-emerald-700" /><div><h2 className="font-bold text-slate-900 dark:text-white">Finanzas consolidadas</h2><p className="text-xs text-slate-500 dark:text-slate-400">{reporte.accesoFinanciero.nivel === 'PARCIAL' ? `Incluye ${reporte.accesoFinanciero.establecimientosIncluidos} establecimientos autorizados.` : 'Incluye todos los establecimientos visibles.'}</p></div></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><Money label="Ingresos" value={finanzas.ingresos} /><Money label="Egresos" value={finanzas.egresos} tone="rose" /><Money label="Saldo operativo" value={finanzas.saldo} tone={finanzas.saldo >= 0 ? 'emerald' : 'rose'} /></div></section>;
}

function Analisis({ reporte }: { reporte: ReporteConsolidadoEmpresa }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"><div className="flex items-start gap-3"><ChartNoAxesCombined size={20} className="mt-0.5 text-emerald-700" /><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Lectura empresarial</p><h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{reporte.resumenInteligente.resumen}</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{reporte.resumenInteligente.generadoCon}</p></div></div><div className="mt-4 grid gap-3 lg:grid-cols-2">{reporte.resumenInteligente.hallazgos.map((hallazgo) => <article key={hallazgo.id} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p className="font-semibold text-slate-800 dark:text-white">{hallazgo.titulo}</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{hallazgo.descripcion}</p>{hallazgo.accionSugerida && <p className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">Siguiente paso: {hallazgo.accionSugerida}</p>}</article>)}</div></section>;
}

function EstablecimientoCard({ establecimiento }: { establecimiento: ReporteConsolidadoEmpresa['establecimientos'][number] }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"><div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-bold text-slate-900 dark:text-white">{establecimiento.nombre}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{establecimiento.operacion.campos} campos · {establecimiento.operacion.superficieHa.toLocaleString('es-AR')} ha</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${establecimiento.operacion.vencidas ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>{establecimiento.operacion.vencidas ? `${establecimiento.operacion.vencidas} vencidos` : 'Al día'}</span></div><div className="mt-4 grid grid-cols-3 gap-2 text-sm"><Detail label="Cosecha" value={`${establecimiento.operacion.cosechaKg.toLocaleString('es-AR')} kg`} /><Detail label="Completados" value={establecimiento.operacion.completadas} /><Detail label="Alertas" value={establecimiento.operacion.alertas} /></div>{establecimiento.finanzas ? <div className="mt-4 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/25"><p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">Saldo operativo</p><p className="mt-1 text-lg font-bold text-emerald-800 dark:text-emerald-200">{formatoPesos.format(establecimiento.finanzas.saldo)}</p></div> : <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">Finanzas no disponibles para tu rol.</p>}</article>;
}

function Metric({ icon: Icon, label, value, detail, tone = 'emerald' }: { icon: typeof Building2; label: string; value: string | number; detail: string; tone?: 'emerald' | 'amber' }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"><Icon size={20} className={tone === 'amber' ? 'text-amber-600' : 'text-emerald-700'} /><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{detail}</p></article>;
}

function Money({ label, value, tone = 'emerald' }: { label: string; value: number; tone?: 'emerald' | 'rose' }) {
  return <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900"><p className="text-xs text-slate-500 dark:text-slate-400">{label}</p><p className={`mt-1 text-lg font-bold ${tone === 'rose' ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'}`}>{formatoPesos.format(value)}</p></div>;
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return <div><p className="text-xs text-slate-500 dark:text-slate-400">{label}</p><p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{value}</p></div>;
}
