import { api } from './client';

export interface AlertaOperativa {
  id: string;
  tipo:
    | 'TRABAJO_VENCIDO'
    | 'TRABAJO_SIN_INICIAR'
    | 'TRABAJO_COMIENZA_HOY'
    | 'TRABAJO_PROXIMO_A_VENCER'
    | 'ACTIVIDAD_COMPLETADA_SIN_COSTO_REAL'
    | 'MAQUINARIA_MANTENIMIENTO_VENCIDO'
    | 'MAQUINARIA_MANTENIMIENTO_PROXIMO'
    | 'MAQUINARIA_SEGURO_VENCIDO'
    | 'MAQUINARIA_SEGURO_PROXIMO_A_VENCER'
    | 'MAQUINARIA_VTV_VENCIDA'
    | 'MAQUINARIA_VTV_PROXIMA_A_VENCER'
    | 'COSTO_SUPERA_ESTIMADO'
    | 'CLIMA_TORMENTA'
    | 'CLIMA_HELADA'
    | 'CLIMA_CALOR_EXTREMO'
    | 'CLIMA_LLUVIA_INTENSA'
    | 'CLIMA_LLUVIA_ACUMULADA'
    | 'CLIMA_PROBABILIDAD_LLUVIA'
    | 'CLIMA_VIENTO_FUERTE';
  severidad: 'ADVERTENCIA' | 'CRITICA';
  titulo: string;
  mensaje: string;
  enlace: string;
  organizacionId: number;
}

export type EstadoAlertaGestion = 'ACTIVA' | 'REVISADA' | 'RESUELTA';
export type SeveridadAlertaGestion = 'INFORMATIVA' | 'ATENCION' | 'PRIORITARIA';

export interface AlertaGestion {
  id: string;
  clave: string;
  tipo: AlertaOperativa['tipo'];
  severidad: SeveridadAlertaGestion;
  estado: EstadoAlertaGestion;
  titulo: string;
  mensaje: string;
  enlace: string;
  origenTipo: string;
  origenId: string;
  actividadMiembroId: number | null;
  ciclo: number;
  detectadaEn: string;
  ultimaEvaluacionEn: string;
  revisadaEn: string | null;
  resueltaEn: string | null;
  createdAt: string;
  updatedAt: string;
  leida: boolean;
}

export interface ResumenAlertasGestion {
  total: number;
  prioritarias: number;
  sinLeer: number;
}

export interface PreferenciasAlertas {
  id?: number;
  usuarioId?: number;
  organizacionId?: number;
  alertasActivas: boolean;
  notificacionEnApp: boolean;
  notificacionPush: boolean;
  notificacionEmail: boolean;
  soloPrioritarias: boolean;
  alertasClimaActivas: boolean;
  emailVerificado: boolean;
}

export type ActualizarPreferenciasAlertas = Partial<Pick<
  PreferenciasAlertas,
  'alertasActivas' | 'notificacionEnApp' | 'notificacionPush' | 'notificacionEmail' | 'soloPrioritarias' | 'alertasClimaActivas'
>>;

export const alertasApi = {
  listar: (): Promise<AlertaOperativa[]> =>
    api.get('/alertas').then((response) => response.data),
  listarGestion: (filtro: {
    estado?: EstadoAlertaGestion;
    severidad?: SeveridadAlertaGestion;
  } = {}): Promise<AlertaGestion[]> =>
    api.get('/alertas/gestion', { params: filtro }).then((response) => response.data),
  resumenGestion: (): Promise<ResumenAlertasGestion> =>
    api.get('/alertas/gestion/resumen').then((response) => response.data),
  marcarGestionLeida: (id: string): Promise<{ ok: boolean }> =>
    api.patch(`/alertas/gestion/${id}/leida`).then((response) => response.data),
  revisarGestion: (id: string): Promise<{ ok: boolean }> =>
    api.patch(`/alertas/gestion/${id}/revisada`).then((response) => response.data),
  crearTareaClimatica: (
    id: string,
    datos: { usuarioOrganizacionId: number; fechaInicio?: string; observacion?: string },
  ) => api.post(`/alertas/gestion/${id}/tarea-climatica`, datos).then((response) => response.data),
  preferencias: (): Promise<PreferenciasAlertas> =>
    api.get('/alertas/preferencias').then((response) => response.data),
  actualizarPreferencias: (datos: ActualizarPreferenciasAlertas): Promise<PreferenciasAlertas> =>
    api.patch('/alertas/preferencias', datos).then((response) => response.data),
};
