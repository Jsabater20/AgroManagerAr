import { api } from './client';
import type { Siembra, CreateSiembraDto, EstadoSiembra, Cosecha, CreateCosechaDto, AplicacionInsumo, CreateAplicacionDto } from './types';

export const siembrasApi = {
  getAll: () =>
    api.get<Siembra[]>('/siembras').then((r) => r.data),

  getOne: (id: number) =>
    api.get<Siembra>(`/siembras/${id}`).then((r) => r.data),

  create: (dto: CreateSiembraDto) =>
    api.post<Siembra>('/siembras', dto).then((r) => r.data),

  updateEstado: (id: number, estado: EstadoSiembra) =>
    api.patch<Siembra>(`/siembras/${id}`, { estado }).then((r) => r.data),

  remove: (id: number) =>
    api.delete(`/siembras/${id}`),

  addCosecha: (siembraId: number, dto: CreateCosechaDto) =>
    api.post<Cosecha>(`/siembras/${siembraId}/cosechas`, dto).then((r) => r.data),

  addAplicacion: (siembraId: number, dto: CreateAplicacionDto) =>
    api.post<AplicacionInsumo>(`/siembras/${siembraId}/aplicaciones`, dto).then((r) => r.data),
};
