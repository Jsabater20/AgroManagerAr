import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';
import { ROLES_DISPONIBLES } from '../../constants/roles';
import { CARGOS_EQUIPO, nombreCargo, type CargoEquipo } from '../../constants/cargosEquipo';
import { usePermissions } from '../../hooks/usePermissions';
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

const AYUDA_ROLES: Record<RolOrganizacion, string> = {
  OWNER: 'Control total de la organización. Este rol es solo para la persona propietaria.',
  ADMIN: 'Puede administrar el equipo y operar los módulos que le habilites.',
  OPERARIO: 'Recibe trabajos y accede únicamente a los módulos y recursos que le habilites.',
  CONTADOR: 'Ideal para registrar y consultar la información financiera autorizada.',
  MECANICO: 'Ideal para trabajar con maquinarias, mantenimientos y tareas relacionadas.',
  ASESOR: 'Puede consultar la información técnica que decidas compartirle.',
  CONTRATISTA: 'Acceso puntual y limitado para realizar trabajos específicos.',
};

export default function OrganizationMembersPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState<RolOrganizacion>('OPERARIO');
  const [cargoInput, setCargoInput] = useState<CargoEquipo>('OPERARIO_RURAL');
  const [cargoPersonalizadoInput, setCargoPersonalizadoInput] = useState('');
  const [responsableInput, setResponsableInput] = useState('');
  const [mensajeInput, setMensajeInput] = useState('');
  const queryClient = useQueryClient();
  const { isOwner } = usePermissions();

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

  const miembroActualQuery = useQuery({
    queryKey: ['miembro-actual', orgIdNum],
    queryFn: () => organizacionesApi.obtenerMiembroActual(orgIdNum),
    enabled: !!orgIdNum && !isOwner,
    retry: false,
  });
  const puedeGestionarEquipo = isOwner || !!miembroActualQuery.data?.puedeGestionarEquipo;

  // Query: Invitaciones pendientes
  const { data: invitaciones = [], isLoading: invitacionesLoading } =
    useQuery({
      queryKey: ['invitaciones', orgIdNum],
      queryFn: () => organizacionesApi.obtenerInvitaciones(orgIdNum),
      enabled: !!orgIdNum && puedeGestionarEquipo,
    });

  const usoMiembrosQuery = useQuery({
    queryKey: ['miembros-uso', orgIdNum],
    queryFn: () => organizacionesApi.obtenerUsoMiembros(orgIdNum),
    enabled: !!orgIdNum && isOwner,
  });
  const usoMiembros = usoMiembrosQuery.data as
    | {
        plan: 'FREE' | 'PRO';
        miembros: { usados: number; limite: number | null };
        actividades: { usadas: number; limite: number | null };
      }
    | undefined;
  const miembrosAlLimite =
    usoMiembros?.plan === 'FREE' &&
    usoMiembros.miembros.limite !== null &&
    usoMiembros.miembros.usados >= usoMiembros.miembros.limite;

  // Mutation: Invitar miembro
  const inviteMutation = useMutation({
    mutationFn: (dto: { email: string; rol: string; mensaje?: string; cargo?: string; cargoPersonalizado?: string; responsableId?: number }) =>
      organizacionesApi.invitarMiembro(orgIdNum, dto),
    onSuccess: () => {
      toast.success('Invitación enviada');
      setEmailInput('');
      setRoleInput('OPERARIO');
      setCargoInput('OPERARIO_RURAL');
      setCargoPersonalizadoInput('');
      setResponsableInput('');
      setMensajeInput('');
      queryClient.invalidateQueries({ queryKey: ['invitaciones', orgIdNum] });
      queryClient.invalidateQueries({ queryKey: ['miembros-uso', orgIdNum] });
    },
    onError: (err: unknown) => {
      const error = err as { response?: { data?: { message?: string } } } | null;
      toast.error(error?.response?.data?.message || 'Error al invitar');
    },
  });

  const actualizarEstructuraMutation = useMutation({
    mutationFn: ({ usuarioOrgId, dto }: { usuarioOrgId: number; dto: { cargo: string; cargoPersonalizado?: string; responsableId?: number | null; puedeGestionarEquipo: boolean } }) =>
      organizacionesApi.actualizarEstructuraEquipo(orgIdNum, usuarioOrgId, dto),
    onSuccess: () => {
      toast.success('Estructura del equipo actualizada');
      queryClient.invalidateQueries({ queryKey: ['miembros', orgIdNum] });
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudo actualizar la estructura'),
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
      queryClient.invalidateQueries({ queryKey: ['invitaciones', orgIdNum] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || 'Error al reenviar invitación');
    },
  });

  // Mutation: Cancelar invitación
  const cancelInviteMutation = useMutation({
    mutationFn: (invitacionId: number) =>
      organizacionesApi.cancelarInvitacion(orgIdNum, invitacionId),
    onSuccess: () => {
      toast.success('Invitación cancelada');
      queryClient.invalidateQueries({ queryKey: ['invitaciones', orgIdNum] });
      queryClient.invalidateQueries({ queryKey: ['miembros-uso', orgIdNum] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || 'Error al cancelar invitación');
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
      cargo: cargoInput,
      cargoPersonalizado: cargoInput === 'OTRO' ? cargoPersonalizadoInput.trim() || undefined : undefined,
      responsableId: isOwner && responsableInput ? Number(responsableInput) : undefined,
    });
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Mail className="text-green-600" size={32} />
          Invitar al equipo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Enviá una invitación. Después definís qué puede ver cada persona y qué trabajos puede realizar.
        </p>
        {usoMiembros?.plan === 'FREE' && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">Plan Free</span>
            <span className="rounded-full border border-slate-200 px-2.5 py-1 text-slate-600">
              Miembros: {usoMiembros.miembros.usados} / {usoMiembros.miembros.limite}
            </span>
            <span className="rounded-full border border-slate-200 px-2.5 py-1 text-slate-600">
              Trabajos activos: {usoMiembros.actividades.usadas} / {usoMiembros.actividades.limite}
            </span>
          </div>
        )}
      </div>

      {miembrosAlLimite && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span>Alcanzaste el límite del plan Free. Pasate a Pro para agregar más miembros y trabajos.</span>
          <button
            type="button"
            onClick={() => navigate('/precios')}
            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
          >
            Ver Pro
          </button>
        </div>
      )}

      {/* SECCIÓN: Agregar nuevo miembro */}
      <section className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
        <p className="font-semibold">¿Qué pasa después de enviar la invitación?</p>
        <ol className="mt-2 grid gap-2 text-emerald-900/80 dark:text-emerald-100/80 md:grid-cols-3">
          <li><strong>1.</strong> La persona recibe un email con su invitación.</li>
          <li><strong>2.</strong> Se registra o inicia sesión para aceptar y sumarse al equipo.</li>
          <li><strong>3.</strong> Vos definís sus accesos y le asignás trabajos cuando lo necesite.</li>
        </ol>
      </section>

      <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Plus size={20} className="text-green-600" />
          Datos de la invitación
        </h2>
        <form onSubmit={handleInvite} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rol inicial <span className="text-red-500">*</span>
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
              <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {AYUDA_ROLES[roleInput]}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email de la persona invitada <span className="text-red-500">*</span>
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Función dentro del establecimiento
              </label>
              <select
                value={cargoInput}
                onChange={(event) => setCargoInput(event.target.value as CargoEquipo)}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium cursor-pointer"
              >
                {CARGOS_EQUIPO.map((cargo) => (
                  <option key={cargo.value} value={cargo.value}>{cargo.label}</option>
                ))}
              </select>
              {cargoInput === 'OTRO' && (
                <input
                  value={cargoPersonalizadoInput}
                  onChange={(event) => setCargoPersonalizadoInput(event.target.value)}
                  placeholder="Ej. Responsable de riego"
                  maxLength={80}
                  className="mt-2 w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              )}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">El cargo describe su función. Los accesos se configuran después.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Responsable directo
              </label>
              {isOwner ? (
                <select
                  value={responsableInput}
                  onChange={(event) => setResponsableInput(event.target.value)}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium cursor-pointer"
                >
                  <option value="">Sin asignar por ahora</option>
                  {miembros.filter((miembro) => miembro.puedeGestionarEquipo).map((miembro) => (
                    <option key={miembro.id} value={miembro.id}>{miembro.usuario.nombre} {miembro.usuario.apellido} · {nombreCargo(miembro.cargo, miembro.cargoPersonalizado)}</option>
                  ))}
                </select>
              ) : (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
                  La persona quedará incorporada a tu equipo. El owner podrá reorganizarla cuando lo necesite.
                </div>
              )}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Cada integrante trabaja dentro de un equipo del mismo establecimiento.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Mensaje para la invitación <span className="text-gray-400">(opcional)</span>
            </label>
            <textarea
              value={mensajeInput}
              onChange={(e) => setMensajeInput(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              placeholder="Ej: Te invitamos a sumarte al equipo de trabajo..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="submit"
              disabled={inviteMutation.isPending || miembrosAlLimite || !puedeGestionarEquipo}
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
                  Enviar invitación
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
            Invitaciones esperando aceptación ({invitaciones.length})
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
            Personas que ya forman parte del equipo ({miembros.length})
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
                  <div className="flex flex-1 items-center gap-3">
                    <ProfileAvatar nombre={miembro.usuario.nombre} apellido={miembro.usuario.apellido} fotoUrl={miembro.fotoPerfilUrl} encuadre={miembro.fotoPerfilEncuadre} size="md" />
                    <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {miembro.usuario.nombre} {miembro.usuario.apellido}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {miembro.usuario.email}
                    </p>
                    </div>
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

                    {isOwner && <button
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
                    </button>}

                    {isOwner && <button
                      onClick={() =>
                        deleteMutation.mutate(miembro.id)
                      }
                      disabled={deleteMutation.isPending}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Eliminar miembro"
                    >
                      <Trash2 size={16} />
                    </button>}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-900/60 sm:grid-cols-3">
                    <div><span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Función</span><span className="mt-1 block font-semibold text-slate-900 dark:text-white">{nombreCargo(miembro.cargo, miembro.cargoPersonalizado)}</span></div>
                    <div><span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Responsable</span><span className="mt-1 block font-semibold text-slate-900 dark:text-white">{miembro.responsable ? `${miembro.responsable.nombre} ${miembro.responsable.apellido}` : 'Owner / sin asignar'}</span></div>
                    <div><span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Equipo a cargo</span><span className="mt-1 block font-semibold text-slate-900 dark:text-white">{miembro.puedeGestionarEquipo ? `${miembro.personasACargo} integrante${miembro.personasACargo === 1 ? '' : 's'}` : 'No gestiona equipo'}</span></div>
                  </div>

                  {isOwner && (
                    <EstructuraEquipoForm
                      miembro={miembro}
                      miembros={miembros}
                      guardando={actualizarEstructuraMutation.isPending}
                      onGuardar={(dto) => actualizarEstructuraMutation.mutate({ usuarioOrgId: miembro.id, dto })}
                    />
                  )}

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

function EstructuraEquipoForm({
  miembro,
  miembros,
  guardando,
  onGuardar,
}: {
  miembro: MiembroOrganizacion;
  miembros: MiembroOrganizacion[];
  guardando: boolean;
  onGuardar: (dto: { cargo: string; cargoPersonalizado?: string; responsableId?: number | null; puedeGestionarEquipo: boolean }) => void;
}) {
  const [cargo, setCargo] = useState<CargoEquipo>(miembro.cargo as CargoEquipo);
  const [cargoPersonalizado, setCargoPersonalizado] = useState(miembro.cargoPersonalizado || '');
  const [responsableId, setResponsableId] = useState(miembro.responsable?.id ? String(miembro.responsable.id) : '');
  const [puedeGestionarEquipo, setPuedeGestionarEquipo] = useState(miembro.puedeGestionarEquipo);

  useEffect(() => {
    setCargo(miembro.cargo as CargoEquipo);
    setCargoPersonalizado(miembro.cargoPersonalizado || '');
    setResponsableId(miembro.responsable?.id ? String(miembro.responsable.id) : '');
    setPuedeGestionarEquipo(miembro.puedeGestionarEquipo);
  }, [miembro]);

  return (
    <form
      className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-500/30 dark:bg-emerald-500/10"
      onSubmit={(event) => {
        event.preventDefault();
        onGuardar({
          cargo,
          cargoPersonalizado: cargo === 'OTRO' ? cargoPersonalizado.trim() || undefined : undefined,
          responsableId: responsableId ? Number(responsableId) : null,
          puedeGestionarEquipo,
        });
      }}
    >
      <p className="text-sm font-bold text-emerald-950 dark:text-emerald-100">Organización del equipo</p>
      <p className="mt-1 text-xs text-emerald-900/80 dark:text-emerald-100/80">Solo el owner define cargos, responsables y quién puede incorporar integrantes.</p>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">Cargo
          <select value={cargo} onChange={(event) => setCargo(event.target.value as CargoEquipo)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
            {CARGOS_EQUIPO.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">Responsable directo
          <select value={responsableId} onChange={(event) => setResponsableId(event.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
            <option value="">Owner / sin asignar</option>
            {miembros.filter((persona) => persona.id !== miembro.id && persona.puedeGestionarEquipo).map((persona) => <option key={persona.id} value={persona.id}>{persona.usuario.nombre} {persona.usuario.apellido}</option>)}
          </select>
        </label>
        <label className="flex items-end gap-2 pb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <input type="checkbox" checked={puedeGestionarEquipo} onChange={(event) => setPuedeGestionarEquipo(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
          Puede invitar integrantes a su equipo
        </label>
      </div>
      {cargo === 'OTRO' && <input value={cargoPersonalizado} onChange={(event) => setCargoPersonalizado(event.target.value)} maxLength={80} placeholder="Nombre del cargo" className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white" />}
      <button type="submit" disabled={guardando} className="mt-3 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 disabled:opacity-50">{guardando ? 'Guardando...' : 'Guardar estructura'}</button>
    </form>
  );
}
