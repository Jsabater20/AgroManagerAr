import { api } from './client';
import type { TipoCultivo } from './types';

export const cultivosApi = {
  getAll: () =>
    api.get<TipoCultivo[]>('/cultivos').then((r) => r.data),

  create: (data: { nombre: string; descripcion?: string }) =>
    api.post<TipoCultivo>('/cultivos', data).then((r) => r.data),

  remove: (id: number) =>
    api.delete(`/cultivos/${id}`),
};
