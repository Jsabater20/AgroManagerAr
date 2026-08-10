import { api } from './client';
import type { MiembroPanelDto, RecursoAsignableDto } from './types';

export const ownerAdminApi = {
  // Obtener miembros para el panel del owner
  obtenerMiembrosPanel: (orgId: number) =>
    api.get<MiembroPanelDto[]>(`/organizaciones/${orgId}/panel/miembros`).then((r) => r.data),

  // Cambiar rol de miembro
  cambiarRolMiembro: (orgId: number, usuarioOrgId: number, nuevoRol: string) =>
    api
      .patch(`/organizaciones/${orgId}/panel/miembros/${usuarioOrgId}/rol`, {
        nuevoRol,
      })
      .then((r) => r.data),

  // Suspender miembro
  suspenderMiembro: (orgId: number, usuarioOrgId: number) =>
    api
      .patch(`/organizaciones/${orgId}/panel/miembros/${usuarioOrgId}/suspender`, {})
      .then((r) => r.data),

  // Activar miembro
  activarMiembro: (orgId: number, usuarioOrgId: number) =>
    api
      .patch(`/organizaciones/${orgId}/panel/miembros/${usuarioOrgId}/activar`, {})
      .then((r) => r.data),

  // Quitar miembro
  quitarMiembro: (orgId: number, usuarioOrgId: number) =>
    api
      .delete(`/organizaciones/${orgId}/panel/miembros/${usuarioOrgId}`)
      .then((r) => r.data),

  // Obtener recursos asignables
  obtenerRecursosAsignables: (orgId: number, usuarioOrgId: number) =>
    api
      .get<RecursoAsignableDto[]>(
        `/organizaciones/${orgId}/panel/recursos/${usuarioOrgId}`,
      )
      .then((r) => r.data),

  // Asignar recurso
  asignarRecurso: (
    orgId: number,
    usuarioOrgId: number,
    recursoTipo: string,
    recursoId: number,
  ) =>
    api
      .post(`/organizaciones/${orgId}/panel/recursos/${usuarioOrgId}/asignar`, {
        recursoTipo,
        recursoId,
      })
      .then((r) => r.data),

  // Retirar recurso
  retirarRecurso: (
    orgId: number,
    usuarioOrgId: number,
    recursoTipo: string,
    recursoId: number,
  ) =>
    api
      .post(`/organizaciones/${orgId}/panel/recursos/${usuarioOrgId}/retirar`, {
        recursoTipo,
        recursoId,
      })
      .then((r) => r.data),
};