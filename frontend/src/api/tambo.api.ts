import { api } from './client';

export type TurnoOrdene = 'MANANA' | 'TARDE' | 'UNICO';

export interface RegistroOrdene {
  id: number;
  fecha: string;
  turno: TurnoOrdene;
  litros: number;
  observaciones?: string | null;
  animal?: { id: number; nombre: string; categoria: string } | null;
  usuario: { id: number; nombre: string; apellido: string };
}

export interface ResumenTambo {
  litrosHoy: number;
  registrosHoy: number;
  litrosMes: number;
  registrosMes: number;
  vacasRegistradas: number;
}

export interface CreateRegistroOrdeneDto {
  fecha: string;
  turno: TurnoOrdene;
  litros: number;
  animalId?: number;
  observaciones?: string;
}

export const tamboApi = {
  getAll: () => api.get<RegistroOrdene[]>('/tambo').then((response) => response.data),
  getResumen: () => api.get<ResumenTambo>('/tambo/resumen').then((response) => response.data),
  create: (dto: CreateRegistroOrdeneDto) => api.post<RegistroOrdene>('/tambo', dto).then((response) => response.data),
  remove: (id: number) => api.delete('/tambo/' + id).then((response) => response.data),
};
