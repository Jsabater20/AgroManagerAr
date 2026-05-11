import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Thermometer, Droplets, Wind, CloudRain, MapPin } from 'lucide-react';
import type { ComponentType } from 'react';

// ─── Regiones agrícolas de Argentina ──────────────────────────────────────────
const REGIONES = [
  { id: 1,  nombre: 'Buenos Aires',  lat: -34.6037, lon: -58.3816, zona: 'Pampeana' },
  { id: 2,  nombre: 'Córdoba',       lat: -31.4201, lon: -64.1888, zona: 'Pampeana' },
  { id: 3,  nombre: 'Rosario',       lat: -32.9468, lon: -60.6393, zona: 'Pampeana' },
  { id: 4,  nombre: 'Bahía Blanca',  lat: -38.7183, lon: -62.2663, zona: 'Sur' },
  { id: 5,  nombre: 'Mendoza',       lat: -32.8908, lon: -68.8272, zona: 'Cuyo' },
  { id: 6,  nombre: 'Tucumán',       lat: -26.8083, lon: -65.2176, zona: 'NOA' },
  { id: 7,  nombre: 'Salta',         lat: -24.7827, lon: -65.4232, zona: 'NOA' },
  { id: 8,  nombre: 'Santa Rosa',    lat: -36.6167, lon: -64.2833, zona: 'Pampeana' },
  { id: 9,  nombre: 'Resistencia',   lat: -27.4514, lon: -59.0731, zona: 'NEA' },
  { id: 10, nombre: 'Paraná',        lat: -31.7333, lon: -60.5333, zona: 'Litoral' },
  { id: 11, nombre: 'Posadas',       lat: -27.3671, lon: -55.8961, zona: 'NEA' },
  { id: 12, nombre: 'Mar del Plata', lat: -38.0023, lon: -57.5575, zona: 'Sur' },
  { id: 13, nombre: 'Santa Fe',      lat: -31.6333, lon: -60.7000, zona: 'Litoral' },
  { id: 14, nombre: 'La Rioja',      lat: -29.4130, lon: -66.8560, zona: 'NOA' },
  { id: 15, nombre: 'Neuquén',       lat: -38.9516, lon: -68.0591, zona: 'Patagonia' },
];

// ─── WMO weather codes → español + emoji ──────────────────────────────────────
export function wmoInfo(code: number): { label: string; emoji: string } {
  if (code === 0)                             return { label: 'Despejado',               emoji: '☀️' };
  if (code === 1)                             return { label: 'Mayormente despejado',    emoji: '🌤️' };
  if (code === 2)                             return { label: 'Parcialmente nublado',    emoji: '⛅' };
  if (code === 3)                             return { label: 'Nublado',                 emoji: '☁️' };
  if (code === 45 || code === 48)             return { label: 'Niebla',                  emoji: '🌫️' };
  if (code >= 51 && code <= 55)              return { label: 'Llovizna',                emoji: '🌦️' };
  if (code >= 61 && code <= 65)              return { label: 'Lluvia',                  emoji: '🌧️' };
  if (code >= 71 && code <= 75)              return { label: 'Nieve',                   emoji: '❄️' };
  if (code === 77)                            return { label: 'Granizo fino',             emoji: '🌨️' };
  if (code >= 80 && code <= 82)              return { label: 'Chubascos',               emoji: '🌦️' };
  if (code === 85 || code === 86)             return { label: 'Nevadas',                 emoji: '🌨️' };
  if (code === 95)                            return { label: 'Tormenta',                emoji: '⛈️' };
  if (code === 96 || code === 99)             return { label: 'Tormenta con granizo',    emoji: '⛈️' };
  return { label: 'Variable', emoji: '🌡️' };
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weather_code: number[];
  };
}

// ─── API ───────────────────────────────────────────────────────────────────────
async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,precipitation` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code` +
    `&timezone=America%2FArgentina%2FBuenos_Aires&forecast_days=7`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener clima');
  return res.json() as Promise<WeatherData>;
}

