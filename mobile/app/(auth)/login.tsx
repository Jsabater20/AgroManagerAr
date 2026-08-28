import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getProfile } from '@/api/users.api';
import { login } from '@/api/auth.api';
import { getApiErrorMessage } from '@/api/errors';
import { useApiHealth } from '@/hooks/useApiHealth';
import { useAuthStore } from '@/store/auth.store';

const loginSchema = z.object({
  email: z.string().trim().email('Ingresá un email válido.'),
  password: z.string().min(1, 'Ingresá tu contraseña.'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const apiHealth = useApiHealth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const submit = async ({ email, password }: LoginForm) => {
    try {
      const session = await login(email.trim().toLowerCase(), password);
      await setSession(session.token, session.usuario);
      const profile = await getProfile();
      await setSession(session.token, profile);
      router.replace(profile.organizaciones.length > 1 ? '/organizaciones' : '/(app)/(tabs)');
    } catch (error: unknown) {
      Alert.alert(
        'No pudimos ingresar',
        getApiErrorMessage(error, 'Verificá tus credenciales e intentá de nuevo.'),
      );
    }
  };

  return (
    <View className="flex-1 justify-center bg-slate-950 px-6">
      <Text className="mb-2 text-3xl font-bold text-white">AgroManager AR</Text>
      <Text className="mb-10 text-base text-emerald-200">Gestioná tu campo desde donde estés.</Text>

      <View className="gap-4 rounded-3xl bg-white p-6">
        <Text className="text-2xl font-bold text-slate-900">Ingresar</Text>
        {apiHealth.isError && (
          <Pressable onPress={() => apiHealth.refetch()} className="rounded-xl bg-amber-50 px-3 py-2">
            <Text className="text-sm text-amber-800">No hay conexión con el servidor. Tocá para reintentar.</Text>
          </Pressable>
        )}
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
        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <View>
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoComplete="current-password"
                secureTextEntry={!showPassword}
                placeholder="Contraseña"
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
              />
              <Pressable onPress={() => setShowPassword((visible) => !visible)} className="mt-2 self-start">
                <Text className="text-sm font-medium text-emerald-700">{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</Text>
              </Pressable>
              {errors.password && <Text className="mt-1 text-sm text-red-600">{errors.password.message}</Text>}
            </View>
          )}
        />
        <Pressable onPress={() => router.push('./forgot-password')} className="self-start">
          <Text className="text-sm font-medium text-emerald-700">Olvidé mi contraseña</Text>
        </Pressable>
        <Pressable
          onPress={handleSubmit(submit)}
          disabled={isSubmitting || apiHealth.isError}
          className="items-center rounded-xl bg-emerald-700 px-4 py-3 disabled:opacity-50"
        >
          <Text className="font-semibold text-white">{isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
