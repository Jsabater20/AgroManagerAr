import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, router, type Href } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getCampo } from '@/api/campos.api';
import { getApiErrorMessage } from '@/api/errors';
import type { LoteCampo } from '@/types/campos';

export default function CampoDetailScreen() {
  const { campoId } = useLocalSearchParams<{ campoId: string }>();
  const parsedCampoId = Number(campoId);
  const campoQuery = useQuery({
    queryKey: ['campo', parsedCampoId],
    queryFn: () => getCampo(parsedCampoId),
    enabled: Number.isInteger(parsedCampoId) && parsedCampoId > 0,
  });

  if (campoQuery.isLoading) return <FieldLoading />;
  if (campoQuery.isError || !campoQuery.data) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 px-6">
        <Text className="text-center text-xl font-bold text-slate-900">
          No pudimos abrir este campo
        </Text>
        <Text className="mt-2 text-center text-sm text-slate-600">
          {getApiErrorMessage(campoQuery.error, 'Verificá que todavía tengas acceso al campo.')}
        </Text>
        <Pressable className="mt-6 rounded-xl bg-emerald-700 px-5 py-3" onPress={() => router.back()}>
          <Text className="font-semibold text-white">Volver a campos</Text>
        </Pressable>
      </View>
    );
  }

  const campo = campoQuery.data;
  const lotesHectares = campo.lotes.reduce((total, lote) => total + lote.hectareas, 0);

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="bg-emerald-800 px-6 pb-7 pt-14">
        <Pressable className="self-start" onPress={() => router.back()}>
          <Text className="text-sm font-semibold text-emerald-100">← Campos</Text>
        </Pressable>
        <Text className="mt-6 text-3xl font-bold text-white">{campo.nombre}</Text>
        <Text className="mt-2 text-sm text-emerald-100">
          {campo.ubicacion || 'Ubicación sin registrar'}
        </Text>
      </View>

      <View className="px-5 pt-6">
        <View className="flex-row gap-3">
          <SummaryCard label="Superficie" value={`${campo.hectareas} ha`} />
          <SummaryCard label="Lotes" value={String(campo.lotes.length)} />
          <SummaryCard label="Asignada" value={`${lotesHectares} ha`} />
        </View>

        {campo.propietario && (
          <View className="mt-4 rounded-2xl bg-white p-4">
            <Text className="text-xs uppercase tracking-widest text-slate-400">Propietario</Text>
            <Text className="mt-1 font-semibold text-slate-800">{campo.propietario}</Text>
          </View>
        )}

        <View className="mt-8 flex-row items-center justify-between">
          <View>
            <Text className="text-sm font-semibold uppercase tracking-widest text-slate-500">Lotes</Text>
            <Text className="mt-1 text-sm text-slate-500">División productiva del campo</Text>
          </View>
          <Pressable
            className="rounded-xl bg-emerald-700 px-4 py-3"
            onPress={() =>
              router.push(
                {
                  pathname: '/(app)/campos/[campoId]/nuevo-lote',
                  params: { campoId: String(campo.id) },
                } as unknown as Href,
              )
            }
          >
            <Text className="font-semibold text-white">+ Lote</Text>
          </Pressable>
        </View>

        <View className="mt-3 overflow-hidden rounded-2xl bg-white">
          {campo.lotes.length === 0 ? (
            <Text className="px-5 py-7 text-center text-sm text-slate-500">
              Este campo todavía no tiene lotes registrados.
            </Text>
          ) : (
            campo.lotes.map((lote, index) => (
              <LoteRow key={lote.id} lote={lote} hasBorder={index < campo.lotes.length - 1} />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-white p-4">
      <Text className="text-xs text-slate-400">{label}</Text>
      <Text className="mt-2 text-base font-bold text-slate-900" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function LoteRow({ lote, hasBorder }: { lote: LoteCampo; hasBorder: boolean }) {
  const activeSowing = lote.siembras?.find((siembra) => siembra.estado === 'EN_CURSO');

  return (
    <View className={`px-5 py-4 ${hasBorder ? 'border-b border-slate-100' : ''}`}>
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-semibold text-slate-900">{lote.nombre}</Text>
          <Text className="mt-1 text-sm text-slate-500">
            {activeSowing?.tipoCultivo?.nombre
              ? `${activeSowing.tipoCultivo.nombre} en curso`
              : 'Sin siembra activa'}
          </Text>
        </View>
        <Text className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          {lote.hectareas} ha
        </Text>
      </View>
    </View>
  );
}

function FieldLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <ActivityIndicator color="#15803d" size="large" />
      <Text className="mt-3 text-sm text-slate-500">Cargando campo…</Text>
    </View>
  );
}
