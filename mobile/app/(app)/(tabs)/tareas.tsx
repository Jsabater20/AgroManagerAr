import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cambiarEstadoActividadConSync,
  listActividades,
} from '@/api/actividades.api';
import { getApiErrorMessage } from '@/api/errors';
import { AccessRestricted } from '@/components/AccessRestricted';
import { ActivityObservationModal } from '@/components/ActivityObservationModal';
import { useAuthStore } from '@/store/auth.store';
import { useOfflineStore } from '@/store/offline.store';
import type { ActividadDashboard, EstadoActividad } from '@/types/dashboard';

const ACTIVE_STATES = new Set<EstadoActividad>(['PENDIENTE', 'EN_PROGRESO', 'PAUSADA']);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(new Date(value));

const getNextAction = (estado: EstadoActividad) => {
  if (estado === 'PENDIENTE') return { estado: 'EN_PROGRESO' as const, label: 'Iniciar' };
  if (estado === 'PAUSADA') return { estado: 'EN_PROGRESO' as const, label: 'Reanudar' };
  if (estado === 'EN_PROGRESO') return { estado: 'COMPLETADA' as const, label: 'Completar' };
  return null;
};

export default function TareasScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const userId = useAuthStore((state) => state.usuario?.id);
  const membresia = useAuthStore((state) => state.membresia);
  const membresiaOrganizacionId = useAuthStore((state) => state.membresiaOrganizacionId);
  const queryClient = useQueryClient();
  const isOnline = useOfflineStore((state) => state.isOnline);
  const pendingCount = useOfflineStore((state) => state.pendingCount);
  const isSyncing = useOfflineStore((state) => state.isSyncing);
  const [actividadParaObservar, setActividadParaObservar] =
    useState<ActividadDashboard | null>(null);
  const membershipReady = isOwner || membresiaOrganizacionId === organizacionActivaId;
  const canViewTasks =
    isOwner ||
    membresia?.modulos.some(
      (modulo) => modulo.moduloNombre === 'Tareas' && modulo.activo,
    ) === true;
  const activitiesQuery = useQuery({
    queryKey: ['actividades', organizacionActivaId],
    queryFn: () => listActividades(organizacionActivaId as number),
    enabled: Boolean(organizacionActivaId && membershipReady && canViewTasks),
  });
  const statusMutation = useMutation({
    mutationFn: ({ actividadId, estado }: { actividadId: number; estado: EstadoActividad }) => {
      if (!userId) throw new Error('Tu sesión no está disponible.');
      return cambiarEstadoActividadConSync(
        userId,
        organizacionActivaId as number,
        actividadId,
        estado,
      );
    },
    onSuccess: async (result, variables) => {
      if (result.queued) {
        queryClient.setQueryData<ActividadDashboard[]>(
          ['actividades', organizacionActivaId],
          (activities) =>
            activities?.map((activity) =>
              activity.id === variables.actividadId
                ? { ...activity, estado: variables.estado }
                : activity,
            ),
        );
        Alert.alert(
          'Trabajo guardado sin conexión',
          'El cambio se sincronizará automáticamente cuando vuelva la señal.',
        );
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['actividades', organizacionActivaId] }),
        queryClient.invalidateQueries({
          queryKey: ['dashboard-member-activities', organizacionActivaId],
        }),
      ]);
    },
    onError: (error: unknown) => {
      Alert.alert(
        'No pudimos actualizar el trabajo',
        getApiErrorMessage(error, 'Intentá nuevamente en unos instantes.'),
      );
    },
  });

  const changeStatus = (actividadId: number, estado: EstadoActividad) => {
    statusMutation.mutate({ actividadId, estado });
  };

  if (!membershipReady) return <TasksLoading />;
  if (!canViewTasks) return <AccessRestricted title="Tareas" />;
  if (activitiesQuery.isLoading) return <TasksLoading />;

  if (activitiesQuery.isError) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950 px-6">
        <Text className="text-center text-xl font-bold text-white">
          No pudimos cargar los trabajos
        </Text>
        <Text className="mt-2 text-center text-sm text-slate-600">
          {getApiErrorMessage(activitiesQuery.error, 'Intentá nuevamente en unos minutos.')}
        </Text>
        <Pressable
          className="mt-6 rounded-xl bg-emerald-700 px-5 py-3"
          onPress={() => void activitiesQuery.refetch()}
        >
          <Text className="font-semibold text-white">Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const activities = activitiesQuery.data ?? [];
  const activeActivities = activities
    .filter((activity) => activity.activo && ACTIVE_STATES.has(activity.estado))
    .sort(
      (first, second) =>
        new Date(first.fechaEstimadaFin).getTime() - new Date(second.fechaEstimadaFin).getTime(),
    );
  const finishedActivities = activities.filter(
    (activity) => !ACTIVE_STATES.has(activity.estado) || !activity.activo,
  );

  return (
    <>
      <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={
        <RefreshControl
          refreshing={activitiesQuery.isRefetching}
          onRefresh={() => void activitiesQuery.refetch()}
          tintColor="#6ee7b7"
        />
      }
    >
      <View className="border-b border-emerald-400/20 bg-[#0b4d32] px-6 pb-7 pt-16">
        <Text className="text-3xl font-bold text-white">
          {isOwner ? 'Trabajos del equipo' : 'Mis trabajos'}
        </Text>
        <Text className="mt-2 text-sm text-emerald-100">
          {isOwner
            ? 'Seguimiento de las actividades asignadas a tu equipo.'
            : 'Iniciá, pausá o completá las actividades que te asignaron.'}
        </Text>
        {!isOnline ? (
          <View className="mt-4 rounded-xl bg-amber-100 px-3 py-2">
            <Text className="text-sm font-semibold text-amber-900">
              Sin conexión. Tus cambios de trabajo se guardarán para sincronizarlos después.
            </Text>
          </View>
        ) : pendingCount > 0 ? (
          <View className="mt-4 rounded-xl bg-emerald-700 px-3 py-2">
            <Text className="text-sm font-semibold text-emerald-50">
              {isSyncing
                ? 'Sincronizando cambios guardados…'
                : `${pendingCount} cambio${pendingCount === 1 ? '' : 's'} pendiente${pendingCount === 1 ? '' : 's'} de sincronización.`}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="px-5 pt-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Activos ({activeActivities.length})
          </Text>
          {!isOwner && (
            <Text className="text-sm text-slate-500">Tu progreso se guarda al instante</Text>
          )}
        </View>

        <View className="mt-3 gap-3">
          {activeActivities.length === 0 ? (
            <EmptyActivities isOwner={isOwner} />
          ) : (
            activeActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isOwner={isOwner}
                isUpdating={statusMutation.isPending}
                onChangeStatus={changeStatus}
                onObserve={setActividadParaObservar}
              />
            ))
          )}
        </View>

        {finishedActivities.length > 0 && (
          <>
            <Text className="mt-8 text-sm font-bold uppercase tracking-widest text-slate-400">
              Finalizados ({finishedActivities.length})
            </Text>
            <View className="mt-3 gap-3">
              {finishedActivities.slice(0, 6).map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isOwner={isOwner}
                  isUpdating={false}
                  onChangeStatus={changeStatus}
                  onObserve={setActividadParaObservar}
                />
              ))}
            </View>
          </>
        )}
      </View>
      </ScrollView>
      <ActivityObservationModal
        actividad={actividadParaObservar}
        organizacionId={organizacionActivaId as number}
        onClose={() => setActividadParaObservar(null)}
      />
    </>
  );
}

