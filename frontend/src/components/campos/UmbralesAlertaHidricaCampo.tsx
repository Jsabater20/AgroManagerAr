import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BellRing,
  CloudRain,
  Edit3,
  LockKeyhole,
  Loader2,
  Save,
  SlidersHorizontal,
  TriangleAlert,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  camposApi,
  type ActualizarUmbralAlertaHidricaCampo,
  type UmbralAlertaHidricaCampo,
} from '../../api/campos.api';
import { alertasApi } from '../../api/alertas.api';

type FormularioUmbrales = ActualizarUmbralAlertaHidricaCampo;

const formularioDesdeUmbral = (umbral?: UmbralAlertaHidricaCampo): FormularioUmbrales => ({
  activo: umbral?.activo ?? true,
  lluviaDiariaMm: umbral?.lluviaDiariaMm ?? 25,
  lluviaAcumulada48hMm: umbral?.lluviaAcumulada48hMm ?? 50,
  probabilidadLluviaPct: umbral?.probabilidadLluviaPct ?? 70,
  crearAccionesAutomaticas: umbral?.crearAccionesAutomaticas ?? false,
});

const mensajeError = (error: any, porDefecto: string) => {
  const mensaje = error?.response?.data?.message;
  return Array.isArray(mensaje) ? mensaje[0] : mensaje || porDefecto;
};

