import { useQuery } from '@tanstack/react-query';
import { Droplets, Info, Leaf, Loader2, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { calculosApi } from '../../api/calculos.api';
import { CalculatorLayout } from '../../components/calculos/CalculatorLayout';
import { CreateActivityFromCalculationButton } from '../../components/calculos/CreateActivityFromCalculationButton';
import { SaveCalculationButton } from '../../components/calculos/SaveCalculationButton';
import { calcularAguaNecesaria, calcularProductoNecesario } from '../../lib/calculos';
import { useAuthStore } from '../../store/auth.store';
import type { Campo } from '../../api/types';

type ModoCalculo = 'MANUAL' | 'AGROMANAGER';

export default function AplicacionesCalculatorPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const usuario = useAuthStore((state) => state.usuario);
  const organizacion = usuario?.organizaciones?.find((item) => item.id === organizacionId);
  const tienePro = organizacion?.plan === 'PRO' || organizacion?.planEfectivo === 'PRO';
  const esOwner = organizacion?.propietarioId === usuario?.id;
  const [modo, setModo] = useState<ModoCalculo>('MANUAL');
  const [campoId, setCampoId] = useState('');
  const [loteId, setLoteId] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [dosis, setDosis] = useState('');
  const [aguaPorHa, setAguaPorHa] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const camposQuery = useQuery({
    queryKey: ['calculos', 'aplicaciones', organizacionId],
    queryFn: () => calculosApi.obtenerCamposDisponibles() as Promise<Campo[]>,
    enabled: tienePro && modo === 'AGROMANAGER' && organizacionId > 0,
  });
  const campos = camposQuery.data ?? [];
  const campoSeleccionado = campos.find((campo) => campo.id === Number(campoId));
  const loteSeleccionado = campoSeleccionado?.lotes?.find((lote) => lote.id === Number(loteId));
  const superficieNumero = toNumber(superficie);
  const dosisNumero = toNumber(dosis);
  const aguaNumero = toNumber(aguaPorHa);
  const puedeCalcular = superficieNumero > 0 && dosis.trim() !== '' && aguaPorHa.trim() !== '';
  const productoNecesario = calcularProductoNecesario(superficieNumero, dosisNumero);
  const aguaNecesaria = calcularAguaNecesaria(superficieNumero, aguaNumero);

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
    setDosis('');
    setAguaPorHa('');
    setMostrarResultado(false);
  };

  return (
    <CalculatorLayout>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link to={`/org/${orgId}/calculos`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">← Todos los cálculos</Link>
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-xl bg-cyan-100 p-2.5 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300"><Droplets size={22} /></span>
              <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">Aplicaciones y pulverización</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Calculá el producto y agua necesarios según la superficie.</p></div>
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

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <NumberField label="Superficie" value={superficie} onChange={setSuperficie} unit="ha" readOnly={modo === 'AGROMANAGER'} placeholder="Ej. 82" required />
          <NumberField label="Dosis del producto" value={dosis} onChange={(valor) => { setDosis(valor); setMostrarResultado(false); }} unit="L/ha" placeholder="Ej. 2,5" required />
          <NumberField label="Volumen de agua" value={aguaPorHa} onChange={(valor) => { setAguaPorHa(valor); setMostrarResultado(false); }} unit="L/ha" placeholder="Ej. 100" required />
        </div>
        {modo === 'AGROMANAGER' && !campoSeleccionado && <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Seleccioná un campo para completar la superficie automáticamente.</p>}

        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={() => setMostrarResultado(true)} disabled={!puedeCalcular} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">Calcular aplicación</button>
          <button type="button" onClick={limpiar} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"><RotateCcw size={16} /> Limpiar</button>
        </div>
        {!puedeCalcular && mostrarResultado && <p className="mt-4 text-sm font-medium text-rose-700 dark:text-rose-300">Completá una superficie mayor a cero, la dosis y el volumen de agua.</p>}
      </section>

      {mostrarResultado && puedeCalcular && (
        <section className="rounded-2xl bg-slate-950 p-5 text-white shadow-lg sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Resultado estimado</p>
          <h2 className="mt-2 text-2xl font-bold">Prepará lo necesario para {formatNumber(superficieNumero)} ha</h2>
          {(campoSeleccionado || loteSeleccionado) && <p className="mt-2 text-sm text-slate-300">{campoSeleccionado?.nombre}{loteSeleccionado ? ` · Lote ${loteSeleccionado.nombre}` : ''}</p>}
          {tienePro && <div className="mt-5"><SaveCalculationButton payload={{ tipo: 'APLICACION', titulo: `Aplicación para ${formatNumber(superficieNumero)} ha`, campoId: campoSeleccionado?.id, loteId: loteSeleccionado?.id, datos: { superficieHa: superficieNumero, dosisLitrosPorHa: dosisNumero, volumenAguaLitrosPorHa: aguaNumero, campoNombre: campoSeleccionado?.nombre, loteNombre: loteSeleccionado?.nombre }, resultado: { productoLitros: productoNecesario, aguaLitros: aguaNecesaria } }} /></div>}
          {tienePro && esOwner && <div className="mt-5"><CreateActivityFromCalculationButton organizacionId={organizacionId} recursoTipo={loteSeleccionado ? 'LOTE' : campoSeleccionado ? 'CAMPO' : 'GENERAL'} recursoId={loteSeleccionado?.id || campoSeleccionado?.id} recursoNombre={loteSeleccionado ? `${campoSeleccionado?.nombre} · Lote ${loteSeleccionado.nombre}` : campoSeleccionado?.nombre} tituloInicial={`Aplicar producto en ${loteSeleccionado?.nombre || campoSeleccionado?.nombre || 'el establecimiento'}`} descripcionCalculo={`Aplicación calculada: ${formatNumber(superficieNumero)} ha · ${formatNumber(productoNecesario)} L de producto · ${formatNumber(aguaNecesaria)} L de agua.`} /></div>}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ResultCard icon={Leaf} label="Producto necesario" value={`${formatNumber(productoNecesario)} L`} detail={`${formatNumber(dosisNumero)} L/ha`} />
            <ResultCard icon={Droplets} label="Agua necesaria" value={`${formatNumber(aguaNecesaria)} L`} detail={`${formatNumber(aguaNumero)} L/ha`} />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-slate-400">Estimación orientativa. Verificá marbete, dosis autorizada, condiciones climáticas y la capacidad de tu equipo antes de aplicar.</p>
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
  return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}{required && <span className="text-rose-600"> *</span>}<div className="relative mt-1.5"><input inputMode="decimal" value={value} readOnly={readOnly} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 pr-14 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 read-only:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:read-only:bg-gray-700" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">{unit}</span></div></label>;
}

function ResultCard({ icon: Icon, label, value, detail }: { icon: typeof Leaf; label: string; value: string; detail: string }) {
  return <div className="rounded-xl bg-white/10 p-4"><Icon size={20} className="text-emerald-300" /><p className="mt-4 text-sm text-slate-300">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-400">{detail}</p></div>;
}

function toNumber(value: string) {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(value);
}
