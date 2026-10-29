import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  BellRing,
  Check,
  CheckCheck,
  ChevronRight,
  CircleAlert,
  Clock3,
  Eye,
  Inbox,
  RefreshCw,
} from 'lucide-react';
import {
  alertasApi,
  type EstadoAlertaGestion,
  type SeveridadAlertaGestion,
} from '../../api/alertas.api';
import { useAuthStore } from '../../store/auth.store';

const ESTADOS: Array<{ valor: EstadoAlertaGestion; etiqueta: string }> = [
  { valor: 'ACTIVA', etiqueta: 'Activas' },
  { valor: 'REVISADA', etiqueta: 'Revisadas' },
  { valor: 'RESUELTA', etiqueta: 'Resueltas' },
];

const fechaHora = (fecha: string) => new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'medium',
  timeStyle: 'short',
}).format(new Date(fecha));

const severidadUi: Record<SeveridadAlertaGestion, { etiqueta: string; clase: string; icono: string }> = {
  PRIORITARIA: {
    etiqueta: 'Prioritaria',
    clase: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200',
    icono: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
  },
  ATENCION: {
    etiqueta: 'Atención',
    clase: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-200',
    icono: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200',
  },
  INFORMATIVA: {
    etiqueta: 'Informativa',
    clase: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-200',
    icono: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
  },
};

const estadoUi: Record<EstadoAlertaGestion, string> = {
  ACTIVA: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
  REVISADA: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  RESUELTA: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
};

