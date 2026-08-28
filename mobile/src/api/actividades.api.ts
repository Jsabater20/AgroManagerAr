import { api } from '@/api/client';
import {
  executeActivityObservation,
  executeActivityStateChange,
  type OfflineMutationResult,
} from '@/services/offline-queue.service';
import type { ActividadDashboard, EstadoActividad } from '@/types/dashboard';

export type TipoRecursoActividad =
  | 'CAMPO'
  | 'LOTE'
  | 'SIEMBRA'
  | 'ANIMAL'
  | 'TAREA'
  | 'MAQUINARIA'
  | 'CAMPANIA'
  | 'GENERAL';

export interface CreateActividadInput {
  usuarioOrganizacionId: number;
  titulo: string;
  descripcion?: string;
  recursoTipo: TipoRecursoActividad;
  recursoId?: number;
  fechaInicio: string;
  fechaEstimadaFin: string;
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
}

export interface ObservacionActividad {
  id: number;
  contenido: string;
  fotoBase64?: string | null;
  estadoActividadAlMomento: EstadoActividad;
  createdAt: string;
  autor?: {
    nombre: string;
    apellido: string;
  } | null;
}

export interface CreateObservacionInput {
  contenido: string;
  fotoBase64?: string;
}

export const listActividades = async (organizacionId: number) => {
  const { data } = await api.get<ActividadDashboard[]>(
    `/organizaciones/${organizacionId}/actividades`,
  );

  return data;
};

export const cambiarEstadoActividad = async (
  organizacionId: number,
  actividadId: number,
  estado: EstadoActividad,
) => {
  const { data } = await api.patch<ActividadDashboard>(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/estado`,
    { estado },
  );

  return data;
};

export const cambiarEstadoActividadConSync = async (
  userId: number,
  organizacionId: number,
  actividadId: number,
  estado: EstadoActividad,
): Promise<OfflineMutationResult<ActividadDashboard>> =>
  executeActivityStateChange<ActividadDashboard>(
    userId,
    organizacionId,
    actividadId,
    estado,
  );

export const crearActividad = async (
  organizacionId: number,
  input: CreateActividadInput,
) => {
  const { data } = await api.post<ActividadDashboard>(
    `/organizaciones/${organizacionId}/actividades`,
    input,
  );

  return data;
};

export const listObservacionesActividad = async (
  organizacionId: number,
  actividadId: number,
) => {
  const { data } = await api.get<ObservacionActividad[]>(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/observaciones`,
  );
  return data;
};

export const createObservacionActividad = async (
  organizacionId: number,
  actividadId: number,
  input: CreateObservacionInput,
) => {
  const { data } = await api.post<ObservacionActividad>(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/observaciones`,
    input,
  );
  return data;
};

export const createObservacionActividadConSync = async (
  userId: number,
  organizacionId: number,
  actividadId: number,
  input: CreateObservacionInput,
): Promise<OfflineMutationResult<ObservacionActividad>> =>
  executeActivityObservation<ObservacionActividad>(
    userId,
    organizacionId,
    actividadId,
    input.contenido,
    input.fotoBase64,
  );
