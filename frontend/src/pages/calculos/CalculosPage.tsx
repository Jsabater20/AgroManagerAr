import { BadgeDollarSign, Beef, Bookmark, Calculator, Droplets, Sprout, Tractor, Wheat } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { CalculatorCategoryCard } from '../../components/calculos/CalculatorCategoryCard';
import { CalculatorLayout } from '../../components/calculos/CalculatorLayout';

const CATEGORIAS = [
  { icon: Droplets, title: 'Aplicaciones', description: 'Calculá producto, agua y dosis necesarias para una pulverización.', availableIn: 'FREE' as const, path: 'aplicaciones' },
  { icon: Sprout, title: 'Siembra', description: 'Estimá semillas necesarias y corregí la cantidad según poder germinativo.', availableIn: 'FREE' as const, path: 'siembra' },
  { icon: Wheat, title: 'Fertilización', description: 'Obtené los kilogramos de fertilizante necesarios para cada superficie.', availableIn: 'FREE' as const, path: 'fertilizacion' },
  { icon: Tractor, title: 'Maquinaria', description: 'Proyectá combustible, costo operativo y tiempo de labor.', availableIn: 'PRO' as const, path: 'maquinaria' },
  { icon: Beef, title: 'Ganadería', description: 'Medí carga animal y necesidades básicas del rodeo.', availableIn: 'FREE' as const, path: 'ganaderia' },
  { icon: BadgeDollarSign, title: 'Económicos', description: 'Analizá margen bruto, costos por hectárea y punto de equilibrio.', availableIn: 'PRO' as const, path: 'economicos' },
];

export default function CalculosPage() {
  const { orgId } = useParams<{ orgId: string }>();
  return (
    <CalculatorLayout>
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Elegí qué querés calcular</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Las calculadoras se incorporan por etapas, sin alterar los datos de tu establecimiento.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/org/${orgId}/calculos/historial`} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200"><Bookmark size={14} /> Historial Pro</Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-200"><Calculator size={14} /> Base de cálculos activa</span>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORIAS.map((categoria) => <CalculatorCategoryCard key={categoria.path} {...categoria} to={`/org/${orgId}/calculos/${categoria.path}`} />)}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <h2 className="font-bold text-emerald-950 dark:text-emerald-100">Cómo se usan</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/80">Podés calcular sin guardar nada. Con Pro, cada resultado puede conservarse en el historial para volver a consultarlo cuando lo necesites.</p>
      </section>
    </CalculatorLayout>
  );
}
