import { ActivityIndicator, Alert, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Href, router } from 'expo-router';
import { eliminarInsumo, getInsumos } from '@/api/insumos.api';
import { getApiErrorMessage } from '@/api/errors';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';
import { TIPO_INSUMO_LABEL, TIPOS_INSUMO, type TipoInsumo } from '@/types/insumos';

export default function InsumosScreen() {
  const organizationId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const membership = useAuthStore((state) => state.membresia);
  const membershipOrganizationId = useAuthStore((state) => state.membresiaOrganizacionId);
  const queryClient = useQueryClient();
  const [type, setType] = useState<TipoInsumo | null>(null);
  const membershipReady = isOwner || membershipOrganizationId === organizationId;
  const canView = isOwner || membership?.modulos.some((module) => module.moduloNombre === 'Insumos' && module.activo) === true;
  const query = useQuery({ queryKey: ['insumos', organizationId], queryFn: getInsumos, enabled: Boolean(organizationId && membershipReady && canView) });
  const remove = useMutation({ mutationFn: eliminarInsumo, onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['insumos', organizationId] }), onError: (error: unknown) => Alert.alert('No se puede eliminar', getApiErrorMessage(error, 'El insumo puede estar asociado a una aplicación.')) });
  const insumos = useMemo(() => (query.data ?? []).filter((insumo) => !type || insumo.tipo === type), [query.data, type]);

  if (!membershipReady || query.isLoading) return <Loading />;
  if (!canView) return <AccessRestricted title="Insumos" />;
  if (query.isError) return <LoadError error={query.error} onRetry={() => void query.refetch()} />;

  return <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 36 }} refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => void query.refetch()} />}><View className="bg-emerald-800 px-6 pb-7 pt-16"><View className="flex-row items-start justify-between gap-3"><View className="flex-1"><Text className="text-3xl font-bold text-white">Insumos</Text><Text className="mt-2 text-sm text-emerald-100">Semillas, fertilizantes y fitosanitarios.</Text></View><Pressable className="rounded-xl bg-white px-3 py-3" onPress={() => router.push('/(app)/insumos/nuevo' as Href)}><Text className="font-semibold text-emerald-800">+ Insumo</Text></Pressable></View></View><View className="px-5 pt-5"><Text className="text-sm font-bold uppercase tracking-widest text-slate-500">Filtrar por tipo</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3"><View className="flex-row gap-2"><Chip label="Todos" active={!type} onPress={() => setType(null)} />{TIPOS_INSUMO.map((item) => <Chip key={item} label={TIPO_INSUMO_LABEL[item]} active={type === item} onPress={() => setType(type === item ? null : item)} />)}</View></ScrollView><View className="mt-7 flex-row items-center justify-between"><Text className="text-sm font-bold uppercase tracking-widest text-slate-500">Insumos ({insumos.length})</Text><Text className="text-sm font-semibold text-slate-500">{query.data?.length ?? 0} totales</Text></View><View className="mt-3 gap-3">{insumos.length === 0 ? <EmptyState hasFilter={Boolean(type)} onAdd={() => router.push('/(app)/insumos/nuevo' as Href)} /> : insumos.map((insumo) => <Pressable key={insumo.id} className="rounded-2xl bg-white p-4" onPress={() => router.push({ pathname: '/(app)/insumos/[insumoId]', params: { insumoId: String(insumo.id) } } as unknown as Href)}><View className="flex-row items-start justify-between gap-3"><View className="flex-1"><Text className="text-lg font-bold text-slate-900">{insumo.nombre}</Text><Text className="mt-1 text-sm text-slate-500">{insumo.unidad}{insumo.descripcion ? ` · ${insumo.descripcion}` : ''}</Text></View><TypeBadge type={insumo.tipo} /></View><View className="mt-4 items-end border-t border-slate-100 pt-3"><Pressable className="rounded-lg bg-red-50 px-3 py-2" onPress={() => Alert.alert('Eliminar insumo', `¿Eliminar ${insumo.nombre}? Esta acción no se puede deshacer.`, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', style: 'destructive', onPress: () => remove.mutate(insumo.id) }])}><Text className="text-sm font-semibold text-red-700">Eliminar</Text></Pressable></View></Pressable>)}</View></View></ScrollView>;
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) { return <Pressable className={`rounded-full border px-3 py-2 ${active ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'}`} onPress={onPress}><Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-700'}`}>{label}</Text></Pressable>; }
function TypeBadge({ type }: { type: TipoInsumo }) { const color: Record<TipoInsumo, string> = { FERTILIZANTE: 'bg-amber-100 text-amber-800', HERBICIDA: 'bg-orange-100 text-orange-800', FUNGICIDA: 'bg-purple-100 text-purple-800', INSECTICIDA: 'bg-red-100 text-red-700', SEMILLA: 'bg-emerald-100 text-emerald-800', OTRO: 'bg-slate-100 text-slate-700' }; return <Text className={`rounded-full px-2 py-1 text-xs font-bold ${color[type]}`}>{TIPO_INSUMO_LABEL[type]}</Text>; }
function EmptyState({ hasFilter, onAdd }: { hasFilter: boolean; onAdd: () => void }) { return <View className="items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12"><Text className="text-xl font-bold text-slate-900">{hasFilter ? 'No hay insumos de este tipo' : 'No hay insumos registrados'}</Text>{!hasFilter && <><Text className="mt-2 text-center text-sm text-slate-500">Cargá insumos para usarlos en las aplicaciones de tus siembras.</Text><Pressable className="mt-5 rounded-xl bg-emerald-700 px-4 py-3" onPress={onAdd}><Text className="font-semibold text-white">Nuevo insumo</Text></Pressable></>}</View>; }
function Loading() { return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator color="#15803d" size="large" /><Text className="mt-3 text-sm text-slate-500">Cargando insumos…</Text></View>; }
function LoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) { return <View className="flex-1 items-center justify-center bg-slate-50 px-6"><Text className="text-center text-xl font-bold text-slate-900">No pudimos cargar los insumos</Text><Text className="mt-2 text-center text-sm text-slate-500">{getApiErrorMessage(error, 'Intentá nuevamente.')}</Text><Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={onRetry}><Text className="font-semibold text-white">Reintentar</Text></Pressable></View>; }
