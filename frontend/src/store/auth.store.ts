import { create } from 'zustand';

interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: string;
  plan: 'FREE' | 'PRO';
}

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  hydrating: boolean;
  setAuth: (usuario: Usuario, token: string) => void;
  setHydrating: (v: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isPro: () => boolean;
}

const storedToken = localStorage.getItem('token');

export const useAuthStore = create<AuthState>((set, get) => ({
  usuario: null,
  token: storedToken,
  hydrating: !!storedToken,

  setAuth: (usuario, token) => {
    localStorage.setItem('token', token);
    set({ usuario, token, hydrating: false });
  },

  setHydrating: (v: boolean) => set({ hydrating: v }),

  logout: () => {
    localStorage.removeItem('token');
    set({ usuario: null, token: null, hydrating: false });
  },

  isAuthenticated: () => !!get().token,
  isPro: () => get().usuario?.plan === 'PRO',
}));
