import { api } from '@/api/client';
import type { Insumo, InsumoInput } from '@/types/insumos';

export const getInsumos = async () => {
  const { data } = await api.get<Insumo[]>('/insumos');
  return data;
};

export const getInsumo = async (insumoId: number) => {
  const { data } = await api.get<Insumo>(`/insumos/${insumoId}`);
  return data;
};

export const crearInsumo = async (input: InsumoInput) => {
  const { data } = await api.post<Insumo>('/insumos', input);
  return data;
};

export const actualizarInsumo = async (insumoId: number, input: Partial<InsumoInput>) => {
  const { data } = await api.patch<Insumo>(`/insumos/${insumoId}`, input);
  return data;
};

export const eliminarInsumo = async (insumoId: number) => {
  await api.delete(`/insumos/${insumoId}`);
};
