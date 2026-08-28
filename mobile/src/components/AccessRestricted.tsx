import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

interface AccessRestrictedProps {
  title: string;
}

export function AccessRestricted({ title }: AccessRestrictedProps) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-6">
      <Text className="text-center text-xl font-bold text-slate-900">Acceso no habilitado</Text>
      <Text className="mt-2 text-center text-sm text-slate-600">
        El propietario todavía no te habilitó el módulo {title}.
      </Text>
      <Pressable
        className="mt-6 rounded-xl bg-emerald-700 px-5 py-3"
        onPress={() => router.replace('/(app)/(tabs)')}
      >
        <Text className="font-semibold text-white">Volver al inicio</Text>
      </Pressable>
    </View>
  );
}
