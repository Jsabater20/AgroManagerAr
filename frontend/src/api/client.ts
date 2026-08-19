import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../store/auth.store';

// 👇 DEBUG
console.log('====================================');
console.log('VITE_API_URL =', import.meta.env.VITE_API_URL);
console.log('MODE =', import.meta.env.MODE);
console.log('DEV =', import.meta.env.DEV);
console.log('PROD =', import.meta.env.PROD);
console.log('====================================');

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.agromanagerar.com/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { token, activeOrgId } = useAuthStore.getState();
  const organizacionId = activeOrgId();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (
    organizacionId &&
    !config.url?.includes('/auth/') &&
    !config.url?.includes('/users/') &&
    !config.url?.includes('/organizaciones')
  ) {
    config.params = config.params || {};
    config.params.organizacionId = organizacionId;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);