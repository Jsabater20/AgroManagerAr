import { api } from '@/api/client';
import type { CrearTipoCultivoInput, TipoCultivo } from '@/types/siembras';

export const getCultivos = async () => {
  const { data } = await api.get<TipoCultivo[]>('/cultivos');
  return data;
};

export const crearCultivo = async (input: CrearTipoCultivoInput) => {
  const { data } = await api.post<TipoCultivo>('/cultivos', input);
  return data;
};

export const eliminarCultivo = async (cultivoId: number) => {
  await api.delete(`/cultivos/${cultivoId}`);
};
