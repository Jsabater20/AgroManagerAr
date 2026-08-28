export type EstadoSiembra = 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';

export const ESTADO_SIEMBRA_LABEL: Record<EstadoSiembra, string> = {
  EN_CURSO: 'En curso',
  COSECHADA: 'Cosechada',
  PERDIDA: 'Perdida',
};

export interface TipoCultivo {
  id: number;
  nombre: string;
  descripcion?: string | null;
}

export interface LoteSiembra {
  id: number;
  nombre: string;
  hectareas?: number;
  campo?: { id: number; nombre: string };
}

export interface Cosecha {
  id: number;
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number | null;
  observaciones?: string | null;
}

export interface AplicacionSiembra {
  id: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string | null;
  insumo?: { id: number; nombre: string };
}

export interface Siembra {
  id: number;
  fechaSiembra: string;
  densidad?: number | null;
  observaciones?: string | null;
  estado: EstadoSiembra;
  lote: LoteSiembra;
  tipoCultivo: TipoCultivo;
  cosechas: Cosecha[];
  aplicaciones?: AplicacionSiembra[];
}

export interface CrearTipoCultivoInput {
  nombre: string;
  descripcion?: string;
}

export interface CrearSiembraInput {
  loteId: number;
  tipoCultivoId: number;
  fechaSiembra: string;
  densidad?: number;
  observaciones?: string;
}

export interface ActualizarSiembraInput {
  fechaSiembra?: string;
  densidad?: number;
  observaciones?: string;
  estado?: EstadoSiembra;
}

export interface CrearCosechaInput {
  fechaCosecha: string;
  rendimientoKgHa: number;
  totalKg: number;
  humedad?: number;
  observaciones?: string;
}

export interface CrearAplicacionInput {
  insumoId: number;
  fecha: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}
