import { api } from '@/api/client';
import type {
  CreateGastoInput,
  CreateMantenimientoInput,
  CreateMaquinariaInput,
  EstadoMaquinaria,
  GastoMaquinaria,
  Maquinaria,
  MantenimientoMaquinaria,
} from '@/types/maquinarias';

export const getMaquinarias = async () => {
  const { data } = await api.get<Maquinaria[]>('/maquinarias');
  return data;
};

export const getMaquinaria = async (maquinariaId: number) => {
  const { data } = await api.get<Maquinaria>(`/maquinarias/${maquinariaId}`);
  return data;
};

export const crearMaquinaria = async (input: CreateMaquinariaInput) => {
  const { data } = await api.post<Maquinaria>('/maquinarias', input);
  return data;
};

export const actualizarEstadoMaquinaria = async (maquinariaId: number, estado: EstadoMaquinaria) => {
  const { data } = await api.patch<Maquinaria>(`/maquinarias/${maquinariaId}`, { estado });
  return data;
};

export const eliminarMaquinaria = async (maquinariaId: number) => {
  await api.delete(`/maquinarias/${maquinariaId}`);
};

export const crearMantenimiento = async (maquinariaId: number, input: CreateMantenimientoInput) => {
  const { data } = await api.post<MantenimientoMaquinaria>(`/maquinarias/${maquinariaId}/mantenimientos`, input);
  return data;
};

export const eliminarMantenimiento = async (maquinariaId: number, mantenimientoId: number) => {
  await api.delete(`/maquinarias/${maquinariaId}/mantenimientos/${mantenimientoId}`);
};

export const crearGasto = async (maquinariaId: number, input: CreateGastoInput) => {
  const { data } = await api.post<GastoMaquinaria>(`/maquinarias/${maquinariaId}/gastos`, input);
  return data;
};

export const eliminarGasto = async (maquinariaId: number, gastoId: number) => {
  await api.delete(`/maquinarias/${maquinariaId}/gastos/${gastoId}`);
};
