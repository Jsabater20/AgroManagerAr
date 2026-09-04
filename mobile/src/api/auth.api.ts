import { api } from './client';
import type { LoginResponse } from '@/types/auth';

export const login = (email: string, password: string) =>
  api.post<LoginResponse>('/auth/login', { email, password }).then((response) => response.data);

export const forgotPassword = (email: string) =>
  api.post<{ message: string }>('/auth/forgot-password', { email }).then((response) => response.data);
