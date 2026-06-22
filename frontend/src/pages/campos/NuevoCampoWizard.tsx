import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  X, Layers, Plus, Trash2, Loader2, CheckCircle,
  Wheat, Beef, ChevronLeft, ChevronRight, ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { camposApi } from '../../api/campos.api';
import UbicacionStep from './UbicacionStep';

type Actividad = 'AGRICULTURA' | 'GANADERIA' | 'MIXTO';

interface LoteInput {
  nombre: string;
  hectareas: string;
}

interface Props {
  onClose: () => void;
}

const STEPS = [
  { label: 'Datos básicos' },
  { label: 'Ubicación' },
  { label: 'Lotes' },
  { label: 'Actividad' },
];

export default function NuevoCampoWizard({ onClose }: Props) {
  const navigate = useNavigate();
  const qc = useQueryClient();

  // Paso 0 — Datos básicos
  const [nombre, setNombre] = useState('');
  const [hectareas, setHectareas] = useState('');
  const [propietario, setPropietario] = useState('');

  // Paso 1 — Ubicación
  const [provincia, setProvincia] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [latitud, setLatitud] = useState<number | null>(null);
  const [longitud, setLongitud] = useState<number | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Paso 1
  const [lotes, setLotes] = useState<LoteInput[]>([]);

  // Paso 2
  const [actividad, setActividad] = useState<Actividad | null>(null);

  // Wizard state
  const [step, setStep] = useState(0);
  const [createdCampoId, setCreatedCampoId] = useState<number | null>(null);

  const createMutation = useMutation({
    mutationFn: async () => {
      const campo = await camposApi.create({
        nombre: nombre.trim(),
        hectareas: parseFloat(hectareas) || 0,
        ubicacion: ubicacion.trim() || undefined,
        propietario: propietario.trim() || undefined,
        latitud: latitud ?? undefined,
        longitud: longitud ?? undefined,
      });
      const lotesValidos = lotes.filter((l) => l.nombre.trim());
      if (lotesValidos.length > 0) {
        await Promise.all(
          lotesValidos.map((l) =>
            camposApi.addLote(campo.id, {
              nombre: l.nombre.trim(),
              hectareas: parseFloat(l.hectareas) || 0,
            }),
          ),
        );
      }
      return campo;
    },
    onSuccess: (campo) => {
      qc.invalidateQueries({ queryKey: ['campos'] });
      setCreatedCampoId(campo.id);
      setStep(4);
    },
    onError: () => toast.error('Error al crear el campo'),
  });

  const canGoNext = () => {
    if (step === 0) return nombre.trim().length > 0;
    if (step === 1) return true; // ubicación es opcional
    if (step === 2) return true; // lotes son opcionales
    if (step === 3) return actividad !== null;
    return false;
  };

  const handleNext = () => {
    if (step === 3) {
      createMutation.mutate();
      return;
    }
    setStep((s) => s + 1);
  };

  const addLote = () => setLotes((l) => [...l, { nombre: '', hectareas: '' }]);
  const removeLote = (i: number) => setLotes((l) => l.filter((_, idx) => idx !== i));
  const updateLote = (i: number, field: keyof LoteInput, value: string) =>
    setLotes((l) => l.map((lot, idx) => (idx === i ? { ...lot, [field]: value } : lot)));

  const handleGps = () => {
    if (!navigator.geolocation) {
      toast.error('Tu navegador no soporta geolocalización');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitud(pos.coords.latitude);
        setLongitud(pos.coords.longitude);
        setGpsLoading(false);
        toast.success('Ubicación capturada');
      },
      () => {
        setGpsLoading(false);
        toast.error('No se pudo obtener la ubicación. Verificá los permisos del navegador.');
      },
      { timeout: 10000 },
    );
  };

  const lotesValidos = lotes.filter((l) => l.nombre.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={step < 3 ? onClose : undefined} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg z-10 overflow-hidden">
        {/* ── Header verde ── */}
        <div className="bg-green-700 px-6 pt-5 pb-6">
          {step < 3 && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-green-300 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}

          {/* Indicadores de paso */}
          {step < 3 && (
            <div className="flex items-center gap-2 mb-4">
              {STEPS.map((_s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i < step
                        ? 'bg-green-400 text-white'
                        : i === step
                          ? 'bg-white text-green-700'
                          : 'bg-green-800 text-green-400'
                    }`}
                  >
                    {i < step ? '✓' : i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 w-8 rounded ${i < step ? 'bg-green-400' : 'bg-green-800'}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          <h2 className="text-xl font-bold text-white">
            {step === 0 && 'Datos del campo'}
            {step === 1 && 'Ubicación'}
            {step === 2 && 'Lotes'}
            {step === 3 && 'Tipo de actividad'}
            {step === 4 && '¡Campo creado!'}
          </h2>
          <p className="text-green-200 text-sm mt-0.5">
            {step === 0 && 'Ingresá la información básica de tu establecimiento'}
            {step === 1 && 'Elegí provincia, localidad y marcá la ubicación GPS'}
            {step === 2 && 'Dividí el campo en lotes (podés hacerlo después también)'}
            {step === 3 && '¿A qué se dedica este campo?'}
            {step === 4 && 'Tu campo está listo para empezar a gestionar'}
          </p>
        </div>

        {/* ── Contenido ── */}
        <div className="p-6 min-h-56 overflow-y-auto max-h-[70vh]">

          {/* Paso 0 — Datos básicos */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre del campo *
                </label>
                <input
                  autoFocus
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && canGoNext() && handleNext()}
                  className="input"
                  placeholder="Ej: La Esperanza"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Hectáreas totales
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={hectareas}
                    onChange={(e) => setHectareas(e.target.value)}
                    className="input"
                    placeholder="Ej: 250"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Propietario
                  </label>
                  <input
                    value={propietario}
                    onChange={(e) => setPropietario(e.target.value)}
                    className="input"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 1 — Ubicación */}
          {step === 1 && (
            <UbicacionStep
              provincia={provincia}   setProvincia={setProvincia}
              localidad={localidad}   setLocalidad={setLocalidad}
              ubicacion={ubicacion}   setUbicacion={setUbicacion}
              latitud={latitud}       setLatitud={setLatitud}
              longitud={longitud}     setLongitud={setLongitud}
              gpsLoading={gpsLoading} onGps={handleGps}
            />
          )}

          {/* Paso 2 — Lotes */}
          {step === 2 && (
            <div className="space-y-3">
              {lotes.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Layers size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">Sin lotes todavía</p>
                  <p className="text-xs mt-0.5">Podés agregarlos ahora o después desde el campo</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {lotes.map((lote, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-400 w-5 shrink-0">{i + 1}</span>
                      <input
                        value={lote.nombre}
                        onChange={(e) => updateLote(i, 'nombre', e.target.value)}
                        className="input flex-1"
                        placeholder="Nombre del lote"
                      />
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={lote.hectareas}
                        onChange={(e) => updateLote(i, 'hectareas', e.target.value)}
                        className="input w-24"
                        placeholder="ha"
                      />
                      <button
                        onClick={() => removeLote(i)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1 shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={addLote}
                className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-800 font-medium"
              >
                <Plus size={15} />
                Agregar lote
              </button>
            </div>
          )}

          {/* Paso 3 — Actividad */}
          {step === 3 && (
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  {
                    value: 'AGRICULTURA' as Actividad,
                    icon: Wheat,
                    label: 'Agricultura',
                    desc: 'Cultivos de granos y oleaginosas',
                  },
                  {
                    value: 'GANADERIA' as Actividad,
                    icon: Beef,
                    label: 'Ganadería',
                    desc: 'Cría y engorde de animales',
                  },
                  {
                    value: 'MIXTO' as Actividad,
                    icon: Layers,
                    label: 'Mixto',
                    desc: 'Agricultura y ganadería',
                  },
                ] as const
              ).map(({ value, icon: Icon, label, desc }) => (
                <button
                  key={value}
                  onClick={() => setActividad(value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                    actividad === value
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl ${actividad === value ? 'bg-green-100' : 'bg-gray-100'}`}
                  >
                    <Icon
                      size={22}
                      className={actividad === value ? 'text-green-700' : 'text-gray-500'}
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold ${actividad === value ? 'text-green-700' : 'text-gray-700'}`}
                  >
                    {label}
                  </span>
                  <span className="text-xs text-gray-400 leading-tight">{desc}</span>
                </button>
              ))}
            </div>
          )}

          {/* Paso 4 — Listo */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{nombre} creado</h3>
              <p className="text-sm text-gray-500">
                {lotesValidos.length > 0
                  ? `${lotesValidos.length} lote${lotesValidos.length !== 1 ? 's' : ''} agregado${lotesValidos.length !== 1 ? 's' : ''}`
                  : 'Sin lotes por ahora — podés agregarlos cuando quieras'}
              </p>
              {actividad && (
                <p className="text-xs text-gray-400 mt-0.5">
                  Actividad:{' '}
                  {actividad === 'AGRICULTURA'
                    ? 'Agricultura'
                    : actividad === 'GANADERIA'
                      ? 'Ganadería'
                      : 'Mixto'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 pb-6 flex items-center justify-between">
          {/* Botón Atrás */}
          {step > 0 && step < 4 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={createMutation.isPending}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={16} />
              Atrás
            </button>
          ) : (
            <div />
          )}

          {/* Acciones derecha */}
          {step < 4 && (
            <div className="flex items-center gap-2">
              {(step === 1 || step === 2) && (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="text-sm text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Omitir
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canGoNext() || createMutation.isPending}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {createMutation.isPending && <Loader2 size={14} className="animate-spin" />}
                {step === 3 ? 'Crear campo' : 'Siguiente'}
                {step < 3 && !createMutation.isPending && <ChevronRight size={16} />}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="flex items-center gap-3 w-full justify-center">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cerrar
              </button>
              {createdCampoId !== null && (
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/campos/${createdCampoId}`);
                  }}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Ir al campo
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
