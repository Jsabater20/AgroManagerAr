import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ChartNoAxesCombined,
  CircleDollarSign,
  Download,
  LockKeyhole,
  MapPinned,
  RefreshCw,
  Sprout,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  reportesApi,
  type ComparativaDesgloseProductivo,
  type DesgloseCampania,
  type DesgloseLote,
  type ResumenCostosProductivos,
  type TipoReportePeriodico,
} from '../../api/reportes.api';
import { descargarDesgloseProductivoPdf } from '../../utils/reportes-pdf';

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const fechaActual = () => new Date().toISOString().slice(0, 10);

function Costos({ costos }: { costos: ResumenCostosProductivos | null }) {
  if (!costos) return <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">No tenés permiso para ver costos en este informe.</p>;
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
      <div className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200"><span className="block text-slate-500 dark:text-slate-400">Costo real</span><strong>{formatoPesos.format(costos.reales)}</strong></div>
      <div className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200"><span className="block text-slate-500 dark:text-slate-400">Por ha</span><strong>{costos.realPorHa == null ? '—' : formatoPesos.format(costos.realPorHa)}</strong></div>
    </div>
  );
}

function LoteCard({ lote }: { lote: DesgloseLote }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div><p className="font-semibold text-slate-900 dark:text-white">{lote.nombre}</p><p className="text-xs text-slate-500 dark:text-slate-400">{lote.campo.nombre} · {lote.hectareas.toLocaleString('es-AR')} ha</p></div>
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">{lote.siembrasActivas} activas</span>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{lote.cultivos.length ? lote.cultivos.join(' · ') : 'Sin cultivos registrados'}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm"><div><span className="block text-xs text-slate-500 dark:text-slate-400">Cosecha período</span><strong className="text-slate-800 dark:text-slate-100">{lote.cosechaKg.toLocaleString('es-AR')} kg</strong></div><div><span className="block text-xs text-slate-500 dark:text-slate-400">Rendimiento prom.</span><strong className="text-slate-800 dark:text-slate-100">{lote.rendimientoPromedioKgHa == null ? '—' : `${lote.rendimientoPromedioKgHa.toLocaleString('es-AR')} kg/ha`}</strong></div></div>
      <Costos costos={lote.costos} />
    </article>
  );
}

function CampaniaCard({ campania }: { campania: DesgloseCampania }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-900 dark:text-white">{campania.nombre}</p><p className="text-xs text-slate-500 dark:text-slate-400">{campania.lotes} lotes · {campania.hectareas.toLocaleString('es-AR')} ha</p></div><span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950/60 dark:text-blue-200">{campania.siembras} siembras</span></div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{campania.cultivos.length ? campania.cultivos.join(' · ') : 'Sin cultivos registrados'}</p>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-200"><span className="text-slate-500 dark:text-slate-400">Cosecha período: </span><strong>{campania.cosechaKg.toLocaleString('es-AR')} kg</strong></p>
      <Costos costos={campania.costos} />
    </article>
  );
}

function ComparativaRapida({ comparativa, vista }: { comparativa: ComparativaDesgloseProductivo; vista: 'LOTES' | 'CAMPANIAS' }) {
  const resumen = vista === 'LOTES' ? comparativa.lotes : comparativa.campanias;
  const tieneDatos = resumen.mejorCosecha || resumen.costos || (vista === 'LOTES' && comparativa.lotes.mejorRendimiento);
  if (!tieneDatos) {
    return <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">Todavía no hay producción ni costos suficientes para comparar en este período. Cuando cargues cosechas o costos vinculados, vas a ver los resultados destacados acá.</div>;
  }

  const rendimiento = vista === 'LOTES' ? comparativa.lotes.mejorRendimiento : null;
  const desvio = resumen.costos?.mayorDesvio;
  return <section className="mt-5 rounded-xl border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/75"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Lectura rápida</p><h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">Qué se destaca en {vista === 'LOTES' ? 'los lotes' : 'las campañas'}</h3></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{resumen.destinos} registro{resumen.destinos === 1 ? '' : 's'} comparado{resumen.destinos === 1 ? '' : 's'}</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><DatoDestacado icono={TrendingUp} etiqueta="Mayor producción" valor={resumen.mejorCosecha ? `${resumen.mejorCosecha.valor.toLocaleString('es-AR')} kg` : 'Sin cosechas'} detalle={resumen.mejorCosecha ? nombreDestino(resumen.mejorCosecha.nombre, resumen.mejorCosecha.campoNombre) : 'Cargá una cosecha para compararlo'} tono="emerald" />{rendimiento && <DatoDestacado icono={Sprout} etiqueta="Mejor rendimiento" valor={`${rendimiento.valor.toLocaleString('es-AR')} kg/ha`} detalle={`${nombreDestino(rendimiento.nombre, rendimiento.campoNombre)} · Promedio: ${comparativa.lotes.rendimientoPromedioKgHa?.toLocaleString('es-AR') ?? '—'} kg/ha`} tono="blue" />}{resumen.costos?.mayorCostoPorHa && <DatoDestacado icono={CircleDollarSign} etiqueta="Mayor costo por ha" valor={formatoPesos.format(resumen.costos.mayorCostoPorHa.valor)} detalle={nombreDestino(resumen.costos.mayorCostoPorHa.nombre, resumen.costos.mayorCostoPorHa.campoNombre)} tono="amber" />}{desvio && <DatoDestacado icono={TrendingDown} etiqueta="Desvío a revisar" valor={`+${desvio.valor.toLocaleString('es-AR')}%`} detalle={`${nombreDestino(desvio.nombre, desvio.campoNombre)} · Real ${formatoPesos.format(desvio.reales)} vs. estimado ${formatoPesos.format(desvio.estimados)}`} tono="rose" />}</div>{resumen.costos && <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Costo real promedio de los destinos con costos: <strong className="text-slate-700 dark:text-slate-200">{resumen.costos.realPorHa == null ? 'Sin superficie asociada' : formatoPesos.format(resumen.costos.realPorHa) + '/ha'}</strong>. Los valores comparan únicamente registros vinculados al lote o campaña.</p>}</section>;
}

