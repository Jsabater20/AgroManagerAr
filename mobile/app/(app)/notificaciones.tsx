import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import {
  activarNotificacionesPush,
  desactivarNotificacionesPush,
  tieneDispositivoRegistrado,
  tienePermisoDeNotificaciones,
} from '@/services/notificaciones.service';

export default function NotificacionesScreen() {
  const [cargando, setCargando] = useState(true);
  const [activadas, setActivadas] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const actualizarEstado = async () => {
    const [permiso, dispositivo] = await Promise.all([
      tienePermisoDeNotificaciones(),
      tieneDispositivoRegistrado(),
    ]);
    setActivadas(permiso && dispositivo);
  };

  useEffect(() => {
    void actualizarEstado().finally(() => setCargando(false));
  }, []);

  const manejarCambio = async () => {
    setProcesando(true);
    try {
      if (activadas) {
        await desactivarNotificacionesPush();
        setActivadas(false);
        return;
      }

      await activarNotificacionesPush();
      setActivadas(true);
      Alert.alert('Notificaciones activadas', 'Te avisaremos sobre trabajos asignados y completados.');
    } catch (error) {
      Alert.alert(
        'No pudimos activar las notificaciones',
        error instanceof Error ? error.message : 'Intentá nuevamente más tarde.',
      );
    } finally {
      setProcesando(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-50 px-6 pt-16">
      <Pressable onPress={() => router.back()}>
        <Text className="text-base font-medium text-emerald-700">‹ Volver</Text>
      </Pressable>
      <Text className="mt-6 text-3xl font-bold text-slate-900">Notificaciones</Text>
      <Text className="mt-2 text-base leading-6 text-slate-600">
        Recibí avisos cuando te asignen o reasignen trabajos. El propietario también recibe un aviso al completarlos.
      </Text>

      <View className="mt-8 rounded-2xl bg-white p-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-base font-semibold text-slate-900">Trabajos del equipo</Text>
            <Text className="mt-1 text-sm text-slate-500">
              {cargando
                ? 'Comprobando la configuración…'
                : activadas
                  ? 'Avisos activados en este dispositivo.'
                  : 'Activá los avisos para este dispositivo.'}
            </Text>
          </View>
          {cargando ? <ActivityIndicator color="#16a34a" /> : null}
        </View>
        <Pressable
          className={`mt-5 rounded-xl px-4 py-3 ${activadas ? 'bg-slate-200' : 'bg-emerald-600'}`}
          disabled={cargando || procesando}
          onPress={() => void manejarCambio()}
        >
          <Text className={`text-center font-semibold ${activadas ? 'text-slate-700' : 'text-white'}`}>
            {procesando ? 'Guardando…' : activadas ? 'Desactivar avisos' : 'Activar avisos'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
