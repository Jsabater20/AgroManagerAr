export type PronosticoClimaticoNormalizado = {
  proveedor: 'OPEN_METEO_COMMERCIAL';
  atribucion: string;
  zonaHoraria: string;
  actualizadoProveedorEn: string | null;
  actual: {
    fecha: string;
    temperaturaC: number | null;
    sensacionTermicaC: number | null;
    humedadRelativa: number | null;
    precipitacionMm: number | null;
    vientoKmh: number | null;
    rafagasKmh: number | null;
    codigoMeteorologico: number | null;
  } | null;
  diario: Array<{
    fecha: string;
    temperaturaMaxC: number | null;
    temperaturaMinC: number | null;
    precipitacionMm: number | null;
    probabilidadPrecipitacionMax: number | null;
    vientoMaxKmh: number | null;
    rafagasMaxKmh: number | null;
    codigoMeteorologico: number | null;
  }>;
};

export interface WeatherProvider {
  obtenerPronostico(latitud: number, longitud: number): Promise<PronosticoClimaticoNormalizado>;
}

type RespuestaOpenMeteo = {
  timezone?: string;
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    wind_speed_10m?: number;
    wind_gusts_10m?: number;
    weather_code?: number;
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_sum?: number[];
    precipitation_probability_max?: number[];
    wind_speed_10m_max?: number[];
    wind_gusts_10m_max?: number[];
    weather_code?: number[];
  };
};

const numero = (valor: unknown): number | null =>
  typeof valor === 'number' && Number.isFinite(valor) ? valor : null;

export class OpenMeteoCommercialProvider implements WeatherProvider {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl = 'https://customer-api.open-meteo.com/v1/forecast',
  ) {}

  async obtenerPronostico(
    latitud: number,
    longitud: number,
  ): Promise<PronosticoClimaticoNormalizado> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('apikey', this.apiKey);
    url.searchParams.set('latitude', String(latitud));
    url.searchParams.set('longitude', String(longitud));
    url.searchParams.set('timezone', 'America/Argentina/Buenos_Aires');
    url.searchParams.set('forecast_days', '7');
    url.searchParams.set(
      'current',
      'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,wind_gusts_10m,weather_code',
    );
    url.searchParams.set(
      'daily',
      'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,weather_code',
    );

    const respuesta = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!respuesta.ok) {
      throw new Error(`El proveedor meteorológico respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json() as RespuestaOpenMeteo;
    if (!datos.daily?.time?.length) {
      throw new Error('El proveedor meteorológico no devolvió un pronóstico válido');
    }

    return {
      proveedor: 'OPEN_METEO_COMMERCIAL',
      atribucion: 'Pronóstico provisto por Open-Meteo. Datos meteorológicos sujetos a atribución CC BY 4.0.',
      zonaHoraria: datos.timezone ?? 'America/Argentina/Buenos_Aires',
      actualizadoProveedorEn: datos.current?.time ?? null,
      actual: datos.current
        ? {
            fecha: datos.current.time ?? new Date().toISOString(),
            temperaturaC: numero(datos.current.temperature_2m),
            sensacionTermicaC: numero(datos.current.apparent_temperature),
            humedadRelativa: numero(datos.current.relative_humidity_2m),
            precipitacionMm: numero(datos.current.precipitation),
            vientoKmh: numero(datos.current.wind_speed_10m),
            rafagasKmh: numero(datos.current.wind_gusts_10m),
            codigoMeteorologico: numero(datos.current.weather_code),
          }
        : null,
      diario: datos.daily.time.map((fecha, indice) => ({
        fecha,
        temperaturaMaxC: numero(datos.daily?.temperature_2m_max?.[indice]),
        temperaturaMinC: numero(datos.daily?.temperature_2m_min?.[indice]),
        precipitacionMm: numero(datos.daily?.precipitation_sum?.[indice]),
        probabilidadPrecipitacionMax: numero(datos.daily?.precipitation_probability_max?.[indice]),
        vientoMaxKmh: numero(datos.daily?.wind_speed_10m_max?.[indice]),
        rafagasMaxKmh: numero(datos.daily?.wind_gusts_10m_max?.[indice]),
        codigoMeteorologico: numero(datos.daily?.weather_code?.[indice]),
      })),
    };
  }
}
