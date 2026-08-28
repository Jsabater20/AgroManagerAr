import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { createLote } from '@/api/campos.api';
import { getApiErrorMessage } from '@/api/errors';
import { useAuthStore } from '@/store/auth.store';

const loteSchema = z.object({
  nombre: z.string().trim().min(2, 'Ingresá un nombre de al menos 2 caracteres.'),
  hectareas: z
    .string()
    .trim()
    .refine(
      (value) => Number(value.replace(',', '.')) >= 0.1,
      'Ingresá una superficie mayor a 0.',
    ),
});

type LoteForm = z.infer<typeof loteSchema>;

export default function NuevoLoteScreen() {
  const { campoId } = useLocalSearchParams<{ campoId: string }>();
  const parsedCampoId = Number(campoId);
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const createLoteMutation = useMutation({
    mutationFn: (form: LoteForm) =>
      createLote(parsedCampoId, {
        nombre: form.nombre.trim(),
        hectareas: Number(form.hectareas.replace(',', '.')),
      }),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoteForm>({
    resolver: zodResolver(loteSchema),
    defaultValues: { nombre: '', hectareas: '' },
  });

  const submit = async (form: LoteForm) => {
    if (!Number.isInteger(parsedCampoId) || parsedCampoId <= 0) return;

    try {
      await createLoteMutation.mutateAsync(form);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['campo', parsedCampoId] }),
        queryClient.invalidateQueries({ queryKey: ['campos', organizacionActivaId] }),
      ]);
      router.back();
    } catch (error: unknown) {
      Alert.alert(
        'No pudimos agregar el lote',
        getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.'),
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 24, paddingTop: 56 }}>
      <Pressable className="self-start" onPress={() => router.back()}>
        <Text className="text-sm font-semibold text-emerald-700">← Volver al campo</Text>
      </Pressable>
      <Text className="mt-6 text-3xl font-bold text-slate-900">Nuevo lote</Text>
      <Text className="mt-2 text-sm text-slate-600">
        Definí una nueva división dentro de este campo.
      </Text>

      <View className="mt-8 gap-5 rounded-3xl bg-white p-5">
        <Controller
          control={control}
          name="nombre"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <Text className="mb-2 text-sm font-semibold text-slate-700">Nombre</Text>
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Ej. Lote Norte"
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
              />
              {errors.nombre && <Text className="mt-1 text-sm text-red-600">{errors.nombre.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="hectareas"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <Text className="mb-2 text-sm font-semibold text-slate-700">Hectáreas</Text>
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="decimal-pad"
                placeholder="Ej. 35"
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
              />
              {errors.hectareas && <Text className="mt-1 text-sm text-red-600">{errors.hectareas.message}</Text>}
            </View>
          )}
        />
        <Pressable
          className="mt-2 items-center rounded-xl bg-emerald-700 px-4 py-4 disabled:opacity-50"
          disabled={isSubmitting || createLoteMutation.isPending}
          onPress={handleSubmit(submit)}
        >
          <Text className="font-semibold text-white">
            {isSubmitting || createLoteMutation.isPending ? 'Agregando lote…' : 'Agregar lote'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
