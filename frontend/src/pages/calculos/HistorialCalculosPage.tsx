import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Bookmark, Calculator, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { calculosApi, type CalculoGuardado } from '../../api/calculos.api';
import { CalculatorLayout } from '../../components/calculos/CalculatorLayout';
import { PlanBanner } from '../../components/ui/PlanBanner';
import { useAuthStore } from '../../store/auth.store';

const ETIQUETAS: Record<CalculoGuardado['tipo'], string> = { APLICACION: 'Aplicación', SIEMBRA: 'Siembra', FERTILIZACION: 'Fertilización', MAQUINARIA: 'Maquinaria', GANADERIA: 'Ganadería', ECONOMICO: 'Económico' };

export default function HistorialCalculosPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const usuario = useAuthStore((state) => state.usuario);
  const organizacion = usuario?.organizaciones?.find((item) => item.id === organizacionId);
  const tienePro = organizacion?.plan === 'PRO' || organizacion?.planEfectivo === 'PRO';
  const historialQuery = useQuery({ queryKey: ['calculos', 'historial', organizacionId], queryFn: calculosApi.listar, enabled: tienePro && organizacionId > 0 });

  if (!tienePro) return <CalculatorLayout><Link to={`/org/${orgId}/calculos`} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300"><ArrowLeft size={16} /> Todos los cálculos</Link><PlanBanner feature="Historial de cálculos" description="Con Pro podés guardar resultados y volver a consultarlos desde tu organización cuando los necesites." /></CalculatorLayout>;

  return <CalculatorLayout><section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6"><Link to={`/org/${orgId}/calculos`} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300"><ArrowLeft size={16} /> Todos los cálculos</Link><div className="mt-5 flex items-start gap-3"><span className="rounded-xl bg-violet-100 p-2.5 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><Bookmark size={22} /></span><div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Historial de cálculos</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Resultados guardados en esta organización. Los miembros ven únicamente los que registraron.</p></div></div></section>{historialQuery.isLoading ? <div className="flex justify-center py-16 text-sm text-gray-600 dark:text-gray-300"><Loader2 className="mr-2 animate-spin" size={18} /> Cargando historial...</div> : historialQuery.isError ? <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">No pudimos cargar el historial. Intentá nuevamente.</section> : historialQuery.data?.length ? <section className="grid gap-4 md:grid-cols-2">{historialQuery.data.map((calculo) => <HistoryCard key={calculo.id} calculo={calculo} />)}</section> : <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-800"><Calculator className="mx-auto text-emerald-600 dark:text-emerald-300" size={32} /><h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Todavía no guardaste cálculos</h2><p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Cuando obtengas un resultado, elegí “Guardar cálculo” para encontrarlo acá.</p></section>}</CalculatorLayout>;
}

function HistoryCard({ calculo }: { calculo: CalculoGuardado }) {
  return <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"><div className="flex items-start justify-between gap-3"><div><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">{ETIQUETAS[calculo.tipo]}</span><h2 className="mt-3 font-bold text-gray-900 dark:text-white">{calculo.titulo}</h2></div><time className="text-right text-xs text-gray-500 dark:text-gray-400">{new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(calculo.createdAt))}</time></div><p className="mt-4 text-sm font-semibold text-gray-800 dark:text-gray-100">{resumenResultado(calculo)}</p><p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Guardado por {calculo.usuario.nombre} {calculo.usuario.apellido}</p></article>;
}

function resumenResultado(calculo: CalculoGuardado) {
  const resultado = calculo.resultado;
  switch (calculo.tipo) {
    case 'APLICACION': return `${format(resultado.productoLitros)} L de producto · ${format(resultado.aguaLitros)} L de agua`;
    case 'SIEMBRA': return `${format(resultado.semillasTotales)} semillas${resultado.kilosEstimados ? ` · ${format(resultado.kilosEstimados)} kg estimados` : ''}`;
    case 'FERTILIZACION': return `${format(resultado.fertilizanteKg)} kg de fertilizante`;
    case 'MAQUINARIA': return `${format(resultado.combustibleLitros)} L · ${formatCurrency(resultado.costoCombustible)}`;
    case 'GANADERIA': return `${format(resultado.cargaAnimal)} animales/ha`;
    case 'ECONOMICO': return `Margen bruto: ${formatCurrency(resultado.margenBruto)}`;
  }
}

function format(value: unknown) { return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(Number(value) || 0); }
function formatCurrency(value: unknown) { return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Number(value) || 0); }
