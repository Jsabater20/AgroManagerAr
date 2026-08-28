import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router, type Href } from 'expo-router';
import { Controller, useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { createCampo } from '@/api/campos.api';
import { getApiErrorMessage } from '@/api/errors';
import { useAuthStore } from '@/store/auth.store';

const campoSchema = z.object({
  nombre: z.string().trim().min(2, 'Ingresá un nombre de al menos 2 caracteres.'),
  hectareas: z
    .string()
    .trim()
    .refine(
      (value) => Number(value.replace(',', '.')) >= 0.1,
      'Ingresá una superficie mayor a 0.',
    ),
  ubicacion: z.string().trim(),
  propietario: z.string().trim(),
});

type CampoForm = z.infer<typeof campoSchema>;

export default function NuevoCampoScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const createCampoMutation = useMutation({ mutationFn: createCampo });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CampoForm>({
    resolver: zodResolver(campoSchema),
    defaultValues: { nombre: '', hectareas: '', ubicacion: '', propietario: '' },
  });

  const submit = async (form: CampoForm) => {
    try {
      const campo = await createCampoMutation.mutateAsync({
        nombre: form.nombre.trim(),
        hectareas: Number(form.hectareas.replace(',', '.')),
        ubicacion: form.ubicacion || undefined,
        propietario: form.propietario || undefined,
      });
      await queryClient.invalidateQueries({ queryKey: ['campos', organizacionActivaId] });
      router.replace(
        {
          pathname: '/(app)/campos/[campoId]',
          params: { campoId: String(campo.id) },
        } as unknown as Href,
      );
    } catch (error: unknown) {
      Alert.alert(
        'No pudimos crear el campo',
        getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.'),
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 24, paddingTop: 56 }}>
      <Pressable className="self-start" onPress={() => router.back()}>
        <Text className="text-sm font-semibold text-emerald-700">← Volver</Text>
      </Pressable>
      <Text className="mt-6 text-3xl font-bold text-slate-900">Nuevo campo</Text>
      <Text className="mt-2 text-sm text-slate-600">
        Registrá el establecimiento para comenzar a organizar sus lotes.
      </Text>

      <View className="mt-8 gap-5 rounded-3xl bg-white p-5">
        <FormInput control={control} name="nombre" label="Nombre" placeholder="Ej. Las Meninas" error={errors.nombre?.message} />
        <FormInput
          control={control}
          name="hectareas"
          label="Hectáreas"
          placeholder="Ej. 120"
          keyboardType="decimal-pad"
          error={errors.hectareas?.message}
        />
        <FormInput control={control} name="ubicacion" label="Ubicación" placeholder="Ej. Pergamino, Buenos Aires" error={errors.ubicacion?.message} />
        <FormInput control={control} name="propietario" label="Propietario (opcional)" placeholder="Nombre o razón social" error={errors.propietario?.message} />

        <Pressable
          className="mt-2 items-center rounded-xl bg-emerald-700 px-4 py-4 disabled:opacity-50"
          disabled={isSubmitting || createCampoMutation.isPending}
          onPress={handleSubmit(submit)}
        >
          <Text className="font-semibold text-white">
            {isSubmitting || createCampoMutation.isPending ? 'Creando campo…' : 'Crear campo'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function FormInput({
  control,
  name,
  label,
  placeholder,
  error,
  keyboardType,
}: {
  control: Control<CampoForm>;
  name: keyof CampoForm;
  label: string;
  placeholder: string;
  error?: string;
  keyboardType?: 'default' | 'decimal-pad';
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value } }) => (
        <View>
          <Text className="mb-2 text-sm font-semibold text-slate-700">{label}</Text>
          <TextInput
            value={String(value ?? '')}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType={keyboardType}
            placeholder={placeholder}
            className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
          />
          {error && <Text className="mt-1 text-sm text-red-600">{error}</Text>}
        </View>
      )}
    />
  );
}
