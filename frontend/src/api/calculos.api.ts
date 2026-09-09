import { api } from './client';
import type { Campo } from './types';

export interface MaquinariaCalculable {
  id: number;
  nombre: string;
  tipo: string;
  marca?: string | null;
  modelo?: string | null;
}

export type TipoCalculoGuardado =
  | 'APLICACION'
  | 'SIEMBRA'
  | 'FERTILIZACION'
  | 'MAQUINARIA'
  | 'GANADERIA'
  | 'ECONOMICO';

export interface GuardarCalculoPayload {
  tipo: TipoCalculoGuardado;
  titulo: string;
  campoId?: number;
  loteId?: number;
  maquinariaId?: number;
  datos: Record<string, unknown>;
  resultado: Record<string, unknown>;
}

export interface CalculoGuardado {
  id: number;
  tipo: TipoCalculoGuardado;
  titulo: string;
  campoId?: number | null;
  loteId?: number | null;
  maquinariaId?: number | null;
  datos: Record<string, unknown>;
  resultado: Record<string, unknown>;
  createdAt: string;
  usuario: { id: number; nombre: string; apellido: string };
}

export interface CostosRegistrados {
  totalEgresos: number;
  cantidadMovimientos: number;
}

const obtenerCamposDisponibles = async () => {
  const { data } = await api.get<Campo[]>('/calculos/contexto/campos');
  return data;
};

const obtenerMaquinariasDisponibles = async () => {
  const { data } = await api.get<MaquinariaCalculable[]>('/calculos/contexto/maquinarias');
  return data;
};

const listar = async () => {
  const { data } = await api.get<CalculoGuardado[]>('/calculos');
  return data;
};

const obtenerCostosRegistrados = async (campoId: number) => {
  const { data } = await api.get<CostosRegistrados>('/calculos/contexto/costos', {
    params: { campoId },
  });
  return data;
};

const guardar = async (payload: GuardarCalculoPayload) => {
  const { data } = await api.post<CalculoGuardado>('/calculos', payload);
  return data;
};

export const calculosApi = {
  obtenerCamposDisponibles,
  obtenerMaquinariasDisponibles,
  listar,
  guardar,
  obtenerCostosRegistrados,
};
