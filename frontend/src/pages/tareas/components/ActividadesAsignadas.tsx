import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, Clock3, Loader2, PauseCircle, PlayCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { cambiarEstadoActividad, listActividades } from '../../../api/actividades.api';

interface ActividadAsignada {
  id: number;
  titulo: string;
  descripcion?: string | null;
  recursoTipo: string;
  recursoId?: number | null;
  fechaInicio: string;
  fechaEstimadaFin: string;
  prioridad: string;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'PAUSADA' | 'COMPLETADA' | 'CANCELADA';
}

const formatDate = (fecha: string) =>
  new Date(fecha).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const siguienteEstado = (estado: ActividadAsignada['estado']) => {
  if (estado === 'PENDIENTE') return { valor: 'EN_PROGRESO', etiqueta: 'Iniciar', Icon: PlayCircle };
  if (estado === 'EN_PROGRESO') return { valor: 'COMPLETADA', etiqueta: 'Completar', Icon: CheckCircle2 };
  if (estado === 'PAUSADA') return { valor: 'EN_PROGRESO', etiqueta: 'Reanudar', Icon: PlayCircle };
  return null;
};

export function ActividadesAsignadas({ organizacionId }: { organizacionId: number }) {
  const queryClient = useQueryClient();
  const actividadesQuery = useQuery<ActividadAsignada[]>({
    queryKey: ['actividades', organizacionId],
    queryFn: () => listActividades(organizacionId),
    enabled: organizacionId > 0,
  });

  const cambiarEstadoMutation = useMutation({
    mutationFn: ({ actividadId, estado }: { actividadId: number; estado: string }) =>
      cambiarEstadoActividad(organizacionId, actividadId, { estado }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades', organizacionId] });
      toast.success('Estado actualizado');
    },
    onError: () => toast.error('No se pudo actualizar el estado'),
  });

  if (actividadesQuery.isLoading) {
    return (
      <div className="flex min-h-[220px] items-center justify-center gap-2 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Cargando trabajos asignados...
      </div>
    );
  }

  const actividades = actividadesQuery.data ?? [];

  if (actividades.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
        No tenés trabajos asignados por el momento.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis trabajos</h1>
        <p className="mt-1 text-sm text-gray-500">Actividades asignadas por el propietario.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {actividades.map((actividad) => {
          const siguiente = siguienteEstado(actividad.estado);

          return (
            <article key={actividad.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-900">{actividad.titulo}</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {actividad.recursoTipo}
                    {actividad.recursoId ? ` #${actividad.recursoId}` : ''}
                  </p>
                </div>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                  {actividad.prioridad}
                </span>
              </div>

              {actividad.descripcion && (
                <p className="mt-3 text-sm text-gray-600">{actividad.descripcion}</p>
              )}

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Clock3 className="h-4 w-4" />
                {formatDate(actividad.fechaInicio)} al {formatDate(actividad.fechaEstimadaFin)}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <span className="text-xs font-semibold text-gray-700">{actividad.estado.replace('_', ' ')}</span>
                {siguiente && (
                  <button
                    type="button"
                    disabled={cambiarEstadoMutation.isPending}
                    onClick={() =>
                      cambiarEstadoMutation.mutate({
                        actividadId: actividad.id,
                        estado: siguiente.valor,
                      })
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                  >
                    <siguiente.Icon className="h-4 w-4" />
                    {siguiente.etiqueta}
                  </button>
                )}
                {actividad.estado === 'EN_PROGRESO' && (
                  <button
                    type="button"
                    disabled={cambiarEstadoMutation.isPending}
                    onClick={() =>
                      cambiarEstadoMutation.mutate({
                        actividadId: actividad.id,
                        estado: 'PAUSADA',
                      })
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                  >
                    <PauseCircle className="h-4 w-4" />
                    Pausar
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
