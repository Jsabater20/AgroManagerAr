import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Building2, Leaf, MapPin, PawPrint, Sprout, TrendingUp, Wheat } from 'lucide-react';
import { Link } from 'react-router-dom';

type Activity = {
  id: string;
  label: string;
  description: string;
  eyebrow: string;
  title: string;
  detail: string;
  capabilities: string[];
  ctaLabel: string;
  ctaTo: string;
  icon: LucideIcon;
};

const ACTIVITIES: Activity[] = [
  {
    id: 'agricultura',
    label: 'Agricultura',
    description: 'Campos, lotes y campañas',
    eyebrow: 'Para agricultura',
    title: 'Ordená cada lote desde la siembra hasta la cosecha.',
    detail: 'Concentrá la información operativa para planificar mejor y tener siempre claro qué se hizo y qué falta.',
    capabilities: ['Registrá campos y lotes', 'Planificá siembras, insumos y aplicaciones', 'Calculá dosis y costos estimados', 'Asigná trabajos al equipo'],
    ctaLabel: 'Crear mi cuenta',
    ctaTo: '/register',
    icon: Sprout,
  },
  {
    id: 'ganaderia',
    label: 'Ganadería',
    description: 'Rodeo y seguimiento diario',
    eyebrow: 'Para ganadería',
    title: 'Llevá el control del rodeo con información clara.',
    detail: 'Tené identificados los animales, sus novedades y las tareas de manejo sin depender de planillas dispersas.',
    capabilities: ['Registrá animales y categorías', 'Seguimiento de preñeces y eventos', 'Organizá controles y tratamientos', 'Guardá evidencias de cada novedad'],
    ctaLabel: 'Crear mi cuenta',
    ctaTo: '/register',
    icon: PawPrint,
  },
  {
    id: 'tambo',
    label: 'Tambo',
    description: 'Ordeñes y producción de leche',
    eyebrow: 'Para tambos',
    title: 'Seguí la producción de leche y la rutina del tambo.',
    detail: 'Registrá los datos principales de cada jornada para comparar resultados y detectar oportunidades a tiempo.',
    capabilities: ['Cargá ordeñes y litros producidos', 'Consultá evolución de producción', 'Organizá tareas operativas', 'Relacioná datos con el rodeo'],
    ctaLabel: 'Crear mi cuenta',
    ctaTo: '/register',
    icon: TrendingUp,
  },
  {
    id: 'avicola',
    label: 'Avícola',
    description: 'Galpones, aves y controles',
    eyebrow: 'Para producción avícola',
    title: 'Controlá tus galpones con datos simples y comparables.',
    detail: 'Reuní producción, consumo, mortalidad y controles para conocer el estado de cada lote de aves.',
    capabilities: ['Registrá galpones y lotes de aves', 'Seguimiento de producción y consumo', 'Controlá mortalidad y novedades', 'Planificá revisiones del equipo'],
    ctaLabel: 'Crear mi cuenta',
    ctaTo: '/register',
    icon: Wheat,
  },
  {
    id: 'frutihorticultura',
    label: 'Frutihorticultura',
    description: 'Cultivos, cosechas y evolución',
    eyebrow: 'Para frutihorticultura',
    title: 'Acompañá cada cultivo durante toda su evolución.',
    detail: 'Registrá labores, observaciones y cosechas para tomar decisiones con el historial a la vista.',
    capabilities: ['Organizá cultivos y cuadros', 'Registrá cosechas y rendimientos', 'Documentá plagas y observaciones', 'Asigná recorridas y labores'],
    ctaLabel: 'Crear mi cuenta',
    ctaTo: '/register',
    icon: MapPin,
  },
  {
    id: 'yerba',
    label: 'Yerba',
    description: 'Cuadros y hoja verde',
    eyebrow: 'Para producción de yerba',
    title: 'Conocé el rendimiento de cada cuadro de yerba.',
    detail: 'Conservá los registros de producción y labores para planificar cada ciclo con mayor previsibilidad.',
    capabilities: ['Registrá cuadros de yerba', 'Cargá cosechas de hoja verde', 'Compará rendimientos por período', 'Guardá tareas y observaciones'],
    ctaLabel: 'Crear mi cuenta',
    ctaTo: '/register',
    icon: Leaf,
  },
  {
    id: 'empresas',
    label: 'Empresas',
    description: 'Varios establecimientos',
    eyebrow: 'Para empresas agropecuarias',
    title: 'Gestioná varios establecimientos sin mezclar su información.',
    detail: 'Cada equipo trabaja sobre su propia organización y las personas autorizadas acceden a una visión consolidada.',
    capabilities: ['Separá establecimientos y equipos', 'Definí encargados y permisos', 'Consultá la operación consolidada', 'Seguimiento comercial y administrativo'],
    ctaLabel: 'Ver Demo Empresa',
    ctaTo: '/demo/empresa',
    icon: Building2,
  },
];

export default function ActivityExplorer() {
  const [selectedId, setSelectedId] = useState(ACTIVITIES[0].id);
  const selectedActivity = ACTIVITIES.find((activity) => activity.id === selectedId) ?? ACTIVITIES[0];
  const Icon = selectedActivity.icon;

  return (
    <section id="actividades" className="scroll-mt-20 bg-slate-50 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Hecho para tu actividad</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Elegí cómo trabajás y descubrí qué podés ordenar.</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">AgroManager AR se adapta a tu producción. Seleccioná una actividad para ver un ejemplo concreto.</p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((activity) => {
            const ActivityIcon = activity.icon;
            const isSelected = activity.id === selectedActivity.id;

            return (
              <button
                key={activity.id}
                type="button"
                onClick={() => setSelectedId(activity.id)}
                className={`rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${isSelected ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-900/15' : 'border-slate-200 bg-white text-slate-900 hover:border-emerald-300 hover:shadow-md'}`}
                aria-pressed={isSelected}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${isSelected ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700'}`}><ActivityIcon size={20} /></span>
                <p className="mt-3 font-bold">{activity.label}</p>
                <p className={`mt-1 text-xs leading-relaxed ${isSelected ? 'text-emerald-50/85' : 'text-slate-500'}`}>{activity.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-emerald-950 p-7 text-white sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300"><Icon size={24} /></span>
            <p className="mt-7 text-xs font-bold uppercase tracking-widest text-emerald-300">{selectedActivity.eyebrow}</p>
            <h3 className="mt-3 max-w-lg text-2xl font-bold leading-tight sm:text-3xl">{selectedActivity.title}</h3>
            <p className="mt-4 max-w-lg leading-relaxed text-emerald-50/80">{selectedActivity.detail}</p>
          </div>

          <div className="p-7 sm:p-10">
            <p className="text-sm font-bold text-slate-900">Con AgroManager AR podés:</p>
            <ul className="mt-5 space-y-3">
              {selectedActivity.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
                  {capability}
                </li>
              ))}
            </ul>
            <Link to={selectedActivity.ctaTo} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
              {selectedActivity.ctaLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">¿Tu producción combina varias actividades? Podés registrarlas y organizarlas desde una misma cuenta.</p>
      </div>
    </section>
  );
}
