import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { forgotPassword } from '@/api/auth.api';
import { getApiErrorMessage } from '@/api/errors';

const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Ingresá un email válido.'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const submit = async ({ email }: ForgotPasswordForm) => {
    try {
      const response = await forgotPassword(email.trim().toLowerCase());
      Alert.alert('Revisá tu email', response.message, [{ text: 'Volver al login', onPress: () => router.back() }]);
    } catch (error: unknown) {
      Alert.alert('No pudimos enviar el email', getApiErrorMessage(error, 'Intentá nuevamente más tarde.'));
    }
  };

  return (
    <View className="flex-1 justify-center bg-slate-950 px-6">
      <Text className="mb-2 text-3xl font-bold text-white">Recuperar contraseña</Text>
      <Text className="mb-8 text-base text-slate-300">Te enviaremos un enlace seguro para restablecerla.</Text>

      <View className="gap-4 rounded-3xl bg-white p-6">
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                placeholder="Email"
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
              />
              {errors.email && <Text className="mt-1 text-sm text-red-600">{errors.email.message}</Text>}
            </View>
          )}
        />
        <Pressable
          onPress={handleSubmit(submit)}
          disabled={isSubmitting}
          className="items-center rounded-xl bg-emerald-700 px-4 py-3 disabled:opacity-50"
        >
          <Text className="font-semibold text-white">{isSubmitting ? 'Enviando...' : 'Enviar enlace'}</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} className="items-center py-2">
          <Text className="font-medium text-slate-600">Volver</Text>
        </Pressable>
      </View>
    </View>
  );
}
