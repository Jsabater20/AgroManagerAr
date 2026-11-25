import { api } from './client';

export type EstadoSolicitudDigital =
  | 'NUEVA'
  | 'CONTACTADO'
  | 'EN_EVALUACION'
  | 'PRESUPUESTO_ENVIADO'
  | 'EN_NEGOCIACION'
  | 'PROYECTO_CONFIRMADO'
  | 'EN_DESARROLLO'
  | 'FINALIZADO'
  | 'ARCHIVADO';

export interface SeguimientoSolicitudDigital {
  id: number;
  administrador: string;
  detalle: string;
  createdAt: string;
}

export interface SolicitudAgroManagerDigital {
  id: number;
  nombre: string;
  establecimiento: string;
  email: string;
  telefono: string;
  provincia: string;
  localidad: string;
  actividad: string;
  servicio: string;
  tipoProyecto: 'ESTABLECIMIENTO' | 'PROFESIONAL_COMERCIAL' | 'SOFTWARE_A_MEDIDA';
  tieneSitioWeb: boolean;
  descripcion: string;
  informacionPublicar: string[];
  requiereCatalogo: boolean;
  administraContenido: boolean;
  tieneIdentidadVisual: boolean;
  tieneDominioPropio: boolean;
  requiereMantenimiento: boolean;
  referenciaUrl: string | null;
  funcionalidadesPersonalizadas: string | null;
  presupuesto: string | null;
  fechaInicio: string | null;
  comentarios: string | null;
  estado: EstadoSolicitudDigital;
  observacionesInternas: string | null;
  presupuestoEnviado: string | null;
  createdAt: string;
  updatedAt: string;
  seguimientos: SeguimientoSolicitudDigital[];
}

export interface SolicitudesDigitalResponse {
  items: SolicitudAgroManagerDigital[];
  total: number;
  resumen: Partial<Record<EstadoSolicitudDigital, number>>;
}

export interface ActualizarSolicitudDigital {
  estado?: EstadoSolicitudDigital;
  observacionesInternas?: string | null;
  presupuestoEnviado?: string | null;
  seguimiento?: string;
}

export type SolicitudAgroManagerDigitalExport = SolicitudAgroManagerDigital;

export type EventoAgroManagerDigital =
  | 'VISITA'
  | 'CLICK_PRESUPUESTO'
  | 'CLICK_WHATSAPP'
  | 'FORMULARIO_INICIADO'
  | 'FORMULARIO_ENVIADO';

export interface AnaliticaAgroManagerDigital {
  desde: string;
  dias: number;
  visitas: number;
  clicsPresupuesto: number;
  clicsWhatsApp: number;
  formulariosIniciados: number;
  solicitudesEnviadas: number;
  origenes: Array<{ nombre: string; cantidad: number }>;
  medios: Array<{ nombre: string; cantidad: number }>;
  campanias: Array<{ nombre: string; cantidad: number }>;
}

export const agroManagerDigitalApi = {
  listar: (buscar?: string, estado?: EstadoSolicitudDigital): Promise<SolicitudesDigitalResponse> =>
    api.get('/agromanager-digital/admin/solicitudes', { params: { buscar, estado } }).then((response) => response.data),
  actualizar: (id: number, datos: ActualizarSolicitudDigital): Promise<SolicitudAgroManagerDigital> =>
    api.patch(`/agromanager-digital/admin/solicitudes/${id}`, datos).then((response) => response.data),
  exportar: (buscar?: string, estado?: EstadoSolicitudDigital): Promise<SolicitudAgroManagerDigitalExport[]> =>
    api.get('/agromanager-digital/admin/solicitudes/exportar', { params: { buscar, estado } }).then((response) => response.data),
  registrarEvento: (tipo: EventoAgroManagerDigital, origen: string, medio?: string, campania?: string): Promise<{ ok: boolean }> =>
    api.post('/agromanager-digital/eventos', { tipo, origen, medio, campania }).then((response) => response.data),
  analitica: (): Promise<AnaliticaAgroManagerDigital> =>
    api.get('/agromanager-digital/admin/analitica').then((response) => response.data),
};
