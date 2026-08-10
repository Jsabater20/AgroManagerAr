import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Trash2,
  Mail,
  Loader,
  RotateCcw,
  X,
  Check,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { organizacionesApi } from '../../api/organizaciones.api';
import { ROLES_DISPONIBLES } from '../../constants/roles';
import type {
  MiembroOrganizacion,
  InvitacionOrganizacion,
} from '../../api/types';

type RolOrganizacion =
  | 'OWNER'
  | 'ADMIN'
  | 'OPERARIO'
  | 'CONTADOR'
  | 'MECANICO'
  | 'ASESOR'
  | 'CONTRATISTA';

export default function OrganizationMembersPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState<RolOrganizacion>('OPERARIO');
  const [mensajeInput, setMensajeInput] = useState('');
  const queryClient = useQueryClient();

  const orgIdNum = orgId ? parseInt(orgId) : 0;

  // Cerrar sidebar al entrar a esta página
  useEffect(() => {
    const backdrop = document.querySelector('[class*="fixed inset-0 bg-black"]');
    if (backdrop instanceof HTMLElement) {
      backdrop.click();
    }
  }, []);

  // Query: Miembros agregados
  const { data: miembros = [], isLoading: miembrosLoading } = useQuery({
    queryKey: ['miembros', orgIdNum],
    queryFn: () => organizacionesApi.obtenerMiembros(orgIdNum),
    enabled: !!orgIdNum,
  });

  // Query: Invitaciones pendientes
  const { data: invitaciones = [], isLoading: invitacionesLoading } =
    useQuery({
      queryKey: ['invitaciones', orgIdNum],
      queryFn: () => organizacionesApi.obtenerInvitaciones(orgIdNum),
      enabled: !!orgIdNum,
    });

  // Mutation: Invitar miembro
  const inviteMutation = useMutation({
    mutationFn: (dto: { email: string; rol: string; mensaje?: string }) =>
      organizacionesApi.invitarMiembro(orgIdNum, dto),
    onSuccess: () => {
      toast.success('Invitación enviada');
      setEmailInput('');
      setRoleInput('OPERARIO');
      setMensajeInput('');
      queryClient.invalidateQueries({ queryKey: ['invitaciones', orgIdNum] });
    },
    onError: (err: unknown) => {
      const error = err as { response?: { data?: { message?: string } } } | null;
      toast.error(error?.response?.data?.message || 'Error al invitar');
    },
  });

  // Mutation: Eliminar miembro
  const deleteMutation = useMutation({
    mutationFn: (usuarioOrgId: number) =>
      organizacionesApi.eliminarMiembro(orgIdNum, usuarioOrgId),
    onSuccess: () => {
      toast.success('Miembro eliminado');
      queryClient.invalidateQueries({ queryKey: ['miembros', orgIdNum] });
    },
    onError: () => {
      toast.error('Error al eliminar miembro');
    },
  });

  // Mutation: Cambiar estado miembro
  const changeStateMutation = useMutation({
    mutationFn: ({
      usuarioOrgId,
      activo,
    }: {
      usuarioOrgId: number;
      activo: boolean;
    }) =>
      organizacionesApi.cambiarEstadoMiembro(orgIdNum, usuarioOrgId, activo),
    onSuccess: () => {
      toast.success('Estado actualizado');
      queryClient.invalidateQueries({ queryKey: ['miembros', orgIdNum] });
    },
    onError: () => {
      toast.error('Error al actualizar estado');
    },
  });

  // Mutation: Reenviar invitación
  const resentInviteMutation = useMutation({
    mutationFn: (invitacionId: number) =>
      organizacionesApi.reenviarInvitacion(orgIdNum, invitacionId),
    onSuccess: () => {
      toast.success('Invitación reenviada');
    },
    onError: () => {
      toast.error('Error al reenviar invitación');
    },
  });

  // Mutation: Cancelar invitación
  const cancelInviteMutation = useMutation({
    mutationFn: (invitacionId: number) =>
      organizacionesApi.cancelarInvitacion(orgIdNum, invitacionId),
    onSuccess: () => {
      toast.success('Invitación cancelada');
      queryClient.invalidateQueries({ queryKey: ['invitaciones', orgIdNum] });
    },
    onError: () => {
      toast.error('Error al cancelar invitación');
    },
  });

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      toast.error('Ingresa un email');
      return;
    }
    inviteMutation.mutate({
      email: emailInput.trim(),
      rol: roleInput,
      mensaje: mensajeInput.trim() || undefined,
    });
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Mail className="text-green-600" size={32} />
          Administración de personal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Invita nuevos usuarios y gestiona los roles dentro de tu organización
        </p>
      </div>

      {/* SECCIÓN: Agregar nuevo miembro */}
      <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Plus size={20} className="text-green-600" />
          Agregar Nuevo Miembro
        </h2>
        <form onSubmit={handleInvite} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rol Inicial <span className="text-red-500">*</span>
              </label>
              <select
                value={roleInput}
                onChange={(e) =>
                  setRoleInput(e.target.value as RolOrganizacion)
                }
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium cursor-pointer"
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
                Email del Nuevo Miembro <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                placeholder="trabajador@ejemplo.com"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Mensaje Opcional
            </label>
            <textarea
              value={mensajeInput}
              onChange={(e) => setMensajeInput(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              placeholder="Agrega un mensaje personalizado para el invitado (ej: Bienvenido al equipo)..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none resize-none"
            />
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

      {/* SECCIÓN: Invitaciones pendientes */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Clock size={20} className="text-yellow-600" />
            Invitaciones Pendientes ({invitaciones.length})
          </h2>
        </div>

        {invitacionesLoading ? (
          <div className="px-6 py-8 text-center">
            <Loader className="inline animate-spin text-gray-400" />
          </div>
        ) : invitaciones.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            No hay invitaciones pendientes
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {invitaciones.map((inv: InvitacionOrganizacion) => (
              <div
                key={inv.id}
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {inv.email}
                    </p>
                    <div className="flex gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>Rol: {inv.rol}</span>
                      <span>•</span>
                      <span>
                        Enviado:{' '}
                        {new Date(inv.fechaInvitacion).toLocaleDateString()}
                      </span>
                    </div>
                    {inv.mensaje && (
                      <p className="mt-2 text-sm italic text-gray-600 dark:text-gray-400 border-l-2 border-green-500 pl-3">
                        "{inv.mensaje}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-full">
                      Pendiente
                    </span>

                    <button
                      onClick={() => resentInviteMutation.mutate(inv.id)}
                      disabled={resentInviteMutation.isPending}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Reenviar invitación"
                    >
                      <RotateCcw size={16} />
                    </button>

                    <button
                      onClick={() => cancelInviteMutation.mutate(inv.id)}
                      disabled={cancelInviteMutation.isPending}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Cancelar invitación"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN: Miembros agregados */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Check size={20} className="text-green-600" />
            Miembros Agregados ({miembros.length})
          </h2>
        </div>

        {miembrosLoading ? (
          <div className="px-6 py-8 text-center">
            <Loader className="inline animate-spin text-gray-400" />
          </div>
        ) : miembros.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            No hay miembros agregados en esta organización
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {miembros.map((miembro: MiembroOrganizacion) => (
              <div
                key={miembro.id}
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {miembro.usuario.nombre} {miembro.usuario.apellido}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {miembro.usuario.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        miembro.activo
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {miembro.activo ? 'Activo' : 'Inactivo'}
                    </span>

                    <button
                      onClick={() =>
                        changeStateMutation.mutate({
                          usuarioOrgId: miembro.id,
                          activo: !miembro.activo,
                        })
                      }
                      disabled={changeStateMutation.isPending}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title={
                        miembro.activo ? 'Desactivar' : 'Activar'
                      }
                    >
                      {miembro.activo ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}
                    </button>

                    <button
                      onClick={() =>
                        deleteMutation.mutate(miembro.id)
                      }
                      disabled={deleteMutation.isPending}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Eliminar miembro"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Roles:{' '}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {miembro.roles.map((r) => (
                        <span
                          key={r}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {miembro.campos.length > 0 && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        Campos asignados:{' '}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {miembro.campos.map((c) => (
                          <span
                            key={c.id}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded"
                          >
                            {c.nombre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}