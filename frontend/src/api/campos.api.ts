import { api } from './client';
import type { Campo, CreateCampoDto, CreateLoteDto } from './types';

export const camposApi = {
  getAll: () =>
    api.get<Campo[]>('/campos').then((r) => r.data),

  getOne: (id: number) =>
    api.get<Campo>(`/campos/${id}`).then((r) => r.data),

  create: (dto: CreateCampoDto) =>
    api.post<Campo>('/campos', dto).then((r) => r.data),

  update: (id: number, dto: Partial<CreateCampoDto>) =>
    api.patch<Campo>(`/campos/${id}`, dto).then((r) => r.data),

  remove: (id: number) =>
    api.delete(`/campos/${id}`),

  addLote: (campoId: number, dto: CreateLoteDto) =>
    api.post(`/campos/${campoId}/lotes`, dto).then((r) => r.data),
};
