export type TipoMaquinaria =
  | 'TRACTOR' | 'SEMBRADORA' | 'PULVERIZADORA' | 'COSECHADORA'
  | 'CAMIONETA' | 'MIXER' | 'ACOPLADO' | 'TOLVA' | 'HERRAMIENTA' | 'OTRO';
export type EstadoMaquinaria = 'OPERATIVA' | 'EN_MANTENIMIENTO' | 'FUERA_DE_SERVICIO';
export type TipoMantenimiento = 'CAMBIO_ACEITE' | 'REVISION_GENERAL' | 'REPARACION' | 'OTRO';
export type TipoGastoMaquinaria = 'COMBUSTIBLE' | 'REPARACION' | 'REPUESTO' | 'SERVICIO' | 'SEGURO' | 'OTRO';

export interface MantenimientoMaquinaria {
  id: number;
  maquinariaId: number;
  tipo: TipoMantenimiento;
  descripcion?: string | null;
  fecha: string;
  horasUso?: number | null;
  costo?: number | null;
  proximoMantenimiento?: string | null;
  observaciones?: string | null;
}

export interface GastoMaquinaria {
  id: number;
  maquinariaId: number;
  tipo: TipoGastoMaquinaria;
  descripcion: string;
  monto: number;
  fecha: string;
  observaciones?: string | null;
}

export interface Maquinaria {
  id: number;
  nombre: string;
  tipo: TipoMaquinaria;
  marca?: string | null;
  modelo?: string | null;
  anio?: number | null;
  patente?: string | null;
  estado: EstadoMaquinaria;
  horasUso?: number | null;
  seguroVencimiento?: string | null;
  vtvVencimiento?: string | null;
  observaciones?: string | null;
  campo?: { id: number; nombre: string } | null;
  mantenimientos: MantenimientoMaquinaria[];
  gastos: GastoMaquinaria[];
}

export interface CreateMaquinariaInput {
  nombre: string;
  tipo: TipoMaquinaria;
  marca?: string;
  modelo?: string;
  anio?: number;
  patente?: string;
  estado?: EstadoMaquinaria;
  horasUso?: number;
  seguroVencimiento?: string;
  vtvVencimiento?: string;
  observaciones?: string;
}

export interface CreateMantenimientoInput {
  tipo: TipoMantenimiento;
  descripcion?: string;
  fecha: string;
  horasUso?: number;
  costo?: number;
  proximoMantenimiento?: string;
  observaciones?: string;
}

export interface CreateGastoInput {
  tipo: TipoGastoMaquinaria;
  descripcion: string;
  monto: number;
  fecha: string;
  observaciones?: string;
}

export const TIPOS_MAQUINARIA: TipoMaquinaria[] = ['TRACTOR', 'SEMBRADORA', 'PULVERIZADORA', 'COSECHADORA', 'CAMIONETA', 'MIXER', 'ACOPLADO', 'TOLVA', 'HERRAMIENTA', 'OTRO'];
export const ESTADOS_MAQUINARIA: EstadoMaquinaria[] = ['OPERATIVA', 'EN_MANTENIMIENTO', 'FUERA_DE_SERVICIO'];
export const TIPOS_MANTENIMIENTO: TipoMantenimiento[] = ['CAMBIO_ACEITE', 'REVISION_GENERAL', 'REPARACION', 'OTRO'];
export const TIPOS_GASTO: TipoGastoMaquinaria[] = ['COMBUSTIBLE', 'REPARACION', 'REPUESTO', 'SERVICIO', 'SEGURO', 'OTRO'];

export const TIPO_MAQUINARIA_LABEL: Record<TipoMaquinaria, string> = {
  TRACTOR: 'Tractor', SEMBRADORA: 'Sembradora', PULVERIZADORA: 'Pulverizadora', COSECHADORA: 'Cosechadora',
  CAMIONETA: 'Camioneta', MIXER: 'Mixer', ACOPLADO: 'Acoplado', TOLVA: 'Tolva', HERRAMIENTA: 'Herramienta', OTRO: 'Otro',
};
export const ESTADO_MAQUINARIA_LABEL: Record<EstadoMaquinaria, string> = {
  OPERATIVA: 'Operativa', EN_MANTENIMIENTO: 'En mantenimiento', FUERA_DE_SERVICIO: 'Fuera de servicio',
};
export const TIPO_MANTENIMIENTO_LABEL: Record<TipoMantenimiento, string> = {
  CAMBIO_ACEITE: 'Cambio de aceite', REVISION_GENERAL: 'Revisión general', REPARACION: 'Reparación', OTRO: 'Otro',
};
export const TIPO_GASTO_LABEL: Record<TipoGastoMaquinaria, string> = {
  COMBUSTIBLE: 'Combustible', REPARACION: 'Reparación', REPUESTO: 'Repuesto', SERVICIO: 'Servicio', SEGURO: 'Seguro', OTRO: 'Otro',
};
