import { api } from './client';

export type EstadoCampaniaPromocional = 'BORRADOR' | 'ACTIVA' | 'PAUSADA' | 'FINALIZADA';

export interface CampaniaLanzamiento {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  estado: EstadoCampaniaPromocional;
  inicioNuevosRegistros: string;
  finNuevosRegistros: string;
  duracionMeses: number;
  incluyeOrganizacionesEmpresa: boolean;
  mostrarEnSitio: boolean;
  activadaEn: string | null;
  createdAt: string;
  _count: { asignaciones: number };
}

export interface SimulacionLanzamiento {
  fechaInicio: string;
  fechaFin: string;
  usuariosElegibles: number;
  organizacionesElegibles: number;
  usuariosYaAsignados: number;
  usuariosOmitidos: number;
  esEstimacion: boolean;
}

export interface EstadoLanzamiento {
  campania: CampaniaLanzamiento | null;
  simulacion?: SimulacionLanzamiento;
  resumen?: ResumenLanzamiento;
}

export interface ResumenLanzamiento {
  total: number;
  otorgadas: number;
  omitidas: number;
  porRegistro: number;
  porExistentes: number;
}

export interface ResultadoAsignacionExistentes {
  procesados: number;
  asignados: number;
  omitidos: number;
  existentes: number;
  fechaInicio: string;
}

export interface PromocionLanzamientoPublica {
  nombre: string;
  codigo: string;
  finNuevosRegistros: string;
  duracionMeses: number;
}

export interface MiPromocion {
  asignacionId: number;
  origen: 'EXISTENTE' | 'REGISTRO' | 'MANUAL';
  bienvenidaVistaEn: string | null;
  fechaInicio: string;
  fechaFin: string;
  diasRestantes: number;
  campania: {
    codigo: string;
    nombre: string;
  };
}

export const promocionesApi = {
  obtenerLanzamientoPublico: (): Promise<PromocionLanzamientoPublica | null> =>
    api.get('/promociones/lanzamiento').then((response) => response.data),
  obtenerMiPromocion: (organizacionId: number): Promise<MiPromocion | null> =>
    api.get('/promociones/mi-promocion', { params: { organizacionId } }).then((response) => response.data),
  marcarBienvenidaVista: (asignacionId: number): Promise<{ ok: boolean }> =>
    api.post(`/promociones/mis-asignaciones/${asignacionId}/bienvenida-vista`).then((response) => response.data),
  obtenerLanzamiento: (): Promise<EstadoLanzamiento> =>
    api.get('/promociones/admin/lanzamiento').then((response) => response.data),
  crearBorradorLanzamiento: (): Promise<CampaniaLanzamiento> =>
    api.post('/promociones/admin/lanzamiento/borrador').then((response) => response.data),
  activarLanzamiento: (id: number): Promise<CampaniaLanzamiento> =>
    api.post(`/promociones/admin/${id}/activar`).then((response) => response.data),
  pausarLanzamiento: (id: number): Promise<CampaniaLanzamiento> =>
    api.post(`/promociones/admin/${id}/pausar`).then((response) => response.data),
  asignarUsuariosExistentes: (id: number): Promise<ResultadoAsignacionExistentes> =>
    api.post(`/promociones/admin/${id}/asignar-existentes`, { confirmar: true }).then((response) => response.data),
};
