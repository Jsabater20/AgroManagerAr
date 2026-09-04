import axios from 'axios';
import * as Network from 'expo-network';
import * as SQLite from 'expo-sqlite';
import { api } from '@/api/client';
import { useOfflineStore } from '@/store/offline.store';
import type { EstadoActividad } from '@/types/dashboard';

type OfflineOperationType = 'ACTIVIDAD_ESTADO' | 'OBSERVACION_ACTIVIDAD';
type OfflineOperationStatus = 'PENDING' | 'FAILED';

interface OfflineOperationRow {
  id: string;
  user_id: number;
  organization_id: number;
  type: OfflineOperationType;
  payload: string;
  status: OfflineOperationStatus;
  attempts: number;
  last_error: string | null;
  created_at: string;
}

interface ActivityStatePayload {
  actividadId: number;
  estado: EstadoActividad;
}

interface ActivityObservationPayload {
  actividadId: number;
  contenido: string;
  fotoBase64?: string;
  idempotencyKey: string;
}

export interface OfflineMutationResult<T> {
  queued: boolean;
  data?: T;
}

export interface OfflineQueueSummary {
  pendingCount: number;
  failedCount: number;
}

export interface OfflineSyncResult extends OfflineQueueSummary {
  syncedCount: number;
}

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

const getDatabase = async () => {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync('agromanager-offline.db').then(
      async (database) => {
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS offline_operations (
            id TEXT PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            organization_id INTEGER NOT NULL,
            type TEXT NOT NULL,
            payload TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'PENDING',
            attempts INTEGER NOT NULL DEFAULT 0,
            last_error TEXT,
            created_at TEXT NOT NULL
          );
          CREATE INDEX IF NOT EXISTS offline_operations_user_status_idx
            ON offline_operations(user_id, status, created_at);
        `);
        return database;
      },
    );
  }

  return databasePromise;
};

const createUuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    const value = character === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });

const isNetworkError = (error: unknown) =>
  axios.isAxiosError(error) && !error.response;

export const isOnline = async (): Promise<boolean> => {
  try {
    const state = await Network.getNetworkStateAsync();
    return state.isConnected === true && state.isInternetReachable !== false;
  } catch {
    return false;
  }
};

const enqueueOperation = async (
  userId: number,
  organizationId: number,
  type: OfflineOperationType,
  payload: ActivityStatePayload | ActivityObservationPayload,
) => {
  const database = await getDatabase();
  await database.runAsync(
    `INSERT INTO offline_operations
      (id, user_id, organization_id, type, payload, status, attempts, created_at)
      VALUES (?, ?, ?, ?, ?, 'PENDING', 0, ?)`,
    createUuid(),
    userId,
    organizationId,
    type,
    JSON.stringify(payload),
    new Date().toISOString(),
  );
};

export const getOfflineQueueSummary = async (
  userId: number,
): Promise<OfflineQueueSummary> => {
  const database = await getDatabase();
  const summary = await database.getFirstAsync<{
    pendingCount: number;
    failedCount: number;
  }>(
    `SELECT
      SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pendingCount,
      SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) AS failedCount
     FROM offline_operations
     WHERE user_id = ?`,
    userId,
  );

  return {
    pendingCount: Number(summary?.pendingCount ?? 0),
    failedCount: Number(summary?.failedCount ?? 0),
  };
};

const refreshOfflineStore = async (userId: number) => {
  const summary = await getOfflineQueueSummary(userId);
  useOfflineStore.getState().setQueueSummary(summary.pendingCount, summary.failedCount);
};

export const retryFailedOfflineOperations = async (userId: number) => {
  const database = await getDatabase();
  await database.runAsync(
    `UPDATE offline_operations
     SET status = 'PENDING', last_error = NULL
     WHERE user_id = ? AND status = 'FAILED'`,
    userId,
  );
};

export const executeActivityStateChange = async <T>(
  userId: number,
  organizationId: number,
  actividadId: number,
  estado: EstadoActividad,
): Promise<OfflineMutationResult<T>> => {
  const payload: ActivityStatePayload = { actividadId, estado };
  const request = () =>
    api.patch<T>(
      `/organizaciones/${organizationId}/actividades/${actividadId}/estado`,
      { estado },
    );

  if (!(await isOnline())) {
    await enqueueOperation(userId, organizationId, 'ACTIVIDAD_ESTADO', payload);
    await refreshOfflineStore(userId);
    return { queued: true };
  }

  try {
    const response = await request();
    return { queued: false, data: response.data };
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    await enqueueOperation(userId, organizationId, 'ACTIVIDAD_ESTADO', payload);
    await refreshOfflineStore(userId);
    return { queued: true };
  }
};

export const executeActivityObservation = async <T>(
  userId: number,
  organizationId: number,
  actividadId: number,
  contenido: string,
  fotoBase64?: string,
): Promise<OfflineMutationResult<T>> => {
  const payload: ActivityObservationPayload = {
    actividadId,
    contenido,
    fotoBase64,
    idempotencyKey: createUuid(),
  };
  const request = () =>
    api.post<T>(
      `/organizaciones/${organizationId}/actividades/${actividadId}/observaciones`,
      payload,
    );

  if (!(await isOnline())) {
    await enqueueOperation(userId, organizationId, 'OBSERVACION_ACTIVIDAD', payload);
    await refreshOfflineStore(userId);
    return { queued: true };
  }

  try {
    const response = await request();
    return { queued: false, data: response.data };
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    await enqueueOperation(userId, organizationId, 'OBSERVACION_ACTIVIDAD', payload);
    await refreshOfflineStore(userId);
    return { queued: true };
  }
};

export const syncOfflineOperations = async (
  userId: number,
): Promise<OfflineSyncResult> => {
  if (!(await isOnline())) {
    return { ...(await getOfflineQueueSummary(userId)), syncedCount: 0 };
  }

  const database = await getDatabase();
  const operations = await database.getAllAsync<OfflineOperationRow>(
    `SELECT * FROM offline_operations
     WHERE user_id = ? AND status = 'PENDING'
     ORDER BY created_at ASC`,
    userId,
  );
  let syncedCount = 0;

  for (const operation of operations) {
    try {
      if (operation.type === 'ACTIVIDAD_ESTADO') {
        const payload = JSON.parse(operation.payload) as ActivityStatePayload;
        await api.patch(
          `/organizaciones/${operation.organization_id}/actividades/${payload.actividadId}/estado`,
          { estado: payload.estado },
        );
      } else {
        const payload = JSON.parse(operation.payload) as ActivityObservationPayload;
        await api.post(
          `/organizaciones/${operation.organization_id}/actividades/${payload.actividadId}/observaciones`,
          payload,
        );
      }

      await database.runAsync('DELETE FROM offline_operations WHERE id = ?', operation.id);
      syncedCount += 1;
    } catch (error) {
      if (isNetworkError(error)) break;

      const message = axios.isAxiosError(error)
        ? error.response?.data?.message ?? 'La operación fue rechazada por el servidor.'
        : 'No pudimos sincronizar la operación.';
      await database.runAsync(
        `UPDATE offline_operations
         SET status = 'FAILED', attempts = attempts + 1, last_error = ?
         WHERE id = ?`,
        String(message),
        operation.id,
      );
    }
  }

  return { ...(await getOfflineQueueSummary(userId)), syncedCount };
};
