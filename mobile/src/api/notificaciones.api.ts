import { api } from '@/api/client';

export const registrarDispositivoPush = async (
  expoPushToken: string,
  plataforma: 'android' | 'ios',
) => {
  await api.post('/notificaciones/dispositivos', { expoPushToken, plataforma });
};

export const desactivarDispositivoPush = async (expoPushToken: string) => {
  await api.delete('/notificaciones/dispositivos', { data: { expoPushToken } });
};
