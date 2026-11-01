import { api } from './client';

export type RubroCostoProductivo =
  | 'INSUMO'
  | 'MAQUINARIA'
  | 'MANO_DE_OBRA'
  | 'CONTRATISTA'
  | 'SERVICIO'
  | 'COMBUSTIBLE'
  | 'MANTENIMIENTO'
  | 'OTRO';

export interface CreateCostoActividadPayload {
  rubro: RubroCostoProductivo;
  descripcion: string;
  monto: number;
  fecha: string;
  cantidad?: number;
  unidad?: string;
  costoUnitario?: number;
  superficieHa?: number;
  idempotencyKey?: string;
}

export interface CreateCostoEstimadoPayload extends CreateCostoActividadPayload {
  recursoTipo: 'CAMPO' | 'LOTE' | 'SIEMBRA' | 'CAMPANIA' | 'MAQUINARIA';
  recursoId: number;
}

export interface CostoProductivo {
  id: number;
  rubro: RubroCostoProductivo;
  descripcion: string;
  monto: number | string;
  cantidad?: number | string | null;
  unidad?: string | null;
  costoUnitario?: number | string | null;
  superficieHa?: number | string | null;
  fecha: string;
  createdAt: string;
  creadoPor?: { id: number; nombre: string; apellido?: string | null };
  movimientoFinanciero?: {
    id: number;
    categoria: string;
    fecha: string;
    monto: number | string;
    moneda: string;
  } | null;
}

export const listarCostosActividad = async (
  organizacionId: number,
  actividadId: number,
): Promise<CostoProductivo[]> => {
  const { data } = await api.get(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/costos`,
  );
  return data;
};

export const crearCostoActividad = async (
  organizacionId: number,
  actividadId: number,
  payload: CreateCostoActividadPayload,
): Promise<CostoProductivo> => {
  const { data } = await api.post(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/costos`,
    payload,
  );
  return data;
};

export const crearCostoEstimado = async (
  organizacionId: number,
  payload: CreateCostoEstimadoPayload,
): Promise<CostoProductivo> => {
  const { data } = await api.post(
    `/organizaciones/${organizacionId}/costos-productivos/estimados`,
    payload,
  );
  return data;
};
