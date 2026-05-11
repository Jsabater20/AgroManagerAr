import {
  Sprout, Map, Wheat, FlaskConical, ArrowRight, PawPrint, ClipboardList,
  AlertTriangle, TrendingUp, TrendingDown, DollarSign, Activity, Cloud,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wmoInfo } from '../clima/ClimaPage';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useAuthStore } from '../../store/auth.store';
import { camposApi } from '../../api/campos.api';
import { siembrasApi } from '../../api/siembras.api';
import { insumosApi } from '../../api/insumos.api';
import { ganadoApi } from '../../api/ganado.api';
import { tareasApi } from '../../api/tareas.api';
import { finanzasApi } from '../../api/finanzas.api';
import { StatCardSkeleton } from '../../components/ui/Skeleton';
import AiInsights from '../../components/ui/AiInsights';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function DashboardPage() {
  const usuario = useAuthStore((s) => s.usuario);

  const { data: campos,   isLoading: lCampos }   = useQuery({ queryKey: ['campos'],   queryFn: camposApi.getAll });
  const { data: siembras, isLoading: lSiembras } = useQuery({ queryKey: ['siembras'], queryFn: siembrasApi.getAll });
  const { data: insumos                        } = useQuery({ queryKey: ['insumos'],  queryFn: insumosApi.getAll });
  const { data: animales, isLoading: lAnimales } = useQuery({ queryKey: ['ganado'],   queryFn: ganadoApi.getAll });
  const { data: tareas,   isLoading: lTareas   } = useQuery({ queryKey: ['tareas'],   queryFn: tareasApi.getAll });
  const { data: finanzas, isLoading: lFinanzas } = useQuery({ queryKey: ['finanzas'], queryFn: finanzasApi.getAll });

  const isLoading = lCampos || lSiembras || lAnimales;

  const totalCampos      = campos?.length ?? 0;
  const totalHectareas   = campos?.reduce((a, c) => a + c.hectareas, 0) ?? 0;
  const siembrasEnCurso  = siembras?.filter((s) => s.estado === 'EN_CURSO').length ?? 0;
  const totalAnimales    = animales?.length ?? 0;
  const prenecesActivas  = animales?.reduce((a, an) => a + an.preneces.filter((p) => p.estado === 'EN_CURSO').length, 0) ?? 0;
  const tareasPendientes = tareas?.filter((t) => t.estado === 'PENDIENTE' || t.estado === 'EN_CURSO').length ?? 0;
  const tareasVencidas   = tareas?.filter((t) => {
    if (t.estado === 'COMPLETADA' || t.estado === 'CANCELADA') return false;
    return new Date(t.fechaProgramada) < new Date(new Date().toDateString());
  }) ?? [];

  const ingresos = finanzas?.filter((f) => f.tipo === 'INGRESO').reduce((a, f) => a + f.monto, 0) ?? 0;
  const egresos  = finanzas?.filter((f) => f.tipo === 'EGRESO').reduce((a, f) => a + f.monto, 0) ?? 0;
  const saldo    = ingresos - egresos;

  const proximasTareas = [...(tareas ?? [])]
    .filter((t) => t.estado === 'PENDIENTE' || t.estado === 'EN_CURSO')
    .sort((a, b) => new Date(a.fechaProgramada).getTime() - new Date(b.fechaProgramada).getTime())
    .slice(0, 5);

  // Producción por mes
  const cosechasPorMes: Record<number, number> = {};
  siembras?.forEach((s) =>
    s.cosechas.forEach((c) => {
      const m = new Date(c.fechaCosecha).getMonth();
      cosechasPorMes[m] = (cosechasPorMes[m] ?? 0) + c.totalKg;
    }),
  );
  const prodData = MESES.map((mes, i) => ({ mes, kg: cosechasPorMes[i] ?? 0 }));

  // Finanzas por mes
  const finByMes: Record<number, { ing: number; eg: number }> = {};
  finanzas?.forEach((f) => {
    const m = new Date(f.fecha).getMonth();
    if (!finByMes[m]) finByMes[m] = { ing: 0, eg: 0 };
    if (f.tipo === 'INGRESO') finByMes[m].ing += f.monto;
    else finByMes[m].eg += f.monto;
  });
  const finData = MESES.map((mes, i) => ({
    mes,
    Ingresos: finByMes[i]?.ing ?? 0,
    Egresos:  finByMes[i]?.eg  ?? 0,
  }));

  // Pie estados tareas
  const pieData = [
    { name: 'Pendiente',  value: tareas?.filter((t) => t.estado === 'PENDIENTE').length ?? 0,  color: '#fbbf24' },
    { name: 'En curso',   value: tareas?.filter((t) => t.estado === 'EN_CURSO').length ?? 0,   color: '#60a5fa' },
    { name: 'Completada', value: tareas?.filter((t) => t.estado === 'COMPLETADA').length ?? 0, color: '#34d399' },
  ].filter((d) => d.value > 0);

  const PRIORIDAD_DOT: Record<string, string> = {
    BAJA: 'bg-gray-400', MEDIA: 'bg-blue-500', ALTA: 'bg-orange-500', URGENTE: 'bg-red-500',
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-800 via-slate-700 to-emerald-800 shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.15),transparent_60%)]" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-emerald-500/5" />
        <div className="relative px-7 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar inicial */}
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {usuario?.nombre?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <div>
              <p className="text-xs text-emerald-300/80 font-medium tracking-widest uppercase mb-0.5">{getGreeting()}</p>
              <h1 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                {usuario?.nombre ?? 'Usuario'}
              </h1>
              <p className="text-slate-400 text-xs mt-0.5 capitalize">
                {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <Link to="/reportes" className="hidden sm:flex items-center gap-1.5 text-sm text-emerald-300 hover:text-white font-medium transition-colors shrink-0 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10">
            Ver reportes <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <KpiCard icon={Map}           color="emerald" label="Campos"           value={totalCampos}      sub={`${totalHectareas.toLocaleString('es-AR')} ha`}  to="/campos" />
            <KpiCard icon={Sprout}        color="green"   label="Siembras activas" value={siembrasEnCurso}  sub={`${insumos?.length ?? 0} insumos`}               to="/siembras" />
            <KpiCard icon={PawPrint}      color="pink"    label="Animales"         value={totalAnimales}    sub={`${prenecesActivas} preñeces`}                   to="/ganado" />
            <KpiCard
              icon={ClipboardList}
              color={tareasVencidas.length > 0 ? 'red' : 'blue'}
              label="Tareas"
              value={tareasPendientes}
              sub={tareasVencidas.length > 0 ? `${tareasVencidas.length} vencidas ⚠` : 'Al día'}
              to="/tareas"
              alert={tareasVencidas.length > 0}
            />
          </>
        )}
      </div>

      {/* Resumen financiero */}
      {!lFinanzas && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FinCard label="Ingresos" value={ingresos} icon={TrendingUp}   color="text-emerald-600 dark:text-emerald-400" bg="bg-emerald-50 dark:bg-emerald-900/30" />
          <FinCard label="Egresos"  value={egresos}  icon={TrendingDown}  color="text-red-600 dark:text-red-400"     bg="bg-red-50 dark:bg-red-900/30" />
          <FinCard label="Saldo"    value={saldo}    icon={DollarSign}   color={saldo >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'} bg={saldo >= 0 ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-red-50 dark:bg-red-900/30'} />
        </div>
      )}

      {/* Weather strip */}
      <WeatherStrip />

      {/* Gráficos */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Producción por mes */}
        <div className="bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Wheat size={16} className="text-green-500" /> Producción anual
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Kg cosechados por mes</p>
            </div>
            <Link to="/reportes" className="text-xs text-green-700 font-medium flex items-center gap-1">
              Detalle <ArrowRight size={11} />
            </Link>
          </div>
          {prodData.every((d) => d.kg === 0) ? (
            <EmptyChart label="No hay cosechas registradas" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={prodData} barSize={26}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}t` : String(v))} />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(v: any) => [`${Number(v).toLocaleString('es-AR')} kg`, 'Producción']}  
                  contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                />
                <Bar dataKey="kg" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Ingresos vs Egresos */}
        <div className="bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <DollarSign size={16} className="text-blue-500" /> Finanzas por mes
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Ingresos vs egresos</p>
            </div>
            <Link to="/finanzas" className="text-xs text-green-700 font-medium flex items-center gap-1">
              Ver finanzas <ArrowRight size={11} />
            </Link>
          </div>
          {finData.every((d) => d.Ingresos === 0 && d.Egresos === 0) ? (
            <EmptyChart label="No hay movimientos financieros" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={finData} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`)} />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(v: any, n: any) => [`$${Number(v).toLocaleString('es-AR')}`, String(n)]}
                  contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Ingresos" fill="#34d399" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Egresos"  fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Tareas + Pie + AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas tareas */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ClipboardList size={16} className="text-green-500" /> Próximas tareas
            </h2>
            <Link to="/tareas" className="text-xs text-green-700 font-medium flex items-center gap-1">
              Ver todas <ArrowRight size={11} />
            </Link>
          </div>
          {lTareas ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : proximasTareas.length === 0 ? (
            <div className="text-center py-10 text-gray-300">
              <Activity size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No hay tareas pendientes</p>
            </div>
          ) : (
            <div className="space-y-2">
              {proximasTareas.map((t) => {
                const today = new Date(); today.setHours(0, 0, 0, 0);
                const diff  = Math.ceil((new Date(t.fechaProgramada).getTime() - today.getTime()) / 86400000);
                const overdue = diff < 0;
                return (
                  <div key={t.id} className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                    overdue ? 'border-red-200/60 dark:border-red-900/40 bg-red-50/60 dark:bg-red-900/20' : 'border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${PRIORIDAD_DOT[t.prioridad]}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{t.titulo}</p>
                        {t.campo && <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{t.campo.nombre}</p>}
                      </div>
                    </div>
                    <span className={`shrink-0 ml-3 text-xs font-semibold whitespace-nowrap ${overdue ? 'text-red-600' : diff === 0 ? 'text-orange-600' : 'text-gray-400'}`}>
                      {overdue
                        ? <span className="flex items-center gap-1">Hace {Math.abs(diff)}d <AlertTriangle size={10} /></span>
                        : diff === 0 ? 'Hoy'
                        : diff === 1 ? 'Mañana'
                        : `En ${diff}d`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pie estado de tareas */}
        <div className="bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-100 dark:border-gray-700/40 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Activity size={16} className="text-purple-500" /> Estado de tareas
          </h2>
          {pieData.length === 0 ? (
            <EmptyChart label="Sin tareas registradas" />
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(v: any, n: any) => [Number(v), String(n)]}
                    contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-2">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* AI Insights */}
      <AiInsights />

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStat label="Total cosechas" value={siembras?.reduce((a, s) => a + s.cosechas.length, 0) ?? 0}                                       unit="cosechas" to="/reportes" />
        <QuickStat label="Lotes activos"  value={campos?.reduce((a, c) => a + c.lotes.length, 0) ?? 0}                                            unit="lotes"    to="/campos" />
        <QuickStat label="Insumos"        value={insumos?.length ?? 0}                                                                             unit="tipos"    to="/insumos" />
        <QuickStat label="Total producción"
          value={siembras?.reduce((a, s) => a + s.cosechas.reduce((b, c) => b + c.totalKg, 0), 0) ?? 0}
          unit="kg" to="/reportes" big />
      </div>
    </div>
  );
}

// ── Sub-componentes ────────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, { bg: string; icon: string; ring: string }> = {
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/30', icon: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-100 dark:ring-emerald-800/40' },
  green:   { bg: 'bg-green-50 dark:bg-green-900/30',   icon: 'text-green-600 dark:text-green-400',   ring: 'ring-green-100 dark:ring-green-800/40'   },
  pink:    { bg: 'bg-pink-50 dark:bg-pink-900/30',    icon: 'text-pink-600 dark:text-pink-400',    ring: 'ring-pink-100 dark:ring-pink-800/40'    },
  blue:    { bg: 'bg-blue-50 dark:bg-blue-900/30',    icon: 'text-blue-600 dark:text-blue-400',    ring: 'ring-blue-100 dark:ring-blue-800/40'    },
  red:     { bg: 'bg-red-50 dark:bg-red-900/30',     icon: 'text-red-600 dark:text-red-400',     ring: 'ring-red-100 dark:ring-red-800/40'     },
};

function KpiCard({ icon: Icon, color, label, value, sub, to, alert }: {
  icon: typeof Map; color: string; label: string; value: number; sub: string; to: string; alert?: boolean;
}) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.blue;
  return (
    <Link to={to} className="bg-white dark:bg-gray-800/70 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/40 hover:shadow-md hover:-translate-y-0.5 transition-all group relative overflow-hidden">
      {alert && <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full" />}
      <div className={`inline-flex p-2.5 rounded-xl ${c.bg} ring-4 ${c.ring} mb-4`}>
        <Icon size={20} className={c.icon} />
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white leading-none">{value.toLocaleString('es-AR')}</p>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1.5 group-hover:text-green-500 transition-colors">{label}</p>
      <p className={`text-xs mt-0.5 font-medium ${alert ? 'text-red-500 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'}`}>{sub}</p>
    </Link>
  );
}

function FinCard({ label, value, icon: Icon, color, bg }: {
  label: string; value: number; icon: typeof DollarSign; color: string; bg: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800/70 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/40 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bg}`}>
        <Icon size={20} className={color} />
      </div>
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">{label}</p>
        <p className={`text-xl font-bold ${color}`}>
          ${Math.abs(value).toLocaleString('es-AR')}
        </p>
      </div>
    </div>
  );
}

function QuickStat({ label, value, unit, to, big }: {
  label: string; value: number; unit: string; to: string; big?: boolean;
}) {
  return (
    <Link to={to} className="bg-white dark:bg-gray-800/70 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/40 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <p className={`font-bold text-gray-900 dark:text-white leading-none ${big ? 'text-2xl' : 'text-xl'}`}>
        {value.toLocaleString('es-AR')}
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{label}</p>
      <p className="text-[10px] text-gray-400 dark:text-gray-500">{unit}</p>
    </Link>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-44 text-gray-300 text-sm flex-col gap-2">
      <FlaskConical size={24} className="opacity-30" />
      <span>{label}</span>
    </div>
  );
}

// ─── Weather strip ─────────────────────────────────────────────────────────────
interface WeatherCurrent {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  precipitation: number;
}

async function fetchDashboardWeather(): Promise<WeatherCurrent> {
  // Default: Buenos Aires (zona agrícola central)
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=-34.6037&longitude=-58.3816' +
    '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,precipitation' +
    '&timezone=America%2FArgentina%2FBuenos_Aires';
  const res = await fetch(url);
  if (!res.ok) throw new Error();
  const data = await res.json();
  return data.current as WeatherCurrent;
}

function WeatherStrip() {
  const { data, isLoading } = useQuery({
    queryKey: ['weather-dashboard'],
    queryFn: fetchDashboardWeather,
    staleTime: 15 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }
  if (!data) return null;

  const wmo = wmoInfo(data.weather_code);

  return (
    <Link
      to="/clima"
      className="flex items-center justify-between gap-4 bg-linear-to-r from-blue-600 to-sky-500 dark:from-blue-700 dark:to-sky-600 rounded-2xl px-5 py-3.5 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
    >
      <div className="flex items-center gap-3">
        <Cloud size={20} className="opacity-70 shrink-0" />
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold">{Math.round(data.temperature_2m)}°C</span>
          <span className="text-xl">{wmo.emoji}</span>
          <span className="text-sm font-medium opacity-90">{wmo.label}</span>
          <span className="hidden sm:inline text-xs opacity-60">·</span>
          <span className="hidden sm:inline text-xs opacity-70">Buenos Aires</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4 text-xs opacity-80">
        <span>💧 {data.relative_humidity_2m}%</span>
        <span>💨 {Math.round(data.wind_speed_10m)} km/h</span>
        <span>🌧️ {data.precipitation} mm</span>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium opacity-80 group-hover:opacity-100 shrink-0">
        Ver clima completo <ArrowRight size={13} />
      </div>
    </Link>
  );
}

