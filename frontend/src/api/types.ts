// ─── Organizaciones ───────────────────────────────────────────────────────

export interface Organizacion {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
}

export interface MiembroOrganizacion {
  id: number;
  usuarioId: number;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
  roles: string[];
  activo: boolean;
  campos: Array<{ id: number; nombre: string }>;
  modulos: Array<{ moduloNombre: string; activo: boolean }>;
}

export interface InvitacionOrganizacion {
  id: number;
  email: string;
  rol: string;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'EXPIRADA' | 'CANCELADA';
  mensaje?: string;
  fechaInvitacion: string;
  expiresAt: string;
  token: string;
}

export interface ActivityCountDto {
  pendientes: number;
  enProgreso: number;
  completadas: number;
}

export interface MiembroPanelDto {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaIncorporacion: string;
  actividades: ActivityCountDto;
  recursosCampos: string[];
  modulos: Array<{ moduloNombre: string; activo: boolean }>;
}

export interface RecursoAsignableDto {
  id: number;
  nombre: string;
  tipo: 'CAMPO' | 'CULTIVO' | 'SIEMBRA' | 'INSUMO' | 'GANADO' | 'TAREA' | 'MAQUINARIA';
  asignado: boolean;
}

// ─── Campos ───────────────────────────────────────────────────────────────

export interface Lote {
  id: number;
  nombre: string;
  hectareas: number;
  campoId: number;
}

