import { api } from './client';

export interface EmpresaResumen {
  id: number;
  nombre: string;
  establecimientos: number;
  limiteEstablecimientos: number;
  estadoComercial: 'PENDIENTE' | 'ACTIVA' | 'SUSPENDIDA' | 'VENCIDA';
  fechaInicioComercial: string | null;
  fechaVencimiento: string | null;
  rol: string;
  accesoTodasOrganizaciones: boolean;
}

export type EstadoComercialEmpresa = 'PENDIENTE' | 'ACTIVA' | 'SUSPENDIDA' | 'VENCIDA';

export interface EmpresaAdmin {
  id: number;
  nombre: string;
  activo: boolean;
  estadoComercial: EstadoComercialEmpresa;
  limiteEstablecimientos: number;
  fechaInicioComercial: string | null;
  fechaVencimiento: string | null;
  observacionesComerciales: string | null;
  createdAt: string;
  updatedAt: string;
  propietario: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
  establecimientos: Array<{
    id: number;
    nombre: string;
    plan: 'FREE' | 'PRO';
  }>;
  miembros: number;
}

export interface ActualizarComercialEmpresaDto {
  estadoComercial?: EstadoComercialEmpresa;
  limiteEstablecimientos?: number;
  fechaInicioComercial?: string;
  fechaVencimiento?: string;
  observacionesComerciales?: string | null;
}

export interface EmpresaComercialActualizada {
  id: number;
  nombre: string;
  estadoComercial: EstadoComercialEmpresa;
  limiteEstablecimientos: number;
  fechaInicioComercial: string | null;
  fechaVencimiento: string | null;
  observacionesComerciales: string | null;
}

export interface EstablecimientoDisponibleEmpresa {
  id: number;
  nombre: string;
  email: string;
  plan: 'FREE' | 'PRO';
}

export interface CrearEstablecimientoEmpresaDto {
  nombre: string;
  email: string;
}

export interface EstablecimientoEmpresa {
  id: number;
  nombre: string;
  plan: 'FREE' | 'PRO';
  propietarioId: number;
  hectareas: number;
}

export interface DashboardEmpresa {
  empresa: {
    id: number;
    nombre: string;
    establecimientos: number;
    limiteEstablecimientos: number;
    estadoComercial: EstadoComercialEmpresa;
    fechaInicioComercial: string | null;
    fechaVencimiento: string | null;
  };
  resumen: {
    superficieHa: number;
    campos: number;
    animales: number;
    maquinarias: number;
    miembros: number;
  };
  trabajos: {
    pendientes: number;
    enProgreso: number;
    pausadas: number;
    completadas: number;
    demoradas: number;
  };
}

export interface MiembroConsolidadoEmpresa {
  usuario: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
  establecimientos: Array<{ id: number; nombre: string; roles: string }>;
  trabajosActivos: number;
}

export interface ActividadConsolidadaEmpresa {
  id: number;
  titulo: string;
  descripcion: string | null;
  recursoTipo: string;
  recursoId: number | null;
  contexto: string | null;
  fechaInicio: string;
  fechaEstimadaFin: string;
  fechaRealFin: string | null;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'PAUSADA' | 'COMPLETADA' | 'CANCELADA';
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  activo: boolean;
  organizacion: { id: number; nombre: string };
  usuarioOrganizacion: { usuario: { id: number; nombre: string; apellido: string } };
}

export interface MaquinariaConsolidadaEmpresa {
  id: number;
  nombre: string;
  tipo: string;
  marca: string | null;
  modelo: string | null;
  patente: string | null;
  estado: 'OPERATIVA' | 'EN_MANTENIMIENTO' | 'FUERA_DE_SERVICIO';
  horasUso: number | null;
  organizacion: { id: number; nombre: string };
  campo: { id: number; nombre: string } | null;
}

export interface AnimalConsolidadoEmpresa {
  id: number;
  nombre: string;
  especie: string;
  sexo: string;
  categoria: string;
  peso: number | null;
  fechaNacimiento: string | null;
  organizacion: { id: number; nombre: string } | null;
}

export interface GanaderiaConsolidadaEmpresa {
  total: number;
  animales: AnimalConsolidadoEmpresa[];
}

export interface FiltrosEmpresa {
  organizacionId?: number;
  estado?: string;
  especie?: string;
  limite?: number;
}

export interface ResumenFinancieroEmpresa {
  ingresos: number;
  egresos: number;
  saldo: number;
  movimientos: number;
}

export interface FinanzasConsolidadasEmpresa {
  resumen: ResumenFinancieroEmpresa;
  porEstablecimiento: Array<ResumenFinancieroEmpresa & { id: number; nombre: string }>;
  egresosPorCategoria: Array<{ categoria: string; monto: number }>;
  evolucionMensual: Array<{ periodo: string; ingresos: number; egresos: number; saldo: number }>;
  movimientos: Array<{
    id: number;
    tipo: 'INGRESO' | 'EGRESO';
    concepto: string;
    monto: number;
    fecha: string;
    categoria: string;
    organizacionId: number | null;
    organizacion: { id: number; nombre: string } | null;
  }>;
}

