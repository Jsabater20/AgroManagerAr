import type { PronosticoClima, RegionClima } from '@/types/clima';

export const getPronosticoClima = async (region: RegionClima) => {
  const search = new URLSearchParams({
    latitude: String(region.lat),
    longitude: String(region.lon),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,precipitation',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code',
    timezone: 'America/Argentina/Buenos_Aires',
    forecast_days: '7',
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${search.toString()}`);
  if (!response.ok) throw new Error('No pudimos obtener el pronóstico.');
  return response.json() as Promise<PronosticoClima>;
};
