import { api } from './client';

export const getOrganizaciones = () => api.get('/organizaciones');
export const getMiembros = (orgId: number) => api.get(`/organizaciones/${orgId}/miembros`);