import { api } from '@/api/client';
import type { MovimientoFinanciero, MovimientoInput, ResumenFinanzas } from '@/types/finanzas';

export const getMovimientos = async () => { const { data } = await api.get<MovimientoFinanciero[]>('/finanzas'); return data; };
export const getMovimiento = async (movimientoId: number) => { const { data } = await api.get<MovimientoFinanciero>(`/finanzas/${movimientoId}`); return data; };
export const getResumenFinanzas = async () => { const { data } = await api.get<ResumenFinanzas>('/finanzas/resumen'); return data; };
export const crearMovimiento = async (input: MovimientoInput) => { const { data } = await api.post<MovimientoFinanciero>('/finanzas', input); return data; };
export const actualizarMovimiento = async (movimientoId: number, input: Partial<MovimientoInput>) => { const { data } = await api.patch<MovimientoFinanciero>(`/finanzas/${movimientoId}`, input); return data; };
export const eliminarMovimiento = async (movimientoId: number) => { await api.delete(`/finanzas/${movimientoId}`); };
