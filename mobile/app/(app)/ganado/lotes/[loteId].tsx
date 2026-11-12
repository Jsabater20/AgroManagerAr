import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import {
  cerrarLoteGanadero,
  crearRegistroLoteGanadero,
  eliminarLoteGanadero,
  getLotesGanaderos,
} from '@/api/ganado.api';
import { getApiErrorMessage } from '@/api/errors';
import { useAuthStore } from '@/store/auth.store';
import { SISTEMA_LOTE_GANADERO_LABELS } from '@/types/ganado';

const toIsoDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const fromIsoDate = (value: string) => new Date(`${value}T12:00:00`);
const today = () => toIsoDate(new Date());
const formatDate = (value: string) => new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
const formatMoney = (value: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

export default function LoteGanaderoDetalleScreen() {
  const { loteId } = useLocalSearchParams<{ loteId: string }>();
  const loteIdNumber = Number(loteId);
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const [showControl, setShowControl] = useState(false);
  const [controlDate, setControlDate] = useState(today());
  const [controlHeads, setControlHeads] = useState('');
  const [controlWeight, setControlWeight] = useState('');
  const [controlFood, setControlFood] = useState('');
  const [controlLosses, setControlLosses] = useState('');
  const [controlNotes, setControlNotes] = useState('');
  const [showClose, setShowClose] = useState(false);
  const [closeDate, setCloseDate] = useState(today());
  const [saleAmount, setSaleAmount] = useState('');
  const [datePickerTarget, setDatePickerTarget] = useState<'control' | 'close' | null>(null);

  const loteQuery = useQuery({
    queryKey: ['ganado-lotes', organizacionActivaId],
    queryFn: getLotesGanaderos,
    enabled: Boolean(loteIdNumber),
  });
  const lote = useMemo(() => loteQuery.data?.find((item) => item.id === loteIdNumber), [loteIdNumber, loteQuery.data]);
  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['ganado-lotes', organizacionActivaId] });
    await queryClient.invalidateQueries({ queryKey: ['ganado', organizacionActivaId] });
  };

  const controlMutation = useMutation({
    mutationFn: () => crearRegistroLoteGanadero(loteIdNumber, {
      fecha: controlDate,
      cantidadActual: Number(controlHeads),
      pesoPromedioKg: controlWeight.trim() ? Number(controlWeight.replace(',', '.')) : undefined,
      alimentoKg: controlFood.trim() ? Number(controlFood.replace(',', '.')) : undefined,
      bajas: controlLosses.trim() ? Number(controlLosses) : undefined,
      observaciones: controlNotes.trim() || undefined,
    }),
    onSuccess: async () => {
      setShowControl(false);
      setControlWeight(''); setControlFood(''); setControlLosses(''); setControlNotes('');
      await refresh();
    },
    onError: (error: unknown) => Alert.alert('No pudimos guardar el control', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });
  const closeMutation = useMutation({
    mutationFn: () => cerrarLoteGanadero(loteIdNumber, { fechaEgreso: closeDate, precioVentaTotal: saleAmount.trim() ? Number(saleAmount.replace(',', '.')) : undefined }),
    onSuccess: async () => {
      setShowClose(false);
      await refresh();
    },
    onError: (error: unknown) => Alert.alert('No pudimos cerrar el lote', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });
  const deleteMutation = useMutation({
    mutationFn: () => eliminarLoteGanadero(loteIdNumber),
    onSuccess: () => router.replace('/(app)/ganado'),
    onError: (error: unknown) => Alert.alert('No pudimos eliminar el lote', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });

  const heads = Number(controlHeads);
  const weight = controlWeight.trim() ? Number(controlWeight.replace(',', '.')) : undefined;
  const food = controlFood.trim() ? Number(controlFood.replace(',', '.')) : undefined;
  const losses = controlLosses.trim() ? Number(controlLosses) : undefined;
  const validControl = Number.isInteger(heads) && heads >= 0 && (!controlWeight.trim() || (Number.isFinite(weight) && (weight ?? 0) >= 0)) && (!controlFood.trim() || (Number.isFinite(food) && (food ?? 0) >= 0)) && (!controlLosses.trim() || (Number.isInteger(losses) && (losses ?? 0) >= 0));
  const sale = saleAmount.trim() ? Number(saleAmount.replace(',', '.')) : undefined;
  const validClose = !saleAmount.trim() || (Number.isFinite(sale) && (sale ?? 0) >= 0);

  if (loteQuery.isLoading) return <Loading />;
  if (loteQuery.isError || !lote) return <LoadError error={loteQuery.error} onRetry={() => void loteQuery.refetch()} />;

  const lastControl = lote.registros[0];
  const variation = lote.pesoPromedioActualKg != null && lote.pesoPromedioIngresoKg != null ? lote.pesoPromedioActualKg - lote.pesoPromedioIngresoKg : null;
  const openControl = () => {
    setControlDate(today());
    setControlHeads(String(lote.cantidadActual));
    setControlWeight(lote.pesoPromedioActualKg != null ? String(lote.pesoPromedioActualKg) : '');
    setControlFood(''); setControlLosses(''); setControlNotes('');
    setShowControl(true);
  };

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}>
      <Pressable onPress={() => router.back()}><Text className="text-sm font-semibold text-emerald-800">‹ Ganadería</Text></Pressable>
      <View className="mt-5 rounded-2xl bg-emerald-800 p-5">
        <Text className="text-xs font-bold uppercase tracking-widest text-emerald-200">{SISTEMA_LOTE_GANADERO_LABELS[lote.sistema]}</Text>
        <Text className="mt-2 text-3xl font-bold text-white">{lote.nombre}</Text>
        <Text className="mt-2 text-sm text-emerald-100">{lote.ubicacion || 'Sin ubicación indicada'} · Ingreso {formatDate(lote.fechaIngreso)}</Text>
        <View className="mt-5 flex-row gap-3"><Summary label="Cabezas" value={String(lote.cantidadActual)} /><Summary label="Peso prom." value={lote.pesoPromedioActualKg != null ? `${lote.pesoPromedioActualKg} kg` : '—'} /><Summary label="Vinculados" value={String(lote._count?.animales ?? 0)} /></View>
      </View>

      {lote.observaciones ? <Text className="mt-4 rounded-xl bg-white p-4 text-sm leading-5 text-slate-600">{lote.observaciones}</Text> : null}

      {lote.estado === 'ACTIVO' ? (
        <View className="mt-5 gap-3">
          <Pressable className="items-center rounded-xl bg-emerald-700 px-4 py-4" onPress={openControl}><Text className="font-semibold text-white">Registrar control</Text></Pressable>
          <Pressable className="items-center rounded-xl border border-slate-300 bg-white px-4 py-3" onPress={() => { setCloseDate(today()); setSaleAmount(''); setShowClose(true); }}><Text className="font-semibold text-slate-700">Cerrar lote o registrar venta</Text></Pressable>
        </View>
      ) : (
        <View className="mt-5 rounded-xl border border-slate-200 bg-white p-4"><Text className="font-bold text-slate-800">Lote cerrado</Text><Text className="mt-1 text-sm text-slate-600">Egreso: {lote.fechaEgreso ? formatDate(lote.fechaEgreso) : '—'}{lote.precioVentaTotal != null ? ` · Venta ${formatMoney(lote.precioVentaTotal)}` : ''}</Text></View>
      )}

      {variation != null ? <Text className={`mt-4 text-sm font-semibold ${variation >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>Variación desde el ingreso: {variation >= 0 ? '+' : ''}{variation.toFixed(1)} kg por cabeza</Text> : null}

      {showControl && (
        <Section title="Nuevo control" description="Actualizá la situación real del rodeo o corral.">
          <DateRow label="Fecha" value={controlDate} onPress={() => setDatePickerTarget('control')} />
          <Label text="Cabezas actuales *" extra><Input value={controlHeads} onChangeText={setControlHeads} keyboardType="number-pad" /></Label>
          <View className="mt-4 flex-row gap-3"><View className="flex-1"><Label text="Peso prom. kg"><Input value={controlWeight} onChangeText={setControlWeight} keyboardType="decimal-pad" placeholder="Opcional" /></Label></View><View className="flex-1"><Label text="Alimento kg"><Input value={controlFood} onChangeText={setControlFood} keyboardType="decimal-pad" placeholder="Opcional" /></Label></View></View>
          <Label text="Bajas" extra><Input value={controlLosses} onChangeText={setControlLosses} keyboardType="number-pad" placeholder="0" /></Label>
          <Label text="Observaciones" extra><TextInput value={controlNotes} onChangeText={setControlNotes} multiline textAlignVertical="top" placeholder="Opcional" placeholderTextColor="#94a3b8" className="mt-2 min-h-20 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" /></Label>
          <Pressable className="mt-6 items-center rounded-xl bg-emerald-700 px-4 py-3 disabled:opacity-50" disabled={!validControl || controlMutation.isPending} onPress={() => controlMutation.mutate()}><Text className="font-semibold text-white">{controlMutation.isPending ? 'Guardando…' : 'Guardar control'}</Text></Pressable>
        </Section>
      )}

      {showClose && (
        <Section title="Cerrar lote" description="El historial se conserva y el lote deja de aceptar controles.">
          <DateRow label="Fecha de egreso o venta" value={closeDate} onPress={() => setDatePickerTarget('close')} />
          <Label text="Importe total de venta" extra><Input value={saleAmount} onChangeText={setSaleAmount} keyboardType="decimal-pad" placeholder="Opcional" /></Label>
          <Pressable className="mt-6 items-center rounded-xl bg-slate-800 px-4 py-3 disabled:opacity-50" disabled={!validClose || closeMutation.isPending} onPress={() => Alert.alert('Cerrar lote', 'No podrás cargar más controles en este lote.', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Cerrar lote', style: 'destructive', onPress: () => closeMutation.mutate() }])}><Text className="font-semibold text-white">{closeMutation.isPending ? 'Cerrando…' : 'Confirmar cierre'}</Text></Pressable>
        </Section>
      )}

      {datePickerTarget && <DateTimePicker value={fromIsoDate(datePickerTarget === 'control' ? controlDate : closeDate)} mode="date" onChange={(_event, selectedDate) => { setDatePickerTarget(null); if (selectedDate) { const value = toIsoDate(selectedDate); if (datePickerTarget === 'control') setControlDate(value); else setCloseDate(value); } }} />}

      <Section title="Historial de controles" description={lastControl ? `Último control: ${formatDate(lastControl.fecha)}.` : 'Todavía no hay controles registrados.'}>
        <View className="gap-2">
          {lote.registros.length === 0 ? <Text className="text-sm text-slate-500">Registrá el primer control para empezar el seguimiento.</Text> : lote.registros.map((registro) => <View key={registro.id} className="rounded-xl border border-slate-200 p-3"><View className="flex-row items-center justify-between"><Text className="font-bold text-slate-800">{formatDate(registro.fecha)}</Text><Text className="text-sm font-semibold text-emerald-800">{registro.cantidadActual} cabezas</Text></View><Text className="mt-1 text-sm text-slate-600">{registro.pesoPromedioKg != null ? `${registro.pesoPromedioKg} kg prom.` : 'Sin pesada'}{registro.alimentoKg > 0 ? ` · ${registro.alimentoKg} kg alimento` : ''}{registro.bajas > 0 ? ` · ${registro.bajas} bajas` : ''}</Text>{registro.observaciones ? <Text className="mt-1 text-sm text-slate-500">{registro.observaciones}</Text> : null}</View>)}
        </View>
      </Section>

      <Pressable className="mt-2 items-center px-4 py-3" disabled={deleteMutation.isPending} onPress={() => Alert.alert('Eliminar lote', 'Se eliminarán sus controles y los animales dejarán de estar vinculados.', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', style: 'destructive', onPress: () => deleteMutation.mutate() }])}><Text className="font-semibold text-red-600">{deleteMutation.isPending ? 'Eliminando…' : 'Eliminar lote'}</Text></Pressable>
    </ScrollView>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <View className="flex-1 rounded-xl bg-white/15 p-3"><Text className="text-xs text-emerald-100">{label}</Text><Text className="mt-1 text-lg font-bold text-white">{value}</Text></View>;
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <View className="mt-6 rounded-2xl bg-white p-5"><Text className="text-lg font-bold text-slate-900">{title}</Text><Text className="mt-1 text-sm leading-5 text-slate-600">{description}</Text><View className="mt-5">{children}</View></View>;
}

function DateRow({ label, value, onPress }: { label: string; value: string; onPress: () => void }) {
  return <View><Text className="text-sm font-semibold text-slate-800">{label}</Text><Pressable className="mt-2 flex-row items-center justify-between rounded-xl border border-slate-200 px-4 py-3" onPress={onPress}><Text className="text-base text-slate-900">{formatDate(value)}</Text><Text className="text-lg text-emerald-700">📅</Text></Pressable></View>;
}

function Input(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput {...props} placeholderTextColor="#94a3b8" className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />;
}

function Label({ text, extra, children }: { text: string; extra?: boolean; children: React.ReactNode }) {
  return <View className={extra ? 'mt-4' : ''}><Text className="text-sm font-semibold text-slate-800">{text}</Text>{children}</View>;
}

function Loading() {
  return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator color="#15803d" size="large" /><Text className="mt-3 text-sm text-slate-500">Cargando lote…</Text></View>;
}

function LoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  return <View className="flex-1 items-center justify-center bg-slate-50 px-6"><Text className="text-center text-xl font-bold text-slate-900">No pudimos cargar el lote</Text><Text className="mt-2 text-center text-sm text-slate-500">{getApiErrorMessage(error, 'Intentá nuevamente.')}</Text><Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={onRetry}><Text className="font-semibold text-white">Reintentar</Text></Pressable></View>;
}
