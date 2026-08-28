import { api } from '@/api/client';

export type RolMiembro = 'ADMIN' | 'OPERARIO' | 'CONTADOR' | 'ASESOR' | 'MECANICO';
export type RolPanelMiembro = 'ADMINISTRADOR' | 'OPERARIO' | 'CONTADOR' | 'MECANICO' | 'MIEMBRO';

export interface ModuloMiembro {
  moduloNombre: string;
  activo: boolean;
}

export interface MiembroEquipo {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaIncorporacion: string;
  actividades: {
    pendientes: number;
    enProgreso: number;
    completadas: number;
  };
  recursosCampos: string[];
  modulos: ModuloMiembro[];
}

export interface InvitacionEquipo {
  id: number;
  email: string;
  rol: string;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'CANCELADA' | 'EXPIRADA';
  fechaInvitacion: string;
  expiresAt: string;
}

export interface UsoMiembros {
  plan: 'FREE' | 'PRO';
  miembros: { usados: number; limite: number | null };
  actividades: { usadas: number; limite: number | null };
}

export interface RecursoAsignable {
  id: number;
  nombre: string;
  tipo: 'CAMPO';
  asignado: boolean;
}

export const getMiembrosEquipo = async (organizacionId: number) => {
  const { data } = await api.get<MiembroEquipo[]>(
    `/organizaciones/${organizacionId}/panel/miembros`,
  );
  return data;
};

export const getUsoMiembros = async (organizacionId: number) => {
  const { data } = await api.get<UsoMiembros>(`/organizaciones/${organizacionId}/miembros/uso`);
  return data;
};

export const getInvitaciones = async (organizacionId: number) => {
  const { data } = await api.get<InvitacionEquipo[]>(`/organizaciones/${organizacionId}/invitaciones`);
  return data;
};

export const invitarMiembro = async (
  organizacionId: number,
  input: { email: string; rol: RolMiembro; mensaje?: string },
) => {
  const { data } = await api.post(`/organizaciones/${organizacionId}/miembros/invitar`, input);
  return data;
};

export const reenviarInvitacion = async (organizacionId: number, invitacionId: number) => {
  const { data } = await api.post(
    `/organizaciones/${organizacionId}/invitaciones/${invitacionId}/reenviar`,
  );
  return data;
};

export const cancelarInvitacion = async (organizacionId: number, invitacionId: number) => {
  const { data } = await api.delete(`/organizaciones/${organizacionId}/invitaciones/${invitacionId}`);
  return data;
};

export const actualizarRolMiembro = async (
  organizacionId: number,
  usuarioOrganizacionId: number,
  rol: RolPanelMiembro,
) => {
  const { data } = await api.patch(
    `/organizaciones/${organizacionId}/panel/miembros/${usuarioOrganizacionId}/rol`,
    { nuevoRol: rol },
  );
  return data;
};

export const actualizarEstadoMiembro = async (
  organizacionId: number,
  usuarioOrganizacionId: number,
  activo: boolean,
) => {
  const action = activo ? 'activar' : 'suspender';
  const { data } = await api.patch(
    `/organizaciones/${organizacionId}/panel/miembros/${usuarioOrganizacionId}/${action}`,
  );
  return data;
};

export const actualizarModuloMiembro = async (
  organizacionId: number,
  usuarioOrganizacionId: number,
  moduloNombre: string,
  activo: boolean,
) => {
  const { data } = await api.patch(
    `/organizaciones/${organizacionId}/miembros/${usuarioOrganizacionId}/modulos`,
    { moduloNombre, activo },
  );
  return data;
};

export const getRecursosAsignables = async (
  organizacionId: number,
  usuarioOrganizacionId: number,
) => {
  const { data } = await api.get<RecursoAsignable[]>(
    `/organizaciones/${organizacionId}/panel/recursos/${usuarioOrganizacionId}`,
  );
  return data;
};

export const actualizarCampoAsignado = async (
  organizacionId: number,
  usuarioOrganizacionId: number,
  campoId: number,
  asignado: boolean,
) => {
  const action = asignado ? 'asignar' : 'retirar';
  const { data } = await api.post(
    `/organizaciones/${organizacionId}/panel/recursos/${usuarioOrganizacionId}/${action}`,
    { recursoTipo: 'CAMPO', recursoId: campoId },
  );
  return data;
};
