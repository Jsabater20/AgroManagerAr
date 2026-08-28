import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { invitarMiembro, type RolMiembro } from '@/api/equipo.api';
import { getApiErrorMessage } from '@/api/errors';
import { useAuthStore } from '@/store/auth.store';

const ROLES: Array<{ value: RolMiembro; label: string }> = [
  { value: 'OPERARIO', label: 'Operario' },
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'CONTADOR', label: 'Contador' },
  { value: 'ASESOR', label: 'Asesor' },
  { value: 'MECANICO', label: 'Mecánico' },
];

export default function InvitarMiembroScreen() {
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState<RolMiembro>('OPERARIO');
  const [mensaje, setMensaje] = useState('');
  const inviteMutation = useMutation({
    mutationFn: () =>
      invitarMiembro(organizacionActivaId as number, {
        email: email.trim(),
        rol,
        mensaje: mensaje.trim() || undefined,
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['equipo-invitaciones', organizacionActivaId] }),
        queryClient.invalidateQueries({ queryKey: ['miembros-uso', organizacionActivaId] }),
      ]);
      Alert.alert('Invitación enviada', 'La persona recibirá un correo para sumarse a la organización.');
      router.back();
    },
    onError: (error: unknown) =>
      Alert.alert('No pudimos enviar la invitación', getApiErrorMessage(error, 'Revisá los datos e intentá nuevamente.')),
  });
  const canSubmit = /^\S+@\S+\.\S+$/.test(email.trim());

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      <Pressable onPress={() => router.back()}>
        <Text className="text-sm font-semibold text-emerald-800">‹ Volver</Text>
      </Pressable>
      <Text className="mt-5 text-3xl font-bold text-slate-900">Invitar miembro</Text>
      <Text className="mt-2 text-sm leading-5 text-slate-600">
        Definí su rol inicial. Después vas a poder habilitar módulos, campos y trabajos concretos.
      </Text>

      <View className="mt-7 rounded-2xl bg-white p-5">
        <Text className="text-sm font-semibold text-slate-800">Correo electrónico</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="persona@correo.com"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
        />

        <Text className="mt-6 text-sm font-semibold text-slate-800">Rol</Text>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {ROLES.map((option) => (
            <Pressable
              key={option.value}
              className={`rounded-full border px-3 py-2 ${
                rol === option.value ? 'border-emerald-700 bg-emerald-700' : 'border-slate-200 bg-white'
              }`}
              onPress={() => setRol(option.value)}
            >
              <Text className={`text-sm font-semibold ${rol === option.value ? 'text-white' : 'text-slate-700'}`}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="mt-6 text-sm font-semibold text-slate-800">Mensaje opcional</Text>
        <TextInput
          multiline
          placeholder="Contale brevemente para qué lo estás invitando."
          placeholderTextColor="#94a3b8"
          value={mensaje}
          onChangeText={setMensaje}
          className="mt-2 min-h-28 rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
          textAlignVertical="top"
        />

        <Pressable
          className="mt-7 items-center rounded-xl bg-emerald-700 px-5 py-4 disabled:opacity-50"
          disabled={!canSubmit || inviteMutation.isPending}
          onPress={() => inviteMutation.mutate()}
        >
          <Text className="font-semibold text-white">
            {inviteMutation.isPending ? 'Enviando invitación…' : 'Enviar invitación'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
