import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { api } from '../../api/client';
import { useRecursosDinamicos } from '../../hooks/useRecursosDinamicos';
import { toast } from 'sonner';

interface Miembro {
  id: number;
  usuarioId: number;
  rol: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

interface Permiso {
  id: number;
  usuarioOrganizacionId: number;
  recursoTipo: string;
  recursoId: number;
  fechaInicio: string;
  fechaVencimiento: string;
  activo: boolean;
  notas: string | null;
}

interface Recurso {
  id: number;
  nombre: string;
  descripcion?: string;
  [key: string]: any;
}

const permisosApi = {
  listarActivos: (usuarioOrganizacionId: number) =>
    api.get(`/permisos/miembros/${usuarioOrganizacionId}/activos`),
  crear: (data: any) => api.post('/permisos/temporales', data),
  desactivar: (permisoId: number) =>
    api.patch(`/permisos/${permisoId}/desactivar`),
};

const miembrosApi = {
  obtener: (organizacionId: number) =>
    api.get(`/organizaciones/${organizacionId}/miembros`),
};

const TIPOS_RECURSO = [
  { value: 'CAMPO', label: 'Campo' },
  { value: 'CULTIVO', label: 'Cultivo' },
  { value: 'TAREA', label: 'Tarea' },
  { value: 'MAQUINARIA', label: 'Maquinaria' },
  { value: 'GANADO', label: 'Ganadería' },
];

export default function PermisosTemporalesPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const queryClient = useQueryClient();

  // ============ ESTADO ============
  const [miembroSeleccionado, setMiembroSeleccionado] = useState('');
  const [tipoRecursoSeleccionado, setTipoRecursoSeleccionado] = useState<
    'CAMPO' | 'TAREA' | 'CULTIVO' | 'MAQUINARIA' | 'GANADO' | ''
  >('');
  const [recursoSeleccionado, setRecursoSeleccionado] = useState('');
  const [fechaInicio, setFechaInicio] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [fechaVencimiento, setFechaVencimiento] = useState(
    format(addDays(new Date(), 7), 'yyyy-MM-dd'),
  );
  const [notas, setNotas] = useState('');

  // ============ QUERIES ============
  const { data: miembrosData } = useQuery({
    queryKey: ['miembros', orgId],
    queryFn: () => miembrosApi.obtener(parseInt(orgId!)).then((r) => r.data),
    enabled: !!orgId,
  });

  // Usa el hook personalizado para cargar recursos dinámicamente
  const { recursos, isLoading: recursosLoading } = useRecursosDinamicos(
    tipoRecursoSeleccionado,
  );

  // Permisos del miembro seleccionado
  const { data: permisosData, refetch: refetchPermisos } = useQuery<{ data: Permiso[] }>(
    {
      queryKey: ['permisos', miembroSeleccionado],
      queryFn: async () => {
        if (!miembroSeleccionado) return { data: [] };
        const miembroId = miembrosData?.find(
          (m: Miembro) => m.id === parseInt(miembroSeleccionado),
        )?.id;
        const res = await permisosApi.listarActivos(miembroId);
        return res.data;
      },
      enabled: !!miembroSeleccionado && !!miembrosData,
    },
  );

