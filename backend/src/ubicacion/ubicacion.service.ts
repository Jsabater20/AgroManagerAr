import { Injectable, Logger } from '@nestjs/common';

interface Provincia {
  id: string;
  nombre: string;
  centroide: { lat: number; lon: number };
}

interface Localidad {
  id: string;
  nombre: string;
  centroide: { lat: number; lon: number };
}

@Injectable()
export class UbicacionService {
  private readonly logger = new Logger(UbicacionService.name);
  private provinciasCache: Provincia[] | null = null;
  private localidadesCache: Map<string, Localidad[]> = new Map();

  async getProvincias(): Promise<Provincia[]> {
    if (this.provinciasCache) {
      return this.provinciasCache;
    }

    try {
      const res = await fetch(
        'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre,centroide&max=100&orden=nombre',
      );
      const data = await res.json();
      this.provinciasCache = data.provincias as Provincia[];
      return this.provinciasCache;
    } catch (error) {
      this.logger.error('Error fetching provincias from Georef', error);
      return [];
    }
  }

  async getLocalidades(provinciaId: string): Promise<Localidad[]> {
    if (this.localidadesCache.has(provinciaId)) {
      return this.localidadesCache.get(provinciaId) || [];
    }

    try {
      const res = await fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaId}&campos=id,nombre,centroide&max=1000&orden=nombre`,
      );
      const data = await res.json();
      const localidades = data.localidades as Localidad[];
      this.localidadesCache.set(provinciaId, localidades);
      return localidades;
    } catch (error) {
      this.logger.error(
        `Error fetching localidades for provincia ${provinciaId}`,
        error,
      );
      return [];
    }
  }
}
