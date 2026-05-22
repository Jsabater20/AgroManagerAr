import { api } from './client';

export interface PlanInfo {
  plan: 'FREE' | 'PRO';
  planExpira: string | null;
  mpSuscripcionId: string | null;
}

export const getPlanInfo = (): Promise<PlanInfo> =>
  api.get<PlanInfo>('/plan').then((r) => r.data);

export const crearCheckout = (
  tipo: 'mensual' | 'anual',
): Promise<{ init_point: string; id: string }> =>
  api
    .post<{ init_point: string; id: string }>('/plan/checkout', { tipo })
    .then((r) => r.data);

export const verificarActivacion = (
  preapprovalId: string,
): Promise<{ activado: boolean; status: string; plan?: string; planExpira?: string }> =>
  api
    .post('/plan/verificar', { preapprovalId })
    .then((r) => r.data);

export const cancelarSuscripcion = (): Promise<{ ok: boolean }> =>
  api.post<{ ok: boolean }>('/plan/cancelar').then((r) => r.data);

