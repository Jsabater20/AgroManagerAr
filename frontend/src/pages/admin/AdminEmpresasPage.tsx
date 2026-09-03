import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Building2,
  CalendarDays,
  ChevronLeft,
  Link2,
  Pencil,
  Plus,
  UsersRound,
  X,
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  empresasApi,
  type EmpresaAdmin,
  type EstadoComercialEmpresa,
} from '../../api/empresas.api';
import { useAuthStore } from '../../store/auth.store';

type FormularioComercial = {
  estadoComercial: EstadoComercialEmpresa;
  limiteEstablecimientos: string;
  fechaInicioComercial: string;
  fechaVencimiento: string;
  observacionesComerciales: string;
};

const estados: EstadoComercialEmpresa[] = ['PENDIENTE', 'ACTIVA', 'SUSPENDIDA', 'VENCIDA'];

const etiquetaEstado: Record<EstadoComercialEmpresa, string> = {
  PENDIENTE: 'Pendiente',
  ACTIVA: 'Activa',
  SUSPENDIDA: 'Suspendida',
  VENCIDA: 'Vencida',
};

const clasesEstado: Record<EstadoComercialEmpresa, string> = {
  PENDIENTE: 'bg-amber-100 text-amber-800',
  ACTIVA: 'bg-emerald-100 text-emerald-800',
  SUSPENDIDA: 'bg-rose-100 text-rose-800',
  VENCIDA: 'bg-slate-200 text-slate-700',
};

const fechaInput = (fecha: string | null) => (fecha ? fecha.slice(0, 10) : '');

const fechaVisible = (fecha: string | null) => {
  if (!fecha) return 'Sin definir';
  const [anio, mes, dia] = fecha.slice(0, 10).split('-');
  return dia + '/' + mes + '/' + anio;
};

function crearFormulario(empresa: EmpresaAdmin): FormularioComercial {
  return {
    estadoComercial: empresa.estadoComercial,
    limiteEstablecimientos: String(empresa.limiteEstablecimientos),
    fechaInicioComercial: fechaInput(empresa.fechaInicioComercial),
    fechaVencimiento: fechaInput(empresa.fechaVencimiento),
    observacionesComerciales: empresa.observacionesComerciales ?? '',
  };
}

