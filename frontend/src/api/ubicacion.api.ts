import { api } from './client';

export interface Provincia {
  id: string;
  nombre: string;
  centroide: { lat: number; lon: number };
}

export interface Localidad {
  id: string;
  nombre: string;
  centroide: { lat: number; lon: number };
}

export const ubicacionApi = {
  getProvincias: async (): Promise<Provincia[]> => {
    const { data } = await api.get('/ubicacion/provincias');
    return data.provincias;
  },

  getLocalidades: async (provinciaId: string): Promise<Localidad[]> => {
    const { data } = await api.get(`/ubicacion/localidades/${provinciaId}`);
    return data.localidades;
  },
};
