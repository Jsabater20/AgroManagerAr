import { ActivityIndicator, Alert, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getAllUsers, updateUserPlan } from '@/api/users.api';
import { getApiErrorMessage } from '@/api/errors';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';
import type { Usuario } from '@/types/auth';

const DEMO_EMAIL = 'demo@agromanager.ar';
const SUPERADMIN_OWNER_EMAILS = ['joaquinsabater@agromanagerar.com'];

const isProtectedProAccount = (email: string) =>
  email.toLowerCase() === DEMO_EMAIL || SUPERADMIN_OWNER_EMAILS.includes(email.toLowerCase());

const formatDate = (date?: string) =>
  date ? new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(date)) : 'Sin fecha';

export default function AdminScreen() {
  const isSuperAdmin = useAuthStore((state) => state.isSuperAdmin());
  const queryClient = useQueryClient();
  const usersQuery = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
    enabled: isSuperAdmin,
  });
  const planMutation = useMutation({
    mutationFn: ({ userId, plan }: { userId: number; plan: 'FREE' | 'PRO' }) =>
      updateUserPlan(userId, plan),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      Alert.alert('Plan actualizado', 'El plan del usuario y sus organizaciones ya fue actualizado.');
    },
    onError: (error: unknown) =>
      Alert.alert('No pudimos actualizar el plan', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      Alert.alert('Usuario eliminado', 'La cuenta fue eliminada del sistema.');
    },
    onError: (error: unknown) =>
      Alert.alert('No pudimos eliminar el usuario', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });

  if (!isSuperAdmin) return <AccessRestricted title="Panel administrativo" />;
  if (usersQuery.isLoading) return <Loading />;
  if (usersQuery.isError) return <LoadError error={usersQuery.error} onRetry={() => void usersQuery.refetch()} />;

  const users = usersQuery.data ?? [];
  const choosePlan = (user: Usuario) => {
    const protectedAccount = isProtectedProAccount(user.email);
    Alert.alert(
      `Plan de ${user.nombre}`,
      protectedAccount
        ? 'Esta cuenta protegida debe mantener el Plan Pro.'
        : `Plan actual: ${user.plan ?? 'FREE'}. Elegí el nuevo plan.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        ...(!protectedAccount
          ? [
              {
                text: 'Free',
                onPress: () => planMutation.mutate({ userId: user.id, plan: 'FREE' }),
              },
            ]
          : []),
        {
          text: 'Pro',
          onPress: () => planMutation.mutate({ userId: user.id, plan: 'PRO' }),
        },
      ],
    );
  };
  const confirmDelete = (user: Usuario) => {
    if (isProtectedProAccount(user.email)) return;
    Alert.alert(
      'Eliminar usuario',
      `¿Querés eliminar definitivamente la cuenta de ${user.nombre} ${user.apellido}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(user.id),
        },
      ],
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={{ paddingBottom: 36 }}
      refreshControl={<RefreshControl refreshing={usersQuery.isRefetching} onRefresh={() => void usersQuery.refetch()} tintColor="#6ee7b7" />}
    >
      <View className="border-b border-violet-400/20 bg-[#251347] px-6 pb-7 pt-16">
        <Pressable onPress={() => router.back()}>
          <Text className="text-sm font-semibold text-violet-200">‹ Más</Text>
        </Pressable>
        <Text className="mt-5 text-3xl font-bold text-white">Panel SuperAdmin</Text>
        <Text className="mt-2 text-sm leading-5 text-violet-100">Gestión global de usuarios y planes del sistema.</Text>
      </View>

      <View className="px-5 pt-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold uppercase tracking-widest text-slate-400">Usuarios</Text>
          <Text className="rounded-full bg-violet-950 px-3 py-1 text-sm font-bold text-violet-200">{users.length}</Text>
        </View>

        <View className="mt-4 gap-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              busy={planMutation.isPending || deleteMutation.isPending}
              onChangePlan={() => choosePlan(user)}
              onDelete={() => confirmDelete(user)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function UserCard({ user, busy, onChangePlan, onDelete }: { user: Usuario; busy: boolean; onChangePlan: () => void; onDelete: () => void }) {
  const isDemo = user.email.toLowerCase() === DEMO_EMAIL;
  const isSuperOwner = SUPERADMIN_OWNER_EMAILS.includes(user.email.toLowerCase());
  const protectedAccount = isDemo || isSuperOwner;

  return (
    <View className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-white">{user.nombre} {user.apellido}</Text>
          <Text className="mt-1 text-sm text-slate-400">{user.email}</Text>
        </View>
        <Text className={`rounded-full px-3 py-1 text-xs font-bold ${user.plan === 'PRO' ? 'bg-amber-950 text-amber-200' : 'bg-slate-800 text-slate-300'}`}>
          {user.plan ?? 'FREE'}
        </Text>
      </View>

      <View className="mt-4 flex-row flex-wrap gap-2">
        {isDemo && <Text className="rounded-full bg-amber-950 px-2 py-1 text-xs font-semibold text-amber-200">DEMO</Text>}
        {isSuperOwner && <Text className="rounded-full bg-violet-950 px-2 py-1 text-xs font-semibold text-violet-200">SUPERADMIN</Text>}
        {!isDemo && !isSuperOwner && <Text className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-300">USUARIO</Text>}
        <Text className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-300">{user.rolGlobal ?? 'USER'}</Text>
      </View>

      <Text className="mt-4 text-xs text-slate-500">Registrado: {formatDate(user.createdAt)}</Text>

      <View className="mt-4 flex-row gap-3 border-t border-slate-800 pt-4">
        <Pressable className="flex-1 items-center rounded-xl bg-violet-700 px-3 py-3 disabled:opacity-50" disabled={busy} onPress={onChangePlan}>
          <Text className="font-semibold text-white">Cambiar plan</Text>
        </Pressable>
        <Pressable className="items-center rounded-xl border border-red-900 px-4 py-3 disabled:opacity-40" disabled={busy || protectedAccount} onPress={onDelete}>
          <Text className="font-semibold text-red-400">Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Loading() {
  return <View className="flex-1 items-center justify-center bg-slate-950"><ActivityIndicator color="#a78bfa" size="large" /><Text className="mt-3 text-sm text-slate-400">Cargando usuarios…</Text></View>;
}

function LoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  return <View className="flex-1 items-center justify-center bg-slate-950 px-6"><Text className="text-center text-xl font-bold text-white">No pudimos cargar los usuarios</Text><Text className="mt-2 text-center text-sm text-slate-400">{getApiErrorMessage(error, 'Intentá nuevamente.')}</Text><Pressable className="mt-6 rounded-xl bg-violet-700 px-5 py-3" onPress={onRetry}><Text className="font-semibold text-white">Reintentar</Text></Pressable></View>;
}
