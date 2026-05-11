import { api } from './client';
import type { MovimientoFinanciero, CreateMovimientoDto, ResumenFinanciero } from './types';

export const finanzasApi = {
  getAll:   (): Promise<MovimientoFinanciero[]> => api.get('/finanzas').then(r => r.data),
  getOne:   (id: number): Promise<MovimientoFinanciero> => api.get(`/finanzas/${id}`).then(r => r.data),
  resumen:  (): Promise<ResumenFinanciero> => api.get('/finanzas/resumen').then(r => r.data),
  create:   (dto: CreateMovimientoDto): Promise<MovimientoFinanciero> => api.post('/finanzas', dto).then(r => r.data),
  update:   (id: number, dto: Partial<CreateMovimientoDto>): Promise<MovimientoFinanciero> => api.patch(`/finanzas/${id}`, dto).then(r => r.data),
  remove:   (id: number): Promise<void> => api.delete(`/finanzas/${id}`).then(r => r.data),
};
