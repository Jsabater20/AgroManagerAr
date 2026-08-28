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
}

export interface CreateAnimalInput {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
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

export const CATEGORIAS_POR_ESPECIE: Record<Especie, { hembra: CategoriaAnimal[]; macho: CategoriaAnimal[] }> = {
  BOVINO: { hembra: ['VACA', 'VAQUILLONA', 'TERNERA'], macho: ['TORO', 'NOVILLO', 'TERNERO'] },
  PORCINO: { hembra: ['CERDA', 'LECHON'], macho: ['VERRACO', 'LECHON'] },
  EQUINO: { hembra: ['YEGUA', 'POTRANCA'], macho: ['PADRILLO', 'POTRO'] },
  OVINO: { hembra: ['OVEJA', 'BORREGA'], macho: ['CARNERO', 'CORDERO'] },
  CAPRINO: { hembra: ['CABRA'], macho: ['CABRIO', 'CABRITO'] },
  AVIAR: { hembra: ['GALLINA', 'POLLA'], macho: ['GALLO', 'POLLO'] },
};
