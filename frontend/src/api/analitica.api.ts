import { api } from './client';

export interface ResumenRentabilidad {
  ingresos: number;
  egresos: number;
  saldo: number;
  produccionKg: number;
  costosReales: number;
  costosEstimados: number;
  desvioCostos: number | null;
}

export interface AnalisisRentabilidad {
  id: number;
  nombre: string;
  hectareas: number;
  siembras: number;
  produccionKg: number;
  ingresos: number;
  egresos: number;
  egresosManuales: number;
  costosReales: number;
  costosEstimados: number;
  desvioCostos: number | null;
  margen: number;
  rentabilidad: number | null;
  porHectarea: {
    ingresos: number;
    egresos: number;
    costosReales: number;
    margen: number;
  } | null;
}

export interface AnalisisLote extends AnalisisRentabilidad {
  campo: { id: number; nombre: string };
}

export interface AnalisisCampania extends AnalisisRentabilidad {
  fechaInicio: string;
  fechaFin: string | null;
  lotes: number;
}

export interface ReporteRentabilidad {
  resumen: ResumenRentabilidad;
  lotes: AnalisisLote[];
  campanias: AnalisisCampania[];
  costosPorRubro: Array<{ rubro: string; real: number; estimado: number }>;
  egresosPorCategoria: Array<{ categoria: string; monto: number }>;
  sinAsignar: {
    ingresosManuales: number;
    egresosManuales: number;
    costosReales: number;
    costosEstimados: number;
  };
  criterioAsignacion: string;
}

export const analiticaApi = {
  getRentabilidad: (): Promise<ReporteRentabilidad> =>
    api.get('/analitica/rentabilidad').then((response) => response.data),
};
