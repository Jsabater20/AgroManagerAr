import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, CirclePause, Gift, Play, UsersRound, WandSparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { promocionesApi, type EstadoCampaniaPromocional } from '../../api/promociones.api';

const estados: Record<EstadoCampaniaPromocional, { etiqueta: string; clase: string }> = {
  BORRADOR: { etiqueta: 'Borrador', clase: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200' },
  ACTIVA: { etiqueta: 'Activa', clase: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200' },
  PAUSADA: { etiqueta: 'Pausada', clase: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200' },
  FINALIZADA: { etiqueta: 'Finalizada', clase: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-200' },
};

const fecha = (valor: string) => new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/Argentina/Buenos_Aires',
}).format(new Date(valor));

export function PromocionLanzamientoPanel() {
  const queryClient = useQueryClient();
  const lanzamiento = useQuery({
    queryKey: ['admin', 'promocion-lanzamiento'],
    queryFn: promocionesApi.obtenerLanzamiento,
  });
  const actualizar = () => queryClient.invalidateQueries({ queryKey: ['admin', 'promocion-lanzamiento'] });

  const crear = useMutation({
    mutationFn: promocionesApi.crearBorradorLanzamiento,
    onSuccess: () => { actualizar(); toast.success('Borrador de promoción creado. Aún no se otorgó ningún beneficio.'); },
    onError: () => toast.error('No se pudo crear el borrador de promoción.'),
  });
  const activar = useMutation({
    mutationFn: promocionesApi.activarLanzamiento,
    onSuccess: () => { actualizar(); toast.success('Campaña activada. Revisá la simulación antes de asignar usuarios existentes.'); },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudo activar la campaña.'),
  });
  const pausar = useMutation({
    mutationFn: promocionesApi.pausarLanzamiento,
    onSuccess: () => { actualizar(); toast.success('Campaña pausada. Los beneficios ya otorgados se mantienen.'); },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudo pausar la campaña.'),
  });
  const asignar = useMutation({
    mutationFn: promocionesApi.asignarUsuariosExistentes,
    onSuccess: (resultado) => {
      actualizar();
      toast.success(`Asignación finalizada: ${resultado.asignados} cuentas recibieron la promoción.`);
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudieron asignar los beneficios.'),
  });

  if (lanzamiento.isLoading) {
    return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"><p className="text-sm text-slate-500 dark:text-slate-400">Cargando promoción de lanzamiento...</p></section>;
  }

  const campania = lanzamiento.data?.campania;
  if (!campania) {
    return (
      <section className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm dark:border-violet-900/70 dark:from-violet-950/35 dark:to-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-3"><span className="rounded-xl bg-violet-600 p-2.5 text-white"><Gift size={20} /></span><div><h2 className="font-bold text-slate-900 dark:text-white">Promoción de lanzamiento</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Prepará los 3 meses de AgroManager Pro gratis. Crear el borrador no activa la campaña, no muestra anuncios y no modifica ninguna cuenta.</p></div></div>
          <button type="button" onClick={() => crear.mutate()} disabled={crear.isPending} className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:opacity-60"><WandSparkles size={16} />{crear.isPending ? 'Creando...' : 'Crear borrador'}</button>
        </div>
      </section>
    );
  }

  const simulacion = lanzamiento.data?.simulacion;
  const estado = estados[campania.estado];
  const estaActiva = campania.estado === 'ACTIVA';
  const puedeActivarse = campania.estado === 'BORRADOR' || campania.estado === 'PAUSADA';
  const confirmarActivacion = () => {
    if (window.confirm('¿Activar la promoción? Desde ese momento los nuevos productores elegibles recibirán Pro automáticamente. Los usuarios existentes no se modificarán hasta que confirmes la asignación masiva.')) activar.mutate(campania.id);
  };
  const confirmarAsignacion = () => {
    if (window.confirm(`Se otorgarán 3 meses de Pro a ${simulacion?.usuariosElegibles ?? 0} usuarios existentes elegibles. Esta acción es segura e idempotente, pero activa beneficios reales. ¿Continuar?`)) asignar.mutate(campania.id);
  };

  return (
    <section className="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm dark:border-violet-900/70 dark:bg-slate-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-3"><span className="rounded-xl bg-violet-600 p-2.5 text-white"><Gift size={20} /></span><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-slate-900 dark:text-white">3 meses de Pro gratis</h2><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${estado.clase}`}>{estado.etiqueta}</span></div><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{campania.codigo} · Nuevos registros hasta el 31 de diciembre de 2026.</p></div></div>
        {estaActiva && <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"><CheckCircle2 size={15} />Banner público habilitado</span>}
      </div>

      {simulacion && <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metricas etiqueta="Usuarios elegibles" valor={simulacion.usuariosElegibles} detalle="Aún sin asignación" />
        <Metricas etiqueta="Establecimientos" valor={simulacion.organizacionesElegibles} detalle="Recibirán acceso Pro" />
        <Metricas etiqueta="Inicio del beneficio" valor={fecha(simulacion.fechaInicio)} detalle={simulacion.esEstimacion ? 'Estimado hasta activar' : 'Fecha efectiva de activación'} texto />
        <Metricas etiqueta="Vencimiento" valor={fecha(simulacion.fechaFin)} detalle="Tres meses calendario completos" texto />
      </div>}

      {lanzamiento.data?.resumen && lanzamiento.data.resumen.total > 0 && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/70 dark:bg-emerald-950/30">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">Seguimiento de asignaciones</p>
          <p className="mt-1 text-sm text-emerald-950 dark:text-emerald-50">
            {lanzamiento.data.resumen.otorgadas} beneficios otorgados de {lanzamiento.data.resumen.total} asignaciones procesadas. {lanzamiento.data.resumen.porRegistro} corresponden a nuevos registros y {lanzamiento.data.resumen.porExistentes} a usuarios existentes.
          </p>
          {lanzamiento.data.resumen.omitidas > 0 && <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-200">{lanzamiento.data.resumen.omitidas} cuentas no tenían organizaciones Free elegibles.</p>}
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
        Las empresas vinculadas y las suscripciones pagas no entran en esta asignación automática. Los datos se conservan al vencer; únicamente vuelven a aplicar los límites Free.
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {puedeActivarse && <button type="button" onClick={confirmarActivacion} disabled={activar.isPending} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"><Play size={16} />{activar.isPending ? 'Activando...' : campania.estado === 'PAUSADA' ? 'Reanudar campaña' : 'Activar campaña'}</button>}
        {estaActiva && <button type="button" onClick={confirmarAsignacion} disabled={asignar.isPending || !simulacion?.usuariosElegibles} className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:opacity-60"><UsersRound size={16} />{asignar.isPending ? 'Asignando...' : `Asignar a ${simulacion?.usuariosElegibles ?? 0} existentes`}</button>}
        {estaActiva && <button type="button" onClick={() => { if (window.confirm('¿Pausar la campaña? Se ocultará el anuncio y se frenarán los nuevos beneficios; los ya otorgados se mantienen.')) pausar.mutate(campania.id); }} disabled={pausar.isPending} className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 disabled:opacity-60 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200"><CirclePause size={16} />{pausar.isPending ? 'Pausando...' : 'Pausar campaña'}</button>}
      </div>
    </section>
  );
}

function Metricas({ etiqueta, valor, detalle, texto = false }: { etiqueta: string; valor: string | number; detalle: string; texto?: boolean }) {
  return <article className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-800/70"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{etiqueta}</p><p className={`mt-1 font-bold text-slate-900 dark:text-white ${texto ? 'text-sm' : 'text-2xl'}`}>{valor}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{detalle}</p></article>;
}
