// frontend/src/pages/admin/AdminPage.tsx (COMPLETO - ACTUALIZADO)
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers,
  updateUserRol,
  deleteUser,
} from '../../api/users.api';
import { useAuthStore } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';
import { Trash2, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const usuario = useAuthStore((s) => s.usuario);
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
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

  const mutRol = useMutation({
    mutationFn: ({ id, rol }: { id: number; rol: 'SUPERADMIN' | 'USER' }) =>
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
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de administración</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión global de usuarios</p>
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
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 text-xs font-mono">{u.id}</td>
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    {u.nombre} {u.apellido}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{u.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.rolGlobal}
                      onChange={(e) =>
                        mutRol.mutate({
                          id: u.id,
                          rol: e.target.value as 'SUPERADMIN' | 'USER',
                        })
                      }
                      disabled={mutRol.isPending}
                      className="bg-white border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="USER">Usuario</option>
                      <option value="SUPERADMIN">SUPERADMIN</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(u.createdAt).toLocaleDateString('es-AR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {confirmDelete === u.id ? (
                        <div className="flex items-center gap-2 text-xs bg-red-50 border border-red-200 rounded-lg px-2 py-1">
                          <AlertCircle size={14} className="text-red-600" />
                          <span className="text-red-700 font-medium">¿Confirmar?</span>
                          <button
                            onClick={() =>
                              mutDelete.mutate(u.id, {
                                onSuccess: () => setConfirmDelete(null),
                              })
                            }
                            disabled={mutDelete.isPending}
                            className="text-red-600 font-bold hover:text-red-800 ml-1"
                          >
                            Sí
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(u.id)}
                          disabled={mutDelete.isPending}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                          title="Eliminar usuario"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
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