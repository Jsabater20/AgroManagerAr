import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPronosticoClima } from '@/api/clima.api';
import { getApiErrorMessage } from '@/api/errors';
import { AccessRestricted } from '@/components/AccessRestricted';
import { useAuthStore } from '@/store/auth.store';
import { climaInfo, REGIONES_CLIMA } from '@/types/clima';

export default function ClimaScreen() {
  const organizationId = useAuthStore((state) => state.organizacionActivaId);
  const isOwner = useAuthStore((state) => state.isOwner());
  const membership = useAuthStore((state) => state.membresia);
  const membershipOrganizationId = useAuthStore((state) => state.membresiaOrganizacionId);
  const [regionId, setRegionId] = useState(1);
  const region = REGIONES_CLIMA.find((item) => item.id === regionId) ?? REGIONES_CLIMA[0];
  const membershipReady = isOwner || membershipOrganizationId === organizationId;
  const canView = isOwner || membership?.modulos.some((module) => module.moduloNombre === 'Clima' && module.activo) === true;
  const query = useQuery({ queryKey: ['clima', region.id], queryFn: () => getPronosticoClima(region), enabled: membershipReady && canView, staleTime: 10 * 60 * 1000 });
  const forecast = useMemo(() => query.data?.daily.time.map((date, index) => ({ date, max: Math.round(query.data?.daily.temperature_2m_max[index] ?? 0), min: Math.round(query.data?.daily.temperature_2m_min[index] ?? 0), precipitation: query.data?.daily.precipitation_sum[index] ?? 0, code: query.data?.daily.weather_code[index] ?? 0 })) ?? [], [query.data]);

  if (!membershipReady || query.isLoading) return <Loading />;
  if (!canView) return <AccessRestricted title="Clima" />;
  if (query.isError || !query.data) return <LoadError error={query.error} onRetry={() => void query.refetch()} />;
  const current = query.data.current;
  const currentInfo = climaInfo(current.weather_code);

  return <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 36 }} refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => void query.refetch()} />}><View className="bg-sky-700 px-6 pb-7 pt-16"><Text className="text-3xl font-bold text-white">Clima agrícola</Text><Text className="mt-2 text-sm text-sky-100">Condiciones y pronóstico para zonas productivas.</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5"><View className="flex-row gap-2">{REGIONES_CLIMA.map((item) => <Pressable key={item.id} className={`rounded-full px-3 py-2 ${item.id === region.id ? 'bg-white' : 'bg-white/15'}`} onPress={() => setRegionId(item.id)}><Text className={`text-sm font-semibold ${item.id === region.id ? 'text-sky-800' : 'text-white'}`}>{item.nombre}</Text></Pressable>)}</View></ScrollView></View><View className="px-5 pt-5"><View className="overflow-hidden rounded-3xl bg-blue-600 p-6"><Text className="text-sm font-medium text-blue-100">{region.nombre} · Zona {region.zona}</Text><View className="mt-4 flex-row items-center justify-between"><View><Text className="text-6xl font-bold text-white">{Math.round(current.temperature_2m)}°</Text><Text className="mt-2 text-lg font-semibold text-white">{currentInfo.label}</Text><Text className="mt-1 text-sm text-blue-100">Sensación {Math.round(current.apparent_temperature)}°C</Text></View><Text className="text-6xl">{currentInfo.icon}</Text></View><View className="mt-6 flex-row gap-3 border-t border-white/20 pt-4"><HeroDetail label="Humedad" value={`${current.relative_humidity_2m}%`} /><HeroDetail label="Viento" value={`${Math.round(current.wind_speed_10m)} km/h`} /><HeroDetail label="Lluvia" value={`${current.precipitation} mm`} /></View></View><Text className="mt-8 text-sm font-bold uppercase tracking-widest text-slate-500">Pronóstico 7 días</Text><View className="mt-3 gap-3">{forecast.map((day, index) => { const info = climaInfo(day.code); return <View key={day.date} className="flex-row items-center rounded-2xl bg-white p-4"><Text className="w-12 text-sm font-bold text-slate-700">{dayName(day.date, index === 0)}</Text><Text className="text-2xl">{info.icon}</Text><View className="ml-3 flex-1"><Text className="font-semibold text-slate-900">{info.label}</Text><Text className="mt-1 text-sm text-slate-500">{day.precipitation > 0 ? `${formatNumber(day.precipitation)} mm esperados` : 'Sin precipitaciones previstas'}</Text></View><View className="items-end"><Text className="text-base font-bold text-slate-900">{day.max}°</Text><Text className="mt-1 text-sm text-slate-500">{day.min}°</Text></View></View>; })}</View><View className="mt-8 rounded-2xl border border-sky-100 bg-sky-50 p-5"><Text className="font-bold text-sky-900">Fuente meteorológica</Text><Text className="mt-2 text-sm leading-5 text-sky-800">Pronóstico actualizado por Open‑Meteo. Actualizá la pantalla para consultar las condiciones más recientes.</Text></View></View></ScrollView>;
}

function HeroDetail({ label, value }: { label: string; value: string }) { return <View className="flex-1"><Text className="text-xs text-blue-100">{label}</Text><Text className="mt-1 text-sm font-bold text-white">{value}</Text></View>; }
function Loading() { return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator color="#0284c7" size="large" /><Text className="mt-3 text-sm text-slate-500">Consultando el clima…</Text></View>; }
function LoadError({ error, onRetry }: { error: unknown; onRetry: () => void }) { return <View className="flex-1 items-center justify-center bg-slate-50 px-6"><Text className="text-center text-xl font-bold text-slate-900">No pudimos obtener el clima</Text><Text className="mt-2 text-center text-sm text-slate-500">{getApiErrorMessage(error, 'Verificá tu conexión e intentá nuevamente.')}</Text><Pressable className="mt-6 rounded-xl bg-sky-700 px-5 py-3" onPress={onRetry}><Text className="font-semibold text-white">Reintentar</Text></Pressable></View>; }
function dayName(value: string, first: boolean) { if (first) return 'Hoy'; return new Intl.DateTimeFormat('es-AR', { weekday: 'short' }).format(new Date(`${value}T12:00:00`)).replace('.', ''); }
function formatNumber(value: number) { return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 }).format(value); }
