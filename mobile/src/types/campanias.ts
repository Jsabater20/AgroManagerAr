export interface SiembraCampania {
  id: number;
  fechaSiembra: string;
  estado: 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';
  tipoCultivo?: { nombre: string };
  lote?: { nombre: string; campo?: { nombre: string } };
}

export interface Campania {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin?: string | null;
  descripcion?: string | null;
  siembras: SiembraCampania[];
}

export interface CampaniaInput {
  nombre: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion?: string;
}
