import { ArrowRight, LockKeyhole } from 'lucide-react';
import type { ElementType } from 'react';
import { Link } from 'react-router-dom';

export function CalculatorCategoryCard({
  icon: Icon,
  title,
  description,
  availableIn,
  comingSoon,
  to,
}: {
  icon: ElementType;
  title: string;
  description: string;
  availableIn: 'FREE' | 'PRO';
  comingSoon?: boolean;
  to?: string;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"><Icon size={20} /></span>
        <span className={availableIn === 'PRO' ? 'inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-800 dark:bg-violet-500/15 dark:text-violet-200' : 'rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200'}>
          {availableIn === 'PRO' && <LockKeyhole size={12} />}
          {availableIn === 'PRO' ? 'Pro' : 'Free y Pro'}
        </span>
      </div>
      <h2 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
      <p className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">
        {comingSoon ? 'Disponible en las próximas etapas' : 'Abrir calculadora'}
        <ArrowRight size={16} />
      </p>
    </>
  );
  const className = 'block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800';

  return to && !comingSoon ? <Link to={to} className={className}>{content}</Link> : <article className={className}>{content}</article>;
}