  // ============ MUTATIONS ============
  const { mutate: crearPermiso, isPending } = useMutation({
    mutationFn: () => {
      const miembroId = miembrosData?.find(
        (m: Miembro) => m.id === parseInt(miembroSeleccionado),
      )?.id;

      if (!miembroId || !tipoRecursoSeleccionado || !recursoSeleccionado) {
        throw new Error('Faltan datos requeridos');
      }

      return permisosApi.crear({
        usuarioOrganizacionId: miembroId,
        fechaInicio: `${fechaInicio}T00:00:00Z`,
        fechaVencimiento: `${fechaVencimiento}T23:59:59Z`,
        recursoTipo: tipoRecursoSeleccionado,
        recursoId: parseInt(recursoSeleccionado),
        notas: notas || null,
      });
    },
    onSuccess: () => {
      toast.success('Permiso temporal creado exitosamente');
      
      // Refetch del miembro seleccionado
      refetchPermisos();
      
      // Invalidar caché general de permisos para que otros lo vean si recarga
      queryClient.invalidateQueries({ queryKey: ['permisos'] });

      // Limpiar formulario
      setTipoRecursoSeleccionado('');
      setRecursoSeleccionado('');
      setFechaInicio(format(new Date(), 'yyyy-MM-dd'));
      setFechaVencimiento(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
      setNotas('');
    },
    onError: (error: any) => {
      const mensaje = error.response?.data?.message || 'Error al crear permiso';
      toast.error(mensaje);
    },
  });

  const { mutate: desactivarPermiso } = useMutation({
    mutationFn: (permisoId: number) => permisosApi.desactivar(permisoId),
    onSuccess: () => {
      toast.success('Permiso revocado');
      refetchPermisos();
      queryClient.invalidateQueries({ queryKey: ['permisos'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al revocar permiso');
    },
  });

  // ============ DATOS ============
  const miembros = miembrosData || [];
  const permisos = permisosData?.data || [];

  const miembroActual = miembros.find(
    (m: Miembro) => m.id === parseInt(miembroSeleccionado),
  );

  const labelTipoRecurso = TIPOS_RECURSO.find(
    (t) => t.value === tipoRecursoSeleccionado,
  )?.label;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Clock className="text-blue-500" size={24} />
        <h1 className="text-3xl font-bold">Permisos Temporales</h1>
      </div>

      {/* ========== FORMULARIO ========== */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">Asignar Acceso Temporal a Recurso</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selector 1: Miembro */}
          <div>
            <label className="block text-sm font-medium mb-1">Miembro</label>
            <select
              value={miembroSeleccionado}
              onChange={(e) => {
                setMiembroSeleccionado(e.target.value);
                setRecursoSeleccionado('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecciona un miembro</option>
              {miembros.map((m: Miembro) => (
                <option key={m.id} value={m.id}>
                  {m.usuario.nombre} {m.usuario.apellido} ({m.usuario.email})
                </option>
              ))}
            </select>
          </div>

          {/* Selector 2: Tipo de Recurso */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de Recurso
            </label>
            <select
              value={tipoRecursoSeleccionado}
              onChange={(e) => {
                setTipoRecursoSeleccionado(e.target.value as any);
                setRecursoSeleccionado('');
              }}
              disabled={!miembroSeleccionado}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <option value="">Selecciona un tipo de recurso</option>
              {TIPOS_RECURSO.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          {/* Selector 3: Recurso Específico (DINÁMICO) */}
          {tipoRecursoSeleccionado && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {labelTipoRecurso} Específico
              </label>
              <select
                value={recursoSeleccionado}
                onChange={(e) => setRecursoSeleccionado(e.target.value)}
                disabled={recursosLoading || recursos.length === 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <option value="">
                  {recursosLoading
                    ? 'Cargando...'
                    : recursos.length === 0
                    ? 'No hay recursos disponibles'
                    : `Selecciona un ${labelTipoRecurso?.toLowerCase()}`}
                </option>
                {recursos.map((r: Recurso) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                    {r.descripcion ? ` - ${r.descripcion}` : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Fecha Inicio */}
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Fecha Vencimiento */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha Vencimiento
            </label>
            <input
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notas */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Notas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Ej: Acceso para revisión de cultivo experimental"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Botón Submit */}
        <div className="flex gap-2 pt-4 border-t">
          <button
            onClick={() => crearPermiso()}
            disabled={
              !miembroSeleccionado ||
              !tipoRecursoSeleccionado ||
              !recursoSeleccionado ||
              isPending
            }
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={18} />
            {isPending ? 'Guardando...' : 'Crear Permiso'}
          </button>
        </div>
      </div>

      {/* ========== LISTA DE PERMISOS ========== */}
      {miembroSeleccionado && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">
            Permisos Activos
            {miembroActual && (
              <span className="text-base font-normal text-gray-600">
                {' '}
                - {miembroActual.usuario.nombre}{' '}
                {miembroActual.usuario.apellido}
              </span>
            )}
          </h2>

          {permisos.length === 0 ? (
            <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
              <p>Sin permisos temporales asignados</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {permisos.map((p: Permiso) => (
                <div
                  key={p.id}
                  className="flex justify-between items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {TIPOS_RECURSO.find((t) => t.value === p.recursoTipo)
                        ?.label || p.recursoTipo}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(p.fechaInicio), 'dd/MM/yyyy')} -{' '}
                      {format(new Date(p.fechaVencimiento), 'dd/MM/yyyy')}
                    </div>
                    {p.notas && (
                      <div className="text-xs text-gray-500 mt-2">{p.notas}</div>
                    )}
                  </div>
                  <button
                    onClick={() => desactivarPermiso(p.id)}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Revocar permiso"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}