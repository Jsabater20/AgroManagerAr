import { api } from './client';

export type CategoriaNovedadProducto =
  | 'GENERAL'
  | 'FUNCIONALIDAD'
  | 'CLIMA'
  | 'ALERTAS'
  | 'AGROBOT'
  | 'REPORTES'
  | 'EMPRESAS'
  | 'SEGURIDAD';

export type EstadoNovedadProducto = 'BORRADOR' | 'PUBLICADA';

export interface NovedadProducto {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: CategoriaNovedadProducto;
  version: string | null;
  destacada: boolean;
  publicadaEn: string;
  leida: boolean;
  leidaEn: string | null;
}

export interface NovedadProductoAdmin {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: CategoriaNovedadProducto;
  estado: EstadoNovedadProducto;
  version: string | null;
  destacada: boolean;
  publicadaEn: string | null;
  notificadaEn: string | null;
  createdAt: string;
  updatedAt: string;
  creadoPor: { id: number; nombre: string; apellido: string; email: string } | null;
  _count: { lecturas: number };
}

export interface NovedadProductoInput {
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: CategoriaNovedadProducto;
  version?: string;
  destacada: boolean;
}

export interface ResumenNovedades {
  total: number;
  sinLeer: number;
  ultima: Omit<NovedadProducto, 'leida' | 'leidaEn'> | null;
}

export interface VistaPreviaCorreoNovedad {
  asunto: string;
  html: string;
  destinatariosElegibles: number;
  envioHabilitado: boolean;
}

export interface ResumenEnvioCorreoNovedad {
  destinatariosElegibles: number;
  enviados: number;
  errores: number;
  pendientes: number;
  envioHabilitado: boolean;
}

export const novedadesApi = {
  listar: (): Promise<NovedadProducto[]> =>
    api.get('/novedades').then((response) => response.data),
  resumen: (): Promise<ResumenNovedades> =>
    api.get('/novedades/resumen').then((response) => response.data),
  marcarLeida: (id: string): Promise<{ ok: boolean }> =>
    api.post(`/novedades/${id}/lectura`).then((response) => response.data),
  listarParaAdmin: (): Promise<NovedadProductoAdmin[]> =>
    api.get('/novedades/admin/todas').then((response) => response.data),
  crear: (datos: NovedadProductoInput): Promise<NovedadProductoAdmin> =>
    api.post('/novedades/admin', datos).then((response) => response.data),
  actualizar: (id: string, datos: NovedadProductoInput): Promise<NovedadProductoAdmin> =>
    api.patch(`/novedades/admin/${id}`, datos).then((response) => response.data),
  publicar: (id: string): Promise<{
    novedad: NovedadProductoAdmin;
    destinatariosNotificados: number;
    yaPublicada: boolean;
  }> => api.post(`/novedades/admin/${id}/publicar`).then((response) => response.data),
  previsualizarCorreo: (id: string): Promise<VistaPreviaCorreoNovedad> =>
    api.get(`/novedades/admin/${id}/preview-email`).then((response) => response.data),
  resumenEnvioCorreo: (id: string): Promise<ResumenEnvioCorreoNovedad> =>
    api.get(`/novedades/admin/${id}/resumen-envio-email`).then((response) => response.data),
  enviarCorreoPrueba: (id: string, email?: string): Promise<{ ok: boolean; destinatario: string }> =>
    api.post(`/novedades/admin/${id}/email-prueba`, email ? { email } : {}).then((response) => response.data),
  desuscribirDeNovedades: (usuarioId: number, firma: string): Promise<{ ok: boolean }> =>
    api.post('/novedades-publicas/desuscribir', { usuarioId, firma }).then((response) => response.data),
  enviarCorreos: (id: string): Promise<{ enviados: number; omitidos: number; errores: number }> =>
    api.post(`/novedades/admin/${id}/enviar-emails`, { confirmar: true }).then((response) => response.data),
};
