import { useQuery } from '@tanstack/react-query';
import { BriefcaseBusiness, Loader2, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { listActividades } from '../../api/actividades.api';
import { ownerAdminApi } from '../../api/owner-admin.api';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';

type MiembroPanel = {
  id: number;
  nombre: string;
  apellido: string;
  fotoPerfilUrl?: string | null;
  fotoPerfilEncuadre?: {
    posicionX: number;
    posicionY: number;
    escala: number;
  };
  email: string;
  rol: string;
  activo: boolean;
  recursosCampos: string[];
};

type ActividadMiembro = {
  id: number;
  titulo: string;
  descripcion?: string;
  recursoTipo: string;
  recursoId?: number | null;
  fechaInicio: string;
  fechaEstimadaFin: string;
  horarioInicio?: string | null;
  horarioFin?: string | null;
  prioridad: string;
  estado: string;
  usuarioOrganizacionId: number;
};

const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString('es-AR') : 'Sin fecha';

export default function MiembrosTrabajosPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const orgIdNum = Number(orgId || 0);

  const miembrosQuery = useQuery<MiembroPanel[]>({
    queryKey: ['miembros-panel', orgIdNum],
    queryFn: () => ownerAdminApi.obtenerMiembrosPanel(orgIdNum),
    enabled: orgIdNum > 0,
  });

  const actividadesQuery = useQuery<ActividadMiembro[]>({
    queryKey: ['actividades', orgIdNum],
    queryFn: () => listActividades(orgIdNum),
    enabled: orgIdNum > 0,
  });

  const miembros = miembrosQuery.data ?? [];
  const actividades = actividadesQuery.data ?? [];
  const loading = miembrosQuery.isLoading || actividadesQuery.isLoading;

  if (loading) {
    return (
      <div className="flex min-h-[220px] items-center justify-center gap-2 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Cargando miembros y trabajos...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <header>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-600">
          <Users className="h-3.5 w-3.5" />
          Miembros
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Miembros y trabajos</h1>
        <p className="text-sm text-gray-500">Estado del equipo, sus recursos y actividades asignadas.</p>
      </header>

      {miembros.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
          No hay miembros en esta organización.
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {miembros.map((miembro) => {
            const trabajos = actividades.filter(
              (actividad) => actividad.usuarioOrganizacionId === miembro.id,
            );

            return (
              <article key={miembro.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <ProfileAvatar nombre={miembro.nombre} apellido={miembro.apellido} fotoUrl={miembro.fotoPerfilUrl} encuadre={miembro.fotoPerfilEncuadre} size="md" />
                    <div className="min-w-0">
                    <h2 className="font-semibold text-gray-900">{miembro.nombre} {miembro.apellido}</h2>
                    <p className="text-sm text-gray-500">{miembro.email} · {miembro.rol}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${miembro.activo ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {miembro.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Recursos asignados</p>
                  <p className="mt-1 text-sm text-gray-700">{miembro.recursosCampos.length ? miembro.recursosCampos.join(', ') : 'Sin recursos asignados'}</p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <BriefcaseBusiness className="h-4 w-4 text-emerald-600" />
                    Trabajos ({trabajos.length})
                  </div>
                  {trabajos.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-gray-200 px-3 py-3 text-sm text-gray-500">Sin trabajos asignados.</p>
                  ) : trabajos.map((trabajo) => (
                    <div key={trabajo.id} className="rounded-xl border border-gray-200 p-3 text-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-gray-900">{trabajo.titulo}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{trabajo.recursoTipo}{trabajo.recursoId ? ` #${trabajo.recursoId}` : ''} · {trabajo.estado}</p>
                        </div>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">{trabajo.prioridad}</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">{formatDate(trabajo.fechaInicio)} → {formatDate(trabajo.fechaEstimadaFin)}{trabajo.horarioInicio ? ` · ${trabajo.horarioInicio}` : ''}{trabajo.horarioFin ? ` - ${trabajo.horarioFin}` : ''}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
