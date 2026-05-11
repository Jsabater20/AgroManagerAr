// ─── Campos ───────────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  usuarioId: number;
  createdAt: string;
  lotes: Lote[];
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Siembras ─────────────────────────────────────────────────────────────────

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  estado: EstadoSiembra;
  lote: Lote & { campo: Campo };
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones: AplicacionInsumo[];
}

// ─── Insumos ──────────────────────────────────────────────────────────────────

export type TipoInsumo =
  | 'FERTILIZANTE'
  | 'HERBICIDA'
  | 'FUNGICIDA'
  | 'INSECTICIDA'
  | 'SEMILLA'
  | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface Cosecha {
  id: number;
  siembraId: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CreateCosechaDto {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  insumo: Insumo;
}

export interface CreateAplicacionDto {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────────

export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'OVINO' | 'CAPRINO' | 'AVIAR';
export type Sexo = 'MACHO' | 'HEMBRA';
export type CategoriaAnimal =
  | 'VACA' | 'VAQUILLONA' | 'TERNERA'
  | 'TORO' | 'NOVILLO' | 'TERNERO'
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
  observaciones?: string;
  createdAt: string;
}

export interface Animal {
  id: number;
  usuarioId: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  createdAt: string;
  preneces: Prenez[];
}

export interface CreateAnimalDto {
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
}

export interface CreatePrenezDto {
  fechaInicio: string;
  observaciones?: string;
}

// ─── Tareas Rurales ───────────────────────────────────────────────────────────

export type TipoTarea =
  | 'SIEMBRA' | 'COSECHA' | 'FUMIGACION' | 'FERTILIZACION'
  | 'RIEGO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'OTRO';

export type EstadoTarea = 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export interface TareaRural {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  estado: EstadoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaCompletada?: string;
  campoId?: number;
  campo?: { id: number; nombre: string };
  observaciones?: string;
  createdAt: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  prioridad?: Prioridad;
  fechaProgramada: string;
  campoId?: number;
  observaciones?: string;
}

// ─── Finanzas ─────────────────────────────────────────────────────────────────

export type TipoMovimiento = 'INGRESO' | 'EGRESO';

export type CategoriaMovimiento =
  | 'COSECHA' | 'VENTA_ANIMAL' | 'INSUMO' | 'SERVICIO'
  | 'MANTENIMIENTO' | 'VETERINARIA' | 'COMBUSTIBLE' | 'MANO_DE_OBRA' | 'OTRO';

export interface MovimientoFinanciero {
  id: number;
  usuarioId: number;
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
  createdAt: string;
  campo?: { id: number; nombre: string };
}

export interface CreateMovimientoDto {
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
}

export interface ResumenFinanciero {
  ingresos: number;
  egresos: number;
  saldo: number;
}

// ─── Campañas ─────────────────────────────────────────────────────────────────

export interface Campania {
  id: number;
  usuarioId: number;
  nombre: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion?: string;
  createdAt: string;
  siembras: Siembra[];
}

export interface CreateCampaniaDto {
  nombre: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion?: string;
}

// ─── Historial de pesos ───────────────────────────────────────────────────────

export interface RegistroPeso {
  id: number;
  animalId: number;
  peso: number;
  fecha: string;
  observaciones?: string;
  createdAt: string;
}

export interface CreateRegistroPesoDto {
  peso: number;
  fecha: string;
  observaciones?: string;
}
