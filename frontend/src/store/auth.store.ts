import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  rolGlobal?: string;
  plan: 'FREE' | 'PRO';
  planExpira?: string | null;
  usuarioOrganizacionId?: number | null;
  organizaciones?: Organizacion[];
}

interface AuthState {
  token: string | null;
  usuario: Usuario | null;
  isLoading: boolean;
  setAuth: (usuario: Usuario | null, token: string | null) => void;
  logout: () => void;
  setIsLoading: (v: boolean) => void;
  isPro: () => boolean;
  currentOrg: () => Organizacion | undefined;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      usuario: null,
      isLoading: true,
      setAuth: (usuario, token) => set({ usuario, token }),
      logout: () => set({ usuario: null, token: null, isLoading: false }),
      setIsLoading: (v) => set({ isLoading: v }),
      isPro: () => {
        const { usuario } = get();
        if (!usuario) return false;

        const orgActual = usuario.organizaciones?.find(
          (o) => o.id === Number(usuario.usuarioOrganizacionId),
        );

        if (orgActual) return orgActual.plan === 'PRO';

        const orgPrimera = usuario.organizaciones?.[0];
        if (orgPrimera) return orgPrimera.plan === 'PRO';

        return usuario.plan === 'PRO';
      },
      currentOrg: () => {
        const { usuario } = get();
        if (!usuario) return undefined;

        const orgActual = usuario.organizaciones?.find(
          (o) => o.id === Number(usuario.usuarioOrganizacionId),
        );
        if (orgActual) return orgActual;

        return usuario.organizaciones?.[0];
      },
    }),
    {
      name: 'agromanager-auth',
      partialize: (state) => ({ token: state.token, usuario: state.usuario }),
    },
  ),
);