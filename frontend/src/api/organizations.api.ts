import { api } from './client';

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
  organizacionId: number;
  rol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR';
  estado: 'ACTIVO' | 'INVITADO' | 'INACTIVO' | 'SUSPENDIDO';
  usuario?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}

export const organizacionesApi = {
  // Crear nueva organización
  crear: (dto: { nombre: string; email: string }) =>
    api.post<Organizacion>('/organizaciones', dto).then((r) => r.data),

  // Obtener todas las organizaciones del usuario
  obtenerTodas: () =>
    api.get<Organizacion[]>('/organizaciones').then((r) => r.data),

  // Obtener una organización específica
  obtenerUna: (id: number) =>
    api.get<Organizacion>(`/organizaciones/${id}`).then((r) => r.data),

  // Actualizar organización (solo dueño)
  actualizar: (id: number, dto: Partial<{ nombre: string; email: string }>) =>
    api.patch<Organizacion>(`/organizaciones/${id}`, dto).then((r) => r.data),

  // Invitar miembro a organización
  invitarMiembro: (organizacionId: number, dto: { email: string; rol?: string }) =>
    api
      .post(`/organizaciones/${organizacionId}/invitar`, dto)
      .then((r) => r.data),

  // Aceptar invitación
  aceptarInvitacion: (token: string) =>
    api
      .post(`/organizaciones/invitaciones/${token}/aceptar`, {})
      .then((r) => r.data),

  // Obtener miembros de organización
  obtenerMiembros: (id: number) =>
    api.get<MiembroOrganizacion[]>(`/organizaciones/${id}/miembros`).then((r) => r.data),

  // Eliminar miembro
  eliminarMiembro: (organizacionId: number, miembroId: number) =>
    api.delete(`/organizaciones/${organizacionId}/miembros/${miembroId}`),
};