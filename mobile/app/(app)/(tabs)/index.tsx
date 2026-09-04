import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Href, router } from 'expo-router';
import { listActividades } from '@/api/actividades.api';
import { getOwnerDashboard } from '@/api/dashboard.api';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';
import type { ActividadDashboard, OwnerDashboardData, TareaDashboard } from '@/types/dashboard';

const ACTIVE_ACTIVITY_STATES = new Set(['PENDIENTE', 'EN_PROGRESO', 'PAUSADA']);
const ACTIVE_TASK_STATES = new Set(['PENDIENTE', 'EN_CURSO']);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(new Date(value));

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);

const isExpiredTask = (task: TareaDashboard) => {
  if (!ACTIVE_TASK_STATES.has(task.estado)) return false;
  const taskDate = new Date(task.fechaLimite ?? task.fechaProgramada);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return taskDate < today;
};

export default function HomeScreen() {
  const usuario = useAuthStore((state) => state.usuario);
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const currentOrganization = useAuthStore((state) => state.currentOrganization);
  const isOwner = useAuthStore((state) => state.isOwner());
  const membresia = useAuthStore((state) => state.membresia);
  const membresiaOrganizacionId = useAuthStore((state) => state.membresiaOrganizacionId);
  const organizacion = currentOrganization();
  const membershipReady = isOwner || membresiaOrganizacionId === organizacionActivaId;
  const canViewDashboard =
    isOwner ||
    membresia?.modulos.some(
      (modulo) => modulo.moduloNombre === 'Dashboard' && modulo.activo,
    ) === true;

  const ownerDashboardQuery = useQuery({
    queryKey: ['dashboard-owner', organizacionActivaId],
    queryFn: getOwnerDashboard,
    enabled: Boolean(organizacionActivaId && isOwner && canViewDashboard),
  });
  const memberActivitiesQuery = useQuery({
    queryKey: ['dashboard-member-activities', organizacionActivaId],
    queryFn: () => listActividades(organizacionActivaId as number),
    enabled: Boolean(
      organizacionActivaId && !isOwner && membershipReady && canViewDashboard,
    ),
  });

  const refreshDashboard = async () => {
    if (isOwner) {
      await ownerDashboardQuery.refetch();
      return;
    }
    await memberActivitiesQuery.refetch();
  };

  if (!membershipReady) return <DashboardLoading />;
  if (!canViewDashboard) return <AccessRestricted title="Dashboard" />;

  const query = isOwner ? ownerDashboardQuery : memberActivitiesQuery;
  if (query.isLoading) return <DashboardLoading />;
  if (query.isError) {
    return <DashboardError onRetry={() => void refreshDashboard()} />;
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={
        <RefreshControl
          refreshing={query.isRefetching}
          onRefresh={() => void refreshDashboard()}
          tintColor="#6ee7b7"
        />
      }
    >
      <View className="border-b border-emerald-400/20 bg-[#0b4d32] px-6 pb-7 pt-16">
        <Pressable onPress={() => router.push('/organizaciones')}>
          <Text className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
            {organizacion?.nombre ?? 'Organización activa'}
          </Text>
          <Text className="mt-2 text-3xl font-bold text-white">
            {getGreeting()}, {usuario?.nombre ?? 'usuario'}
          </Text>
          <Text className="mt-2 text-sm text-emerald-100">Tocá para cambiar de organización</Text>
        </Pressable>
      </View>

      {isOwner ? (
        <OwnerDashboard data={ownerDashboardQuery.data} />
      ) : (
        <MemberDashboard
          activities={memberActivitiesQuery.data ?? []}
          resources={membresia?.campos ?? []}
          canViewCampos={
            membresia?.modulos.some(
              (modulo) => modulo.moduloNombre === 'Campos' && modulo.activo,
            ) === true
          }
        />
      )}
    </ScrollView>
  );
}