export default function AdminEmpresasPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const queryClient = useQueryClient();
  const [filtro, setFiltro] = useState<'TODAS' | EstadoComercialEmpresa>('TODAS');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<EmpresaAdmin | null>(null);
  const [formulario, setFormulario] = useState<FormularioComercial | null>(null);
  const [nuevoEstablecimiento, setNuevoEstablecimiento] = useState({ nombre: '', email: '' });

  const empresasQuery = useQuery({
    queryKey: ['admin-empresas'],
    queryFn: empresasApi.listarParaAdmin,
  });

  const organizacionesDisponiblesQuery = useQuery({
    queryKey: ['admin-empresa-organizaciones-disponibles', empresaSeleccionada?.id],
    queryFn: () => empresasApi.listarOrganizacionesDisponiblesAdmin(empresaSeleccionada!.id),
    enabled: Boolean(empresaSeleccionada),
  });

  const actualizarMutation = useMutation({
    mutationFn: ({ empresaId, form }: { empresaId: number; form: FormularioComercial }) =>
      empresasApi.actualizarComercial(empresaId, {
        estadoComercial: form.estadoComercial,
        limiteEstablecimientos: Number(form.limiteEstablecimientos),
        fechaInicioComercial: form.fechaInicioComercial || undefined,
        fechaVencimiento: form.fechaVencimiento || undefined,
        observacionesComerciales: form.observacionesComerciales.trim() || null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-empresas'] });
      setEmpresaSeleccionada(null);
      setFormulario(null);
      toast.success('Configuración comercial actualizada.');
    },
    onError: (error: { response?: { data?: { message?: string | string[] } } }) => {
      const mensaje = error.response?.data?.message;
      toast.error(Array.isArray(mensaje) ? mensaje[0] : mensaje || 'No se pudo actualizar la empresa.');
    },
  });

  const vincularMutation = useMutation({
    mutationFn: ({ empresaId, organizacionId }: { empresaId: number; organizacionId: number }) =>
      empresasApi.vincularOrganizacionAdmin(empresaId, organizacionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-empresas'] });
      queryClient.invalidateQueries({ queryKey: ['admin-empresa-organizaciones-disponibles'] });
      setEmpresaSeleccionada(null);
      setFormulario(null);
      toast.success('Establecimiento vinculado y actualizado a Plan Pro.');
    },
    onError: () => toast.error('No se pudo vincular el establecimiento.'),
  });

  const crearEstablecimientoMutation = useMutation({
    mutationFn: ({ empresaId, nombre, email }: { empresaId: number; nombre: string; email: string }) =>
      empresasApi.crearEstablecimientoAdmin(empresaId, { nombre, email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-empresas'] });
      queryClient.invalidateQueries({ queryKey: ['admin-empresa-organizaciones-disponibles'] });
      setEmpresaSeleccionada(null);
      setFormulario(null);
      setNuevoEstablecimiento({ nombre: '', email: '' });
      toast.success('Establecimiento creado, vinculado y habilitado en Plan Pro.');
    },
    onError: (error: { response?: { data?: { message?: string | string[] } } }) => {
      const mensaje = error.response?.data?.message;
      toast.error(Array.isArray(mensaje) ? mensaje[0] : mensaje || 'No se pudo crear el establecimiento.');
    },
  });

  const desvincularMutation = useMutation({
    mutationFn: ({ empresaId, organizacionId }: { empresaId: number; organizacionId: number }) =>
      empresasApi.desvincularOrganizacionAdmin(empresaId, organizacionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-empresas'] });
      queryClient.invalidateQueries({ queryKey: ['admin-empresa-organizaciones-disponibles'] });
      setEmpresaSeleccionada(null);
      setFormulario(null);
      toast.success('Establecimiento desvinculado de la empresa.');
    },
    onError: () => toast.error('No se pudo desvincular el establecimiento.'),
  });

  if (usuario?.rolGlobal !== 'SUPERADMIN') {
    return <Navigate to="/" replace />;
  }

  const empresas = empresasQuery.data ?? [];
  const empresasFiltradas =
    filtro === 'TODAS'
      ? empresas
      : empresas.filter((empresa) => empresa.estadoComercial === filtro);
  const pendientes = empresas.filter((empresa) => empresa.estadoComercial === 'PENDIENTE').length;
  const activas = empresas.filter((empresa) => empresa.estadoComercial === 'ACTIVA').length;

  const abrirEditor = (empresa: EmpresaAdmin) => {
    setEmpresaSeleccionada(empresa);
    setFormulario(crearFormulario(empresa));
    setNuevoEstablecimiento({ nombre: '', email: '' });
  };
  const empresaActiva = empresaSeleccionada?.estadoComercial === 'ACTIVA';
  const cupoDisponible = empresaSeleccionada
    ? empresaSeleccionada.limiteEstablecimientos - empresaSeleccionada.establecimientos.length
    : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-7 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <ChevronLeft size={16} />
            Panel general
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-emerald-700">
            Administración comercial
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Empresas</h1>
          <p className="mt-2 text-slate-600">
            Gestioná solicitudes, vigencias y establecimientos habilitados.
          </p>
        </div>
        <div className="flex gap-3">
          <Resumen icon={<Building2 size={19} />} etiqueta="Empresas activas" valor={activas} color="emerald" />
          <Resumen icon={<CalendarDays size={19} />} etiqueta="Pendientes" valor={pendientes} color="amber" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Filtro activo={filtro === 'TODAS'} onClick={() => setFiltro('TODAS')} etiqueta={'Todas (' + empresas.length + ')'} />
        {estados.map((estado) => (
          <Filtro
            key={estado}
            activo={filtro === estado}
            onClick={() => setFiltro(estado)}
            etiqueta={etiquetaEstado[estado]}
          />
        ))}
      </div>

      {empresasQuery.isLoading ? (
        <EstadoVacio mensaje="Cargando empresas..." />
      ) : empresasQuery.isError ? (
        <EstadoVacio mensaje="No se pudieron cargar las empresas. Intentá nuevamente." />
      ) : empresasFiltradas.length === 0 ? (
        <EstadoVacio mensaje="No hay empresas para este filtro." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Empresa</th>
                  <th className="px-5 py-3">Responsable</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Establecimientos</th>
                  <th className="px-5 py-3">Vigencia</th>
                  <th className="px-5 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {empresasFiltradas.map((empresa) => (
                  <tr key={empresa.id} className="transition hover:bg-slate-50/80">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{empresa.nombre}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Registrada el {fechaVisible(empresa.createdAt)}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {empresa.propietario.nombre} {empresa.propietario.apellido}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{empresa.propietario.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={'inline-flex rounded-full px-2.5 py-1 text-xs font-bold ' + clasesEstado[empresa.estadoComercial]}>
                        {etiquetaEstado[empresa.estadoComercial]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {empresa.establecimientos.length} / {empresa.limiteEstablecimientos}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{empresa.miembros} miembros empresariales</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <p>{fechaVisible(empresa.fechaInicioComercial)}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Vence: {fechaVisible(empresa.fechaVencimiento)}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => abrirEditor(empresa)}
                        className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                      >
                        <Pencil size={15} />
                        Administrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {empresaSeleccionada && formulario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              actualizarMutation.mutate({ empresaId: empresaSeleccionada.id, form: formulario });
            }}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Configuración comercial</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">{empresaSeleccionada.nombre}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {empresaSeleccionada.propietario.nombre} {empresaSeleccionada.propietario.apellido} · {empresaSeleccionada.propietario.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmpresaSeleccionada(null);
                  setFormulario(null);
                }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Campo etiqueta="Estado comercial">
                <select
                  value={formulario.estadoComercial}
                  onChange={(event) => setFormulario({ ...formulario, estadoComercial: event.target.value as EstadoComercialEmpresa })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>{etiquetaEstado[estado]}</option>
                  ))}
                </select>
              </Campo>
              <Campo etiqueta="Establecimientos habilitados">
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={formulario.limiteEstablecimientos}
                  onChange={(event) => setFormulario({ ...formulario, limiteEstablecimientos: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </Campo>
              <Campo etiqueta="Inicio comercial">
                <input
                  type="date"
                  value={formulario.fechaInicioComercial}
                  onChange={(event) => setFormulario({ ...formulario, fechaInicioComercial: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </Campo>
              <Campo etiqueta="Vencimiento">
                <input
                  type="date"
                  value={formulario.fechaVencimiento}
                  onChange={(event) => setFormulario({ ...formulario, fechaVencimiento: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </Campo>
            </div>

            <Campo etiqueta="Notas de cotización o administración" className="mt-4">
              <textarea
                rows={4}
                value={formulario.observacionesComerciales}
                onChange={(event) => setFormulario({ ...formulario, observacionesComerciales: event.target.value })}
                placeholder="Ej. Incluye hasta 3 establecimientos. Renovación anual en marzo."
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </Campo>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Establecimientos vinculados</p>
              {empresaSeleccionada.establecimientos.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {empresaSeleccionada.establecimientos.map((establecimiento) => (
                    <div key={establecimiento.id} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                      <span>{establecimiento.nombre} · {establecimiento.plan}</span>
                      <button
                        type="button"
                        title="Desvincular establecimiento"
                        onClick={() => {
                          if (window.confirm('¿Desvincular este establecimiento de la empresa?')) {
                            desvincularMutation.mutate({
                              empresaId: empresaSeleccionada.id,
                              organizacionId: establecimiento.id,
                            });
                          }
                        }}
                        disabled={desvincularMutation.isPending}
                        className="ml-1 rounded p-0.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-sm text-slate-500">Todavía no hay establecimientos vinculados.</p>
              )}
            </div>

            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-emerald-950">Habilitar establecimientos</p>
                  <p className="mt-1 text-sm text-emerald-800">
                    Cupo disponible: {cupoDisponible} de {empresaSeleccionada.limiteEstablecimientos}.
                  </p>
                </div>
                {!empresaActiva && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                    Activá la empresa y guardá antes de agregar establecimientos.
                  </span>
                )}
              </div>

              {empresaActiva && cupoDisponible > 0 && (
                <>
                  <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                    <input
                      type="text"
                      value={nuevoEstablecimiento.nombre}
                      onChange={(event) => setNuevoEstablecimiento({ ...nuevoEstablecimiento, nombre: event.target.value })}
                      placeholder="Nombre del establecimiento"
                      className="rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                    <input
                      type="email"
                      value={nuevoEstablecimiento.email}
                      onChange={(event) => setNuevoEstablecimiento({ ...nuevoEstablecimiento, email: event.target.value })}
                      placeholder="email@establecimiento.com"
                      className="rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                    <button
                      type="button"
                      disabled={
                        crearEstablecimientoMutation.isPending ||
                        !nuevoEstablecimiento.nombre.trim() ||
                        !nuevoEstablecimiento.email.trim()
                      }
                      onClick={() =>
                        crearEstablecimientoMutation.mutate({
                          empresaId: empresaSeleccionada.id,
                          nombre: nuevoEstablecimiento.nombre,
                          email: nuevoEstablecimiento.email,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
                    >
                      <Plus size={16} />
                      Crear
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-emerald-800">
                    Se crea directamente en Plan Pro y queda vinculada a esta empresa.
                  </p>

                  <div className="mt-5 border-t border-emerald-100 pt-4">
                    <p className="text-sm font-semibold text-emerald-950">Vincular un establecimiento existente</p>
                    {organizacionesDisponiblesQuery.isLoading ? (
                      <p className="mt-2 text-sm text-emerald-800">Buscando establecimientos del responsable...</p>
                    ) : organizacionesDisponiblesQuery.data?.length ? (
                      <div className="mt-3 space-y-2">
                        {organizacionesDisponiblesQuery.data.map((organizacion) => (
                          <div key={organizacion.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-white px-3 py-2.5">
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{organizacion.nombre}</p>
                              <p className="mt-0.5 text-xs text-slate-500">
                                {organizacion.email} · Plan {organizacion.plan}
                              </p>
                            </div>
                            <button
                              type="button"
                              disabled={vincularMutation.isPending}
                              onClick={() =>
                                vincularMutation.mutate({
                                  empresaId: empresaSeleccionada.id,
                                  organizacionId: organizacion.id,
                                })
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 disabled:opacity-60"
                            >
                              <Link2 size={15} />
                              Vincular
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-emerald-800">
                        El responsable no tiene otros establecimientos disponibles para vincular.
                      </p>
                    )}
                  </div>
                </>
              )}

              {empresaActiva && cupoDisponible <= 0 && (
                <p className="mt-3 text-sm text-emerald-800">
                  La empresa ya alcanzó el cupo contratado. Aumentá el límite comercial para habilitar otro establecimiento.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setEmpresaSeleccionada(null);
                  setFormulario(null);
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={actualizarMutation.isPending}
                className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
              >
                {actualizarMutation.isPending ? 'Guardando...' : 'Guardar habilitación'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Resumen({
  icon,
  etiqueta,
  valor,
  color,
}: {
  icon: React.ReactNode;
  etiqueta: string;
  valor: number;
  color: 'emerald' | 'amber';
}) {
  const clases = color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700';
  return (
    <div className={'min-w-32 rounded-2xl px-4 py-3 ' + clases}>
      <div className="flex items-center gap-2 text-xs font-semibold">
        {icon}
        {etiqueta}
      </div>
      <p className="mt-1 text-2xl font-bold">{valor}</p>
    </div>
  );
}

function Filtro({ activo, onClick, etiqueta }: { activo: boolean; onClick: () => void; etiqueta: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-full px-3.5 py-2 text-sm font-semibold transition ' +
        (activo
          ? 'bg-emerald-700 text-white'
          : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800')
      }
    >
      {etiqueta}
    </button>
  );
}

function Campo({
  etiqueta,
  children,
  className = '',
}: {
  etiqueta: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={'block ' + className}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{etiqueta}</span>
      {children}
    </label>
  );
}

function EstadoVacio({ mensaje }: { mensaje: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
      <UsersRound className="mx-auto text-slate-400" size={32} />
      <p className="mt-3 text-sm">{mensaje}</p>
    </div>
  );
}