function ActivityCard({
  activity,
  isOwner,
  isUpdating,
  onChangeStatus,
  onObserve,
}: {
  activity: ActividadDashboard;
  isOwner: boolean;
  isUpdating: boolean;
  onChangeStatus: (actividadId: number, estado: EstadoActividad) => void;
  onObserve: (actividad: ActividadDashboard) => void;
}) {
  const nextAction = getNextAction(activity.estado);
  const canPause = activity.estado === 'EN_PROGRESO';
  const assignedName = activity.usuarioOrganizacion?.usuario
    ? `${activity.usuarioOrganizacion.usuario.nombre} ${activity.usuarioOrganizacion.usuario.apellido}`.trim()
    : null;

  return (
    <View className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-white">{activity.titulo}</Text>
          <Text className="mt-1 text-sm text-slate-400">
            {activity.contexto || `${activity.recursoTipo}${activity.recursoId ? ` #${activity.recursoId}` : ''}`}
          </Text>
        </View>
        <StatusBadge estado={activity.estado} />
      </View>

      {activity.descripcion && (
        <Text className="mt-3 text-sm leading-5 text-slate-300">{activity.descripcion}</Text>
      )}

      <View className="mt-4 flex-row flex-wrap gap-x-4 gap-y-1 border-t border-slate-800 pt-4">
        <Text className="text-xs text-slate-400">
          {formatDate(activity.fechaInicio)} → {formatDate(activity.fechaEstimadaFin)}
        </Text>
        <Text className="text-xs font-semibold text-slate-300">Prioridad {activity.prioridad}</Text>
        {isOwner && assignedName && (
          <Text className="text-xs font-semibold text-emerald-700">Asignado a {assignedName}</Text>
        )}
      </View>

      <Pressable
        className="mt-4 items-center rounded-xl border border-emerald-800 bg-emerald-950 px-3 py-3"
        onPress={() => onObserve(activity)}
      >
        <Text className="font-semibold text-emerald-700">Agregar observación o foto</Text>
      </Pressable>

      {!isOwner && activity.activo && nextAction && (
        <View className="mt-5 flex-row gap-3">
          {canPause && (
            <Pressable
              className="flex-1 items-center rounded-xl border border-slate-200 px-3 py-3 disabled:opacity-50"
              disabled={isUpdating}
              onPress={() => onChangeStatus(activity.id, 'PAUSADA')}
            >
              <Text className="font-semibold text-slate-700">Pausar</Text>
            </Pressable>
          )}
          <Pressable
            className="flex-1 items-center rounded-xl bg-emerald-700 px-3 py-3 disabled:opacity-50"
            disabled={isUpdating}
            onPress={() => onChangeStatus(activity.id, nextAction.estado)}
          >
            <Text className="font-semibold text-white">{nextAction.label}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function StatusBadge({ estado }: { estado: EstadoActividad }) {
  const styleByState: Record<EstadoActividad, string> = {
    PENDIENTE: 'bg-amber-100 text-amber-800',
    EN_PROGRESO: 'bg-blue-100 text-blue-800',
    PAUSADA: 'bg-slate-200 text-slate-700',
    COMPLETADA: 'bg-emerald-100 text-emerald-800',
    CANCELADA: 'bg-red-100 text-red-700',
  };

  return (
    <Text className={`rounded-full px-2 py-1 text-xs font-semibold ${styleByState[estado]}`}>
      {estado.replace('_', ' ')}
    </Text>
  );
}

function EmptyActivities({ isOwner }: { isOwner: boolean }) {
  return (
    <View className="items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10">
      <Text className="text-4xl">✓</Text>
      <Text className="mt-4 text-lg font-bold text-slate-900">
        {isOwner ? 'No hay trabajos activos' : 'No tenés trabajos activos'}
      </Text>
      <Text className="mt-2 text-center text-sm text-slate-500">
        {isOwner
          ? 'Cuando asignes una actividad aparecerá acá para hacer seguimiento.'
          : 'El propietario puede asignarte una nueva actividad cuando la necesite.'}
      </Text>
    </View>
  );
}

function TasksLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <ActivityIndicator color="#15803d" size="large" />
      <Text className="mt-3 text-sm text-slate-500">Cargando trabajos…</Text>
    </View>
  );
}
