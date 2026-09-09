import { useQuery } from '@tanstack/react-query';
import { Info, Loader2, RotateCcw, Sparkles, Sprout, Weight } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { calculosApi } from '../../api/calculos.api';
import type { Campo } from '../../api/types';
import { CalculatorLayout } from '../../components/calculos/CalculatorLayout';
import { SaveCalculationButton } from '../../components/calculos/SaveCalculationButton';
import {
  calcularPesoSemillasKg,
  calcularSemillasNecesarias,
  calcularSemillasPorHaAjustadas,
} from '../../lib/calculos';
import { useAuthStore } from '../../store/auth.store';

type ModoCalculo = 'MANUAL' | 'AGROMANAGER';

export default function SiembraCalculatorPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const usuario = useAuthStore((state) => state.usuario);
  const organizacion = usuario?.organizaciones?.find((item) => item.id === organizacionId);
  const tienePro = organizacion?.plan === 'PRO' || organizacion?.planEfectivo === 'PRO';
  const [modo, setModo] = useState<ModoCalculo>('MANUAL');
  const [campoId, setCampoId] = useState('');
  const [loteId, setLoteId] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [densidad, setDensidad] = useState('');
  const [germinacion, setGerminacion] = useState('');
  const [pesoMilSemillas, setPesoMilSemillas] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const camposQuery = useQuery({
    queryKey: ['calculos', 'siembra', organizacionId],
    queryFn: () => calculosApi.obtenerCamposDisponibles() as Promise<Campo[]>,
    enabled: tienePro && modo === 'AGROMANAGER' && organizacionId > 0,
  });
  const campos = camposQuery.data ?? [];
  const campoSeleccionado = campos.find((campo) => campo.id === Number(campoId));
  const loteSeleccionado = campoSeleccionado?.lotes?.find((lote) => lote.id === Number(loteId));
  const superficieNumero = toNumber(superficie);
  const densidadNumero = toNumber(densidad);
  const germinacionNumero = toNumber(germinacion);
  const pesoMilSemillasNumero = toNumber(pesoMilSemillas);
  const puedeCalcular = superficieNumero > 0 && densidadNumero > 0 && germinacionNumero > 0 && germinacionNumero <= 100;
  const semillasPorHa = calcularSemillasPorHaAjustadas(densidadNumero, germinacionNumero);
  const semillasTotales = calcularSemillasNecesarias(superficieNumero, densidadNumero, germinacionNumero);
  const kilosEstimados = calcularPesoSemillasKg(semillasTotales, pesoMilSemillasNumero);

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
    setSuperficie('');
    setDensidad('');
    setGerminacion('');
    setPesoMilSemillas('');
    setMostrarResultado(false);
  };

  return (
    <CalculatorLayout>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link to={`/org/${orgId}/calculos`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">← Todos los cálculos</Link>
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-xl bg-lime-100 p-2.5 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"><Sprout size={22} /></span>
              <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Siembra y semillas</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Estimá cuánta semilla necesitás según la superficie y el poder germinativo.</p></div>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">Free y Pro</span>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <ModeButton active={modo === 'MANUAL'} icon={Info} title="Cálculo rápido" detail="Cargá los valores manualmente." onClick={() => { setModo('MANUAL'); setMostrarResultado(false); }} />
          <ModeButton active={modo === 'AGROMANAGER'} icon={Sparkles} title="Usar campo o lote" detail={tienePro ? 'Completá la superficie desde AgroManager.' : 'Disponible con Plan Pro.'} disabled={!tienePro} onClick={() => { setModo('AGROMANAGER'); setMostrarResultado(false); }} />
        </div>

        {modo === 'AGROMANAGER' && tienePro && (
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <NumberField label="Superficie" value={superficie} onChange={setSuperficie} unit="ha" readOnly={modo === 'AGROMANAGER'} placeholder="Ej. 120" required />
          <NumberField label="Densidad deseada" value={densidad} onChange={(valor) => { setDensidad(valor); setMostrarResultado(false); }} unit="semillas/ha" placeholder="Ej. 65000" required />
          <NumberField label="Poder germinativo" value={germinacion} onChange={(valor) => { setGerminacion(valor); setMostrarResultado(false); }} unit="%" placeholder="Ej. 95" required />
          <NumberField label="Peso de mil semillas" value={pesoMilSemillas} onChange={(valor) => { setPesoMilSemillas(valor); setMostrarResultado(false); }} unit="g" placeholder="Opcional" />
        </div>
        {modo === 'AGROMANAGER' && !campoSeleccionado && <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Seleccioná un campo para completar la superficie automáticamente.</p>}

        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={() => setMostrarResultado(true)} disabled={!puedeCalcular} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">Calcular siembra</button>
          <button type="button" onClick={limpiar} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"><RotateCcw size={16} /> Limpiar</button>
        </div>
        {!puedeCalcular && mostrarResultado && <p className="mt-4 text-sm font-medium text-rose-700 dark:text-rose-300">Completá una superficie, una densidad y un poder germinativo válido entre 1 y 100%.</p>}
      </section>

      {mostrarResultado && puedeCalcular && (
        <section className="rounded-2xl bg-slate-950 p-5 text-white shadow-lg sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Resultado estimado</p>
          <h2 className="mt-2 text-2xl font-bold">Prepará la semilla para {formatNumber(superficieNumero)} ha</h2>
          {(campoSeleccionado || loteSeleccionado) && <p className="mt-2 text-sm text-slate-300">{campoSeleccionado?.nombre}{loteSeleccionado ? ` · Lote ${loteSeleccionado.nombre}` : ''}</p>}
          {tienePro && <div className="mt-5"><SaveCalculationButton payload={{ tipo: 'SIEMBRA', titulo: `Siembra para ${formatNumber(superficieNumero)} ha`, campoId: campoSeleccionado?.id, loteId: loteSeleccionado?.id, datos: { superficieHa: superficieNumero, densidadDeseadaPorHa: densidadNumero, poderGerminativo: germinacionNumero, pesoMilSemillasGramos: pesoMilSemillasNumero || undefined, campoNombre: campoSeleccionado?.nombre, loteNombre: loteSeleccionado?.nombre }, resultado: { semillasPorHa, semillasTotales, kilosEstimados: pesoMilSemillasNumero > 0 ? kilosEstimados : undefined } }} /></div>}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ResultCard icon={Sprout} label="Semillas por hectárea" value={formatNumber(semillasPorHa)} detail={`Para lograr ${formatNumber(densidadNumero)} plantas/ha`} />
            <ResultCard icon={Sprout} label="Cantidad total" value={`${formatNumber(semillasTotales)} semillas`} detail={`Con ${formatNumber(germinacionNumero)}% de germinación`} />
            {pesoMilSemillasNumero > 0 && <ResultCard icon={Weight} label="Peso estimado" value={`${formatNumber(kilosEstimados)} kg`} detail={`${formatNumber(pesoMilSemillasNumero)} g cada mil semillas`} />}
          </div>
          {pesoMilSemillasNumero <= 0 && <p className="mt-5 text-sm text-slate-300">Si conocés el peso de mil semillas, agregalo para estimar los kilos necesarios.</p>}
          <p className="mt-5 text-xs leading-relaxed text-slate-400">Estimación orientativa. Verificá el análisis de calidad de la semilla y ajustá la dosis según las condiciones del lote antes de sembrar.</p>
        </section>
      )}
    </CalculatorLayout>
  );
}

function ModeButton({ icon: Icon, title, detail, active, disabled, onClick }: { icon: typeof Info; title: string; detail: string; active: boolean; disabled?: boolean; onClick: () => void }) {
  return <button type="button" disabled={disabled} onClick={onClick} className={'rounded-xl border p-4 text-left transition ' + (active ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-500/10' : 'border-gray-200 hover:border-emerald-300 dark:border-gray-700') + (disabled ? ' cursor-not-allowed opacity-60' : '')}><Icon size={19} className={active ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'} /><p className="mt-3 font-bold text-gray-900 dark:text-white">{title}</p><p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{detail}</p></button>;
}

function FieldSelect({ label, value, onChange, disabled, children }: { label: string; value: string; onChange: (value: string) => void; disabled?: boolean; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}<select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-emerald-500/20">{children}</select></label>;
}

function NumberField({ label, value, onChange, unit, placeholder, readOnly, required }: { label: string; value: string; onChange: (value: string) => void; unit: string; placeholder: string; readOnly?: boolean; required?: boolean }) {
  return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}{required && <span className="text-rose-600"> *</span>}<div className="relative mt-1.5"><input inputMode="decimal" value={value} readOnly={readOnly} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 pr-20 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 read-only:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:read-only:bg-gray-700" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">{unit}</span></div></label>;
}

function ResultCard({ icon: Icon, label, value, detail }: { icon: typeof Sprout; label: string; value: string; detail: string }) {
  return <div className="rounded-xl bg-white/10 p-4"><Icon size={20} className="text-emerald-300" /><p className="mt-4 text-sm text-slate-300">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-400">{detail}</p></div>;
}

function toNumber(value: string) {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(value);
}
