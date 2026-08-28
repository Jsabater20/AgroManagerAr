export type EstadoActividad =
  | 'PENDIENTE'
  | 'EN_PROGRESO'
  | 'PAUSADA'
  | 'COMPLETADA'
  | 'CANCELADA';

export interface CampoDashboard {
  id: number;
  nombre: string;
  hectareas: number;
}

export interface SiembraDashboard {
  id: number;
  estado: 'EN_CURSO' | 'COSECHADA' | 'PERDIDA';
}

export interface TareaDashboard {
  id: number;
  titulo: string;
  estado: 'PENDIENTE' | 'EN_CURSO' | 'COMPLETADA' | 'CANCELADA';
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  fechaProgramada: string;
  fechaLimite?: string | null;
  campo?: { id: number; nombre: string } | null;
}

export interface ResumenFinancieroDashboard {
  ingresos: number;
  egresos: number;
  saldo: number;
}

export interface ActividadDashboard {
  id: number;
  titulo: string;
  descripcion?: string | null;
  recursoTipo: string;
  recursoId?: number | null;
  contexto?: string | null;
  fechaInicio: string;
  fechaEstimadaFin: string;
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  estado: EstadoActividad;
  activo: boolean;
  usuarioOrganizacion?: {
    id: number;
    usuario: { nombre: string; apellido: string };
  };
}

export interface OwnerDashboardData {
  campos: CampoDashboard[];
  siembras: SiembraDashboard[];
  animales: Array<{ id: number }>;
  tareas: TareaDashboard[];
  finanzas: ResumenFinancieroDashboard;
}
