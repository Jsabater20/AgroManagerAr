import { create } from 'zustand';
import type { QueryClient } from '@tanstack/react-query';

// Global queryClient reference for invalidating queries on org change
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
  hydrating: boolean;
  setAuth: (usuario: Usuario, token: string, organizacionId?: number) => void;
  setOrganizacionId: (id: number) => void;
  setOrganizaciones: (orgs: Organizacion[]) => void;
  setHydrating: (v: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isPro: () => boolean;
}

const storedToken = localStorage.getItem('token');
const storedOrgId = localStorage.getItem('organizacionId');

export const useAuthStore = create<AuthState>((set, get) => ({
  usuario: null,
  token: storedToken,
  organizacionId: storedOrgId ? parseInt(storedOrgId) : null,
  organizaciones: [],
  hydrating: !!storedToken,

  setAuth: (usuario, token, organizacionId) => {
    // Si no viene organizacionId, intentar extraerlo del token JWT
    if (!organizacionId) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        organizacionId = decoded.organizacionId;
      } catch (e) {
        organizacionId = undefined;
      }
    }
    localStorage.setItem('token', token);
    if (organizacionId) {
      localStorage.setItem('organizacionId', organizacionId.toString());
    }
    set({ usuario, token, organizacionId, hydrating: false });
  },

  setOrganizacionId: (id) => {
    localStorage.setItem('organizacionId', id.toString());
    // Invalidar todas las queries cuando cambia de org
    if (queryClientRef) {
      queryClientRef.invalidateQueries();
    }
    set({ organizacionId: id });
  },

  setOrganizaciones: (orgs) => {
    set({ organizaciones: orgs });
  },

  setHydrating: (v: boolean) => set({ hydrating: v }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('organizacionId');
    set({ usuario: null, token: null, organizacionId: null, organizaciones: [], hydrating: false });
  },

  isAuthenticated: () => !!get().token,
  isPro: () => get().usuario?.plan === 'PRO',
}));