import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp, TrendingDown, DollarSign, Wheat, Sprout,
  ChevronDown, ChevronUp, BarChart2,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { campaniasApi } from '../../api/campanias.api';
import { finanzasApi } from '../../api/finanzas.api';
import { siembrasApi } from '../../api/siembras.api';
import { StatCardSkeleton } from '../../components/ui/Skeleton';

const fmtARS = (n: number) =>
  `$${Math.abs(n).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export default function RentabilidadPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data: campanias, isLoading: lCamp } = useQuery({ queryKey: ['campanias'], queryFn: campaniasApi.getAll });
  const { data: finanzas,  isLoading: lFin  } = useQuery({ queryKey: ['finanzas'],  queryFn: finanzasApi.getAll });
  const { data: siembras,  isLoading: lSiem  } = useQuery({ queryKey: ['siembras'],  queryFn: siembrasApi.getAll });

  const isLoading = lCamp || lFin || lSiem;

  // ── Global financiero ──────────────────────────────────────────────────────
  const totalIngresos = finanzas?.filter((f) => f.tipo === 'INGRESO').reduce((a, f) => a + f.monto, 0) ?? 0;
  const totalEgresos  = finanzas?.filter((f) => f.tipo === 'EGRESO').reduce((a, f) => a + f.monto, 0) ?? 0;
  const saldoGlobal   = totalIngresos - totalEgresos;

  // ── Total producción ───────────────────────────────────────────────────────
  const totalKg = (siembras ?? []).reduce(
    (a, s) => a + s.cosechas.reduce((b, c) => b + c.totalKg, 0),
    0,
  );

  // ── Por campaña ────────────────────────────────────────────────────────────
  const campaniasData = (campanias ?? []).map((camp) => {
    const kgProducidos = camp.siembras.reduce(
      (a, s) => a + s.cosechas.reduce((b, c) => b + c.totalKg, 0),
      0,
    );
    // Ingresos por cosecha (categoría COSECHA) y egresos por insumo (categoría INSUMO)
    // en el rango de fechas de la campaña
    const inicio = new Date(camp.fechaInicio).getTime();
    const fin    = camp.fechaFin ? new Date(camp.fechaFin).getTime() : Date.now();
    const movs   = (finanzas ?? []).filter((f) => {
      const t = new Date(f.fecha).getTime();
      return t >= inicio && t <= fin;
    });
    const ingresos = movs.filter((f) => f.tipo === 'INGRESO').reduce((a, f) => a + f.monto, 0);
    const egresos  = movs.filter((f) => f.tipo === 'EGRESO').reduce((a, f) => a + f.monto, 0);
    const margen   = ingresos - egresos;
    const rentabilidad = ingresos > 0 ? Math.round((margen / ingresos) * 100) : 0;

    return { camp, kgProducidos, ingresos, egresos, margen, rentabilidad, movs };
  });

  // ── Gráfico: margen por campaña ────────────────────────────────────────────
  const chartData = campaniasData.map((d) => ({
    name: d.camp.nombre.length > 12 ? d.camp.nombre.slice(0, 12) + '…' : d.camp.nombre,
    margen: d.margen,
  }));

  // ── Desglose egresos por categoría (global) ────────────────────────────────
  const egresosPorCat: Record<string, number> = {};
  finanzas?.filter((f) => f.tipo === 'EGRESO').forEach((f) => {
    egresosPorCat[f.categoria] = (egresosPorCat[f.categoria] ?? 0) + f.monto;
  });
  const egresosCatData = Object.entries(egresosPorCat)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, monto]) => ({ cat: CAT_LABEL[cat] ?? cat, monto }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Costos y Rentabilidad</h1>
        <p className="text-gray-500 text-sm mt-1">Análisis económico por campaña y resumen global</p>
      </div>

      {/* KPIs globales */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <GlobalKpi label="Ingresos totales" value={fmtARS(totalIngresos)} icon={TrendingUp}  color="text-emerald-600" bg="bg-emerald-50" />
            <GlobalKpi label="Egresos totales"  value={fmtARS(totalEgresos)}  icon={TrendingDown} color="text-red-600"     bg="bg-red-50" />
            <GlobalKpi label="Saldo neto"        value={fmtARS(saldoGlobal)}   icon={DollarSign}  color={saldoGlobal >= 0 ? 'text-blue-600' : 'text-red-600'} bg={saldoGlobal >= 0 ? 'bg-blue-50' : 'bg-red-50'} />
            <GlobalKpi label="Producción total"  value={`${totalKg.toLocaleString('es-AR')} kg`} icon={Wheat} color="text-amber-600" bg="bg-amber-50" />
          </>
        )}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Margen por campaña */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-5">
            <BarChart2 size={16} className="text-green-600" /> Margen por campaña
          </h2>
          {chartData.length === 0 ? (
            <EmptyChart label="Sin campañas registradas" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`} />
                <Tooltip
                  formatter={(v) => [fmtARS(Number(v) || 0), 'Margen']}
                  contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                />
                <Bar dataKey="margen" radius={[4, 4, 0, 0]}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={d.margen >= 0 ? '#34d399' : '#f87171'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Egresos por categoría */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-5">
            <TrendingDown size={16} className="text-red-500" /> Egresos por categoría
          </h2>
          {egresosCatData.length === 0 ? (
            <EmptyChart label="Sin egresos registrados" />
          ) : (
            <div className="space-y-3 mt-2">
              {egresosCatData.map(({ cat, monto }) => {
                const pct = totalEgresos > 0 ? (monto / totalEgresos) * 100 : 0;
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{cat}</span>
                      <span className="text-gray-500">{fmtARS(monto)} · {pct.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Tabla por campaña */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Sprout size={16} className="text-green-600" />
          <h2 className="font-semibold text-gray-900">Análisis por campaña</h2>
        </div>

        {lCamp ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : campaniasData.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BarChart2 size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No hay campañas. Creá una desde el módulo Campañas.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {campaniasData.map(({ camp, kgProducidos, egresos, margen, rentabilidad, movs }) => (
              <div key={camp.id}>
                {/* Fila resumen */}
                <button
                  onClick={() => setExpanded(expanded === camp.id ? null : camp.id)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-xl">
                      <Sprout size={15} className="text-green-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{camp.nombre}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(camp.fechaInicio).toLocaleDateString('es-AR')}
                        {camp.fechaFin ? ` → ${new Date(camp.fechaFin).toLocaleDateString('es-AR')}` : ' · en curso'}
                        {' · '}{camp.siembras.length} siembras
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:grid grid-cols-3 gap-8 text-right">
                      <div>
                        <p className="text-xs text-gray-400">Producción</p>
                        <p className="text-sm font-semibold text-gray-900">{kgProducidos.toLocaleString('es-AR')} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Egresos</p>
                        <p className="text-sm font-semibold text-red-600">{fmtARS(egresos)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Margen</p>
                        <p className={`text-sm font-bold ${margen >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {margen >= 0 ? '+' : ''}{fmtARS(margen)}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      rentabilidad >= 20 ? 'bg-emerald-100 text-emerald-700'
                        : rentabilidad > 0 ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {rentabilidad}% rentab.
                    </div>
                    {expanded === camp.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </button>

                {/* Detalle expandido */}
                {expanded === camp.id && (
                  <div className="px-6 pb-5 bg-gray-50/60 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {/* Siembras */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Siembras de la campaña</h4>
                        {camp.siembras.length === 0 ? (
                          <p className="text-sm text-gray-400">Sin siembras asignadas</p>
                        ) : (
                          <div className="space-y-2">
                            {camp.siembras.map((s) => {
                              const kg = s.cosechas.reduce((a, c) => a + c.totalKg, 0);
                              return (
                                <div key={s.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-gray-100 text-sm">
                                  <span className="font-medium text-gray-900">{s.tipoCultivo.nombre}</span>
                                  <span className="text-gray-500">{kg.toLocaleString('es-AR')} kg</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Movimientos */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Movimientos del período</h4>
                        {movs.length === 0 ? (
                          <p className="text-sm text-gray-400">Sin movimientos en este período</p>
                        ) : (
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {movs.slice(0, 8).map((m) => (
                              <div key={m.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-gray-100 text-sm">
                                <div>
                                  <span className="font-medium text-gray-900">{m.concepto}</span>
                                  <span className="text-xs text-gray-400 ml-2">{CAT_LABEL[m.categoria] ?? m.categoria}</span>
                                </div>
                                <span className={`font-semibold ${m.tipo === 'INGRESO' ? 'text-emerald-600' : 'text-red-600'}`}>
                                  {m.tipo === 'INGRESO' ? '+' : '-'}{fmtARS(m.monto)}
                                </span>
                              </div>
                            ))}
                            {movs.length > 8 && (
                              <p className="text-xs text-gray-400 text-center py-1">+{movs.length - 8} más</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const CAT_LABEL: Record<string, string> = {
  COSECHA: 'Cosecha', VENTA_ANIMAL: 'Venta animal', INSUMO: 'Insumo',
  SERVICIO: 'Servicio', MANTENIMIENTO: 'Mantenimiento', VETERINARIA: 'Veterinaria',
  COMBUSTIBLE: 'Combustible', MANO_DE_OBRA: 'Mano de obra', OTRO: 'Otro',
};

function GlobalKpi({ label, value, icon: Icon, color, bg }: {
  label: string; value: string; icon: typeof DollarSign; color: string; bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className={`inline-flex p-2.5 rounded-xl ${bg} mb-3`}>
        <Icon size={18} className={color} />
      </div>
      <p className={`text-2xl font-bold ${color} leading-none`}>{value}</p>
      <p className="text-sm text-gray-500 mt-1.5">{label}</p>
    </div>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-44 text-gray-300 text-sm flex-col gap-2">
      <BarChart2 size={24} className="opacity-30" />
      <span>{label}</span>
    </div>
  );
}
