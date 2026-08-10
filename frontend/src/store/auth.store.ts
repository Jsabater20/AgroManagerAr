import { create } from 'zustand';
import type { QueryClient } from '@tanstack/react-query';

let queryClientRef: QueryClient | null = null;

export const setQueryClientRef = (qc: QueryClient) => {
  queryClientRef = qc;
};

interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  plan: 'FREE' | 'PRO';
  rolGlobal?: string;
  usuarioOrganizacionId?: number;
  organizaciones?: Organizacion[];
}

interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  organizacionId: number | null;
  organizaciones: Organizacion[];
  isLoading: boolean;
  setAuth: (usuario: Usuario, token: string, organizacionId?: number) => void;
  setOrganizacionId: (id: number) => void;
  setOrganizaciones: (orgs: Organizacion[]) => void;
  setIsLoading: (v: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isPro: () => boolean;
}

const storedToken = localStorage.getItem('token');
const storedOrgId = localStorage.getItem('organizacionId');

export const useAuthStore = create<AuthState>((set, get) => ({
  usuario: null,
  token: storedToken || null,
  organizacionId: storedOrgId ? parseInt(storedOrgId) : null,
  organizaciones: [],
  isLoading: true,

  setAuth: (usuario, token, organizacionId) => {
    const orgId = organizacionId || usuario.organizaciones?.[0]?.id || 1;
    localStorage.setItem('token', token);
    localStorage.setItem('organizacionId', String(orgId));
    set({
      usuario,
      token,
      organizacionId: orgId,
      organizaciones: usuario.organizaciones || [],
      isLoading: false,
    });
  },

  setOrganizacionId: (id) => {
    localStorage.setItem('organizacionId', String(id));
    set({ organizacionId: id });
  },

  setOrganizaciones: (orgs) => {
    set({ organizaciones: orgs });
  },

  setIsLoading: (v) => {
    set({ isLoading: v });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('organizacionId');
    set({
      usuario: null,
      token: null,
      organizacionId: null,
      organizaciones: [],
      isLoading: false,
    });
    if (queryClientRef) {
      queryClientRef.clear();
    }
  },

  isAuthenticated: () => !!get().token && !!get().usuario,
  isPro: () => get().usuario?.plan === 'PRO',
}));