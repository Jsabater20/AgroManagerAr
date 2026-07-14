import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Shield, Users, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../../api/client';
import { useAuthStore } from '../../store/auth.store';

interface UsuarioOrganizacion {
  id: string;
  usuarioId: string;
  organizacionId: string;
  rol: string;
  usuario: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
  };
}

interface RolPermisos {
  valor: string;
  label: string;
  color: string;
  descripcion: string;
  permisos: string[];
}

const ROLES_DISPONIBLES: RolPermisos[] = [
  {
    valor: 'OWNER',
    label: 'Propietario',
    color: 'bg-purple-600 text-white',
    descripcion: 'Control total de la organización',
    permisos: ['Crear campos', 'Editar tareas', 'Ver finanzas', 'Gestionar usuarios', 'Ver auditoría', 'Gestionar roles'],
  },
  {
    valor: 'ADMIN',
    label: 'Administrador',
    color: 'bg-blue-600 text-white',
    descripcion: 'Gestión completa de recursos',
    permisos: ['Crear campos', 'Editar tareas', 'Ver finanzas', 'Gestionar usuarios', 'Ver auditoría'],
  },
  {
    valor: 'OPERARIO',
    label: 'Operario',
    color: 'bg-green-600 text-white',
    descripcion: 'Ejecutar tareas asignadas',
    permisos: ['Editar tareas', 'Ver tareas asignadas', 'Registrar gastos'],
  },
  {
    valor: 'ASESOR',
    label: 'Asesor',
    color: 'bg-yellow-600 text-white',
    descripcion: 'Recomendaciones técnicas',
    permisos: ['Ver reportes', 'Cargar recomendaciones'],
  },
  {
    valor: 'CONTRATISTA',
    label: 'Contratista',
    color: 'bg-orange-600 text-white',
    descripcion: 'Tareas específicas asignadas',
    permisos: ['Editar tareas asignadas', 'Registrar gastos'],
  },
  {
    valor: 'CONTADOR',
    label: 'Contador',
    color: 'bg-red-600 text-white',
    descripcion: 'Gestión financiera',
    permisos: ['Ver finanzas', 'Registrar gastos', 'Ver reportes'],
  },
];

export default function RolesPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const { usuario } = useAuthStore();
  const queryClient = useQueryClient();
  const [filtroRol, setFiltroRol] = useState<string>('');
  const userRole = usuario?.rol;

  // Get members
  const { data: miembros = [], isLoading } = useQuery({
    queryKey: ['miembros', orgId],
    queryFn: async () => {
      const res = await api.get(`/organizaciones/${orgId}/miembros`);
      return res.data;
    },
    staleTime: 0,
  });

  // Change role mutation
  const { mutate: cambiarRol, isPending } = useMutation({
    mutationFn: async ({ miembroId, nuevoRol }: { miembroId: string; nuevoRol: string }) => {
      const res = await api.patch(`/organizaciones/${orgId}/miembros/${miembroId}/rol`, {
        nuevoRol,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['miembros', orgId] });
      toast.success('Rol actualizado correctamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al cambiar rol');
    },
  });

  const miembrosFiltrados = filtroRol
    ? miembros.filter((m: UsuarioOrganizacion) => m.rol === filtroRol)
    : miembros;

  const puedoCambiarRoles = userRole === 'OWNER' || userRole === 'ADMIN';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="text-green-400" />
            Gestión de Roles
          </h1>
          <p className="text-green-200 text-sm mt-1">Asigna y gestiona roles dentro de la organización</p>
        </div>
      </div>

      {/* Roles Info */}
      <div className="bg-green-900/20 border border-green-900/50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-green-300 mb-3 flex items-center gap-2">
          <Users size={16} />
          Matriz de Permisos por Rol
        </h3>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES_DISPONIBLES.map((r) => (
            <div key={r.valor} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${r.color}`}>
                {r.label}
              </div>
              <p className="text-xs text-green-200 mb-2">{r.descripcion}</p>
              <ul className="text-xs text-green-300 space-y-1">
                {r.permisos.map((p) => (
                  <li key={p} className="flex items-center gap-1">
                    <ArrowRight size={10} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div>
        <label className="block text-xs font-semibold text-green-300 mb-2">Filtrar por rol</label>
        <select
          value={filtroRol}
          onChange={(e) => setFiltroRol(e.target.value)}
          className="w-full px-3 py-2 bg-green-900/30 border border-green-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todos los roles</option>
          {ROLES_DISPONIBLES.map((r) => (
            <option key={r.valor} value={r.valor}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Members Table */}
      <div className="bg-green-900/10 border border-green-900/30 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center text-green-300">Cargando miembros...</div>
        ) : miembrosFiltrados.length === 0 ? (
          <div className="p-6 text-center text-green-300">No hay miembros con este rol</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-900/30 border-b border-green-900/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-300">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-300">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-300">Rol Actual</th>
                  {puedoCambiarRoles && <th className="px-4 py-3 text-left text-xs font-semibold text-green-300">Cambiar Rol</th>}
                </tr>
              </thead>
              <tbody>
                {miembrosFiltrados.map((miembro: UsuarioOrganizacion) => {
                  const rolInfo = ROLES_DISPONIBLES.find((r) => r.valor === miembro.rol);
                  const esOwner = miembro.rol === 'OWNER';
                  return (
                    <tr key={miembro.id} className="border-b border-green-900/20 hover:bg-green-900/10 transition-colors">
                      <td className="px-4 py-3 text-white">
                        {miembro.usuario.nombre} {miembro.usuario.apellido}
                      </td>
                      <td className="px-4 py-3 text-green-300 text-xs">{miembro.usuario.email}</td>
                      <td className="px-4 py-3">
                        {rolInfo && (
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${rolInfo.color}`}>
                            {rolInfo.label}
                          </span>
                        )}
                      </td>
                      {puedoCambiarRoles && (
                        <td className="px-4 py-3">
                          {esOwner ? (
                            <span className="text-xs text-green-400">No se puede cambiar</span>
                          ) : (
                            <select
                              value={miembro.rol}
                              onChange={(e) =>
                                cambiarRol({
                                  miembroId: miembro.id,
                                  nuevoRol: e.target.value,
                                })
                              }
                              disabled={isPending}
                              className="px-2 py-1 bg-green-900/30 border border-green-700 text-white rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                            >
                              {ROLES_DISPONIBLES.map((r) => (
                                <option key={r.valor} value={r.valor}>
                                  {r.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!puedoCambiarRoles && (
        <div className="bg-yellow-900/20 border border-yellow-700 text-yellow-200 rounded-lg p-3 text-sm flex items-start gap-2">
          <Shield size={16} className="mt-0.5 shrink-0" />
          <p>Solo propietarios y administradores pueden cambiar roles.</p>
        </div>
      )}
    </div>
  );
}
