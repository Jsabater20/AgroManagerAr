import { useEffect } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Redirect, Stack, router } from 'expo-router';
import { getCurrentMembership } from '@/api/organizaciones.api';
import { escucharRespuestasDeNotificaciones } from '@/services/notificaciones.service';
import { useAuthStore } from '@/store/auth.store';
import { ResourceEvidenceAction } from '@/components/evidencias/ResourceEvidenceAction';

export default function AppLayout() {
  const token = useAuthStore((state) => state.token);
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const setMembership = useAuthStore((state) => state.setMembership);
  const clearMembership = useAuthStore((state) => state.clearMembership);
  const selectOrganization = useAuthStore((state) => state.selectOrganization);
  const membershipQuery = useQuery({
    queryKey: ['miembro-actual', organizacionActivaId],
    queryFn: () => getCurrentMembership(organizacionActivaId as number),
    enabled: Boolean(organizacionActivaId && !isOwner),
    retry: false,
  });

  useEffect(() => {
    if (isOwner) {
      clearMembership();
      return;
    }

    if (organizacionActivaId && membershipQuery.data) {
      setMembership(organizacionActivaId, membershipQuery.data);
    }
  }, [
    clearMembership,
    isOwner,
    membershipQuery.data,
    organizacionActivaId,
    setMembership,
  ]);

  useEffect(() => {
    const suscripcion = escucharRespuestasDeNotificaciones((datos) => {
      const organizacionId = Number(datos.organizacionId);
      if (!Number.isInteger(organizacionId)) return;

      void selectOrganization(organizacionId).then(() => {
        router.push('/(app)/(tabs)/tareas');
      });
    });

    return () => suscripcion.remove();
  }, [selectOrganization]);

  if (!token) return <Redirect href="/(auth)/login" />;
  if (!organizacionActivaId) return <Redirect href="/organizaciones" />;

  if (!isOwner && membershipQuery.isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950">
        <ActivityIndicator color="#22c55e" />
        <Text className="mt-3 text-sm text-slate-300">Cargando tus permisos…</Text>
      </View>
    );
  }

  if (!isOwner && membershipQuery.isError) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950 px-6">
        <Text className="text-center text-lg font-semibold text-white">
          No pudimos cargar tu acceso a la organización.
        </Text>
        <Text className="mt-2 text-center text-sm text-slate-400">
          Elegí nuevamente una organización o intentá más tarde.
        </Text>
        <Pressable
          className="mt-6 rounded-xl bg-green-600 px-5 py-3"
          onPress={() => router.replace('/organizaciones')}
        >
          <Text className="font-semibold text-white">Cambiar organización</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <ResourceEvidenceAction />
    </>
  );
}
