import { api } from './client';

export interface AlertaOperativa {
  id: string;
  tipo: 'TRABAJO_VENCIDO' | 'COSTO_SUPERA_ESTIMADO';
  severidad: 'ADVERTENCIA' | 'CRITICA';
  titulo: string;
  mensaje: string;
  enlace: string;
  organizacionId: number;
}

export const alertasApi = {
  listar: (): Promise<AlertaOperativa[]> =>
    api.get('/alertas').then((response) => response.data),
};
