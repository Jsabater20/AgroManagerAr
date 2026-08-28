import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Href, router } from 'expo-router';
import {
  cancelarInvitacion,
  getInvitaciones,
  getMiembrosEquipo,
  getUsoMiembros,
  reenviarInvitacion,
} from '@/api/equipo.api';
import { getApiErrorMessage } from '@/api/errors';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';

const roleLabel: Record<string, string> = {
  ADMIN: 'Administrador',
  ADMINISTRADOR: 'Administrador',
  OPERARIO: 'Operario',
  CONTADOR: 'Contador',
  ASESOR: 'Asesor',
  CONTRATISTA: 'Contratista',
  MECANICO: 'Mecánico',
  MIEMBRO: 'Miembro',
};

const openProInfo = () => {
  Alert.alert('Plan Pro', 'Pasate a Pro desde la web para ampliar los límites de tu equipo.');
};

export default function EquipoScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const queryClient = useQueryClient();
  const membersQuery = useQuery({
    queryKey: ['equipo-miembros', organizacionActivaId],
    queryFn: () => getMiembrosEquipo(organizacionActivaId as number),
    enabled: Boolean(organizacionActivaId && isOwner),
  });
  const usageQuery = useQuery({
    queryKey: ['miembros-uso', organizacionActivaId],
    queryFn: () => getUsoMiembros(organizacionActivaId as number),
    enabled: Boolean(organizacionActivaId && isOwner),
  });
  const invitationsQuery = useQuery({
    queryKey: ['equipo-invitaciones', organizacionActivaId],
    queryFn: () => getInvitaciones(organizacionActivaId as number),
    enabled: Boolean(organizacionActivaId && isOwner),
  });
  const refresh = async () => {
    await Promise.all([membersQuery.refetch(), usageQuery.refetch(), invitationsQuery.refetch()]);
  };
  const invalidateTeam = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['equipo-invitaciones', organizacionActivaId] }),
      queryClient.invalidateQueries({ queryKey: ['miembros-uso', organizacionActivaId] }),
    ]);
  };
  const resendMutation = useMutation({
    mutationFn: (invitacionId: number) => reenviarInvitacion(organizacionActivaId as number, invitacionId),
    onSuccess: invalidateTeam,
    onError: (error: unknown) =>
      Alert.alert('No pudimos reenviar la invitación', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });
  const cancelMutation = useMutation({
    mutationFn: (invitacionId: number) => cancelarInvitacion(organizacionActivaId as number, invitacionId),
    onSuccess: invalidateTeam,
    onError: (error: unknown) =>
      Alert.alert('No pudimos cancelar la invitación', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });

  if (!isOwner) return <AccessRestricted title="Equipo" />;
  if (membersQuery.isLoading || usageQuery.isLoading || invitationsQuery.isLoading) return <TeamLoading />;

  if (membersQuery.isError || usageQuery.isError || invitationsQuery.isError) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 px-6">
        <Text className="text-center text-xl font-bold text-slate-900">No pudimos cargar el equipo</Text>
        <Text className="mt-2 text-center text-sm text-slate-600">
          {getApiErrorMessage(
            membersQuery.error || usageQuery.error || invitationsQuery.error,
            'Intentá nuevamente en unos minutos.',
          )}
        </Text>
        <Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={() => void refresh()}>
          <Text className="font-semibold text-white">Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const members = membersQuery.data ?? [];
  const invitations = invitationsQuery.data ?? [];
  const usage = usageQuery.data;
  const memberLimitReached =
    usage?.plan === 'FREE' && usage.miembros.limite !== null && usage.miembros.usados >= usage.miembros.limite;

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={<RefreshControl refreshing={membersQuery.isRefetching} onRefresh={() => void refresh()} />}
    >
      <View className="bg-emerald-800 px-6 pb-7 pt-16">
        <Text className="text-3xl font-bold text-white">Equipo</Text>
        <Text className="mt-2 text-sm text-emerald-100">
          Invitá, habilitá recursos y asigná trabajos a tu personal.
        </Text>
      </View>

      <View className="px-5 pt-5">
        {usage?.plan === 'FREE' && (
          <View className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
            <Text className="text-xs font-bold uppercase tracking-widest text-slate-500">Plan Free</Text>
            <View className="mt-3 flex-row gap-3">
              <UsageChip label="Miembros" value={`${usage.miembros.usados} / ${usage.miembros.limite}`} />
              <UsageChip label="Trabajos activos" value={`${usage.actividades.usadas} / ${usage.actividades.limite}`} />
            </View>
          </View>
        )}

        {memberLimitReached && (
          <View className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <Text className="font-semibold text-amber-900">Alcanzaste el límite del plan Free.</Text>
            <Text className="mt-1 text-sm text-amber-800">Pasate a Pro para agregar más miembros y trabajos.</Text>
            <Pressable className="mt-3 self-start rounded-lg bg-amber-700 px-3 py-2" onPress={openProInfo}>
              <Text className="text-sm font-semibold text-white">Ver Pro</Text>
            </Pressable>
          </View>
        )}

        <View className="flex-row gap-3">
          <Pressable
            className="flex-1 items-center rounded-xl bg-emerald-700 px-3 py-3 disabled:opacity-50"
            disabled={memberLimitReached}
            onPress={() => router.push('/(app)/equipo/invitar' as Href)}
          >
            <Text className="font-semibold text-white">+ Invitar</Text>
          </Pressable>
          <Pressable
            className="flex-1 items-center rounded-xl border border-emerald-700 px-3 py-3"
            onPress={() => router.push('/(app)/equipo/asignar-trabajo' as Href)}
          >
            <Text className="font-semibold text-emerald-800">Asignar trabajo</Text>
          </Pressable>
        </View>

        <Text className="mt-8 text-sm font-bold uppercase tracking-widest text-slate-500">
          Miembros ({members.length})
        </Text>
        <View className="mt-3 gap-3">
          {members.length === 0 ? (
            <EmptyTeam />
          ) : (
            members.map((member) => (
              <Pressable
                key={member.id}
                className="rounded-2xl bg-white p-4"
                onPress={() =>
                  router.push(
                    { pathname: '/(app)/equipo/[memberId]', params: { memberId: String(member.id) } } as unknown as Href,
                  )
                }
              >
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-slate-900">
                      {member.nombre} {member.apellido}
                    </Text>
                    <Text className="mt-1 text-sm text-slate-500">{member.email}</Text>
                  </View>
                  <Text
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      member.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {member.activo ? 'ACTIVO' : 'INACTIVO'}
                  </Text>
                </View>
                <View className="mt-4 flex-row justify-between border-t border-slate-100 pt-3">
                  <Text className="text-sm font-semibold text-emerald-800">
                    {roleLabel[member.rol] ?? member.rol}
                  </Text>
                  <Text className="text-sm text-slate-500">
                    {member.actividades.pendientes + member.actividades.enProgreso} trabajos activos
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </View>

        {invitations.length > 0 && (
          <>
            <Text className="mt-8 text-sm font-bold uppercase tracking-widest text-slate-500">
              Invitaciones pendientes ({invitations.length})
            </Text>
            <View className="mt-3 gap-3">
              {invitations.map((invitation) => (
                <View key={invitation.id} className="rounded-2xl bg-white p-4">
                  <Text className="font-semibold text-slate-900">{invitation.email}</Text>
                  <Text className="mt-1 text-sm text-slate-500">
                    {roleLabel[invitation.rol] ?? invitation.rol} · Pendiente
                  </Text>
                  <View className="mt-4 flex-row gap-3">
                    <Pressable
                      className="rounded-lg border border-slate-300 px-3 py-2 disabled:opacity-50"
                      disabled={resendMutation.isPending || cancelMutation.isPending}
                      onPress={() => resendMutation.mutate(invitation.id)}
                    >
                      <Text className="text-sm font-semibold text-slate-700">Reenviar</Text>
                    </Pressable>
                    <Pressable
                      className="rounded-lg border border-red-200 px-3 py-2 disabled:opacity-50"
                      disabled={resendMutation.isPending || cancelMutation.isPending}
                      onPress={() =>
                        Alert.alert('Cancelar invitación', `¿Cancelar la invitación a ${invitation.email}?`, [
                          { text: 'Volver', style: 'cancel' },
                          { text: 'Cancelar invitación', style: 'destructive', onPress: () => cancelMutation.mutate(invitation.id) },
                        ])
                      }
                    >
                      <Text className="text-sm font-semibold text-red-700">Cancelar</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

function UsageChip({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-xl bg-slate-100 p-3">
      <Text className="text-xs text-slate-500">{label}</Text>
      <Text className="mt-1 text-base font-bold text-slate-900">{value}</Text>
    </View>
  );
}

function EmptyTeam() {
  return (
    <View className="items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10">
      <Text className="text-4xl">♟</Text>
      <Text className="mt-3 text-lg font-bold text-slate-900">Todavía no hay miembros</Text>
      <Text className="mt-2 text-center text-sm text-slate-500">
        Invitá a una persona para asignarle recursos y trabajos.
      </Text>
    </View>
  );
}

function TeamLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <ActivityIndicator color="#15803d" size="large" />
      <Text className="mt-3 text-sm text-slate-500">Cargando equipo…</Text>
    </View>
  );
}