function OwnerDashboard({ data }: { data: OwnerDashboardData | undefined }) {
  if (!data) return <DashboardLoading />;

  const totalHectares = data.campos.reduce((total, campo) => total + campo.hectareas, 0);
  const activeSowings = data.siembras.filter((siembra) => siembra.estado === 'EN_CURSO').length;
  const activeTasks = data.tareas.filter((task) => ACTIVE_TASK_STATES.has(task.estado));
  const expiredTasks = activeTasks.filter(isExpiredTask).length;
  const nextTasks = [...activeTasks]
    .sort(
      (first, second) =>
        new Date(first.fechaProgramada).getTime() - new Date(second.fechaProgramada).getTime(),
    )
    .slice(0, 4);

  return (
    <View className="px-5 pt-6">
      <Text className="text-sm font-bold uppercase tracking-widest text-slate-400">
        Resumen de hoy
      </Text>
      <View className="mt-3 gap-3">
        <View className="flex-row gap-3">
          <MetricCard
            label="Campos"
            value={data.campos.length}
            detail={`${totalHectares} ha`}
            href={'/(app)/(tabs)/campos'}
          />
          <MetricCard
            label="Siembras activas"
            value={activeSowings}
            detail="En curso"
            href={'/(app)/cultivos-siembras'}
          />
        </View>
        <View className="flex-row gap-3">
          <MetricCard
            label="Animales"
            value={data.animales.length}
            detail="Registrados"
            href={'/(app)/ganado'}
          />
          <MetricCard
            label="Tareas"
            value={activeTasks.length}
            detail={expiredTasks ? `${expiredTasks} vencidas` : 'Al día'}
            attention={expiredTasks > 0}
            href={'/(app)/(tabs)/tareas'}
          />
        </View>
      </View>

      <Text className="mt-8 text-sm font-bold uppercase tracking-widest text-slate-400">
        Finanzas
      </Text>
      <View className="mt-3 flex-row gap-2">
        <FinanceCard
          label="Ingresos"
          value={data.finanzas.ingresos}
          tone="positive"
          href={'/(app)/finanzas'}
        />
        <FinanceCard
          label="Egresos"
          value={data.finanzas.egresos}
          tone="negative"
          href={'/(app)/finanzas'}
        />
        <FinanceCard
          label="Saldo"
          value={data.finanzas.saldo}
          tone="neutral"
          href={'/(app)/finanzas'}
        />
      </View>

      <View className="mt-8 flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Próximas tareas
          </Text>
          <Text className="mt-1 text-sm text-slate-500">Planificación de la organización</Text>
        </View>
        <Pressable onPress={() => router.push('/(app)/(tabs)/tareas')}>
          <Text className="font-semibold text-emerald-400">Ver todas</Text>
        </Pressable>
      </View>

      <View className="mt-3 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        {nextTasks.length === 0 ? (
          <Text className="px-5 py-6 text-center text-sm text-slate-500">
            No hay tareas activas en este momento.
          </Text>
        ) : (
          nextTasks.map((task, index) => (
            <TaskRow key={task.id} task={task} hasBorder={index < nextTasks.length - 1} />
          ))
        )}
      </View>
    </View>
  );
}

function MemberDashboard({
  activities,
  resources,
  canViewCampos,
}: {
  activities: ActividadDashboard[];
  resources: Array<{ id: number; nombre: string }>;
  canViewCampos: boolean;
}) {
  const activeActivities = activities
    .filter((activity) => activity.activo && ACTIVE_ACTIVITY_STATES.has(activity.estado))
    .sort(
      (first, second) =>
        new Date(first.fechaEstimadaFin).getTime() - new Date(second.fechaEstimadaFin).getTime(),
    );
  const completedActivities = activities.filter(
    (activity) => activity.estado === 'COMPLETADA',
  ).length;

  return (
    <View className="px-5 pt-6">
      <View className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <Text className="text-sm font-semibold text-white">Mi jornada</Text>
        <Text className="mt-1 text-sm text-slate-400">
          Solo ves los recursos y trabajos asignados por el propietario.
        </Text>
        <View className="mt-5 flex-row gap-3">
          <MetricCard
            label="Trabajos activos"
            value={activeActivities.length}
            detail="Asignados"
            href={'/(app)/(tabs)/tareas'}
          />
          <MetricCard
            label="Completados"
            value={completedActivities}
            detail="Historial"
            href={'/(app)/(tabs)/tareas'}
          />
        </View>
      </View>

      <Text className="mt-8 text-sm font-bold uppercase tracking-widest text-slate-400">
        Recursos asignados
      </Text>
      <Pressable
        accessibilityRole={canViewCampos ? 'button' : undefined}
        accessibilityLabel={canViewCampos ? 'Ver campos asignados' : undefined}
        className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 p-5 active:bg-slate-800"
        disabled={!canViewCampos}
        onPress={() => router.push('/(app)/(tabs)/campos')}
      >
        {resources.length === 0 ? (
          <Text className="text-sm text-slate-500">Todavía no tenés recursos asignados.</Text>
        ) : (
          <>
            <Text className="text-2xl font-bold text-white">{resources.length}</Text>
            <Text className="mt-1 text-sm text-slate-400">
              {resources.slice(0, 3).map((resource) => resource.nombre).join(' · ')}
              {resources.length > 3 ? ' · …' : ''}
            </Text>
          </>
        )}
        {canViewCampos ? (
          <Text className="mt-3 text-xs font-semibold text-slate-500">Ver campos {'>'}</Text>
        ) : null}
      </Pressable>

      <View className="mt-8 flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Mis trabajos
          </Text>
          <Text className="mt-1 text-sm text-slate-500">Actividades asignadas por el propietario</Text>
        </View>
        <Pressable onPress={() => router.push('/(app)/(tabs)/tareas')}>
          <Text className="font-semibold text-emerald-400">Ver todos</Text>
        </Pressable>
      </View>

      <View className="mt-3 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        {activeActivities.length === 0 ? (
          <Text className="px-5 py-6 text-center text-sm text-slate-500">
            No tenés trabajos activos asignados.
          </Text>
        ) : (
          activeActivities.slice(0, 4).map((activity, index) => (
            <ActivityRow
              key={activity.id}
              activity={activity}
              hasBorder={index < Math.min(activeActivities.length, 4) - 1}
            />
          ))
        )}
      </View>
    </View>
  );
}

