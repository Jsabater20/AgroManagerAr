import { api } from './client';

export interface ResumenReferidos {
  codigo: string;
  validos: number;
  pendientes: number;
  referidos: Array<{
    id: number;
    registradoEn: string;
    emailVerificadoEn: string | null;
    primerCampoCreadoEn: string | null;
    validadoEn: string | null;
    referido: { nombre: string; apellido: string; email: string };
  }>;
}

export const getResumenReferidos = (): Promise<ResumenReferidos> =>
  api.get<ResumenReferidos>('/referidos/resumen').then((response) => response.data);
