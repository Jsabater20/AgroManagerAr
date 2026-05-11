import { api } from './client';
import type { Campania, CreateCampaniaDto } from './types';

export const campaniasApi = {
  getAll:  (): Promise<Campania[]> => api.get('/campanias').then(r => r.data),
  getOne:  (id: number): Promise<Campania> => api.get(`/campanias/${id}`).then(r => r.data),
  create:  (dto: CreateCampaniaDto): Promise<Campania> => api.post('/campanias', dto).then(r => r.data),
  update:  (id: number, dto: Partial<CreateCampaniaDto>): Promise<Campania> => api.patch(`/campanias/${id}`, dto).then(r => r.data),
  remove:  (id: number): Promise<void> => api.delete(`/campanias/${id}`).then(r => r.data),
  asignarSiembras: (id: number, siembraIds: number[]): Promise<Campania> =>
    api.patch(`/campanias/${id}/siembras`, { siembraIds }).then(r => r.data),
};
