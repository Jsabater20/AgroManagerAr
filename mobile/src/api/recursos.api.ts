import { api } from '@/api/client';
import type { TipoRecursoActividad } from '@/api/actividades.api';

export interface RecursoActividad {
  id: number;
  nombre: string;
  descripcion?: string;
}

export const getRecursosPorTipo = async (
  tipo: Exclude<TipoRecursoActividad, 'GENERAL'>,
) => {
  const { data } = await api.get<RecursoActividad[]>(
    `/recursos/por-tipo?tipo=${encodeURIComponent(tipo)}`,
  );
  return data;
};
