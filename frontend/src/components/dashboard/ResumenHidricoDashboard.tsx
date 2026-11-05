import { useQuery } from '@tanstack/react-query';
import { BellRing, ChevronRight, ClipboardCheck, CloudRain, Droplets, MapPinned, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { camposApi, type NivelRiesgoHidrico } from '../../api/campos.api';

const estilosRiesgo: Record<NivelRiesgoHidrico, string> = {
  BAJO: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200',
  MEDIO: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200',
  ALTO: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-200',
};

const etiquetaRiesgo: Record<NivelRiesgoHidrico, string> = {
  BAJO: 'Riesgo bajo',
  MEDIO: 'Riesgo medio',
  ALTO: 'Riesgo alto',
};

export function ResumenHidricoDashboard({ organizacionId }: { organizacionId: number }) {
  const resumenQuery = useQuery({
    queryKey: ['campos', organizacionId, 'resumen-hidrico'],
    queryFn: camposApi.getResumenHidricoDashboard,
    enabled: organizacionId > 0,
    refetchInterval: 120000,
  });

  if (resumenQuery.isLoading) {
    return <div className="h-60 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />;
  }
  if (resumenQuery.isError || !resumenQuery.data) return null;

  const { resumen, campos } = resumenQuery.data;
  return (
    <section className="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm dark:border-sky-900/70 dark:bg-slate-900">
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 p-5 dark:border-sky-900/60 dark:from-sky-950/35 dark:via-slate-900 dark:to-cyan-950/20 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-3">
            <span className="h-fit rounded-xl bg-sky-700 p-2.5 text-white shadow-sm"><CloudRain size={20} /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">Seguimiento hídrico</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Estado preventivo de tus campos</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">Priorizá perfiles de riesgo, acciones pendientes y alertas por lluvia en un solo lugar.</p>
            </div>
          </div>
          <Link to={`/org/${organizacionId}/campos`} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-white px-3.5 py-2 text-sm font-bold text-sky-800 transition hover:bg-sky-50 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-200 dark:hover:bg-sky-950/30">Ver campos <ChevronRight size={16} /></Link>
        </div>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
        <Metric icono={ShieldAlert} etiqueta="Riesgo alto" valor={resumen.altoRiesgo} detalle={resumen.altoRiesgo ? 'Revisá esos campos primero' : 'Sin campos en nivel alto'} tono="rose" />
        <Metric icono={ClipboardCheck} etiqueta="Acciones pendientes" valor={resumen.accionesPendientes} detalle={resumen.accionesAutomaticasPendientes ? `${resumen.accionesAutomaticasPendientes} creada${resumen.accionesAutomaticasPendientes === 1 ? '' : 's'} por alerta` : 'Plan preventivo al día'} tono="amber" />
        <Metric icono={BellRing} etiqueta="Alertas hídricas" valor={resumen.alertasActivas} detalle={resumen.alertasActivas ? 'Pronóstico para revisar' : 'Sin alertas activas'} tono="sky" />
        <Metric icono={MapPinned} etiqueta="Perfiles pendientes" valor={resumen.sinPerfil} detalle={`${resumen.totalCampos} campo${resumen.totalCampos === 1 ? '' : 's'} en esta vista`} tono="slate" />
      </div>

      <div className="border-t border-slate-100 p-5 dark:border-slate-800 sm:p-6">
        {campos.length ? <div className="space-y-2">{campos.map((campo) => (
          <Link key={campo.id} to={`/org/${organizacionId}/campos/${campo.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:border-sky-300 hover:bg-sky-50/70 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-sky-800 dark:hover:bg-sky-950/20">
            <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="truncate text-sm font-bold text-slate-900 dark:text-white">{campo.nombre}</p>{campo.nivelRiesgo ? <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${estilosRiesgo[campo.nivelRiesgo]}`}>{etiquetaRiesgo[campo.nivelRiesgo]}</span> : <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">Sin perfil</span>}</div><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{campo.alertasActivas ? `${campo.alertasActivas} alerta${campo.alertasActivas === 1 ? '' : 's'} activa${campo.alertasActivas === 1 ? '' : 's'}` : 'Sin alertas activas'} · {campo.accionesPendientes} acción{campo.accionesPendientes === 1 ? '' : 'es'} pendiente{campo.accionesPendientes === 1 ? '' : 's'}{campo.automatizacionActiva ? ' · Automatización activa' : ''}</p></div><ChevronRight size={18} className="shrink-0 text-sky-600 dark:text-sky-300" />
          </Link>
        ))}</div> : <div className="rounded-xl border border-dashed border-slate-300 px-5 py-7 text-center dark:border-slate-700"><Droplets className="mx-auto h-8 w-8 text-sky-500" /><p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100">No hay prioridades hídricas pendientes</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Configurá el perfil preventivo de cada campo para mantener este resumen actualizado.</p></div>}
      </div>
    </section>
  );
}

function Metric({ icono: Icono, etiqueta, valor, detalle, tono }: { icono: typeof CloudRain; etiqueta: string; valor: number; detalle: string; tono: 'rose' | 'amber' | 'sky' | 'slate' }) {
  const estilos = {
    rose: 'border-rose-100 bg-rose-50/70 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/20 dark:text-rose-200',
    amber: 'border-amber-100 bg-amber-50/70 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-200',
    sky: 'border-sky-100 bg-sky-50/70 text-sky-800 dark:border-sky-900/60 dark:bg-sky-950/20 dark:text-sky-200',
    slate: 'border-slate-200 bg-slate-50/70 text-slate-800 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200',
  }[tono];
  return <article className={`rounded-xl border p-4 ${estilos}`}><div className="flex items-center gap-2"><Icono size={16} /><p className="text-xs font-bold uppercase tracking-wide">{etiqueta}</p></div><p className="mt-2 text-2xl font-extrabold">{valor}</p><p className="mt-1 text-xs opacity-80">{detalle}</p></article>;
}
