import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import {
  actualizarCampoAsignado,
  actualizarEstadoMiembro,
  actualizarModuloMiembro,
  actualizarRolMiembro,
  getMiembrosEquipo,
  getRecursosAsignables,
  type RolPanelMiembro,
} from '@/api/equipo.api';
import { getApiErrorMessage } from '@/api/errors';
import { useAuthStore } from '@/store/auth.store';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';

const ROLES: Array<{ value: RolPanelMiembro; label: string }> = [
  { value: 'OPERARIO', label: 'Operario' },
  { value: 'ADMINISTRADOR', label: 'Administrador' },
  { value: 'CONTADOR', label: 'Contador' },
  { value: 'MECANICO', label: 'Mecánico' },
  { value: 'MIEMBRO', label: 'Miembro' },
];

const MODULOS = ['Dashboard', 'Campos', 'Cultivos', 'Siembras', 'Insumos', 'Ganadería', 'Tareas', 'Maquinarias', 'Finanzas', 'Reportes', 'Clima'];

export default function MiembroDetalleScreen() {
  const { memberId } = useLocalSearchParams<{ memberId: string }>();
  const memberIdNumber = Number(memberId);
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const membersQuery = useQuery({
    queryKey: ['equipo-miembros', organizacionActivaId],
    queryFn: () => getMiembrosEquipo(organizacionActivaId as number),
    enabled: Boolean(organizacionActivaId && memberIdNumber),
  });
  const member = membersQuery.data?.find((item) => item.id === memberIdNumber);
  const resourcesQuery = useQuery({
    queryKey: ['equipo-recursos', organizacionActivaId, memberIdNumber],
    queryFn: () => getRecursosAsignables(organizacionActivaId as number, memberIdNumber),
    enabled: Boolean(organizacionActivaId && member),
  });
  const invalidateMember = async () => {
    await queryClient.invalidateQueries({ queryKey: ['equipo-miembros', organizacionActivaId] });
  };
  const roleMutation = useMutation({
    mutationFn: (rol: RolPanelMiembro) =>
      actualizarRolMiembro(organizacionActivaId as number, memberIdNumber, rol),
    onSuccess: invalidateMember,
    onError: (error: unknown) => Alert.alert('No pudimos actualizar el rol', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });
  const statusMutation = useMutation({
    mutationFn: (activo: boolean) =>
      actualizarEstadoMiembro(organizacionActivaId as number, memberIdNumber, activo),
    onSuccess: invalidateMember,
    onError: (error: unknown) => Alert.alert('No pudimos actualizar el estado', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });
  const moduleMutation = useMutation({
    mutationFn: ({ moduloNombre, activo }: { moduloNombre: string; activo: boolean }) =>
      actualizarModuloMiembro(organizacionActivaId as number, memberIdNumber, moduloNombre, activo),
    onSuccess: invalidateMember,
    onError: (error: unknown) => Alert.alert('No pudimos actualizar el permiso', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });
  const resourceMutation = useMutation({
    mutationFn: ({ campoId, asignado }: { campoId: number; asignado: boolean }) =>
      actualizarCampoAsignado(organizacionActivaId as number, memberIdNumber, campoId, asignado),
    onSuccess: async () => {
      await Promise.all([
        invalidateMember(),
        queryClient.invalidateQueries({ queryKey: ['equipo-recursos', organizacionActivaId, memberIdNumber] }),
      ]);
    },
    onError: (error: unknown) => Alert.alert('No pudimos actualizar el campo', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });

  if (membersQuery.isLoading) return <MemberLoading />;
  if (membersQuery.isError || !member) return <MemberError onRetry={() => void membersQuery.refetch()} />;

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}>
      <Pressable onPress={() => router.back()}>
        <Text className="text-sm font-semibold text-emerald-800">‹ Equipo</Text>
      </Pressable>

      <View className="mt-5 rounded-2xl bg-emerald-800 p-5">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1 flex-row items-center gap-3">
            <ProfileAvatar
              apellido={member.apellido}
              fotoUrl={member.fotoPerfilUrl}
              nombre={member.nombre}
            />
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">
                {member.nombre} {member.apellido}
              </Text>
              <Text className="mt-1 text-sm text-emerald-100">{member.email}</Text>
            </View>
          </View>
          <Text className={`rounded-full px-2 py-1 text-xs font-semibold ${member.activo ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'}`}>
            {member.activo ? 'ACTIVO' : 'INACTIVO'}
          </Text>
        </View>
        <Text className="mt-4 text-sm text-emerald-100">
          {member.actividades.pendientes + member.actividades.enProgreso} trabajos activos
        </Text>
      </View>

      <Section title="Rol y estado" description="El rol organiza al equipo; los permisos concretos se definen abajo.">
        <Text className="text-sm font-semibold text-slate-800">Rol actual: {member.rol}</Text>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {ROLES.map((option) => (
            <Pressable
              key={option.value}
              className={`rounded-full border px-3 py-2 ${
                member.rol === option.value ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'
              }`}
              disabled={roleMutation.isPending}
              onPress={() => roleMutation.mutate(option.value)}
            >
              <Text className={`text-sm font-semibold ${member.rol === option.value ? 'text-white' : 'text-slate-700'}`}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          className={`mt-5 items-center rounded-xl px-4 py-3 ${member.activo ? 'bg-red-50' : 'bg-emerald-700'}`}
          disabled={statusMutation.isPending}
          onPress={() => statusMutation.mutate(!member.activo)}
        >
          <Text className={`font-semibold ${member.activo ? 'text-red-700' : 'text-white'}`}>
            {member.activo ? 'Dar de baja' : 'Dar de alta'}
          </Text>
        </Pressable>
      </Section>

      <Section title="Permisos" description="Habilitá solamente las secciones que esta persona puede usar.">
        <View className="flex-row flex-wrap gap-2">
          {MODULOS.map((moduloNombre) => {
            const activo = member.modulos.some(
              (modulo) => modulo.moduloNombre === moduloNombre && modulo.activo,
            );
            return (
              <Pressable
                key={moduloNombre}
                className={`rounded-xl border px-3 py-3 ${
                  activo ? 'border-emerald-700 bg-emerald-50' : 'border-slate-200 bg-white'
                }`}
                disabled={moduleMutation.isPending}
                onPress={() => moduleMutation.mutate({ moduloNombre, activo: !activo })}
              >
                <Text className={`text-sm font-semibold ${activo ? 'text-emerald-800' : 'text-slate-600'}`}>
                  {moduloNombre} · {activo ? 'ON' : 'OFF'}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Section>

      <Section title="Campos asignados" description="Los campos marcados se podrán ver y gestionar según sus permisos.">
        {resourcesQuery.isLoading ? (
          <View className="items-center py-6"><ActivityIndicator color="#15803d" /></View>
        ) : (resourcesQuery.data ?? []).length === 0 ? (
          <Text className="text-sm text-slate-500">Todavía no hay campos para asignar.</Text>
        ) : (
          <View className="gap-2">
            {(resourcesQuery.data ?? []).map((resource) => (
              <Pressable
                key={resource.id}
                className={`flex-row items-center justify-between rounded-xl border p-4 ${
                  resource.asignado ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'
                }`}
                disabled={resourceMutation.isPending}
                onPress={() => resourceMutation.mutate({ campoId: resource.id, asignado: resource.asignado })}
              >
                <Text className="flex-1 font-semibold text-slate-800">{resource.nombre}</Text>
                <Text className={`text-sm font-bold ${resource.asignado ? 'text-emerald-800' : 'text-slate-500'}`}>
                  {resource.asignado ? 'ASIGNADO' : 'ASIGNAR'}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </Section>
    </ScrollView>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <View className="mt-5 rounded-2xl bg-white p-5">
      <Text className="text-lg font-bold text-slate-900">{title}</Text>
      <Text className="mt-1 text-sm leading-5 text-slate-500">{description}</Text>
      <View className="mt-4">{children}</View>
    </View>
  );
}

function MemberLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <ActivityIndicator color="#15803d" size="large" />
      <Text className="mt-3 text-sm text-slate-500">Cargando miembro…</Text>
    </View>
  );
}

function MemberError({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-6">
      <Text className="text-center text-lg font-bold text-slate-900">No encontramos este miembro</Text>
      <Pressable className="mt-5 rounded-xl bg-emerald-700 px-4 py-3" onPress={onRetry}>
        <Text className="font-semibold text-white">Reintentar</Text>
      </Pressable>
    </View>
  );
}
