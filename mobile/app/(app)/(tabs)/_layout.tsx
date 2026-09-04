import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';

export default function TabsLayout() {
  const isOwner = useAuthStore((state) => state.isOwner());
  const membresia = useAuthStore((state) => state.membresia);
  const moduloHabilitado = (modulo: string) =>
    isOwner ||
    membresia?.modulos.some(
      (moduloAsignado) => moduloAsignado.moduloNombre === modulo && moduloAsignado.activo,
    );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6ee7b7',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          height: 74,
          paddingTop: 10,
          paddingBottom: 10,
          borderTopColor: '#253248',
          borderTopWidth: 1,
          backgroundColor: '#111c2e',
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Feather color={color} name="home" size={size} />,
        }}
      />
      <Tabs.Screen
        name="campos"
        options={{
          title: 'Campos',
          href: moduloHabilitado('Campos') ? undefined : null,
          tabBarIcon: ({ color, size }) => <Feather color={color} name="map" size={size} />,
        }}
      />
      <Tabs.Screen
        name="tareas"
        options={{
          title: 'Tareas',
          href: moduloHabilitado('Tareas') ? undefined : null,
          tabBarIcon: ({ color, size }) => <Feather color={color} name="clipboard" size={size} />,
        }}
      />
      <Tabs.Screen
        name="equipo"
        options={{
          title: 'Equipo',
          href: isOwner ? undefined : null,
          tabBarIcon: ({ color, size }) => <Feather color={color} name="users" size={size} />,
        }}
      />
      <Tabs.Screen
        name="mas"
        options={{
          title: 'Más',
          tabBarIcon: ({ color, size }) => <Feather color={color} name="grid" size={size} />,
        }}
      />
    </Tabs>
  );
}
