// src/pages/admin/AdminPage.tsx (CORREGIDO - ACTUALIZADO)

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers,
  updateUserPlan,
  deleteUser,
} from '../../api/users.api';
import { useAuthStore } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';
import { Trash2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Emails protegidos que siempre deben ser PRO
const PROTECTED_EMAILS = [
  'joaquinsabater@agromanagerar.com',
  'demo@agromanager.ar',
];

export default function AdminPage() {
  const usuario = useAuthStore((s) => s.usuario);
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [planModal, setPlanModal] = useState<number | null>(null);
  const [planError, setPlanError] = useState('');
  const [msg, setMsg] = useState('');

  if (usuario?.rolGlobal !== 'SUPERADMIN') {
    return <Navigate to="/" replace />;
  }

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
  });

  const flash = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 3000);
  };

  const mutPlan = useMutation({
    mutationFn: ({ id, plan }: { id: number; plan: 'FREE' | 'PRO' }) =>
      updateUserPlan(id, plan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setPlanModal(null);
      setPlanError('');
      flash('Plan actualizado.');
    },
    onError: () => toast.error('Error al actualizar plan'),
  });

  const mutDelete = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setConfirmDelete(null);
      flash('Usuario eliminado.');
    },
    onError: () => toast.error('Error al eliminar usuario'),
  });

  const currentUser = users.find((u) => u.id === planModal);
  const isEmailProtected = currentUser && PROTECTED_EMAILS.includes(currentUser.email.toLowerCase());

  const handlePlanChange = (plan: 'FREE' | 'PRO') => {
    if (isEmailProtected && plan === 'FREE') {
      setPlanError('Este usuario siempre debe tener Plan PRO');
      return;
    }
    setPlanError('');
    mutPlan.mutate({ id: currentUser!.id, plan });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de administración</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión global de usuarios y planes</p>
        </div>
        <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-lg font-medium">
          {users.length} usuarios
        </span>
      </div>

      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-green-600 rounded-full" />
          {msg}
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500">Cargando usuarios...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No hay usuarios.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Desde
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-700 font-medium">#{u.id}</td>
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    {u.nombre} {u.apellido}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setPlanModal(u.id);
                        setPlanError('');
                      }}
                      disabled={mutPlan.isPending}
                      className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all hover:opacity-80 ${
                        u.plan === 'PRO'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {u.plan || 'FREE'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      u.rolGlobal === 'SUPERADMIN'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {u.rolGlobal || 'USER'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString('es-AR')
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                    <button
                      onClick={() => setConfirmDelete(u.id)}
                      disabled={mutDelete.isPending}
                      title="Eliminar usuario"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Cambiar Plan */}
      {planModal && currentUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Cambiar plan de {currentUser.nombre} {currentUser.apellido}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{currentUser.email}</p>

            {isEmailProtected && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex gap-2">
                <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">Este usuario siempre debe tener Plan PRO</p>
              </div>
            )}

            {planError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex gap-2">
                <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{planError}</p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <button
                onClick={() => handlePlanChange('FREE')}
                disabled={mutPlan.isPending || isEmailProtected}
                className={`w-full p-3 rounded-lg font-medium transition-colors ${
                  currentUser.plan === 'FREE'
                    ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                } ${isEmailProtected ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ➖ Plan FREE
              </button>
              <button
                onClick={() => handlePlanChange('PRO')}
                disabled={mutPlan.isPending}
                className={`w-full p-3 rounded-lg font-medium transition-colors ${
                  currentUser.plan === 'PRO'
                    ? 'bg-yellow-100 text-yellow-900 border-2 border-yellow-400'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
                }`}
              >
                ⭐ Plan PRO
              </button>
            </div>
            <button
              onClick={() => {
                setPlanModal(null);
                setPlanError('');
              }}
              disabled={mutPlan.isPending}
              className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal: Confirmar eliminación */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={24} className="text-red-600" />
              <h3 className="text-lg font-bold text-gray-900">Eliminar usuario</h3>
            </div>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={mutDelete.isPending}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => mutDelete.mutate(confirmDelete)}
                disabled={mutDelete.isPending}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}