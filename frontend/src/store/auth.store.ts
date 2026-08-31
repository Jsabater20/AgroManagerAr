import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { queryClient } from '../lib/queryClient';

export interface Organizacion {
  id: number;
  nombre: string;
  email?: string;
  plan?: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol?: string;
  rolGlobal?: string;
  plan?: 'FREE' | 'PRO';
  planExpira?: string | null;
  usuarioOrganizacionId?: number | null;
  organizaciones?: Organizacion[];
  fotoPerfilUrl?: string | null;
}

const normalizeUsuario = (usuario: Usuario | null): Usuario | null => {
  if (!usuario) return null;

  const organizaciones = (usuario.organizaciones ?? []).filter(Boolean);

  const resolvedOrgId =
    usuario.usuarioOrganizacionId ??
    (organizaciones.length === 1 ? organizaciones[0].id : null);

  return {
    ...usuario,
    usuarioOrganizacionId: resolvedOrgId,
    organizaciones,
  };
};

interface AuthState {
  token: string | null;
  usuario: Usuario | null;
  isLoading: boolean;
  setAuth: (usuario: Usuario | null, token: string | null) => void;
  logout: () => void;
  setIsLoading: (v: boolean) => void;
  isPro: () => boolean;
  currentOrg: () => Organizacion | undefined;
  activeOrgId: () => number | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      usuario: null,
      isLoading: true,

      setAuth: (usuario, token) => {
        set({
          usuario: normalizeUsuario(usuario),
          token,
          isLoading: false,
        });
      },

      logout: () => {
        queryClient.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('organizacionId');

        set({
          usuario: null,
          token: null,
          isLoading: false,
        });
      },

      setIsLoading: (v) => set({ isLoading: v }),

      isPro: () => {
        const currentOrg = get().currentOrg();
        return currentOrg?.plan === 'PRO';
      },

      currentOrg: () => {
        const usuario = get().usuario;

        if (!usuario) return undefined;

        const organizaciones = usuario.organizaciones ?? [];
        const activeId = usuario.usuarioOrganizacionId;

        if (activeId) {
          return organizaciones.find((org) => org.id === Number(activeId));
        }

        if (organizaciones.length === 1) {
          return organizaciones[0];
        }

        return undefined;
      },

      activeOrgId: () => {
        const org = get().currentOrg();
        return org ? org.id : null;
      },
    }),
    {
      name: 'agromanager-auth',
      partialize: (state) => ({
        token: state.token,
        usuario: state.usuario,
      }),
    },
  ),
);
