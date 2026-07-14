import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Plus, Trash2, Mail, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { organizacionesApi } from '../../api/organizations.api';
import { ROLES_DISPONIBLES } from '../../constants/roles';
import type { MiembroOrganizacion } from '../../api/types';

type RolOrganizacion = 'ADMIN' | 'OPERARIO' | 'CONTADOR' | 'ASESOR' | 'CONTRATISTA';

export default function OrganizationMembersPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState<RolOrganizacion>('OPERARIO');

  const orgIdNum = orgId ? parseInt(orgId) : 0;

  // Fetch miembros
  const { data: miembros = [], isLoading: miembrosLoading } = useQuery({
    queryKey: ['miembros', orgIdNum],
    queryFn: () => organizacionesApi.obtenerMiembros(orgIdNum),
    enabled: !!orgIdNum,
  });

  // Invite mutation
  const inviteMutation = useMutation({
    mutationFn: (dto: { email: string; rol: string }) =>
      organizacionesApi.invitarMiembro(orgIdNum, dto),
    onSuccess: () => {
      toast.success('Invitación enviada');
      setEmailInput('');
      setRoleInput('OPERARIO');
    },
    onError: (_err: any) => {
      toast.error(_err?.response?.data?.message || 'Error al invitar');
    },
  });

  // Delete member mutation
  const deleteMutation = useMutation({
    mutationFn: (usuarioId: number) =>
      organizacionesApi.eliminarMiembro(orgIdNum, usuarioId),
    onSuccess: () => {
      toast.success('Miembro eliminado');
    },
    onError: () => {
      toast.error('Error al eliminar miembro');
    },
  });

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      toast.error('Ingresa un email');
      return;
    }
    inviteMutation.mutate({ email: emailInput.trim(), rol: roleInput });
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Mail className="text-green-600" size={32} />
          Administración de Miembros
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Invita nuevos usuarios y gestiona los roles dentro de tu organización
        </p>
      </div>

      {/* Invite Form - Always Visible */}
      <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Plus size={20} className="text-green-600" />
          Agregar Nuevo Miembro
        </h2>
        <form onSubmit={handleInvite} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rol
              </label>
              <select
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value as RolOrganizacion)}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
              >
                {ROLES_DISPONIBLES.map((rol) => (
                  <option key={rol.value} value={rol.value}>
                    {rol.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email del Nuevo Miembro
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="trabajador@ejemplo.com"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="submit"
              disabled={inviteMutation.isPending}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-md"
            >
              {inviteMutation.isPending ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Enviando invitación...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Enviar Invitación
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Members List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Miembros actuales ({miembros.length})
          </h2>
        </div>

        {miembrosLoading ? (
          <div className="px-6 py-8 text-center">
            <Loader className="inline animate-spin text-gray-400" />
          </div>
        ) : miembros.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            No hay miembros en esta organización
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {miembros.map((miembro: MiembroOrganizacion) => {
              if (!miembro.usuario) return null;
              return (
                <div key={miembro.usuarioId} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {miembro.usuario.nombre} {miembro.usuario.apellido}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {miembro.usuario.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded-full">
                      {miembro.rol}
                    </span>

                    <button
                      onClick={() => deleteMutation.mutate(miembro.usuarioId)}
                      disabled={deleteMutation.isPending}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Eliminar miembro"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
