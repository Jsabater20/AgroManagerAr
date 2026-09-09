import { useQuery } from '@tanstack/react-query';
import { BadgeDollarSign, Info, Loader2, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { calculosApi } from '../../api/calculos.api';
import type { Campo } from '../../api/types';
import { CalculatorLayout } from '../../components/calculos/CalculatorLayout';
import { SaveCalculationButton } from '../../components/calculos/SaveCalculationButton';
import { PlanBanner } from '../../components/ui/PlanBanner';
import {
  calcularCostoTotal,
  calcularIngresoEsperado,
  calcularPuntoEquilibrioKgHa,
} from '../../lib/calculos';
import { useAuthStore } from '../../store/auth.store';

type ModoCalculo = 'MANUAL' | 'AGROMANAGER';

export default function EconomicosCalculatorPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const usuario = useAuthStore((state) => state.usuario);
  const organizacion = usuario?.organizaciones?.find((item) => item.id === organizacionId);
  const tienePro = organizacion?.plan === 'PRO' || organizacion?.planEfectivo === 'PRO';
  const [modo, setModo] = useState<ModoCalculo>('MANUAL');
  const [campoId, setCampoId] = useState('');
  const [loteId, setLoteId] = useState('');
  const [cultivo, setCultivo] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [rendimiento, setRendimiento] = useState('');
  const [precio, setPrecio] = useState('');
  const [costoPorHa, setCostoPorHa] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const camposQuery = useQuery({
    queryKey: ['calculos', 'economicos', organizacionId],
    queryFn: () => calculosApi.obtenerCamposDisponibles() as Promise<Campo[]>,
    enabled: tienePro && modo === 'AGROMANAGER' && organizacionId > 0,
  });
  const costosQuery = useQuery({
    queryKey: ['calculos', 'costos-registrados', organizacionId, campoId],
    queryFn: () => calculosApi.obtenerCostosRegistrados(Number(campoId)),
    enabled: tienePro && modo === 'AGROMANAGER' && Number(campoId) > 0 && !loteId,
  });
  const campos = camposQuery.data ?? [];
  const campoSeleccionado = campos.find((campo) => campo.id === Number(campoId));
  const loteSeleccionado = campoSeleccionado?.lotes?.find((lote) => lote.id === Number(loteId));
  const superficieNumero = toNumber(superficie);
  const rendimientoNumero = toNumber(rendimiento);
  const precioNumero = toNumber(precio);
  const costoPorHaNumero = toNumber(costoPorHa);
  const puedeCalcular = superficieNumero > 0 && rendimientoNumero > 0 && precioNumero > 0 && costoPorHaNumero >= 0 && costoPorHa.trim() !== '';
  const ingresoEsperado = calcularIngresoEsperado(superficieNumero, rendimientoNumero, precioNumero);
  const costoTotal = calcularCostoTotal(superficieNumero, costoPorHaNumero);
  const margenBruto = ingresoEsperado - costoTotal;
  const margenPorHa = superficieNumero > 0 ? margenBruto / superficieNumero : 0;
  const puntoEquilibrio = calcularPuntoEquilibrioKgHa(costoPorHaNumero, precioNumero);
  const costoRegistradoPorHa = campoSeleccionado && campoSeleccionado.hectareas > 0
    ? (costosQuery.data?.totalEgresos ?? 0) / campoSeleccionado.hectareas
    : 0;

  const seleccionarCampo = (valor: string) => {
    setCampoId(valor);
    setLoteId('');
    const campo = campos.find((item) => item.id === Number(valor));
    setSuperficie(campo ? String(campo.hectareas) : '');
    setMostrarResultado(false);
  };

  const seleccionarLote = (valor: string) => {
    setLoteId(valor);
    const lote = campoSeleccionado?.lotes?.find((item) => item.id === Number(valor));
    setSuperficie(lote ? String(lote.hectareas) : campoSeleccionado ? String(campoSeleccionado.hectareas) : '');
    setMostrarResultado(false);
  };

  const limpiar = () => {
    setModo('MANUAL');
    setCampoId('');
    setLoteId('');
    setCultivo('');
    setSuperficie('');
    setRendimiento('');
    setPrecio('');
    setCostoPorHa('');
    setMostrarResultado(false);
  };

  if (!tienePro) {
    return (
      <CalculatorLayout>
        <Link to={`/org/${orgId}/calculos`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">← Todos los cálculos</Link>
        <PlanBanner
          feature="Cálculos económicos"
          description="Con Pro podés proyectar ingresos, costos, margen bruto y punto de equilibrio de cada lote o cultivo."
        />
      </CalculatorLayout>
    );
  }

  return (
    <CalculatorLayout>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link to={`/org/${orgId}/calculos`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">← Todos los cálculos</Link>
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-xl bg-violet-100 p-2.5 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><BadgeDollarSign size={22} /></span>
              <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Margen y punto de equilibrio</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Proyectá ingresos, costos y el rendimiento mínimo necesario para cubrirlos.</p></div>
            </div>
          </div>
          <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">Plan Pro</span>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <ModeButton active={modo === 'MANUAL'} icon={Info} title="Cálculo rápido" detail="Cargá todos los valores manualmente." onClick={() => { setModo('MANUAL'); setMostrarResultado(false); }} />
          <ModeButton active={modo === 'AGROMANAGER'} icon={Sparkles} title="Usar campo o lote" detail="Completá la superficie desde AgroManager." onClick={() => { setModo('AGROMANAGER'); setMostrarResultado(false); }} />
        </div>

        {modo === 'AGROMANAGER' && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <p className="text-sm font-bold text-emerald-950 dark:text-emerald-100">Superficie desde AgroManager</p>
            {camposQuery.isLoading ? <p className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-200"><Loader2 size={16} className="animate-spin" /> Cargando campos...</p> : camposQuery.isError ? <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">No pudimos cargar tus campos. Podés volver al cálculo manual.</p> : (
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <FieldSelect label="Campo" value={campoId} onChange={seleccionarCampo}>
                  <option value="">Seleccioná un campo</option>
                  {campos.map((campo) => <option key={campo.id} value={campo.id}>{campo.nombre} · {formatNumber(campo.hectareas)} ha</option>)}
                </FieldSelect>
                <FieldSelect label="Lote (opcional)" value={loteId} onChange={seleccionarLote} disabled={!campoSeleccionado}>
                  <option value="">Usar superficie total del campo</option>
                  {campoSeleccionado?.lotes?.map((lote) => <option key={lote.id} value={lote.id}>{lote.nombre} · {formatNumber(lote.hectareas)} ha</option>)}
                </FieldSelect>
              </div>
            )}
          </div>
        )}

        {modo === 'AGROMANAGER' && campoSeleccionado && !loteSeleccionado && <div className="mt-5 rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-500/30 dark:bg-violet-500/10"><p className="text-sm font-bold text-violet-950 dark:text-violet-100">Costos reales registrados del campo</p>{costosQuery.isLoading ? <p className="mt-2 text-sm text-violet-800 dark:text-violet-200">Consultando egresos asociados al campo...</p> : costosQuery.isError ? <p className="mt-2 text-sm text-violet-800 dark:text-violet-200">No pudimos consultar los costos registrados. Podés continuar con un valor manual.</p> : costosQuery.data?.cantidadMovimientos ? <div className="mt-2 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-violet-900 dark:text-violet-100">{formatCurrency(costosQuery.data.totalEgresos)} en {costosQuery.data.cantidadMovimientos} egreso(s) · {formatCurrency(costoRegistradoPorHa)}/ha</p><button type="button" onClick={() => { setCostoPorHa(String(costoRegistradoPorHa)); setMostrarResultado(false); }} className="rounded-lg bg-violet-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-800">Usar como costo/ha</button></div> : <p className="mt-2 text-sm text-violet-800 dark:text-violet-200">Todavía no hay egresos asociados a este campo. Podés cargar el costo manualmente.</p>}</div>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <TextField label="Cultivo (opcional)" value={cultivo} onChange={(valor) => { setCultivo(valor); setMostrarResultado(false); }} placeholder="Ej. Maíz" />
          <NumberField label="Superficie" value={superficie} onChange={setSuperficie} unit="ha" readOnly={modo === 'AGROMANAGER'} placeholder="Ej. 80" required />
          <NumberField label="Rendimiento esperado" value={rendimiento} onChange={(valor) => { setRendimiento(valor); setMostrarResultado(false); }} unit="kg/ha" placeholder="Ej. 8500" required />
          <NumberField label="Precio esperado" value={precio} onChange={(valor) => { setPrecio(valor); setMostrarResultado(false); }} unit="$/kg" placeholder="Ej. 230" required />
          <NumberField label="Costo por hectárea" value={costoPorHa} onChange={(valor) => { setCostoPorHa(valor); setMostrarResultado(false); }} unit="$/ha" placeholder="Ej. 850000" required />
        </div>
        {modo === 'AGROMANAGER' && !campoSeleccionado && <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Seleccioná un campo para completar la superficie automáticamente.</p>}

        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={() => setMostrarResultado(true)} disabled={!puedeCalcular} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">Calcular margen</button>
          <button type="button" onClick={limpiar} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"><RotateCcw size={16} /> Limpiar</button>
        </div>
        {!puedeCalcular && mostrarResultado && <p className="mt-4 text-sm font-medium text-rose-700 dark:text-rose-300">Completá superficie, rendimiento, precio y costo por hectárea con valores válidos.</p>}
      </section>

      {mostrarResultado && puedeCalcular && (
        <section className="rounded-2xl bg-slate-950 p-5 text-white shadow-lg sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Resultado estimado</p>
          <h2 className="mt-2 text-2xl font-bold">{cultivo.trim() ? cultivo.trim() : 'Producción estimada'} en {formatNumber(superficieNumero)} ha</h2>
          {(campoSeleccionado || loteSeleccionado) && <p className="mt-2 text-sm text-slate-300">{campoSeleccionado?.nombre}{loteSeleccionado ? ` · Lote ${loteSeleccionado.nombre}` : ''}</p>}
          <div className="mt-5"><SaveCalculationButton payload={{ tipo: 'ECONOMICO', titulo: `${cultivo.trim() || 'Producción estimada'} en ${formatNumber(superficieNumero)} ha`, campoId: campoSeleccionado?.id, loteId: loteSeleccionado?.id, datos: { cultivo: cultivo.trim() || undefined, superficieHa: superficieNumero, rendimientoKgHa: rendimientoNumero, precioPorKg: precioNumero, costoPorHa: costoPorHaNumero, campoNombre: campoSeleccionado?.nombre, loteNombre: loteSeleccionado?.nombre }, resultado: { ingresoEsperado, costoTotal, margenBruto, margenPorHa, puntoEquilibrioKgHa: puntoEquilibrio } }} /></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ResultCard icon={BadgeDollarSign} label="Ingreso esperado" value={formatCurrency(ingresoEsperado)} detail={`${formatNumber(rendimientoNumero)} kg/ha × ${formatCurrency(precioNumero)}/kg`} />
            <ResultCard icon={BadgeDollarSign} label="Costo total" value={formatCurrency(costoTotal)} detail={`${formatCurrency(costoPorHaNumero)} por ha`} />
            <ResultCard icon={BadgeDollarSign} label="Margen bruto" value={formatCurrency(margenBruto)} detail={`${formatCurrency(margenPorHa)} por ha`} positive={margenBruto >= 0} />
            <ResultCard icon={Info} label="Punto de equilibrio" value={`${formatNumber(puntoEquilibrio)} kg/ha`} detail="Rendimiento mínimo para cubrir costos" />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-slate-400">Proyección orientativa. No reemplaza un presupuesto completo: revisá impuestos, fletes, gastos financieros y demás costos antes de tomar decisiones.</p>
        </section>
      )}
    </CalculatorLayout>
  );
}

function ModeButton({ icon: Icon, title, detail, active, onClick }: { icon: typeof Info; title: string; detail: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={'rounded-xl border p-4 text-left transition ' + (active ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-500/10' : 'border-gray-200 hover:border-emerald-300 dark:border-gray-700')}><Icon size={19} className={active ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'} /><p className="mt-3 font-bold text-gray-900 dark:text-white">{title}</p><p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{detail}</p></button>;
}

function FieldSelect({ label, value, onChange, disabled, children }: { label: string; value: string; onChange: (value: string) => void; disabled?: boolean; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}<select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-emerald-500/20">{children}</select></label>;
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}<input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-emerald-500/20" /></label>;
}

function NumberField({ label, value, onChange, unit, placeholder, readOnly, required }: { label: string; value: string; onChange: (value: string) => void; unit: string; placeholder: string; readOnly?: boolean; required?: boolean }) {
  return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}{required && <span className="text-rose-600"> *</span>}<div className="relative mt-1.5"><input inputMode="decimal" value={value} readOnly={readOnly} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 pr-16 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 read-only:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:read-only:bg-gray-700" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">{unit}</span></div></label>;
}

function ResultCard({ icon: Icon, label, value, detail, positive }: { icon: typeof BadgeDollarSign; label: string; value: string; detail: string; positive?: boolean }) {
  return <div className="rounded-xl bg-white/10 p-4"><Icon size={20} className={positive === false ? 'text-rose-300' : 'text-emerald-300'} /><p className="mt-4 text-sm text-slate-300">{label}</p><p className={positive === false ? 'mt-1 text-3xl font-bold text-rose-200' : 'mt-1 text-3xl font-bold'}>{value}</p><p className="mt-1 text-xs text-slate-400">{detail}</p></div>;
}

function toNumber(value: string) {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
}
