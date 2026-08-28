import { api } from '@/api/client';
import type {
  CampoDashboard,
  OwnerDashboardData,
  ResumenFinancieroDashboard,
  SiembraDashboard,
  TareaDashboard,
} from '@/types/dashboard';

export const getOwnerDashboard = async (): Promise<OwnerDashboardData> => {
  const [campos, siembras, animales, tareas, finanzas] = await Promise.all([
    api.get<CampoDashboard[]>('/campos'),
    api.get<SiembraDashboard[]>('/siembras'),
    api.get<Array<{ id: number }>>('/ganado'),
    api.get<TareaDashboard[]>('/tareas'),
    api.get<ResumenFinancieroDashboard>('/finanzas/resumen'),
  ]);

  return {
    campos: campos.data,
    siembras: siembras.data,
    animales: animales.data,
    tareas: tareas.data,
    finanzas: finanzas.data,
  };
};
