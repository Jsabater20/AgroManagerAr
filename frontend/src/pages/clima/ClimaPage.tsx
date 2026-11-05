import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  CloudRain,
  CloudSun,
  Droplets,
  Edit3,
  Gauge,
  Loader2,
  MapPin,
  Plus,
  RefreshCw,
  Thermometer,
  Wind,
} from 'lucide-react';
import { camposApi } from '../../api/campos.api';
import {
  climaApi,
  type ActualizarRegistroPrecipitacion,
  type CrearRegistroPrecipitacion,
  type RegistroPrecipitacion,
  type RespuestaPronostico,
} from '../../api/clima.api';
import type { Campo } from '../../api/types';
import { useAuthStore } from '../../store/auth.store';

const hoy = () => new Date().toISOString().slice(0, 10);

export function wmoInfo(codigo: number | null | undefined): { label: string; emoji: string } {
  if (codigo === 0) return { label: 'Despejado', emoji: '☀️' };
  if (codigo === 1) return { label: 'Mayormente despejado', emoji: '🌤️' };
  if (codigo === 2) return { label: 'Parcialmente nublado', emoji: '⛅' };
  if (codigo === 3) return { label: 'Nublado', emoji: '☁️' };
  if (codigo === 45 || codigo === 48) return { label: 'Niebla', emoji: '🌫️' };
  if (codigo !== undefined && codigo !== null && codigo >= 51 && codigo <= 55) return { label: 'Llovizna', emoji: '🌦️' };
  if (codigo !== undefined && codigo !== null && codigo >= 61 && codigo <= 65) return { label: 'Lluvia', emoji: '🌧️' };
  if (codigo !== undefined && codigo !== null && codigo >= 71 && codigo <= 77) return { label: 'Nieve o granizo fino', emoji: '🌨️' };
  if (codigo !== undefined && codigo !== null && codigo >= 80 && codigo <= 82) return { label: 'Chubascos', emoji: '🌦️' };
  if (codigo === 85 || codigo === 86) return { label: 'Nevadas', emoji: '🌨️' };
  if (codigo !== undefined && codigo !== null && codigo >= 95) return { label: 'Tormenta', emoji: '⛈️' };
  return { label: 'Condiciones variables', emoji: '🌤️' };
}

const fechaCorta = (fecha: string) => new Intl.DateTimeFormat('es-AR', {
  day: '2-digit', month: 'short',
}).format(new Date(`${fecha.slice(0, 10)}T12:00:00`));

const fechaCompleta = (fecha: string) => new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'medium',
}).format(new Date(`${fecha.slice(0, 10)}T12:00:00`));

const fechaHora = (fecha?: string) => fecha
  ? new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(fecha))
  : null;

const numero = (valor: number | null | undefined, unidad = '', decimales = 0) =>
  valor === null || valor === undefined ? '—' : `${Number(valor).toFixed(decimales)}${unidad}`;

const mensajeError = (error: any, alternativa: string) => {
  const mensaje = error?.response?.data?.message;
  return Array.isArray(mensaje) ? mensaje[0] : mensaje || error?.message || alternativa;
};

type FormularioLluvia = {
  fecha: string;
  milimetros: string;
  observaciones: string;
  loteId: string;
};

const formularioInicial = (): FormularioLluvia => ({
  fecha: hoy(),
  milimetros: '',
  observaciones: '',
  loteId: '',
});

