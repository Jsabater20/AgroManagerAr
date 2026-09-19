import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, BarChart3, CheckCircle2, ClipboardList, MapPin, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

type TourStep = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  details: string[];
  previewEyebrow: string;
  previewTitle: string;
  previewRows: { label: string; value: string; emphasis?: boolean }[];
  icon: LucideIcon;
};

const TOUR_STEPS: TourStep[] = [
  {
    id: 'establecimiento',
    number: '01',
    label: 'Registrá tu establecimiento',
    title: 'Empezá por ubicar y ordenar lo que gestionás.',
    description: 'Creá tu campo, establecimiento o empresa y cargá los lotes para tener una base clara desde el primer día.',
    details: ['Datos del establecimiento en un solo lugar', 'Lotes, superficie y actividad productiva', 'Información preparada para continuar creciendo'],
    previewEyebrow: 'Establecimiento registrado',
    previewTitle: 'Campo Las Meninas',
    previewRows: [
      { label: 'Superficie total', value: '680 ha' },
      { label: 'Lotes registrados', value: '4 lotes' },
      { label: 'Actividad principal', value: 'Agricultura', emphasis: true },
    ],
    icon: MapPin,
  },
  {
    id: 'equipo',
    number: '02',
    label: 'Organizá a tu equipo',
    title: 'Indicá con claridad quién hace cada trabajo.',
    description: 'Invitá a las personas que trabajan con vos, definí los accesos necesarios y asigná tareas con fecha, horario y recurso.',
    details: ['Permisos según la función de cada persona', 'Tareas vinculadas a un campo, lote o maquinaria', 'Estados simples para seguir el avance'],
    previewEyebrow: 'Actividad asignada',
    previewTitle: 'Revisar alambrado del lote norte',
    previewRows: [
      { label: 'Responsable', value: 'María López' },
      { label: 'Recurso', value: 'Lote Norte' },
      { label: 'Estado', value: 'Pendiente', emphasis: true },
    ],
    icon: UsersRound,
  },
  {
    id: 'registro',
    number: '03',
    label: 'Registrá lo que sucede',
    title: 'Guardá las tareas, costos y novedades de cada jornada.',
    description: 'Cuando el trabajo se realiza, queda registrado junto con observaciones, evidencias y los datos que necesitás consultar después.',
    details: ['Actividad iniciada, pausada o completada', 'Observaciones y fotos de evidencia', 'Movimientos productivos y financieros ordenados'],
    previewEyebrow: 'Trabajo completado',
    previewTitle: 'Cambio de manguera hidráulica',
    previewRows: [
      { label: 'Realizado por', value: 'José González' },
      { label: 'Maquinaria', value: 'Tractor 125 HP' },
      { label: 'Evidencia', value: '2 fotos adjuntas', emphasis: true },
    ],
    icon: ClipboardList,
  },
  {
    id: 'decisiones',
    number: '04',
    label: 'Tomá decisiones',
    title: 'Convertí los registros diarios en información útil.',
    description: 'El dashboard y los reportes reúnen la operación para que puedas detectar prioridades y tomar decisiones con mayor seguridad.',
    details: ['Producción, tareas y finanzas en contexto', 'Seguimiento por campo o establecimiento', 'Reportes para revisar resultados y planificar'],
    previewEyebrow: 'Resumen operativo',
    previewTitle: 'Esta semana en tu establecimiento',
    previewRows: [
      { label: 'Trabajos completados', value: '12' },
      { label: 'Siembras activas', value: '3' },
      { label: 'Resultado operativo', value: 'Al día', emphasis: true },
    ],
    icon: BarChart3,
  },
];

export default function WorkflowTour() {
  const [selectedId, setSelectedId] = useState(TOUR_STEPS[0].id);
  const selectedStep = TOUR_STEPS.find((step) => step.id === selectedId) ?? TOUR_STEPS[0];
  const Icon = selectedStep.icon;

  return (
    <section id="recorrido" className="scroll-mt-20 bg-white px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Así se usa en la práctica</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Un recorrido simple para ordenar el trabajo diario.</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">No necesitás saber de sistemas: avanzá paso a paso y la información va quedando organizada.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-3" role="tablist" aria-label="Recorrido de uso de AgroManager AR">
            {TOUR_STEPS.map((step) => {
              const StepIcon = step.icon;
              const isSelected = step.id === selectedStep.id;

              return (
                <button
                  key={step.id}
                  id={`tour-tab-${step.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`tour-panel-${step.id}`}
                  onClick={() => setSelectedId(step.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${isSelected ? 'border-emerald-200 bg-emerald-50 shadow-sm' : 'border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white'}`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${isSelected ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 shadow-sm ring-1 ring-slate-200'}`}>{step.number}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>{step.label}</span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500">{step.title}</span>
                  </span>
                  <StepIcon size={19} className={isSelected ? 'text-emerald-700' : 'text-slate-400'} />
                </button>
              );
            })}
          </div>

          <div id={`tour-panel-${selectedStep.id}`} role="tabpanel" aria-labelledby={`tour-tab-${selectedStep.id}`} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-900/15">
            <div className="border-b border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300"><Icon size={21} /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Paso {selectedStep.number}</p>
                  <p className="mt-1 font-bold text-white">{selectedStep.label}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_0.9fr]">
              <div>
                <h3 className="text-2xl font-bold leading-tight text-white">{selectedStep.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-300">{selectedStep.description}</p>
                <ul className="mt-6 space-y-3">
                  {selectedStep.details.map((detail) => (
                    <li key={detail} className="flex gap-2.5 text-sm leading-relaxed text-slate-200">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-300 transition-colors hover:text-emerald-200">
                  Empezar a organizar mi producción <ArrowRight size={16} />
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-inner shadow-black/20">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{selectedStep.previewEyebrow}</p>
                <p className="mt-2 border-b border-white/10 pb-4 font-bold text-white">{selectedStep.previewTitle}</p>
                <div className="mt-4 space-y-3">
                  {selectedStep.previewRows.map((row) => (
                    <div key={row.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                      <p className="text-xs text-slate-400">{row.label}</p>
                      <p className={`mt-1 text-sm font-bold ${row.emphasis ? 'text-emerald-300' : 'text-white'}`}>{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
