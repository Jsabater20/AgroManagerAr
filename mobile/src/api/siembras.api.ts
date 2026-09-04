import { api } from '@/api/client';
import type {
  ActualizarSiembraInput,
  CrearAplicacionInput,
  CrearCosechaInput,
  CrearSiembraInput,
  Cosecha,
  Siembra,
} from '@/types/siembras';

export interface LoteDisponibleSiembra {
  id: number;
  nombre: string;
  descripcion: string;
}

export const getSiembras = async () => {
  const { data } = await api.get<Siembra[]>('/siembras');
  return data;
};

export const getLotesDisponiblesSiembra = async () => {
  const { data } = await api.get<LoteDisponibleSiembra[]>('/siembras/lotes/disponibles');
  return data;
};

export const getSiembra = async (siembraId: number) => {
  const { data } = await api.get<Siembra>(`/siembras/${siembraId}`);
  return data;
};

export const crearSiembra = async (input: CrearSiembraInput) => {
  const { data } = await api.post<Siembra>('/siembras', input);
  return data;
};

export const actualizarSiembra = async (
  siembraId: number,
  input: ActualizarSiembraInput,
) => {
  const { data } = await api.patch<Siembra>(`/siembras/${siembraId}`, input);
  return data;
};

export const registrarCosecha = async (
  siembraId: number,
  input: CrearCosechaInput,
) => {
  const { data } = await api.post<Cosecha>(`/siembras/${siembraId}/cosechas`, input);
  return data;
};

export const registrarAplicacion = async (
  siembraId: number,
  input: CrearAplicacionInput,
) => {
  const { data } = await api.post(`/siembras/${siembraId}/aplicaciones`, input);
  return data;
};