export default function ClimaPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const [searchParams] = useSearchParams();
  const organizacionId = Number(orgId);
  const usuario = useAuthStore((state) => state.usuario);
  const queryClient = useQueryClient();
  const [campoId, setCampoId] = useState<number | null>(null);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [registroEnEdicion, setRegistroEnEdicion] = useState<RegistroPrecipitacion | null>(null);
  const [formulario, setFormulario] = useState<FormularioLluvia>(formularioInicial);

  useEffect(() => {
    const campoDesdeEnlace = Number(searchParams.get('campoId'));
    setCampoId(Number.isInteger(campoDesdeEnlace) && campoDesdeEnlace > 0 ? campoDesdeEnlace : null);
  }, [searchParams]);

  const camposQuery = useQuery<Campo[]>({
    queryKey: ['campos', organizacionId, 'clima'],
    queryFn: () => camposApi.getAll(),
    enabled: organizacionId > 0,
  });
  const campos = camposQuery.data ?? [];
  const campoSeleccionadoId = campoId ?? campos[0]?.id ?? null;
  const campoSeleccionado = campos.find((campo) => campo.id === campoSeleccionadoId) ?? null;

  const pronosticoQuery = useQuery({
    queryKey: ['clima', 'pronostico', organizacionId, campoSeleccionadoId],
    queryFn: () => climaApi.obtenerPronostico(organizacionId, campoSeleccionadoId as number),
    enabled: organizacionId > 0 && campoSeleccionadoId !== null,
    retry: false,
  });
  const precipitacionesQuery = useQuery({
    queryKey: ['clima', 'precipitaciones', organizacionId, campoSeleccionadoId],
    queryFn: () => climaApi.listarPrecipitaciones(organizacionId, campoSeleccionadoId as number),
    enabled: organizacionId > 0 && campoSeleccionadoId !== null,
    retry: false,
  });
  const resumenQuery = useQuery({
    queryKey: ['clima', 'resumen-precipitaciones', organizacionId, campoSeleccionadoId],
    queryFn: () => climaApi.resumenPrecipitaciones(organizacionId, campoSeleccionadoId as number),
    enabled: organizacionId > 0 && campoSeleccionadoId !== null,
    retry: false,
  });

  const actualizarDatos = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['clima', 'pronostico', organizacionId, campoSeleccionadoId] }),
      queryClient.invalidateQueries({ queryKey: ['clima', 'precipitaciones', organizacionId, campoSeleccionadoId] }),
      queryClient.invalidateQueries({ queryKey: ['clima', 'resumen-precipitaciones', organizacionId, campoSeleccionadoId] }),
    ]);
  };

  const guardarLluvia = useMutation({
    mutationFn: async () => {
      if (!campoSeleccionadoId) throw new Error('Elegí un campo para registrar la lluvia.');
      const milimetros = Number(formulario.milimetros);
      if (!Number.isFinite(milimetros) || milimetros < 0) {
        throw new Error('Ingresá una cantidad válida de milímetros.');
      }
      if (registroEnEdicion) {
        const datos: ActualizarRegistroPrecipitacion = {
          fecha: formulario.fecha,
          milimetros,
          observaciones: formulario.observaciones.trim() || undefined,
        };
        return climaApi.actualizarPrecipitacion(organizacionId, registroEnEdicion.id, datos);
      }
      const datos: CrearRegistroPrecipitacion = {
        campoId: campoSeleccionadoId,
        ...(formulario.loteId ? { loteId: Number(formulario.loteId) } : {}),
        fecha: formulario.fecha,
        milimetros,
        observaciones: formulario.observaciones.trim() || undefined,
      };
      return climaApi.crearPrecipitacion(organizacionId, datos);
    },
    onSuccess: async () => {
      toast.success(registroEnEdicion ? 'Registro de lluvia corregido.' : 'Lluvia registrada.');
      setFormularioAbierto(false);
      setRegistroEnEdicion(null);
      setFormulario(formularioInicial());
      await actualizarDatos();
    },
    onError: (error) => toast.error(mensajeError(error, 'No se pudo guardar el registro de lluvia.')),
  });

  const esOwner = useMemo(() => usuario?.organizaciones?.some(
    (organizacion) => organizacion.id === organizacionId && organizacion.propietarioId === usuario.id,
  ) ?? false, [organizacionId, usuario]);

  const abrirNuevoRegistro = () => {
    setRegistroEnEdicion(null);
    setFormulario(formularioInicial());
    setFormularioAbierto(true);
  };
  const abrirEdicion = (registro: RegistroPrecipitacion) => {
    setRegistroEnEdicion(registro);
    setFormulario({
      fecha: registro.fecha.slice(0, 10),
      milimetros: String(registro.milimetros),
      observaciones: registro.observaciones ?? '',
      loteId: registro.loteId ? String(registro.loteId) : '',
    });
    setFormularioAbierto(true);
  };

  if (camposQuery.isLoading) return <LoadingPage />;

  if (camposQuery.isError) {
    return <Notice title="No se pudieron cargar los campos" description="Intentá actualizar la página. Si el problema continúa, verificá tu conexión." />;
  }

  if (campos.length === 0) {
    return (
      <Notice
        title="Primero registrá un campo"
        description="El clima y las lluvias se consultan por establecimiento para que la información sea útil y no genérica."
        action={{ to: `/org/${organizacionId}/campos`, label: 'Ir a campos' }}
      />
    );
  }

  const pronostico = pronosticoQuery.data;
  const resumen = resumenQuery.data;
  const registros = precipitacionesQuery.data ?? [];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-950 via-slate-950 to-emerald-950 p-6 text-white shadow-lg dark:border-sky-900/80">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-sky-100">
              <CloudSun size={14} /> AgroManager Clima
            </span>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">Clima y lluvias de tus campos</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              Consultá el pronóstico de cada establecimiento y guardá las lluvias reales para tomar decisiones con información propia.
            </p>
          </div>
          <div className="w-full max-w-md">
            <label htmlFor="campo-clima" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-sky-100">Establecimiento</label>
            <select
              id="campo-clima"
              value={campoSeleccionadoId ?? ''}
              onChange={(event) => setCampoId(Number(event.target.value))}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30"
            >
              {campos.map((campo) => <option key={campo.id} value={campo.id}>{campo.nombre}</option>)}
            </select>
          </div>
        </div>
      </section>

      <ForecastPanel
        respuesta={pronostico}
        cargando={pronosticoQuery.isLoading}
        error={pronosticoQuery.isError}
        campo={campoSeleccionado}
        alActualizar={() => void pronosticoQuery.refetch()}
        organizacionId={organizacionId}
      />

      <AutomaticRainPanel respuesta={pronostico} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-950 dark:text-sky-200"><Droplets size={18} /></span>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">Lluvias medidas en el campo</h2>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Datos reales cargados por el equipo de {campoSeleccionado?.nombre}. No se mezclan con la estimación automática.</p>
            </div>
          </div>
          <button type="button" onClick={abrirNuevoRegistro} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800">
            <Plus size={16} /> Registrar lluvia medida
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <RainMetric label="Últimos 7 días" value={resumen?.semanaMm} />
          <RainMetric label="Este mes" value={resumen?.mesMm} />
          <RainMetric label="Este año" value={resumen?.anioMm} />
        </div>

        <div className="mt-6">
          {precipitacionesQuery.isLoading ? <RainListSkeleton /> : precipitacionesQuery.isError ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200">No se pudieron cargar los registros de lluvia.</div>
          ) : registros.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center dark:border-slate-700 dark:bg-slate-950/40">
              <CloudRain className="mx-auto h-9 w-9 text-sky-500" />
              <h3 className="mt-3 font-bold text-slate-900 dark:text-white">Todavía no hay mediciones de lluvia</h3>
              <p className="mx-auto mt-1 max-w-lg text-sm text-slate-500 dark:text-slate-400">Cuando llueva, cargá la cantidad medida para construir el historial hídrico real de este campo.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
              {registros.map((registro) => {
                const puedeCorregir = esOwner || registro.usuarioId === usuario?.id;
                return (
                  <article key={registro.id} className="flex flex-col gap-3 border-b border-slate-100 p-4 last:border-0 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="rounded-xl bg-sky-100 p-2.5 text-sky-700 dark:bg-sky-950 dark:text-sky-200"><CloudRain size={18} /></span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900 dark:text-white">{fechaCompleta(registro.fecha)}</h3>
                          {registro.lote && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{registro.lote.nombre}</span>}
                          {registro.corregidoEn && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">Corregido</span>}
                        </div>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {registro.observaciones || 'Sin observaciones'}
                          {registro.usuario && <> · Cargado por {registro.usuario.nombre} {registro.usuario.apellido}</>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-xl font-extrabold text-sky-700 dark:text-sky-300">{Number(registro.milimetros).toLocaleString('es-AR', { maximumFractionDigits: 1 })} mm</span>
                      {puedeCorregir && <button type="button" onClick={() => abrirEdicion(registro)} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-sky-950/40 dark:hover:text-sky-200" title="Corregir registro"><Edit3 size={16} /></button>}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {formularioAbierto && campoSeleccionado && (
        <RainDialog
          campo={campoSeleccionado}
          editar={Boolean(registroEnEdicion)}
          formulario={formulario}
          guardando={guardarLluvia.isPending}
          onChange={setFormulario}
          onClose={() => { if (!guardarLluvia.isPending) setFormularioAbierto(false); }}
          onSubmit={(event) => { event.preventDefault(); guardarLluvia.mutate(); }}
        />
      )}
    </div>
  );
}

function ForecastPanel({
  respuesta, cargando, error, campo, alActualizar, organizacionId,
}: {
  respuesta?: RespuestaPronostico;
  cargando: boolean;
  error: boolean;
  campo: Campo | null;
  alActualizar: () => void;
  organizacionId: number;
}) {
  if (cargando) return <div className="h-72 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />;
  if (error) return <Notice title="No se pudo consultar el pronóstico" description="Intentá actualizar nuevamente. Los registros de lluvia siguen disponibles más abajo." action={{ label: 'Reintentar', onClick: alActualizar }} />;
  if (!respuesta) return null;

  if (respuesta.estado === 'UBICACION_PENDIENTE') {
    return <Notice title="Falta ubicar este campo" description="Agregá coordenadas GPS al establecimiento para recibir un pronóstico específico para esa zona." action={{ to: `/org/${organizacionId}/campos/${campo?.id}`, label: 'Completar ubicación' }} />;
  }
  if (!respuesta.datos) {
    return (
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/25 dark:text-amber-100">
        <div className="flex gap-3">
          <CloudSun className="mt-0.5 shrink-0" size={22} />
          <div>
            <h2 className="font-bold">Pronóstico temporalmente no disponible</h2>
            <p className="mt-1 text-sm leading-relaxed">{respuesta.mensaje || 'No pudimos actualizar el pronóstico de este campo por el momento.'}</p>
            <button type="button" onClick={alActualizar} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white/60 px-3 py-2 text-sm font-bold transition hover:bg-white dark:border-amber-800 dark:bg-amber-950/30 dark:hover:bg-amber-950/60"><RefreshCw size={15} /> Reintentar</button>
          </div>
        </div>
      </section>
    );
  }

  const { actual, diario } = respuesta.datos;
  const condicion = wmoInfo(actual?.codigoMeteorologico);
  return (
    <section className="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm dark:border-sky-900/70 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500 p-5 text-white sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className="text-5xl sm:text-6xl">{condicion.emoji}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-sky-100"><MapPin size={14} /><span>{respuesta.campo.nombre}{respuesta.campo.localidad ? ` · ${respuesta.campo.localidad}` : respuesta.campo.ubicacion ? ` · ${respuesta.campo.ubicacion}` : ''}</span></div>
              <div className="mt-2 flex items-end gap-3">
                <span className="text-5xl font-extrabold tracking-tight">{numero(actual?.temperaturaC, '°')}</span>
                <div className="pb-1"><p className="font-bold">{condicion.label}</p><p className="text-sm text-sky-100">Sensación {numero(actual?.sensacionTermicaC, '°')}</p></div>
              </div>
            </div>
          </div>
          <button type="button" onClick={alActualizar} className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm font-bold transition hover:bg-white/20 lg:self-auto"><RefreshCw size={16} /> Actualizar</button>
        </div>
        {respuesta.estado === 'DESACTUALIZADO' && <p className="mt-4 rounded-lg border border-amber-200/40 bg-amber-950/15 px-3 py-2 text-xs font-medium text-amber-50">Usamos el último pronóstico disponible. Verificá la hora de actualización antes de tomar decisiones.</p>}
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <WeatherMetric icon={Thermometer} label="Temperatura" value={numero(actual?.temperaturaC, '°')} detail={`Sensación ${numero(actual?.sensacionTermicaC, '°')}`} />
        <WeatherMetric icon={Droplets} label="Humedad" value={numero(actual?.humedadRelativa, '%')} detail="Humedad relativa" />
        <WeatherMetric icon={Wind} label="Viento" value={numero(actual?.vientoKmh, ' km/h')} detail={actual?.rafagasKmh === null || actual?.rafagasKmh === undefined ? 'Sin dato de ráfagas' : `Ráfagas ${numero(actual.rafagasKmh, ' km/h')}`} />
        <WeatherMetric icon={CloudRain} label="Precipitación actual" value={numero(actual?.precipitacionMm, ' mm', 1)} detail="Según el proveedor" />
      </div>

      <div className="border-t border-slate-100 p-5 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3"><div><h2 className="font-bold text-slate-900 dark:text-white">Pronóstico de {diario.length} días</h2><p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Máxima, mínima y precipitación esperada.</p></div><Gauge className="text-sky-600 dark:text-sky-300" size={21} /></div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
          {diario.map((dia, indice) => {
            const info = wmoInfo(dia.codigoMeteorologico);
            return <article key={dia.fecha} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950/50"><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{indice === 0 ? 'Hoy' : fechaCorta(dia.fecha)}</p><p className="mt-2 text-2xl">{info.emoji}</p><p className="mt-2 text-sm font-extrabold text-slate-900 dark:text-white">{numero(dia.temperaturaMaxC, '°')}</p><p className="text-xs text-slate-500 dark:text-slate-400">mín. {numero(dia.temperaturaMinC, '°')}</p><p className="mt-2 text-xs font-semibold text-sky-700 dark:text-sky-300">{numero(dia.precipitacionMm, ' mm', 1)}</p>{dia.probabilidadPrecipitacionMax !== null && <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{dia.probabilidadPrecipitacionMax}% prob.</p>}</article>;
          })}
        </div>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{respuesta.datos.atribucion}{respuesta.obtenidoEn ? ` Actualizado ${fechaHora(respuesta.obtenidoEn)}.` : ''}</p>
      </div>
    </section>
  );
}

function AutomaticRainPanel({ respuesta }: { respuesta?: RespuestaPronostico }) {
  const datos = respuesta?.datos;
  if (!respuesta || !datos?.diario.length) return null;

  const localidad = respuesta.campo.localidad ?? respuesta.campo.ubicacion ?? respuesta.campo.nombre;
  const dias = datos.diario.slice(0, 3);

  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 shadow-sm dark:border-cyan-900/70 dark:from-cyan-950/20 dark:via-slate-900 dark:to-sky-950/20 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-cyan-100 p-2.5 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200"><CloudRain size={20} /></span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-bold text-slate-900 dark:text-white">Lluvia automática</h2>
              <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-[11px] font-bold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">WeatherAPI</span>
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Estimación meteorológica para {localidad}. Se actualiza automáticamente; no reemplaza la medición real del campo.</p>
          </div>
        </div>
        {respuesta?.obtenidoEn && <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Actualizado {fechaHora(respuesta.obtenidoEn)}</p>}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {dias.map((dia, indice) => (
          <article key={dia.fecha} className="rounded-xl border border-cyan-100 bg-white/90 p-4 dark:border-cyan-900/70 dark:bg-slate-950/50">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{indice === 0 ? 'Hoy' : fechaCorta(dia.fecha)}</p>
            <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">{numero(dia.precipitacionMm, ' mm', 1)}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Precipitación estimada{dia.probabilidadPrecipitacionMax === null ? '' : ` · ${dia.probabilidadPrecipitacionMax}% de prob.`}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RainDialog({ campo, editar, formulario, guardando, onChange, onClose, onSubmit }: {
  campo: Campo;
  editar: boolean;
  formulario: FormularioLluvia;
  guardando: boolean;
  onChange: (formulario: FormularioLluvia) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4" onClick={onClose}><div className="mx-auto my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900" onClick={(event) => event.stopPropagation()}><div className="flex items-start gap-3"><span className="rounded-xl bg-sky-100 p-2.5 text-sky-700 dark:bg-sky-950 dark:text-sky-200"><CloudRain size={20} /></span><div><h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{editar ? 'Corregir registro de lluvia' : 'Registrar lluvia'}</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{campo.nombre}. Guardamos quién realizó cada carga.</p></div></div><form className="mt-6 space-y-4" onSubmit={onSubmit}><div className="grid gap-4 sm:grid-cols-2"><Field label="Fecha *"><input required type="date" value={formulario.fecha} onChange={(event) => onChange({ ...formulario, fecha: event.target.value })} className="input" /></Field><Field label="Milímetros *"><input required type="number" min="0" max="2000" step="0.1" inputMode="decimal" value={formulario.milimetros} onChange={(event) => onChange({ ...formulario, milimetros: event.target.value })} className="input" placeholder="Ej: 18.5" /></Field>{!editar && <Field label="Lote (opcional)"><select value={formulario.loteId} onChange={(event) => onChange({ ...formulario, loteId: event.target.value })} className="input"><option value="">Todo el campo</option>{(campo.lotes ?? []).map((lote) => <option key={lote.id} value={lote.id}>{lote.nombre}</option>)}</select></Field>}</div><Field label="Observaciones (opcional)"><textarea value={formulario.observaciones} maxLength={1000} rows={3} onChange={(event) => onChange({ ...formulario, observaciones: event.target.value })} className="input resize-none" placeholder="Ej: Lluvia pareja, medida en pluviómetro del casco." /></Field><div className="flex justify-end gap-3 pt-2"><button type="button" disabled={guardando} onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-60 dark:text-slate-300 dark:hover:bg-slate-800">Cancelar</button><button disabled={guardando} className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800 disabled:opacity-60">{guardando && <Loader2 size={16} className="animate-spin" />}{editar ? 'Guardar corrección' : 'Guardar lluvia'}</button></div></form></div></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">{label}</span>{children}</label>; }

function WeatherMetric({ icon: Icon, label, value, detail }: { icon: typeof Thermometer; label: string; value: string; detail: string }) { return <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50"><div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Icon size={16} className="text-sky-600 dark:text-sky-300" /><span className="text-xs font-bold">{label}</span></div><p className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{detail}</p></article>; }

function RainMetric({ label, value }: { label: string; value: number | undefined }) { return <article className="rounded-xl border border-sky-100 bg-sky-50/70 p-4 dark:border-sky-950 dark:bg-sky-950/20"><p className="text-xs font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300">{label}</p><p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">{value === undefined ? '—' : value.toLocaleString('es-AR', { maximumFractionDigits: 1 })} <span className="text-sm">mm</span></p></article>; }

function Notice({ title, description, action }: { title: string; description: string; action?: { label: string; to?: string; onClick?: () => void } }) { const contenido = action && (action.to ? <Link to={action.to} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800">{action.label}</Link> : <button type="button" onClick={action.onClick} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800">{action.label}</button>); return <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"><CloudSun className="mx-auto h-10 w-10 text-sky-500" /><h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">{title}</h1><p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>{contenido}</section>; }

function LoadingPage() { return <div className="space-y-6"><div className="h-44 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" /><div className="h-72 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" /><div className="h-56 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" /></div>; }

function RainListSkeleton() { return <div className="space-y-2">{[1, 2, 3].map((item) => <div key={item} className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />)}</div>; }
