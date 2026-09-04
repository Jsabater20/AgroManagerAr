import axios from 'axios';
import { API_URL } from '@/config/env';
import { useAuthStore } from '@/store/auth.store';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const { token, organizacionActivaId } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const isAuthenticationRequest = config.url?.startsWith('/auth/');
  const isUserRequest = config.url?.startsWith('/users/');
  const isOrganizationRequest = config.url?.startsWith('/organizaciones');
  if (organizacionActivaId && !isAuthenticationRequest && !isUserRequest && !isOrganizationRequest) {
    config.params = { ...config.params, organizacionId: organizacionActivaId };
    config.headers['X-Organization-Id'] = String(organizacionActivaId);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && useAuthStore.getState().token) {
      void useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
