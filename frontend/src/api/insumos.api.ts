import { api } from './client';
import type { Insumo, CreateInsumoDto } from './types';

export const insumosApi = {
  getAll: () =>
    api.get<Insumo[]>('/insumos').then((r) => r.data),

  create: (dto: CreateInsumoDto) =>
    api.post<Insumo>('/insumos', dto).then((r) => r.data),

  update: (id: number, dto: Partial<CreateInsumoDto>) =>
    api.patch<Insumo>(`/insumos/${id}`, dto).then((r) => r.data),

  remove: (id: number) =>
    api.delete(`/insumos/${id}`),
};
