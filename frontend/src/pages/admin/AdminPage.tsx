import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [msg, setMsg] = useState('');

  // Solo tú (joaquinsabater@agromanagerar.com) puedes acceder al panel de admin
  if (usuario?.email !== 'joaquinsabater@agromanagerar.com') return <Navigate to="/" replace />;

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
        <button
          onClick={() => navigate('/perfil')}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
        >
          <User size={18} />
          Mi Perfil
        </button>
        <span className="text-sm text-gray-500">{users.length} usuarios</span>
      </div>

      {msg && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 px-4 py-2 rounded-lg text-sm">
          {msg}
        </div>
      )}

      {isLoading ? (
        <p className="text-gray-500">Cargando usuarios...</p>
      ) : (
        <div className="bg-white overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Nombre</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Rol</th>
                <th className="px-4 py-3 text-left font-medium">Plan</th>
                <th className="px-4 py-3 text-left font-medium">Miembro desde</th>
                <th className="px-4 py-3 text-left font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u: UserProfile) => (
                <tr key={u.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{u.id}</td>
                  <td className="px-4 py-3 text-gray-900 font-medium">{u.nombre}</td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>

                  {/* Rol */}
                  <td className="px-4 py-3">
                    <select
                      className="bg-white text-gray-900 text-xs rounded-md px-2 py-1 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                      className="bg-white text-gray-900 text-xs rounded-md px-2 py-1 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                      value={u.plan}
                      onChange={(e) =>
                        mutPlan.mutate({ id: u.id, plan: e.target.value as 'FREE' | 'PRO' })
                      }
                    >
                      <option value="FREE">Free</option>
                      <option value="PRO">Pro</option>
                    </select>
                  </td>

                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(u.createdAt).toLocaleDateString('es-AR')}
                  </td>

                  {/* Eliminar */}
                  <td className="px-4 py-3">
                    {u.id === usuario?.id ? (
                      <span className="text-gray-400 text-xs">Tu cuenta</span>
                    ) : confirmDelete === u.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => mutDelete.mutate(u.id)}
                          className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(u.id)}
                        className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
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
