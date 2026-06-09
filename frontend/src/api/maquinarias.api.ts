import { api } from './client';
import type {
  CreateGastoDto,
  CreateMaquinariaDto,
  CreateMantenimientoDto,
  GastoMaquinaria,
  Maquinaria,
  MantenimientoMaquinaria,
} from './types';

export const maquinariasApi = {
  getAll: (): Promise<Maquinaria[]> =>
    api.get('/maquinarias').then((r) => r.data),

  getOne: (id: number): Promise<Maquinaria> =>
    api.get(`/maquinarias/${id}`).then((r) => r.data),

  create: (dto: CreateMaquinariaDto): Promise<Maquinaria> =>
    api.post('/maquinarias', dto).then((r) => r.data),

  update: (id: number, dto: Partial<CreateMaquinariaDto>): Promise<Maquinaria> =>
    api.patch(`/maquinarias/${id}`, dto).then((r) => r.data),

  remove: (id: number): Promise<void> =>
    api.delete(`/maquinarias/${id}`).then((r) => r.data),

  addMantenimiento: (
    id: number,
    dto: CreateMantenimientoDto,
  ): Promise<MantenimientoMaquinaria> =>
    api.post(`/maquinarias/${id}/mantenimientos`, dto).then((r) => r.data),

  removeMantenimiento: (id: number, mantenimientoId: number): Promise<void> =>
    api
      .delete(`/maquinarias/${id}/mantenimientos/${mantenimientoId}`)
      .then((r) => r.data),

  addGasto: (id: number, dto: CreateGastoDto): Promise<GastoMaquinaria> =>
    api.post(`/maquinarias/${id}/gastos`, dto).then((r) => r.data),

  removeGasto: (id: number, gastoId: number): Promise<void> =>
    api.delete(`/maquinarias/${id}/gastos/${gastoId}`).then((r) => r.data),
};