// ─── Day helper ────────────────────────────────────────────────────────────────
const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
function dayName(dateStr: string, isFirst: boolean): string {
  if (isFirst) return 'Hoy';
  const d = new Date(dateStr + 'T12:00:00');
  return DIAS[d.getDay()];
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ClimaPage() {
  const [regionId, setRegionId] = useState(1);
  const region = REGIONES.find((r) => r.id === regionId)!;

  const { data, isLoading, isError } = useQuery<WeatherData>({
    queryKey: ['weather', regionId],
    queryFn: () => fetchWeather(region.lat, region.lon),
    staleTime: 10 * 60 * 1000,
  });

  const current = data?.current;
  const daily   = data?.daily;
  const wmo     = current ? wmoInfo(current.weather_code) : null;

  const forecastData =
    daily?.time.map((t, i) => ({
      dia:  dayName(t, i === 0),
      max:  Math.round(daily.temperature_2m_max[i]),
      min:  Math.round(daily.temperature_2m_min[i]),
      prec: Math.round(daily.precipitation_sum[i] * 10) / 10,
      code: daily.weather_code[i],
    })) ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clima Agrícola</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Condiciones meteorológicas para zonas productivas · Open-Meteo
          </p>
        </div>
        <select
          value={regionId}
          onChange={(e) => setRegionId(Number(e.target.value))}
          className="input w-full sm:w-64"
        >
          {REGIONES.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre} — {r.zona}
            </option>
          ))}
        </select>
      </div>

      {/* Hero clima */}
      {isLoading && (
        <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 h-44 animate-pulse" />
      )}
      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-6 text-red-600 dark:text-red-400 text-sm">
          No se pudo obtener el clima. Verificá tu conexión a internet.
        </div>
      )}
      {!isLoading && !isError && current && wmo && (
        <>
          {/* Banner hero */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-700 via-blue-600 to-sky-500 shadow-lg text-white">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
            <div className="relative px-7 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 mb-2 opacity-80">
                  <MapPin size={13} />
                  <span className="text-sm">{region.nombre} · Zona {region.zona}</span>
                </div>
                <div className="flex items-end gap-4">
                  <span className="text-7xl font-bold leading-none">
                    {Math.round(current.temperature_2m)}°
                  </span>
                  <div>
                    <span className="text-4xl">{wmo.emoji}</span>
                    <p className="text-base font-medium mt-1">{wmo.label}</p>
                    <p className="text-sm opacity-70">
                      Sensación térmica: {Math.round(current.apparent_temperature)}°C
                    </p>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="flex sm:flex-col gap-3">
                <BannerStat icon={Droplets}  label="Humedad"       value={`${current.relative_humidity_2m}%`} />
                <BannerStat icon={Wind}      label="Viento"        value={`${Math.round(current.wind_speed_10m)} km/h`} />
                <BannerStat icon={CloudRain} label="Precipitación" value={`${current.precipitation} mm`} />
              </div>
            </div>
          </div>

          {/* 4 stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <WeatherCard icon={Thermometer} color="orange" label="Temperatura"    value={`${Math.round(current.temperature_2m)}°C`}          sub={`Sensación ${Math.round(current.apparent_temperature)}°C`} />
            <WeatherCard icon={Droplets}    color="blue"   label="Humedad"        value={`${current.relative_humidity_2m}%`}                  sub="Humedad relativa" />
            <WeatherCard icon={Wind}        color="purple" label="Viento"         value={`${Math.round(current.wind_speed_10m)} km/h`}         sub="Velocidad del viento" />
            <WeatherCard icon={CloudRain}   color="sky"    label="Precipitación"  value={`${current.precipitation} mm`}                       sub="Acumulado actual" />
          </div>
        </>
      )}

      {/* Pronóstico + Mapa */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 7-day forecast */}
        <div className="bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white">Pronóstico 7 días</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-5 mt-0.5">
            Temperaturas máx / mín · Precipitación esperada
          </p>

          {isLoading ? (
            <div className="h-52 bg-gray-100 dark:bg-gray-700 animate-pulse rounded-xl" />
          ) : forecastData.length > 0 ? (
            <>
              {/* Day cards */}
              <div className="grid grid-cols-7 gap-1 mb-5">
                {forecastData.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-gray-700/40"
                  >
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                      {d.dia}
                    </span>
                    <span className="text-lg">{wmoInfo(d.code).emoji}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{d.max}°</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{d.min}°</span>
                    {d.prec > 0 && (
                      <span className="text-[9px] text-blue-500 font-medium">{d.prec}mm</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={forecastData} barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis
                    dataKey="dia"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                    unit="°"
                  />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(v: any, n: any) => [`${Number(v)}°C`, n === 'max' ? 'Máxima' : 'Mínima']}
                    contentStyle={{
                      borderRadius: 10,
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      fontSize: 11,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11 }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(v: any) => (v === 'max' ? 'Máxima' : 'Mínima')}
                  />
                  <Bar dataKey="max" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="min" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : null}
        </div>

        {/* Mapa */}
        <div className="bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/40">
            <h2 className="font-semibold text-gray-900 dark:text-white">Mapa de Argentina</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Clic en un punto para ver el clima de esa región
            </p>
          </div>
          <div style={{ height: '500px' }}>
            <MapContainer
              center={[-38, -64]}
              zoom={4}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {REGIONES.map((r) => (
                <CircleMarker
                  key={r.id}
                  center={[r.lat, r.lon]}
                  radius={r.id === regionId ? 13 : 9}
                  pathOptions={{
                    color:       r.id === regionId ? '#16a34a' : '#2563eb',
                    fillColor:   r.id === regionId ? '#22c55e' : '#3b82f6',
                    fillOpacity: 0.85,
                    weight:      r.id === regionId ? 3 : 2,
                  }}
                  eventHandlers={{ click: () => setRegionId(r.id) }}
                >
                  <Popup>
                    <strong>{r.nombre}</strong><br />
                    Zona {r.zona}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-componentes ────────────────────────────────────────────────────────────

function BannerStat({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2 min-w-27.5">
      <Icon size={14} className="opacity-80 shrink-0" />
      <div>
        <p className="text-[10px] opacity-70">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

const WEATHER_COLORS: Record<string, { bg: string; icon: string }> = {
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/30', icon: 'text-orange-500' },
  blue:   { bg: 'bg-blue-50 dark:bg-blue-900/30',    icon: 'text-blue-500'   },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/30', icon: 'text-purple-500' },
  sky:    { bg: 'bg-sky-50 dark:bg-sky-900/30',       icon: 'text-sky-500'    },
};

function WeatherCard({
  icon: Icon,
  color,
  label,
  value,
  sub,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
  label: string;
  value: string;
  sub: string;
}) {
  const c = WEATHER_COLORS[color] ?? WEATHER_COLORS.blue;
  return (
    <div className="bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm p-4">
      <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
        <Icon size={15} className={c.icon} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{value}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
    </div>
  );
}
