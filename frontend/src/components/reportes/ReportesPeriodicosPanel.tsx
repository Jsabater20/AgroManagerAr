import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CalendarRange,
  CheckCircle2,
  CircleAlert,
  Download,
  LockKeyhole,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import {
  reportesApi,
  type ReportePeriodico,
  type TipoReportePeriodico,
} from '../../api/reportes.api';
import { descargarReportePeriodicoPdf } from '../../utils/reportes-pdf';

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const fechaActual = () => new Date().toISOString().slice(0, 10);

function Metrica({ etiqueta, valor, detalle, tono = 'emerald' }: {
  etiqueta: string;
  valor: string | number;
  detalle: string;
  tono?: 'emerald' | 'blue' | 'amber' | 'rose';
}) {
  const tonos = {
    emerald: 'border-emerald-200 bg-emerald-50/80 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200',
    blue: 'border-blue-200 bg-blue-50/80 text-blue-800 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-200',
    amber: 'border-amber-200 bg-amber-50/80 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200',
    rose: 'border-rose-200 bg-rose-50/80 text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-200',
  };

  return (
    <article className={`rounded-xl border p-4 ${tonos[tono]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{etiqueta}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{valor}</p>
      <p className="mt-1 text-xs opacity-80">{detalle}</p>
    </article>
  );
}

function AnalisisInteligente({ reporte }: { reporte: ReportePeriodico }) {
  const analisis = reporte.resumenInteligente;
  if (!analisis) return null;
  const estiloGeneral = {
    POSITIVO: 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/70 dark:bg-emerald-950/25',
    INFORMACION: 'border-blue-200 bg-blue-50/70 dark:border-blue-900/70 dark:bg-blue-950/25',
    ATENCION: 'border-amber-200 bg-amber-50/70 dark:border-amber-900/70 dark:bg-amber-950/25',
    CRITICO: 'border-rose-200 bg-rose-50/70 dark:border-rose-900/70 dark:bg-rose-950/25',
  }[analisis.nivelGeneral];
  const estiloHallazgo = {
    POSITIVO: 'text-emerald-700 dark:text-emerald-300',
    INFORMACION: 'text-blue-700 dark:text-blue-300',
    ATENCION: 'text-amber-700 dark:text-amber-300',
    CRITICO: 'text-rose-700 dark:text-rose-300',
  };

  return (
    <section className={`rounded-xl border p-5 ${estiloGeneral}`}>
      <div className="flex items-start gap-3">
        <Sparkles size={20} className="mt-0.5 shrink-0 text-emerald-600" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Análisis inteligente</p>
          <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">{analisis.resumen}</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{analisis.generadoCon}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {analisis.hallazgos.map((hallazgo) => (
          <article key={hallazgo.id} className="rounded-lg border border-white/70 bg-white/75 p-3 dark:border-slate-700 dark:bg-slate-900/75">
            <p className={`text-sm font-semibold ${estiloHallazgo[hallazgo.nivel]}`}>{hallazgo.titulo}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{hallazgo.descripcion}</p>
            {hallazgo.accionSugerida && <p className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-200">Siguiente paso: {hallazgo.accionSugerida}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function Resultado({ reporte }: { reporte: ReportePeriodico }) {
  const actividades = [...reporte.actividad.realizadas, ...reporte.actividad.proximas].slice(0, 5);

  return (
    <div className="mt-5 space-y-4">
      <div className="flex justify-end">
        <button onClick={() => descargarReportePeriodicoPdf(reporte)} className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-emerald-950/40">
          <Download size={16} /> Descargar PDF
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metrica etiqueta="Trabajos completados" valor={reporte.actividad.completadas} detalle={`${reporte.actividad.pendientes} pendientes`} />
        <Metrica etiqueta="Trabajos vencidos" valor={reporte.actividad.vencidas} detalle="Revisá las prioridades del equipo" tono={reporte.actividad.vencidas ? 'rose' : 'blue'} />
        <Metrica etiqueta="Mantenimientos" valor={reporte.maquinaria.mantenimientos} detalle={`${reporte.maquinaria.gastosRegistrados} gastos de maquinaria`} tono="blue" />
        <Metrica etiqueta="Alertas activas" valor={reporte.alertas.total} detalle={`${reporte.alertas.prioritarias} prioritarias`} tono={reporte.alertas.prioritarias ? 'amber' : 'emerald'} />
      </div>

      {reporte.finanzas && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-600" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Resumen económico</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Movimientos confirmados del período cerrado.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Metrica etiqueta="Ingresos" valor={formatoPesos.format(reporte.finanzas.ingresos)} detalle="Movimientos de ingreso" />
            <Metrica etiqueta="Egresos" valor={formatoPesos.format(reporte.finanzas.egresos)} detalle={`Costos reales: ${formatoPesos.format(reporte.finanzas.costosReales)}`} tono="rose" />
            <Metrica etiqueta="Saldo operativo" valor={formatoPesos.format(reporte.finanzas.saldo)} detalle={reporte.finanzas.comparacionAnterior?.saldo == null ? 'Sin período comparable' : `${reporte.finanzas.comparacionAnterior.saldo > 0 ? '+' : ''}${reporte.finanzas.comparacionAnterior.saldo}% vs. período anterior`} tono={reporte.finanzas.saldo >= 0 ? 'emerald' : 'rose'} />
          </div>
        </section>
      )}

      <AnalisisInteligente reporte={reporte} />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><Sparkles size={17} className="text-emerald-600" /> Lectura del período</h3>
          <ul className="mt-3 space-y-2">
            {reporte.resumen.map((item) => <li key={item} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />{item}</li>)}
          </ul>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><Wrench size={17} className="text-blue-600" /> Actividad y alertas</h3>
          <div className="mt-3 space-y-2">
            {actividades.length ? actividades.map((actividad) => (
              <div key={actividad.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
                <p className="font-medium text-slate-800 dark:text-slate-100">{actividad.titulo}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{actividad.responsable} · {actividad.estado.replace('_', ' ').toLowerCase()}</p>
              </div>
            )) : <p className="text-sm text-slate-500 dark:text-slate-400">No hay actividades para mostrar en este período.</p>}
            {reporte.alertas.items.slice(0, 2).map((alerta) => <p key={alerta.id} className="flex gap-2 text-sm text-amber-700 dark:text-amber-300"><CircleAlert size={16} className="mt-0.5 shrink-0" />{alerta.titulo}</p>)}
          </div>
        </section>
      </div>
    </div>
  );
}

export function ReportesPeriodicosPanel() {
  const [tipo, setTipo] = useState<TipoReportePeriodico>('SEMANAL');
  const [fecha, setFecha] = useState(fechaActual);
  const [solicitud, setSolicitud] = useState(0);
  const capacidades = useQuery({ queryKey: ['reportes', 'capacidades'], queryFn: reportesApi.capacidades });
  const preferencias = useQuery({ queryKey: ['reportes', 'preferencias'], queryFn: reportesApi.preferencias });
  const reporte = useQuery({
    queryKey: ['reportes', 'periodico', tipo, fecha, solicitud],
    queryFn: () => reportesApi.periodico(tipo, `${fecha}T12:00:00.000Z`),
    enabled: solicitud > 0 && Boolean(capacidades.data?.funcionalidades.semanalMensual),
  });
  const esPro = capacidades.data?.funcionalidades.semanalMensual;

  useEffect(() => {
    if (preferencias.data?.tipoPeriodo) setTipo(preferencias.data.tipoPeriodo);
  }, [preferencias.data?.tipoPeriodo]);

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-sm dark:border-emerald-900/70 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300"><CalendarRange size={15} /> Informes de gestión</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Tu resumen semanal y mensual, listo para revisar</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">Usa períodos cerrados de Argentina para que las cifras no cambien mientras las revisás.</p>
        </div>
        {esPro && <div className="flex flex-wrap items-center gap-2">
          <select value={tipo} onChange={(event) => setTipo(event.target.value as TipoReportePeriodico)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
            <option value="SEMANAL">Última semana cerrada</option>
            <option value="MENSUAL">Último mes cerrado</option>
          </select>
          <input value={fecha} onChange={(event) => setFecha(event.target.value)} type="date" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
          <button onClick={() => setSolicitud((actual) => actual + 1)} disabled={reporte.isFetching} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70">
            <RefreshCw size={16} className={reporte.isFetching ? 'animate-spin' : ''} /> Generar informe
          </button>
        </div>}
      </div>

      {!esPro && !capacidades.isLoading && <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-100"><LockKeyhole size={18} className="mt-0.5 shrink-0" /><p><strong>Disponible con Pro.</strong> Generá informes semanales y mensuales con tareas, maquinaria, alertas y finanzas. Los reportes manuales de abajo siguen disponibles.</p></div>}
      {reporte.isError && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">No se pudo generar el informe. Revisá tus permisos e intentá nuevamente.</p>}
      {reporte.data && <Resultado reporte={reporte.data} />}
    </section>
  );
}
