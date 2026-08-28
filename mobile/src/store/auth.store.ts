import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import type { Membresia, Organizacion, Usuario } from '@/types/auth';

const SESSION_STORAGE_KEY = 'agromanager-mobile-session';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface StoredSession {
  token: string;
  usuario: Usuario;
  organizacionActivaId: number | null;
}

interface AuthState {
  token: string | null;
  usuario: Usuario | null;
  organizacionActivaId: number | null;
  membresia: Membresia | null;
  membresiaOrganizacionId: number | null;
  status: AuthStatus;
  hydrate: () => Promise<void>;
  setSession: (token: string, usuario: Usuario) => Promise<void>;
  refreshUser: (usuario: Usuario) => Promise<void>;
  selectOrganization: (organizacionId: number) => Promise<void>;
  setMembership: (organizacionId: number, membresia: Membresia) => void;
  clearMembership: () => void;
  logout: () => Promise<void>;
  currentOrganization: () => Organizacion | undefined;
  isOwner: () => boolean;
  isSuperAdmin: () => boolean;
  isPro: () => boolean;
}

const persistSession = async (session: StoredSession) => {
  await SecureStore.setItemAsync(SESSION_STORAGE_KEY, JSON.stringify(session));
};

const uniqueOrganizations = (organizaciones: Organizacion[] = []) =>
  Array.from(
    new Map(organizaciones.map((organizacion) => [organizacion.id, organizacion])).values(),
  );

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  usuario: null,
  organizacionActivaId: null,
  membresia: null,
  membresiaOrganizacionId: null,
  status: 'loading',

  hydrate: async () => {
    try {
      const rawSession = await SecureStore.getItemAsync(SESSION_STORAGE_KEY);
      if (!rawSession) {
        set({ status: 'unauthenticated' });
        return;
      }

      const session = JSON.parse(rawSession) as StoredSession;
      if (!session.token || !session.usuario) {
        await SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);
        set({ status: 'unauthenticated' });
        return;
      }

      const usuario = {
        ...session.usuario,
        organizaciones: uniqueOrganizations(session.usuario.organizaciones),
      };
      set({
        ...session,
        usuario,
        membresia: null,
        membresiaOrganizacionId: null,
        status: 'authenticated',
      });
    } catch {
      await SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);
      set({ status: 'unauthenticated' });
    }
  },

  setSession: async (token, usuario) => {
    const organizaciones = uniqueOrganizations(usuario.organizaciones);
    const organizacionActivaId = organizaciones.length === 1 ? organizaciones[0].id : null;
    const session = { token, usuario: { ...usuario, organizaciones }, organizacionActivaId };
    set({
      ...session,
      membresia: null,
      membresiaOrganizacionId: null,
      status: 'authenticated',
    });
    await persistSession(session);
  },

  refreshUser: async (usuario) => {
    const { token, organizacionActivaId, membresia, membresiaOrganizacionId } = get();
    if (!token) return;

    const organizaciones = uniqueOrganizations(usuario.organizaciones);
    const mantieneOrganizacionActiva = organizaciones.some(
      (organizacion) => organizacion.id === organizacionActivaId,
    );
    const siguienteOrganizacionId = mantieneOrganizacionActiva
      ? organizacionActivaId
      : organizaciones.length === 1
        ? organizaciones[0].id
        : null;
    const session = {
      token,
      usuario: { ...usuario, organizaciones },
      organizacionActivaId: siguienteOrganizacionId,
    };

    set({
      ...session,
      membresia: mantieneOrganizacionActiva ? membresia : null,
      membresiaOrganizacionId: mantieneOrganizacionActiva
        ? membresiaOrganizacionId
        : null,
    });
    await persistSession(session);
  },

  selectOrganization: async (organizacionId) => {
    const { token, usuario } = get();
    if (!token || !usuario?.organizaciones.some((organizacion) => organizacion.id === organizacionId)) {
      return;
    }

    const session = { token, usuario, organizacionActivaId: organizacionId };
    set({ ...session, membresia: null, membresiaOrganizacionId: null });
    await persistSession(session);
  },

  setMembership: (organizacionId, membresia) => {
    set({ membresia, membresiaOrganizacionId: organizacionId });
  },

  clearMembership: () => {
    set({ membresia: null, membresiaOrganizacionId: null });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);
    set({
      token: null,
      usuario: null,
      organizacionActivaId: null,
      membresia: null,
      membresiaOrganizacionId: null,
      status: 'unauthenticated',
    });
  },

  currentOrganization: () => {
    const { usuario, organizacionActivaId } = get();
    return usuario?.organizaciones.find((organizacion) => organizacion.id === organizacionActivaId);
  },

  isOwner: () => {
    const { usuario, organizacionActivaId } = get();
    return Boolean(
      usuario &&
        organizacionActivaId &&
        usuario.organizaciones.some(
          (organizacion) =>
            organizacion.id === organizacionActivaId && organizacion.propietarioId === usuario.id,
        ),
    );
  },

  isSuperAdmin: () => get().usuario?.rolGlobal === 'SUPERADMIN',

  isPro: () => get().currentOrganization()?.plan === 'PRO',
}));
