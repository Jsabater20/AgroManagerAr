import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, Calculator, PackageCheck, Sprout, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const BOLSA_KG = 50;

export default function FertilizerCalculatorPreview() {
  const [hectareas, setHectareas] = useState('48');
  const [dosis, setDosis] = useState('120');
  const [precioKg, setPrecioKg] = useState('215');

  const resultado = useMemo(() => {
    const superficie = Number(hectareas.replace(',', '.'));
    const dosisPorHa = Number(dosis.replace(',', '.'));
    const precio = Number(precioKg.replace(',', '.'));
    const esValido = [superficie, dosisPorHa, precio].every((valor) => Number.isFinite(valor) && valor > 0);
    if (!esValido) return null;

    const kilos = superficie * dosisPorHa;
    return {
      kilos,
      bolsas: Math.ceil(kilos / BOLSA_KG),
      costo: kilos * precio,
    };
  }, [dosis, hectareas, precioKg]);

  return (
    <section id="calculadora" className="scroll-mt-20 bg-emerald-950 px-4 py-24 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-300">Probalo ahora</p>
          <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl">Calculá cuánto fertilizante necesitás para tu lote.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-emerald-50/80">
            Una estimación rápida para planificar compras y trabajos. Con Plan Pro podés guardar el cálculo, vincularlo a un campo real y asignarlo a tu equipo.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: Calculator, title: 'Hacé cuentas en segundos', detail: 'Ingresá superficie, dosis y precio estimado.' },
              { icon: Sprout, title: 'Decidí con anticipación', detail: 'Conocé la cantidad y el costo antes de ejecutar la labor.' },
              { icon: PackageCheck, title: 'Pasá del cálculo a la acción', detail: 'Pro guarda el resultado y permite crear un trabajo para el equipo.' },
            ].map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/20"><Icon size={19} /></span>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-emerald-100/70">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/20 bg-white p-5 text-slate-900 shadow-2xl shadow-black/30 sm:p-7">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white"><Calculator size={21} /></span>
            <div>
              <p className="font-bold">Mini calculadora de fertilización</p>
              <p className="mt-0.5 text-sm text-slate-500">Resultado estimado para una aplicación.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <CalculatorInput label="Superficie" value={hectareas} suffix="ha" onChange={setHectareas} />
            <CalculatorInput label="Dosis" value={dosis} suffix="kg/ha" onChange={setDosis} />
            <CalculatorInput label="Precio estimado" value={precioKg} suffix="$/kg" onChange={setPrecioKg} />
          </div>

          {resultado ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Result label="Fertilizante necesario" value={`${numero(resultado.kilos)} kg`} />
              <Result label="Bolsas de 50 kg" value={String(resultado.bolsas)} />
              <Result label="Costo estimado" value={pesos(resultado.costo)} icon={<Wallet size={15} />} />
            </div>
          ) : (
            <p className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">Ingresá valores mayores a cero para ver el resultado.</p>
          )}

          <div className="mt-5 rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-900">Con Pro llevás este cálculo a tu operación.</p>
            <p className="mt-1 text-xs leading-relaxed text-emerald-800">Seleccioná un campo o lote registrado, guardá el resultado y creá una actividad para la persona responsable.</p>
            <Link to="/precios" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800">
              Conocer Cálculos Pro <ArrowRight size={15} />
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">Estimación orientativa. Verificá siempre dosis, producto y recomendaciones técnicas antes de aplicar.</p>
        </div>
      </div>
    </section>
  );
}

function CalculatorInput({ label, value, suffix, onChange }: { label: string; value: string; suffix: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      <span className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
        <input type="text" inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 bg-transparent py-2.5 text-sm font-semibold outline-none" />
        <span className="ml-2 text-xs font-medium text-slate-400">{suffix}</span>
      </span>
    </label>
  );
}

function Result({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-slate-900">{icon}{value}</p>
    </div>
  );
}

function numero(valor: number) {
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(valor);
}

function pesos(valor: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor);
}
