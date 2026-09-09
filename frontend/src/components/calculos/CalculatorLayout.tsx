import { Database, PencilLine } from 'lucide-react';
import type { ReactNode } from 'react';

export function CalculatorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl bg-gradient-to-r from-emerald-950 to-emerald-700 p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Herramientas de planificación</p>
        <h1 className="mt-2 text-3xl font-bold">Cálculos agropecuarios</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-50/90 sm:text-base">
          Calculá insumos, costos y necesidades productivas de forma rápida o usando la información que ya cargaste en AgroManager.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <ModeCard
          icon={PencilLine}
          title="Cálculo rápido"
          description="Cargá la superficie y los valores manualmente. Es ideal para estimar aunque todavía no hayas creado campos."
        />
        <ModeCard
          icon={Database}
          title="Usar datos de AgroManager"
          description="Seleccioná un campo o lote para completar la superficie y relacionar el cálculo con tu operación."
          accent
        />
      </section>

      {children}
    </div>
  );
}

function ModeCard({
  icon: Icon,
  title,
  description,
  accent = false,
}: {
  icon: typeof Database;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div className={accent ? 'rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10' : 'rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800'}>
      <Icon size={22} className={accent ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-700 dark:text-gray-200'} />
      <h2 className="mt-4 font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
