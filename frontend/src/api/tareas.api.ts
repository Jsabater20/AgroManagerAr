import { api } from './client';
import type { TareaRural, CreateTareaDto, EstadoTarea } from './types';

export const tareasApi = {
  getAll: (): Promise<TareaRural[]> =>
    api.get('/tareas').then((r) => r.data),

  getOne: (id: number): Promise<TareaRural> =>
    api.get(`/tareas/${id}`).then((r) => r.data),

  create: (dto: CreateTareaDto): Promise<TareaRural> =>
    api.post('/tareas', dto).then((r) => r.data),

  update: (id: number, dto: Partial<CreateTareaDto>): Promise<TareaRural> =>
    api.patch(`/tareas/${id}`, dto).then((r) => r.data),

  updateEstado: (id: number, estado: EstadoTarea): Promise<TareaRural> =>
    api.patch(`/tareas/${id}/estado`, { estado }).then((r) => r.data),

  remove: (id: number): Promise<void> =>
    api.delete(`/tareas/${id}`).then((r) => r.data),
};
