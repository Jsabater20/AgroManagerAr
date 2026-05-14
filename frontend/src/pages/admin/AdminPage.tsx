import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers,
  updateUserPlan,
  updateUserRol,
  deleteUser,
  type UserProfile,
} from '../../api/users.api';
import { useAuthStore } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';

export default function AdminPage() {
  const usuario = useAuthStore((s) => s.usuario);
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [msg, setMsg] = useState('');

  if (usuario?.rol !== 'ADMIN') return <Navigate to="/" replace />;

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
      flash('Plan actualizado.');
    },
  });

  const mutRol = useMutation({
    mutationFn: ({ id, rol }: { id: number; rol: 'ADMIN' | 'OPERADOR' }) =>
      updateUserRol(id, rol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      flash('Rol actualizado.');
    },
  });

  const mutDelete = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setConfirmDelete(null);
      flash('Usuario eliminado.');
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Panel de administración</h1>
        <span className="text-sm text-gray-400">{users.length} usuarios</span>
      </div>

      {msg && (
        <div className="bg-green-800 text-green-200 px-4 py-2 rounded text-sm">{msg}</div>
      )}

      {isLoading ? (
        <p className="text-gray-400">Cargando usuarios...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Rol</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Miembro desde</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((u: UserProfile) => (
                <tr key={u.id} className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{u.id}</td>
                  <td className="px-4 py-3 text-white font-medium">{u.nombre}</td>
                  <td className="px-4 py-3 text-gray-300">{u.email}</td>

                  {/* Rol */}
                  <td className="px-4 py-3">
                    <select
                      className="bg-gray-700 text-white text-xs rounded px-2 py-1 border border-gray-600"
                      value={u.rol}
                      onChange={(e) =>
                        mutRol.mutate({ id: u.id, rol: e.target.value as 'ADMIN' | 'OPERADOR' })
                      }
                    >
                      <option value="OPERADOR">Operador</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>

                  {/* Plan */}
                  <td className="px-4 py-3">
                    <select
                      className="bg-gray-700 text-white text-xs rounded px-2 py-1 border border-gray-600"
                      value={u.plan}
                      onChange={(e) =>
                        mutPlan.mutate({ id: u.id, plan: e.target.value as 'FREE' | 'PRO' })
                      }
                    >
                      <option value="FREE">Free</option>
                      <option value="PRO">Pro</option>
                    </select>
                  </td>

                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(u.createdAt).toLocaleDateString('es-AR')}
                  </td>

                  {/* Eliminar */}
                  <td className="px-4 py-3">
                    {u.id === usuario?.id ? (
                      <span className="text-gray-600 text-xs">Tu cuenta</span>
                    ) : confirmDelete === u.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => mutDelete.mutate(u.id)}
                          className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(u.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
