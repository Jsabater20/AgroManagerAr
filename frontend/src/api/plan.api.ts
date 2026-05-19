import { api } from './client';

export interface PlanInfo {
  plan: 'FREE' | 'PRO';
  planExpira: string | null;
  mpSuscripcionId: string | null;
}

export const getPlanInfo = (): Promise<PlanInfo> =>
  api.get<PlanInfo>('/plan').then((r) => r.data);

export const MP_CHECKOUT_URLS = {
  mensual: 'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=0c55ac7dc9f440408db532cdf46adaa0',
  anual:   'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=631da4f7399e4fa19f171aa9b9361729',
} as const;

export const cancelarSuscripcion = (): Promise<{ ok: boolean }> =>
  api.post<{ ok: boolean }>('/plan/cancelar').then((r) => r.data);
