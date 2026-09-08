import { api } from './client';

export type SistemaFrutihorticola =
  | 'CAMPO_ABIERTO'
  | 'INVERNADERO'
  | 'HUERTA'
  | 'MONTE_FRUTAL'
  | 'OTRO';

export type EstadoCultivoFrutihorticola =
  | 'PLANIFICADO'
  | 'EN_CURSO'
  | 'FINALIZADO'
  | 'PERDIDO';

export interface CosechaFrutihorticola {
  id: number;
  fechaCosecha: string;
  kgPrimera: number;
  kgSegunda: number;
  kgDescarte: number;
  destino?: string | null;
  observaciones?: string | null;
}

export interface CultivoFrutihorticola {
  id: number;
  campoId: number;
  loteId?: number | null;
  nombre: string;
  especie: string;
  variedad?: string | null;
  sistema: SistemaFrutihorticola;
  fechaInicio: string;
  fechaEstimadaCosecha?: string | null;
  estado: EstadoCultivoFrutihorticola;
  superficieM2?: number | null;
  cantidadPlantas?: number | null;
  observaciones?: string | null;
  campo: { id: number; nombre: string };
  lote?: { id: number; nombre: string } | null;
  cosechas: CosechaFrutihorticola[];
}

export interface CreateCultivoFrutihorticolaDto {
  campoId: number;
  loteId?: number;
  nombre: string;
  especie: string;
  variedad?: string;
  sistema: SistemaFrutihorticola;
  fechaInicio: string;
  fechaEstimadaCosecha?: string;
  superficieM2?: number;
  cantidadPlantas?: number;
  observaciones?: string;
}

export interface CreateCosechaFrutihorticolaDto {
  fechaCosecha: string;
  kgPrimera?: number;
  kgSegunda?: number;
  kgDescarte?: number;
  destino?: string;
  observaciones?: string;
}

export const frutihorticulturaApi = {
  getAll: () =>
    api.get<CultivoFrutihorticola[]>('/frutihorticultura').then((response) => response.data),
  create: (dto: CreateCultivoFrutihorticolaDto) =>
    api.post<CultivoFrutihorticola>('/frutihorticultura', dto).then((response) => response.data),
  update: (id: number, dto: Partial<CreateCultivoFrutihorticolaDto> & { estado?: EstadoCultivoFrutihorticola }) =>
    api.patch<CultivoFrutihorticola>('/frutihorticultura/' + id, dto).then((response) => response.data),
  addCosecha: (id: number, dto: CreateCosechaFrutihorticolaDto) =>
    api.post<CosechaFrutihorticola>('/frutihorticultura/' + id + '/cosechas', dto).then((response) => response.data),
};
