import { api } from './client';
import type { Animal, CreateAnimalDto, CreatePrenezDto, EstadoPrenez, RegistroPeso, CreateRegistroPesoDto } from './types';

export const ganadoApi = {
  getAll:   (): Promise<Animal[]> => api.get('/ganado').then(r => r.data),
  getOne:   (id: number): Promise<Animal> => api.get(`/ganado/${id}`).then(r => r.data),
  create:   (dto: CreateAnimalDto): Promise<Animal> => api.post('/ganado', dto).then(r => r.data),
  update:   (id: number, dto: Partial<CreateAnimalDto>): Promise<Animal> => api.patch(`/ganado/${id}`, dto).then(r => r.data),
  remove:   (id: number): Promise<void> => api.delete(`/ganado/${id}`).then(r => r.data),
  addPrenez: (id: number, dto: CreatePrenezDto): Promise<Animal> => api.post(`/ganado/${id}/preneces`, dto).then(r => r.data),
  updatePrenezEstado: (prenezId: number, estado: EstadoPrenez): Promise<Animal> =>
    api.patch(`/ganado/preneces/${prenezId}/estado`, { estado }).then(r => r.data),
  // Historial de pesos
  getPesos:  (id: number): Promise<RegistroPeso[]> => api.get(`/ganado/${id}/pesos`).then(r => r.data),
  addPeso:   (id: number, dto: CreateRegistroPesoDto): Promise<RegistroPeso> => api.post(`/ganado/${id}/pesos`, dto).then(r => r.data),
  removePeso: (pesoId: number): Promise<void> => api.delete(`/ganado/pesos/${pesoId}`).then(r => r.data),
};


