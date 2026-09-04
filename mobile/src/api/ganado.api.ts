import { api } from '@/api/client';
import type {
  Animal,
  CreateAnimalInput,
  CreatePesoInput,
  CreatePrenezInput,
  EstadoPrenez,
  RegistroPeso,
} from '@/types/ganado';

export const getAnimales = async () => {
  const { data } = await api.get<Animal[]>('/ganado');
  return data;
};

export const getAnimal = async (animalId: number) => {
  const { data } = await api.get<Animal>(`/ganado/${animalId}`);
  return data;
};

export const crearAnimal = async (input: CreateAnimalInput) => {
  const { data } = await api.post<Animal>('/ganado', input);
  return data;
};

export const actualizarAnimal = async (animalId: number, input: Partial<CreateAnimalInput>) => {
  const { data } = await api.patch<Animal>(`/ganado/${animalId}`, input);
  return data;
};

export const eliminarAnimal = async (animalId: number) => {
  await api.delete(`/ganado/${animalId}`);
};

export const crearPrenez = async (animalId: number, input: CreatePrenezInput) => {
  const { data } = await api.post(`/ganado/${animalId}/preneces`, input);
  return data;
};

export const actualizarEstadoPrenez = async (prenezId: number, estado: EstadoPrenez) => {
  const { data } = await api.patch(`/ganado/preneces/${prenezId}/estado`, { estado });
  return data;
};

export const getPesos = async (animalId: number) => {
  const { data } = await api.get<RegistroPeso[]>(`/ganado/${animalId}/pesos`);
  return data;
};

export const crearPeso = async (animalId: number, input: CreatePesoInput) => {
  const { data } = await api.post<RegistroPeso>(`/ganado/${animalId}/pesos`, input);
  return data;
};

export const eliminarPeso = async (pesoId: number) => {
  await api.delete(`/ganado/pesos/${pesoId}`);
};
