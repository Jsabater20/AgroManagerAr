import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft, Loader2, Sprout, FlaskConical, Wheat, Clock,
  TrendingUp, Package, AlertCircle, ChevronRight,
} from 'lucide-react';
import { camposApi } from '../../api/campos.api';
import { siembrasApi } from '../../api/siembras.api';
import type { Siembra } from '../../api/types';

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });

const ESTADO_SIEMBRA: Record<string, { label: string; color: string }> = {
  EN_CURSO: { label: 'En curso',   color: 'bg-blue-100 text-blue-700' },
  COSECHADA: { label: 'Cosechada', color: 'bg-green-100 text-green-700' },
  PERDIDA:   { label: 'Perdida',   color: 'bg-red-100 text-red-700' },
};

export default function LoteDetailPage() {
  const { campoId, loteId } = useParams<{ campoId: string; loteId: string }>();
  const cId = Number(campoId);
  const lId = Number(loteId);

  const { data: campo, isLoading: lCampo } = useQuery({
    queryKey: ['campos', cId],
    queryFn: () => camposApi.getOne(cId),
    enabled: !!cId,
  });

  const { data: siembras, isLoading: lSiembras } = useQuery({
    queryKey: ['siembras'],
    queryFn: siembrasApi.getAll,
  });

  const lote = campo?.lotes.find((l) => l.id === lId);
  const loteSiembras = (siembras ?? []).filter((s) => s.loteId === lId);

  const isLoading = lCampo || lSiembras;

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 size={32} className="animate-spin text-green-600" />
      </div>
    );
  }

  if (!campo || !lote) {
    return (
      <div className="text-center py-24 text-gray-500">
        Lote no encontrado.{' '}
        <Link to="/campos" className="text-green-700 underline">
          Volver a campos
        </Link>
      </div>
    );
  }

  const totalKg = loteSiembras.reduce(
    (a, s) => a + s.cosechas.reduce((b, c) => b + c.totalKg, 0),
    0,
  );
  const totalAplicaciones = loteSiembras.reduce((a, s) => a + s.aplicaciones.length, 0);
  const avgRendimiento = (() => {
    const all = loteSiembras.flatMap((s) => s.cosechas.map((c) => c.rendimientoKgHa));
    return all.length ? Math.round(all.reduce((a, v) => a + v, 0) / all.length) : 0;
  })();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <Link to="/campos" className="hover:text-green-700 transition-colors">Campos</Link>
          <ChevronRight size={13} />
          <Link to={`/campos/${cId}`} className="hover:text-green-700 transition-colors">{campo.nombre}</Link>
          <ChevronRight size={13} />
          <span className="text-gray-700 font-medium">{lote.nombre}</span>
        </div>
        <Link to={`/campos/${cId}`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700">
          <ArrowLeft size={14} /> Volver al campo
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{lote.nombre}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{campo.nombre} · {lote.hectareas} ha</p>
        </div>
        <Link
          to="/siembras"
          className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Sprout size={15} />
          Nueva siembra
        </Link>
      </div>

      {/* KPIs del lote */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <LoteKpi label="Siembras" value={loteSiembras.length}   unit="total"  icon={Sprout}      color="text-green-600"  bg="bg-green-50" />
        <LoteKpi label="Producción" value={totalKg}             unit="kg"     icon={Wheat}       color="text-amber-600"  bg="bg-amber-50" />
        <LoteKpi label="Rend. prom" value={avgRendimiento}      unit="kg/ha"  icon={TrendingUp}  color="text-blue-600"   bg="bg-blue-50" />
        <LoteKpi label="Aplicaciones" value={totalAplicaciones} unit="total"  icon={FlaskConical} color="text-purple-600" bg="bg-purple-50" />
      </div>

      {/* Timeline de siembras */}
      {loteSiembras.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center text-gray-400">
          <Sprout size={36} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Este lote no tiene siembras registradas</p>
          <p className="text-sm mt-1">Registrá una siembra desde el módulo Siembras</p>
        </div>
      ) : (
        <div className="space-y-6">
          {[...loteSiembras]
            .sort((a, b) => new Date(b.fechaSiembra).getTime() - new Date(a.fechaSiembra).getTime())
            .map((siembra) => (
              <SiembraCard key={siembra.id} siembra={siembra} loteHa={lote.hectareas} />
            ))}
        </div>
      )}
    </div>
  );
}

