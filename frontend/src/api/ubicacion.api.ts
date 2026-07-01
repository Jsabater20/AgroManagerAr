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

// Fallback directo a Georef si el backend no responde
const getProvinciasFromGeoref = async (): Promise<Provincia[]> => {
  const res = await fetch(
    'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre,centroide&max=100&orden=nombre',
  );
  const data = await res.json();
  return data.provincias as Provincia[];
};

const getLocalidadesFromGeoref = async (provinciaId: string): Promise<Localidad[]> => {
  const res = await fetch(
    `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaId}&campos=id,nombre,centroide&max=1000&orden=nombre`,
  );
  const data = await res.json();
  return data.localidades as Localidad[];
};

export const ubicacionApi = {
  getProvincias: async (): Promise<Provincia[]> => {
    try {
      const { data } = await api.get('/ubicacion/provincias');
      return data.provincias || [];
    } catch (error) {
      console.warn('Backend ubicacion unavailable, fallback to Georef:', error);
      return getProvinciasFromGeoref();
    }
  },

  getLocalidades: async (provinciaId: string): Promise<Localidad[]> => {
    try {
      const { data } = await api.get(`/ubicacion/localidades/${provinciaId}`);
      return data.localidades || [];
    } catch (error) {
      console.warn('Backend ubicacion unavailable, fallback to Georef:', error);
      return getLocalidadesFromGeoref(provinciaId);
    }
  },
};
