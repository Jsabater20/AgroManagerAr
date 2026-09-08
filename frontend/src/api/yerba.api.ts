import { api } from './client';

export interface CosechaYerba { id: number; fechaCosecha: string; kgHojaVerde: number; kgCanchada?: number | null; jornales?: number | null; observaciones?: string | null; }
export interface CuadroYerba { id: number; campoId: number; loteId?: number | null; nombre: string; superficieHa?: number | null; edadPlantacion?: number | null; activo: boolean; observaciones?: string | null; campo: { id: number; nombre: string }; lote?: { id: number; nombre: string } | null; cosechas: CosechaYerba[]; }
export interface ResumenYerba { cuadrosActivos: number; cosechasAnuales: number; kgHojaVerde: number; kgCanchada: number; }
export interface CreateCuadroYerbaDto { campoId: number; loteId?: number; nombre: string; superficieHa?: number; edadPlantacion?: number; observaciones?: string; }
export interface CreateCosechaYerbaDto { fechaCosecha: string; kgHojaVerde: number; kgCanchada?: number; jornales?: number; observaciones?: string; }
export const yerbaApi = {
  getAll: () => api.get<CuadroYerba[]>('/yerba').then((response) => response.data),
  getResumen: () => api.get<ResumenYerba>('/yerba/resumen').then((response) => response.data),
  createCuadro: (dto: CreateCuadroYerbaDto) => api.post<CuadroYerba>('/yerba/cuadros', dto).then((response) => response.data),
  createCosecha: (cuadroId: number, dto: CreateCosechaYerbaDto) => api.post<CosechaYerba>('/yerba/cuadros/' + cuadroId + '/cosechas', dto).then((response) => response.data),
  removeCosecha: (id: number) => api.delete('/yerba/cosechas/' + id).then((response) => response.data),
};
