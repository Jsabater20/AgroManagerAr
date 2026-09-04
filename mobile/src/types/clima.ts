export interface RegionClima {
  id: number;
  nombre: string;
  zona: string;
  lat: number;
  lon: number;
}

export const REGIONES_CLIMA: RegionClima[] = [
  { id: 1, nombre: 'Buenos Aires', zona: 'Pampeana', lat: -34.6037, lon: -58.3816 },
  { id: 2, nombre: 'Córdoba', zona: 'Pampeana', lat: -31.4201, lon: -64.1888 },
  { id: 3, nombre: 'Rosario', zona: 'Pampeana', lat: -32.9468, lon: -60.6393 },
  { id: 4, nombre: 'Bahía Blanca', zona: 'Sur', lat: -38.7183, lon: -62.2663 },
  { id: 5, nombre: 'Mendoza', zona: 'Cuyo', lat: -32.8908, lon: -68.8272 },
  { id: 6, nombre: 'Tucumán', zona: 'NOA', lat: -26.8083, lon: -65.2176 },
  { id: 7, nombre: 'Salta', zona: 'NOA', lat: -24.7827, lon: -65.4232 },
  { id: 8, nombre: 'Santa Rosa', zona: 'Pampeana', lat: -36.6167, lon: -64.2833 },
  { id: 9, nombre: 'Resistencia', zona: 'NEA', lat: -27.4514, lon: -59.0731 },
  { id: 10, nombre: 'Paraná', zona: 'Litoral', lat: -31.7333, lon: -60.5333 },
  { id: 11, nombre: 'Posadas', zona: 'NEA', lat: -27.3671, lon: -55.8961 },
  { id: 12, nombre: 'Mar del Plata', zona: 'Sur', lat: -38.0023, lon: -57.5575 },
  { id: 13, nombre: 'Santa Fe', zona: 'Litoral', lat: -31.6333, lon: -60.7 },
  { id: 14, nombre: 'La Rioja', zona: 'NOA', lat: -29.413, lon: -66.856 },
  { id: 15, nombre: 'Neuquén', zona: 'Patagonia', lat: -38.9516, lon: -68.0591 },
];

export interface ClimaActual {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  precipitation: number;
}

export interface ClimaDiario {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weather_code: number[];
}

export interface PronosticoClima {
  current: ClimaActual;
  daily: ClimaDiario;
}

export const climaInfo = (code: number): { label: string; icon: string } => {
  if (code === 0) return { label: 'Despejado', icon: '☀️' };
  if (code === 1) return { label: 'Mayormente despejado', icon: '🌤️' };
  if (code === 2) return { label: 'Parcialmente nublado', icon: '⛅' };
  if (code === 3) return { label: 'Nublado', icon: '☁️' };
  if (code === 45 || code === 48) return { label: 'Niebla', icon: '🌫️' };
  if (code >= 51 && code <= 55) return { label: 'Llovizna', icon: '🌦️' };
  if (code >= 61 && code <= 65) return { label: 'Lluvia', icon: '🌧️' };
  if (code >= 71 && code <= 75) return { label: 'Nieve', icon: '❄️' };
  if (code >= 80 && code <= 82) return { label: 'Chubascos', icon: '🌦️' };
  if (code >= 95) return { label: 'Tormenta', icon: '⛈️' };
  return { label: 'Variable', icon: '🌡️' };
};
