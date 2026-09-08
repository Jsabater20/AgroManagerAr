import { useQuery } from '@tanstack/react-query';
import { BarChart3, Egg, Leaf, Milk, PawPrint, Sprout, Wheat } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { empresasApi, type ProduccionConsolidadaEmpresa } from '../../api/empresas.api';
import type { ActividadProductiva } from '../../api/organizaciones.api';

const ETIQUETAS_ACTIVIDAD: Record<ActividadProductiva, string> = {
  AGRICOLA: 'Agricultura',
  GANADERIA: 'Ganadería',
  TAMBO: 'Tambo / Lácteos',
  AVICOLA: 'Avícola',
  FRUTIHORTICOLA: 'Frutihorticultura',
  YERBA: 'Yerba mate',
};

export default function EmpresaProduccionPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const id = Number(empresaId);
  const produccionQuery = useQuery({
    queryKey: ['empresa-produccion', id],
    queryFn: () => empresasApi.obtenerProduccion(id),
    enabled: Number.isInteger(id) && id > 0,
  });

  if (produccionQuery.isLoading) return <PageState message="Preparando la producción consolidada..." />;
  if (produccionQuery.isError || !produccionQuery.data) return <PageState message="No pudimos cargar la producción empresarial o no tenés acceso." />;

  const produccion = produccionQuery.data;
  const nombreMes = new Intl.DateTimeFormat('es-AR', { month: 'long' }).format(
    new Date(produccion.periodo.anio, produccion.periodo.mes - 1, 1),
  );
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <header className="rounded-3xl bg-gradient-to-r from-emerald-950 to-emerald-700 p-7 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">Visión empresarial</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Producción consolidada</h1>
            <p className="mt-2 text-emerald-100">{produccion.empresa.nombre} · Resultados de los establecimientos que tenés habilitados.</p>
          </div>
          <Link to={`/empresas/${id}`} className="rounded-xl bg-white/15 px-4 py-2 text-sm font-bold transition hover:bg-white/25">Volver al dashboard</Link>
        </div>
      </header>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Resumen de producción</h2>
            <p className="mt-1 text-sm text-slate-500">Acumulado anual, excepto tambo y avícola: {nombreMes} {produccion.periodo.anio}.</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800">{produccion.resumen.establecimientos} establecimientos visibles</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Metric icon={Wheat} label="Cosecha agrícola" value={formatMetric(produccion.resumen.cosechaAgricolaKg, 'kg')} />
          <Metric icon={PawPrint} label="Animales" value={formatMetric(produccion.resumen.animales)} />
          <Metric icon={Milk} label="Leche del mes" value={formatMetric(produccion.resumen.litrosTamboMes, 'L')} />
          <Metric icon={Egg} label="Huevos del mes" value={formatMetric(produccion.resumen.huevosAvicolaMes)} />
          <Metric icon={Sprout} label="Frutas y hortalizas" value={formatMetric(produccion.resumen.cosechaFrutihorticolaKg, 'kg')} />
          <Metric icon={Leaf} label="Yerba hoja verde" value={formatMetric(produccion.resumen.hojaVerdeYerbaKg, 'kg')} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">Por establecimiento</h2>
        <p className="mt-1 text-sm text-slate-500">Cada tarjeta muestra solo las actividades definidas para ese establecimiento.</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          {produccion.establecimientos.map((establecimiento) => <EstablecimientoCard key={establecimiento.id} establecimiento={establecimiento} />)}
        </div>
        {produccion.establecimientos.length === 0 && <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">No hay establecimientos habilitados para consultar.</div>}
      </section>
    </div>
  );
}

function EstablecimientoCard({ establecimiento }: { establecimiento: ProduccionConsolidadaEmpresa['establecimientos'][number] }) {
  const tiene = (actividad: ActividadProductiva) => establecimiento.actividades.includes(actividad);
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><h3 className="text-lg font-bold text-slate-900">{establecimiento.nombre}</h3><p className="mt-1 text-sm text-slate-500">Perfil productivo del establecimiento</p></div>
      <BarChart3 size={22} className="text-emerald-700" />
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {establecimiento.actividades.map((actividad) => <span key={actividad} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">{ETIQUETAS_ACTIVIDAD[actividad]}</span>)}
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {tiene('AGRICOLA') && <Detail label="Agricultura" value={`${formatMetric(establecimiento.agricultura.cosechaKgAnual, 'kg')} cosechados`} auxiliary={`${establecimiento.agricultura.siembrasActivas} siembras activas`} />}
      {(tiene('GANADERIA') || tiene('TAMBO')) && <Detail label="Ganadería" value={formatMetric(establecimiento.ganaderia.animales) + ' animales'} />}
      {tiene('TAMBO') && <Detail label="Tambo" value={`${formatMetric(establecimiento.tambo.litrosMes, 'L')} este mes`} />}
      {tiene('AVICOLA') && <Detail label="Avícola" value={`${formatMetric(establecimiento.avicola.huevosMes)} huevos este mes`} />}
      {tiene('FRUTIHORTICOLA') && <Detail label="Frutihorticultura" value={`${formatMetric(establecimiento.frutihorticultura.cosechaKgAnual, 'kg')} cosechados`} auxiliary={`${establecimiento.frutihorticultura.cultivosActivos} cultivos activos`} />}
      {tiene('YERBA') && <Detail label="Yerba mate" value={`${formatMetric(establecimiento.yerba.hojaVerdeKgAnual, 'kg')} hoja verde`} auxiliary={`${formatMetric(establecimiento.yerba.canchadaKgAnual, 'kg')} canchada`} />}
    </div>
  </article>;
}

function Metric({ icon: Icon, label, value }: { icon: typeof Wheat; label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4"><Icon size={20} className="text-emerald-700" /><p className="mt-4 text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{value}</p></div>;
}

function Detail({ label, value, auxiliary }: { label: string; value: string; auxiliary?: string }) {
  return <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 font-bold text-slate-900">{value}</p>{auxiliary && <p className="mt-1 text-xs text-slate-500">{auxiliary}</p>}</div>;
}

function PageState({ message }: { message: string }) {
  return <div className="p-10 text-center text-slate-600">{message}</div>;
}

function formatMetric(value: number, unit?: string) {
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(value) + (unit ? ' ' + unit : '');
}
