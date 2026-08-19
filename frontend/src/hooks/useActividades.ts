// src/hooks/useActividades.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  CreateActividadPayload,
  UpdateActividadPayload,
  ReasignarPayload,
  ProlongarPayload,
  CambiarEstadoPayload,
  AgregarObservacionPayload,
} from '../api/actividades.api';
import {
  createActividad,
  listActividades,
  getActividad,
  updateActividad,
  reasignarActividad,
  prolongarActividad,
  cambiarEstadoActividad,
  archivarActividad,
  agregarObservacion,
  getObservaciones,
  getHistorial,
} from '../api/actividades.api';

export const useActividades = (organizacionId: number) => {
  const queryClient = useQueryClient();

  // Listar actividades
  const {
    data: actividades,
    isLoading: isLoadingList,
    error: errorList,
  } = useQuery({
    queryKey: ['actividades', organizacionId],
    queryFn: () => listActividades(organizacionId),
    enabled: !!organizacionId,
  });

  // Crear actividad
  const createMutation = useMutation({
    mutationFn: (payload: CreateActividadPayload) =>
      createActividad(organizacionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades', organizacionId] });
    },
  });

  // Obtener una actividad
  const useActividad = (actividadId: number) => {
    return useQuery({
      queryKey: ['actividades', organizacionId, actividadId],
      queryFn: () => getActividad(organizacionId, actividadId),
      enabled: !!actividadId && !!organizacionId,
    });
  };

  // Actualizar actividad
  const updateMutation = useMutation({
    mutationFn: ({
      actividadId,
      payload,
    }: {
      actividadId: number;
      payload: UpdateActividadPayload;
    }) => updateActividad(organizacionId, actividadId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades', organizacionId] });
    },
  });

  // Reasignar actividad
  const reasignarMutation = useMutation({
    mutationFn: ({
      actividadId,
      payload,
    }: {
      actividadId: number;
      payload: ReasignarPayload;
    }) => reasignarActividad(organizacionId, actividadId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades', organizacionId] });
    },
  });

  // Prolongar actividad
  const prolongarMutation = useMutation({
    mutationFn: ({
      actividadId,
      payload,
    }: {
      actividadId: number;
      payload: ProlongarPayload;
    }) => prolongarActividad(organizacionId, actividadId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades', organizacionId] });
    },
  });

  // Cambiar estado
  const cambiarEstadoMutation = useMutation({
    mutationFn: ({
      actividadId,
      payload,
    }: {
      actividadId: number;
      payload: CambiarEstadoPayload;
    }) => cambiarEstadoActividad(organizacionId, actividadId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades', organizacionId] });
    },
  });

  // Archivar actividad
  const archivarMutation = useMutation({
    mutationFn: (actividadId: number) => archivarActividad(organizacionId, actividadId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades', organizacionId] });
    },
  });

  // Agregar observación
  const agregarObservacionMutation = useMutation({
    mutationFn: ({
      actividadId,
      payload,
    }: {
      actividadId: number;
      payload: AgregarObservacionPayload;
    }) => agregarObservacion(organizacionId, actividadId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observaciones', organizacionId] });
    },
  });

  // Obtener observaciones
  const useObservaciones = (actividadId: number) => {
    return useQuery({
      queryKey: ['observaciones', organizacionId, actividadId],
      queryFn: () => getObservaciones(organizacionId, actividadId),
      enabled: !!actividadId && !!organizacionId,
    });
  };

  // Obtener historial
  const useHistorial = (actividadId: number) => {
    return useQuery({
      queryKey: ['historial', organizacionId, actividadId],
      queryFn: () => getHistorial(organizacionId, actividadId),
      enabled: !!actividadId && !!organizacionId,
    });
  };

  return {
    actividades,
    isLoadingList,
    errorList,
    createMutation,
    useActividad,
    updateMutation,
    reasignarMutation,
    prolongarMutation,
    cambiarEstadoMutation,
    archivarMutation,
    agregarObservacionMutation,
    useObservaciones,
    useHistorial,
  };
};