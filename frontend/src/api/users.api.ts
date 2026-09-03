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
  usuarioOrganizacionId?: number | null;
  organizaciones?: Array<{
    id: number;
    nombre: string;
    email?: string;
    plan?: 'FREE' | 'PRO';
    propietarioId: number;
  }>;
  empresas?: Array<{
    id: number;
    nombre: string;
    estadoComercial: 'PENDIENTE' | 'ACTIVA' | 'SUSPENDIDA' | 'VENCIDA';
    limiteEstablecimientos: number;
    propietarioId: number;
  }>;
  createdAt?: string;
  fotoPerfilUrl?: string | null;
  fotoPerfilEncuadre?: FotoPerfilEncuadre;
}

export interface FotoPerfilEncuadre {
  posicionX: number;
  posicionY: number;
  escala: number;
}

export const getProfile = (): Promise<UserProfile> =>
  api.get<UserProfile>('/users/profile').then((r) => r.data);

export const updateProfile = (
  nombre: string,
  apellido: string,
): Promise<UserProfile> =>
  api.patch<UserProfile>('/users/profile', { nombre, apellido }).then((r) => r.data);

export const changePassword = (
  passwordActual: string,
  passwordNueva: string,
): Promise<{ ok: boolean }> =>
  api
    .patch<{ ok: boolean }>('/users/profile/password', {
      passwordActual,
      passwordNueva,
    })
    .then((r) => r.data);

type MimeFotoPerfil = 'image/jpeg' | 'image/png' | 'image/webp';

export const subirFotoPerfil = async (archivo: File): Promise<UserProfile> => {
  const mimeType = archivo.type as MimeFotoPerfil;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(mimeType)) {
    throw new Error('Elegí una imagen JPG, PNG o WEBP.');
  }
  if (archivo.size > 5 * 1024 * 1024) {
    throw new Error('La imagen no puede superar los 5 MB.');
  }

  const carga = await api
    .post<{ storageKey: string; uploadUrl: string }>('/users/profile/foto/subida', { mimeType })
    .then((response) => response.data);
  let respuesta: Response;
  try {
    respuesta = await fetch(carga.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': mimeType },
      body: archivo,
    });
  } catch {
    throw new Error(
      'No se pudo conectar con el bucket de imágenes. Verificá la política CORS del bucket activo.',
    );
  }
  if (!respuesta.ok) {
    throw new Error('No pudimos subir la imagen al almacenamiento seguro.');
  }

  return api
    .post<UserProfile>('/users/profile/foto/confirmar', { storageKey: carga.storageKey })
    .then((response) => response.data);
};

export const eliminarFotoPerfil = (): Promise<{ ok: boolean }> =>
  api.delete<{ ok: boolean }>('/users/profile/foto').then((response) => response.data);

export const actualizarEncuadreFotoPerfil = (
  encuadre: FotoPerfilEncuadre,
): Promise<UserProfile> =>
  api
    .patch<UserProfile>('/users/profile/foto/encuadre', encuadre)
    .then((response) => response.data);

export const getAllUsers = (): Promise<UserProfile[]> =>
  api.get<UserProfile[]>('/users/admin/all').then((r) => r.data);

export const updateUserRol = (
  id: number,
  rol: 'SUPERADMIN' | 'USER',
): Promise<UserProfile> =>
  api.patch<UserProfile>(`/users/admin/${id}/rol`, { rol }).then((r) => r.data);

export const updateUserPlan = (
  id: number,
  plan: 'FREE' | 'PRO',
): Promise<UserProfile> =>
  api.patch<UserProfile>(`/users/admin/${id}/plan`, { plan }).then((r) => r.data);

export const deleteUser = (id: number): Promise<{ ok: boolean }> =>
  api.delete<{ ok: boolean }>(`/users/admin/${id}`).then((r) => r.data);
