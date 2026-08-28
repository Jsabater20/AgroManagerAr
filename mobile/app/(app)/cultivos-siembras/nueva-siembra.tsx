import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { getCultivos } from '@/api/cultivos.api';
import { getApiErrorMessage } from '@/api/errors';
import { crearSiembra, getLotesDisponiblesSiembra } from '@/api/siembras.api';
import { useAuthStore } from '@/store/auth.store';

const today = () => new Date().toISOString().slice(0, 10);

export default function NuevaSiembraScreen() {
  const organizacionId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const [loteId, setLoteId] = useState<number | null>(null);
  const [tipoCultivoId, setTipoCultivoId] = useState<number | null>(null);
  const [fechaSiembra, setFechaSiembra] = useState(today());
  const [densidad, setDensidad] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const lotesQuery = useQuery({ queryKey: ['siembras-lotes-disponibles', organizacionId], queryFn: getLotesDisponiblesSiembra });
  const cultivosQuery = useQuery({ queryKey: ['cultivos'], queryFn: getCultivos });
  const mutation = useMutation({
    mutationFn: () => crearSiembra({ loteId: loteId as number, tipoCultivoId: tipoCultivoId as number, fechaSiembra, densidad: densidad.trim() ? Number(densidad) : undefined, observaciones: observaciones.trim() || undefined }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['siembras', organizacionId] });
      Alert.alert('Siembra registrada', 'Ya podés hacer seguimiento de su estado y cosecha.');
      router.back();
    },
    onError: (error: unknown) => Alert.alert('No pudimos registrar la siembra', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });
  const valid = loteId !== null && tipoCultivoId !== null && /^\d{4}-\d{2}-\d{2}$/.test(fechaSiembra) && (!densidad.trim() || (Number(densidad) >= 0 && Number.isFinite(Number(densidad))));

  if (lotesQuery.isLoading || cultivosQuery.isLoading) return <Loading />;
  if (lotesQuery.isError || cultivosQuery.isError) return <LoadError error={lotesQuery.error ?? cultivosQuery.error} />;

  return <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}><Pressable onPress={() => router.back()}><Text className="text-sm font-semibold text-emerald-800">‹ Producción</Text></Pressable><Text className="mt-5 text-3xl font-bold text-slate-900">Nueva siembra</Text><Text className="mt-2 text-base text-slate-600">Elegí un lote asignado y registrá los datos productivos.</Text><View className="mt-7 rounded-2xl bg-white p-5"><Label text="Lote"><SelectOptions empty="No tenés lotes asignados." items={lotesQuery.data ?? []} selectedId={loteId} onSelect={setLoteId} /></Label><Label text="Cultivo"><SelectOptions empty="No hay cultivos disponibles." items={cultivosQuery.data ?? []} selectedId={tipoCultivoId} onSelect={setTipoCultivoId} /></Label><Label text="Fecha de siembra"><Input value={fechaSiembra} onChangeText={setFechaSiembra} placeholder="AAAA-MM-DD" keyboardType="numbers-and-punctuation" /></Label><Label text="Densidad (kg/ha)"><Input value={densidad} onChangeText={setDensidad} placeholder="Opcional" keyboardType="decimal-pad" /></Label><Label text="Observaciones"><TextInput value={observaciones} onChangeText={setObservaciones} multiline textAlignVertical="top" placeholder="Opcional" placeholderTextColor="#94a3b8" className="mt-2 min-h-24 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" /></Label><Pressable className="mt-7 items-center rounded-xl bg-emerald-700 px-5 py-4 disabled:opacity-50" disabled={!valid || mutation.isPending} onPress={() => mutation.mutate()}><Text className="font-semibold text-white">{mutation.isPending ? 'Registrando…' : 'Registrar siembra'}</Text></Pressable></View></ScrollView>;
}

function SelectOptions({ items, selectedId, onSelect, empty }: { items: Array<{ id: number; nombre: string; descripcion?: string | null }>; selectedId: number | null; onSelect: (id: number) => void; empty: string }) { if (items.length === 0) return <Text className="mt-2 text-sm text-amber-700">{empty}</Text>; return <View className="mt-2 gap-2">{items.map((item) => <Pressable key={item.id} className={`rounded-xl border p-3 ${selectedId === item.id ? 'border-emerald-700 bg-emerald-50' : 'border-slate-200 bg-white'}`} onPress={() => onSelect(item.id)}><Text className="font-semibold text-slate-900">{item.nombre}</Text>{item.descripcion && <Text className="mt-1 text-sm text-slate-500">{item.descripcion}</Text>}</Pressable>)}</View>; }
function Input(props: React.ComponentProps<typeof TextInput>) { return <TextInput {...props} placeholderTextColor="#94a3b8" className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900" />; }
function Label({ text, children }: { text: string; children: React.ReactNode }) { return <View className="mt-5"><Text className="text-sm font-semibold text-slate-800">{text}</Text>{children}</View>; }
function Loading() { return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator color="#15803d" size="large" /><Text className="mt-3 text-sm text-slate-500">Cargando datos productivos…</Text></View>; }
function LoadError({ error }: { error: unknown }) { return <View className="flex-1 items-center justify-center bg-slate-50 px-6"><Text className="text-center text-xl font-bold text-slate-900">No pudimos preparar la siembra</Text><Text className="mt-2 text-center text-sm text-slate-500">{getApiErrorMessage(error, 'Intentá nuevamente.')}</Text><Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={() => router.back()}><Text className="font-semibold text-white">Volver</Text></Pressable></View>; }
