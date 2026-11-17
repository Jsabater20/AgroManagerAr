import { api } from './client';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AiInsight {
  tipo: 'warning' | 'info' | 'success' | 'tip';
  titulo: string;
  texto: string;
}

export interface AgroBotIndicador {
  etiqueta: string;
  valor: string;
  detalle?: string;
}

export interface AgroBotReferencia {
  etiqueta: string;
  href: string;
}

export interface AgroBotRespuesta {
  text: string;
  indicadores: AgroBotIndicador[];
  referencias: AgroBotReferencia[];
  basadaEnDatos: boolean;
  accion: PropuestaAccionAgroBot | null;
}

export interface PropuestaCrearCampoAgroBot {
  tipo: 'CREAR_CAMPO_CON_LOTES';
  estado: 'LISTA_PARA_CONFIRMAR' | 'FALTAN_DATOS' | 'REQUIERE_REVISION' | 'SIN_PERMISO';
  sePuedeConfirmar: boolean;
  titulo: string;
  campo: {
    nombre: string | null;
    hectareas: number | null;
    actividadesDetectadas: string[];
  };
  lotes: Array<{
    nombre: string | null;
    hectareas: number | null;
  }>;
  faltantes: string[];
  advertencias: string[];
  lectura: {
    organizacionNombre: string;
    camposVisibles: number;
    coincidencias: string[];
  };
}

export interface PropuestaCrearTrabajoAgroBot {
  tipo: 'CREAR_TRABAJO';
  estado: 'LISTA_PARA_CONFIRMAR' | 'FALTAN_DATOS' | 'SIN_PERMISO';
  sePuedeConfirmar: boolean;
  titulo: string;
  trabajo: {
    titulo: string | null;
    responsable: { id: number; nombre: string } | null;
    campo: { id: number; nombre: string } | null;
    fechaInicio: string | null;
    prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  };
  faltantes: string[];
  lectura: { organizacionNombre: string; miembrosDisponibles: number };
}

export type PropuestaAccionAgroBot = PropuestaCrearCampoAgroBot | PropuestaCrearTrabajoAgroBot;

export interface CampoCreadoDesdeAgroBot {
  id: number;
  campo: {
    id: number;
    nombre: string;
    hectareas: number;
    lotes: Array<{ id: number; nombre: string; hectareas: number }>;
  };
  referencia: AgroBotReferencia;
}

export interface TrabajoCreadoDesdeAgroBot {
  id: number;
  trabajo: { id: number; titulo: string };
  referencia: AgroBotReferencia;
}

export const aiApi = {
  chat: (history: ChatMessage[], message: string) =>
    api
      .post<AgroBotRespuesta>('/ai/chat', { history, message })
      .then((r) => r.data),

  confirmarCreacionCampo: (input: {
    idempotencyKey: string;
    campo: { nombre: string; hectareas: number };
    actividades?: Array<'AGRICOLA' | 'GANADERIA'>;
    lotes: Array<{ nombre: string; hectareas: number }>;
  }) =>
    api
      .post<CampoCreadoDesdeAgroBot>('/ai/acciones/crear-campo', input)
      .then((r) => r.data),

  confirmarCreacionTrabajo: (input: {
    idempotencyKey: string;
    titulo: string;
    usuarioOrganizacionId: number;
    recursoTipo: 'CAMPO' | 'GENERAL';
    recursoId?: number;
    fechaInicio: string;
    prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  }) =>
    api
      .post<TrabajoCreadoDesdeAgroBot>('/ai/acciones/crear-trabajo', input)
      .then((r) => r.data),

  insights: () =>
    api
      .get<{ insights: AiInsight[] }>('/ai/insights')
      .then((r) => r.data.insights),
};
