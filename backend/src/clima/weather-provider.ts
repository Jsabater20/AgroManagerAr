export type PronosticoClimaticoNormalizado = {
  proveedor: 'WEATHERAPI';
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

type RespuestaWeatherApi = {
  location?: {
    tz_id?: string;
  };
  current?: {
    last_updated?: string;
    temp_c?: number;
    feelslike_c?: number;
    humidity?: number;
    precip_mm?: number;
    wind_kph?: number;
    gust_kph?: number;
    condition?: { code?: number };
  };
  forecast?: {
    forecastday?: Array<{
      date?: string;
      day?: {
        maxtemp_c?: number;
        mintemp_c?: number;
        totalprecip_mm?: number;
        daily_chance_of_rain?: number | string;
        maxwind_kph?: number;
        condition?: { code?: number };
      };
    }>;
  };
};

const numero = (valor: unknown): number | null => {
  if (typeof valor === 'number' && Number.isFinite(valor)) return valor;
  if (typeof valor === 'string' && valor.trim() && Number.isFinite(Number(valor))) return Number(valor);
  return null;
};

const CODIGOS_TORMENTA = new Set([1087, 1273, 1276, 1279, 1282]);
const CODIGOS_NIEVE = new Set([
  1066, 1069, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237,
  1249, 1252, 1255, 1258, 1261, 1264,
]);
const CODIGOS_LLUVIOSOS = new Set([
  1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192,
  1195, 1198, 1201, 1204, 1207, 1240, 1243, 1246,
]);

function codigoWeatherApiAWmo(codigo: number | undefined): number | null {
  if (codigo === undefined) return null;
  if (codigo === 1000) return 0;
  if (codigo === 1003) return 2;
  if (codigo === 1006 || codigo === 1009) return 3;
  if (codigo === 1030 || codigo === 1135 || codigo === 1147) return 45;
  if (CODIGOS_TORMENTA.has(codigo)) return 95;
  if (CODIGOS_NIEVE.has(codigo)) return 71;
  if (CODIGOS_LLUVIOSOS.has(codigo)) return 61;
  return null;
}

export class WeatherApiProvider implements WeatherProvider {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl = 'https://api.weatherapi.com/v1/forecast.json',
  ) {}

  async obtenerPronostico(
    latitud: number,
    longitud: number,
  ): Promise<PronosticoClimaticoNormalizado> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('key', this.apiKey);
    url.searchParams.set('q', `${latitud},${longitud}`);
    url.searchParams.set('days', '3');
    url.searchParams.set('aqi', 'no');
    url.searchParams.set('alerts', 'no');
    url.searchParams.set('lang', 'es');

    const respuesta = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!respuesta.ok) {
      throw new Error(`El proveedor meteorológico respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json() as RespuestaWeatherApi;
    const pronostico = datos.forecast?.forecastday;
    if (!pronostico?.length) {
      throw new Error('El proveedor meteorológico no devolvió un pronóstico válido');
    }

    return {
      proveedor: 'WEATHERAPI',
      atribucion: 'Pronóstico provisto por WeatherAPI.com.',
      zonaHoraria: datos.location?.tz_id ?? 'America/Argentina/Buenos_Aires',
      actualizadoProveedorEn: datos.current?.last_updated ?? null,
      actual: datos.current
        ? {
            fecha: datos.current.last_updated ?? new Date().toISOString(),
            temperaturaC: numero(datos.current.temp_c),
            sensacionTermicaC: numero(datos.current.feelslike_c),
            humedadRelativa: numero(datos.current.humidity),
            precipitacionMm: numero(datos.current.precip_mm),
            vientoKmh: numero(datos.current.wind_kph),
            rafagasKmh: numero(datos.current.gust_kph),
            codigoMeteorologico: codigoWeatherApiAWmo(datos.current.condition?.code),
          }
        : null,
      diario: pronostico.map((dia) => ({
        fecha: dia.date ?? new Date().toISOString().slice(0, 10),
        temperaturaMaxC: numero(dia.day?.maxtemp_c),
        temperaturaMinC: numero(dia.day?.mintemp_c),
        precipitacionMm: numero(dia.day?.totalprecip_mm),
        probabilidadPrecipitacionMax: numero(dia.day?.daily_chance_of_rain),
        vientoMaxKmh: numero(dia.day?.maxwind_kph),
        rafagasMaxKmh: null,
        codigoMeteorologico: codigoWeatherApiAWmo(dia.day?.condition?.code),
      })),
    };
  }
}
