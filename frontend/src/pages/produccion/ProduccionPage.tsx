import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { Apple, Bird, ChartNoAxesCombined, ChevronRight, Leaf, Milk, PawPrint, Wheat } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { organizacionesApi } from '../../api/organizaciones.api';
import { frutihorticulturaApi } from '../../api/frutihorticultura.api';
import { tamboApi } from '../../api/tambo.api';
import { avicolaApi } from '../../api/avicola.api';
import { yerbaApi } from '../../api/yerba.api';
import { siembrasApi } from '../../api/siembras.api';
import { ganadoApi } from '../../api/ganado.api';

export default function ProduccionPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const usuario = useAuthStore((state) => state.usuario);
  const esOwner = usuario?.organizaciones?.some((organizacion) => organizacion.id === organizacionId && organizacion.propietarioId === usuario.id) ?? false;
  const perfilQuery = useQuery({ queryKey: ['actividad-productiva', organizacionId], queryFn: () => organizacionesApi.obtenerActividadProductiva(organizacionId), enabled: esOwner && organizacionId > 0 });
  const actividades = perfilQuery.data?.actividades ?? [];
  const frutiQuery = useQuery({ queryKey: ['frutihorticultura', organizacionId], queryFn: frutihorticulturaApi.getAll, enabled: esOwner && actividades.includes('FRUTIHORTICOLA') });
  const tamboQuery = useQuery({ queryKey: ['tambo-resumen', organizacionId], queryFn: tamboApi.getResumen, enabled: esOwner && actividades.includes('TAMBO') });
  const avicolaQuery = useQuery({ queryKey: ['avicola-resumen', organizacionId], queryFn: avicolaApi.getResumen, enabled: esOwner && actividades.includes('AVICOLA') });
  const yerbaQuery = useQuery({ queryKey: ['yerba-resumen', organizacionId], queryFn: yerbaApi.getResumen, enabled: esOwner && actividades.includes('YERBA') });
  const siembrasQuery = useQuery({ queryKey: ['siembras', organizacionId], queryFn: siembrasApi.getAll, enabled: esOwner && actividades.includes('AGRICOLA') });
  const ganadoQuery = useQuery({ queryKey: ['ganado', organizacionId], queryFn: ganadoApi.getAll, enabled: esOwner && actividades.includes('GANADERIA') });

  if (!esOwner) return <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">El panel consolidado de producción está disponible para el owner del establecimiento.</div>;
  if (perfilQuery.isLoading) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />;
  if (!actividades.length) return <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/25"><ChartNoAxesCombined className="mx-auto text-emerald-700 dark:text-emerald-300" size={38} /><h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Configurá primero el perfil productivo</h1><p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Elegí las actividades de este establecimiento para ver sus indicadores en un solo lugar.</p><Link to={`/org/${orgId}/dashboard`} className="mt-5 inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">Ir al dashboard</Link></div>;

  const frutiKg = (frutiQuery.data ?? []).flatMap((cultivo) => cultivo.cosechas).reduce((total, cosecha) => total + cosecha.kgPrimera + cosecha.kgSegunda + cosecha.kgDescarte, 0);
  const siembras = siembrasQuery.data ?? [];
  const agricolaKg = siembras.flatMap((siembra) => siembra.cosechas ?? []).reduce((total, cosecha) => total + cosecha.totalKg, 0);
  const cards = [
    actividades.includes('AGRICOLA') && { label: 'Agricultura', detail: `${siembras.filter((siembra) => siembra.estado === 'EN_CURSO').length} siembras activas`, value: formatKg(agricolaKg), icon: Wheat, color: 'amber', to: `/org/${orgId}/siembras` },
    actividades.includes('GANADERIA') && { label: 'Ganadería', detail: 'Animales registrados', value: String(ganadoQuery.data?.length ?? 0), icon: PawPrint, color: 'rose', to: `/org/${orgId}/ganado` },
    actividades.includes('TAMBO') && { label: 'Tambo y lácteos', detail: `${tamboQuery.data?.registrosHoy ?? 0} registros hoy`, value: formatLitros(tamboQuery.data?.litrosHoy ?? 0), icon: Milk, color: 'sky', to: `/org/${orgId}/tambo` },
    actividades.includes('AVICOLA') && { label: 'Avícola', detail: `${avicolaQuery.data?.galponesActivos ?? 0} galpones activos`, value: `${(avicolaQuery.data?.huevosHoy ?? 0).toLocaleString('es-AR')} huevos`, icon: Bird, color: 'amber', to: `/org/${orgId}/avicola` },
    actividades.includes('FRUTIHORTICOLA') && { label: 'Frutihorticultura', detail: `${frutiQuery.data?.length ?? 0} unidades registradas`, value: formatKg(frutiKg), icon: Apple, color: 'emerald', to: `/org/${orgId}/frutihorticultura` },
    actividades.includes('YERBA') && { label: 'Yerba mate', detail: `${yerbaQuery.data?.cuadrosActivos ?? 0} cuadros activos`, value: formatKg(yerbaQuery.data?.kgHojaVerde ?? 0), icon: Leaf, color: 'green', to: `/org/${orgId}/yerba` },
  ].filter(Boolean) as Array<{ label: string; detail: string; value: string; icon: typeof Leaf; color: string; to: string }>;

  return <div className="space-y-6"><header><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">Visión consolidada</p><h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Panel de producción</h1><p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Un resumen de las actividades que configuraste para este establecimiento. Cada indicador respeta sus datos y operación propia.</p></header><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cards.map((card) => <ProductionCard key={card.label} {...card} />)}</section><section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"><h2 className="font-bold text-gray-900 dark:text-white">Cómo usar este panel</h2><p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Usalo para mirar el estado general del establecimiento. Desde cada tarjeta podés ir al módulo correspondiente para cargar, corregir o analizar el detalle.</p></section></div>;
}

function ProductionCard({ label, detail, value, icon: Icon, color, to }: { label: string; detail: string; value: string; icon: typeof Leaf; color: string; to: string }) { const styles: Record<string, string> = { amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300', rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300', sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300', emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300', green: 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300' }; return <Link to={to} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"><div className="flex items-start justify-between"><span className={`rounded-xl p-2.5 ${styles[color]}`}><Icon size={20} /></span><ChevronRight size={19} className="text-gray-400 transition-transform group-hover:translate-x-1" /></div><p className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">{value}</p><p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</p><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{detail}</p></Link>; }
function formatKg(value: number) { return value.toLocaleString('es-AR', { maximumFractionDigits: 1 }) + ' kg'; }
function formatLitros(value: number) { return value.toLocaleString('es-AR', { maximumFractionDigits: 1 }) + ' L'; }
