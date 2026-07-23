import { api } from './client';

export const recursosApi = {
  /**
   * Obtiene recursos de un tipo específico para la organización actual
   *
   * @param tipo - Tipo de recurso: 'CAMPO' | 'TAREA' | 'CULTIVO' | 'MAQUINARIA' | 'GANADO'
   * @returns Promise con array de recursos
   *
   * @example
   * const campos = await recursosApi.obtenerPorTipo('CAMPO');
   * // [{ id: 1, nombre: 'Campo Norte', descripcion: '45 hectáreas' }, ...]
   */
  obtenerPorTipo: (
    tipo: 'CAMPO' | 'TAREA' | 'CULTIVO' | 'MAQUINARIA' | 'GANADO',
  ) => api.get(`/recursos/por-tipo?tipo=${tipo}`).then((r) => r.data),
};
