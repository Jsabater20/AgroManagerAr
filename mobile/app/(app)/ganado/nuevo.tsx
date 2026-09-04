import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { crearAnimal } from '@/api/ganado.api';
import { getApiErrorMessage } from '@/api/errors';
import { useAuthStore } from '@/store/auth.store';
import {
  CATEGORIA_LABELS,
  CATEGORIAS_POR_ESPECIE,
  ESPECIES,
  ESPECIE_LABELS,
  type CategoriaAnimal,
  type Especie,
  type Sexo,
} from '@/types/ganado';

const today = () => new Date().toISOString().slice(0, 10);

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;

const fromIsoDate = (value: string) => new Date(`${value}T12:00:00`);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(fromIsoDate(value));

export default function NuevoAnimalScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState<Especie>('BOVINO');
  const [sexo, setSexo] = useState<Sexo>('HEMBRA');
  const categorias = useMemo(() => CATEGORIAS_POR_ESPECIE[especie][sexo === 'HEMBRA' ? 'hembra' : 'macho'], [especie, sexo]);
  const [categoria, setCategoria] = useState<CategoriaAnimal>('VACA');
  const [peso, setPeso] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [observaciones, setObservaciones] = useState('');
  const createMutation = useMutation({
    mutationFn: () =>
      crearAnimal({
        nombre: nombre.trim(),
        especie,
        sexo,
        categoria,
        peso: peso.trim() ? Number(peso.replace(',', '.')) : undefined,
        fechaNacimiento: fechaNacimiento || undefined,
        observaciones: observaciones.trim() || undefined,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['ganado', organizacionActivaId] });
      Alert.alert('Animal registrado', 'El animal ya forma parte del rodeo.');
      router.back();
    },
    onError: (error: unknown) =>
      Alert.alert('No pudimos registrar el animal', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });
  const changeSpecies = (next: Especie) => {
    const nextCategories = CATEGORIAS_POR_ESPECIE[next][sexo === 'HEMBRA' ? 'hembra' : 'macho'];
    setEspecie(next);
    setCategoria(nextCategories[0]);
  };
  const changeSex = (next: Sexo) => {
    setSexo(next);
    setCategoria(CATEGORIAS_POR_ESPECIE[especie][next === 'HEMBRA' ? 'hembra' : 'macho'][0]);
  };
  const normalizedWeight = peso.trim() ? Number(peso.replace(',', '.')) : undefined;
  const canSubmit =
    nombre.trim().length >= 2 &&
    (normalizedWeight === undefined || (Number.isFinite(normalizedWeight) && normalizedWeight >= 0)) &&
    (!fechaNacimiento || /^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento));

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}>
      <Pressable onPress={() => router.back()}><Text className="text-sm font-semibold text-emerald-800">‹ Ganadería</Text></Pressable>
      <Text className="mt-5 text-3xl font-bold text-slate-900">Nuevo animal</Text>
      <Text className="mt-2 text-sm text-slate-600">Completá los datos básicos para registrar el animal.</Text>

      <View className="mt-7 rounded-2xl bg-white p-5">
        <Text className="text-sm font-semibold text-slate-800">Nombre o caravana</Text>
        <TextInput value={nombre} onChangeText={setNombre} placeholder="Ej: Vaca 142" placeholderTextColor="#94a3b8" className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />

        <Text className="mt-6 text-sm font-semibold text-slate-800">Especie</Text>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {ESPECIES.map((option) => <Choice key={option} label={ESPECIE_LABELS[option]} active={especie === option} onPress={() => changeSpecies(option)} />)}
        </View>

        <Text className="mt-6 text-sm font-semibold text-slate-800">Sexo</Text>
        <View className="mt-2 flex-row gap-2">
          <Choice label="Hembra" active={sexo === 'HEMBRA'} onPress={() => changeSex('HEMBRA')} />
          <Choice label="Macho" active={sexo === 'MACHO'} onPress={() => changeSex('MACHO')} />
        </View>

        <Text className="mt-6 text-sm font-semibold text-slate-800">Categoría</Text>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {categorias.map((option) => <Choice key={option} label={CATEGORIA_LABELS[option]} active={categoria === option} onPress={() => setCategoria(option)} />)}
        </View>

        <Text className="mt-6 text-sm font-semibold text-slate-800">Peso actual (kg)</Text>
        <TextInput value={peso} onChangeText={setPeso} keyboardType="decimal-pad" placeholder="Opcional" placeholderTextColor="#94a3b8" className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />

        <Text className="mt-6 text-sm font-semibold text-slate-800">Fecha de nacimiento</Text>
        <Pressable
          className="mt-2 flex-row items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
          onPress={() => setShowBirthDatePicker(true)}
        >
          <Text className={fechaNacimiento ? 'text-base text-slate-900' : 'text-base text-slate-400'}>
            {fechaNacimiento ? formatDate(fechaNacimiento) : 'Elegir fecha (opcional)'}
          </Text>
          <Text className="text-lg text-emerald-700">📅</Text>
        </Pressable>
        {fechaNacimiento ? (
          <Pressable className="mt-2 self-start" onPress={() => setFechaNacimiento('')}>
            <Text className="text-sm font-semibold text-red-600">Quitar fecha</Text>
          </Pressable>
        ) : null}
        {showBirthDatePicker ? (
          <DateTimePicker
            value={fechaNacimiento ? fromIsoDate(fechaNacimiento) : new Date(today())}
            mode="date"
            maximumDate={new Date()}
            onChange={(_event, selectedDate) => {
              setShowBirthDatePicker(false);
              if (selectedDate) setFechaNacimiento(toIsoDate(selectedDate));
            }}
          />
        ) : null}

        <Text className="mt-6 text-sm font-semibold text-slate-800">Observaciones</Text>
        <TextInput value={observaciones} onChangeText={setObservaciones} multiline textAlignVertical="top" placeholder="Opcional" placeholderTextColor="#94a3b8" className="mt-2 min-h-24 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />

        <Pressable className="mt-7 items-center rounded-xl bg-emerald-700 px-5 py-4 disabled:opacity-50" disabled={!canSubmit || createMutation.isPending} onPress={() => createMutation.mutate()}>
          <Text className="font-semibold text-white">{createMutation.isPending ? 'Registrando animal…' : 'Registrar animal'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Choice({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable className={`rounded-full border px-3 py-2 ${active ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'}`} onPress={onPress}>
      <Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-700'}`}>{label}</Text>
    </Pressable>
  );
}
