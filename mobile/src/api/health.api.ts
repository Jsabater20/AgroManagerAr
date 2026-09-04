import { api } from './client';

export interface HealthResponse {
  status: 'ok';
}

export const getApiHealth = () =>
  api.get<HealthResponse>('/health').then((response) => response.data);
