import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { File } from 'expo-file-system';
import { router } from 'expo-router';
import { eliminarFotoPerfil, getProfile, subirFotoPerfil } from '@/api/users.api';
import { getApiErrorMessage } from '@/api/errors';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { useAuthStore } from '@/store/auth.store';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function PerfilScreen() {
  const usuario = useAuthStore((state) => state.usuario);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const currentOrganization = useAuthStore((state) => state.currentOrganization);
  const queryClient = useQueryClient();
  const [isPreparing, setIsPreparing] = useState(false);
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: getProfile });
  const profile = profileQuery.data ?? usuario;
  const organization = currentOrganization();

  const uploadMutation = useMutation({
    mutationFn: subirFotoPerfil,
    onSuccess: async (updatedProfile) => {
      await refreshUser(updatedProfile);
      queryClient.setQueryData(['profile'], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ['equipo-miembros'] });
      Alert.alert('Foto actualizada', 'Tu foto de perfil se guardó correctamente.');
    },
    onError: (error: unknown) =>
      Alert.alert('No pudimos guardar la foto', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });
  const deleteMutation = useMutation({
    mutationFn: eliminarFotoPerfil,
    onSuccess: async () => {
      if (usuario) {
        const updatedProfile = { ...usuario, fotoPerfilUrl: null };
        await refreshUser(updatedProfile);
        queryClient.setQueryData(['profile'], updatedProfile);
      }
      queryClient.invalidateQueries({ queryKey: ['equipo-miembros'] });
    },
    onError: (error: unknown) =>
      Alert.alert('No pudimos eliminar la foto', getApiErrorMessage(error, 'Intentá nuevamente.')),
  });

  const prepararYSubir = async (asset: ImagePicker.ImagePickerAsset) => {
    setIsPreparing(true);
    try {
      const largestSide = Math.max(asset.width, asset.height);
      const scale = largestSide > 1024 ? 1024 / largestSide : 1;
      const image = await ImageManipulator.manipulateAsync(
        asset.uri,
        scale < 1
          ? [{ resize: { width: Math.max(1, Math.round(asset.width * scale)) } }]
          : [],
        { compress: 0.78, format: ImageManipulator.SaveFormat.JPEG },
      );
      const file = new File(image.uri);
      if (!file.size || Number(file.size) > MAX_FILE_SIZE) {
        throw new Error('La foto es demasiado pesada. Elegí otra imagen.');
      }
      uploadMutation.mutate(image.uri);
    } catch (error) {
      Alert.alert(
        'No pudimos preparar la foto',
        error instanceof Error ? error.message : 'Intentá nuevamente.',
      );
    } finally {
      setIsPreparing(false);
    }
  };

  const tomarFoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Permití la cámara para actualizar tu foto de perfil.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 1 });
    if (!result.canceled) await prepararYSubir(result.assets[0]);
  };

  const elegirGaleria = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Permití el acceso a tus fotos para actualizar tu perfil.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
    if (!result.canceled) await prepararYSubir(result.assets[0]);
  };

  const isBusy = isPreparing || uploadMutation.isPending || deleteMutation.isPending;
  const fullName = [profile?.nombre, profile?.apellido].filter(Boolean).join(' ') || 'Usuario';

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 36 }}>
      <Pressable onPress={() => router.back()}>
        <Text className="text-sm font-semibold text-emerald-800">{'<'} Volver</Text>
      </Pressable>

      <View className="mt-5 items-center rounded-3xl bg-emerald-800 px-6 py-7">
        <ProfileAvatar
          apellido={profile?.apellido}
          fotoUrl={profile?.fotoPerfilUrl}
          nombre={profile?.nombre}
          size="lg"
        />
        <Text className="mt-4 text-2xl font-bold text-white">{fullName}</Text>
        <Text className="mt-1 text-sm text-emerald-100">{profile?.email}</Text>
      </View>

      <View className="mt-5 rounded-2xl bg-white p-5">
        <Text className="text-lg font-bold text-slate-900">Foto de perfil</Text>
        <Text className="mt-1 text-sm leading-5 text-slate-500">
          Esta foto se verá en tu perfil y por el propietario dentro del equipo.
        </Text>
        <View className="mt-5 flex-row gap-3">
          <Pressable
            className="flex-1 items-center rounded-xl bg-emerald-700 px-3 py-3 disabled:opacity-50"
            disabled={isBusy}
            onPress={() => void tomarFoto()}
          >
            <Text className="font-semibold text-white">{isPreparing ? 'Preparando...' : 'Sacar foto'}</Text>
          </Pressable>
          <Pressable
            className="flex-1 items-center rounded-xl border border-emerald-700 px-3 py-3 disabled:opacity-50"
            disabled={isBusy}
            onPress={() => void elegirGaleria()}
          >
            <Text className="font-semibold text-emerald-800">Galería</Text>
          </Pressable>
        </View>
        {profile?.fotoPerfilUrl ? (
          <Pressable
            className="mt-3 self-start rounded-lg px-2 py-2 disabled:opacity-50"
            disabled={isBusy}
            onPress={() =>
              Alert.alert('Eliminar foto', '¿Querés eliminar tu foto de perfil?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => deleteMutation.mutate() },
              ])
            }
          >
            <Text className="font-semibold text-red-600">Eliminar foto</Text>
          </Pressable>
        ) : null}
      </View>

      <View className="mt-5 rounded-2xl bg-white p-5">
        <Text className="text-sm font-bold uppercase tracking-widest text-slate-500">Cuenta</Text>
        <InfoRow label="Plan" value={organization?.plan === 'PRO' ? 'Pro' : 'Free'} />
        <InfoRow label="Rol" value={profile?.rol ?? 'Miembro'} />
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mt-4 flex-row items-center justify-between border-t border-slate-100 pt-4">
      <Text className="text-sm text-slate-500">{label}</Text>
      <Text className="text-sm font-semibold text-slate-800">{value}</Text>
    </View>
  );
}
