import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Href, router } from 'expo-router';
import { getMaquinarias } from '@/api/maquinarias.api';
import { getApiErrorMessage } from '@/api/errors';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';
import { ESTADO_MAQUINARIA_LABEL, ESTADOS_MAQUINARIA, TIPO_MAQUINARIA_LABEL, type EstadoMaquinaria } from '@/types/maquinarias';

export default function MaquinariasScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const membresia = useAuthStore((state) => state.membresia);
  const membresiaOrganizacionId = useAuthStore((state) => state.membresiaOrganizacionId);
  const [estado, setEstado] = useState<EstadoMaquinaria | null>(null);
  const membershipReady = isOwner || membresiaOrganizacionId === organizacionActivaId;
  const canView = isOwner || membresia?.modulos.some((modulo) => modulo.moduloNombre === 'Maquinarias' && modulo.activo) === true;
  const machinesQuery = useQuery({ queryKey: ['maquinarias', organizacionActivaId], queryFn: getMaquinarias, enabled: Boolean(organizacionActivaId && membershipReady && canView) });
  const machines = useMemo(() => (machinesQuery.data ?? []).filter((machine) => !estado || machine.estado === estado), [machinesQuery.data, estado]);

  if (!membershipReady || machinesQuery.isLoading) return <Loading />;
  if (!canView) return <AccessRestricted title="Maquinarias" />;
  if (machinesQuery.isError) return <LoadError error={machinesQuery.error} onRetry={() => void machinesQuery.refetch()} />;

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 32 }} refreshControl={<RefreshControl refreshing={machinesQuery.isRefetching} onRefresh={() => void machinesQuery.refetch()} />}>
      <View className="bg-emerald-800 px-6 pb-7 pt-16">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1"><Text className="text-3xl font-bold text-white">Maquinarias</Text><Text className="mt-2 text-sm text-emerald-100">Equipos, mantenimiento y costos operativos.</Text></View>
          <Pressable className="rounded-xl bg-white px-3 py-3" onPress={() => router.push('/(app)/maquinarias/nueva' as Href)}><Text className="font-semibold text-emerald-800">+ Equipo</Text></Pressable>
        </View>
      </View>
      <View className="px-5 pt-5">
        <View className="flex-row gap-3"><Metric label="Total" value={String(machinesQuery.data?.length ?? 0)} /><Metric label="Operativas" value={String((machinesQuery.data ?? []).filter((machine) => machine.estado === 'OPERATIVA').length)} /><Metric label="En mantenimiento" value={String((machinesQuery.data ?? []).filter((machine) => machine.estado === 'EN_MANTENIMIENTO').length)} /></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5"><View className="flex-row gap-2"><Chip label="Todas" active={!estado} onPress={() => setEstado(null)} />{ESTADOS_MAQUINARIA.map((item) => <Chip key={item} label={ESTADO_MAQUINARIA_LABEL[item]} active={estado === item} onPress={() => setEstado(estado === item ? null : item)} />)}</View></ScrollView>
        <Text className="mt-7 text-sm font-bold uppercase tracking-widest text-slate-500">Equipos ({machines.length})</Text>
        <View className="mt-3 gap-3">
          {machines.length === 0 ? <Empty onAdd={() => router.push('/(app)/maquinarias/nueva' as Href)} /> : machines.map((machine) => {
            const totalExpenses = machine.gastos.reduce((sum, expense) => sum + expense.monto, 0);
            return <Pressable key={machine.id} className="rounded-2xl bg-white p-4" onPress={() => router.push({ pathname: '/(app)/maquinarias/[maquinariaId]', params: { maquinariaId: String(machine.id) } } as unknown as Href)}>
              <View className="flex-row items-start justify-between gap-3"><View className="flex-1"><Text className="text-lg font-bold text-slate-900">{machine.nombre}</Text><Text className="mt-1 text-sm text-slate-500">{TIPO_MAQUINARIA_LABEL[machine.tipo]}{machine.marca ? ` · ${machine.marca}` : ''}{machine.modelo ? ` ${machine.modelo}` : ''}</Text></View><Status estado={machine.estado} /></View>
              <View className="mt-4 flex-row justify-between border-t border-slate-100 pt-3"><Text className="text-sm text-slate-500">{machine.horasUso !== null && machine.horasUso !== undefined ? `${machine.horasUso} hs` : 'Sin horas registradas'}</Text><Text className="text-sm font-semibold text-emerald-800">{formatMoney(totalExpenses)}</Text></View>
            </Pressable>;
          })}
        </View>
      </View>
    </ScrollView>
  );
}

function Metric({ label, value }: { label: string; value: string }) { return <View className="flex-1 rounded-xl bg-white p-3"><Text className="text-xs text-slate-500">{label}</Text><Text className="mt-1 text-lg font-bold text-slate-900">{value}</Text></View>; }
function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) { return <Pressable className={`rounded-full border px-3 py-2 ${active ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'}`} onPress={onPress}><Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-700'}`}>{label}</Text></Pressable>; }
function Status({ estado }: { estado: EstadoMaquinaria }) { const styles: Record<EstadoMaquinaria, string> = { OPERATIVA: 'bg-emerald-100 text-emerald-800', EN_MANTENIMIENTO: 'bg-amber-100 text-amber-800', FUERA_DE_SERVICIO: 'bg-red-100 text-red-700' }; return <Text className={`rounded-full px-2 py-1 text-xs font-bold ${styles[estado]}`}>{ESTADO_MAQUINARIA_LABEL[estado]}</Text>; }
function Empty({ onAdd }: { onAdd: () => void }) { return <View className="items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12"><Text className="text-4xl">⚙</Text><Text className="mt-4 text-lg font-bold text-slate-900">Sin maquinarias registradas</Text><Pressable className="mt-5 rounded-xl bg-emerald-700 px-4 py-3" onPress={onAdd}><Text className="font-semibold text-white">Registrar equipo</Text></Pressable></View>; }
function Loading() { return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator color="#15803d" size="large" /><Text className="mt-3 text-sm text-slate-500">Cargando maquinarias…</Text></View>; }
function LoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) { return <View className="flex-1 items-center justify-center bg-slate-50 px-6"><Text className="text-center text-xl font-bold text-slate-900">No pudimos cargar las maquinarias</Text><Text className="mt-2 text-center text-sm text-slate-500">{getApiErrorMessage(error, 'Intentá nuevamente.')}</Text><Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={onRetry}><Text className="font-semibold text-white">Reintentar</Text></Pressable></View>; }
function formatMoney(value: number) { return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value); }