function DatoDestacado({ icono: Icono, etiqueta, valor, detalle, tono }: { icono: typeof TrendingUp; etiqueta: string; valor: string; detalle: string; tono: 'emerald' | 'blue' | 'amber' | 'rose' }) {
  const estilos = {
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200',
    blue: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200',
    amber: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200',
    rose: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200',
  }[tono];
  return <article className={`rounded-xl border p-3 ${estilos}`}><Icono size={17} /><p className="mt-2 text-xs font-semibold uppercase tracking-wide opacity-75">{etiqueta}</p><p className="mt-1 text-base font-bold">{valor}</p><p className="mt-1 text-xs leading-relaxed opacity-80">{detalle}</p></article>;
}

function nombreDestino(nombre: string, campoNombre: string | null) {
  return campoNombre ? `${nombre} · ${campoNombre}` : nombre;
}

export function DesgloseProductivoPanel() {
  const [vista, setVista] = useState<'LOTES' | 'CAMPANIAS'>('LOTES');
  const [tipo, setTipo] = useState<TipoReportePeriodico>('MENSUAL');
  const [fecha, setFecha] = useState(fechaActual);
  const [solicitud, setSolicitud] = useState(0);
  const capacidades = useQuery({ queryKey: ['reportes', 'capacidades'], queryFn: reportesApi.capacidades });
  const preferencias = useQuery({ queryKey: ['reportes', 'preferencias'], queryFn: reportesApi.preferencias });
  const desglose = useQuery({
    queryKey: ['reportes', 'desglose-productivo', tipo, fecha, solicitud],
    queryFn: () => reportesApi.desgloseProductivo(tipo, `${fecha}T12:00:00.000Z`),
    enabled: solicitud > 0 && Boolean(capacidades.data?.funcionalidades.porLoteYCampania),
  });
  const esPro = capacidades.data?.funcionalidades.porLoteYCampania;

  useEffect(() => {
    if (!preferencias.data) return;
    setTipo(preferencias.data.tipoPeriodo);
    setVista(preferencias.data.vistaDesglose);
  }, [preferencias.data]);

  return (
    <section className="mb-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5 shadow-sm dark:border-blue-900/70 dark:from-blue-950/25 dark:via-slate-900 dark:to-slate-900">
      {desglose.data && <div className="mb-3 flex justify-end"><button onClick={() => descargarDesgloseProductivoPdf(desglose.data)} className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-blue-950/40"><Download size={16} /> Descargar PDF</button></div>}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300"><ChartNoAxesCombined size={15} /> Análisis productivo</p><h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Compará lotes y campañas sin perder el contexto</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Producción, cultivos y costos de cada sector, respetando los campos habilitados.</p></div>
        {esPro && <div className="flex flex-wrap items-center gap-2"><select value={tipo} onChange={(event) => setTipo(event.target.value as TipoReportePeriodico)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"><option value="MENSUAL">Último mes cerrado</option><option value="SEMANAL">Última semana cerrada</option></select><input type="date" value={fecha} onChange={(event) => setFecha(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" /><button onClick={() => setSolicitud((valor) => valor + 1)} disabled={desglose.isFetching} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"><RefreshCw size={16} className={desglose.isFetching ? 'animate-spin' : ''} /> Ver desglose</button></div>}
      </div>
      {!esPro && !capacidades.isLoading && <div className="mt-4 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-100"><LockKeyhole size={18} className="shrink-0" /><p><strong>Disponible con Pro.</strong> Compará el resultado de cada lote y campaña para decidir con datos claros.</p></div>}
      {desglose.isError && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">No se pudo cargar el desglose. Intentá nuevamente.</p>}
      {desglose.data && <div className="mt-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-medium text-slate-600 dark:text-slate-300">Período: {desglose.data.periodo.etiqueta}</p><div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800"><button onClick={() => setVista('LOTES')} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${vista === 'LOTES' ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}`}><MapPinned size={15} /> Lotes</button><button onClick={() => setVista('CAMPANIAS')} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${vista === 'CAMPANIAS' ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}><Sprout size={15} /> Campañas</button></div></div><ComparativaRapida comparativa={desglose.data.comparativa} vista={vista} />{vista === 'LOTES' ? <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{desglose.data.lotes.length ? desglose.data.lotes.map((lote) => <LoteCard key={lote.id} lote={lote} />) : <p className="col-span-full rounded-xl bg-white p-5 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">No hay lotes con acceso para mostrar.</p>}</div> : <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{desglose.data.campanias.length ? desglose.data.campanias.map((campania) => <CampaniaCard key={campania.id} campania={campania} />) : <p className="col-span-full rounded-xl bg-white p-5 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">No hay campañas para este período.</p>}</div>}</div>}
    </section>
  );
}
