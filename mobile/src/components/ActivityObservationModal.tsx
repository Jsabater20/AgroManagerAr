import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createObservacionActividadConSync,
  listObservacionesActividad,
} from '@/api/actividades.api';
import { listEvidencias, subirEvidencia } from '@/api/evidencias.api';
import { getApiErrorMessage } from '@/api/errors';
import { EvidencePicker } from '@/components/evidencias/EvidencePicker';
import { useAuthStore } from '@/store/auth.store';
import { useOfflineStore } from '@/store/offline.store';
import type { ActividadDashboard } from '@/types/dashboard';
import type { LocalEvidenceFile } from '@/types/evidencias';

interface ActivityObservationModalProps {
  actividad: ActividadDashboard | null;
  organizacionId: number;
  onClose: () => void;
}

export function ActivityObservationModal({
  actividad,
  organizacionId,
  onClose,
}: ActivityObservationModalProps) {
  const [contenido, setContenido] = useState('');
  const [fotos, setFotos] = useState<LocalEvidenceFile[]>([]);
  const userId = useAuthStore((state) => state.usuario?.id);
  const isOnline = useOfflineStore((state) => state.isOnline);
  const queryClient = useQueryClient();

  const observacionesQuery = useQuery({
    queryKey: ['observaciones-actividad', organizacionId, actividad?.id],
    queryFn: () => listObservacionesActividad(organizacionId, actividad!.id),
    enabled: Boolean(actividad && organizacionId),
  });
  const evidenciasQuery = useQuery({
    queryKey: ['evidencias-actividad', organizacionId, actividad?.id],
    queryFn: () => listEvidencias(organizacionId, 'ACTIVIDAD', actividad!.id),
    enabled: Boolean(actividad && organizacionId),
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('Tu sesión no está disponible.');

      if (fotos.length > 0) {
        if (!isOnline) {
          throw new Error('Necesitás conexión para subir fotos.');
        }
        return subirEvidencia(organizacionId, {
          origen: 'ACTIVIDADES',
          tipoRecurso: 'ACTIVIDAD',
          recursoId: actividad!.id,
          comentario: contenido.trim() || undefined,
          archivos: fotos,
        });
      }

      return createObservacionActividadConSync(userId, organizacionId, actividad!.id, {
        contenido: contenido.trim(),
      });
    },
    onSuccess: async (result) => {
      setContenido('');
      setFotos([]);
      if ('queued' in result && result.queued) {
        Alert.alert(
          'Observación guardada sin conexión',
          'Se sincronizará automáticamente cuando vuelva la señal.',
        );
      }
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['observaciones-actividad', organizacionId, actividad?.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ['evidencias-actividad', organizacionId, actividad?.id],
        }),
      ]);
    },
    onError: (error: unknown) => {
      Alert.alert(
        'No pudimos guardar la evidencia',
        getApiErrorMessage(error, 'Intentá nuevamente en unos instantes.'),
      );
    },
  });

  const guardar = () => {
    if (!contenido.trim() && fotos.length === 0) {
      Alert.alert('Agregá una evidencia', 'Escribí una observación o adjuntá al menos una foto.');
      return;
    }
    createMutation.mutate();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={Boolean(actividad)}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-slate-950/50">
        <View className="max-h-[92%] rounded-t-3xl bg-slate-50 px-5 pb-8 pt-5">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <Text className="text-xl font-bold text-slate-900">Evidencia del trabajo</Text>
              <Text className="mt-1 text-sm text-slate-600">{actividad?.titulo}</Text>
            </View>
            <Pressable onPress={onClose}>
              <Text className="text-base font-semibold text-slate-500">Cerrar</Text>
            </Pressable>
          </View>

          <ScrollView className="mt-5" showsVerticalScrollIndicator={false}>
            <Text className="text-sm font-semibold text-slate-700">Nueva observación</Text>
            <TextInput
              className="mt-2 min-h-24 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
              multiline
              maxLength={5000}
              placeholder="Ej.: Se reemplazó la manguera hidráulica"
              textAlignVertical="top"
              value={contenido}
              onChangeText={setContenido}
            />
            <Text className="mt-1 text-right text-xs text-slate-400">{contenido.length}/5000</Text>

            <EvidencePicker
              disabled={createMutation.isPending}
              value={fotos}
              onChange={setFotos}
            />
            {fotos.length > 0 && !isOnline ? (
              <Text className="mt-3 rounded-xl bg-amber-100 px-3 py-2 text-sm text-amber-900">
                Necesitás conexión para subir fotos a evidencia.
              </Text>
            ) : null}

            <Pressable
              className="mt-4 items-center rounded-xl bg-emerald-700 px-4 py-4 disabled:opacity-50"
              disabled={createMutation.isPending}
              onPress={guardar}
            >
              <Text className="font-semibold text-white">
                {createMutation.isPending
                  ? 'Guardando evidencia...'
                  : fotos.length > 0
                    ? 'Guardar evidencia'
                    : 'Guardar observación'}
              </Text>
            </Pressable>

            <Text className="mt-7 text-sm font-semibold uppercase tracking-widest text-slate-500">
              Historial de observaciones
            </Text>
            {observacionesQuery.isLoading ? (
              <ActivityIndicator className="my-6" color="#15803d" />
            ) : observacionesQuery.data?.length ? (
              <View className="mt-3 gap-3 pb-4">
                {observacionesQuery.data.map((observacion) => (
                  <View key={observacion.id} className="rounded-xl bg-white p-4">
                    <Text className="text-sm font-semibold text-slate-800">
                      {[observacion.autor?.nombre, observacion.autor?.apellido]
                        .filter(Boolean)
                        .join(' ') || 'Usuario'}
                    </Text>
                    <Text className="mt-1 text-xs text-slate-500">
                      {new Intl.DateTimeFormat('es-AR', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(observacion.createdAt))}
                    </Text>
                    <Text className="mt-3 text-sm leading-5 text-slate-700">
                      {observacion.contenido}
                    </Text>
                    {observacion.fotoBase64 ? (
                      <Image
                        className="mt-3 h-44 w-full rounded-lg"
                        resizeMode="cover"
                        source={{ uri: observacion.fotoBase64 }}
                      />
                    ) : null}
                  </View>
                ))}
              </View>
            ) : (
              <Text className="mt-3 pb-4 text-sm text-slate-500">
                Todavía no hay observaciones para este trabajo.
              </Text>
            )}

            <Text className="mt-7 text-sm font-semibold uppercase tracking-widest text-slate-500">
              Fotos de evidencia
            </Text>
            {evidenciasQuery.isLoading ? (
              <ActivityIndicator className="my-6" color="#15803d" />
            ) : evidenciasQuery.data?.length ? (
              <View className="mt-3 gap-3 pb-4">
                {evidenciasQuery.data.map((evidencia) => (
                  <View key={evidencia.id} className="rounded-xl bg-white p-4">
                    <Text className="text-sm font-semibold text-slate-800">
                      {[evidencia.usuario.nombre, evidencia.usuario.apellido]
                        .filter(Boolean)
                        .join(' ') || 'Usuario'}
                    </Text>
                    <Text className="mt-1 text-xs text-slate-500">
                      {new Intl.DateTimeFormat('es-AR', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(evidencia.fechaHora))}
                    </Text>
                    {evidencia.comentario ? (
                      <Text className="mt-3 text-sm leading-5 text-slate-700">
                        {evidencia.comentario}
                      </Text>
                    ) : null}
                    <View className="mt-3 flex-row flex-wrap gap-2">
                      {evidencia.archivos.map((archivo) => (
                        <Image
                          key={archivo.id}
                          className="h-28 w-28 rounded-lg bg-slate-100"
                          resizeMode="cover"
                          source={{ uri: archivo.url }}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="mt-3 pb-4 text-sm text-slate-500">
                Todavía no hay fotos de evidencia para este trabajo.
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
