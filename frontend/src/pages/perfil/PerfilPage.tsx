import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Camera,
  CheckCircle2,
  KeyRound,
  Pencil,
  SlidersHorizontal,
  Trash2,
  Upload,
  UserRound,
  X,
} from 'lucide-react';
import {
  actualizarEncuadreFotoPerfil,
  changePassword,
  eliminarFotoPerfil,
  getProfile,
  subirFotoPerfil,
  type FotoPerfilEncuadre,
  updateProfile,
} from '../../api/users.api';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';
import { useAuthStore } from '../../store/auth.store';

const ENCUADRE_INICIAL: FotoPerfilEncuadre = {
  posicionX: 50,
  posicionY: 50,
  escala: 1,
};

export default function PerfilPage() {
  const queryClient = useQueryClient();
  const inputFotoRef = useRef<HTMLInputElement>(null);
  const usuario = useAuthStore((state) => state.usuario);
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);
  const currentOrg = useAuthStore((state) => state.currentOrg());
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: getProfile });
  const perfil = profileQuery.data ?? usuario;
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [ajustandoFoto, setAjustandoFoto] = useState(false);
  const [encuadre, setEncuadre] = useState<FotoPerfilEncuadre>(ENCUADRE_INICIAL);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordConfirmacion, setPasswordConfirmacion] = useState('');
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string }>();

  const sincronizarPerfil = (perfilActualizado: typeof perfil) => {
    queryClient.setQueryData(['profile'], perfilActualizado);
    queryClient.invalidateQueries({ queryKey: ['miembros-panel'] });
    queryClient.invalidateQueries({ queryKey: ['miembros'] });
    if (usuario && token && perfilActualizado) {
      setAuth(
        {
          ...usuario,
          nombre: perfilActualizado.nombre,
          apellido: perfilActualizado.apellido,
          fotoPerfilUrl: perfilActualizado.fotoPerfilUrl,
          fotoPerfilEncuadre: perfilActualizado.fotoPerfilEncuadre,
        },
        token,
      );
    }
  };

  const actualizarNombre = useMutation({
    mutationFn: () => updateProfile(nombre.trim(), apellido.trim()),
    onSuccess: (perfilActualizado) => {
      sincronizarPerfil({ ...perfil, ...perfilActualizado });
      setEditandoNombre(false);
      setMensaje({ tipo: 'ok', texto: 'Nombre actualizado correctamente.' });
    },
    onError: (error: unknown) =>
      setMensaje({ tipo: 'error', texto: errorMessage(error, 'No pudimos actualizar el nombre.') }),
  });

  const subirFoto = useMutation({
    mutationFn: subirFotoPerfil,
    onSuccess: (perfilActualizado) => {
      sincronizarPerfil(perfilActualizado);
      setMensaje({ tipo: 'ok', texto: 'Foto de perfil actualizada.' });
    },
    onError: (error: unknown) =>
      setMensaje({ tipo: 'error', texto: errorMessage(error, 'No pudimos subir la foto.') }),
  });

  const guardarEncuadre = useMutation({
    mutationFn: () => actualizarEncuadreFotoPerfil(encuadre),
    onSuccess: (perfilActualizado) => {
      sincronizarPerfil(perfilActualizado);
      setAjustandoFoto(false);
      setMensaje({ tipo: 'ok', texto: 'Encuadre de foto actualizado.' });
    },
    onError: (error: unknown) =>
      setMensaje({ tipo: 'error', texto: errorMessage(error, 'No pudimos ajustar la foto.') }),
  });

  const borrarFoto = useMutation({
    mutationFn: eliminarFotoPerfil,
    onSuccess: () => {
      queryClient.setQueryData(['profile'], (anterior: typeof perfil) =>
        anterior ? { ...anterior, fotoPerfilUrl: null, fotoPerfilEncuadre: ENCUADRE_INICIAL } : anterior,
      );
      queryClient.invalidateQueries({ queryKey: ['miembros-panel'] });
      queryClient.invalidateQueries({ queryKey: ['miembros'] });
      if (usuario && token) {
        setAuth({ ...usuario, fotoPerfilUrl: null, fotoPerfilEncuadre: ENCUADRE_INICIAL }, token);
      }
      setMensaje({ tipo: 'ok', texto: 'Foto de perfil eliminada.' });
    },
    onError: (error: unknown) =>
      setMensaje({ tipo: 'error', texto: errorMessage(error, 'No pudimos eliminar la foto.') }),
  });

  const cambiarContrasena = useMutation({
    mutationFn: () => changePassword(passwordActual, passwordNueva),
    onSuccess: () => {
      setPasswordActual('');
      setPasswordNueva('');
      setPasswordConfirmacion('');
      setMensaje({ tipo: 'ok', texto: 'Contraseña actualizada correctamente.' });
    },
    onError: (error: unknown) =>
      setMensaje({ tipo: 'error', texto: errorMessage(error, 'No pudimos cambiar la contraseña.') }),
  });

  const plan = currentOrg?.planEfectivo ?? currentOrg?.plan ?? perfil?.plan ?? 'FREE';
  const beneficioPro = currentOrg?.beneficioPro;
  const nombreCompleto = [perfil?.nombre, perfil?.apellido].filter(Boolean).join(' ') || 'Usuario';
  const fotoOcupada = subirFoto.isPending || borrarFoto.isPending;
  const contrasenasCoinciden = !passwordConfirmacion || passwordNueva === passwordConfirmacion;
  const fotoEncuadre = perfil?.fotoPerfilEncuadre ?? ENCUADRE_INICIAL;

  const seleccionarFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];
    event.target.value = '';
    if (archivo) subirFoto.mutate(archivo);
  };

  const abrirAjuste = () => {
    setEncuadre(fotoEncuadre);
    setAjustandoFoto(true);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-700 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <ProfileAvatar
            nombre={perfil?.nombre}
            apellido={perfil?.apellido}
            fotoUrl={perfil?.fotoPerfilUrl}
            encuadre={fotoEncuadre}
            size="lg"
            className="border-emerald-200"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Mi cuenta</p>
            <h1 className="mt-2 truncate text-3xl font-bold">{nombreCompleto}</h1>
            <p className="mt-1 truncate text-sm text-emerald-100">{perfil?.email}</p>
            <div className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
              {beneficioPro ? 'Pro temporal' : plan === 'PRO' ? 'Plan Pro' : 'Plan Free'}
            </div>
          </div>
        </div>
      </section>

      {mensaje && (
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${mensaje.tipo === 'ok' ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-200' : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200'}`}>
          <CheckCircle2 size={17} />
          {mensaje.texto}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <Camera size={19} className="text-emerald-600" />
            <h2 className="font-bold text-gray-900 dark:text-white">Foto de perfil</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Tocá tu foto para verla completa. Formatos JPG, PNG o WEBP, hasta 5 MB.
          </p>
          <input ref={inputFotoRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={seleccionarFoto} />
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => inputFotoRef.current?.click()} disabled={fotoOcupada} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50">
              <Upload size={16} />
              {subirFoto.isPending ? 'Subiendo...' : 'Elegir imagen'}
            </button>
            {perfil?.fotoPerfilUrl && (
              <button type="button" onClick={abrirAjuste} disabled={fotoOcupada} className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/30">
                <SlidersHorizontal size={16} />
                Ajustar imagen
              </button>
            )}
            {perfil?.fotoPerfilUrl && (
              <button type="button" onClick={() => borrarFoto.mutate()} disabled={fotoOcupada} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/70 dark:text-red-300 dark:hover:bg-red-950/30">
                <Trash2 size={16} />
                {borrarFoto.isPending ? 'Eliminando...' : 'Eliminar'}
              </button>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <UserRound size={19} className="text-emerald-600" />
            <h2 className="font-bold text-gray-900 dark:text-white">Información de la cuenta</h2>
          </div>
          <dl className="mt-5 space-y-4 text-sm">
            <InfoRow label="Email" value={perfil?.email ?? '-'} />
            <InfoRow label="Rol" value={perfil?.rol ?? 'Miembro'} />
            <InfoRow label="Miembro desde" value={profileQuery.data?.createdAt ? new Intl.DateTimeFormat('es-AR').format(new Date(profileQuery.data.createdAt)) : '-'} />
            <InfoRow label="Plan actual" value={beneficioPro ? `Pro temporal hasta ${new Intl.DateTimeFormat('es-AR').format(new Date(beneficioPro.fechaFin))}` : plan === 'PRO' ? 'Pro' : 'Free'} />
          </dl>
        </section>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">Nombre y apellido</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Actualizá cómo te ve el resto del equipo.</p>
          </div>
          {!editandoNombre && (
            <button type="button" onClick={() => { setNombre(perfil?.nombre ?? ''); setApellido(perfil?.apellido ?? ''); setEditandoNombre(true); }} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
              <Pencil size={15} />
              Editar
            </button>
          )}
        </div>
        {editandoNombre ? (
          <div className="mt-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Nombre<input value={nombre} onChange={(event) => setNombre(event.target.value)} maxLength={80} className="input mt-1.5" /></label>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Apellido<input value={apellido} onChange={(event) => setApellido(event.target.value)} maxLength={80} className="input mt-1.5" /></label>
            </div>
            <div className="mt-4 flex gap-3">
              <button type="button" onClick={() => actualizarNombre.mutate()} disabled={actualizarNombre.isPending || nombre.trim().length < 2 || apellido.trim().length < 2} className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50">{actualizarNombre.isPending ? 'Guardando...' : 'Guardar cambios'}</button>
              <button type="button" onClick={() => setEditandoNombre(false)} className="px-3 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">Cancelar</button>
            </div>
          </div>
        ) : <p className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">{nombreCompleto}</p>}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <KeyRound size={19} className="text-emerald-600" />
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">Seguridad</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Cambiá tu contraseña periódicamente.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <input type="password" placeholder="Contraseña actual" value={passwordActual} onChange={(event) => setPasswordActual(event.target.value)} className="input" />
          <input type="password" placeholder="Nueva contraseña" value={passwordNueva} onChange={(event) => setPasswordNueva(event.target.value)} className="input" />
          <input type="password" placeholder="Confirmar contraseña" value={passwordConfirmacion} onChange={(event) => setPasswordConfirmacion(event.target.value)} className="input" />
        </div>
        {!contrasenasCoinciden && <p className="mt-2 text-sm text-red-600 dark:text-red-300">Las contraseñas no coinciden.</p>}
        <button type="button" onClick={() => cambiarContrasena.mutate()} disabled={cambiarContrasena.isPending || !passwordActual || passwordNueva.length < 8 || !contrasenasCoinciden} className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-emerald-700 dark:hover:bg-emerald-600">{cambiarContrasena.isPending ? 'Actualizando...' : 'Cambiar contraseña'}</button>
      </section>

      {ajustandoFoto && perfil?.fotoPerfilUrl && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
          <section className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">Ajustar imagen</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Mové el encuadre y acercá la foto como prefieras.</p>
              </div>
              <button type="button" onClick={() => setAjustandoFoto(false)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Cerrar ajuste"><X size={18} /></button>
            </div>
            <div className="mx-auto mt-5 h-56 w-56 overflow-hidden rounded-full border-4 border-emerald-100 bg-emerald-950 shadow-inner dark:border-emerald-900">
              <img src={perfil.fotoPerfilUrl} alt="Vista previa del encuadre" className="h-full w-full object-cover" style={{ objectPosition: `${encuadre.posicionX}% ${encuadre.posicionY}%`, transform: `scale(${encuadre.escala})` }} />
            </div>
            <div className="mt-6 space-y-4">
              <RangeControl label="Horizontal" value={encuadre.posicionX} min={0} max={100} onChange={(posicionX) => setEncuadre((actual) => ({ ...actual, posicionX }))} />
              <RangeControl label="Vertical" value={encuadre.posicionY} min={0} max={100} onChange={(posicionY) => setEncuadre((actual) => ({ ...actual, posicionY }))} />
              <RangeControl label="Zoom" value={encuadre.escala} min={1} max={2} step={0.05} displayValue={`${Math.round(encuadre.escala * 100)}%`} onChange={(escala) => setEncuadre((actual) => ({ ...actual, escala }))} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setAjustandoFoto(false)} className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Cancelar</button>
              <button type="button" onClick={() => guardarEncuadre.mutate()} disabled={guardarEncuadre.isPending} className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50">{guardarEncuadre.isPending ? 'Guardando...' : 'Guardar encuadre'}</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function RangeControl({ label, value, min, max, step = 1, displayValue, onChange }: { label: string; value: number; min: number; max: number; step?: number; displayValue?: string; onChange: (value: number) => void }) {
  return (
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
      <span className="flex justify-between"><span>{label}</span><span className="text-gray-500 dark:text-gray-400">{displayValue ?? `${value}%`}</span></span>
      <input className="mt-2 w-full accent-emerald-700" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-gray-700"><dt className="text-gray-500 dark:text-gray-400">{label}</dt><dd className="truncate text-right font-semibold text-gray-900 dark:text-white">{value}</dd></div>;
}

function errorMessage(error: unknown, fallback: string) {
  const responseMessage = (error as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
  if (Array.isArray(responseMessage)) return responseMessage.join(', ');
  return responseMessage ?? (error instanceof Error ? error.message : fallback);
}
