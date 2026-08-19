import { api } from './client';

export const recursosApi = {
  /**
   * Obtiene recursos de un tipo específico para la organización actual
   *
   * @param tipo - Tipo de recurso vinculado a una actividad
   * @returns Promise con array de recursos
   *
   * @example
   * const campos = await recursosApi.obtenerPorTipo('CAMPO');
   * // [{ id: 1, nombre: 'Campo Norte', descripcion: '45 hectáreas' }, ...]
   */
  obtenerPorTipo: (
    tipo: 'CAMPO' | 'LOTE' | 'SIEMBRA' | 'ANIMAL' | 'GANADO' | 'TAREA' | 'MAQUINARIA' | 'CAMPANIA' | 'CULTIVO',
  ) => api.get(`/recursos/por-tipo?tipo=${tipo}`).then((r) => r.data),
};
