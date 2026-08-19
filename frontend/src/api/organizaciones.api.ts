import { api } from './client';
import type { MiembroOrganizacion, InvitacionOrganizacion } from './types';

export const organizacionesApi = {
  // Obtener todas las organizaciones del usuario
  obtenerTodas: () =>
    api.get('/organizaciones').then((r) => r.data),

  // Obtener miembros de una organización
  obtenerMiembros: (orgId: number) =>
    api.get<MiembroOrganizacion[]>(`/organizaciones/${orgId}/miembros`).then((r) => r.data),

  obtenerMiembroActual: (orgId: number) =>
    api.get<MiembroOrganizacion>(`/organizaciones/${orgId}/miembros/actual`).then((r) => r.data),

  obtenerUsoMiembros: (orgId: number) =>
    api.get(`/organizaciones/${orgId}/miembros/uso`).then((r) => r.data),

  // Obtener invitaciones pendientes de una organización
  obtenerInvitaciones: (orgId: number) =>
    api.get<InvitacionOrganizacion[]>(`/organizaciones/${orgId}/invitaciones`).then((r) => r.data),

  // Invitar un nuevo miembro
  invitarMiembro: (orgId: number, dto: { email: string; rol: string; mensaje?: string }) =>
    api.post(`/organizaciones/${orgId}/miembros/invitar`, dto).then((r) => r.data),

  // Aceptar una invitación (endpoint público con JWT)
  aceptarInvitacion: (token: string) =>
    api.post(`/organizaciones/invitaciones/${token}/aceptar`, {}).then((r) => r.data),

  // Actualizar rol de un miembro
  actualizarRolMiembro: (
    orgId: number,
    usuarioOrgId: number,
    dto: { roles: string[] },
  ) =>
    api.patch(`/organizaciones/${orgId}/miembros/${usuarioOrgId}`, dto).then((r) => r.data),

  // Activar/desactivar un miembro
  cambiarEstadoMiembro: (
    orgId: number,
    usuarioOrgId: number,
    activo: boolean,
  ) =>
    api.patch(`/organizaciones/${orgId}/miembros/${usuarioOrgId}`, { activo }).then((r) => r.data),

  // Eliminar un miembro
  eliminarMiembro: (orgId: number, usuarioOrgId: number) =>
    api.delete(`/organizaciones/${orgId}/miembros/${usuarioOrgId}`).then((r) => r.data),

  // Reenviar invitación pendiente
  reenviarInvitacion: (orgId: number, invitacionId: number) =>
    api.post(`/organizaciones/${orgId}/invitaciones/${invitacionId}/reenviar`, {}).then((r) => r.data),

  // Cancelar invitación pendiente
  cancelarInvitacion: (orgId: number, invitacionId: number) =>
    api.delete(`/organizaciones/${orgId}/invitaciones/${invitacionId}`).then((r) => r.data),

  // Asignar campo a un miembro
  asignarCampoMiembro: (
    orgId: number,
    usuarioOrgId: number,
    dto: { campoId: number },
  ) =>
    api.post(`/organizaciones/${orgId}/miembros/${usuarioOrgId}/campos`, dto).then((r) => r.data),

  // Desasignar campo de un miembro
  desasignarCampoMiembro: (
    orgId: number,
    usuarioOrgId: number,
    campoId: number,
  ) =>
    api.delete(
      `/organizaciones/${orgId}/miembros/${usuarioOrgId}/campos/${campoId}`,
    ).then((r) => r.data),

  // Actualizar visibilidad de módulo para un miembro
  actualizarVisibilidadModulo: (
    orgId: number,
    usuarioOrgId: number,
    dto: { moduloNombre: string; activo: boolean },
  ) =>
    api.patch(
      `/organizaciones/${orgId}/miembros/${usuarioOrgId}/modulos`,
      dto,
    ).then((r) => r.data),
};
