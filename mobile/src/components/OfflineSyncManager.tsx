import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import * as Network from 'expo-network';
import {
  getOfflineQueueSummary,
  isOnline,
  syncOfflineOperations,
} from '@/services/offline-queue.service';
import { useAuthStore } from '@/store/auth.store';
import { useOfflineStore } from '@/store/offline.store';

export function OfflineSyncManager() {
  const status = useAuthStore((state) => state.status);
  const userId = useAuthStore((state) => state.usuario?.id);
  const queryClient = useQueryClient();
  const setNetworkState = useOfflineStore((state) => state.setNetworkState);
  const setQueueSummary = useOfflineStore((state) => state.setQueueSummary);
  const setSyncing = useOfflineStore((state) => state.setSyncing);
  const setLastSyncAt = useOfflineStore((state) => state.setLastSyncAt);
  const reset = useOfflineStore((state) => state.reset);

  useEffect(() => {
    if (status !== 'authenticated' || !userId) {
      reset();
      return;
    }

    let active = true;
    const refresh = async (shouldSync: boolean) => {
      const online = await isOnline();
      if (!active) return;

      setNetworkState(online);
      if (online && shouldSync) {
        setSyncing(true);
        const result = await syncOfflineOperations(userId);
        if (!active) return;
        setQueueSummary(result.pendingCount, result.failedCount);
        setSyncing(false);
        if (result.syncedCount) {
          setLastSyncAt(new Date().toISOString());
          await queryClient.invalidateQueries();
        }
        return;
      }

      const summary = await getOfflineQueueSummary(userId);
      if (active) setQueueSummary(summary.pendingCount, summary.failedCount);
    };

    void refresh(true);
    const networkSubscription = Network.addNetworkStateListener((networkState) => {
      if (networkState.isConnected && networkState.isInternetReachable !== false) {
        void refresh(true);
      } else {
        setNetworkState(false);
      }
    });
    const appStateSubscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') void refresh(true);
    });

    return () => {
      active = false;
      networkSubscription.remove();
      appStateSubscription.remove();
    };
  }, [
    queryClient,
    reset,
    setLastSyncAt,
    setNetworkState,
    setQueueSummary,
    setSyncing,
    status,
    userId,
  ]);

  return null;
}
