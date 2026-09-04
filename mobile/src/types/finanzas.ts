export type TipoMovimiento = 'INGRESO' | 'EGRESO';
export type CategoriaMovimiento = 'COSECHA' | 'VENTA_ANIMAL' | 'INSUMO' | 'SERVICIO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'COMBUSTIBLE' | 'MANO_DE_OBRA' | 'OTRO';

export interface MovimientoFinanciero {
  id: number;
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  observaciones?: string | null;
  campo?: { id: number; nombre: string } | null;
}

export interface MovimientoInput {
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  observaciones?: string;
}

export interface ResumenFinanzas { ingresos: number; egresos: number; saldo: number; }

export const CATEGORIA_LABEL: Record<CategoriaMovimiento, string> = {
  COSECHA: 'Cosecha', VENTA_ANIMAL: 'Venta animal', INSUMO: 'Insumo', SERVICIO: 'Servicio', MANTENIMIENTO: 'Mantenimiento', VETERINARIA: 'Veterinaria', COMBUSTIBLE: 'Combustible', MANO_DE_OBRA: 'Mano de obra', OTRO: 'Otro',
};
export const INGRESO_CATEGORIAS: CategoriaMovimiento[] = ['COSECHA', 'VENTA_ANIMAL', 'OTRO'];
export const EGRESO_CATEGORIAS: CategoriaMovimiento[] = ['INSUMO', 'SERVICIO', 'MANTENIMIENTO', 'VETERINARIA', 'COMBUSTIBLE', 'MANO_DE_OBRA', 'OTRO'];
