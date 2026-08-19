import { api } from './client';

export interface CampoFilters {
  usuarioOrganizacionId?: number | null;
}

const getAll = async (filters?: CampoFilters) => {
  const params = new URLSearchParams();
  
  if (filters?.usuarioOrganizacionId) {
    params.append('usuarioOrganizacionId', filters.usuarioOrganizacionId.toString());
  }

  const { data } = await api.get('/campos', { params });
  return data;
};

const getOne = async (id: number) => {
  const { data } = await api.get(`/campos/${id}`);
  return data;
};

const create = async (payload: any) => {
  const { data } = await api.post('/campos', payload);
  return data;
};

const update = async (id: number, payload: any) => {
  const { data } = await api.patch(`/campos/${id}`, payload);
  return data;
};

const remove = async (id: number) => {
  const { data } = await api.delete(`/campos/${id}`);
  return data;
};

const addLote = async (campoId: number, payload: any) => {
  const { data } = await api.post(`/campos/${campoId}/lotes`, payload);
  return data;
};

export const camposApi = {
  getAll,
  getOne,
  create,
  update,
  remove,
  addLote,
};