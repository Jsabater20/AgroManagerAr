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

export const aiApi = {
  chat: (history: ChatMessage[], message: string) =>
    api
      .post<{ text: string }>('/ai/chat', { history, message })
      .then((r) => r.data.text),

  insights: () =>
    api
      .get<{ insights: AiInsight[] }>('/ai/insights')
      .then((r) => r.data.insights),
};
