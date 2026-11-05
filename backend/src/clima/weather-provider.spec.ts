import { WeatherApiProvider } from './weather-provider';

describe('WeatherApiProvider', () => {
  const respuestaProveedor = {
    location: { tz_id: 'America/Argentina/Buenos_Aires' },
    current: {
      last_updated: '2026-11-04 10:30',
      temp_c: 23.4,
      feelslike_c: 24.1,
      humidity: 62,
      precip_mm: 0.4,
      wind_kph: 18,
      gust_kph: 29,
      condition: { code: 1276 },
    },
    forecast: {
      forecastday: [
        {
          date: '2026-11-04',
          day: {
            maxtemp_c: 27,
            mintemp_c: 16,
            totalprecip_mm: 11.2,
            daily_chance_of_rain: '85',
            maxwind_kph: 35,
            condition: { code: 1183 },
          },
        },
      ],
    },
  };

  afterEach(() => jest.restoreAllMocks());

  it('normaliza el pronóstico de WeatherAPI y limita la consulta al plan gratuito', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => respuestaProveedor,
    } as Response);

    const resultado = await new WeatherApiProvider('clave-prueba').obtenerPronostico(-34.2, -60.7);

    const url = fetchMock.mock.calls[0][0] as URL;
    expect(url.origin + url.pathname).toBe('https://api.weatherapi.com/v1/forecast.json');
    expect(url.searchParams.get('key')).toBe('clave-prueba');
    expect(url.searchParams.get('q')).toBe('-34.2,-60.7');
    expect(url.searchParams.get('days')).toBe('3');
    expect(resultado).toMatchObject({
      proveedor: 'WEATHERAPI',
      zonaHoraria: 'America/Argentina/Buenos_Aires',
      actual: { temperaturaC: 23.4, codigoMeteorologico: 95 },
      diario: [{ precipitacionMm: 11.2, probabilidadPrecipitacionMax: 85, codigoMeteorologico: 61 }],
    });
  });
});
