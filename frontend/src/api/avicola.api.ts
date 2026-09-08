import { api } from './client';

export type TipoGalponAvicola = 'POSTURA' | 'ENGORDE' | 'RECRIA' | 'OTRO';

export interface RegistroAvicolaDiario {
  id: number;
  fecha: string;
  avesPresentes: number;
  huevos: number;
  mortandad: number;
  alimentoKg: number;
  pesoPromedioGr?: number | null;
  observaciones?: string | null;
}

export interface GalponAvicola {
  id: number;
  nombre: string;
  tipo: TipoGalponAvicola;
  capacidad?: number | null;
  activo: boolean;
  observaciones?: string | null;
  registros: RegistroAvicolaDiario[];
}

export interface ResumenAvicola {
  huevosHoy: number;
  huevosMes: number;
  mortandadMes: number;
  galponesActivos: number;
}

export interface CreateGalponAvicolaDto {
  nombre: string;
  tipo: TipoGalponAvicola;
  capacidad?: number;
  observaciones?: string;
}

export interface CreateRegistroAvicolaDto {
  fecha: string;
  avesPresentes: number;
  huevos?: number;
  mortandad?: number;
  alimentoKg?: number;
  pesoPromedioGr?: number;
  observaciones?: string;
}

export const avicolaApi = {
  getAll: () => api.get<GalponAvicola[]>('/avicola').then((response) => response.data),
  getResumen: () => api.get<ResumenAvicola>('/avicola/resumen').then((response) => response.data),
  createGalpon: (dto: CreateGalponAvicolaDto) => api.post<GalponAvicola>('/avicola/galpones', dto).then((response) => response.data),
  createRegistro: (galponId: number, dto: CreateRegistroAvicolaDto) => api.post<RegistroAvicolaDiario>('/avicola/galpones/' + galponId + '/registros', dto).then((response) => response.data),
  removeRegistro: (id: number) => api.delete('/avicola/registros/' + id).then((response) => response.data),
};
