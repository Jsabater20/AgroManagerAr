import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile, changePassword } from '../../api/users.api';
import { useAuthStore } from '../../store/auth.store';

export default function PerfilPage() {
  const queryClient = useQueryClient();
  const usuario = useAuthStore((s) => s.usuario);
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);

  const { data: perfil } = useQuery({ queryKey: ['profile'], queryFn: getProfile });

  const [nombre, setNombre] = useState('');
  const [editandoNombre, setEditandoNombre] = useState(false);

  const [pwActual, setPwActual] = useState('');
  const [pwNueva, setPwNueva] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');

  const [msgNombre, setMsgNombre] = useState('');
  const [msgPw, setMsgPw] = useState('');

  const mutNombre = useMutation({
    mutationFn: (n: string) => updateProfile(n),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      if (usuario && token) setAuth({ ...usuario, nombre: data.nombre }, token);
      setEditandoNombre(false);
      setMsgNombre('Nombre actualizado correctamente.');
      setTimeout(() => setMsgNombre(''), 3000);
    },
  });

  const mutPw = useMutation({
    mutationFn: () => changePassword(pwActual, pwNueva),
    onSuccess: () => {
      setPwActual(''); setPwNueva(''); setPwConfirm('');
      setMsgPw('Contraseña cambiada correctamente.');
      setTimeout(() => setMsgPw(''), 3000);
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setMsgPw(msg ?? 'Error al cambiar la contraseña.');
    },
  });

  const planLabel = perfil?.plan === 'PRO' ? '⚡ Pro' : 'Free';
  const planColor = perfil?.plan === 'PRO' ? 'text-yellow-400' : 'text-green-400';

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>

      {/* Info general */}
      <div className="bg-gray-800 rounded-xl p-5 space-y-3">
        <h2 className="text-lg font-semibold text-white mb-4">Información de la cuenta</h2>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 w-24">Email</span>
          <span className="text-white">{perfil?.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 w-24">Plan</span>
          <span className={`font-semibold ${planColor}`}>{planLabel}</span>
          {perfil?.plan === 'FREE' && (
            <a href="/precios" className="text-xs text-blue-400 hover:underline ml-2">
              Actualizar a Pro →
            </a>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 w-24">Rol</span>
          <span className="text-white capitalize">{perfil?.rol?.toLowerCase()}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 w-24">Miembro desde</span>
          <span className="text-white">
            {perfil?.createdAt
              ? new Date(perfil.createdAt).toLocaleDateString('es-AR')
              : '-'}
          </span>
        </div>
      </div>

      {/* Editar nombre */}
      <div className="bg-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold text-white">Nombre</h2>

        {!editandoNombre ? (
          <div className="flex items-center gap-4">
            <span className="text-white text-lg">{perfil?.nombre}</span>
            <button
              onClick={() => { setNombre(perfil?.nombre ?? ''); setEditandoNombre(true); }}
              className="text-sm text-blue-400 hover:underline"
            >
              Editar
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <input
              className="bg-gray-700 text-white rounded px-3 py-2 flex-1 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={80}
            />
            <button
              onClick={() => mutNombre.mutate(nombre)}
              disabled={mutNombre.isPending || nombre.length < 2}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditandoNombre(false)}
              className="text-gray-400 hover:text-white px-2"
            >
              Cancelar
            </button>
          </div>
        )}
        {msgNombre && <p className="text-green-400 text-sm">{msgNombre}</p>}
      </div>

      {/* Cambiar contraseña */}
      <div className="bg-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold text-white">Cambiar contraseña</h2>

        <div className="space-y-3">
          <input
            type="password"
            placeholder="Contraseña actual"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
            value={pwActual}
            onChange={(e) => setPwActual(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nueva contraseña (mín. 8 caracteres)"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
            value={pwNueva}
            onChange={(e) => setPwNueva(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
            value={pwConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
          />
        </div>

        {pwNueva && pwConfirm && pwNueva !== pwConfirm && (
          <p className="text-red-400 text-sm">Las contraseñas no coinciden.</p>
        )}

        <button
          onClick={() => mutPw.mutate()}
          disabled={
            mutPw.isPending ||
            !pwActual ||
            pwNueva.length < 8 ||
            pwNueva !== pwConfirm
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50"
        >
          {mutPw.isPending ? 'Guardando...' : 'Cambiar contraseña'}
        </button>

        {msgPw && (
          <p className={`text-sm ${msgPw.startsWith('Contraseña cambiada') ? 'text-green-400' : 'text-red-400'}`}>
            {msgPw}
          </p>
        )}
      </div>
    </div>
  );
}
