// src/api/actividades.api.ts
import { api } from './client';

export interface CreateActividadPayload {
  titulo: string;
  descripcion?: string;
  usuarioOrganizacionId: number;
  recursoTipo: string;
  recursoId?: number;
  contexto?: string;
  fechaInicio: string;
  fechaEstimadaFin?: string;
  prioridad: string;
}

export interface UpdateActividadPayload {
  titulo?: string;
  descripcion?: string;
  recursoTipo?: string;
  recursoId?: number;
  contexto?: string;
  fechaInicio?: string;
  fechaEstimadaFin?: string;
  prioridad?: string;
}

export interface ReasignarPayload {
  usuarioOrganizacionId: number;
}

export interface ProlongarPayload {
  fechaEstimadaFin: string;
}

export interface CambiarEstadoPayload {
  estado: string;
}

export interface AgregarObservacionPayload {
  contenido: string;
  fotoBase64?: string;
}

// Crear actividad
export const createActividad = async (
  organizacionId: number,
  payload: CreateActividadPayload,
) => {
  const { data } = await api.post(
    `/organizaciones/${organizacionId}/actividades`,
    payload,
  );
  return data;
};

// Listar actividades
export const listActividades = async (
  organizacionId: number,
  params?: {
    estado?: string;
    prioridad?: string;
    activo?: boolean;
    usuarioOrganizacionId?: number;
  },
) => {
  const { data } = await api.get(
    `/organizaciones/${organizacionId}/actividades`,
    { params },
  );
  return data;
};

// Obtener una actividad
export const getActividad = async (
  organizacionId: number,
  actividadId: number,
) => {
  const { data } = await api.get(
    `/organizaciones/${organizacionId}/actividades/${actividadId}`,
  );
  return data;
};

// Actualizar actividad
export const updateActividad = async (
  organizacionId: number,
  actividadId: number,
  payload: UpdateActividadPayload,
) => {
  const { data } = await api.patch(
    `/organizaciones/${organizacionId}/actividades/${actividadId}`,
    payload,
  );
  return data;
};

// Reasignar actividad
export const reasignarActividad = async (
  organizacionId: number,
  actividadId: number,
  payload: ReasignarPayload,
) => {
  const { data } = await api.patch(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/reasignar`,
    payload,
  );
  return data;
};

// Prolongar fecha
export const prolongarActividad = async (
  organizacionId: number,
  actividadId: number,
  payload: ProlongarPayload,
) => {
  const { data } = await api.patch(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/prolongar`,
    payload,
  );
  return data;
};

// Cambiar estado
export const cambiarEstadoActividad = async (
  organizacionId: number,
  actividadId: number,
  payload: CambiarEstadoPayload,
) => {
  const { data } = await api.patch(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/estado`,
    payload,
  );
  return data;
};

// Archivar actividad
export const archivarActividad = async (
  organizacionId: number,
  actividadId: number,
) => {
  const { data } = await api.patch(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/archivar`,
  );
  return data;
};

// Agregar observación
export const agregarObservacion = async (
  organizacionId: number,
  actividadId: number,
  payload: AgregarObservacionPayload,
) => {
  const { data } = await api.post(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/observaciones`,
    payload,
  );
  return data;
};

// Obtener observaciones
export const getObservaciones = async (
  organizacionId: number,
  actividadId: number,
) => {
  const { data } = await api.get(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/observaciones`,
  );
  return data;
};

// Obtener historial
export const getHistorial = async (
  organizacionId: number,
  actividadId: number,
) => {
  const { data } = await api.get(
    `/organizaciones/${organizacionId}/actividades/${actividadId}/historial`,
  );
  return data;
};
