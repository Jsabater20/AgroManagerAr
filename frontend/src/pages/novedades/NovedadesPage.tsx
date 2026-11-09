import { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Info,
  Lightbulb,
  Megaphone,
  RefreshCw,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import type { ElementType } from 'react';
import {
  novedadesApi,
  type CategoriaNovedadProducto,
  type NovedadProducto,
} from '../../api/novedades.api';

const categoriaConfig: Record<CategoriaNovedadProducto, {
  etiqueta: string;
  icono: ElementType;
  clase: string;
}> = {
  GENERAL: { etiqueta: 'AgroManager AR', icono: Info, clase: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200' },
  FUNCIONALIDAD: { etiqueta: 'Nueva función', icono: Sparkles, clase: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-200' },
  ACTUALIZACION: { etiqueta: 'Actualización', icono: RefreshCw, clase: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-200' },
  ARREGLOS: { etiqueta: 'Arreglos', icono: Wrench, clase: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200' },
  PROMOCION: { etiqueta: 'Promoción', icono: Megaphone, clase: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200' },
};

function fecha(valor: string) {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(valor));
}

export default function NovedadesPage() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const novedadAbiertaId = searchParams.get('open');
  const lecturaProcesada = useRef<string | null>(null);
  const novedadesQuery = useQuery({
    queryKey: ['novedades'],
    queryFn: novedadesApi.listar,
  });
  const resumenQuery = useQuery({
    queryKey: ['novedades', 'resumen'],
    queryFn: novedadesApi.resumen,
  });
  const marcarLeida = useMutation({
    mutationFn: novedadesApi.marcarLeida,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['novedades'] });
      queryClient.invalidateQueries({ queryKey: ['notificaciones'] });
    },
  });

  const novedadAbierta = novedadesQuery.data?.find((novedad) => novedad.id === novedadAbiertaId) ?? null;

  useEffect(() => {
    if (!novedadAbierta || novedadAbierta.leida || lecturaProcesada.current === novedadAbierta.id) return;
    lecturaProcesada.current = novedadAbierta.id;
    marcarLeida.mutate(novedadAbierta.id);
  }, [novedadAbierta, marcarLeida]);

  const abrir = (novedad: NovedadProducto) => {
    setSearchParams({ open: novedad.id });
  };
  const cerrar = () => {
    lecturaProcesada.current = null;
    setSearchParams({});
  };

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
      <header className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 p-6 text-white shadow-sm dark:border-emerald-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex max-w-2xl gap-3">
            <span className="rounded-2xl bg-white/15 p-3 text-emerald-100"><Sparkles size={25} /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Centro de novedades</p>
              <h1 className="mt-1 text-2xl font-bold md:text-3xl">Todo lo nuevo de AgroManager AR</h1>
              <p className="mt-2 text-sm leading-6 text-emerald-50/85">Conocé funciones, mejoras y recomendaciones para aprovechar mejor tu gestión.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-slate-950/20 px-4 py-3 text-center">
            <p className="text-2xl font-bold">{resumenQuery.data?.sinLeer ?? 0}</p>
            <p className="text-xs font-medium text-emerald-100">sin leer</p>
          </div>
        </div>
      </header>

      {novedadesQuery.isLoading ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">Cargando novedades...</section>
      ) : novedadesQuery.isError ? (
        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/25 dark:text-rose-100">No se pudieron cargar las novedades. Actualizá la página e intentá nuevamente.</section>
      ) : novedadesQuery.data?.length ? (
        <section className="grid gap-4 md:grid-cols-2">
          {novedadesQuery.data.map((novedad) => {
            const config = categoriaConfig[novedad.categoria];
            const Icono = config.icono;
            return (
              <article key={novedad.id} className={`relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 ${novedad.leida ? 'border-slate-200 dark:border-slate-700' : 'border-emerald-300 ring-1 ring-emerald-100 dark:border-emerald-700 dark:ring-emerald-900/40'}`}>
                {!novedad.leida && <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-emerald-500" aria-label="Novedad sin leer" />}
                <div className="flex flex-wrap items-center gap-2 pr-5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${config.clase}`}><Icono size={13} />{config.etiqueta}</span>
                  {novedad.version && <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">v{novedad.version}</span>}
                  {novedad.destacada && <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">Destacada</span>}
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{novedad.titulo}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{novedad.resumen}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <time className="text-xs text-slate-500 dark:text-slate-400">{fecha(novedad.publicadaEn)}</time>
                  <button type="button" onClick={() => abrir(novedad)} className="text-sm font-bold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200">Leer novedad →</button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <Lightbulb className="mx-auto text-emerald-600 dark:text-emerald-300" size={32} />
          <h2 className="mt-3 font-bold text-slate-900 dark:text-white">Próximamente vas a encontrar novedades acá</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">Cuando publiquemos una mejora o función nueva, vas a poder verla y consultarla desde este espacio.</p>
        </section>
      )}

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-300">¿Querés recibir avisos cuando publiquemos una novedad?</p>
        <Link to="/perfil" className="font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">Configurar comunicaciones</Link>
      </section>

      {novedadAbierta && <DetalleNovedad novedad={novedadAbierta} onClose={cerrar} />}
    </main>
  );
}

function DetalleNovedad({ novedad, onClose }: { novedad: NovedadProducto; onClose: () => void }) {
  const config = categoriaConfig[novedad.categoria];
  const Icono = config.icono;
  return (
    <div className="fixed inset-0 z-[60] flex items-end bg-slate-950/60 p-0 backdrop-blur-sm md:items-center md:justify-center md:p-6" role="dialog" aria-modal="true" aria-label={novedad.titulo}>
      <article className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 md:rounded-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${config.clase}`}><Icono size={13} />{config.etiqueta}</span>{novedad.version && <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Versión {novedad.version}</span>}</div>
            <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">{novedad.titulo}</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Publicado el {fecha(novedad.publicadaEn)}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="Cerrar novedad"><X size={19} /></button>
        </div>
        <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-medium leading-6 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">{novedad.resumen}</p>
        <div className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-200">{novedad.contenido}</div>
        <div className="mt-7 flex justify-end"><button type="button" onClick={onClose} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"><CheckCircle2 size={16} />Entendido</button></div>
      </article>
    </div>
  );
}
