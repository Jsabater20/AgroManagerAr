import { api } from '@/api/client';
import type { Campo, CampoInput, LoteCampo, LoteInput } from '@/types/campos';

export const getCampos = async () => {
  const { data } = await api.get<Campo[]>('/campos');
  return data;
};

export const getCampo = async (campoId: number) => {
  const { data } = await api.get<Campo>(`/campos/${campoId}`);
  return data;
};

export const createCampo = async (input: CampoInput) => {
  const { data } = await api.post<Campo>('/campos', input);
  return data;
};

export const createLote = async (campoId: number, input: LoteInput) => {
  const { data } = await api.post<LoteCampo>(`/campos/${campoId}/lotes`, input);
  return data;
};
