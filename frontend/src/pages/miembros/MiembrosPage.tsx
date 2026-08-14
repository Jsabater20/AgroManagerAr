import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ChevronDown,
  ChevronRight,
  Loader2,
  UserPlus,
  Users,
  BriefcaseBusiness,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { api } from '../../api/client';
import { useAuthStore } from '../../store/auth.store';
import { usePermissions } from '../../hooks/usePermissions';

const ROLE_OPTIONS = [
  'OPERARIO',
  'MECANICO',
  'ADMINISTRADOR',
  'CONTADOR',
  'VETERINARIO',
] as const;

type RoleOption = (typeof ROLE_OPTIONS)[number];

type MemberListItem = {
  id: number;
  usuarioId: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaIncorporacion: string;
  actividades?: {
    pendientes?: number;
    enProgreso?: number;
    completadas?: number;
  };
  recursosCampos?: string[];
};

type RecursoAsignable = {
  id: number;
  nombre: string;
  tipo: string;
  asignado: boolean;
};

type ActividadEntrada = {
  id?: number;
  titulo: string;
  descripcion?: string;
  recursoRelacionado?: string;
  fechaInicio?: string;
  fechaFin?: string;
  horarioInicio?: string;
  horarioFin?: string;
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  observacionInicial?: string;
};

