import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { router, type Href } from 'expo-router';
import { getCampos } from '@/api/campos.api';
import { getApiErrorMessage } from '@/api/errors';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';
import type { Campo } from '@/types/campos';

export default function CamposScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const membresia = useAuthStore((state) => state.membresia);
  const membresiaOrganizacionId = useAuthStore((state) => state.membresiaOrganizacionId);
  const membershipReady = isOwner || membresiaOrganizacionId === organizacionActivaId;
  const canViewCampos =
    isOwner ||
    membresia?.modulos.some(
      (modulo) => modulo.moduloNombre === 'Campos' && modulo.activo,
    ) === true;
  const camposQuery = useQuery({
    queryKey: ['campos', organizacionActivaId],
    queryFn: getCampos,
    enabled: Boolean(organizacionActivaId && membershipReady && canViewCampos),
  });

  if (!membershipReady) return <CamposLoading />;
  if (!canViewCampos) return <AccessRestricted title="Campos" />;
  if (camposQuery.isLoading) return <CamposLoading />;

  if (camposQuery.isError) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950 px-6">
        <Text className="text-center text-xl font-bold text-white">
          No pudimos cargar los campos
        </Text>
        <Text className="mt-2 text-center text-sm text-slate-600">
          {getApiErrorMessage(camposQuery.error, 'Intentá nuevamente en unos minutos.')}
        </Text>
        <Pressable
          className="mt-6 rounded-xl bg-emerald-700 px-5 py-3"
          onPress={() => void camposQuery.refetch()}
        >
          <Text className="font-semibold text-white">Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const campos = camposQuery.data ?? [];

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={
        <RefreshControl
          refreshing={camposQuery.isRefetching}
          onRefresh={() => void camposQuery.refetch()}
          tintColor="#6ee7b7"
        />
      }
    >
      <View className="flex-row items-end justify-between border-b border-emerald-400/20 bg-[#0b4d32] px-6 pb-7 pt-16">
        <View className="flex-1 pr-4">
          <Text className="text-3xl font-bold text-white">Campos</Text>
          <Text className="mt-2 text-sm text-emerald-100">
            {isOwner
              ? 'Administrá tus establecimientos y lotes.'
              : 'Campos y lotes que tenés asignados.'}
          </Text>
        </View>
        <Pressable
          className="rounded-xl bg-white px-4 py-3"
          onPress={() => router.push('/(app)/campos/nuevo' as Href)}
        >
          <Text className="font-semibold text-emerald-800">+ Nuevo</Text>
        </Pressable>
      </View>

      <View className="px-5 pt-6">
        <Text className="text-sm font-bold uppercase tracking-widest text-slate-400">
          {campos.length} {campos.length === 1 ? 'campo disponible' : 'campos disponibles'}
        </Text>

        {campos.length === 0 ? (
          <EmptyCampos onCreate={() => router.push('/(app)/campos/nuevo' as Href)} />
        ) : (
          <View className="mt-4 gap-3">
            {campos.map((campo) => (
              <CampoCard key={campo.id} campo={campo} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function CampoCard({ campo }: { campo: Campo }) {
  return (
    <Pressable
      className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
      onPress={() =>
        router.push(
          {
            pathname: '/(app)/campos/[campoId]',
            params: { campoId: String(campo.id) },
          } as unknown as Href,
        )
      }
    >
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text className="text-lg font-bold text-white">{campo.nombre}</Text>
          <Text className="mt-1 text-sm text-slate-400">
            {campo.ubicacion || 'Ubicación sin registrar'}
          </Text>
        </View>
        <Text className="text-xl text-emerald-700">›</Text>
      </View>

      <View className="mt-4 flex-row gap-3 border-t border-slate-800 pt-4">
        <FieldSummary label="Superficie" value={`${campo.hectareas} ha`} />
        <FieldSummary label="Lotes" value={String(campo.lotes.length)} />
        {campo.usuario && (
          <FieldSummary label="Responsable" value={campo.usuario.nombre} compact />
        )}
      </View>
    </Pressable>
  );
}

function FieldSummary({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <View className={compact ? 'flex-1' : 'min-w-20'}>
      <Text className="text-xs text-slate-400">{label}</Text>
      <Text className="mt-1 text-sm font-semibold text-slate-200" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function EmptyCampos({ onCreate }: { onCreate: () => void }) {
  return (
    <View className="mt-4 items-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-6 py-10">
      <Text className="text-4xl">⌖</Text>
      <Text className="mt-4 text-lg font-bold text-white">No hay campos registrados</Text>
      <Text className="mt-2 text-center text-sm text-slate-400">
        Creá tu primer campo para organizar lotes, siembras y tareas.
      </Text>
      <Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={onCreate}>
        <Text className="font-semibold text-white">Crear campo</Text>
      </Pressable>
    </View>
  );
}

function CamposLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <ActivityIndicator color="#6ee7b7" size="large" />
      <Text className="mt-3 text-sm text-slate-500">Cargando campos…</Text>
    </View>
  );
}
