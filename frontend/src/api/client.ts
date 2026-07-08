import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de request: adjunta el JWT y organizacionId si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const organizacionId = localStorage.getItem('organizacionId');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Si hay organizacionId, pasarlo como query param (excepto en endpoints de auth y organizaciones)
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

// Interceptor de response: si el token expiró, redirige al login
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('organizacionId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);