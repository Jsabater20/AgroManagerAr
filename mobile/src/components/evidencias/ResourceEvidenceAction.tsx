import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useSegments } from 'expo-router';
import { EvidenceSection } from '@/components/evidencias/EvidenceSection';
import { useAuthStore } from '@/store/auth.store';
import type { OrigenEvidencia, TipoRecursoEvidencia } from '@/types/evidencias';

interface EvidenceTarget {
  id: number;
  origen: OrigenEvidencia;
  tipoRecurso: TipoRecursoEvidencia;
  label: string;
}

const targetByParameter: Array<{
  parameter: string;
  origen: OrigenEvidencia;
  tipoRecurso: TipoRecursoEvidencia;
  label: string;
}> = [
  { parameter: 'animalId', origen: 'GANADERIA', tipoRecurso: 'ANIMAL', label: 'animal' },
  {
    parameter: 'maquinariaId',
    origen: 'MAQUINARIAS',
    tipoRecurso: 'MAQUINARIA',
    label: 'maquinaria',
  },
  { parameter: 'insumoId', origen: 'INSUMOS', tipoRecurso: 'INSUMO', label: 'insumo' },
  { parameter: 'campoId', origen: 'CAMPOS', tipoRecurso: 'CAMPO', label: 'campo' },
  {
    parameter: 'siembraId',
    origen: 'SIEMBRAS',
    tipoRecurso: 'SIEMBRA',
    label: 'siembra',
  },
];

export function ResourceEvidenceAction() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useLocalSearchParams<Record<string, string | string[]>>();
  const segments = useSegments();
  const organizacionId = useAuthStore((state) => state.organizacionActivaId);
  const target = useMemo<EvidenceTarget | null>(() => {
    const routeSegments = Array.from(segments) as string[];
    if (routeSegments.includes('nuevo-lote')) return null;

    for (const candidate of targetByParameter) {
      const rawId = params[candidate.parameter];
      const id = Number(Array.isArray(rawId) ? rawId[0] : rawId);
      if (Number.isInteger(id) && id > 0) {
        return { ...candidate, id };
      }
    }
    return null;
  }, [params, segments]);

  if (!target) return null;

  return (
    <>
      <Pressable
        accessibilityLabel="Abrir evidencia fotográfica"
        className="absolute bottom-6 right-5 rounded-full bg-emerald-700 px-5 py-4 shadow-lg"
        onPress={() => setIsOpen(true)}
      >
        <Text className="font-bold text-white">📷 Fotos</Text>
      </Pressable>
      <Modal animationType="slide" transparent visible={isOpen} onRequestClose={() => setIsOpen(false)}>
        <View className="flex-1 justify-end bg-slate-950/50">
          <View className="max-h-[92%] rounded-t-3xl bg-slate-50 px-5 pb-8 pt-5">
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1">
                <Text className="text-xl font-bold text-slate-900">Fotos del {target.label}</Text>
                <Text className="mt-1 text-sm text-slate-600">
                  Adjuntá evidencia para que el equipo pueda consultarla.
                </Text>
              </View>
              <Pressable onPress={() => setIsOpen(false)}>
                <Text className="text-base font-semibold text-slate-500">Cerrar</Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <EvidenceSection
                organizacionId={organizacionId}
                origen={target.origen}
                tipoRecurso={target.tipoRecurso}
                recursoId={target.id}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
