import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Download, Mail, MessageCircle, Search, X } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  agroManagerDigitalApi,
  type EstadoSolicitudDigital,
  type SolicitudAgroManagerDigital,
} from '../../api/agromanager-digital.api';
import { useAuthStore } from '../../store/auth.store';

const estados: Array<{ value: EstadoSolicitudDigital; label: string }> = [
  { value: 'NUEVA', label: 'Nueva' },
  { value: 'CONTACTADO', label: 'Contactado' },
  { value: 'EN_EVALUACION', label: 'En evaluación' },
  { value: 'PRESUPUESTO_ENVIADO', label: 'Presupuesto enviado' },
  { value: 'EN_NEGOCIACION', label: 'En negociación' },
  { value: 'PROYECTO_CONFIRMADO', label: 'Proyecto confirmado' },
  { value: 'EN_DESARROLLO', label: 'En desarrollo' },
  { value: 'FINALIZADO', label: 'Finalizado' },
  { value: 'ARCHIVADO', label: 'Archivado' },
];

const estadoLabel = Object.fromEntries(estados.map(({ value, label }) => [value, label])) as Record<EstadoSolicitudDigital, string>;
const estadoColor: Record<EstadoSolicitudDigital, string> = {
  NUEVA: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200',
  CONTACTADO: 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200',
  EN_EVALUACION: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  PRESUPUESTO_ENVIADO: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200',
  EN_NEGOCIACION: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200',
  PROYECTO_CONFIRMADO: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  EN_DESARROLLO: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200',
  FINALIZADO: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
  ARCHIVADO: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
};

const fechaHora = (value: string) => new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'medium',
  timeStyle: 'short',
}).format(new Date(value));

const csvCelda = (valor: unknown) => {
  const texto = String(valor ?? '').replace(/[\r\n]+/g, ' ').trim();
  const seguro = /^[=+\-@\t]/.test(texto) ? `'${texto}` : texto;
  return `"${seguro.replace(/"/g, '""')}"`;
};

