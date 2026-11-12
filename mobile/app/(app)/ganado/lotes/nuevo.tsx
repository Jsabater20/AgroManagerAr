import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { crearLoteGanadero } from '@/api/ganado.api';
import { getApiErrorMessage } from '@/api/errors';
import { useAuthStore } from '@/store/auth.store';
import {
  SISTEMA_LOTE_GANADERO_LABELS,
  SISTEMAS_LOTE_GANADERO,
  type SistemaLoteGanadero,
} from '@/types/ganado';

const toIsoDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const fromIsoDate = (value: string) => new Date(`${value}T12:00:00`);
const today = () => toIsoDate(new Date());
const formatDate = (value: string) => new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(fromIsoDate(value));

export default function NuevoLoteGanaderoScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const [nombre, setNombre] = useState('');
  const [sistema, setSistema] = useState<SistemaLoteGanadero>('CRIA_PROPIA');
  const [cantidadInicial, setCantidadInicial] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState(today());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pesoPromedio, setPesoPromedio] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [costoCompra, setCostoCompra] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const cantidad = Number(cantidadInicial);
  const peso = pesoPromedio.trim() ? Number(pesoPromedio.replace(',', '.')) : undefined;
  const costo = costoCompra.trim() ? Number(costoCompra.replace(',', '.')) : undefined;
  const valid = nombre.trim().length >= 2 && Number.isInteger(cantidad) && cantidad > 0 && (!pesoPromedio.trim() || (Number.isFinite(peso) && (peso ?? 0) >= 0)) && (!costoCompra.trim() || (Number.isFinite(costo) && (costo ?? 0) >= 0));
  const createMutation = useMutation({
    mutationFn: () => crearLoteGanadero({
      nombre: nombre.trim(),
      sistema,
      cantidadInicial: cantidad,
      fechaIngreso,
      pesoPromedioIngresoKg: peso,
      costoCompraTotal: costo,
      ubicacion: ubicacion.trim() || undefined,
      observaciones: observaciones.trim() || undefined,
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['ganado-lotes', organizacionActivaId] });
      Alert.alert('Lote creado', 'Ya podés registrar sus controles desde Ganadería.');
      router.back();
    },
    onError: (error: unknown) => Alert.alert('No pudimos crear el lote', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}>
      <Pressable onPress={() => router.back()}><Text className="text-sm font-semibold text-emerald-800">‹ Ganadería</Text></Pressable>
      <Text className="mt-5 text-3xl font-bold text-slate-900">Nuevo rodeo o lote</Text>
      <Text className="mt-2 text-sm leading-5 text-slate-600">Creá un grupo para cría propia, invernada comprada o un corral de feedlot.</Text>

      <View className="mt-7 rounded-2xl bg-white p-5">
        <Label text="Nombre del lote *"><Input value={nombre} onChangeText={setNombre} placeholder="Ej: Terneros otoño 2026" /></Label>

        <Text className="mt-6 text-sm font-semibold text-slate-800">Etapa productiva</Text>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {SISTEMAS_LOTE_GANADERO.map((item) => <Choice key={item} label={SISTEMA_LOTE_GANADERO_LABELS[item]} active={sistema === item} onPress={() => setSistema(item)} />)}
        </View>

        <Label text="Cantidad inicial *" extra><Input value={cantidadInicial} onChangeText={setCantidadInicial} keyboardType="number-pad" placeholder="Ej: 80" /></Label>
        <Text className="mt-6 text-sm font-semibold text-slate-800">Fecha de ingreso *</Text>
        <Pressable className="mt-2 flex-row items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3" onPress={() => setShowDatePicker(true)}>
          <Text className="text-base text-slate-900">{formatDate(fechaIngreso)}</Text>
          <Text className="text-lg text-emerald-700">📅</Text>
        </Pressable>
        {showDatePicker && <DateTimePicker value={fromIsoDate(fechaIngreso)} mode="date" onChange={(_event, selectedDate) => { setShowDatePicker(false); if (selectedDate) setFechaIngreso(toIsoDate(selectedDate)); }} />}

        <Label text="Peso promedio inicial (kg)" extra><Input value={pesoPromedio} onChangeText={setPesoPromedio} keyboardType="decimal-pad" placeholder="Opcional" /></Label>
        <Label text="Ubicación o corral" extra><Input value={ubicacion} onChangeText={setUbicacion} placeholder="Ej: Corral 2 o Campo Norte" /></Label>
        <Label text="Costo de compra total" extra><Input value={costoCompra} onChangeText={setCostoCompra} keyboardType="decimal-pad" placeholder="Solo si corresponde" /></Label>
        <Label text="Observaciones" extra><TextInput value={observaciones} onChangeText={setObservaciones} multiline textAlignVertical="top" placeholder="Opcional" placeholderTextColor="#94a3b8" className="mt-2 min-h-24 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" /></Label>

        <Pressable className="mt-7 items-center rounded-xl bg-emerald-700 px-5 py-4 disabled:opacity-50" disabled={!valid || createMutation.isPending} onPress={() => createMutation.mutate()}>
          <Text className="font-semibold text-white">{createMutation.isPending ? 'Creando lote…' : 'Crear lote'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Input(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput {...props} placeholderTextColor="#94a3b8" className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />;
}

function Label({ text, extra, children }: { text: string; extra?: boolean; children: React.ReactNode }) {
  return <View className={extra ? 'mt-4' : ''}><Text className="text-sm font-semibold text-slate-800">{text}</Text>{children}</View>;
}

function Choice({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable className={`rounded-full border px-3 py-2 ${active ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'}`} onPress={onPress}><Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-700'}`}>{label}</Text></Pressable>;
}
