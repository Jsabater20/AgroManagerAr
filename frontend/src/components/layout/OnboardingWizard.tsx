import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sprout, Map, Wheat, CheckCircle, ArrowRight, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { camposApi } from '../../api/campos.api';
import { cultivosApi } from '../../api/cultivos.api';

const ONBOARDING_KEY = 'agromanager_onboarding_done';

export function useOnboarding() {
  const [show, setShow] = useState(() => !localStorage.getItem(ONBOARDING_KEY));
  const dismiss = () => {
    localStorage.setItem(ONBOARDING_KEY, '1');
    setShow(false);
  };
  return { show, dismiss };
}

type Step = 0 | 1 | 2 | 3;

const STEPS = [
  { title: '¡Bienvenido a AgroManager AR!', icon: Sprout },
  { title: 'Creá tu primer campo', icon: Map },
  { title: 'Registrá un cultivo', icon: Wheat },
  { title: '¡Todo listo!', icon: CheckCircle },
];

interface Props {
  onClose: () => void;
}

export default function OnboardingWizard({ onClose }: Props) {
  const qc = useQueryClient();
  const [step, setStep] = useState<Step>(0);

  // Paso 1 — Campo
  const [campoNombre, setCampoNombre] = useState('');
  const [campoHa, setCampoHa] = useState('');
  const [campoLoteNombre, setCampoLoteNombre] = useState('');
  const [campoLoteHa, setCampoLoteHa] = useState('');
  const [createdCampo, setCreatedCampo] = useState<{ id: number; nombre: string } | null>(null);

  // Paso 2 — Cultivo
  const [cultivoNombre, setCultivoNombre] = useState('');

  const campoMut = useMutation({
    mutationFn: async () => {
      const campo = await camposApi.create({
        nombre: campoNombre,
        hectareas: Number(campoHa) || 0,
      });
      if (campoLoteNombre) {
        await camposApi.addLote(campo.id, {
          nombre: campoLoteNombre,
          hectareas: Number(campoLoteHa) || 0,
        });
      }
      return campo;
    },
    onSuccess: (campo) => {
      qc.invalidateQueries({ queryKey: ['campos'] });
      setCreatedCampo({ id: campo.id, nombre: campo.nombre });
      toast.success(`Campo "${campo.nombre}" creado`);
      setStep(2);
    },
    onError: () => toast.error('Error al crear el campo'),
  });

  const cultivoMut = useMutation({
    mutationFn: () => cultivosApi.create({ nombre: cultivoNombre }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cultivos'] });
      toast.success(`Cultivo "${cultivoNombre}" registrado`);
      setStep(3);
    },
    onError: () => toast.error('Error al crear el cultivo'),
  });

  const progress = ((step) / (STEPS.length - 1)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-green-700 px-6 pt-6 pb-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-green-300 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 mb-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    i < step ? 'bg-green-400' : i === step ? 'bg-white' : 'bg-green-800'
                  }`}>
                    <Icon size={14} className={i === step ? 'text-green-700' : 'text-green-200'} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 w-6 rounded ${i < step ? 'bg-green-400' : 'bg-green-800'}`} />
                  )}
                </div>
              );
            })}
          </div>
          <h2 className="text-xl font-bold text-white">{STEPS[step].title}</h2>
          <div className="mt-3 h-1 bg-green-800 rounded-full">
            <div
              className="h-full bg-green-300 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          {/* Paso 0 — Bienvenida */}
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                En los próximos pasos vas a configurar tu establecimiento:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><Map size={14} className="text-green-600 shrink-0" /> Crear tu primer campo y lote</li>
                <li className="flex items-center gap-2"><Wheat size={14} className="text-green-600 shrink-0" /> Registrar un cultivo</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-600 shrink-0" /> ¡Empezar a gestionar!</li>
              </ul>
              <p className="text-xs text-gray-400">Podés saltear este wizard y configurarlo después desde cada módulo.</p>
            </div>
          )}

          {/* Paso 1 — Campo */}
          {step === 1 && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nombre del campo *</label>
                <input
                  value={campoNombre}
                  onChange={(e) => setCampoNombre(e.target.value)}
                  className="input"
                  placeholder="Ej: La Esperanza"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Hectáreas totales</label>
                <input
                  type="number" min="0" step="0.1"
                  value={campoHa}
                  onChange={(e) => setCampoHa(e.target.value)}
                  className="input"
                  placeholder="Opcional"
                />
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 pt-1">Primer lote (opcional)</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Nombre lote</label>
                  <input value={campoLoteNombre} onChange={(e) => setCampoLoteNombre(e.target.value)} className="input" placeholder="Ej: Lote 1" />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hectáreas</label>
                  <input type="number" min="0" step="0.1" value={campoLoteHa} onChange={(e) => setCampoLoteHa(e.target.value)} className="input" placeholder="ha" />
                </div>
              </div>
            </div>
          )}

          {/* Paso 2 — Cultivo */}
          {step === 2 && (
            <div className="space-y-3">
              {createdCampo && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                  <CheckCircle size={14} className="text-green-600 shrink-0" />
                  <p className="text-sm text-green-700 dark:text-green-400">Campo <strong>{createdCampo.nombre}</strong> creado correctamente</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tipo de cultivo *</label>
                <input
                  value={cultivoNombre}
                  onChange={(e) => setCultivoNombre(e.target.value)}
                  className="input"
                  placeholder="Ej: Soja, Maíz, Trigo..."
                />
              </div>
              <p className="text-xs text-gray-400">Podés agregar más cultivos después desde el módulo Cultivos.</p>
            </div>
          )}

          {/* Paso 3 — Final */}
          {step === 3 && (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <p className="text-gray-700 dark:text-gray-200 font-medium">¡Tu establecimiento está listo!</p>
              <p className="text-sm text-gray-400">Ya podés empezar a registrar siembras, animales, tareas y más.</p>
            </div>
          )}

          {/* Acciones */}
          <div className="flex gap-3 mt-6">
            {step > 0 && step < 3 && (
              <button
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Atrás
              </button>
            )}

            {step === 0 && (
              <>
                <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Saltear
                </button>
                <button onClick={() => setStep(1)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-semibold">
                  Empezar <ArrowRight size={14} />
                </button>
              </>
            )}

            {step === 1 && (
              <button
                onClick={() => campoMut.mutate()}
                disabled={!campoNombre.trim() || campoMut.isPending}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white text-sm font-semibold"
              >
                {campoMut.isPending ? 'Guardando...' : <>Crear campo <ArrowRight size={14} /></>}
              </button>
            )}

            {step === 2 && (
              <>
                <button onClick={() => setStep(3)} className="py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Saltear
                </button>
                <button
                  onClick={() => cultivoMut.mutate()}
                  disabled={!cultivoNombre.trim() || cultivoMut.isPending}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white text-sm font-semibold"
                >
                  {cultivoMut.isPending ? 'Guardando...' : <>Crear cultivo <ArrowRight size={14} /></>}
                </button>
              </>
            )}

            {step === 3 && (
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-semibold"
              >
                Ir al dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