const descargarCsv = (solicitudes: SolicitudAgroManagerDigital[]) => {
  const columnas: Array<[string, (solicitud: SolicitudAgroManagerDigital) => unknown]> = [
    ['ID', (s) => s.id], ['Fecha de recepción', (s) => fechaHora(s.createdAt)], ['Estado', (s) => estadoLabel[s.estado]],
    ['Nombre', (s) => s.nombre], ['Establecimiento', (s) => s.establecimiento], ['Email', (s) => s.email],
    ['Teléfono', (s) => s.telefono], ['Provincia', (s) => s.provincia], ['Localidad', (s) => s.localidad],
    ['Tipo de proyecto', (s) => s.tipoProyecto], ['Actividad', (s) => s.actividad], ['Servicio solicitado', (s) => s.servicio], ['Tiene sitio web', (s) => s.tieneSitioWeb ? 'Sí' : 'No'],
    ['Información que quiere publicar', (s) => s.informacionPublicar.join(', ')], ['Necesita catálogo', (s) => s.requiereCatalogo ? 'Sí' : 'No'],
    ['Administra contenido', (s) => s.administraContenido ? 'Sí' : 'No'], ['Tiene logo/identidad', (s) => s.tieneIdentidadVisual ? 'Sí' : 'No'],
    ['Tiene dominio', (s) => s.tieneDominioPropio ? 'Sí' : 'No'], ['Necesita mantenimiento', (s) => s.requiereMantenimiento ? 'Sí' : 'No'],
    ['Página de referencia', (s) => s.referenciaUrl], ['Funciones personalizadas', (s) => s.funcionalidadesPersonalizadas],
    ['Descripción', (s) => s.descripcion], ['Presupuesto estimado', (s) => s.presupuesto], ['Fecha deseada', (s) => s.fechaInicio],
    ['Comentarios', (s) => s.comentarios], ['Presupuesto enviado', (s) => s.presupuestoEnviado],
    ['Notas internas', (s) => s.observacionesInternas],
    ['Historial', (s) => s.seguimientos.map((item) => `${fechaHora(item.createdAt)} - ${item.administrador}: ${item.detalle}`).join(' | ')],
  ];
  const contenido = [columnas.map(([titulo]) => csvCelda(titulo)).join(';'), ...solicitudes.map((s) => columnas.map(([, valor]) => csvCelda(valor(s))).join(';'))].join('\r\n');
  const archivo = new Blob([`\uFEFF${contenido}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `consultas-agromanager-digital-${new Date().toISOString().slice(0, 10)}.csv`;
  enlace.click();
  URL.revokeObjectURL(url);
};

export default function AdminDigitalPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const queryClient = useQueryClient();
  const [buscar, setBuscar] = useState('');
  const [consulta, setConsulta] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoSolicitudDigital | ''>('');
  const [seleccionadaId, setSeleccionadaId] = useState<number | null>(null);
  const [notaInterna, setNotaInterna] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [seguimiento, setSeguimiento] = useState('');

  useEffect(() => {
    const timeout = window.setTimeout(() => setConsulta(buscar.trim()), 300);
    return () => window.clearTimeout(timeout);
  }, [buscar]);

  const solicitudesQuery = useQuery({
    queryKey: ['admin-agromanager-digital', consulta, estadoFiltro],
    queryFn: () => agroManagerDigitalApi.listar(consulta || undefined, estadoFiltro || undefined),
  });
  const analiticaQuery = useQuery({
    queryKey: ['admin-agromanager-digital-analitica'],
    queryFn: agroManagerDigitalApi.analitica,
  });

  const actualizarMutation = useMutation({
    mutationFn: ({ id, datos }: { id: number; datos: Parameters<typeof agroManagerDigitalApi.actualizar>[1] }) =>
      agroManagerDigitalApi.actualizar(id, datos),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-agromanager-digital'] });
      toast.success('Consulta actualizada.');
      setSeguimiento('');
    },
    onError: () => toast.error('No se pudo actualizar la consulta.'),
  });

  const exportarMutation = useMutation({
    mutationFn: () => agroManagerDigitalApi.exportar(consulta || undefined, estadoFiltro || undefined),
    onSuccess: (solicitudes) => {
      descargarCsv(solicitudes);
      toast.success(`Se exportaron ${solicitudes.length} consultas.`);
    },
    onError: () => toast.error('No se pudieron exportar las consultas.'),
  });

  if (usuario?.rolGlobal !== 'SUPERADMIN') return <Navigate to="/" replace />;

  const data = solicitudesQuery.data;
  const seleccionada = data?.items.find((solicitud) => solicitud.id === seleccionadaId) ?? null;
  const abrirSolicitud = (solicitud: SolicitudAgroManagerDigital) => {
    setSeleccionadaId(solicitud.id);
    setNotaInterna(solicitud.observacionesInternas ?? '');
    setPresupuesto(solicitud.presupuestoEnviado ?? '');
    setSeguimiento('');
  };

  const guardarFicha = () => {
    if (!seleccionada) return;
    actualizarMutation.mutate({
      id: seleccionada.id,
      datos: {
        observacionesInternas: notaInterna.trim() || null,
        presupuestoEnviado: presupuesto.trim() || null,
        ...(seguimiento.trim() ? { seguimiento: seguimiento.trim() } : {}),
      },
    });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div>
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
          <ArrowLeft size={16} /> Panel general
        </Link>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Administración comercial</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">AgroManager Digital</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">Revisá consultas, registrá el avance y tené a mano los datos para responder cada propuesta.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            Consultas recibidas: <strong className="text-slate-900 dark:text-white">{data?.total ?? 0}</strong>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Resumen etiqueta="Nuevas" cantidad={data?.resumen.NUEVA ?? 0} />
        <Resumen etiqueta="En evaluación" cantidad={data?.resumen.EN_EVALUACION ?? 0} />
        <Resumen etiqueta="Presupuesto enviado" cantidad={data?.resumen.PRESUPUESTO_ENVIADO ?? 0} />
        <Resumen etiqueta="Proyecto confirmado" cantidad={data?.resumen.PROYECTO_CONFIRMADO ?? 0} />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div><h2 className="font-bold text-slate-900 dark:text-white">Actividad de la página</h2><p className="mt-1 text-xs text-slate-500">Datos de los últimos 30 días; no se copian datos del formulario ni se guardan direcciones IP.</p></div>
          {analiticaQuery.data && <span className="text-xs text-slate-500">Desde {new Intl.DateTimeFormat('es-AR').format(new Date(analiticaQuery.data.desde))}</span>}
        </div>
        {analiticaQuery.isError ? <p className="mt-4 text-sm text-rose-700 dark:text-rose-300">No se pudo cargar la analítica.</p> : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Metrica etiqueta="Visitas" cantidad={analiticaQuery.data?.visitas ?? 0} />
            <Metrica etiqueta="Clics en presupuesto" cantidad={analiticaQuery.data?.clicsPresupuesto ?? 0} />
            <Metrica etiqueta="Clics en WhatsApp" cantidad={analiticaQuery.data?.clicsWhatsApp ?? 0} />
            <Metrica etiqueta="Formularios iniciados" cantidad={analiticaQuery.data?.formulariosIniciados ?? 0} />
            <Metrica etiqueta="Consultas enviadas" cantidad={analiticaQuery.data?.solicitudesEnviadas ?? 0} />
          </div>
        )}
        {Boolean(analiticaQuery.data?.origenes.length) && <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">Orígenes: {analiticaQuery.data?.origenes.map((origen) => `${origen.nombre} (${origen.cantidad})`).join(' · ')}</p>}
        {Boolean(analiticaQuery.data?.medios.length) && <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">Medios: {analiticaQuery.data?.medios.map((medio) => `${medio.nombre} (${medio.cantidad})`).join(' · ')}</p>}
        {Boolean(analiticaQuery.data?.campanias.length) && <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">Campañas: {analiticaQuery.data?.campanias.map((campania) => `${campania.nombre} (${campania.cantidad})`).join(' · ')}</p>}
      </section>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input value={buscar} onChange={(event) => setBuscar(event.target.value)} placeholder="Buscar por nombre, establecimiento, email o teléfono" className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white" />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select value={estadoFiltro} onChange={(event) => setEstadoFiltro(event.target.value as EstadoSolicitudDigital | '')} className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
            <option value="">Todos los estados</option>
            {estados.map((estado) => <option key={estado.value} value={estado.value}>{estado.label}</option>)}
          </select>
          <button type="button" onClick={() => exportarMutation.mutate()} disabled={exportarMutation.isPending || solicitudesQuery.isLoading} className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100 disabled:cursor-wait disabled:opacity-60 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 dark:hover:bg-emerald-900">
            <Download size={16} /> {exportarMutation.isPending ? 'Preparando...' : 'Exportar CSV'}
          </button>
        </div>
      </div>

      {solicitudesQuery.isLoading ? (
        <Estado mensaje="Cargando consultas..." />
      ) : solicitudesQuery.isError ? (
        <Estado mensaje="No se pudieron cargar las consultas. Revisá la conexión e intentá nuevamente." />
      ) : !data?.items.length ? (
        <Estado mensaje="No hay consultas que coincidan con esta búsqueda." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-[850px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <tr><th className="px-5 py-3">Consulta</th><th className="px-5 py-3">Contacto</th><th className="px-5 py-3">Necesita</th><th className="px-5 py-3">Estado</th><th className="px-5 py-3">Recibida</th><th className="px-5 py-3" /></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.items.map((solicitud) => (
                  <tr key={solicitud.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/70">
                    <td className="px-5 py-4"><p className="font-semibold text-slate-900 dark:text-white">{solicitud.establecimiento}</p><p className="mt-1 text-xs text-slate-500">{solicitud.nombre} · {solicitud.localidad}, {solicitud.provincia}</p></td>
                    <td className="px-5 py-4"><a className="text-emerald-700 hover:underline dark:text-emerald-300" href={`mailto:${solicitud.email}`}>{solicitud.email}</a><p className="mt-1 text-xs text-slate-500">{solicitud.telefono}</p></td>
                    <td className="px-5 py-4"><p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">{solicitud.tipoProyecto === 'ESTABLECIMIENTO' ? 'Establecimiento' : 'Actividad comercial/profesional'}</p><p className="mt-1 font-medium text-slate-800 dark:text-slate-200">{solicitud.servicio}</p><p className="mt-1 text-xs text-slate-500">{solicitud.actividad}</p></td>
                    <td className="px-5 py-4"><span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${estadoColor[solicitud.estado]}`}>{estadoLabel[solicitud.estado]}</span></td>
                    <td className="px-5 py-4 text-xs text-slate-500">{fechaHora(solicitud.createdAt)}</td>
                    <td className="px-5 py-4 text-right"><button type="button" onClick={() => abrirSolicitud(solicitud)} className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">Ver consulta</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {seleccionada && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60" onMouseDown={(event) => { if (event.target === event.currentTarget) setSeleccionadaId(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="digital-detail-title" className="h-full w-full max-w-2xl overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Consulta #{seleccionada.id}</p><h2 id="digital-detail-title" className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{seleccionada.establecimiento}</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{seleccionada.nombre}</p></div>
              <button type="button" aria-label="Cerrar consulta" onClick={() => setSeleccionadaId(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={20} /></button>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <a href={`mailto:${seleccionada.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"><Mail size={16} /> Enviar email</a>
              <a href={`https://wa.me/${seleccionada.telefono.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"><MessageCircle size={16} /> Contactar por WhatsApp</a>
            </div>

            <div className="mt-5 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2">
              <Dato etiqueta="Email" valor={seleccionada.email} />
              <Dato etiqueta="Teléfono" valor={seleccionada.telefono} />
              <Dato etiqueta="Ubicación" valor={`${seleccionada.localidad}, ${seleccionada.provincia}`} />
              <Dato etiqueta="Actividad" valor={seleccionada.actividad} />
              <Dato etiqueta="Tipo de proyecto" valor={seleccionada.tipoProyecto === 'ESTABLECIMIENTO' ? 'Página para un establecimiento' : 'Web para actividad profesional o comercial'} />
              <Dato etiqueta="Servicio solicitado" valor={seleccionada.servicio} />
              <Dato etiqueta="Sitio web actual" valor={seleccionada.tieneSitioWeb ? 'Sí' : 'No'} />
              <Dato etiqueta="Información a publicar" valor={seleccionada.informacionPublicar.join(', ') || 'No especificada'} />
              <Dato etiqueta="Catálogo" valor={seleccionada.requiereCatalogo ? 'Sí' : 'No'} />
              <Dato etiqueta="Administrar contenido" valor={seleccionada.administraContenido ? 'Sí' : 'No'} />
              <Dato etiqueta="Logo e identidad visual" valor={seleccionada.tieneIdentidadVisual ? 'Sí' : 'No'} />
              <Dato etiqueta="Dominio propio" valor={seleccionada.tieneDominioPropio ? 'Sí' : 'No'} />
              <Dato etiqueta="Mantenimiento o soporte" valor={seleccionada.requiereMantenimiento ? 'Sí' : 'No'} />
              <Dato etiqueta="Página de referencia" valor={seleccionada.referenciaUrl || 'No informada'} />
              <Dato etiqueta="Presupuesto estimado" valor={seleccionada.presupuesto || 'No informado'} />
              <Dato etiqueta="Fecha deseada" valor={seleccionada.fechaInicio || 'No informada'} />
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Qué necesita</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800 dark:text-slate-200">{seleccionada.descripcion}</p>{seleccionada.comentarios && <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">{seleccionada.comentarios}</p>}</div>
            {seleccionada.funcionalidadesPersonalizadas && <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/40"><p className="text-xs font-bold uppercase tracking-wide text-indigo-800 dark:text-indigo-200">Funciones personalizadas solicitadas</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800 dark:text-slate-200">{seleccionada.funcionalidadesPersonalizadas}</p></div>}

            <label className="mt-5 block text-sm font-semibold text-slate-800 dark:text-slate-100">Avance de la consulta
              <select value={seleccionada.estado} onChange={(event) => actualizarMutation.mutate({ id: seleccionada.id, datos: { estado: event.target.value as EstadoSolicitudDigital } })} disabled={actualizarMutation.isPending} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-900">
                {estados.map((estado) => <option key={estado.value} value={estado.value}>{estado.label}</option>)}
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold text-slate-800 dark:text-slate-100">Presupuesto enviado o propuesta
              <textarea value={presupuesto} onChange={(event) => setPresupuesto(event.target.value)} rows={3} placeholder="Anotá el monto, alcance o condiciones que le compartiste..." className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal dark:border-slate-600 dark:bg-slate-900" />
            </label>
            <label className="mt-4 block text-sm font-semibold text-slate-800 dark:text-slate-100">Nota interna
              <textarea value={notaInterna} onChange={(event) => setNotaInterna(event.target.value)} rows={3} placeholder="Información útil para vos o el equipo comercial..." className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal dark:border-slate-600 dark:bg-slate-900" />
            </label>
            <label className="mt-4 block text-sm font-semibold text-slate-800 dark:text-slate-100">Registrar seguimiento
              <textarea value={seguimiento} onChange={(event) => setSeguimiento(event.target.value)} rows={2} placeholder="Ej.: Hoy hablamos por teléfono y quedamos en enviar una propuesta..." className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal dark:border-slate-600 dark:bg-slate-900" />
            </label>
            <button type="button" onClick={guardarFicha} disabled={actualizarMutation.isPending} className="mt-4 w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-50">{actualizarMutation.isPending ? 'Guardando...' : 'Guardar cambios'}</button>

            <div className="mt-7">
              <h3 className="font-bold text-slate-900 dark:text-white">Historial de seguimiento</h3>
              {!seleccionada.seguimientos.length ? <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900">Todavía no hay seguimientos registrados.</p> : (
                <ol className="mt-3 space-y-3 border-l-2 border-emerald-200 pl-4 dark:border-emerald-900">
                  {seleccionada.seguimientos.map((item) => <li key={item.id} className="relative rounded-xl border border-slate-200 p-3 dark:border-slate-700"><span className="absolute -left-[22px] top-4 h-2.5 w-2.5 rounded-full bg-emerald-600" /><p className="text-sm text-slate-800 dark:text-slate-200">{item.detalle}</p><p className="mt-2 text-xs text-slate-500">{item.administrador} · {fechaHora(item.createdAt)}</p></li>)}
                </ol>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function Resumen({ etiqueta, cantidad }: { etiqueta: string; cantidad: number }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{etiqueta}</p><p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{cantidad}</p></div>;
}

function Metrica({ etiqueta, cantidad }: { etiqueta: string; cantidad: number }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"><p className="text-xs text-slate-500 dark:text-slate-400">{etiqueta}</p><p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{cantidad}</p></div>;
}

function Estado({ mensaje }: { mensaje: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{mensaje}</div>;
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{etiqueta}</p><p className="mt-1 break-words font-medium text-slate-900 dark:text-slate-100">{valor}</p></div>;
}
