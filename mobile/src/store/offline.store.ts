import { create } from 'zustand';

interface OfflineState {
  isOnline: boolean;
  pendingCount: number;
  failedCount: number;
  isSyncing: boolean;
  lastSyncAt: string | null;
  setNetworkState: (isOnline: boolean) => void;
  setQueueSummary: (pendingCount: number, failedCount: number) => void;
  setSyncing: (isSyncing: boolean) => void;
  setLastSyncAt: (lastSyncAt: string) => void;
  reset: () => void;
}

export const useOfflineStore = create<OfflineState>((set) => ({
  isOnline: true,
  pendingCount: 0,
  failedCount: 0,
  isSyncing: false,
  lastSyncAt: null,
  setNetworkState: (isOnline) => set({ isOnline }),
  setQueueSummary: (pendingCount, failedCount) => set({ pendingCount, failedCount }),
  setSyncing: (isSyncing) => set({ isSyncing }),
  setLastSyncAt: (lastSyncAt) => set({ lastSyncAt }),
  reset: () =>
    set({
      isOnline: true,
      pendingCount: 0,
      failedCount: 0,
      isSyncing: false,
      lastSyncAt: null,
    }),
}));
