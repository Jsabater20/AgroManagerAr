import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BriefcaseBusiness,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { api } from '../../api/client';
import { ownerAdminApi } from '../../api/owner-admin.api';
import { recursosApi } from '../../api/recursos.api';
import { useAuthStore } from '../../store/auth.store';
import { usePermissions } from '../../hooks/usePermissions';

type RecursoTipo =
  | 'CAMPO'
  | 'LOTE'
  | 'SIEMBRA'
  | 'ANIMAL'
  | 'TAREA'
  | 'MAQUINARIA'
  | 'CAMPANIA'
  | 'GENERAL';

type RecursoItem = {
  id: number;
  nombre: string;
  tipo: string;
};

type MiembroPanel = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaIncorporacion: string;
  actividades: {
    pendientes: number;
    enProgreso: number;
    completadas: number;
  };
  recursosCampos: string[];
};

type ActivityForm = {
  miembroId: number | '';
  titulo: string;
  descripcion: string;
  recursoTipo: RecursoTipo | '';
  recursoId: number | null;
  fechaInicio: string;
  fechaFin: string;
  horarioInicio: string;
  horarioFin: string;
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  observacionInicial: string;
};

export default function MiembrosPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const orgIdNum = Number(orgId || 0);
  const queryClient = useQueryClient();

  const usuario = useAuthStore((s) => s.usuario);
  const currentOrg = useAuthStore((s) => s.currentOrg());
  const { isOwner, isMember, isSuperAdmin, isLoading } = usePermissions();

  const canManageMembers = Boolean(isSuperAdmin || isOwner);

  const [activityForm, setActivityForm] = useState<ActivityForm>({
    miembroId: '',
    titulo: '',
    descripcion: '',
    recursoTipo: '',
    recursoId: null,
    fechaInicio: '',
    fechaFin: '',
    horarioInicio: '',
    horarioFin: '',
    prioridad: 'MEDIA',
    observacionInicial: '',
  });

  const miembrosQuery = useQuery({
    queryKey: ['miembros-panel', orgIdNum],
    queryFn: () => ownerAdminApi.obtenerMiembrosPanel(orgIdNum),
    enabled: orgIdNum > 0,
  });

  const miembros = (miembrosQuery.data ?? []) as MiembroPanel[];

  const activeMembers = useMemo(
    () => miembros.filter((m) => m.activo),
    [miembros],
  );

  const recursoTipoOptions = [
    { value: 'CAMPO', label: 'Campo' },
    { value: 'LOTE', label: 'Lote' },
    { value: 'SIEMBRA', label: 'Siembra' },
    { value: 'ANIMAL', label: 'Animal' },
    { value: 'TAREA', label: 'Tarea' },
    { value: 'MAQUINARIA', label: 'Maquinaria' },
    { value: 'CAMPANIA', label: 'Campaña' },
    { value: 'GENERAL', label: 'General' },
  ] as const;

  const recursosQuery = useQuery<RecursoItem[]>({
    queryKey: ['recursos-por-tipo', orgIdNum, activityForm.recursoTipo],
    queryFn: async (): Promise<RecursoItem[]> => {
      if (!activityForm.recursoTipo || activityForm.recursoTipo === 'GENERAL') {
        return [] as RecursoItem[];
      }

      const recursos = await recursosApi.obtenerPorTipo(activityForm.recursoTipo);
      return recursos.map((item: any) => ({
        id: item.id,
        nombre: item.nombre ?? 'Sin nombre',
        tipo: activityForm.recursoTipo,
      }));
    },
    enabled: orgIdNum > 0 && !!activityForm.recursoTipo && activityForm.recursoTipo !== 'GENERAL',
  });

  const validarAccesoMutation = useMutation({
    mutationFn: async () => {
      if (!activityForm.miembroId || !activityForm.recursoTipo) {
        return { tieneAcceso: true, necesitaConfirmacion: false };
      }

      if (activityForm.recursoTipo === 'GENERAL') {
        return { tieneAcceso: true, necesitaConfirmacion: false };
      }

      const miembroSeleccionado = activeMembers.find(
        (m) => m.id === Number(activityForm.miembroId),
      );

      if (!miembroSeleccionado) {
        return { tieneAcceso: false, necesitaConfirmacion: false };
      }

      const res = await api.get(
        `/organizaciones/${orgIdNum}/panel/recursos/${miembroSeleccionado.id}`,
      );

      const recursos = res.data ?? [];
      const recursoAsignado = recursos.some(
        (r: any) =>
          String(r.tipo).toUpperCase() === String(activityForm.recursoTipo) &&
          Number(r.id) === Number(activityForm.recursoId),
      );

      return {
        tieneAcceso: recursoAsignado,
        necesitaConfirmacion: !recursoAsignado,
        nombreMiembro: `${miembroSeleccionado.nombre} ${miembroSeleccionado.apellido}`,
        nombreRecurso:
          recursosQuery.data?.find((r) => Number(r.id) === Number(activityForm.recursoId))
            ?.nombre ?? 'recurso seleccionado',
      };
    },
  });

  const createActividadMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        usuarioOrganizacionId: Number(activityForm.miembroId),
        titulo: activityForm.titulo,
        descripcion: activityForm.descripcion || undefined,
        recursoTipo:
          activityForm.recursoTipo === 'GENERAL' ? 'GENERAL' : activityForm.recursoTipo,
        recursoId:
          activityForm.recursoTipo === 'GENERAL' ? null : Number(activityForm.recursoId),
        fechaInicio: activityForm.fechaInicio || undefined,
        fechaEstimadaFin: activityForm.fechaFin || undefined,
        horarioInicio: activityForm.horarioInicio || undefined,
        horarioFin: activityForm.horarioFin || undefined,
        prioridad: activityForm.prioridad,
        observacionInicial: activityForm.observacionInicial || undefined,
      };

      const res = await api.post(`/organizaciones/${orgIdNum}/actividades`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Trabajo asignado correctamente.');
      setActivityForm({
        miembroId: '',
        titulo: '',
        descripcion: '',
        recursoTipo: '',
        recursoId: null,
        fechaInicio: '',
        fechaFin: '',
        horarioInicio: '',
        horarioFin: '',
        prioridad: 'MEDIA',
        observacionInicial: '',
      });
      queryClient.invalidateQueries({ queryKey: ['miembros-panel', orgIdNum] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || 'No se pudo asignar el trabajo.');
    },
  });

  const grantAccessAndCreateMutation = useMutation({
    mutationFn: async () => {
      if (
        !activityForm.miembroId ||
        !activityForm.recursoTipo ||
        activityForm.recursoTipo === 'GENERAL' ||
        !activityForm.recursoId
      ) {
        return;
      }

      await api.post(
        `/organizaciones/${orgIdNum}/panel/recursos/${Number(activityForm.miembroId)}/asignar`,
        {
          recursoTipo: activityForm.recursoTipo,
          recursoId: Number(activityForm.recursoId),
        },
      );

      return createActividadMutation.mutateAsync();
    },
    onSuccess: () => {
      toast.success('Acceso otorgado y trabajo asignado.');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || 'No se pudo otorgar acceso ni asignar el trabajo.');
    },
  });

  const canSubmit =
    !!activityForm.miembroId &&
    !!activityForm.titulo.trim() &&
    (!!activityForm.recursoTipo && activityForm.recursoTipo !== 'GENERAL'
      ? !!activityForm.recursoId
      : true);

  const hasRecursoList =
    !!activityForm.recursoTipo &&
    activityForm.recursoTipo !== 'GENERAL' &&
    (recursosQuery.data ?? []).length > 0;

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
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asignar trabajo</h1>
          <p className="text-sm text-gray-500">
            Organización: {currentOrg?.nombre ?? 'Sin organización'}
          </p>
        </div>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <BriefcaseBusiness className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Nueva actividad</h2>
            <p className="text-xs text-gray-500">
              Asignar una tarea a un miembro y vincularla a un recurso real si aplica
            </p>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-gray-700">Miembro</span>
              <select
                value={activityForm.miembroId}
                onChange={(e) =>
                  setActivityForm((prev) => ({
                    ...prev,
                    miembroId: e.target.value ? Number(e.target.value) : '',
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Seleccionar miembro</option>
                {activeMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.nombre} {member.apellido}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-gray-700">Prioridad</span>
              <select
                value={activityForm.prioridad}
                onChange={(e) =>
                  setActivityForm((prev) => ({
                    ...prev,
                    prioridad: e.target.value as ActivityForm['prioridad'],
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </label>

            <label className="block text-sm md:col-span-2">
              <span className="mb-1.5 block font-medium text-gray-700">Título del trabajo</span>
              <input
                value={activityForm.titulo}
                onChange={(e) =>
                  setActivityForm((prev) => ({ ...prev, titulo: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Ej: Revisar alambrado del campo norte"
              />
            </label>

            <label className="block text-sm md:col-span-2">
              <span className="mb-1.5 block font-medium text-gray-700">Descripción</span>
              <textarea
                rows={3}
                value={activityForm.descripcion}
                onChange={(e) =>
                  setActivityForm((prev) => ({ ...prev, descripcion: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Detalle de la actividad..."
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-gray-700">Tipo de recurso</span>
              <select
                value={activityForm.recursoTipo}
                onChange={(e) => {
                  const nextTipo = e.target.value as RecursoTipo | '';
                  setActivityForm((prev) => ({
                    ...prev,
                    recursoTipo: nextTipo,
                    recursoId: null,
                  }));
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Seleccionar tipo</option>
                {recursoTipoOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-gray-700">Recurso real</span>
              {activityForm.recursoTipo && activityForm.recursoTipo !== 'GENERAL' ? (
                recursosQuery.isLoading ? (
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cargando recursos...
                  </div>
                ) : (recursosQuery.data ?? []).length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500">
                    No hay {recursoTipoOptions
                      .find((opt) => opt.value === activityForm.recursoTipo)
                      ?.label.toLowerCase() ?? 'recursos'} registradas en esta organización.
                  </div>
                ) : (
                  <select
                    value={String(activityForm.recursoId ?? '')}
                    onChange={(e) =>
                      setActivityForm((prev) => ({
                        ...prev,
                        recursoId: e.target.value ? Number(e.target.value) : null,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="">Seleccionar recurso</option>
                    {(recursosQuery.data ?? []).map((recurso) => (
                      <option key={recurso.id} value={recurso.id}>
                        {recurso.nombre}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500">
                  {activityForm.recursoTipo === 'GENERAL'
                    ? 'La actividad general no requiere recurso.'
                    : 'Selecciona un tipo de recurso para cargar los existentes.'}
                </div>
              )}
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-gray-700">Fecha inicio</span>
              <input
                type="date"
                value={activityForm.fechaInicio}
                onChange={(e) =>
                  setActivityForm((prev) => ({ ...prev, fechaInicio: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-gray-700">Fecha finalización</span>
              <input
                type="date"
                value={activityForm.fechaFin}
                onChange={(e) =>
                  setActivityForm((prev) => ({ ...prev, fechaFin: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-gray-700">Horario inicio</span>
              <input
                type="time"
                value={activityForm.horarioInicio}
                onChange={(e) =>
                  setActivityForm((prev) => ({ ...prev, horarioInicio: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-gray-700">Horario fin</span>
              <input
                type="time"
                value={activityForm.horarioFin}
                onChange={(e) =>
                  setActivityForm((prev) => ({ ...prev, horarioFin: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block text-sm md:col-span-2">
              <span className="mb-1.5 block font-medium text-gray-700">Observación inicial</span>
              <textarea
                rows={2}
                value={activityForm.observacionInicial}
                onChange={(e) =>
                  setActivityForm((prev) => ({
                    ...prev,
                    observacionInicial: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Observación opcional..."
              />
            </label>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              disabled={
                createActividadMutation.isPending ||
                grantAccessAndCreateMutation.isPending ||
                !canSubmit ||
                (activityForm.recursoTipo !== 'GENERAL' && !hasRecursoList)
              }
              onClick={async () => {
                if (!activityForm.miembroId || !activityForm.recursoTipo) {
                  createActividadMutation.mutate();
                  return;
                }

                if (activityForm.recursoTipo === 'GENERAL') {
                  createActividadMutation.mutate();
                  return;
                }

                const validation = await validarAccesoMutation.mutateAsync();

                if (!validation?.tieneAcceso) {
                  const ok = window.confirm(
                    `${validation?.nombreMiembro ?? 'Este miembro'} todavía no tiene acceso a ${validation?.nombreRecurso ?? 'este recurso'}. ¿Querés otorgarle acceso para realizar este trabajo?`,
                  );

                  if (!ok) return;

                  grantAccessAndCreateMutation.mutate();
                  return;
                }

                createActividadMutation.mutate();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createActividadMutation.isPending || grantAccessAndCreateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Asignando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Asignar trabajo
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
