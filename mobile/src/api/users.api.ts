import { api } from './client';
import { File } from 'expo-file-system';
import type { Usuario } from '@/types/auth';

export const getProfile = () =>
  api.get<Usuario>('/users/profile').then((response) => response.data);

export const getAllUsers = () =>
  api.get<Usuario[]>('/users/admin/all').then((response) => response.data);

export const updateUserPlan = (userId: number, plan: 'FREE' | 'PRO') =>
  api.patch<Usuario>(`/users/admin/${userId}/plan`, { plan }).then((response) => response.data);

export const deleteUser = (userId: number) =>
  api.delete(`/users/admin/${userId}`).then((response) => response.data);

export const subirFotoPerfil = async (uri: string) => {
  const { data: carga } = await api.post<{
    storageKey: string;
    uploadUrl: string;
  }>('/users/profile/foto/subida', { mimeType: 'image/jpeg' });

  const response = await fetch(carga.uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/jpeg' },
    body: new File(uri),
  });

  if (!response.ok) {
    throw new Error('No pudimos subir la foto al almacenamiento seguro.');
  }

  return api
    .post<Usuario>('/users/profile/foto/confirmar', { storageKey: carga.storageKey })
    .then((result) => result.data);
};

export const eliminarFotoPerfil = () =>
  api.delete<{ ok: boolean }>('/users/profile/foto').then((response) => response.data);
