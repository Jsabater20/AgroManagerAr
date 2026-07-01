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

// Direct Georef calls (most reliable)
const getProvinciasFromGeoref = async (): Promise<Provincia[]> => {
  const res = await fetch(
    'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre,centroide&max=100&orden=nombre',
    { cache: 'force-cache' }
  );
  if (!res.ok) throw new Error('Georef unavailable');
  const data = await res.json();
  return data.provincias as Provincia[];
};

const getLocalidadesFromGeoref = async (provinciaId: string): Promise<Localidad[]> => {
  const res = await fetch(
    `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaId}&campos=id,nombre,centroide&max=1000&orden=nombre`,
    { cache: 'force-cache' }
  );
  if (!res.ok) throw new Error('Georef unavailable');
  const data = await res.json();
  return data.localidades as Localidad[];
};

export const ubicacionApi = {
  getProvincias: async (): Promise<Provincia[]> => {
    // Try backend first with short timeout, then fallback to Georef
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout
      
      try {
        const { data } = await api.get('/ubicacion/provincias', { signal: controller.signal });
        clearTimeout(timeoutId);
        if (data.provincias && data.provincias.length > 0) {
          return data.provincias;
        }
      } catch (e) {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      // Backend timeout or error, fall through to Georef
    }
    
    // Fallback to Georef
    return getProvinciasFromGeoref();
  },

  getLocalidades: async (provinciaId: string): Promise<Localidad[]> => {
    // Try backend first with short timeout, then fallback to Georef
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout
      
      try {
        const { data } = await api.get(`/ubicacion/localidades/${provinciaId}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (data.localidades && data.localidades.length > 0) {
          return data.localidades;
        }
      } catch (e) {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      // Backend timeout or error, fall through to Georef
    }
    
    // Fallback to Georef
    return getLocalidadesFromGeoref(provinciaId);
  },
};
