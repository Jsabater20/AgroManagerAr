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
}

export const aiApi = {
  chat: (history: ChatMessage[], message: string) =>
    api
      .post<AgroBotRespuesta>('/ai/chat', { history, message })
      .then((r) => r.data),

  insights: () =>
    api
      .get<{ insights: AiInsight[] }>('/ai/insights')
      .then((r) => r.data.insights),
};