export interface Campo {
  id: number;
  nombre: string;
  ubicacion?: string;
  hectareas: number;
  lotes?: Lote[];
  usuarioId: number;
  organizacionId?: number;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateCampoDto {
  nombre: string;
  hectareas: number;
  ubicacion?: string;
  propietario?: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateLoteDto {
  nombre: string;
  hectareas: number;
}

// ─── Cultivos ─────────────────────────────────────────────────────────────

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export interface Siembra {
  id: number;
  loteId: number;
  tipoCultivoId: number;
  tipoCultivo?: TipoCultivo;
  lote?: Lote & { campo: Campo };
  fechaSiembra: string;
  estado: EstadoSiembra;
  densidad?: number;
  observaciones?: string;
  cosechas?: Cosecha[];
  aplicaciones?: AplicacionInsumo[];
  campaniaId?: number;
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

export interface CreateSiembraDto {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
  campaniaId?: number;
}

export interface CreateCosechaDto {
  siembraId?: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

// ─── Insumos ──────────────────────────────────────────────────────────────

export type TipoInsumo = 'FERTILIZANTE' | 'HERBICIDA' | 'FUNGICIDA' | 'INSECTICIDA' | 'SEMILLA' | 'OTRO';

export interface Insumo {
  id: number;
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface AplicacionInsumo {
  id: number;
  siembraId: number;
  insumoId: number;
  insumo?: Insumo;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

export interface CreateInsumoDto {
  nombre: string;
  tipo: TipoInsumo;
  unidad: string;
  descripcion?: string;
}

export interface CreateAplicacionDto {
  siembraId?: number;
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

// ─── Ganadería ────────────────────────────────────────────────────────────

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

export interface Animal {
  id: number;
  nombre: string;
  especie: Especie;
  sexo: Sexo;
  categoria: CategoriaAnimal;
  peso?: number;
  fechaNacimiento?: string;
  observaciones?: string;
  preneces?: Prenez[];
  usuarioId: number;
  organizacionId?: number;
}

export interface Prenez {
  id: number;
  animalId: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  estado: EstadoPrenez;
  observaciones?: string;
}

export interface RegistroPeso {
  id: number;
  animalId: number;
  peso: number;
  fecha: string;
  observaciones?: string;
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
  animalId?: number;
  fechaInicio: string;
  fechaEstimadaParto: string;
  observaciones?: string;
}

export interface CreateRegistroPesoDto {
  animalId?: number;
  peso: number;
  fecha: string;
  observaciones?: string;
}

// ─── Tareas ───────────────────────────────────────────────────────────────

export type TipoTarea =
  | 'SIEMBRA' | 'COSECHA' | 'FUMIGACION' | 'FERTILIZACION'
  | 'RIEGO' | 'MANTENIMIENTO' | 'VETERINARIA' | 'OTRO';

export type EstadoTarea = 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
export type RepetirTarea = 'UNICA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';

export interface TareaRural {
  id: number;
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  estado: EstadoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  fechaCompletada?: string;
  repetir?: RepetirTarea;
  usuarioId: number;
  organizacionId?: number;
  campoId?: number;
  campo?: Campo;
  observaciones?: string;
}

export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  tipo: TipoTarea;
  prioridad: Prioridad;
  fechaProgramada: string;
  fechaLimite?: string;
  repetir?: RepetirTarea;
  campoId?: number;
  observaciones?: string;
}

// ─── Maquinarias ──────────────────────────────────────────────────────────

export type TipoMaquinaria =
  | 'TRACTOR' | 'SEMBRADORA' | 'PULVERIZADORA' | 'COSECHADORA'
  | 'CAMIONETA' | 'MIXER' | 'ACOPLADO' | 'TOLVA' | 'HERRAMIENTA' | 'OTRO';

export type EstadoMaquinaria = 'OPERATIVA' | 'EN_MANTENIMIENTO' | 'FUERA_DE_SERVICIO';
export type TipoMantenimiento = 'CAMBIO_ACEITE' | 'REVISION_GENERAL' | 'REPARACION' | 'OTRO';
export type TipoGastoMaq = 'COMBUSTIBLE' | 'REPARACION' | 'REPUESTO' | 'SERVICIO' | 'SEGURO' | 'OTRO';

export interface Maquinaria {
  id: number;
  nombre: string;
  tipo: TipoMaquinaria;
  marca?: string;
  modelo?: string;
  anio?: number;
  patente?: string;
  estado: EstadoMaquinaria;
  horasUso?: number;
  seguroVencimiento?: string;
  vtvVencimiento?: string;
  observaciones?: string;
  gastos?: GastoMaquinaria[];
  mantenimientos?: MantenimientoMaquinaria[];
  usuarioId: number;
  organizacionId?: number;
  campoId?: number;
}

export interface MantenimientoMaquinaria {
  id: number;
  maquinariaId: number;
  tipo: TipoMantenimiento;
  descripcion?: string;
  fecha: string;
  horasUso?: number;
  costo?: number;
  proximoMantenimiento?: string;
  observaciones?: string;
}

export interface GastoMaquinaria {
  id: number;
  maquinariaId: number;
  tipo: TipoGastoMaq;
  descripcion: string;
  monto: number;
  fecha: string;
  observaciones?: string;
}

export interface CreateMaquinariaDto {
  nombre: string;
  tipo: TipoMaquinaria;
  marca?: string;
  modelo?: string;
  anio?: number;
  patente?: string;
  estado?: EstadoMaquinaria;
  horasUso?: number;
  campoId?: number;
  seguroVencimiento?: string;
  vtvVencimiento?: string;
  observaciones?: string;
}

export interface CreateMantenimientoDto {
  maquinariaId?: number;
  tipo: TipoMantenimiento;
  descripcion?: string;
  fecha: string;
  horasUso?: number;
  costo?: number;
  proximoMantenimiento?: string;
  observaciones?: string;
}

export interface CreateGastoDto {
  maquinariaId?: number;
  tipo: TipoGastoMaq;
  descripcion: string;
  monto: number;
  fecha: string;
  observaciones?: string;
}

// ─── Finanzas ─────────────────────────────────────────────────────────────

export type TipoMovimiento = 'INGRESO' | 'EGRESO';
export type CategoriaMovimiento =
  | 'COSECHA' | 'VENTA_ANIMAL' | 'INSUMO' | 'SERVICIO'
  | 'MANTENIMIENTO' | 'VETERINARIA' | 'COMBUSTIBLE'
  | 'MANO_DE_OBRA' | 'OTRO';

export interface MovimientoFinanciero {
  id: number;
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: CategoriaMovimiento;
  campoId?: number;
  siembraId?: number;
  observaciones?: string;
  usuarioId: number;
  organizacionId?: number;
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
  totalIngresos: number;
  totalEgresos: number;
  saldo: number;
  porCategoriaIngreso: Record<string, number>;
  porCategoriaEgreso: Record<string, number>;
}

// ─── Campañas ─────────────────────────────────────────────────────────────

export interface Campania {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion?: string;
  usuarioId: number;
  organizacionId?: number;
  siembras?: Siembra[];
}

export interface CreateCampaniaDto {
  nombre: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion?: string;
}

// ─── Usuarios ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  rolGlobal?: string;
  plan: 'FREE' | 'PRO';
  planExpira?: string;
  createdAt: string;
}

// ─── Usuarios ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  rolGlobal?: string;
  plan: 'FREE' | 'PRO';
  planExpira?: string;
  createdAt: string;
}

// ─── Usuarios ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  rolGlobal?: string;
  plan: 'FREE' | 'PRO';
  planExpira?: string;
  createdAt: string;
}
