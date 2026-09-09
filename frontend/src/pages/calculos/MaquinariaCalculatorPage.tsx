import { useQuery } from '@tanstack/react-query';
import { Fuel, Info, Loader2, RotateCcw, Tractor } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { calculosApi, type MaquinariaCalculable } from '../../api/calculos.api';
import { CalculatorLayout } from '../../components/calculos/CalculatorLayout';
import { SaveCalculationButton } from '../../components/calculos/SaveCalculationButton';
import { PlanBanner } from '../../components/ui/PlanBanner';
import { calcularCombustibleNecesario, calcularCostoCombustible } from '../../lib/calculos';
import { useAuthStore } from '../../store/auth.store';

export default function MaquinariaCalculatorPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const usuario = useAuthStore((state) => state.usuario);
  const organizacion = usuario?.organizaciones?.find((item) => item.id === organizacionId);
  const tienePro = organizacion?.plan === 'PRO' || organizacion?.planEfectivo === 'PRO';
  const [maquinariaId, setMaquinariaId] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [consumo, setConsumo] = useState('');
  const [precioCombustible, setPrecioCombustible] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const maquinariasQuery = useQuery({
    queryKey: ['calculos', 'maquinarias', organizacionId],
    queryFn: () => calculosApi.obtenerMaquinariasDisponibles() as Promise<MaquinariaCalculable[]>,
    enabled: tienePro && organizacionId > 0,
  });
  const maquinarias = maquinariasQuery.data ?? [];
  const maquinariaSeleccionada = maquinarias.find((maquinaria) => maquinaria.id === Number(maquinariaId));
  const superficieNumero = toNumber(superficie);
  const consumoNumero = toNumber(consumo);
  const precioNumero = toNumber(precioCombustible);
  const puedeCalcular = superficieNumero > 0 && consumoNumero > 0 && precioNumero > 0;
  const combustibleNecesario = calcularCombustibleNecesario(superficieNumero, consumoNumero);
  const costoCombustible = calcularCostoCombustible(combustibleNecesario, precioNumero);
  const costoPorHa = superficieNumero > 0 ? costoCombustible / superficieNumero : 0;

  const limpiar = () => {
    setMaquinariaId('');
    setSuperficie('');
    setConsumo('');
    setPrecioCombustible('');
    setMostrarResultado(false);
  };

  if (!tienePro) {
    return (
      <CalculatorLayout>
        <Link to={`/org/${orgId}/calculos`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">← Todos los cálculos</Link>
        <PlanBanner
          feature="Calculadora de maquinaria"
          description="Con Pro podés proyectar combustible y costos operativos, asociando el cálculo a tus equipos registrados."
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
              <span className="rounded-xl bg-orange-100 p-2.5 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"><Tractor size={22} /></span>
              <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Maquinaria y combustible</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Proyectá el combustible y el costo de una labor por superficie.</p></div>
            </div>
          </div>
          <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">Plan Pro</span>
        </div>

        <div className="mt-7 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/30 dark:bg-orange-500/10">
          <label className="block text-sm font-semibold text-orange-950 dark:text-orange-100">Maquinaria (opcional)
            {maquinariasQuery.isLoading ? <span className="mt-2 inline-flex items-center gap-2 text-sm font-normal text-orange-800 dark:text-orange-200"><Loader2 size={16} className="animate-spin" /> Cargando equipos...</span> : maquinariasQuery.isError ? <span className="mt-2 block text-sm font-normal text-rose-700 dark:text-rose-300">No pudimos cargar los equipos. Podés continuar sin asociar una maquinaria.</span> : <select value={maquinariaId} onChange={(event) => { setMaquinariaId(event.target.value); setMostrarResultado(false); }} className="mt-2 w-full rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-orange-500/40 dark:bg-gray-900 dark:text-white dark:focus:ring-orange-500/20"><option value="">No asociar una maquinaria</option>{maquinarias.map((maquinaria) => <option key={maquinaria.id} value={maquinaria.id}>{maquinaria.nombre}{maquinaria.marca ? ` · ${maquinaria.marca}` : ''}{maquinaria.modelo ? ` ${maquinaria.modelo}` : ''}</option>)}</select>}
          </label>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <NumberField label="Superficie de labor" value={superficie} onChange={(valor) => { setSuperficie(valor); setMostrarResultado(false); }} unit="ha" placeholder="Ej. 100" required />
          <NumberField label="Consumo estimado" value={consumo} onChange={(valor) => { setConsumo(valor); setMostrarResultado(false); }} unit="L/ha" placeholder="Ej. 12" required />
          <NumberField label="Precio combustible" value={precioCombustible} onChange={(valor) => { setPrecioCombustible(valor); setMostrarResultado(false); }} unit="$/L" placeholder="Ej. 1500" required />
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={() => setMostrarResultado(true)} disabled={!puedeCalcular} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">Calcular costo de labor</button>
          <button type="button" onClick={limpiar} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"><RotateCcw size={16} /> Limpiar</button>
        </div>
        {!puedeCalcular && mostrarResultado && <p className="mt-4 text-sm font-medium text-rose-700 dark:text-rose-300">Completá superficie, consumo y precio de combustible con valores mayores a cero.</p>}
      </section>

      {mostrarResultado && puedeCalcular && (
        <section className="rounded-2xl bg-slate-950 p-5 text-white shadow-lg sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Resultado estimado</p>
          <h2 className="mt-2 text-2xl font-bold">{maquinariaSeleccionada ? maquinariaSeleccionada.nombre : 'Labor estimada'} para {formatNumber(superficieNumero)} ha</h2>
          <div className="mt-5"><SaveCalculationButton payload={{ tipo: 'MAQUINARIA', titulo: `${maquinariaSeleccionada?.nombre || 'Labor de maquinaria'} para ${formatNumber(superficieNumero)} ha`, maquinariaId: maquinariaSeleccionada?.id, datos: { superficieHa: superficieNumero, consumoLitrosPorHa: consumoNumero, precioCombustiblePorLitro: precioNumero, maquinariaNombre: maquinariaSeleccionada?.nombre }, resultado: { combustibleLitros: combustibleNecesario, costoCombustible, costoPorHa } }} /></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard icon={Fuel} label="Combustible necesario" value={`${formatNumber(combustibleNecesario)} L`} detail={`${formatNumber(consumoNumero)} L/ha`} />
            <ResultCard icon={Tractor} label="Costo de combustible" value={formatCurrency(costoCombustible)} detail={`${formatNumber(precioNumero)} por litro`} />
            <ResultCard icon={Info} label="Costo por hectárea" value={formatCurrency(costoPorHa)} detail="Solo combustible" />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-slate-400">Estimación orientativa. No incluye mano de obra, mantenimiento, amortización ni otros costos operativos.</p>
        </section>
      )}
    </CalculatorLayout>
  );
}

function NumberField({ label, value, onChange, unit, placeholder, required }: { label: string; value: string; onChange: (value: string) => void; unit: string; placeholder: string; required?: boolean }) {
  return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}{required && <span className="text-rose-600"> *</span>}<div className="relative mt-1.5"><input inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 pr-14 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-emerald-500/20" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">{unit}</span></div></label>;
}

function ResultCard({ icon: Icon, label, value, detail }: { icon: typeof Fuel; label: string; value: string; detail: string }) {
  return <div className="rounded-xl bg-white/10 p-4"><Icon size={20} className="text-emerald-300" /><p className="mt-4 text-sm text-slate-300">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-400">{detail}</p></div>;
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
