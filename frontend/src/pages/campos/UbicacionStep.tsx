import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Loader2, MapPin } from 'lucide-react';

// ── Fix Leaflet default marker icons en Vite ──────────────────────────────────
L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.4/dist/images/';

// ── Tipos Georef API ──────────────────────────────────────────────────────────
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

// ── Subcomponentes del mapa ───────────────────────────────────────────────────
function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng.lat, e.latlng.lng) });
  return null;
}

function MapCenterer({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng], zoom); }, [lat, lng, zoom, map]);
  return null;
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  provincia: string;
  setProvincia: (v: string) => void;
  localidad: string;
  setLocalidad: (v: string) => void;
  ubicacion: string;
  setUbicacion: (v: string) => void;
  latitud: number | null;
  setLatitud: (v: number | null) => void;
  longitud: number | null;
  setLongitud: (v: number | null) => void;
  gpsLoading: boolean;
  onGps: () => void;
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function UbicacionStep({
  provincia, setProvincia,
  localidad, setLocalidad,
  ubicacion, setUbicacion,
  latitud, setLatitud,
  longitud, setLongitud,
  gpsLoading, onGps,
}: Props) {
  const [mode, setMode] = useState<'gps' | 'mapa'>('gps');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number; zoom: number }>({
    lat: -38.5,
    lng: -63.5,
    zoom: 4,
  });

  // ── Provincias (una sola carga) ─────────────────────────────────────────────
  const { data: provincias } = useQuery<Provincia[]>({
    queryKey: ['georef-provincias'],
    queryFn: async () => {
      const res = await fetch(
        'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre,centroide&max=100&orden=nombre',
      );
      const data = await res.json();
      return data.provincias as Provincia[];
    },
    staleTime: Infinity,
  });

  // ── Localidades según provincia ─────────────────────────────────────────────
  const { data: localidades, isLoading: loadingLocalidades } = useQuery<Localidad[]>({
    queryKey: ['georef-localidades', provincia],
    queryFn: async () => {
      const prov = provincias?.find((p) => p.nombre === provincia);
      if (!prov) return [];
      const res = await fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${prov.id}&campos=id,nombre,centroide&max=1000&orden=nombre`,
      );
      const data = await res.json();
      return data.localidades as Localidad[];
    },
    enabled: !!provincia && !!provincias,
    staleTime: 5 * 60 * 1000,
  });

  // ── Handlers de selección ───────────────────────────────────────────────────
  const handleProvinciaChange = (nombre: string) => {
    setProvincia(nombre);
    setLocalidad('');
    setUbicacion(nombre);
    const prov = provincias?.find((p) => p.nombre === nombre);
    if (prov) setMapCenter({ lat: prov.centroide.lat, lng: prov.centroide.lon, zoom: 7 });
  };

  const handleLocalidadChange = (nombre: string) => {
    setLocalidad(nombre);
    const loc = localidades?.find((l) => l.nombre === nombre);
    if (loc) {
      setMapCenter({ lat: loc.centroide.lat, lng: loc.centroide.lon, zoom: 13 });
      setUbicacion(`${nombre}, ${provincia}`);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setLatitud(lat);
    setLongitud(lng);
  };

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      {/* Provincia */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Provincia</label>
        <select
          value={provincia}
          onChange={(e) => handleProvinciaChange(e.target.value)}
          className="input"
        >
          <option value="">Seleccioná una provincia</option>
          {provincias?.map((p) => (
            <option key={p.id} value={p.nombre}>{p.nombre}</option>
          ))}
        </select>
      </div>

      {/* Localidad */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Localidad</label>
        <select
          value={localidad}
          onChange={(e) => handleLocalidadChange(e.target.value)}
          className="input"
          disabled={!provincia || loadingLocalidades}
        >
          <option value="">
            {!provincia
              ? 'Primero elegí una provincia'
              : loadingLocalidades
                ? 'Cargando localidades...'
                : 'Seleccioná una localidad'}
          </option>
          {localidades?.map((l) => (
            <option key={l.id} value={l.nombre}>{l.nombre}</option>
          ))}
        </select>
      </div>

      {/* Ubicacion texto (auto-llenado, editable) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Descripción de ubicación
        </label>
        <input
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="input"
          placeholder="Ej: Pergamino, Buenos Aires"
        />
      </div>

      {/* Toggle GPS / Mapa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Coordenadas GPS</label>
        <div className="flex rounded-lg border border-gray-200 p-0.5 bg-gray-50 mb-3">
          <button
            type="button"
            onClick={() => setMode('gps')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              mode === 'gps' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Navigation size={14} />
            Ubicación actual
          </button>
          <button
            type="button"
            onClick={() => setMode('mapa')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              mode === 'mapa' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MapPin size={14} />
            Marcar en mapa
          </button>
        </div>

        {/* GPS actual */}
        {mode === 'gps' && (
          latitud && longitud ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-green-700 shrink-0" />
                <span className="text-xs text-green-800 font-mono">
                  {latitud.toFixed(5)}, {longitud.toFixed(5)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => { setLatitud(null); setLongitud(null); }}
                className="text-gray-400 hover:text-red-500 transition-colors text-xs px-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onGps}
              disabled={gpsLoading}
              className="flex items-center gap-2 w-full justify-center py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all disabled:opacity-50"
            >
              {gpsLoading
                ? <Loader2 size={15} className="animate-spin" />
                : <Navigation size={15} />}
              {gpsLoading ? 'Obteniendo ubicación...' : 'Usar mi ubicación actual'}
            </button>
          )
        )}

        {/* Mapa picker */}
        {mode === 'mapa' && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400">
              {latitud && longitud
                ? `📍 ${latitud.toFixed(5)}, ${longitud.toFixed(5)}`
                : 'Hacé clic en el mapa para marcar la ubicación del campo'}
            </p>
            <div
              className="rounded-xl overflow-hidden border border-gray-200"
              style={{ height: 220 }}
            >
              <MapContainer
                center={[mapCenter.lat, mapCenter.lng]}
                zoom={mapCenter.zoom}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <MapCenterer lat={mapCenter.lat} lng={mapCenter.lng} zoom={mapCenter.zoom} />
                <ClickHandler onMapClick={handleMapClick} />
                {latitud !== null && longitud !== null && (
                  <Marker position={[latitud, longitud]} />
                )}
              </MapContainer>
            </div>
            {latitud && longitud && (
              <button
                type="button"
                onClick={() => { setLatitud(null); setLongitud(null); }}
                className="text-xs text-red-500 hover:underline"
              >
                Quitar marcador
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
