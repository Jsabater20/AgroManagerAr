import { api } from './client';

export interface UserProfile {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol?: string;
  rolGlobal?: string;
  plan?: 'FREE' | 'PRO';
  planExpira?: string | null;
  usuarioOrganizacionId?: number;
  organizaciones?: Array<{
    id: number;
    nombre: string;
    email: string;
    plan: 'FREE' | 'PRO';
    propietarioId: number;
  }>;
  createdAt: string;
}

export const getProfile = (): Promise<UserProfile> =>
  api.get<UserProfile>('/users/profile').then((r) => r.data);

export const updateProfile = (nombre: string, apellido: string): Promise<UserProfile> =>
  api.patch<UserProfile>('/users/profile', { nombre, apellido }).then((r) => r.data);

export const changePassword = (
  passwordActual: string,
  passwordNueva: string,
): Promise<{ ok: boolean }> =>
  api
    .patch<{ ok: boolean }>('/users/profile/password', { passwordActual, passwordNueva })
    .then((r) => r.data);

export const getAllUsers = (): Promise<UserProfile[]> =>
  api.get<UserProfile[]>('/users/admin/all').then((r) => r.data);

export const updateUserRol = (
  id: number,
  rol: 'SUPERADMIN' | 'USER',
): Promise<UserProfile> =>
  api.patch<UserProfile>(`/users/admin/${id}/rol`, { rol }).then((r) => r.data);

export const deleteUser = (id: number): Promise<{ ok: boolean }> =>
  api.delete<{ ok: boolean }>(`/users/admin/${id}`).then((r) => r.data);