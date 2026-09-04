import { api } from './client';

export interface Notificacion {
  id: string;
  tipo: string;
  titulo: string;
  mensaje: string;
  enlace?: string | null;
  leidaEn?: string | null;
  createdAt: string;
}

export const getNotificaciones = (): Promise<Notificacion[]> =>
  api.get<Notificacion[]>('/notificaciones').then((response) => response.data);

export const marcarNotificacionLeida = (id: string): Promise<{ ok: boolean }> =>
  api.patch<{ ok: boolean }>(`/notificaciones/${id}/leida`).then((response) => response.data);
