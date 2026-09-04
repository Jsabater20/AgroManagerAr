import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
  UserCog,
  Users,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { ownerAdminApi } from '../../api/owner-admin.api';
import { camposApi } from '../../api/campos.api';

const ROLES = [
  'OPERARIO',
  'MECANICO',
  'ADMINISTRADOR',
  'CONTADOR',
  'VETERINARIO',
] as const;

const ROL_DESCRIPCIONES: Record<(typeof ROLES)[number], string> = {
  OPERARIO: 'Realiza las tareas que le asignás y usa solo los accesos que habilites.',
  MECANICO: 'Trabaja sobre mantenimientos y tareas vinculadas a maquinaria.',
  ADMINISTRADOR: 'Puede colaborar en la gestión diaria según los accesos que habilites.',
  CONTADOR: 'Consulta o registra información financiera cuando le habilitás esos módulos.',
  VETERINARIO: 'Accede a la información ganadera que necesitás compartirle.',
};

const MODULOS_DISPONIBLES = [
  'Dashboard',
  'Campos',
  'Cultivos',
  'Siembras',
  'Insumos',
  'Ganadería',
  'Tareas',
  'Maquinarias',
  'Finanzas',
  'Reportes',
  'Clima',
];

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
  modulos: Array<{ moduloNombre: string; activo: boolean }>;
};

type CampoDisponible = {
  id: number;
  nombre: string;
};

