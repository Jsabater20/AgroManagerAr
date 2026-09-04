import axios from 'axios';

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (!axios.isAxiosError(error)) return fallback;

  if (!error.response) {
    return 'No pudimos conectar con AgroManager AR. Revisá tu conexión e intentá de nuevo.';
  }

  const message = error.response.data?.message;
  return Array.isArray(message) ? message[0] : message ?? fallback;
};
