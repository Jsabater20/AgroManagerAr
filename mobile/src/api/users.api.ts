import { api } from './client';
import type { Usuario } from '@/types/auth';

export const getProfile = () =>
  api.get<Usuario>('/users/profile').then((response) => response.data);

export const getAllUsers = () =>
  api.get<Usuario[]>('/users/admin/all').then((response) => response.data);

export const updateUserPlan = (userId: number, plan: 'FREE' | 'PRO') =>
  api.patch<Usuario>(`/users/admin/${userId}/plan`, { plan }).then((response) => response.data);

export const deleteUser = (userId: number) =>
  api.delete(`/users/admin/${userId}`).then((response) => response.data);
