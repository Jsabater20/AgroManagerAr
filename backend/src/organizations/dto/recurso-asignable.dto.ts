export class RecursoAsignableDto {
  id: number;
  nombre: string;
  tipo: 'CAMPO' | 'CULTIVO' | 'SIEMBRA' | 'INSUMO' | 'GANADO' | 'TAREA' | 'MAQUINARIA';
  asignado: boolean;
}
