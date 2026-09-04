import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listEvidencias, subirEvidencia } from '@/api/evidencias.api';
import { getApiErrorMessage } from '@/api/errors';
import { EvidencePicker } from '@/components/evidencias/EvidencePicker';
import { useOfflineStore } from '@/store/offline.store';
import type {
  LocalEvidenceFile,
  OrigenEvidencia,
  TipoRecursoEvidencia,
} from '@/types/evidencias';

interface EvidenceSectionProps {
  organizacionId: number | null;
  origen: OrigenEvidencia;
  tipoRecurso: TipoRecursoEvidencia;
  recursoId: number;
  title?: string;
  description?: string;
}

export function EvidenceSection({
  organizacionId,
  origen,
  tipoRecurso,
  recursoId,
  title = 'Evidencia fotográfica',
  description = 'Registrá el estado y seguimiento visual de este recurso.',
}: EvidenceSectionProps) {
  const [comentario, setComentario] = useState('');
  const [fotos, setFotos] = useState<LocalEvidenceFile[]>([]);
  const isOnline = useOfflineStore((state) => state.isOnline);
  const queryClient = useQueryClient();
  const queryKey = ['evidencias', organizacionId, tipoRecurso, recursoId];
  const evidenciasQuery = useQuery({
    queryKey,
    queryFn: () => listEvidencias(organizacionId as number, tipoRecurso, recursoId),
    enabled: Boolean(organizacionId && recursoId),
  });
  const uploadMutation = useMutation({
    mutationFn: () => {
      if (!organizacionId) throw new Error('Seleccioná una organización antes de subir evidencia.');
      if (!isOnline) throw new Error('Necesitás conexión para subir fotos.');
      return subirEvidencia(organizacionId, {
        origen,
        tipoRecurso,
        recursoId,
        comentario: comentario.trim() || undefined,
        archivos: fotos,
      });
    },
    onSuccess: async () => {
      setComentario('');
      setFotos([]);
      await queryClient.invalidateQueries({ queryKey });
      Alert.alert('Evidencia guardada', 'Las fotos ya están disponibles para el equipo.');
    },
    onError: (error: unknown) => {
      Alert.alert(
        'No pudimos subir la evidencia',
        getApiErrorMessage(error, 'Intentá nuevamente en unos instantes.'),
      );
    },
  });

  const guardar = () => {
    if (fotos.length === 0) {
      Alert.alert('Adjuntá una foto', 'Podés sacar una foto o elegirla desde la galería.');
      return;
    }
    uploadMutation.mutate();
  };

  return (
    <View className="mt-6 rounded-2xl bg-white p-5">
      <Text className="text-lg font-bold text-slate-900">{title}</Text>
      <Text className="mt-1 text-sm text-slate-500">{description}</Text>

      <Text className="mt-5 text-sm font-semibold text-slate-800">Comentario opcional</Text>
      <TextInput
        className="mt-2 min-h-24 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
        multiline
        maxLength={5000}
        placeholder="Ej.: Se detectó una pérdida de aceite en el lateral derecho."
        placeholderTextColor="#94a3b8"
        textAlignVertical="top"
        value={comentario}
        onChangeText={setComentario}
      />
      <EvidencePicker disabled={uploadMutation.isPending} value={fotos} onChange={setFotos} />
      {fotos.length > 0 && !isOnline ? (
        <Text className="mt-3 rounded-xl bg-amber-100 px-3 py-2 text-sm text-amber-900">
          Necesitás conexión para subir fotos.
        </Text>
      ) : null}
      <Pressable
        className="mt-4 items-center rounded-xl bg-emerald-700 px-4 py-3 disabled:opacity-50"
        disabled={uploadMutation.isPending || fotos.length === 0}
        onPress={guardar}
      >
        <Text className="font-semibold text-white">
          {uploadMutation.isPending ? 'Subiendo evidencia...' : 'Guardar evidencia'}
        </Text>
      </Pressable>

      <Text className="mt-7 text-sm font-bold uppercase tracking-widest text-slate-500">
        Evidencias guardadas
      </Text>
      {evidenciasQuery.isLoading ? (
        <ActivityIndicator className="my-5" color="#15803d" />
      ) : evidenciasQuery.isError ? (
        <Text className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {getApiErrorMessage(evidenciasQuery.error, 'No pudimos cargar las evidencias.')}
        </Text>
      ) : evidenciasQuery.data?.length ? (
        <View className="mt-3 gap-3">
          {evidenciasQuery.data.map((evidencia) => (
            <View key={evidencia.id} className="rounded-xl bg-slate-50 p-4">
              <Text className="font-semibold text-slate-800">
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
                    className="h-28 w-28 rounded-lg bg-slate-200"
                    resizeMode="cover"
                    source={{ uri: archivo.url }}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text className="mt-3 text-sm text-slate-500">Todavía no hay evidencias registradas.</Text>
      )}
    </View>
  );
}
