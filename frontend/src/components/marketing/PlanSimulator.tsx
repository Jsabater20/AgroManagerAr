import { useMemo, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, Sparkles, Sprout, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

type EstablishmentSize = 'one' | 'multiple';
type TeamSize = 'small' | 'growing';
type OperationNeed = 'essential' | 'advanced';
type PlanKey = 'FREE' | 'PRO' | 'EMPRESA';

type Recommendation = {
  plan: PlanKey;
  title: string;
  description: string;
  benefits: string[];
  actionLabel: string;
  actionTo: string;
};

const RECOMMENDATIONS: Record<PlanKey, Recommendation> = {
  FREE: {
    plan: 'FREE',
    title: 'Plan Free',
    description: 'Es un buen punto de partida para conocer el flujo completo de trabajo en un establecimiento.',
    benefits: ['1 campo y hasta 3 lotes', 'Owner + 1 miembro adicional', 'Hasta 3 trabajos activos', 'Tareas, fechas, horarios y estados'],
    actionLabel: 'Empezar gratis',
    actionTo: '/register',
  },
  PRO: {
    plan: 'PRO',
    title: 'Plan Pro',
    description: 'Te conviene para crecer sin límites y usar la gestión completa de la producción y el equipo.',
    benefits: ['Campos, miembros y trabajos ilimitados', 'Cálculos, reportes y rentabilidad', 'Permisos e historial completo del equipo', 'Evidencias fotográficas y observaciones'],
    actionLabel: 'Ver Plan Pro',
    actionTo: '/planes',
  },
  EMPRESA: {
    plan: 'EMPRESA',
    title: 'Plan Empresa',
    description: 'Es la alternativa indicada si gestionás varios establecimientos y necesitás mantener cada operación separada.',
    benefits: ['Hasta 3 establecimientos incluidos', 'Datos y equipos separados por organización', 'Dashboard consolidado para personas autorizadas', 'Auditoría y exportaciones consolidadas'],
    actionLabel: 'Conocer Plan Empresa',
    actionTo: '/planes',
  },
};

export default function PlanSimulator() {
  const [establishments, setEstablishments] = useState<EstablishmentSize>('one');
  const [team, setTeam] = useState<TeamSize>('small');
  const [operation, setOperation] = useState<OperationNeed>('essential');

  const recommendation = useMemo(() => {
    if (establishments === 'multiple') return RECOMMENDATIONS.EMPRESA;
    if (team === 'growing' || operation === 'advanced') return RECOMMENDATIONS.PRO;
    return RECOMMENDATIONS.FREE;
  }, [establishments, operation, team]);

  const isEnterprise = recommendation.plan === 'EMPRESA';
  const isPro = recommendation.plan === 'PRO';

  return (
    <section id="planes" className="scroll-mt-20 bg-emerald-950 px-4 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Elegí con claridad</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">¿Qué plan se adapta mejor a tu forma de trabajar?</h2>
          <p className="mt-4 text-lg leading-relaxed text-emerald-50/75">Respondé tres preguntas simples y recibí una orientación según los límites y funciones reales de cada plan.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <Question
              title="¿Cuántos establecimientos querés gestionar?"
              value={establishments}
              onChange={setEstablishments}
              options={[
                { value: 'one', label: 'Uno', detail: 'Un campo o establecimiento' },
                { value: 'multiple', label: 'Dos o más', detail: 'Información separada por establecimiento' },
              ]}
            />
            <Question
              title="¿Cómo es tu equipo hoy?"
              value={team}
              onChange={setTeam}
              options={[
                { value: 'small', label: 'Hasta 1 persona adicional', detail: 'Además de quien administra' },
                { value: 'growing', label: 'Dos o más personas', detail: 'Un equipo en crecimiento' },
              ]}
            />
            <Question
              title="¿Qué tipo de seguimiento necesitás?"
              value={operation}
              onChange={setOperation}
              options={[
                { value: 'essential', label: 'Lo esencial', detail: 'Organizar tareas y el día a día' },
                { value: 'advanced', label: 'Completo', detail: 'Cálculos, reportes y análisis' },
              ]}
            />
          </div>

          <div className={`rounded-3xl border p-6 shadow-2xl sm:p-8 ${isEnterprise ? 'border-cyan-300/35 bg-cyan-950/40' : isPro ? 'border-emerald-300/35 bg-emerald-900/35' : 'border-white/15 bg-white/[0.07]'}`}>
            <div className="flex items-start justify-between gap-4">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isEnterprise ? 'bg-cyan-400/15 text-cyan-200' : isPro ? 'bg-emerald-400/15 text-emerald-200' : 'bg-white/10 text-white'}`}>
                {isEnterprise ? <Building2 size={24} /> : isPro ? <Sparkles size={24} /> : <Sprout size={24} />}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${isEnterprise ? 'bg-cyan-300 text-cyan-950' : isPro ? 'bg-emerald-300 text-emerald-950' : 'bg-white text-slate-900'}`}>Recomendado para vos</span>
            </div>

            <p className={`mt-8 text-xs font-bold uppercase tracking-widest ${isEnterprise ? 'text-cyan-200' : isPro ? 'text-emerald-200' : 'text-slate-300'}`}>{recommendation.plan === 'EMPRESA' ? 'Operación multi-establecimiento' : 'Tu punto de partida'}</p>
            <h3 className="mt-2 text-3xl font-bold">{recommendation.title}</h3>
            <p className="mt-4 leading-relaxed text-white/75">{recommendation.description}</p>

            <ul className="mt-7 space-y-3">
              {recommendation.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2.5 text-sm leading-relaxed text-white/90">
                  <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${isEnterprise ? 'text-cyan-300' : 'text-emerald-300'}`} />
                  {benefit}
                </li>
              ))}
            </ul>

            <Link to={recommendation.actionTo} className={`mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors ${isEnterprise ? 'bg-cyan-300 text-cyan-950 hover:bg-cyan-200' : isPro ? 'bg-emerald-300 text-emerald-950 hover:bg-emerald-200' : 'bg-white text-slate-900 hover:bg-slate-100'}`}>
              {recommendation.actionLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-4xl items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-emerald-50/75">
          <UsersRound size={19} className="mt-0.5 shrink-0 text-emerald-300" />
          Esta orientación no cambia tu plan automáticamente. Podés empezar en Free y pasar a Pro cuando tu operación lo necesite; para varios establecimientos, el Plan Empresa se configura según lo contratado.
        </div>
      </div>
    </section>
  );
}

function Question<T extends string>({ title, value, onChange, options }: {
  title: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; detail: string }[];
}) {
  return (
    <fieldset className="border-b border-white/10 py-5 first:pt-0 last:border-b-0 last:pb-0">
      <legend className="text-sm font-bold text-white">{title}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-xl border p-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 ${isSelected ? 'border-emerald-300 bg-emerald-400/15' : 'border-white/10 bg-slate-950/25 hover:border-emerald-300/50'}`}
              aria-pressed={isSelected}
            >
              <span className="block text-sm font-bold text-white">{option.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-emerald-50/60">{option.detail}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