// ── Siembra Card con timeline interno ─────────────────────────────────────────

function SiembraCard({ siembra, loteHa }: { siembra: Siembra; loteHa: number }) {
  const st = ESTADO_SIEMBRA[siembra.estado];
  const totalKg    = siembra.cosechas.reduce((a, c) => a + c.totalKg, 0);
  const totalCostas = siembra.cosechas.length;

  // Construir timeline cronológico
  type TimelineItem = {
    date: string;
    type: 'siembra' | 'aplicacion' | 'cosecha';
    label: string;
    sub: string;
    icon: typeof Sprout;
    color: string;
  };

  const items: TimelineItem[] = [
    {
      date: siembra.fechaSiembra,
      type: 'siembra' as const,
      label: `Siembra de ${siembra.tipoCultivo.nombre}`,
      sub: siembra.densidad ? `Densidad: ${siembra.densidad} kg/ha` : 'Sin densidad registrada',
      icon: Sprout,
      color: 'bg-green-100 text-green-700 border-green-200',
    },
    ...siembra.aplicaciones.map((ap) => ({
      date: ap.fecha,
      type: 'aplicacion' as const,
      label: `${ap.insumo.nombre}`,
      sub: `${ap.cantidad} ${ap.unidad}${ap.observaciones ? ` · ${ap.observaciones}` : ''}`,
      icon: FlaskConical,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
    })),
    ...siembra.cosechas.map((co) => ({
      date: co.fechaCosecha,
      type: 'cosecha' as const,
      label: `Cosecha`,
      sub: `${co.totalKg.toLocaleString('es-AR')} kg · ${co.rendimientoKgHa.toLocaleString('es-AR')} kg/ha${co.humedad ? ` · ${co.humedad}% hum.` : ''}`,
      icon: Wheat,
      color: 'bg-amber-100 text-amber-700 border-amber-200',
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header siembra */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-green-50 p-2 rounded-xl">
            <Sprout size={18} className="text-green-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{siembra.tipoCultivo.nombre}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Clock size={11} />
              Siembra: {fmtDate(siembra.fechaSiembra)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {totalCostas > 0 && (
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{totalKg.toLocaleString('es-AR')} kg</p>
              <p className="text-xs text-gray-400">producidos</p>
            </div>
          )}
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${st.color}`}>{st.label}</span>
        </div>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        <div className="px-6 py-3 text-center">
          <p className="text-lg font-bold text-gray-900">{siembra.aplicaciones.length}</p>
          <p className="text-xs text-gray-400">Aplicaciones</p>
        </div>
        <div className="px-6 py-3 text-center">
          <p className="text-lg font-bold text-gray-900">{siembra.cosechas.length}</p>
          <p className="text-xs text-gray-400">Cosechas</p>
        </div>
        <div className="px-6 py-3 text-center">
          <p className="text-lg font-bold text-gray-900">
            {totalKg > 0 && loteHa > 0
              ? `${Math.round(totalKg / loteHa).toLocaleString('es-AR')}`
              : '—'}
          </p>
          <p className="text-xs text-gray-400">kg/ha prom.</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 py-5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Historial cronológico
        </h4>
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-100" />
          <div className="space-y-4">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-4 relative">
                  <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${item.color} shrink-0`}>
                    <Icon size={13} />
                  </div>
                  <div className="flex-1 pt-0.5 pb-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-400 whitespace-nowrap shrink-0">{fmtDate(item.date)}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              );
            })}
            {siembra.estado === 'EN_CURSO' && (
              <div className="flex items-center gap-4 relative">
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 border-dashed border-gray-300 bg-white shrink-0">
                  <AlertCircle size={13} className="text-gray-300" />
                </div>
                <p className="text-xs text-gray-300 italic">En proceso...</p>
              </div>
            )}
          </div>
        </div>

        {siembra.observaciones && (
          <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500 flex items-start gap-1.5">
              <Package size={12} className="mt-0.5 shrink-0" />
              {siembra.observaciones}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoteKpi({ label, value, unit, icon: Icon, color, bg }: {
  label: string; value: number; unit: string; icon: typeof Sprout; color: string; bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className={`inline-flex p-2 rounded-xl ${bg} mb-3`}>
        <Icon size={16} className={color} />
      </div>
      <p className="text-2xl font-bold text-gray-900 leading-none">{value.toLocaleString('es-AR')}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
      <p className="text-xs text-gray-400">{unit}</p>
    </div>
  );
}
