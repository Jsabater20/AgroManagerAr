import { api } from '@/api/client';
import type { Membresia } from '@/types/auth';

export const getCurrentMembership = async (organizacionId: number) => {
  const { data } = await api.get<Membresia>(
    `/organizaciones/${organizacionId}/miembros/actual`,
  );

  return data;
};