export default function MiembrosPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const orgIdNum = Number(orgId || 0);
  const queryClient = useQueryClient();

  const usuario = useAuthStore((s) => s.usuario);
  const currentOrg = useAuthStore((s) => s.currentOrg());
  const { isOwner, isMember, isSuperAdmin, isLoading } = usePermissions();

  const canManageMembers = Boolean(isSuperAdmin || isOwner);

  const [openSections, setOpenSections] = useState({
    invitar: true,
    personal: true,
    trabajos: true,
  });

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const [inviteForm, setInviteForm] = useState({
    email: '',
    rol: 'OPERARIO' as RoleOption,
    mensaje: '',
  });

  const [assignWorkForm, setAssignWorkForm] = useState<ActividadEntrada>({
    titulo: '',
    descripcion: '',
    recursoRelacionado: '',
    fechaInicio: '',
    fechaFin: '',
    horarioInicio: '',
    horarioFin: '',
    prioridad: 'MEDIA',
    observacionInicial: '',
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const miembrosQuery = useQuery({
    queryKey: ['miembros-page', orgIdNum],
    queryFn: async () => {
      const res = await api.get<MemberListItem[]>(`/organizaciones/${orgIdNum}/miembros`);
      return res.data;
    },
    enabled: !!orgIdNum && orgIdNum > 0,
  });

  const members = miembrosQuery.data ?? [];

  useEffect(() => {
    if (!members.length) return;

    if (!selectedMemberId) {
      setSelectedMemberId(members[0].id);
      return;
    }

    const exists = members.some((m) => m.id === selectedMemberId);
    if (!exists) {
      setSelectedMemberId(members[0].id);
    }
  }, [members, selectedMemberId]);

  const selectedMember = useMemo(
    () => members.find((m) => m.id === selectedMemberId) ?? null,
    [members, selectedMemberId],
  );

  const recursosQuery = useQuery({
    queryKey: ['miembros-recursos', orgIdNum, selectedMemberId],
    queryFn: async () => {
      if (!selectedMemberId) return [];
      const res = await api.get<RecursoAsignable[]>(
        `/organizaciones/${orgIdNum}/panel/recursos/${selectedMemberId}`,
      );
      return res.data;
    },
    enabled: canManageMembers && !!orgIdNum && !!selectedMemberId,
  });

  const inviteMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        email: inviteForm.email.trim(),
        rol: inviteForm.rol,
        mensaje: inviteForm.mensaje.trim() || undefined,
      };

      const res = await api.post(`/organizaciones/${orgIdNum}/miembros/invitar`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Invitación enviada');
      setInviteForm({ email: '', rol: 'OPERARIO', mensaje: '' });
      queryClient.invalidateQueries({ queryKey: ['invitaciones-page', orgIdNum] });
    },
    onError: () => {
      toast.error('No se pudo enviar la invitación');
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: async ({ usuarioOrgId, nuevoRol }: { usuarioOrgId: number; nuevoRol: string }) => {
      const res = await api.patch(`/organizaciones/${orgIdNum}/panel/miembros/${usuarioOrgId}/rol`, {
        nuevoRol,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['miembros-page', orgIdNum] });
      toast.success('Rol actualizado');
    },
    onError: () => {
      toast.error('No se pudo actualizar el rol');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ usuarioOrgId, activo }: { usuarioOrgId: number; activo: boolean }) => {
      if (activo) {
        return api.patch(`/organizaciones/${orgIdNum}/panel/miembros/${usuarioOrgId}/activar`, {});
      }

      return api.patch(`/organizaciones/${orgIdNum}/panel/miembros/${usuarioOrgId}/suspender`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['miembros-page', orgIdNum] });
      toast.success('Estado actualizado');
    },
    onError: () => {
      toast.error('No se pudo actualizar el estado');
    },
  });

  const toggleRecursoMutation = useMutation({
    mutationFn: async ({
      usuarioOrgId,
      recursoId,
      asignado,
    }: {
      usuarioOrgId: number;
      recursoId: number;
      asignado: boolean;
    }) => {
      if (asignado) {
        return api.post(`/organizaciones/${orgIdNum}/panel/recursos/${usuarioOrgId}/retirar`, {
          recursoTipo: 'CAMPO',
          recursoId,
        });
      }

      return api.post(`/organizaciones/${orgIdNum}/panel/recursos/${usuarioOrgId}/asignar`, {
        recursoTipo: 'CAMPO',
        recursoId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['miembros-recursos', orgIdNum, selectedMemberId] });
      toast.success('Recurso actualizado');
    },
    onError: () => {
      toast.error('No se pudo actualizar el recurso');
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        titulo: assignWorkForm.titulo,
        descripcion: assignWorkForm.descripcion || undefined,
        recursoRelacionado: assignWorkForm.recursoRelacionado || undefined,
        fechaInicio: assignWorkForm.fechaInicio || undefined,
        fechaFin: assignWorkForm.fechaFin || undefined,
        horarioInicio: assignWorkForm.horarioInicio || undefined,
        horarioFin: assignWorkForm.horarioFin || undefined,
        prioridad: assignWorkForm.prioridad,
        observacionInicial: assignWorkForm.observacionInicial || undefined,
      };

      const res = await api.post(`/organizaciones/${orgIdNum}/actividades`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Trabajo asignado');
      setAssignWorkForm({
        titulo: '',
        descripcion: '',
        recursoRelacionado: '',
        fechaInicio: '',
        fechaFin: '',
        horarioInicio: '',
        horarioFin: '',
        prioridad: 'MEDIA',
        observacionInicial: '',
      });
      queryClient.invalidateQueries({ queryKey: ['miembros-page', orgIdNum] });
    },
    onError: () => {
      toast.error('No se pudo asignar el trabajo');
    },
  });

  if (isLoading || !usuario) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!canManageMembers && !isMember) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-gray-500">
        No tienes acceso a esta sección.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Miembros</h1>
          <p className="text-sm text-gray-500">
            Organización: {currentOrg?.nombre ?? 'Sin organización'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AccordionSection
          title="Invitar miembro"
          open={openSections.invitar}
          onToggle={() => toggleSection('invitar')}
          icon={<UserPlus className="h-4 w-4" />}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block text-gray-700">Email</span>
              <input
                type="email"
                value={inviteForm.email}
                onChange={(e) =>
                  setInviteForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="ejemplo@agromanager.ar"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block text-gray-700">Rol inicial</span>
              <select
                value={inviteForm.rol}
                onChange={(e) =>
                  setInviteForm((prev) => ({
                    ...prev,
                    rol: e.target.value as RoleOption,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {ROLE_OPTIONS.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm md:col-span-2">
              <span className="mb-1.5 block text-gray-700">Mensaje opcional</span>
              <textarea
                value={inviteForm.mensaje}
                onChange={(e) =>
                  setInviteForm((prev) => ({ ...prev, mensaje: e.target.value }))
                }
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Ej: Bienvenido, te invitamos a colaborar en el equipo..."
              />
            </label>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              disabled={inviteMutation.isPending || !inviteForm.email.trim()}
              onClick={() => inviteMutation.mutate()}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <UserPlus className="h-4 w-4" />
              {inviteMutation.isPending ? 'Enviando...' : 'Enviar invitación'}
            </button>
          </div>
        </AccordionSection>

        {canManageMembers && (
          <AccordionSection
            title="Administración del personal"
            open={openSections.personal}
            onToggle={() => toggleSection('personal')}
            icon={<ShieldCheck className="h-4 w-4" />}
          >
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-gray-700">Miembro</span>
                  <select
                    value={selectedMemberId ?? ''}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setSelectedMemberId(value);
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.nombre} {member.apellido}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {selectedMember && (
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        {selectedMember.nombre} {selectedMember.apellido}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          selectedMember.activo
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {selectedMember.activo ? 'ACTIVO' : 'INACTIVO'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-700">Rol</label>
                        <select
                          value={selectedMember.rol}
                          onChange={(e) =>
                            changeRoleMutation.mutate({
                              usuarioOrgId: selectedMember.id,
                              nuevoRol: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {ROLE_OPTIONS.map((rol) => (
                            <option key={rol} value={rol}>
                              {rol}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm text-gray-700">Estado</label>
                        <div className="flex gap-2">
                          {selectedMember.activo ? (
                            <button
                              type="button"
                              onClick={() =>
                                toggleActiveMutation.mutate({
                                  usuarioOrgId: selectedMember.id,
                                  activo: false,
                                })
                              }
                              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                              Dar de baja
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                toggleActiveMutation.mutate({
                                  usuarioOrgId: selectedMember.id,
                                  activo: true,
                                })
                              }
                              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Dar de alta
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-emerald-600" />
                      <h3 className="font-semibold text-gray-900">Recursos asignados</h3>
                    </div>

                    {recursosQuery.isLoading ? (
                      <div className="flex items-center justify-center py-6 text-sm text-gray-500">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cargando recursos...
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {recursosQuery.data?.map((recurso) => (
                          <div
                            key={`${recurso.tipo}-${recurso.id}`}
                            className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-800">{recurso.nombre}</p>
                              <p className="text-xs text-gray-500">{recurso.tipo}</p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                toggleRecursoMutation.mutate({
                                  usuarioOrgId: selectedMember.id,
                                  recursoId: recurso.id,
                                  asignado: recurso.asignado,
                                })
                              }
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                recurso.asignado
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {recurso.asignado ? 'ON' : 'OFF'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="mb-4 flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-semibold text-gray-900">Asignar trabajo</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm md:col-span-2">
                    <span className="mb-1.5 block text-gray-700">Título del trabajo</span>
                    <input
                      value={assignWorkForm.titulo}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({ ...prev, titulo: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Revisar alambrado"
                    />
                  </label>

                  <label className="block text-sm md:col-span-2">
                    <span className="mb-1.5 block text-gray-700">Descripción</span>
                    <textarea
                      rows={3}
                      value={assignWorkForm.descripcion}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({ ...prev, descripcion: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Detalle del trabajo..."
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1.5 block text-gray-700">Recurso relacionado</span>
                    <input
                      value={assignWorkForm.recursoRelacionado}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({
                          ...prev,
                          recursoRelacionado: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Campo Norte / Tractor 01"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1.5 block text-gray-700">Prioridad</span>
                    <select
                      value={assignWorkForm.prioridad}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({
                          ...prev,
                          prioridad: e.target.value as ActividadEntrada['prioridad'],
                        }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="BAJA">Baja</option>
                      <option value="MEDIA">Media</option>
                      <option value="ALTA">Alta</option>
                      <option value="URGENTE">Urgente</option>
                    </select>
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1.5 block text-gray-700">Fecha inicio</span>
                    <input
                      type="date"
                      value={assignWorkForm.fechaInicio}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({ ...prev, fechaInicio: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1.5 block text-gray-700">Fecha finalización</span>
                    <input
                      type="date"
                      value={assignWorkForm.fechaFin}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({ ...prev, fechaFin: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1.5 block text-gray-700">Horario inicio</span>
                    <input
                      type="time"
                      value={assignWorkForm.horarioInicio}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({ ...prev, horarioInicio: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1.5 block text-gray-700">Horario fin</span>
                    <input
                      type="time"
                      value={assignWorkForm.horarioFin}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({ ...prev, horarioFin: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="block text-sm md:col-span-2">
                    <span className="mb-1.5 block text-gray-700">Observación inicial</span>
                    <textarea
                      rows={2}
                      value={assignWorkForm.observacionInicial}
                      onChange={(e) =>
                        setAssignWorkForm((prev) => ({
                          ...prev,
                          observacionInicial: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Observación inicial opcional..."
                    />
                  </label>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => createActivityMutation.mutate()}
                    disabled={
                      createActivityMutation.isPending ||
                      !assignWorkForm.titulo.trim() ||
                      !selectedMember
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                    {createActivityMutation.isPending ? 'Guardando...' : '+ Asignar trabajo'}
                  </button>
                </div>
              </div>
            </div>
          </AccordionSection>
        )}

        <AccordionSection
          title="Miembros y trabajos"
          open={openSections.trabajos}
          onToggle={() => toggleSection('trabajos')}
          icon={<BriefcaseBusiness className="h-4 w-4" />}
        >
          {miembrosQuery.isLoading ? (
            <div className="flex items-center justify-center py-10 text-sm text-gray-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cargando miembros...
            </div>
          ) : !members.length ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              No hay miembros en esta organización.
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.nombre} {member.apellido}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
                          {member.rol}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 font-semibold ${
                            member.activo
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {member.activo ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      {member.recursosCampos?.length ? (
                        <span>{member.recursosCampos.length} recursos</span>
                      ) : (
                        <span>Sin recursos</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-gray-700">Trabajando en:</p>
                      <div className="space-y-2">
                        {(member.recursosCampos?.length ? member.recursosCampos : ['Sin recursos']).map(
                          (recurso, index) => (
                            <div
                              key={`${member.id}-recurso-${index}`}
                              className="rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-700"
                            >
                              {recurso}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-gray-700">Trabajos:</p>
                      <div className="space-y-2">
                        <div className="rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-700">
                          Revisar alambrado
                        </div>
                        <div className="rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-700">
                          15/08 → 18/08 · En progreso
                        </div>
                        <div className="rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-700">
                          20/08 → 21/08 · Pendiente
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AccordionSection>
      </div>
    </div>
  );
}

function AccordionSection({
  title,
  open,
  onToggle,
  icon,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            {icon}
          </div>
          <span className="text-base font-semibold text-gray-900">{title}</span>
        </div>

        {open ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {open && <div className="border-t border-gray-200 px-4 py-4">{children}</div>}
    </section>
  );
}