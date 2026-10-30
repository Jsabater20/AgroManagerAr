import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Clock3, History, Mail, Save, SlidersHorizontal } from 'lucide-react';
import { reportesApi, type TipoReportePeriodico } from '../../api/reportes.api';

const nombresTipo = {
  SEMANAL: 'Informe semanal',
  MENSUAL: 'Informe mensual',
  DESGLOSE_PRODUCTIVO: 'Desglose productivo',
};

export function GestionReportesPanel() {
  const queryClient = useQueryClient();
  const preferencias = useQuery({ queryKey: ['reportes', 'preferencias'], queryFn: reportesApi.preferencias });
  const historial = useQuery({ queryKey: ['reportes', 'historial'], queryFn: reportesApi.historial });
  const capacidades = useQuery({ queryKey: ['reportes', 'capacidades'], queryFn: reportesApi.capacidades });
  const [tipoPeriodo, setTipoPeriodo] = useState<TipoReportePeriodico>('MENSUAL');
  const [vistaDesglose, setVistaDesglose] = useState<'LOTES' | 'CAMPANIAS'>('LOTES');
  const [envioAutomatico, setEnvioAutomatico] = useState(false);
  const [frecuenciaEnvio, setFrecuenciaEnvio] = useState<TipoReportePeriodico>('MENSUAL');

  useEffect(() => {
    if (!preferencias.data) return;
    setTipoPeriodo(preferencias.data.tipoPeriodo);
    setVistaDesglose(preferencias.data.vistaDesglose);
    setEnvioAutomatico(preferencias.data.envioAutomatico);
    setFrecuenciaEnvio(preferencias.data.frecuenciaEnvio);
  }, [preferencias.data]);

  const guardar = useMutation({
    mutationFn: () => reportesApi.actualizarPreferencias({ tipoPeriodo, vistaDesglose, envioAutomatico, frecuenciaEnvio }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportes', 'preferencias'] });
    },
  });
  const puedeAutomatizar = capacidades.data?.funcionalidades.automatizacion ?? false;

  return (
    <section className="mb-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-2"><SlidersHorizontal size={18} className="text-slate-600 dark:text-slate-300" /><div><h2 className="font-semibold text-slate-900 dark:text-white">Mis preferencias</h2><p className="text-xs text-slate-500 dark:text-slate-400">Se aplican al volver a abrir Reportes.</p></div></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Período preferido<select value={tipoPeriodo} onChange={(event) => setTipoPeriodo(event.target.value as TipoReportePeriodico)} className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"><option value="MENSUAL">Último mes cerrado</option><option value="SEMANAL">Última semana cerrada</option></select></label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Vista del desglose<select value={vistaDesglose} onChange={(event) => setVistaDesglose(event.target.value as 'LOTES' | 'CAMPANIAS')} className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"><option value="LOTES">Lotes</option><option value="CAMPANIAS">Campañas</option></select></label>
        </div>
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-900/70 dark:bg-emerald-950/25">
          <div className="flex items-start gap-2"><Mail size={17} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300" /><div><p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Resumen automático por email</p><p className="mt-0.5 text-xs text-emerald-800/80 dark:text-emerald-200/80">Se envía a tu email verificado después del cierre del período.</p></div></div>
          <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><input type="checkbox" checked={envioAutomatico} disabled={!puedeAutomatizar && !envioAutomatico} onChange={(event) => setEnvioAutomatico(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" /> Quiero recibir informes automáticos</label>
          <label className="mt-3 block text-sm font-medium text-slate-700 dark:text-slate-200">Frecuencia<select value={frecuenciaEnvio} disabled={!puedeAutomatizar} onChange={(event) => setFrecuenciaEnvio(event.target.value as TipoReportePeriodico)} className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"><option value="MENSUAL">Mensual · día 1 a las 9:00</option><option value="SEMANAL">Semanal · lunes a las 9:00</option></select></label>
          {!puedeAutomatizar && <p className="mt-2 text-xs font-medium text-amber-700 dark:text-amber-300">El envío automático es una función Pro. Si tu plan vence, los envíos se pausan sin borrar tu configuración.</p>}
        </div>
        <button onClick={() => guardar.mutate()} disabled={guardar.isPending} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-70 dark:bg-emerald-600 dark:hover:bg-emerald-700"><Save size={16} />{guardar.isPending ? 'Guardando...' : 'Guardar preferencias'}</button>
        {guardar.isSuccess && <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-300">Preferencias guardadas.</p>}
        {guardar.isError && <p className="mt-2 text-xs font-medium text-rose-700 dark:text-rose-300">No se pudieron guardar las preferencias.</p>}
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-2"><History size={18} className="text-blue-600" /><div><h2 className="font-semibold text-slate-900 dark:text-white">Historial de informes</h2><p className="text-xs text-slate-500 dark:text-slate-400">Tus últimas consultas; al regenerarlas siempre se aplican los permisos actuales.</p></div></div>
        <div className="mt-4 space-y-2">
          {historial.isLoading && <p className="text-sm text-slate-500 dark:text-slate-400">Cargando historial...</p>}
          {!historial.isLoading && !historial.data?.length && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">Todavía no generaste informes automáticos.</p>}
          {historial.data?.slice(0, 6).map((reporte) => <div key={reporte.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 dark:border-slate-800"><div><p className="text-sm font-medium text-slate-800 dark:text-slate-100">{nombresTipo[reporte.tipo]}</p><p className="text-xs text-slate-500 dark:text-slate-400">{new Date(reporte.periodoDesde).toLocaleDateString('es-AR')} al {new Date(new Date(reporte.periodoHasta).getTime() - 1).toLocaleDateString('es-AR')}</p></div><p className="flex shrink-0 items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><Clock3 size={13} />{new Date(reporte.createdAt).toLocaleDateString('es-AR')}</p></div>)}
        </div>
      </article>
    </section>
  );
}
