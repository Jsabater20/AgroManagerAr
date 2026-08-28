import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import {
  actualizarEstadoPrenez,
  crearPeso,
  crearPrenez,
  eliminarPeso,
  getAnimal,
  getPesos,
} from '@/api/ganado.api';
import { getApiErrorMessage } from '@/api/errors';
import { useAuthStore } from '@/store/auth.store';
import {
  CATEGORIA_LABELS,
  ESPECIE_LABELS,
  GESTATION_DAYS,
  type EstadoPrenez,
} from '@/types/ganado';

const today = () => new Date().toISOString().slice(0, 10);

export default function AnimalDetalleScreen() {
  const { animalId } = useLocalSearchParams<{ animalId: string }>();
  const animalIdNumber = Number(animalId);
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const [weight, setWeight] = useState('');
  const [weightDate, setWeightDate] = useState(today());
  const [weightNotes, setWeightNotes] = useState('');
  const [pregnancyDate, setPregnancyDate] = useState(today());
  const [pregnancyNotes, setPregnancyNotes] = useState('');
  const animalQuery = useQuery({
    queryKey: ['ganado-animal', animalIdNumber],
    queryFn: () => getAnimal(animalIdNumber),
    enabled: Boolean(animalIdNumber),
  });
  const weightsQuery = useQuery({
    queryKey: ['ganado-pesos', animalIdNumber],
    queryFn: () => getPesos(animalIdNumber),
    enabled: Boolean(animalIdNumber),
  });
  const refreshAnimal = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['ganado', organizacionActivaId] }),
      queryClient.invalidateQueries({ queryKey: ['ganado-animal', animalIdNumber] }),
      queryClient.invalidateQueries({ queryKey: ['ganado-pesos', animalIdNumber] }),
    ]);
  };
  const addWeightMutation = useMutation({
    mutationFn: () => crearPeso(animalIdNumber, { peso: Number(weight), fecha: weightDate, observaciones: weightNotes.trim() || undefined }),
    onSuccess: async () => {
      setWeight('');
      setWeightNotes('');
      await refreshAnimal();
    },
    onError: (error: unknown) => Alert.alert('No pudimos registrar el peso', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });
  const deleteWeightMutation = useMutation({
    mutationFn: (pesoId: number) => eliminarPeso(pesoId),
    onSuccess: refreshAnimal,
    onError: (error: unknown) => Alert.alert('No pudimos eliminar el registro', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });
  const addPregnancyMutation = useMutation({
    mutationFn: () => crearPrenez(animalIdNumber, { fechaInicio: pregnancyDate, observaciones: pregnancyNotes.trim() || undefined }),
    onSuccess: async () => {
      setPregnancyNotes('');
      await refreshAnimal();
    },
    onError: (error: unknown) => Alert.alert('No pudimos registrar la preñez', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });
  const pregnancyStatusMutation = useMutation({
    mutationFn: ({ prenezId, estado }: { prenezId: number; estado: EstadoPrenez }) => actualizarEstadoPrenez(prenezId, estado),
    onSuccess: refreshAnimal,
    onError: (error: unknown) => Alert.alert('No pudimos actualizar la preñez', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });

  const animal = animalQuery.data;
  const weights = useMemo(
    () => [...(weightsQuery.data ?? [])].sort((first, second) => new Date(second.fecha).getTime() - new Date(first.fecha).getTime()),
    [weightsQuery.data],
  );
  const activePregnancy = animal?.preneces.find((pregnancy) => pregnancy.estado === 'EN_CURSO');
  const estimatedBirth = useMemo(() => {
    if (!animal || !pregnancyDate) return null;
    const date = new Date(`${pregnancyDate}T12:00:00`);
    date.setDate(date.getDate() + GESTATION_DAYS[animal.especie]);
    return date.toISOString();
  }, [animal, pregnancyDate]);

  if (animalQuery.isLoading) return <Loading />;
  if (animalQuery.isError || !animal) return <LoadError error={animalQuery.error} onRetry={() => void animalQuery.refetch()} />;

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}>
      <Pressable onPress={() => router.back()}><Text className="text-sm font-semibold text-emerald-800">‹ Ganadería</Text></Pressable>

      <View className="mt-5 rounded-2xl bg-emerald-800 p-5">
        <Text className="text-3xl font-bold text-white">{animal.nombre}</Text>
        <Text className="mt-2 text-sm text-emerald-100">
          {ESPECIE_LABELS[animal.especie]} · {CATEGORIA_LABELS[animal.categoria]} · {animal.sexo === 'HEMBRA' ? 'Hembra' : 'Macho'}
        </Text>
        <View className="mt-5 flex-row gap-3">
          <Summary label="Peso actual" value={animal.peso !== null && animal.peso !== undefined ? `${animal.peso} kg` : 'Sin registro'} />
          <Summary label="Preñeces" value={String(animal.preneces.length)} />
        </View>
      </View>

      {animal.observaciones && <Text className="mt-4 rounded-xl bg-white p-4 text-sm leading-5 text-slate-600">{animal.observaciones}</Text>}

      <Section title="Pesajes" description="Registrá el peso para actualizar el historial del animal.">
        <View className="flex-row gap-2">
          <TextInput value={weight} onChangeText={setWeight} keyboardType="decimal-pad" placeholder="Peso kg" placeholderTextColor="#94a3b8" className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />
          <TextInput value={weightDate} onChangeText={setWeightDate} placeholder="AAAA-MM-DD" placeholderTextColor="#94a3b8" className="w-32 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-900" />
        </View>
        <TextInput value={weightNotes} onChangeText={setWeightNotes} placeholder="Observación opcional" placeholderTextColor="#94a3b8" className="mt-3 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />
        <Pressable className="mt-3 items-center rounded-xl bg-emerald-700 px-4 py-3 disabled:opacity-50" disabled={!weight || Number(weight) < 0 || !/^\d{4}-\d{2}-\d{2}$/.test(weightDate) || addWeightMutation.isPending} onPress={() => addWeightMutation.mutate()}>
          <Text className="font-semibold text-white">{addWeightMutation.isPending ? 'Guardando…' : 'Registrar peso'}</Text>
        </Pressable>

        {weightsQuery.isLoading ? <ActivityIndicator className="mt-5" color="#15803d" /> : (
          <View className="mt-5 gap-2">
            {weights.length === 0 ? <Text className="text-sm text-slate-500">Todavía no hay pesajes registrados.</Text> : weights.map((item, index) => {
              const previous = weights[index + 1];
              const difference = previous ? item.peso - previous.peso : null;
              return (
                <View key={item.id} className="rounded-xl border border-slate-100 p-3">
                  <View className="flex-row items-center justify-between gap-3">
                    <View>
                      <Text className="font-semibold text-slate-800">{item.peso} kg · {formatDate(item.fecha)}</Text>
                      {item.observaciones && <Text className="mt-1 text-sm text-slate-500">{item.observaciones}</Text>}
                    </View>
                    <View className="items-end gap-2">
                      {difference !== null && <Text className={`text-xs font-bold ${difference >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>{difference >= 0 ? '+' : ''}{difference.toFixed(1)} kg</Text>}
                      <Pressable onPress={() => Alert.alert('Eliminar pesaje', '¿Querés eliminar este registro?', [{ text: 'Volver', style: 'cancel' }, { text: 'Eliminar', style: 'destructive', onPress: () => deleteWeightMutation.mutate(item.id) }])}>
                        <Text className="text-xs font-semibold text-red-600">Eliminar</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </Section>

      {animal.sexo === 'HEMBRA' && (
        <Section title="Preñeces" description={`Gestación estimada: ${GESTATION_DAYS[animal.especie]} días.`}>
          {animal.preneces.length > 0 && (
            <View className="gap-2">
              {animal.preneces.map((pregnancy) => (
                <View key={pregnancy.id} className="rounded-xl border border-slate-100 p-3">
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                      <Text className="font-semibold text-slate-800">Inicio: {formatDate(pregnancy.fechaInicio)}</Text>
                      <Text className="mt-1 text-sm text-slate-500">Parto estimado: {formatDate(pregnancy.fechaEstimadaParto)}</Text>
                      {pregnancy.observaciones && <Text className="mt-1 text-sm text-slate-500">{pregnancy.observaciones}</Text>}
                    </View>
                    <StatusBadge estado={pregnancy.estado} />
                  </View>
                  {pregnancy.estado === 'EN_CURSO' && (
                    <View className="mt-3 flex-row gap-2">
                      <Pressable className="rounded-lg bg-emerald-50 px-3 py-2" disabled={pregnancyStatusMutation.isPending} onPress={() => pregnancyStatusMutation.mutate({ prenezId: pregnancy.id, estado: 'COMPLETADA' })}>
                        <Text className="text-sm font-semibold text-emerald-700">Completada</Text>
                      </Pressable>
                      <Pressable className="rounded-lg bg-red-50 px-3 py-2" disabled={pregnancyStatusMutation.isPending} onPress={() => pregnancyStatusMutation.mutate({ prenezId: pregnancy.id, estado: 'PERDIDA' })}>
                        <Text className="text-sm font-semibold text-red-700">Perdida</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
          {!activePregnancy && (
            <View className="mt-5 border-t border-slate-100 pt-5">
              <Text className="text-sm font-semibold text-slate-800">Registrar nueva preñez</Text>
              <TextInput value={pregnancyDate} onChangeText={setPregnancyDate} placeholder="AAAA-MM-DD" placeholderTextColor="#94a3b8" className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />
              {estimatedBirth && <Text className="mt-2 text-sm text-blue-700">Parto estimado: {formatDate(estimatedBirth)}</Text>}
              <TextInput value={pregnancyNotes} onChangeText={setPregnancyNotes} placeholder="Observación opcional" placeholderTextColor="#94a3b8" className="mt-3 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />
              <Pressable className="mt-3 items-center rounded-xl bg-emerald-700 px-4 py-3 disabled:opacity-50" disabled={!/^\d{4}-\d{2}-\d{2}$/.test(pregnancyDate) || addPregnancyMutation.isPending} onPress={() => addPregnancyMutation.mutate()}>
                <Text className="font-semibold text-white">{addPregnancyMutation.isPending ? 'Registrando…' : 'Registrar preñez'}</Text>
              </Pressable>
            </View>
          )}
        </Section>
      )}
    </ScrollView>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <View className="flex-1 rounded-xl bg-emerald-700 p-3"><Text className="text-xs text-emerald-100">{label}</Text><Text className="mt-1 font-bold text-white">{value}</Text></View>;
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <View className="mt-5 rounded-2xl bg-white p-5"><Text className="text-lg font-bold text-slate-900">{title}</Text><Text className="mt-1 text-sm text-slate-500">{description}</Text><View className="mt-4">{children}</View></View>;
}

function StatusBadge({ estado }: { estado: EstadoPrenez }) {
  const styles: Record<EstadoPrenez, string> = { EN_CURSO: 'bg-blue-100 text-blue-800', COMPLETADA: 'bg-emerald-100 text-emerald-800', PERDIDA: 'bg-red-100 text-red-700' };
  return <Text className={`rounded-full px-2 py-1 text-xs font-bold ${styles[estado]}`}>{estado.replace('_', ' ')}</Text>;
}

function Loading() {
  return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator color="#15803d" size="large" /><Text className="mt-3 text-sm text-slate-500">Cargando animal…</Text></View>;
}

function LoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  return <View className="flex-1 items-center justify-center bg-slate-50 px-6"><Text className="text-center text-xl font-bold text-slate-900">No pudimos cargar el animal</Text><Text className="mt-2 text-center text-sm text-slate-500">{getApiErrorMessage(error, 'Intentá nuevamente.')}</Text><Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={onRetry}><Text className="font-semibold text-white">Reintentar</Text></Pressable></View>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}
