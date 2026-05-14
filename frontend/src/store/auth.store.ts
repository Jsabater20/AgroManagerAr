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
  setAuth: (usuario: Usuario, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isPro: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  usuario: null,
  token: localStorage.getItem('token'),

  setAuth: (usuario, token) => {
    localStorage.setItem('token', token);
    set({ usuario, token });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ usuario: null, token: null });
  },

  isAuthenticated: () => !!get().token,
  isPro: () => get().usuario?.plan === 'PRO',
}));
