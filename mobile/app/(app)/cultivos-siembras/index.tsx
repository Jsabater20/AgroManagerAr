import { ActivityIndicator, Alert, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Href, router } from 'expo-router';
import { eliminarCultivo, getCultivos } from '@/api/cultivos.api';
import { getApiErrorMessage } from '@/api/errors';
import { getSiembras } from '@/api/siembras.api';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';
import { ESTADO_SIEMBRA_LABEL, type EstadoSiembra } from '@/types/siembras';

export default function CultivosSiembrasScreen() {
  const organizacionId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const membresia = useAuthStore((state) => state.membresia);
  const membresiaOrganizacionId = useAuthStore((state) => state.membresiaOrganizacionId);
  const queryClient = useQueryClient();
  const [estado, setEstado] = useState<EstadoSiembra | null>(null);
  const membershipReady = isOwner || membresiaOrganizacionId === organizacionId;
  const canViewCultivos = isOwner || membresia?.modulos.some((module) => module.moduloNombre === 'Cultivos' && module.activo) === true;
  const canViewSiembras = isOwner || membresia?.modulos.some((module) => module.moduloNombre === 'Siembras' && module.activo) === true;
  const cultivosQuery = useQuery({ queryKey: ['cultivos'], queryFn: getCultivos, enabled: membershipReady && canViewCultivos });
  const siembrasQuery = useQuery({ queryKey: ['siembras', organizacionId], queryFn: getSiembras, enabled: Boolean(organizacionId && membershipReady && canViewSiembras) });
  const removeCultivo = useMutation({ mutationFn: eliminarCultivo, onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['cultivos'] }), onError: (error: unknown) => Alert.alert('No se puede eliminar', getApiErrorMessage(error, 'Este cultivo tiene siembras asociadas.')) });
  const siembras = useMemo(() => (siembrasQuery.data ?? []).filter((siembra) => !estado || siembra.estado === estado), [estado, siembrasQuery.data]);
  const loading = (canViewCultivos && cultivosQuery.isLoading) || (canViewSiembras && siembrasQuery.isLoading);
  const refresh = async () => { await Promise.all([canViewCultivos ? cultivosQuery.refetch() : Promise.resolve(), canViewSiembras ? siembrasQuery.refetch() : Promise.resolve()]); };

  if (!membershipReady || loading) return <Loading />;
  if (!canViewCultivos && !canViewSiembras) return <AccessRestricted title="Cultivos y Siembras" />;
  if (cultivosQuery.isError || siembrasQuery.isError) return <LoadError error={cultivosQuery.error ?? siembrasQuery.error} onRetry={() => void refresh()} />;

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 36 }} refreshControl={<RefreshControl refreshing={cultivosQuery.isRefetching || siembrasQuery.isRefetching} onRefresh={() => void refresh()} />}>
      <View className="bg-emerald-800 px-6 pb-7 pt-16">
        <Text className="text-3xl font-bold text-white">Cultivos y siembras</Text>
        <Text className="mt-2 text-sm text-emerald-100">Planifica, registra y sigue cada lote productivo.</Text>
        <View className="mt-5 flex-row gap-3">
          {canViewCultivos && <HeaderButton label="+ Cultivo" onPress={() => router.push('/(app)/cultivos-siembras/nuevo-cultivo' as Href)} />}
          {canViewSiembras && <HeaderButton label="+ Siembra" onPress={() => router.push('/(app)/cultivos-siembras/nueva-siembra' as Href)} />}
        </View>
      </View>

      <View className="px-5 pt-6">
        {canViewSiembras && (
          <>
            <View className="flex-row items-center justify-between"><Text className="text-sm font-bold uppercase tracking-widest text-slate-500">Siembras ({siembras.length})</Text><Text className="text-sm font-semibold text-emerald-800">{(siembrasQuery.data ?? []).filter((item) => item.estado === 'EN_CURSO').length} en curso</Text></View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3"><View className="flex-row gap-2"><Chip label="Todas" active={!estado} onPress={() => setEstado(null)} />{(['EN_CURSO', 'COSECHADA', 'PERDIDA'] as EstadoSiembra[]).map((item) => <Chip key={item} label={ESTADO_SIEMBRA_LABEL[item]} active={estado === item} onPress={() => setEstado(estado === item ? null : item)} />)}</View></ScrollView>
            <View className="mt-4 gap-3">
              {siembras.length === 0 ? <EmptySiembras onAdd={() => router.push('/(app)/cultivos-siembras/nueva-siembra' as Href)} /> : siembras.map((siembra) => <Pressable key={siembra.id} className="rounded-2xl bg-white p-4" onPress={() => router.push({ pathname: '/(app)/cultivos-siembras/[siembraId]', params: { siembraId: String(siembra.id) } } as unknown as Href)}><View className="flex-row items-start justify-between gap-3"><View className="flex-1"><Text className="text-lg font-bold text-slate-900">{siembra.tipoCultivo.nombre}</Text><Text className="mt-1 text-sm text-slate-500">{siembra.lote.campo?.nombre ?? 'Campo'} · {siembra.lote.nombre}</Text></View><Status estado={siembra.estado} /></View><Text className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-500">Sembrada el {formatDate(siembra.fechaSiembra)}{siembra.densidad ? ` · ${siembra.densidad} kg/ha` : ''}</Text></Pressable>)}
            </View>
          </>
        )}

        {canViewCultivos && (
          <>
            <View className={`${canViewSiembras ? 'mt-9' : ''} flex-row items-center justify-between`}><Text className="text-sm font-bold uppercase tracking-widest text-slate-500">Tipos de cultivo</Text><Text className="text-sm font-semibold text-slate-500">{cultivosQuery.data?.length ?? 0} registrados</Text></View>
            <View className="mt-3 gap-3">{(cultivosQuery.data ?? []).length === 0 ? <EmptyCultivos onAdd={() => router.push('/(app)/cultivos-siembras/nuevo-cultivo' as Href)} /> : (cultivosQuery.data ?? []).map((cultivo) => <View key={cultivo.id} className="flex-row items-center justify-between rounded-2xl bg-white p-4"><View className="flex-1"><Text className="font-bold text-slate-900">{cultivo.nombre}</Text>{cultivo.descripcion && <Text className="mt-1 text-sm text-slate-500">{cultivo.descripcion}</Text>}</View><Pressable className="rounded-lg bg-red-50 px-3 py-2" onPress={() => Alert.alert('Eliminar cultivo', `¿Eliminar ${cultivo.nombre}? Solo es posible si no tiene siembras asociadas.`, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', style: 'destructive', onPress: () => removeCultivo.mutate(cultivo.id) }])}><Text className="text-sm font-semibold text-red-700">Eliminar</Text></Pressable></View>)}</View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

function HeaderButton({ label, onPress }: { label: string; onPress: () => void }) { return <Pressable className="rounded-xl bg-white px-4 py-3" onPress={onPress}><Text className="font-semibold text-emerald-800">{label}</Text></Pressable>; }
function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) { return <Pressable className={`rounded-full border px-3 py-2 ${active ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'}`} onPress={onPress}><Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-700'}`}>{label}</Text></Pressable>; }
function Status({ estado }: { estado: EstadoSiembra }) { const styles: Record<EstadoSiembra, string> = { EN_CURSO: 'bg-blue-100 text-blue-800', COSECHADA: 'bg-emerald-100 text-emerald-800', PERDIDA: 'bg-red-100 text-red-700' }; return <Text className={`rounded-full px-2 py-1 text-xs font-bold ${styles[estado]}`}>{ESTADO_SIEMBRA_LABEL[estado]}</Text>; }
function EmptySiembras({ onAdd }: { onAdd: () => void }) { return <View className="items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10"><Text className="text-xl font-bold text-slate-900">No hay siembras registradas</Text><Text className="mt-2 text-center text-sm text-slate-500">Registrá una siembra para hacer su seguimiento.</Text><Pressable className="mt-5 rounded-xl bg-emerald-700 px-4 py-3" onPress={onAdd}><Text className="font-semibold text-white">Nueva siembra</Text></Pressable></View>; }
function EmptyCultivos({ onAdd }: { onAdd: () => void }) { return <View className="items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10"><Text className="text-xl font-bold text-slate-900">No hay cultivos cargados</Text><Pressable className="mt-5 rounded-xl bg-emerald-700 px-4 py-3" onPress={onAdd}><Text className="font-semibold text-white">Nuevo cultivo</Text></Pressable></View>; }
function Loading() { return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator color="#15803d" size="large" /><Text className="mt-3 text-sm text-slate-500">Cargando producción…</Text></View>; }
function LoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) { return <View className="flex-1 items-center justify-center bg-slate-50 px-6"><Text className="text-center text-xl font-bold text-slate-900">No pudimos cargar la producción</Text><Text className="mt-2 text-center text-sm text-slate-500">{getApiErrorMessage(error, 'Intentá nuevamente.')}</Text><Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={onRetry}><Text className="font-semibold text-white">Reintentar</Text></Pressable></View>; }
function formatDate(value: string) { return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)); }
