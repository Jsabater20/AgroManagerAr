import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers,
  updateUserPlan,
  deleteUser,
  otorgarBeneficioPro,
  revocarBeneficioPro,
} from '../../api/users.api';
import { useAuthStore } from '../../store/auth.store';
import { Link, Navigate } from 'react-router-dom';
import { Trash2, AlertCircle, Building2, Lock, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

// ─── CONSTANTES ───────────────────────────────────────────────────────────
const DEMO_EMAIL = 'demo@agromanager.ar';

// Superadmin real del sistema (no puede eliminarse ni cambiar a FREE)
const SUPERADMIN_OWNER_EMAILS = [
  'joaquinsabater@agromanagerar.com',
];

export default function AdminPage() {
  const usuario = useAuthStore((s) => s.usuario);
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [planModal, setPlanModal] = useState<number | null>(null);
  const [beneficioModal, setBeneficioModal] = useState<number | null>(null);
  const [organizacionBeneficioId, setOrganizacionBeneficioId] = useState<number | ''>('');
  const [duracionBeneficio, setDuracionBeneficio] = useState(3);
  const [motivoBeneficio, setMotivoBeneficio] = useState('Beneficio promocional');
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

  const mutBeneficio = useMutation({
    mutationFn: ({ organizacionId, duracionMeses, motivo }: { organizacionId: number; duracionMeses: number; motivo: string }) =>
      otorgarBeneficioPro(organizacionId, duracionMeses, motivo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setBeneficioModal(null);
      flash('Beneficio Pro temporal actualizado.');
    },
    onError: () => toast.error('No se pudo otorgar el beneficio Pro temporal.'),
  });

  const mutRevocarBeneficio = useMutation({
    mutationFn: (id: number) => revocarBeneficioPro(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      flash('Beneficio Pro temporal revocado.');
    },
    onError: () => toast.error('No se pudo revocar el beneficio.'),
  });

  const currentUser = users.find((u) => u.id === planModal);
  const usuarioBeneficio = users.find((u) => u.id === beneficioModal);
  const organizacionesDelUsuarioBeneficio = (usuarioBeneficio?.vinculosOrganizacion ?? [])
    .filter((vinculo) => vinculo.tipo === 'OWNER');
  const organizacionBeneficioSeleccionada = organizacionesDelUsuarioBeneficio.find(
    (vinculo) => vinculo.organizacion.id === organizacionBeneficioId,
  );
  const isDemoAccount = currentUser?.email === DEMO_EMAIL;
  const isSuperadminOwner = currentUser && SUPERADMIN_OWNER_EMAILS.includes(currentUser.email.toLowerCase());

  const handlePlanChange = (plan: 'FREE' | 'PRO') => {
    if (!currentUser) return;

    // Demo nunca puede cambiar plan (siempre PRO)
    if (isDemoAccount) {
      setPlanError('La cuenta demo siempre debe tener Plan PRO');
      return;
    }

    // Superadmin owner siempre PRO
    if (isSuperadminOwner && plan === 'FREE') {
      setPlanError('El administrador del sistema debe tener Plan PRO');
      return;
    }

    setPlanError('');
    mutPlan.mutate({ id: currentUser.id, plan });
  };

  const abrirBeneficio = (userId: number) => {
    const usuarioSeleccionado = users.find((usuarioItem) => usuarioItem.id === userId);
    const primeraOrganizacion = usuarioSeleccionado?.vinculosOrganizacion?.find(
      (vinculo) => vinculo.tipo === 'OWNER',
    );
    setOrganizacionBeneficioId(primeraOrganizacion?.organizacion.id ?? '');
    setDuracionBeneficio(3);
    setMotivoBeneficio('Beneficio promocional');
    setBeneficioModal(userId);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de administración</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión global de usuarios, planes y vínculos con establecimientos</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/empresas"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
          >
            <Building2 size={16} />
            Empresas
          </Link>
          <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-lg font-medium">
            {users.length} usuarios
          </span>
        </div>
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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="min-w-[1280px] w-full text-sm">
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
                  Tipo
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs uppercase tracking-wider">
                  Pertenece a
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
              {users.map((u) => {
                const isDemoUser = u.email === DEMO_EMAIL;
                const isSuperOwner = SUPERADMIN_OWNER_EMAILS.includes(u.email.toLowerCase());
                const organizacionesPropias = (u.vinculosOrganizacion ?? []).filter(
                  (vinculo) => vinculo.tipo === 'OWNER',
                );
                
                return (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-medium">#{u.id}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {u.nombre} {u.apellido}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{u.email}</td>
                    <td className="px-4 py-3">
                      {isDemoUser && (
                        <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
                          Demo
                        </span>
                      )}
                      {isSuperOwner && (
                        <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                          Superadmin
                        </span>
                      )}
                      {!isDemoUser && !isSuperOwner && (
                        <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Usuario
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setPlanModal(u.id);
                          setPlanError('');
                        }}
                        disabled={mutPlan.isPending || isDemoUser}
                        title={isDemoUser ? 'Demo siempre PRO' : ''}
                        className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${
                          u.plan === 'PRO'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {u.plan || 'FREE'}
                        {isDemoUser && <Lock size={12} className="inline ml-1" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          u.rolGlobal === 'SUPERADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {u.rolGlobal || 'USER'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {u.vinculosOrganizacion?.length ? (
                        <div className="space-y-1">
                          {u.vinculosOrganizacion.map((vinculo) => (
                            <div key={`${vinculo.tipo}-${vinculo.organizacion.id}`} className="text-xs leading-snug text-gray-600">
                              <span className={`mr-1 rounded px-1.5 py-0.5 font-semibold ${vinculo.tipo === 'OWNER' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                                {vinculo.tipo === 'OWNER' ? 'Owner' : 'Miembro'}
                              </span>
                              {vinculo.tipo === 'OWNER'
                                ? `de ${vinculo.organizacion.nombre}`
                                : `de ${vinculo.owner.nombre} ${vinculo.owner.apellido} · ${vinculo.organizacion.nombre}`}
                              {vinculo.beneficioPro && (
                                <p className="mt-1 text-emerald-700">
                                  Pro temporal hasta {new Date(vinculo.beneficioPro.fechaFin).toLocaleDateString('es-AR')}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Sin establecimiento</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString('es-AR')
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                      <button
                        onClick={() => abrirBeneficio(u.id)}
                        disabled={organizacionesPropias.length === 0}
                        title={organizacionesPropias.length === 0 ? 'Solo se puede otorgar a organizaciones del owner' : 'Otorgar Pro temporal'}
                        className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Gift size={16} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(u.id)}
                        disabled={mutDelete.isPending || isDemoUser || isSuperOwner}
                        title={isDemoUser ? 'No eliminar demo' : isSuperOwner ? 'No eliminar superadmin' : 'Eliminar usuario'}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {planModal && currentUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Cambiar plan de {currentUser.nombre} {currentUser.apellido}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{currentUser.email}</p>

            {isDemoAccount && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex gap-2">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  Esta es la cuenta demo (datos se reinician cada 24hs). Siempre debe estar en PRO.
                </p>
              </div>
            )}

            {isSuperadminOwner && !isDemoAccount && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex gap-2">
                <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Este es el administrador del sistema. Debe mantener Plan PRO.
                </p>
              </div>
            )}

            {planError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs mb-4 flex gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                {planError}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handlePlanChange('FREE')}
                disabled={isDemoAccount || mutPlan.isPending}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                FREE
              </button>
              <button
                onClick={() => handlePlanChange('PRO')}
                disabled={mutPlan.isPending}
                className="flex-1 px-3 py-2 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 disabled:opacity-50 transition-colors"
              >
                PRO
              </button>
            </div>

            <button
              onClick={() => setPlanModal(null)}
              className="w-full mt-3 px-3 py-2 rounded-lg text-gray-600 text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {beneficioModal && usuarioBeneficio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700"><Gift size={19} /></div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Otorgar Pro temporal</h3>
                <p className="mt-1 text-sm text-gray-500">{usuarioBeneficio.nombre} {usuarioBeneficio.apellido}</p>
              </div>
            </div>

            <p className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">
              No cambia el plan contratado. Al vencer vuelve a Free, salvo que tenga Pro pago. Los datos guardados se conservan.
            </p>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Organización
              <select value={organizacionBeneficioId} onChange={(event) => setOrganizacionBeneficioId(Number(event.target.value))} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                {organizacionesDelUsuarioBeneficio.map((vinculo) => (
                  <option key={vinculo.organizacion.id} value={vinculo.organizacion.id}>{vinculo.organizacion.nombre}</option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Duración (meses)
              <input type="number" min="1" max="36" value={duracionBeneficio} onChange={(event) => setDuracionBeneficio(Number(event.target.value))} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </label>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Motivo (opcional)
              <textarea value={motivoBeneficio} onChange={(event) => setMotivoBeneficio(event.target.value)} maxLength={300} rows={2} className="mt-1.5 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </label>

            {organizacionBeneficioSeleccionada?.beneficioPro && (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                <span>Vigente hasta {new Date(organizacionBeneficioSeleccionada.beneficioPro.fechaFin).toLocaleDateString('es-AR')}.</span>
                <button type="button" onClick={() => {
                  if (window.confirm('¿Revocar este beneficio Pro temporal?')) {
                    mutRevocarBeneficio.mutate(organizacionBeneficioSeleccionada.beneficioPro!.id);
                  }
                }} disabled={mutRevocarBeneficio.isPending} className="font-semibold text-red-700 hover:text-red-800 disabled:opacity-50">Revocar</button>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setBeneficioModal(null)} className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancelar</button>
              <button type="button" onClick={() => organizacionBeneficioId && mutBeneficio.mutate({ organizacionId: organizacionBeneficioId, duracionMeses: duracionBeneficio, motivo: motivoBeneficio })} disabled={!organizacionBeneficioId || duracionBeneficio < 1 || duracionBeneficio > 36 || mutBeneficio.isPending} className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50">{mutBeneficio.isPending ? 'Guardando...' : 'Otorgar Pro'}</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              ¿Eliminar este usuario?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => mutDelete.mutate(confirmDelete)}
                disabled={mutDelete.isPending}
                className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50 transition-colors"
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
