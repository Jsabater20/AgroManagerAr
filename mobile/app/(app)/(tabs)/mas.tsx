import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Href, router } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';
import {
  getOfflineQueueSummary,
  retryFailedOfflineOperations,
  syncOfflineOperations,
} from '@/services/offline-queue.service';
import { useOfflineStore } from '@/store/offline.store';

interface ModuleLink {
  label: string;
  icon: string;
  href: Href;
}

export default function MasScreen() {
  const currentOrganization = useAuthStore((state) => state.currentOrganization);
  const isOwner = useAuthStore((state) => state.isOwner());
  const isSuperAdmin = useAuthStore((state) => state.isSuperAdmin());
  const membresia = useAuthStore((state) => state.membresia);
  const logout = useAuthStore((state) => state.logout);
  const userId = useAuthStore((state) => state.usuario?.id);
  const isOnline = useOfflineStore((state) => state.isOnline);
  const pendingCount = useOfflineStore((state) => state.pendingCount);
  const failedCount = useOfflineStore((state) => state.failedCount);
  const isSyncing = useOfflineStore((state) => state.isSyncing);
  const setQueueSummary = useOfflineStore((state) => state.setQueueSummary);
  const setSyncing = useOfflineStore((state) => state.setSyncing);
  const organization = currentOrganization();

  const hasModule = (moduleName: string) =>
    isOwner ||
    membresia?.modulos.some(
      (module) => module.moduloNombre === moduleName && module.activo,
    ) === true;
  const canViewCultivosSiembras =
    hasModule('Cultivos') || hasModule('Siembras');
  const canViewGanado = hasModule('Ganadería');
  const canViewInsumos = hasModule('Insumos');
  const canViewMaquinarias = hasModule('Maquinarias');
  const canViewFinanzas = hasModule('Finanzas');
  const canViewClima = hasModule('Clima');
  const canViewAnalitica =
    organization?.plan === 'PRO' && hasModule('Reportes');
  const canViewCampanias = isOwner && organization?.plan === 'PRO';
  const enabledModules: ModuleLink[] = [
    ...(canViewCultivosSiembras
      ? [
          {
            label: 'Cultivos y siembras',
            icon: 'C',
            href: '/(app)/cultivos-siembras' as Href,
          },
        ]
      : []),
    ...(canViewInsumos
      ? [{ label: 'Insumos', icon: 'I', href: '/(app)/insumos' as Href }]
      : []),
    ...(canViewGanado
      ? [{ label: 'Ganadería', icon: 'G', href: '/(app)/ganado' as Href }]
      : []),
    ...(canViewMaquinarias
      ? [
          {
            label: 'Maquinarias',
            icon: 'M',
            href: '/(app)/maquinarias' as Href,
          },
        ]
      : []),
    ...(canViewFinanzas
      ? [{ label: 'Finanzas', icon: '$', href: '/(app)/finanzas' as Href }]
      : []),
    ...(canViewClima
      ? [{ label: 'Clima', icon: 'C', href: '/(app)/clima' as Href }]
      : []),
    ...(canViewAnalitica
      ? [
          {
            label: 'Rentabilidad y reportes',
            icon: 'R',
            href: '/(app)/analitica' as Href,
          },
        ]
      : []),
    ...(canViewCampanias
      ? [
          {
            label: 'Campañas',
            icon: 'C',
            href: '/(app)/campanias' as Href,
          },
        ]
      : []),
  ];
  const upcomingModules = [
    ...(canViewCultivosSiembras ? [] : ['Cultivos y siembras']),
    ...(canViewInsumos ? [] : ['Insumos']),
    ...(canViewCampanias ? [] : ['Campañas']),
    ...(canViewAnalitica ? [] : ['Rentabilidad y reportes']),
    ...(canViewClima ? [] : ['Clima']),
  ];

  const signOut = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const retryOfflineOperations = async () => {
    if (!userId) return;

    setSyncing(true);
    try {
      await retryFailedOfflineOperations(userId);
      const result = await syncOfflineOperations(userId);
      setQueueSummary(result.pendingCount, result.failedCount);
      Alert.alert(
        result.syncedCount
          ? 'Cambios sincronizados'
          : 'Sincronización pendiente',
        result.syncedCount
          ? `${result.syncedCount} cambio${result.syncedCount === 1 ? '' : 's'} se sincronizó correctamente.`
          : 'Necesitás conexión o revisar el estado actual del trabajo antes de reintentar.',
      );
    } finally {
      setSyncing(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 64 }}
    >
      <Text className="text-3xl font-bold text-slate-900">Más</Text>
      <Text className="mt-2 text-base text-slate-600">
        Accesos y configuración de tu organización.
      </Text>

      <View className="mt-7 rounded-2xl bg-emerald-700 p-5">
        <Text className="text-sm font-medium text-emerald-100">
          Plan de la organización
        </Text>
        <Text className="mt-1 text-2xl font-bold text-white">
          {organization?.plan === 'PRO' ? 'Pro' : 'Free'}
        </Text>
        <Text className="mt-2 text-sm text-emerald-100">
          {isOwner
            ? 'Administrás esta organización.'
            : 'Tu acceso depende de los permisos habilitados por el propietario.'}
        </Text>
      </View>

      {!isOnline || pendingCount > 0 || failedCount > 0 ? (
        <View className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <Text className="font-semibold text-amber-900">
            {!isOnline ? 'Modo sin conexión' : 'Sincronización de campo'}
          </Text>
          <Text className="mt-1 text-sm leading-5 text-amber-800">
            {!isOnline
              ? 'Los cambios de trabajos y observaciones se guardarán en este dispositivo.'
              : `${pendingCount} pendiente${pendingCount === 1 ? '' : 's'} y ${failedCount} para revisar.`}
          </Text>
          {failedCount > 0 ? (
            <Pressable
              className="mt-3 self-start rounded-lg bg-amber-700 px-3 py-2 disabled:opacity-50"
              disabled={isSyncing}
              onPress={() => void retryOfflineOperations()}
            >
              <Text className="font-semibold text-white">
                {isSyncing ? 'Reintentando…' : 'Reintentar sincronización'}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {isSuperAdmin && (
        <>
          <Text className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Sistema
          </Text>
          <Pressable
            className="mt-3 flex-row items-center justify-between rounded-2xl border border-violet-900 bg-violet-950 px-5 py-4"
            onPress={() => router.push('/(app)/admin' as Href)}
          >
            <View>
              <Text className="font-semibold text-violet-100">Panel SuperAdmin</Text>
              <Text className="mt-1 text-sm text-violet-200">Usuarios, planes y administración global</Text>
            </View>
            <Text className="text-lg text-violet-200">›</Text>
          </Pressable>
        </>
      )}

      {enabledModules.length > 0 ? (
        <>
          <Text className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Módulos habilitados
          </Text>
          <View className="mt-3 overflow-hidden rounded-2xl bg-white">
            {enabledModules.map((module, index) => (
              <Pressable
                key={module.label}
                className={`flex-row items-center justify-between px-5 py-4 ${index > 0 ? 'border-t border-slate-100' : ''}`}
                onPress={() => router.push(module.href)}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg text-emerald-700">{module.icon}</Text>
                  <Text className="font-medium text-slate-800">{module.label}</Text>
                </View>
                <Text className="text-lg text-slate-400">›</Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {upcomingModules.length > 0 ? (
        <>
          <Text className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Próximos módulos
          </Text>
          <View className="mt-3 overflow-hidden rounded-2xl bg-white">
            {upcomingModules.map((module, index) => (
              <View
                key={module}
                className={`flex-row items-center justify-between px-5 py-4 ${index < upcomingModules.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <Text className="font-medium text-slate-700">{module}</Text>
                <Text className="text-xs font-semibold text-slate-400">PRÓXIMAMENTE</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}

      <Text className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-500">
        Cuenta
      </Text>
      <View className="mt-3 overflow-hidden rounded-2xl bg-white">
        <Pressable
          className="flex-row items-center justify-between px-5 py-4"
          onPress={() => router.push('/(app)/notificaciones' as Href)}
        >
          <View>
            <Text className="font-medium text-slate-800">Notificaciones</Text>
            <Text className="mt-1 text-sm text-slate-500">
              Avisos de trabajos en este dispositivo
            </Text>
          </View>
          <Text className="text-lg text-slate-400">›</Text>
        </Pressable>
        <Pressable
          className="flex-row items-center justify-between border-t border-slate-100 px-5 py-4"
          onPress={() => router.push('/organizaciones')}
        >
          <Text className="font-medium text-slate-800">Cambiar organización</Text>
          <Text className="text-lg text-slate-400">›</Text>
        </Pressable>
        <Pressable
          className="flex-row items-center gap-3 border-t border-slate-100 px-5 py-4"
          onPress={signOut}
        >
          <Text className="font-medium text-red-600">Cerrar sesión</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
