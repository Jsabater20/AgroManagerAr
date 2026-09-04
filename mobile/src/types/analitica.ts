import type { CategoriaMovimiento } from '@/types/finanzas';

export interface CampaniaRentabilidad {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin?: string | null;
  siembras: number;
  produccionKg: number;
  ingresos: number;
  egresos: number;
  margen: number;
  rentabilidad: number;
}

export interface AnaliticaRentabilidad {
  resumen: {
    ingresos: number;
    egresos: number;
    saldo: number;
    produccionKg: number;
  };
  produccion: {
    siembras: number;
    enCurso: number;
    cosechadas: number;
    perdidas: number;
    cosechas: number;
    aplicaciones: number;
    totalKg: number;
  };
  egresosPorCategoria: Array<{
    categoria: CategoriaMovimiento;
    monto: number;
  }>;
  campanias: CampaniaRentabilidad[];
}
