import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';

export default function Index() {
  const status = useAuthStore((state) => state.status);
  const token = useAuthStore((state) => state.token);
  const organizacionActivaId = useAuthStore((state) => state.organizacionActivaId);

  if (status === 'loading') {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#15803d" size="large" />
      </View>
    );
  }

  if (!token) return <Redirect href="/(auth)/login" />;
  if (!organizacionActivaId) return <Redirect href="/organizaciones" />;
  return <Redirect href="/(app)/(tabs)" />;
}