function MetricCard({
  label,
  value,
  detail,
  attention = false,
  href,
}: {
  label: string;
  value: number;
  detail: string;
  attention?: boolean;
  href: Href;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver ${label}`}
      className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4 active:bg-slate-800"
      onPress={() => router.push(href)}
    >
      <Text className="text-xs font-medium text-slate-400">{label}</Text>
      <Text className="mt-2 text-3xl font-bold text-white">{value}</Text>
      <Text className={`mt-1 text-xs font-semibold ${attention ? 'text-red-400' : 'text-emerald-400'}`}>
        {detail}
      </Text>
      <Text className="mt-3 text-xs font-semibold text-slate-500">Ver detalle {'>'}</Text>
    </Pressable>
  );
}

function FinanceCard({
  label,
  value,
  tone,
  href,
}: {
  label: string;
  value: number;
  tone: 'positive' | 'negative' | 'neutral';
  href: Href;
}) {
  const valueColor =
    tone === 'positive'
      ? 'text-emerald-700'
      : tone === 'negative'
        ? 'text-red-600'
        : value >= 0
          ? 'text-blue-700'
          : 'text-red-600';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver finanzas: ${label}`}
      className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-3 active:bg-slate-800"
      onPress={() => router.push(href)}
    >
      <Text className="text-xs text-slate-400">{label}</Text>
      <Text className={`mt-2 text-sm font-bold ${valueColor}`} numberOfLines={1}>
        {formatCurrency(value)}
      </Text>
      <Text className="mt-2 text-xs font-semibold text-slate-500">Ver {'>'}</Text>
    </Pressable>
  );
}

function TaskRow({ task, hasBorder }: { task: TareaDashboard; hasBorder: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver tarea ${task.titulo}`}
      className={`px-5 py-4 active:bg-slate-800 ${hasBorder ? 'border-b border-slate-800' : ''}`}
      onPress={() => router.push('/(app)/(tabs)/tareas')}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-semibold text-white">{task.titulo}</Text>
          <Text className="mt-1 text-sm text-slate-400">
            {task.campo?.nombre ?? 'Sin campo asignado'} · {formatDate(task.fechaProgramada)}
          </Text>
        </View>
        <Text className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-300">
          {task.estado.replace('_', ' ')}
        </Text>
      </View>
    </Pressable>
  );
}

function ActivityRow({
  activity,
  hasBorder,
}: {
  activity: ActividadDashboard;
  hasBorder: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver trabajo ${activity.titulo}`}
      className={`px-5 py-4 active:bg-slate-800 ${hasBorder ? 'border-b border-slate-800' : ''}`}
      onPress={() => router.push('/(app)/(tabs)/tareas')}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-semibold text-white">{activity.titulo}</Text>
          <Text className="mt-1 text-sm text-slate-400">
            {activity.contexto || `${activity.recursoTipo}${activity.recursoId ? ` #${activity.recursoId}` : ''}`}
          </Text>
          <Text className="mt-1 text-xs text-slate-400">
            Hasta {formatDate(activity.fechaEstimadaFin)}
          </Text>
        </View>
        <Text className="rounded-full bg-emerald-950 px-2 py-1 text-xs font-semibold text-emerald-300">
          {activity.estado.replace('_', ' ')}
        </Text>
      </View>
    </Pressable>
  );
}

function DashboardLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <ActivityIndicator color="#6ee7b7" size="large" />
      <Text className="mt-3 text-sm text-slate-500">Actualizando dashboard…</Text>
    </View>
  );
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950 px-6">
      <Text className="text-center text-xl font-bold text-white">
        No pudimos cargar el dashboard
      </Text>
      <Text className="mt-2 text-center text-sm text-slate-600">
        Revisá tu conexión e intentá nuevamente.
      </Text>
      <Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={onRetry}>
        <Text className="font-semibold text-white">Reintentar</Text>
      </Pressable>
    </View>
  );
}
