import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Href, router } from 'expo-router';
import { crearActividad, type TipoRecursoActividad } from '@/api/actividades.api';
import {
  actualizarCampoAsignado,
  getMiembrosEquipo,
  getRecursosAsignables,
  getUsoMiembros,
} from '@/api/equipo.api';
import { getApiErrorMessage } from '@/api/errors';
import { getRecursosPorTipo } from '@/api/recursos.api';
import { useAuthStore } from '@/store/auth.store';

const RESOURCE_OPTIONS: Array<{ value: TipoRecursoActividad; label: string }> = [
  { value: 'GENERAL', label: 'General' },
  { value: 'CAMPO', label: 'Campo' },
  { value: 'LOTE', label: 'Lote' },
  { value: 'SIEMBRA', label: 'Siembra' },
  { value: 'ANIMAL', label: 'Animal' },
  { value: 'MAQUINARIA', label: 'Maquinaria' },
  { value: 'TAREA', label: 'Tarea' },
  { value: 'CAMPANIA', label: 'Campaña' },
];

const PRIORITIES = ['BAJA', 'MEDIA', 'ALTA', 'URGENTE'] as const;
const today = () => new Date().toISOString().slice(0, 10);

export default function AsignarTrabajoScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const [memberId, setMemberId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceType, setResourceType] = useState<TipoRecursoActividad>('GENERAL');
  const [resourceId, setResourceId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState(today());
  const [endDate, setEndDate] = useState(today());
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number]>('MEDIA');
  const membersQuery = useQuery({
    queryKey: ['equipo-miembros', organizacionActivaId],
    queryFn: () => getMiembrosEquipo(organizacionActivaId as number),
    enabled: Boolean(organizacionActivaId),
  });
  const usageQuery = useQuery({
    queryKey: ['miembros-uso', organizacionActivaId],
    queryFn: () => getUsoMiembros(organizacionActivaId as number),
    enabled: Boolean(organizacionActivaId),
  });
  const resourcesQuery = useQuery({
    queryKey: ['recursos-actividad', organizacionActivaId, resourceType],
    queryFn: () => getRecursosPorTipo(resourceType as Exclude<TipoRecursoActividad, 'GENERAL'>),
    enabled: Boolean(organizacionActivaId && resourceType !== 'GENERAL'),
  });
  const selectedMember = useMemo(
    () => (membersQuery.data ?? []).find((member) => member.id === memberId) ?? null,
    [memberId, membersQuery.data],
  );
  const assignedFieldsQuery = useQuery({
    queryKey: ['equipo-recursos', organizacionActivaId, memberId],
    queryFn: () => getRecursosAsignables(organizacionActivaId as number, memberId as number),
    enabled: Boolean(organizacionActivaId && memberId && resourceType === 'CAMPO'),
  });
  const activeMembers = (membersQuery.data ?? []).filter((member) => member.activo);
  const activityLimitReached =
    usageQuery.data?.plan === 'FREE' &&
    usageQuery.data.actividades.limite !== null &&
    usageQuery.data.actividades.usadas >= usageQuery.data.actividades.limite;
  const assignMutation = useMutation({
    mutationFn: async () => {
      if (!memberId) throw new Error('Seleccioná un miembro.');

      if (resourceType === 'CAMPO' && resourceId) {
        const selectedField = assignedFieldsQuery.data?.find((field) => field.id === resourceId);
        if (selectedField && !selectedField.asignado) {
          await actualizarCampoAsignado(organizacionActivaId as number, memberId, resourceId, false);
        }
      }

      return crearActividad(organizacionActivaId as number, {
        usuarioOrganizacionId: memberId,
        titulo: title.trim(),
        descripcion: description.trim() || undefined,
        recursoTipo: resourceType,
        recursoId: resourceType === 'GENERAL' ? undefined : resourceId ?? undefined,
        fechaInicio: startDate,
        fechaEstimadaFin: endDate,
        prioridad: priority,
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['actividades', organizacionActivaId] }),
        queryClient.invalidateQueries({ queryKey: ['dashboard-member-activities', organizacionActivaId] }),
        queryClient.invalidateQueries({ queryKey: ['miembros-uso', organizacionActivaId] }),
        queryClient.invalidateQueries({ queryKey: ['equipo-miembros', organizacionActivaId] }),
        queryClient.invalidateQueries({ queryKey: ['equipo-recursos', organizacionActivaId, memberId] }),
      ]);
      Alert.alert('Trabajo asignado', 'El miembro verá la actividad en la sección Tareas.');
      router.replace('/(app)/(tabs)/tareas' as Href);
    },
    onError: (error: unknown) =>
      Alert.alert('No pudimos asignar el trabajo', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });
  const selectedResource = (resourcesQuery.data ?? []).find((resource) => resource.id === resourceId);
  const hasValidDates = /^\d{4}-\d{2}-\d{2}$/.test(startDate) && /^\d{4}-\d{2}-\d{2}$/.test(endDate);
  const canSubmit =
    Boolean(memberId && title.trim().length >= 3 && hasValidDates) &&
    (resourceType === 'GENERAL' || Boolean(resourceId)) &&
    !activityLimitReached;

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}>
      <Pressable onPress={() => router.back()}>
        <Text className="text-sm font-semibold text-emerald-800">‹ Equipo</Text>
      </Pressable>
      <Text className="mt-5 text-3xl font-bold text-slate-900">Asignar trabajo</Text>
      <Text className="mt-2 text-sm leading-5 text-slate-600">
        La actividad se guarda en el equipo y aparece de inmediato para la persona asignada.
      </Text>

      {usageQuery.data?.plan === 'FREE' && (
        <View className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
          <Text className="text-sm font-semibold text-slate-800">
            Plan Free · Trabajos activos: {usageQuery.data.actividades.usadas} / {usageQuery.data.actividades.limite}
          </Text>
          {activityLimitReached && (
            <Text className="mt-2 text-sm text-amber-800">
              Alcanzaste el límite del plan Free. Pasate a Pro para agregar más trabajos.
            </Text>
          )}
        </View>
      )}

      <FormSection title="Miembro">
        {activeMembers.length === 0 ? (
          <Text className="text-sm text-slate-500">Necesitás un miembro activo para asignar un trabajo.</Text>
        ) : (
          <View className="flex-row flex-wrap gap-2">
            {activeMembers.map((member) => (
              <Pressable
                key={member.id}
                className={`rounded-xl border px-3 py-3 ${
                  memberId === member.id ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'
                }`}
                onPress={() => setMemberId(member.id)}
              >
                <Text className={`font-semibold ${memberId === member.id ? 'text-white' : 'text-slate-700'}`}>
                  {member.nombre} {member.apellido}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </FormSection>

      <FormSection title="Detalle">
        <TextInput
          placeholder="Título del trabajo"
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={setTitle}
          className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
        />
        <TextInput
          multiline
          placeholder="Descripción opcional"
          placeholderTextColor="#94a3b8"
          value={description}
          onChangeText={setDescription}
          className="mt-3 min-h-24 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
          textAlignVertical="top"
        />
      </FormSection>

      <FormSection title="Recurso real">
        <View className="flex-row flex-wrap gap-2">
          {RESOURCE_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              className={`rounded-full border px-3 py-2 ${
                resourceType === option.value ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'
              }`}
              onPress={() => {
                setResourceType(option.value);
                setResourceId(null);
              }}
            >
              <Text className={`text-sm font-semibold ${resourceType === option.value ? 'text-white' : 'text-slate-700'}`}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
        {resourceType === 'GENERAL' ? (
          <Text className="mt-4 text-sm text-slate-500">Una actividad general no requiere un recurso vinculado.</Text>
        ) : resourcesQuery.isLoading ? (
          <Text className="mt-4 text-sm text-slate-500">Cargando recursos…</Text>
        ) : (resourcesQuery.data ?? []).length === 0 ? (
          <Text className="mt-4 text-sm text-slate-500">No hay recursos de este tipo en la organización.</Text>
        ) : (
          <View className="mt-4 gap-2">
            {(resourcesQuery.data ?? []).map((resource) => (
              <Pressable
                key={resource.id}
                className={`rounded-xl border p-3 ${
                  resourceId === resource.id ? 'border-emerald-700 bg-emerald-50' : 'border-slate-200 bg-white'
                }`}
                onPress={() => setResourceId(resource.id)}
              >
                <Text className="font-semibold text-slate-800">{resource.nombre}</Text>
                {resource.descripcion && <Text className="mt-1 text-sm text-slate-500">{resource.descripcion}</Text>}
              </Pressable>
            ))}
          </View>
        )}
        {resourceType === 'CAMPO' && selectedMember && selectedResource && (
          <Text className="mt-4 text-sm text-emerald-800">
            {assignedFieldsQuery.data?.some((field) => field.id === selectedResource.id && field.asignado)
              ? 'Este campo ya está habilitado para el miembro.'
              : 'Al asignar el trabajo, este campo también se habilitará para el miembro.'}
          </Text>
        )}
      </FormSection>

      <FormSection title="Fechas y prioridad">
        <Text className="text-sm font-semibold text-slate-700">Inicio (AAAA-MM-DD)</Text>
        <TextInput value={startDate} onChangeText={setStartDate} className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />
        <Text className="mt-4 text-sm font-semibold text-slate-700">Finalización (AAAA-MM-DD)</Text>
        <TextInput value={endDate} onChangeText={setEndDate} className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />
        <View className="mt-4 flex-row flex-wrap gap-2">
          {PRIORITIES.map((option) => (
            <Pressable
              key={option}
              className={`rounded-full border px-3 py-2 ${
                priority === option ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'
              }`}
              onPress={() => setPriority(option)}
            >
              <Text className={`text-sm font-semibold ${priority === option ? 'text-white' : 'text-slate-700'}`}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </FormSection>

      <Pressable
        className="mt-6 items-center rounded-xl bg-emerald-700 px-5 py-4 disabled:opacity-50"
        disabled={!canSubmit || assignMutation.isPending}
        onPress={() => assignMutation.mutate()}
      >
        <Text className="font-semibold text-white">
          {assignMutation.isPending ? 'Asignando trabajo…' : 'Asignar trabajo'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mt-5 rounded-2xl bg-white p-5">
      <Text className="mb-4 text-lg font-bold text-slate-900">{title}</Text>
      {children}
    </View>
  );
}
