import { api } from '@/api/client';
import type { Campania, CampaniaInput } from '@/types/campanias';

export const getCampanias = async () => { const { data } = await api.get<Campania[]>('/campanias'); return data; };
export const getCampania = async (campaniaId: number) => { const { data } = await api.get<Campania>(`/campanias/${campaniaId}`); return data; };
export const crearCampania = async (input: CampaniaInput) => { const { data } = await api.post<Campania>('/campanias', input); return data; };
export const actualizarCampania = async (campaniaId: number, input: Partial<CampaniaInput>) => { const { data } = await api.patch<Campania>(`/campanias/${campaniaId}`, input); return data; };
export const eliminarCampania = async (campaniaId: number) => { await api.delete(`/campanias/${campaniaId}`); };
export const asignarSiembrasCampania = async (campaniaId: number, siembraIds: number[]) => { const { data } = await api.patch<Campania>(`/campanias/${campaniaId}/siembras`, { siembraIds }); return data; };
