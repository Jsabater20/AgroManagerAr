import { useQuery } from '@tanstack/react-query';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BellRing,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  RefreshCw,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { alertasApi, type ItemCentroAtencion } from '../../api/alertas.api';
import { useAuthStore } from '../../store/auth.store';

const ESTILOS_SEVERIDAD = {
  CRITICA: {
    borde: 'border-rose-200 dark:border-rose-900/70',
    fondo: 'bg-rose-50 dark:bg-rose-950/30',
    etiqueta: 'bg-rose-100 text-rose-800 dark:bg-rose-900/70 dark:text-rose-100',
    icono: 'text-rose-600 dark:text-rose-300',
    texto: 'Atender ahora',
  },
  ATENCION: {
    borde: 'border-amber-200 dark:border-amber-900/70',
    fondo: 'bg-amber-50 dark:bg-amber-950/25',
    etiqueta: 'bg-amber-100 text-amber-800 dark:bg-amber-900/70 dark:text-amber-100',
    icono: 'text-amber-600 dark:text-amber-300',
    texto: 'Revisar hoy',
  },
  PROXIMA: {
    borde: 'border-sky-200 dark:border-sky-900/70',
    fondo: 'bg-sky-50 dark:bg-sky-950/25',
    etiqueta: 'bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-100',
    icono: 'text-sky-600 dark:text-sky-300',
    texto: 'Próximo',
  },
} as const;

function formatoFecha(fecha?: string) {
  if (!fecha) return undefined;

  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(fecha));
}

function TarjetaResumen({ etiqueta, valor, detalle, tono }: {
  etiqueta: string;
  valor: number;
  detalle: string;
  tono: 'rose' | 'amber' | 'sky' | 'slate';
}) {
  const estilos = {
    rose: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/25 dark:text-rose-200',
    amber: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/25 dark:text-amber-200',
    sky: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/25 dark:text-sky-200',
    slate: 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
  }[tono];

  return (
    <article className={`rounded-2xl border p-4 shadow-sm ${estilos}`}>
      <p className="text-2xl font-bold">{valor}</p>
      <p className="mt-1 text-sm font-semibold">{etiqueta}</p>
      <p className="mt-1 text-xs opacity-80">{detalle}</p>
    </article>
  );
}

function ItemAtencion({ item }: { item: ItemCentroAtencion }) {
  const estilo = ESTILOS_SEVERIDAD[item.severidad];
  const Icono = item.tipo === 'ALERTA' ? BellRing : ClipboardList;

  return (
    <Link
      to={item.enlace}
      className={`group flex items-start gap-3 rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${estilo.borde} ${estilo.fondo}`}
    >
      <span className={`rounded-xl bg-white/70 p-2.5 shadow-sm dark:bg-slate-950/30 ${estilo.icono}`}>
        <Icono size={19} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-slate-900 dark:text-white">{item.titulo}</span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${estilo.etiqueta}`}>{estilo.texto}</span>
        </span>
        <span className="mt-1 block text-sm leading-5 text-slate-600 dark:text-slate-300">{item.detalle}</span>
        {item.fecha && <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400"><CalendarClock size={13} />{formatoFecha(item.fecha)}</span>}
      </span>
      <ArrowRight size={17} className="mt-1 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
    </Link>
  );
}

export default function CentroAtencionPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId || 0);
  const usuario = useAuthStore((state) => state.usuario);
  const esOwner = usuario?.organizaciones?.some(
    (organizacion) => organizacion.id === organizacionId && organizacion.propietarioId === usuario.id,
  ) ?? false;
  const centroQuery = useQuery({
    queryKey: ['centro-atencion', organizacionId],
    queryFn: alertasApi.centroAtencion,
    enabled: organizacionId > 0 && esOwner,
    refetchInterval: 120000,
  });

  if (!esOwner) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <BellRing className="mx-auto text-slate-400" size={34} />
        <h1 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Centro de atención del owner</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-300">Este resumen reúne las prioridades generales del establecimiento y está disponible para quien administra la cuenta.</p>
        <Link to={`/org/${orgId}/dashboard`} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"><ArrowLeft size={16} />Volver al dashboard</Link>
      </section>
    );
  }

  const resumen = centroQuery.data?.resumen;
  const items = centroQuery.data?.items ?? [];
  const requiereAtencion = items.filter((item) => item.severidad !== 'PROXIMA');
  const proximos = items.filter((item) => item.severidad === 'PROXIMA');

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-3">
            <span className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"><BellRing size={24} /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Operación diaria</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Centro de atención</h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Mirá primero lo que requiere una decisión o seguimiento. Las prioridades se actualizan con tus tareas y alertas operativas.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/org/${orgId}/dashboard`} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700"><ArrowLeft size={16} />Dashboard</Link>
            <button type="button" onClick={() => centroQuery.refetch()} disabled={centroQuery.isFetching} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"><RefreshCw size={16} className={centroQuery.isFetching ? 'animate-spin' : ''} />Actualizar</button>
          </div>
        </div>
      </header>

      {centroQuery.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, indice) => <div key={indice} className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}</div>
      ) : centroQuery.isError ? (
        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-200">No se pudo cargar el centro de atención. Actualizá la página o intentá nuevamente.</section>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <TarjetaResumen etiqueta="Tareas vencidas" valor={resumen?.tareasVencidas ?? 0} detalle="Requieren reprogramación o cierre" tono="rose" />
            <TarjetaResumen etiqueta="Para hoy" valor={resumen?.tareasParaHoy ?? 0} detalle="Trabajos previstos para esta jornada" tono="amber" />
            <TarjetaResumen etiqueta="Alertas críticas" valor={resumen?.alertasCriticas ?? 0} detalle="Situaciones para revisar primero" tono="rose" />
            <TarjetaResumen etiqueta="Tareas activas" valor={resumen?.tareasActivas ?? 0} detalle={`${resumen?.alertasActivas ?? 0} alertas operativas activas`} tono="slate" />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"><AlertTriangle size={19} className="text-amber-600 dark:text-amber-300" />Qué atender primero</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Accedé a cada elemento para resolverlo o ver más información.</p>
              </div>
              <Link to={`/org/${orgId}/alertas`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200">Ver historial de alertas</Link>
            </div>

            {requiereAtencion.length ? (
              <div className="mt-5 grid gap-3 lg:grid-cols-2">{requiereAtencion.map((item) => <ItemAtencion key={item.id} item={item} />)}</div>
            ) : (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950/25 dark:text-emerald-100"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" size={20} /><div><p className="font-bold">No hay urgencias para atender.</p><p className="mt-1 text-sm">El establecimiento está al día con las alertas y tareas que vencen hoy.</p></div></div>
            )}
          </section>

          {proximos.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div><h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"><CalendarClock size={19} className="text-sky-600 dark:text-sky-300" />Próximos días</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Acciones previstas para los siguientes siete días.</p></div>
              <div className="mt-5 grid gap-3 lg:grid-cols-2">{proximos.map((item) => <ItemAtencion key={item.id} item={item} />)}</div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
