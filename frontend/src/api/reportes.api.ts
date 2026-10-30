import { api } from './client';

export type TipoReportePeriodico = 'SEMANAL' | 'MENSUAL';

export interface CapacidadesReportes {
  plan: 'FREE' | 'PRO';
  zonaHoraria: string;
  permisos: { esOwner: boolean; puedeVerFinanzas: boolean };
  funcionalidades: {
    resumenBasicoManual: boolean;
    semanalMensual: boolean;
    porLoteYCampania: boolean;
    pdfProfesional: boolean;
    resumenInteligente: boolean;
    automatizacion: boolean;
    envioPorCorreo: boolean;
  };
}

export interface ActividadReporte {
  id: number;
  titulo: string;
  responsable: string;
  estado: string;
  prioridad: string;
  fechaEstimadaFin: string | null;
}

export interface AlertaReporte {
  id: string;
  titulo: string;
  mensaje: string;
  severidad: 'ADVERTENCIA' | 'CRITICA';
}

export interface ReportePeriodico {
  tipo: TipoReportePeriodico;
  organizacion: { id: number; nombre: string };
  periodo: { etiqueta: string; desde: string; hasta: string; zonaHoraria: string; cerrado: boolean };
  alcance: { incluyeFinanzas: boolean; campoIds: number[] | null };
  actividad: {
    completadas: number;
    pendientes: number;
    vencidas: number;
    realizadas: ActividadReporte[];
    proximas: ActividadReporte[];
  };
  maquinaria: {
    mantenimientos: number;
    gastosRegistrados: number;
    costoMantenimientos: number;
    gastoMaquinaria: number;
  };
  finanzas: {
    ingresos: number;
    egresos: number;
    costosReales: number;
    costosEstimados: number;
    saldo: number;
    comparacionAnterior: { ingresos: number | null; egresos: number | null; saldo: number | null } | null;
  } | null;
  alertas: { total: number; prioritarias: number; items: AlertaReporte[] };
  resumen: string[];
  resumenInteligente?: {
    nivelGeneral: 'POSITIVO' | 'INFORMACION' | 'ATENCION' | 'CRITICO';
    resumen: string;
    generadoCon: string;
    hallazgos: Array<{
      id: string;
      nivel: 'POSITIVO' | 'INFORMACION' | 'ATENCION' | 'CRITICO';
      titulo: string;
      descripcion: string;
      accionSugerida?: string;
    }>;
  };
}

export interface ResumenCostosProductivos {
  reales: number;
  estimados: number;
  realPorHa: number | null;
}

export interface DesgloseLote {
  id: number;
  nombre: string;
  hectareas: number;
  campo: { id: number; nombre: string };
  cultivos: string[];
  siembrasActivas: number;
  siembrasDelPeriodo: number;
  cosechaKg: number;
  rendimientoPromedioKgHa: number | null;
  costos: ResumenCostosProductivos | null;
}

export interface DesgloseCampania {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string | null;
  siembras: number;
  lotes: number;
  hectareas: number;
  cultivos: string[];
  siembrasActivas: number;
  cosechaKg: number;
  costos: ResumenCostosProductivos | null;
}

export interface DesgloseProductivo {
  organizacion: { id: number; nombre: string };
  periodo: ReportePeriodico['periodo'];
  alcance: { campoIds: number[] | null; incluyeCostos: boolean };
  lotes: DesgloseLote[];
  campanias: DesgloseCampania[];
}

export interface PreferenciasReporte {
  tipoPeriodo: TipoReportePeriodico;
  vistaDesglose: 'LOTES' | 'CAMPANIAS';
  envioAutomatico: boolean;
  frecuenciaEnvio: TipoReportePeriodico;
  updatedAt: string | null;
}

export interface HistorialReporte {
  id: number;
  tipo: 'SEMANAL' | 'MENSUAL' | 'DESGLOSE_PRODUCTIVO';
  fechaReferencia: string;
  periodoDesde: string;
  periodoHasta: string;
  createdAt: string;
}

export const reportesApi = {
  capacidades: (): Promise<CapacidadesReportes> =>
    api.get('/reportes/capacidades').then((response) => response.data),
  preferencias: (): Promise<PreferenciasReporte> =>
    api.get('/reportes/preferencias').then((response) => response.data),
  actualizarPreferencias: (datos: Partial<Pick<PreferenciasReporte, 'tipoPeriodo' | 'vistaDesglose' | 'envioAutomatico' | 'frecuenciaEnvio'>>): Promise<PreferenciasReporte> =>
    api.patch('/reportes/preferencias', datos).then((response) => response.data),
  historial: (): Promise<HistorialReporte[]> =>
    api.get('/reportes/historial').then((response) => response.data),
  periodico: (tipo: TipoReportePeriodico, fechaReferencia?: string): Promise<ReportePeriodico> =>
    api.get(tipo === 'SEMANAL' ? '/reportes/semanal' : '/reportes/mensual', {
      params: fechaReferencia ? { fechaReferencia } : undefined,
    }).then((response) => response.data),
  desgloseProductivo: (tipo: TipoReportePeriodico, fechaReferencia?: string): Promise<DesgloseProductivo> =>
    api.get('/reportes/desglose-productivo', {
      params: { tipo, ...(fechaReferencia ? { fechaReferencia } : {}) },
    }).then((response) => response.data),
};
