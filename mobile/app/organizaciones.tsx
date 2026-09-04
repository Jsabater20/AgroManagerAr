import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';

export default function OrganizationsScreen() {
  const usuario = useAuthStore((state) => state.usuario);
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);
  const selectOrganization = useAuthStore((state) => state.selectOrganization);

  const chooseOrganization = async (organizacionId: number) => {
    await selectOrganization(organizacionId);
    router.replace('/(app)/(tabs)');
  };

  return (
    <View className="flex-1 bg-slate-950 px-6 pt-20">
      <Text className="text-3xl font-bold text-white">Elegí una organización</Text>
      <Text className="mb-8 mt-2 text-base text-slate-300">Vas a trabajar con los datos y permisos de la organización seleccionada.</Text>

      <View className="gap-3">
        {usuario?.organizaciones.map((organizacion) => (
          <Pressable
            key={organizacion.id}
            onPress={() => chooseOrganization(organizacion.id)}
            className={`rounded-2xl border bg-white p-5 ${
              organizacion.id === organizacionActivaId ? 'border-green-500' : 'border-white'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-slate-900">{organizacion.nombre}</Text>
              {organizacion.id === organizacionActivaId && (
                <Text className="text-xs font-bold text-green-700">ACTIVA</Text>
              )}
            </View>
            <Text className="mt-1 text-sm text-slate-500">Plan {organizacion.plan === 'PRO' ? 'Pro' : 'Free'}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
