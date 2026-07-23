import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { api } from '../../api/client';
import { toast } from 'sonner';

interface Permiso {
  id: number;
  usuarioOrganizacionId: number;
  rolPersonalizadoId: number;
  recursoTipo: string | null;
  recursoId: number | null;
  fechaInicio: string;
  fechaVencimiento: string;
  activo: boolean;
  notas: string | null;
  rolPersonalizado: {
    id: number;
    nombre: string;
  };
}

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

interface RolPersonalizado {
  id: number;
  nombre: string;
}

const permisosApi = {
  listarActivos: (usuarioOrganizacionId: number) =>
    api.get(
      `/permisos/miembros/${usuarioOrganizacionId}/activos`,
    ),
  crear: (data: any) => api.post('/permisos/temporales', data),
  desactivar: (permisoId: number) =>
    api.patch(`/permisos/${permisoId}/desactivar`),
};

const miembrosApi = {
  obtener: (organizacionId: number) =>
    api.get(
      `/organizaciones/${organizacionId}/miembros`,
    ),
};

const rolesApi = {
  obtener: (organizacionId: number) =>
    api.get(`/permisos/roles/${organizacionId}`),
};

export default function PermisosTemporalesPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const [miembroSeleccionado, setMiembroSeleccionado] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [fechaInicio, setFechaInicio] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [fechaVencimiento, setFechaVencimiento] = useState(
    format(addDays(new Date(), 7), 'yyyy-MM-dd'),
  );
  const [recursoTipo, setRecursoTipo] = useState('');
  const [recursoId, setRecursoId] = useState('');
  const [notas, setNotas] = useState('');

  // Query: listar miembros
  const { data: miembrosData } = useQuery({
    queryKey: ['miembros', orgId],
    queryFn: () => miembrosApi.obtener(parseInt(orgId!)),
    enabled: !!orgId,
  });

  // Query: listar roles personalizados
  const { data: rolesData } = useQuery({
    queryKey: ['roles', orgId],
    queryFn: () => rolesApi.obtener(parseInt(orgId!)),
    enabled: !!orgId,
  });

  // Query: listar permisos del miembro seleccionado
  const { data: permisosData, refetch: refetchPermisos } = useQuery({
    queryKey: ['permisos', miembroSeleccionado],
    queryFn: () =>
      permisosApi.listarActivos(
        miembrosData?.data?.find((m: Miembro) => m.id === parseInt(miembroSeleccionado))?.id,
      ),
    enabled: !!miembroSeleccionado && !!miembrosData?.data,
  });

  // Mutation: crear permiso
  const { mutate: crearPermiso, isPending } = useMutation({
    mutationFn: () =>
      permisosApi.crear({
        usuarioOrganizacionId: miembrosData?.data?.find(
          (m: Miembro) => m.id === parseInt(miembroSeleccionado),
        )?.id,
        rolPersonalizadoId: parseInt(rolSeleccionado),
        fechaInicio: `${fechaInicio}T00:00:00Z`,
        fechaVencimiento: `${fechaVencimiento}T23:59:59Z`,
        recursoTipo: recursoTipo || null,
        recursoId: recursoId ? parseInt(recursoId) : null,
        notas,
      }),
    onSuccess: () => {
      toast.success('Permiso temporal creado');
      refetchPermisos();
      setFechaInicio(format(new Date(), 'yyyy-MM-dd'));
      setFechaVencimiento(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
      setRecursoTipo('');
      setRecursoId('');
      setNotas('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al crear permiso');
    },
  });

  // Mutation: desactivar permiso
  const { mutate: desactivarPermiso } = useMutation({
    mutationFn: (permisoId: number) => permisosApi.desactivar(permisoId),
    onSuccess: () => {
      toast.success('Permiso revocado');
      refetchPermisos();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al revocar permiso');
    },
  });

  const miembros = miembrosData?.data || [];
  const permisos = permisosData?.data || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Clock className="text-blue-500" size={24} />
        <h1 className="text-3xl font-bold">Permisos Temporales</h1>
      </div>

      {/* Form: Crear Permiso */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <h2 className="text-xl font-semibold">Asignar Acceso Temporal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Miembro</label>
            <select
              value={miembroSeleccionado}
              onChange={(e) => setMiembroSeleccionado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Selecciona un miembro</option>
              {miembros.map((m: Miembro) => (
                <option key={m.id} value={m.id}>
                  {m.usuario.nombre} ({m.usuario.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rol</label>
            <select
              value={rolSeleccionado}
              onChange={(e) => setRolSeleccionado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={!miembroSeleccionado}
            >
              <option value="">Selecciona un rol</option>
              {(rolesData?.data || []).map((r: RolPersonalizado) => (
                <option key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
            </select>
          </div>
            <label className="block text-sm font-medium mb-1">
              Tipo de Recurso
            </label>
            <select
              value={recursoTipo}
              onChange={(e) => setRecursoTipo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Acceso general</option>
              <option value="CAMPO">Campo</option>
              <option value="TAREA">Tarea</option>
              <option value="MAQUINARIA">Maquinaria</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha Vencimiento
            </label>
            <input
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {recursoTipo && (
            <div>
              <label className="block text-sm font-medium mb-1">ID Recurso</label>
              <input
                type="number"
                value={recursoId}
                onChange={(e) => setRecursoId(e.target.value)}
                placeholder="ID del recurso específico"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}

          <div className={recursoTipo ? 'md:col-span-1' : 'md:col-span-2'}>
            <label className="block text-sm font-medium mb-1">Notas</label>
            <input
              type="text"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Descripción del acceso..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={() => crearPermiso()}
          disabled={!miembroSeleccionado || !rolSeleccionado || isPending}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <Plus size={18} />
          Crear Permiso
        </button>
      </div>

      {/* Lista: Permisos Activos */}
      {miembroSeleccionado && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <h2 className="text-xl font-semibold">Permisos Activos</h2>

          {permisos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Sin permisos temporales
            </div>
          ) : (
            <div className="space-y-3">
              {permisos.map((p: Permiso) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <div className="font-semibold">{p.rolPersonalizado.nombre}</div>
                    <div className="text-sm text-gray-600">
                      {p.recursoTipo ? `${p.recursoTipo} #${p.recursoId}` : 'Acceso general'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {format(new Date(p.fechaInicio), 'dd/MM/yyyy')} -{' '}
                      {format(new Date(p.fechaVencimiento), 'dd/MM/yyyy')}
                    </div>
                    {p.notas && (
                      <div className="text-xs text-gray-600 mt-1">{p.notas}</div>
                    )}
                  </div>
                  <button
                    onClick={() => desactivarPermiso(p.id)}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg"
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
