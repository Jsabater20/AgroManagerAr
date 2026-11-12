export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'OVINO' | 'CAPRINO' | 'AVIAR';
export type Sexo = 'MACHO' | 'HEMBRA';
export type CategoriaAnimal =
  | 'VACA' | 'VAQUILLONA' | 'TERNERA' | 'TORO' | 'NOVILLO' | 'TERNERO'
  | 'CERDA' | 'VERRACO' | 'LECHON'
  | 'YEGUA' | 'POTRANCA' | 'PADRILLO' | 'POTRO'
  | 'OVEJA' | 'BORREGA' | 'CARNERO' | 'CORDERO'
  | 'CABRA' | 'CABRIO' | 'CABRITO'
  | 'GALLINA' | 'GALLO' | 'POLLO' | 'POLLA';
export type EstadoPrenez = 'EN_CURSO' | 'COMPLETADA' | 'PERDIDA';
export type SistemaLoteGanadero = 'CRIA_PROPIA' | 'INVERNADA_COMPRADA' | 'FEEDLOT';
export type EstadoLoteGanadero = 'ACTIVO' | 'CERRADO';

export interface Prenez {
  id: number;
  animalId: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  estado: EstadoPrenez;
  observaciones?: string | null;
}

export interface RegistroPeso {
  id: number;
  animalId: number;
  peso: number;
  fecha: string;
  observaciones?: string | null;
}

export interface Animal {
  id: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number | null;
  fechaNacimiento?: string | null;
  observaciones?: string | null;
  preneces: Prenez[];
  loteGanaderoId?: number | null;
}

export interface CreateAnimalInput {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  loteGanaderoId?: number;
}

export interface RegistroLoteGanadero {
  id: number;
  loteGanaderoId: number;
  fecha: string;
  cantidadActual: number;
  pesoPromedioKg?: number | null;
  alimentoKg: number;
  bajas: number;
  observaciones?: string | null;
  createdAt: string;
}

export interface LoteGanadero {
  id: number;
  nombre: string;
  sistema: SistemaLoteGanadero;
  estado: EstadoLoteGanadero;
  ubicacion?: string | null;
  cantidadInicial: number;
  cantidadActual: number;
  fechaIngreso: string;
  pesoPromedioIngresoKg?: number | null;
  pesoPromedioActualKg?: number | null;
  costoCompraTotal?: number | null;
  fechaEgreso?: string | null;
  precioVentaTotal?: number | null;
  observaciones?: string | null;
  registros: RegistroLoteGanadero[];
  _count?: { animales: number };
}

export interface CreateLoteGanaderoInput {
  nombre: string;
  sistema: SistemaLoteGanadero;
  cantidadInicial: number;
  fechaIngreso: string;
  pesoPromedioIngresoKg?: number;
  costoCompraTotal?: number;
  ubicacion?: string;
  observaciones?: string;
}

export interface CreateRegistroLoteGanaderoInput {
  fecha: string;
  cantidadActual: number;
  pesoPromedioKg?: number;
  alimentoKg?: number;
  bajas?: number;
  observaciones?: string;
}

export interface CerrarLoteGanaderoInput {
  fechaEgreso: string;
  precioVentaTotal?: number;
}

export interface CreatePrenezInput {
  fechaInicio: string;
  observaciones?: string;
}

export interface CreatePesoInput {
  peso: number;
  fecha: string;
  observaciones?: string;
}

export const ESPECIES: Especie[] = ['BOVINO', 'PORCINO', 'EQUINO', 'OVINO', 'CAPRINO', 'AVIAR'];

export const ESPECIE_LABELS: Record<Especie, string> = {
  BOVINO: 'Bovino',
  PORCINO: 'Porcino',
  EQUINO: 'Equino',
  OVINO: 'Ovino',
  CAPRINO: 'Caprino',
  AVIAR: 'Aviar',
};

export const CATEGORIA_LABELS: Record<CategoriaAnimal, string> = {
  VACA: 'Vaca', VAQUILLONA: 'Vaquillona', TERNERA: 'Ternera', TORO: 'Toro', NOVILLO: 'Novillo', TERNERO: 'Ternero',
  CERDA: 'Cerda', VERRACO: 'Verraco', LECHON: 'Lechón',
  YEGUA: 'Yegua', POTRANCA: 'Potranca', PADRILLO: 'Padrillo', POTRO: 'Potro',
  OVEJA: 'Oveja', BORREGA: 'Borrega', CARNERO: 'Carnero', CORDERO: 'Cordero',
  CABRA: 'Cabra', CABRIO: 'Cabrío', CABRITO: 'Cabrito',
  GALLINA: 'Gallina', GALLO: 'Gallo', POLLO: 'Pollo', POLLA: 'Polla',
};

export const GESTATION_DAYS: Record<Especie, number> = {
  BOVINO: 283, PORCINO: 114, EQUINO: 340, OVINO: 147, CAPRINO: 150, AVIAR: 21,
};

export const SISTEMA_LOTE_GANADERO_LABELS: Record<SistemaLoteGanadero, string> = {
  CRIA_PROPIA: 'Cría propia',
  INVERNADA_COMPRADA: 'Invernada comprada',
  FEEDLOT: 'Feedlot',
};

export const SISTEMAS_LOTE_GANADERO: SistemaLoteGanadero[] = [
  'CRIA_PROPIA',
  'INVERNADA_COMPRADA',
  'FEEDLOT',
];

export const CATEGORIAS_POR_ESPECIE: Record<Especie, { hembra: CategoriaAnimal[]; macho: CategoriaAnimal[] }> = {
  BOVINO: { hembra: ['VACA', 'VAQUILLONA', 'TERNERA'], macho: ['TORO', 'NOVILLO', 'TERNERO'] },
  PORCINO: { hembra: ['CERDA', 'LECHON'], macho: ['VERRACO', 'LECHON'] },
  EQUINO: { hembra: ['YEGUA', 'POTRANCA'], macho: ['PADRILLO', 'POTRO'] },
  OVINO: { hembra: ['OVEJA', 'BORREGA'], macho: ['CARNERO', 'CORDERO'] },
  CAPRINO: { hembra: ['CABRA'], macho: ['CABRIO', 'CABRITO'] },
  AVIAR: { hembra: ['GALLINA', 'POLLA'], macho: ['GALLO', 'POLLO'] },
};
