import '../global.css';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getProfile } from '@/api/users.api';
import { OfflineSyncManager } from '@/components/OfflineSyncManager';
import { useAuthStore } from '@/store/auth.store';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function AppNavigator() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const status = useAuthStore((state) => state.status);
  const token = useAuthStore((state) => state.token);
  const refreshUser = useAuthStore((state) => state.refreshUser);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (status !== 'authenticated' || !token) return;

    let active = true;
    getProfile()
      .then((profile) => {
        if (active) void refreshUser(profile);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [refreshUser, status, token]);

  return (
    <>
      <StatusBar style="light" />
      <OfflineSyncManager />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}