export interface RentabilidadConsolidadaEmpresa {
  resumen: ResumenFinancieroEmpresa & { produccionKg: number; rentabilidad: number };
  porEstablecimiento: Array<ResumenFinancieroEmpresa & {
    id: number;
    nombre: string;
    produccionKg: number;
    rentabilidad: number;
  }>;
  campanias: Array<ResumenFinancieroEmpresa & {
    id: number;
    nombre: string;
    fechaInicio: string;
    fechaFin: string | null;
    organizacion: { id: number; nombre: string } | null;
    siembras: number;
    produccionKg: number;
    rentabilidad: number;
  }>;
}

export interface AuditoriaEmpresaRegistro {
  id: number;
  usuarioId: number;
  organizacionId: number | null;
  accion: string;
  entidad: string | null;
  entidadId: number | null;
  cambios: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  usuario: { id: number; nombre: string; apellido: string; email: string };
  organizacion: { id: number; nombre: string } | null;
}

export interface AuditoriaEmpresaResponse {
  registros: AuditoriaEmpresaRegistro[];
  total: number;
  limite: number;
  offset: number;
}

export interface FiltrosAuditoriaEmpresa {
  organizacionId?: number;
  accion?: string;
  usuarioId?: number;
  limite?: number;
  offset?: number;
}

export const empresasApi = {
  listarMias: () => api.get<EmpresaResumen[]>('/empresas/mias').then((response) => response.data),
  listarParaAdmin: () => api.get<EmpresaAdmin[]>('/empresas/admin/todas').then((response) => response.data),
  actualizarComercial: (empresaId: number, dto: ActualizarComercialEmpresaDto) =>
    api.patch<EmpresaComercialActualizada>('/empresas/admin/' + empresaId + '/comercial', dto).then((response) => response.data),
  listarOrganizacionesDisponiblesAdmin: (empresaId: number) =>
    api.get<EstablecimientoDisponibleEmpresa[]>('/empresas/admin/' + empresaId + '/organizaciones-disponibles').then((response) => response.data),
  vincularOrganizacionAdmin: (empresaId: number, organizacionId: number) =>
    api.post('/empresas/admin/' + empresaId + '/organizaciones', { organizacionId }).then((response) => response.data),
  crearEstablecimientoAdmin: (empresaId: number, dto: CrearEstablecimientoEmpresaDto) =>
    api.post('/empresas/admin/' + empresaId + '/establecimientos', dto).then((response) => response.data),
  desvincularOrganizacionAdmin: (empresaId: number, organizacionId: number) =>
    api.delete('/empresas/admin/' + empresaId + '/organizaciones/' + organizacionId).then((response) => response.data),
  obtenerDashboard: (empresaId: number) =>
    api.get<DashboardEmpresa>(`/empresas/${empresaId}/dashboard`).then((response) => response.data),
  obtenerOrganizaciones: (empresaId: number) =>
    api.get<EstablecimientoEmpresa[]>(`/empresas/${empresaId}/organizaciones`).then((response) => response.data),
  obtenerMiembrosConsolidados: (empresaId: number) =>
    api.get<MiembroConsolidadoEmpresa[]>(`/empresas/${empresaId}/miembros/consolidados`).then((response) => response.data),
  obtenerActividades: (empresaId: number, filtros: FiltrosEmpresa = {}) =>
    api.get<ActividadConsolidadaEmpresa[]>(`/empresas/${empresaId}/actividades`, { params: filtros }).then((response) => response.data),
  obtenerMaquinarias: (empresaId: number, filtros: FiltrosEmpresa = {}) =>
    api.get<MaquinariaConsolidadaEmpresa[]>(`/empresas/${empresaId}/maquinarias`, { params: filtros }).then((response) => response.data),
  obtenerGanaderia: (empresaId: number, filtros: FiltrosEmpresa = {}) =>
    api.get<GanaderiaConsolidadaEmpresa>(`/empresas/${empresaId}/ganaderia`, { params: filtros }).then((response) => response.data),
  obtenerFinanzas: (empresaId: number, filtros: FiltrosEmpresa = {}) =>
    api.get<FinanzasConsolidadasEmpresa>(`/empresas/${empresaId}/finanzas`, { params: filtros }).then((response) => response.data),
  obtenerRentabilidad: (empresaId: number, filtros: FiltrosEmpresa = {}) =>
    api.get<RentabilidadConsolidadaEmpresa>(`/empresas/${empresaId}/rentabilidad`, { params: filtros }).then((response) => response.data),
  obtenerAuditoria: (empresaId: number, filtros: FiltrosAuditoriaEmpresa = {}) =>
    api.get<AuditoriaEmpresaResponse>(`/empresas/${empresaId}/auditoria`, { params: filtros }).then((response) => response.data),
};