export function OwnerPanelPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const orgIdNum = Number(orgId || 0);
  const queryClient = useQueryClient();

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const miembrosQuery = useQuery({
    queryKey: ['owner-panel-miembros', orgIdNum],
    queryFn: () => ownerAdminApi.obtenerMiembrosPanel(orgIdNum),
    enabled: orgIdNum > 0,
  });

  const miembros = (miembrosQuery.data ?? []) as MiembroPanel[];

  const selectedMember = useMemo(
    () => miembros.find((m) => m.id === selectedMemberId) ?? miembros[0] ?? null,
    [miembros, selectedMemberId],
  );

  const recursosQuery = useQuery({
    queryKey: ['owner-panel-recursos', orgIdNum, selectedMember?.id ?? null],
    queryFn: async () => {
      if (!selectedMember) return [];
      return ownerAdminApi.obtenerRecursosAsignables(orgIdNum, selectedMember.id);
    },
    enabled: orgIdNum > 0 && !!selectedMember,
  });

  const camposQuery = useQuery<CampoDisponible[]>({
    queryKey: ['campos-organizacion', orgIdNum],
    queryFn: () => camposApi.getAll(),
    enabled: orgIdNum > 0,
  });

  const nombresCampos = useMemo(
    () =>
      new Map(
        (camposQuery.data ?? []).map((campo) => [campo.id, campo.nombre.trim()]),
      ),
    [camposQuery.data],
  );

  const cambiarRolMutation = useMutation({
    mutationFn: ({
      usuarioOrgId,
      nuevoRol,
    }: {
      usuarioOrgId: number;
      nuevoRol: string;
    }) => ownerAdminApi.cambiarRolMiembro(orgIdNum, usuarioOrgId, nuevoRol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owner-panel-miembros', orgIdNum] });
      toast.success('Rol actualizado');
    },
    onError: () => {
      toast.error('No se pudo actualizar el rol');
    },
  });

  const toggleActivoMutation = useMutation({
    mutationFn: ({ usuarioOrgId, activo }: { usuarioOrgId: number; activo: boolean }) => {
      if (activo) return ownerAdminApi.activarMiembro(orgIdNum, usuarioOrgId);
      return ownerAdminApi.suspenderMiembro(orgIdNum, usuarioOrgId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owner-panel-miembros', orgIdNum] });
      toast.success('Estado actualizado');
    },
    onError: () => {
      toast.error('No se pudo actualizar el estado');
    },
  });

  const toggleModuloMutation = useMutation({
    mutationFn: ({
      usuarioOrgId,
      moduloNombre,
      activo,
    }: {
      usuarioOrgId: number;
      moduloNombre: string;
      activo: boolean;
    }) => ownerAdminApi.actualizarModulo(orgIdNum, usuarioOrgId, moduloNombre, activo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owner-panel-miembros', orgIdNum] });
      toast.success('Permiso actualizado');
    },
    onError: () => {
      toast.error('No se pudo actualizar el permiso');
    },
  });

  const toggleRecursoMutation = useMutation({
    mutationFn: ({
      usuarioOrgId,
      recursoId,
      asignado,
    }: {
      usuarioOrgId: number;
      recursoId: number;
      asignado: boolean;
    }) => {
      if (asignado) {
        return ownerAdminApi.retirarRecurso(orgIdNum, usuarioOrgId, 'CAMPO', recursoId);
      }
      return ownerAdminApi.asignarRecurso(orgIdNum, usuarioOrgId, 'CAMPO', recursoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['owner-panel-recursos', orgIdNum, selectedMember?.id ?? null],
      });
      toast.success('Recurso actualizado');
    },
    onError: () => {
      toast.error('No se pudo actualizar el recurso');
    },
  });

  if (miembrosQuery.isLoading) {
    return (
      <div className="flex min-h-[220px] items-center justify-center gap-2 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Cargando personal...
      </div>
    );
  }

  if (!miembros.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
        No hay miembros en esta organización.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <UserCog className="h-4 w-4 text-emerald-600" />
          <h2 className="text-base font-semibold text-gray-900">
            Elegí la persona que querés configurar
          </h2>
        </div>

        <label className="block text-sm">
          <span className="mb-1.5 block text-gray-700">Persona del equipo</span>
          <select
            value={selectedMember?.id ?? miembros[0].id}
            onChange={(e) => setSelectedMemberId(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {miembros.map((member) => (
              <option key={member.id} value={member.id}>
                {member.nombre} {member.apellido}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedMember && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedMember.nombre} {selectedMember.apellido}
                </p>
                <p className="text-sm text-gray-500">{selectedMember.email}</p>
              </div>

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
                    cambiarRolMutation.mutate({
                      usuarioOrgId: selectedMember.id,
                      nuevoRol: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {ROLES.map((rol) => (
                    <option key={rol} value={rol}>
                      {rol}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  {ROL_DESCRIPCIONES[selectedMember.rol as keyof typeof ROL_DESCRIPCIONES] ??
                    'El rol describe su responsabilidad. Los accesos se configuran por separado.'}
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-gray-700">Estado</label>
                <div className="flex gap-2">
                  {selectedMember.activo ? (
                    <button
                      type="button"
                      onClick={() =>
                        toggleActivoMutation.mutate({
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
                        toggleActivoMutation.mutate({
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

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Accesos de trabajo</h3>
            </div>

            <div className="mb-3 mt-1 rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              Primero definí las pantallas que puede usar. Después indicá los campos sobre los que puede trabajar.
            </div>

            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Pantallas que puede usar
              </p>
              <div className="grid grid-cols-2 gap-2">
                {MODULOS_DISPONIBLES.map((moduloNombre) => {
                  const activo = selectedMember.modulos.some(
                    (modulo) => modulo.moduloNombre === moduloNombre && modulo.activo,
                  );

                  return (
                    <button
                      key={moduloNombre}
                      type="button"
                      disabled={toggleModuloMutation.isPending}
                      onClick={() =>
                        toggleModuloMutation.mutate({
                          usuarioOrgId: selectedMember.id,
                          moduloNombre,
                          activo: !activo,
                        })
                      }
                      className={`rounded-lg border px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                        activo
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      }`}
                    >
                      {moduloNombre}: {activo ? 'Puede acceder' : 'Sin acceso'}
                    </button>
                  );
                })}
              </div>
            </div>

            {recursosQuery.isLoading ? (
              <div className="flex items-center justify-center py-8 text-sm text-gray-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando recursos...
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Campos a los que puede acceder
                </p>
                {recursosQuery.data?.map((recurso) => (
                  <div
                    key={`${recurso.tipo}-${recurso.id}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {nombresCampos.get(recurso.id) ||
                          recurso.nombre?.trim() ||
                          `Campo #${recurso.id}`}
                      </p>
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
                      {recurso.asignado ? 'Asignado' : 'Sin acceso'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Users className="h-4 w-4 text-emerald-600" />
          Miembros activos
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {miembros.map((member) => (
            <div
              key={member.id}
              className={`rounded-xl border px-3 py-2 text-sm ${
                selectedMember?.id === member.id
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedMemberId(member.id)}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800">
                    {member.nombre} {member.apellido}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      member.activo
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {member.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-500">{member.rol}</div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