export default function AlertasPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const usuario = useAuthStore((state) => state.usuario);
  const queryClient = useQueryClient();
  const [estado, setEstado] = useState<EstadoAlertaGestion>('ACTIVA');
  const [severidad, setSeveridad] = useState<SeveridadAlertaGestion | ''>('');

  const esOwner = useMemo(
    () => usuario?.organizaciones?.some(
      (organizacion) => organizacion.id === organizacionId && organizacion.propietarioId === usuario.id,
    ) ?? false,
    [organizacionId, usuario],
  );

  const alertasQuery = useQuery({
    queryKey: ['alertas-gestion', organizacionId, estado, severidad],
    queryFn: () => alertasApi.listarGestion({
      estado,
      ...(severidad ? { severidad } : {}),
    }),
    enabled: esOwner && organizacionId > 0,
    refetchInterval: 120000,
  });
  const resumenQuery = useQuery({
    queryKey: ['alertas-gestion-resumen', organizacionId],
    queryFn: alertasApi.resumenGestion,
    enabled: esOwner && organizacionId > 0,
    refetchInterval: 120000,
  });

  const actualizarConsultas = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['alertas-gestion', organizacionId] }),
      queryClient.invalidateQueries({ queryKey: ['alertas-gestion-resumen', organizacionId] }),
    ]);
  };
  const marcarLeida = useMutation({
    mutationFn: alertasApi.marcarGestionLeida,
    onSuccess: actualizarConsultas,
  });
  const revisar = useMutation({
    mutationFn: alertasApi.revisarGestion,
    onSuccess: actualizarConsultas,
  });

  if (!esOwner) {
    return (
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Eye className="mx-auto h-9 w-9 text-slate-400" />
        <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Centro de alertas del establecimiento</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          El historial y la gestión de alertas quedan disponibles para el propietario. Tus alertas operativas relacionadas con los campos asignados siguen apareciendo en el dashboard.
        </p>
      </section>
    );
  }

  const alertas = alertasQuery.data ?? [];
  const resumen = resumenQuery.data;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-emerald-800 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">
              <BellRing size={14} /> Centro de alertas
            </span>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">Priorizá lo que necesita atención</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Las alertas se actualizan con la información del establecimiento. Marcarlas como leídas o revisadas no elimina la condición: se resuelven automáticamente cuando corresponde.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              void actualizarConsultas();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            <RefreshCw size={16} className={alertasQuery.isFetching || resumenQuery.isFetching ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
            <p className="text-xs font-medium text-slate-300">Pendientes de atención</p>
            <p className="mt-1 text-2xl font-extrabold">{resumen?.total ?? '—'}</p>
          </div>
          <div className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-4 py-3">
            <p className="text-xs font-medium text-rose-100">Prioritarias</p>
            <p className="mt-1 text-2xl font-extrabold text-rose-100">{resumen?.prioritarias ?? '—'}</p>
          </div>
          <div className="rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-3">
            <p className="text-xs font-medium text-amber-100">Sin leer</p>
            <p className="mt-1 text-2xl font-extrabold text-amber-100">{resumen?.sinLeer ?? '—'}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Historial de alertas</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Filtrá por estado y prioridad para encontrar rápidamente lo importante.</p>
          </div>
          <select
            value={severidad}
            onChange={(event) => setSeveridad(event.target.value as SeveridadAlertaGestion | '')}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-950"
          >
            <option value="">Todas las prioridades</option>
            <option value="PRIORITARIA">Prioritarias</option>
            <option value="ATENCION">Atención</option>
            <option value="INFORMATIVA">Informativas</option>
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {ESTADOS.map((opcion) => (
            <button
              key={opcion.valor}
              type="button"
              onClick={() => setEstado(opcion.valor)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                estado === opcion.valor
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>
      </section>

      {alertasQuery.isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">Cargando alertas…</div>
      ) : alertasQuery.isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">No se pudieron cargar las alertas. Intentá actualizar nuevamente.</div>
      ) : alertas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <Inbox className="mx-auto h-10 w-10 text-emerald-500" />
          <h2 className="mt-3 font-bold text-slate-900 dark:text-white">No hay alertas en este filtro</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Cuando aparezca una condición que requiera seguimiento, la vas a ver acá.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alertas.map((alerta) => {
            const uiSeveridad = severidadUi[alerta.severidad];
            return (
              <article key={alerta.id} className={`rounded-2xl border p-5 shadow-sm transition ${alerta.leida ? 'bg-white dark:bg-slate-900' : 'bg-white ring-1 ring-emerald-100 dark:bg-slate-900 dark:ring-emerald-950'} dark:border-slate-800`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 gap-3">
                    <span className={`mt-0.5 rounded-xl p-2.5 ${uiSeveridad.icono}`}>
                      <AlertTriangle size={19} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-slate-900 dark:text-white">{alerta.titulo}</h2>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${uiSeveridad.clase}`}>{uiSeveridad.etiqueta}</span>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${estadoUi[alerta.estado]}`}>{alerta.estado.toLowerCase()}</span>
                        {!alerta.leida && <span className="h-2 w-2 rounded-full bg-emerald-500" title="Sin leer" />}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{alerta.mensaje}</p>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><Clock3 size={13} /> Detectada: {fechaHora(alerta.detectadaEn)}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                    {!alerta.leida && (
                      <button
                        type="button"
                        onClick={() => marcarLeida.mutate(alerta.id)}
                        disabled={marcarLeida.isPending}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Check size={15} /> Marcar leída
                      </button>
                    )}
                    {alerta.estado === 'ACTIVA' && (
                      <button
                        type="button"
                        onClick={() => revisar.mutate(alerta.id)}
                        disabled={revisar.isPending}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-100 disabled:opacity-50 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-100"
                      >
                        <CheckCheck size={15} /> Marcar revisada
                      </button>
                    )}
                    <Link
                      to={alerta.enlace}
                      onClick={() => {
                        if (!alerta.leida) marcarLeida.mutate(alerta.id);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
                    >
                      Ver detalle <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        <CircleAlert size={16} className="mt-0.5 shrink-0" />
        Las alertas resueltas se conservan como historial. Si la condición vuelve a aparecer, se abre un nuevo ciclo y se notifica nuevamente.
      </p>
    </div>
  );
}
