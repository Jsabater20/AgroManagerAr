import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {
  desactivarDispositivoPush,
  registrarDispositivoPush,
} from '@/api/notificaciones.api';

const PUSH_TOKEN_STORAGE_KEY = 'agromanager-mobile-push-token';

const permisoEstaOtorgado = (permisos: unknown): boolean =>
  typeof permisos === 'object' &&
  permisos !== null &&
  'granted' in permisos &&
  (permisos as { granted?: unknown }).granted === true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const tienePermisoDeNotificaciones = async (): Promise<boolean> => {
  const permisos = await Notifications.getPermissionsAsync();
  return permisoEstaOtorgado(permisos);
};

export const tieneDispositivoRegistrado = async (): Promise<boolean> =>
  Boolean(await SecureStore.getItemAsync(PUSH_TOKEN_STORAGE_KEY));

export const activarNotificacionesPush = async (): Promise<void> => {
  if (Platform.OS === 'web') {
    throw new Error('Las notificaciones push se configuran desde la app móvil.');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('agromanager', {
      name: 'AgroManager',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#16a34a',
    });
  }

  let permisos = await Notifications.getPermissionsAsync();
  if (!permisoEstaOtorgado(permisos)) {
    permisos = await Notifications.requestPermissionsAsync();
  }

  if (!permisoEstaOtorgado(permisos)) {
    throw new Error('Necesitás habilitar las notificaciones en el dispositivo.');
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  if (!projectId) {
    throw new Error('Falta configurar el projectId de EAS para las notificaciones.');
  }

  const expoPushToken = (
    await Notifications.getExpoPushTokenAsync({ projectId })
  ).data;
  await registrarDispositivoPush(
    expoPushToken,
    Platform.OS === 'ios' ? 'ios' : 'android',
  );
  await SecureStore.setItemAsync(PUSH_TOKEN_STORAGE_KEY, expoPushToken);
};

export const desactivarNotificacionesPush = async (): Promise<void> => {
  const expoPushToken = await SecureStore.getItemAsync(PUSH_TOKEN_STORAGE_KEY);
  if (expoPushToken) {
    await desactivarDispositivoPush(expoPushToken);
  }
  await SecureStore.deleteItemAsync(PUSH_TOKEN_STORAGE_KEY);
};

export const escucharRespuestasDeNotificaciones = (
  alRecibir: (datos: Record<string, unknown>) => void,
) =>
  Notifications.addNotificationResponseReceivedListener((respuesta) => {
    const datos = respuesta.notification.request.content.data;
    if (datos && typeof datos === 'object') {
      alRecibir(datos as Record<string, unknown>);
    }
  });
