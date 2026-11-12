import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Href, router } from 'expo-router';
import { getAnimales, getLotesGanaderos } from '@/api/ganado.api';
import { getApiErrorMessage } from '@/api/errors';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';
import {
  ESPECIES,
  ESPECIE_LABELS,
  SISTEMA_LOTE_GANADERO_LABELS,
  type Especie,
  type LoteGanadero,
  type Sexo,
} from '@/types/ganado';

export default function GanadoScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const membresia = useAuthStore((state) => state.membresia);
  const membresiaOrganizacionId = useAuthStore((state) => state.membresiaOrganizacionId);
  const [especie, setEspecie] = useState<Especie | null>(null);
  const [sexo, setSexo] = useState<Sexo | null>(null);
  const membershipReady = isOwner || membresiaOrganizacionId === organizacionActivaId;
  const canViewGanado =
    isOwner || membresia?.modulos.some((modulo) => modulo.moduloNombre === 'Ganadería' && modulo.activo) === true;
  const animalsQuery = useQuery({
    queryKey: ['ganado', organizacionActivaId],
    queryFn: getAnimales,
    enabled: Boolean(organizacionActivaId && membershipReady && canViewGanado),
  });
  const lotesGanaderosQuery = useQuery({
    queryKey: ['ganado-lotes', organizacionActivaId],
    queryFn: getLotesGanaderos,
    enabled: Boolean(organizacionActivaId && membershipReady && canViewGanado),
  });
  const animals = useMemo(
    () =>
      (animalsQuery.data ?? []).filter(
        (animal) => (!especie || animal.especie === especie) && (!sexo || animal.sexo === sexo),
      ),
    [animalsQuery.data, especie, sexo],
  );
  const lotesActivos = useMemo(
    () => (lotesGanaderosQuery.data ?? []).filter((lote) => lote.estado === 'ACTIVO'),
    [lotesGanaderosQuery.data],
  );
  const refresh = async () => {
    await Promise.all([animalsQuery.refetch(), lotesGanaderosQuery.refetch()]);
  };

  if (!membershipReady) return <Loading />;
  if (!canViewGanado) return <AccessRestricted title="Ganadería" />;
  if (animalsQuery.isLoading) return <Loading />;
  if (animalsQuery.isError) return <LoadError error={animalsQuery.error} onRetry={() => void animalsQuery.refetch()} />;

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={<RefreshControl refreshing={animalsQuery.isRefetching || lotesGanaderosQuery.isRefetching} onRefresh={() => void refresh()} />}
    >
      <View className="bg-emerald-800 px-6 pb-7 pt-16">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white">Ganadería</Text>
            <Text className="mt-2 text-sm text-emerald-100">Registro de animales y seguimiento de preñeces.</Text>
          </View>
          <Pressable
            className="rounded-xl bg-white px-3 py-3"
            onPress={() => router.push('/(app)/ganado/nuevo' as Href)}
          >
            <Text className="font-semibold text-emerald-800">+ Animal</Text>
          </Pressable>
        </View>
      </View>

      <View className="px-5 pt-5">
        <View className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-sm font-bold uppercase tracking-widest text-emerald-800">Rodeos y engorde</Text>
              <Text className="mt-1 text-lg font-bold text-slate-900">Cría, invernada y feedlot</Text>
              <Text className="mt-1 text-sm leading-5 text-slate-600">Separá cada etapa y cargá controles de cabezas, peso, alimento y bajas.</Text>
            </View>
            <Pressable className="rounded-xl bg-emerald-700 px-3 py-2" onPress={() => router.push('/(app)/ganado/lotes/nuevo' as Href)}>
              <Text className="font-semibold text-white">+ Lote</Text>
            </Pressable>
          </View>
          {lotesGanaderosQuery.isLoading ? (
            <ActivityIndicator className="mt-5" color="#15803d" />
          ) : lotesGanaderosQuery.isError ? (
            <Text className="mt-4 text-sm text-red-700">No pudimos cargar los rodeos. Deslizá para reintentar.</Text>
          ) : lotesActivos.length === 0 ? (
            <Text className="mt-4 rounded-xl bg-white px-3 py-3 text-sm text-slate-600">Todavía no hay rodeos creados. Empezá con las madres, una compra de invernada o un corral.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
              <View className="flex-row gap-3">
                {lotesActivos.map((lote) => <LoteCard key={lote.id} lote={lote} />)}
              </View>
            </ScrollView>
          )}
        </View>

        <Text className="mt-7 text-sm font-bold uppercase tracking-widest text-slate-500">Filtrar especie</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          <View className="flex-row gap-2">
            <FilterChip label="Todas" active={!especie} onPress={() => setEspecie(null)} />
            {ESPECIES.map((item) => (
              <FilterChip
                key={item}
                label={ESPECIE_LABELS[item]}
                active={especie === item}
                onPress={() => setEspecie(especie === item ? null : item)}
              />
            ))}
          </View>
        </ScrollView>
        <View className="mt-3 flex-row gap-2">
          <FilterChip label="Hembras" active={sexo === 'HEMBRA'} onPress={() => setSexo(sexo === 'HEMBRA' ? null : 'HEMBRA')} />
          <FilterChip label="Machos" active={sexo === 'MACHO'} onPress={() => setSexo(sexo === 'MACHO' ? null : 'MACHO')} />
        </View>

        <Text className="mt-7 text-sm font-bold uppercase tracking-widest text-slate-500">
          Animales ({animals.length})
        </Text>
        <View className="mt-3 gap-3">
          {animals.length === 0 ? (
            <EmptyState hasFilters={Boolean(especie || sexo)} onAdd={() => router.push('/(app)/ganado/nuevo' as Href)} />
          ) : (
            animals.map((animal) => {
              const activePrenez = animal.preneces.find((prenez) => prenez.estado === 'EN_CURSO');
              return (
                <Pressable
                  key={animal.id}
                  className="rounded-2xl bg-white p-4"
                  onPress={() =>
                    router.push(
                      { pathname: '/(app)/ganado/[animalId]', params: { animalId: String(animal.id) } } as unknown as Href,
                    )
                  }
                >
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-slate-900">{animal.nombre}</Text>
                      <Text className="mt-1 text-sm text-slate-500">
                        {ESPECIE_LABELS[animal.especie]} · {animal.categoria.toLowerCase()} · {animal.sexo.toLowerCase()}
                      </Text>
                    </View>
                    {animal.peso !== null && animal.peso !== undefined && (
                      <Text className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">{animal.peso} kg</Text>
                    )}
                  </View>
                  <View className="mt-4 border-t border-slate-100 pt-3">
                    <Text className={`text-sm font-semibold ${activePrenez ? 'text-blue-700' : 'text-slate-500'}`}>
                      {activePrenez ? `Preñez en curso · parto estimado ${formatDate(activePrenez.fechaEstimadaParto)}` : 'Sin preñez activa'}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function LoteCard({ lote }: { lote: LoteGanadero }) {
  const lastControl = lote.registros[0];
  return (
    <Pressable
      className="w-72 rounded-2xl bg-white p-4"
      onPress={() => router.push({ pathname: '/(app)/ganado/lotes/[loteId]', params: { loteId: String(lote.id) } } as unknown as Href)}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-base font-bold text-slate-900">{lote.nombre}</Text>
          <Text className="mt-1 text-sm font-semibold text-emerald-800">{SISTEMA_LOTE_GANADERO_LABELS[lote.sistema]}</Text>
          <Text className="mt-1 text-xs text-slate-500">{lote.ubicacion || 'Sin ubicación'} · {lote._count?.animales ?? 0} vinculados</Text>
        </View>
        <Text className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">{lote.cantidadActual} cab.</Text>
      </View>
      <View className="mt-4 flex-row border-t border-slate-100 pt-3">
        <View className="flex-1">
          <Text className="text-xs text-slate-500">Peso prom.</Text>
          <Text className="mt-1 font-bold text-slate-900">{lote.pesoPromedioActualKg != null ? `${lote.pesoPromedioActualKg} kg` : 'Sin pesada'}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xs text-slate-500">Último control</Text>
          <Text className="mt-1 font-bold text-slate-900">{lastControl ? formatDate(lastControl.fecha) : 'Pendiente'}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      className={`rounded-full border px-3 py-2 ${active ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'}`}
      onPress={onPress}
    >
      <Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-700'}`}>{label}</Text>
    </Pressable>
  );
}

function EmptyState({ hasFilters, onAdd }: { hasFilters: boolean; onAdd: () => void }) {
  return (
    <View className="items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12">
      <Text className="text-4xl">♞</Text>
      <Text className="mt-4 text-lg font-bold text-slate-900">
        {hasFilters ? 'No hay animales con estos filtros' : 'No hay animales registrados'}
      </Text>
      {!hasFilters && (
        <Pressable className="mt-5 rounded-xl bg-emerald-700 px-4 py-3" onPress={onAdd}>
          <Text className="font-semibold text-white">Registrar animal</Text>
        </Pressable>
      )}
    </View>
  );
}

function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <ActivityIndicator color="#15803d" size="large" />
      <Text className="mt-3 text-sm text-slate-500">Cargando ganado…</Text>
    </View>
  );
}

function LoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-6">
      <Text className="text-center text-xl font-bold text-slate-900">No pudimos cargar los animales</Text>
      <Text className="mt-2 text-center text-sm text-slate-500">
        {getApiErrorMessage(error, 'Intentá nuevamente en unos minutos.')}
      </Text>
      <Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={onRetry}>
        <Text className="font-semibold text-white">Reintentar</Text>
      </Pressable>
    </View>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(new Date(value));
}