export function UmbralesAlertaHidricaCampo({
  campoId,
  organizacionId,
}: {
  campoId: number;
  organizacionId: number;
}) {
  const queryClient = useQueryClient();
  const [edicionAbierta, setEdicionAbierta] = useState(false);
  const [formulario, setFormulario] = useState<FormularioUmbrales>(
    formularioDesdeUmbral(),
  );
  const claveConsulta = ['campos', campoId, 'umbrales-alerta-hidrica'];
  const umbralQuery = useQuery({
    queryKey: claveConsulta,
    queryFn: () => camposApi.getUmbralAlertaHidrica(campoId),
    enabled: campoId > 0,
  });
  const preferenciasQuery = useQuery({
    queryKey: ['alertas', 'preferencias', organizacionId],
    queryFn: alertasApi.preferencias,
    enabled: Boolean(umbralQuery.data?.puedeEditar) && organizacionId > 0,
    retry: false,
  });

  useEffect(() => {
    if (umbralQuery.data) setFormulario(formularioDesdeUmbral(umbralQuery.data));
  }, [umbralQuery.data]);

  const guardarMutation = useMutation({
    mutationFn: () => camposApi.updateUmbralAlertaHidrica(campoId, formulario),
    onSuccess: () => {
      toast.success('Umbrales de alerta actualizados.');
      setEdicionAbierta(false);
      queryClient.invalidateQueries({ queryKey: claveConsulta });
    },
    onError: (error) => toast.error(mensajeError(error, 'No se pudieron guardar los umbrales.')),
  });

  if (umbralQuery.isLoading) {
    return <div className="mb-8 h-48 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />;
  }
  if (umbralQuery.isError || !umbralQuery.data) return null;

  const umbral = umbralQuery.data;
  const alertasGlobalesActivas = preferenciasQuery.data?.alertasClimaActivas;
  const abrirEdicion = () => {
    setFormulario(formularioDesdeUmbral(umbral));
    setEdicionAbierta(true);
  };
  const cancelarEdicion = () => {
    setFormulario(formularioDesdeUmbral(umbral));
    setEdicionAbierta(false);
  };

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm dark:border-indigo-900/70 dark:bg-slate-900">
      <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-sky-50 p-5 dark:border-indigo-900/60 dark:from-indigo-950/35 dark:via-slate-900 dark:to-sky-950/20 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-3">
            <span className="h-fit rounded-xl bg-indigo-700 p-2.5 text-white shadow-sm"><BellRing size={20} /></span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold text-slate-900 dark:text-white">Alertas por lluvia previstas</h2>
                {umbral.esPro
                  ? <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${umbral.activo ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-200' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{umbral.activo ? 'Umbrales activos' : 'Pausadas en este campo'}</span>
                  : <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/70 dark:text-amber-200"><LockKeyhole size={12} /> Función Pro</span>}
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Elegí cuándo querés que AgroManager te avise según el pronóstico de este establecimiento.</p>
            </div>
          </div>
          {umbral.puedeEditar && !edicionAbierta && <button type="button" onClick={abrirEdicion} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-800"><Edit3 size={16} />{umbral.configurado ? 'Ajustar umbrales' : 'Configurar alertas'}</button>}
        </div>
      </div>

      {!umbral.esPro ? (
        <div className="p-5 sm:p-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/70 dark:bg-amber-950/25">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-amber-100 p-2 text-amber-800 dark:bg-amber-900/50 dark:text-amber-100"><LockKeyhole size={18} /></span>
              <div>
                <h3 className="font-bold text-amber-950 dark:text-amber-100">Personalizá la prevención con Pro</h3>
                <p className="mt-1 text-sm leading-6 text-amber-900/85 dark:text-amber-100/85">En Free seguís viendo el clima y podés completar el perfil de riesgo y el checklist manual. Con Pro definís límites de lluvia para cada campo y permitís que una alerta cree una acción preventiva sin duplicarla.</p>
              </div>
            </div>
          </div>
        </div>
      ) : edicionAbierta ? (
        <form onSubmit={(event) => { event.preventDefault(); guardarMutation.mutate(); }} className="space-y-4 p-5 sm:p-6">
          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 dark:border-indigo-900/70 dark:bg-indigo-950/25">
            <span><span className="block text-sm font-bold text-indigo-950 dark:text-indigo-100">Usar alertas hídricas en este campo</span><span className="mt-1 block text-xs leading-5 text-indigo-800/80 dark:text-indigo-200/80">Podés pausarlas temporalmente sin cambiar el resto de las alertas del establecimiento.</span></span>
            <input type="checkbox" checked={formulario.activo} onChange={(event) => setFormulario((actual) => ({ ...actual, activo: event.target.checked }))} className="mt-1 h-4 w-4 rounded border-indigo-400 text-indigo-700 focus:ring-indigo-500" />
          </label>
          <div className={`grid gap-4 md:grid-cols-3 ${formulario.activo ? '' : 'opacity-55'}`}>
            <NumeroField label="Lluvia en un día" descripcion="Avisar si un día supera este valor." value={formulario.lluviaDiariaMm} min={1} max={500} step={0.5} suffix="mm" disabled={!formulario.activo} onChange={(valor) => setFormulario((actual) => ({ ...actual, lluviaDiariaMm: valor }))} />
            <NumeroField label="Acumulado en 48 h" descripcion="Avisar por lluvia total de dos días." value={formulario.lluviaAcumulada48hMm} min={1} max={1000} step={0.5} suffix="mm" disabled={!formulario.activo} onChange={(valor) => setFormulario((actual) => ({ ...actual, lluviaAcumulada48hMm: valor }))} />
            <NumeroField label="Probabilidad de lluvia" descripcion="Avisar cuando el pronóstico llegue a este porcentaje." value={formulario.probabilidadLluviaPct} min={1} max={100} step={1} suffix="%" disabled={!formulario.activo} onChange={(valor) => setFormulario((actual) => ({ ...actual, probabilidadLluviaPct: Math.round(valor) }))} />
          </div>
          <label className={`flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/25 ${formulario.activo ? '' : 'opacity-55'}`}>
            <span><span className="block text-sm font-bold text-emerald-950 dark:text-emerald-100">Crear una acción preventiva automáticamente</span><span className="mt-1 block text-xs leading-5 text-emerald-800/80 dark:text-emerald-200/80">Cuando se supere un umbral, se agregará una única acción pendiente al plan preventivo del campo. No se duplicará mientras siga abierta.</span></span>
            <input type="checkbox" checked={formulario.crearAccionesAutomaticas} disabled={!formulario.activo} onChange={(event) => setFormulario((actual) => ({ ...actual, crearAccionesAutomaticas: event.target.checked }))} className="mt-1 h-4 w-4 rounded border-emerald-400 text-emerald-700 focus:ring-emerald-500" />
          </label>
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950/35 dark:text-slate-300"><strong>Cómo funciona:</strong> el sistema revisa el pronóstico cada hora y crea una alerta si se supera alguno de estos límites. No reemplaza los avisos oficiales ni la recorrida del campo.</p>
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800"><button type="button" onClick={cancelarEdicion} disabled={guardarMutation.isPending} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"><X size={16} />Cancelar</button><button type="submit" disabled={guardarMutation.isPending} className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-800 disabled:opacity-60">{guardarMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Guardar umbrales</button></div>
        </form>
      ) : (
        <div className="p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <Resumen label="En un día" valor={`${umbral.lluviaDiariaMm} mm`} icono={CloudRain} />
            <Resumen label="Acumulado 48 h" valor={`${umbral.lluviaAcumulada48hMm} mm`} icono={SlidersHorizontal} />
            <Resumen label="Probabilidad" valor={`${umbral.probabilidadLluviaPct}%`} icono={BellRing} />
          </div>
          <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950/35 dark:text-slate-300">{umbral.crearAccionesAutomaticas ? 'La automatización está activa: una alerta hídrica creará una acción pendiente para este campo.' : 'La automatización está desactivada: las alertas se registran, pero el owner decide si crea una acción preventiva.'}</p>
          {umbral.puedeEditar && alertasGlobalesActivas === false && <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/25 dark:text-amber-100"><TriangleAlert size={16} className="mt-0.5 shrink-0" /><span>Los umbrales están guardados, pero las alertas climáticas generales están apagadas. <Link to={`/org/${organizacionId}/reportes`} className="font-bold underline">Activarlas en Reportes</Link> habilita los avisos.</span></div>}
          {!umbral.puedeEditar && <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">El owner define estos umbrales; al superar un límite, el aviso se verá en el centro de alertas.</p>}
        </div>
      )}
    </section>
  );
}

function NumeroField({
  label,
  descripcion,
  value,
  min,
  max,
  step,
  suffix,
  disabled,
  onChange,
}: {
  label: string;
  descripcion: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  disabled: boolean;
  onChange: (valor: number) => void;
}) {
  return <label className="block rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950/35 dark:text-slate-200"><span>{label}</span><span className="mt-1 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">{descripcion}</span><div className="mt-3 flex items-center gap-2"><input type="number" required min={min} max={max} step={step} disabled={disabled} value={value} onChange={(event) => onChange(Number(event.target.value))} className="input min-w-0" /><span className="text-sm font-bold text-slate-500 dark:text-slate-400">{suffix}</span></div></label>;
}

function Resumen({ label, valor, icono: Icono }: { label: string; valor: string; icono: typeof BellRing }) {
  return <article className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/35"><div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300"><Icono size={16} /><p className="text-xs font-bold uppercase tracking-wide">{label}</p></div><p className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">{valor}</p></article>;
}
