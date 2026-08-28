export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export const TIPO_INSUMO_LABEL: Record<TipoInsumo, string> = {
  FERTILIZANTE: 'Fertilizante',
  HERBICIDA: 'Herbicida',
  FUNGICIDA: 'Fungicida',
  INSECTICIDA: 'Insecticida',
  SEMILLA: 'Semilla',
  OTRO: 'Otro',
};

export const TIPOS_INSUMO: TipoInsumo[] = [
  'FERTILIZANTE',
  'HERBICIDA',
  'FUNGICIDA',
  'INSECTICIDA',
  'SEMILLA',
  'OTRO',
];

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string | null;
}

export interface InsumoInput {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}
