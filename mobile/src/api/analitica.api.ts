import { api } from '@/api/client';
import type { AnaliticaRentabilidad } from '@/types/analitica';

export const getRentabilidad = async () => {
  const { data } = await api.get<AnaliticaRentabilidad>('/analitica/rentabilidad');
  return data;
};
