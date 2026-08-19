import { useQuery } from '@tanstack/react-query';
import { recursosApi } from '../api/recursos.api';

type TipoRecurso = 'CAMPO' | 'TAREA' | 'CULTIVO' | 'MAQUINARIA' | 'GANADO';

export interface Recurso {
  id: number;
  nombre: string;
  descripcion?: string;
  [key: string]: any;
}

/**
 * Hook que carga dinámicamente los recursos según el tipo
 * Carga automáticamente cuando recursoSeleccionado cambia
 *
 * @param recursoSeleccionado - Tipo de recurso ('CAMPO', 'TAREA', etc.)
 * @returns { recursos, isLoading, error }
 *
 * @example
 * const { recursos, isLoading } = useRecursosDinamicos('CAMPO');
 * if (isLoading) return <Spinner />;
 * return (
 *   <select>
 *     {recursos.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
 *   </select>
 * );
 */
export function useRecursosDinamicos(recursoSeleccionado: TipoRecurso | '') {
  const { data, isLoading, error } = useQuery<Recurso[]>({
    queryKey: ['recursos', recursoSeleccionado],
    queryFn: () =>
      recursosApi.obtenerPorTipo(recursoSeleccionado as TipoRecurso),
    enabled: !!recursoSeleccionado, // Solo ejecuta si hay tipo seleccionado
    staleTime: 5 * 60 * 1000, // Cache 5 minutos (recursos no cambian frecuentemente)
    gcTime: 10 * 60 * 1000, // Garbage collect después de 10 minutos
  });

  return { recursos: data || [], isLoading, error };
}
