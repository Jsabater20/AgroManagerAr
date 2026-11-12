import { api } from '@/api/client';
import type {
  Animal,
  CerrarLoteGanaderoInput,
  CreateAnimalInput,
  CreateLoteGanaderoInput,
  CreatePesoInput,
  CreatePrenezInput,
  CreateRegistroLoteGanaderoInput,
  EstadoPrenez,
  LoteGanadero,
  RegistroLoteGanadero,
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

export const getLotesGanaderos = async () => {
  const { data } = await api.get<LoteGanadero[]>('/ganado/lotes');
  return data;
};

export const crearLoteGanadero = async (input: CreateLoteGanaderoInput) => {
  const { data } = await api.post<LoteGanadero>('/ganado/lotes', input);
  return data;
};

export const crearRegistroLoteGanadero = async (loteId: number, input: CreateRegistroLoteGanaderoInput) => {
  const { data } = await api.post<RegistroLoteGanadero>(`/ganado/lotes/${loteId}/registros`, input);
  return data;
};

export const cerrarLoteGanadero = async (loteId: number, input: CerrarLoteGanaderoInput) => {
  const { data } = await api.patch<LoteGanadero>(`/ganado/lotes/${loteId}/cerrar`, input);
  return data;
};

export const eliminarLoteGanadero = async (loteId: number) => {
  await api.delete(`/ganado/lotes/${loteId}`);
};
