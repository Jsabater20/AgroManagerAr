import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  AlertCircle,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Loader2,
  Plus,
  Sprout,
  TrendingDown,
  TrendingUp,
  Wheat,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  analiticaApi,
  type AnalisisRentabilidad,
  type ReporteRentabilidad,
} from '../../api/analitica.api';
import {
  crearCostoEstimado,
  type CreateCostoEstimadoPayload,
  type RubroCostoProductivo,
} from '../../api/costos-productivos.api';
import { useAuthStore } from '../../store/auth.store';
import { PlanBanner } from '../../components/ui/PlanBanner';

const PESOS = (valor: number) => new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
}).format(valor);

const NUMERO = (valor: number) => new Intl.NumberFormat('es-AR', {
  maximumFractionDigits: 0,
}).format(valor);

const RUBROS: Array<{ value: RubroCostoProductivo; label: string }> = [
  { value: 'INSUMO', label: 'Insumos' },
  { value: 'MAQUINARIA', label: 'Maquinaria' },
  { value: 'MANO_DE_OBRA', label: 'Mano de obra' },
  { value: 'CONTRATISTA', label: 'Contratista' },
  { value: 'SERVICIO', label: 'Servicios' },
  { value: 'COMBUSTIBLE', label: 'Combustible' },
  { value: 'MANTENIMIENTO', label: 'Mantenimiento' },
  { value: 'OTRO', label: 'Otro' },
];

const etiquetaRubro = (rubro: string) =>
  RUBROS.find((item) => item.value === rubro)?.label ?? rubro;

function RentabilidadContent() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId ?? 0);
  const usuario = useAuthStore((state) => state.usuario);
  const esOwner = usuario?.organizaciones?.some(
    (organizacion) => organizacion.id === organizacionId && organizacion.propietarioId === usuario.id,
  ) ?? false;
  const queryClient = useQueryClient();
  const [vista, setVista] = useState<'campanias' | 'lotes'>('campanias');
  const [expandido, setExpandido] = useState<number | null>(null);
  const [mostrarProyeccion, setMostrarProyeccion] = useState(false);
  const [form, setForm] = useState<CreateCostoEstimadoPayload>({
    recursoTipo: 'LOTE',
    recursoId: 0,
    rubro: 'INSUMO',
    descripcion: '',
    monto: 0,
    fecha: new Date().toISOString().slice(0, 10),
  });
  const idempotencyKeyRef = useRef<string | null>(null);
  const reporteQuery = useQuery({
    queryKey: ['analitica-rentabilidad', organizacionId],
    queryFn: analiticaApi.getRentabilidad,
    enabled: organizacionId > 0,
  });
  const reporte = reporteQuery.data;

  const costoEstimadoMutation = useMutation({
    mutationFn: (payload: CreateCostoEstimadoPayload) =>
      crearCostoEstimado(organizacionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analitica-rentabilidad', organizacionId] });
      idempotencyKeyRef.current = null;
      setMostrarProyeccion(false);
      setForm({
        recursoTipo: 'LOTE',
        recursoId: 0,
        rubro: 'INSUMO',
        descripcion: '',
        monto: 0,
        fecha: new Date().toISOString().slice(0, 10),
      });
      toast.success('Costo estimado guardado. No generó un egreso financiero.');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'No se pudo guardar la proyección.');
    },
  });

  const guardarProyeccion = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.recursoId || !form.descripcion.trim() || Number(form.monto) <= 0) {
      toast.error('Completá el destino, la descripción y el monto estimado.');
      return;
    }
    costoEstimadoMutation.mutate({
      ...form,
      descripcion: form.descripcion.trim(),
      monto: Number(form.monto),
      idempotencyKey: idempotencyKeyRef.current ??= crypto.randomUUID(),
    });
  };

  if (reporteQuery.isLoading) {
    return <div className="flex min-h-72 items-center justify-center text-slate-500"><Loader2 className="mr-2 animate-spin" size={20} /> Preparando rentabilidad...</div>;
  }
  if (reporteQuery.isError || !reporte) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">No pudimos preparar el reporte de rentabilidad. Verificá tus permisos de Reportes e intentá nuevamente.</div>;
  }

  const filas = vista === 'campanias' ? reporte.campanias : reporte.lotes;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-col justify-between gap-4 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-6 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800"><BarChart3 size={14} /> Análisis económico</div>
          <h1 className="text-2xl font-bold text-slate-900">Costos y rentabilidad</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">Compará lo presupuestado con lo ejecutado por lote o campaña, con datos vinculados y sin repartir gastos automáticamente.</p>
        </div>
        {esOwner && (
          <button onClick={() => setMostrarProyeccion(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">
            <Plus size={16} /> Agregar costo estimado
          </button>
        )}
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi icon={TrendingUp} color="emerald" label="Ingresos registrados" value={PESOS(reporte.resumen.ingresos)} />
        <Kpi icon={TrendingDown} color="red" label="Costos reales" value={PESOS(reporte.resumen.costosReales)} />
        <Kpi icon={CircleDollarSign} color={reporte.resumen.saldo >= 0 ? 'blue' : 'red'} label="Saldo financiero" value={PESOS(reporte.resumen.saldo)} />
        <Kpi icon={Wheat} color="amber" label="Producción registrada" value={`${NUMERO(reporte.resumen.produccionKg)} kg`} />
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Control de costos</p>
              <p className="mt-1 text-xs text-slate-500">Los costos estimados son proyecciones; los reales provienen de trabajos completados.</p>
            </div>
            <Sprout className="text-emerald-600" size={22} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-4 sm:grid-cols-3">
            <Valor label="Estimado" value={PESOS(reporte.resumen.costosEstimados)} />
            <Valor label="Real" value={PESOS(reporte.resumen.costosReales)} color="text-red-600" />
            <Valor label="Desvío" value={reporte.resumen.desvioCostos === null ? 'Sin proyección' : PESOS(reporte.resumen.desvioCostos)} color={reporte.resumen.desvioCostos !== null && reporte.resumen.desvioCostos > 0 ? 'text-red-600' : 'text-emerald-700'} />
          </div>
          <div className="mt-4 space-y-3">
            {reporte.costosPorRubro.length === 0 ? <p className="text-sm text-slate-500">Todavía no hay costos para comparar.</p> : reporte.costosPorRubro.map((item) => {
              const mayor = Math.max(item.real, item.estimado, 1);
              return <div key={item.rubro}>
                <div className="mb-1 flex items-center justify-between gap-3 text-xs"><span className="font-medium text-slate-700">{etiquetaRubro(item.rubro)}</span><span className="text-slate-500">Real {PESOS(item.real)} · Est. {PESOS(item.estimado)}</span></div>
                <div className="relative h-2 overflow-hidden rounded-full bg-slate-100"><span className="absolute inset-y-0 left-0 rounded-full bg-emerald-400" style={{ width: `${(item.estimado / mayor) * 100}%` }} /><span className="absolute inset-y-0 left-0 rounded-full bg-red-400/85" style={{ width: `${(item.real / mayor) * 100}%` }} /></div>
              </div>;
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex gap-3"><AlertCircle className="mt-0.5 shrink-0 text-amber-700" size={20} /><div><h2 className="font-semibold text-amber-900">Datos pendientes de asignar</h2><p className="mt-1 text-sm text-amber-800">{reporte.criterioAsignacion}</p></div></div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Valor label="Egresos manuales" value={PESOS(reporte.sinAsignar.egresosManuales)} />
            <Valor label="Costos reales" value={PESOS(reporte.sinAsignar.costosReales)} />
            <Valor label="Ingresos manuales" value={PESOS(reporte.sinAsignar.ingresosManuales)} />
            <Valor label="Costos estimados" value={PESOS(reporte.sinAsignar.costosEstimados)} />
          </div>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-bold text-slate-900">Rentabilidad vinculada</h2><p className="mt-1 text-sm text-slate-500">Cada resultado se calcula con movimientos y costos asociados al recurso.</p></div>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-sm font-semibold"><button onClick={() => { setVista('campanias'); setExpandido(null); }} className={`rounded-lg px-3 py-2 ${vista === 'campanias' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}>Campañas</button><button onClick={() => { setVista('lotes'); setExpandido(null); }} className={`rounded-lg px-3 py-2 ${vista === 'lotes' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}>Lotes</button></div>
        </div>
        {filas.length === 0 ? <EmptyReport label={vista === 'campanias' ? 'No hay campañas con siembras accesibles.' : 'No hay lotes disponibles para analizar.'} /> : <div className="divide-y divide-slate-100">{filas.map((fila) => <FilaAnalisis key={fila.id} fila={fila} tipo={vista} expandido={expandido === fila.id} onToggle={() => setExpandido(expandido === fila.id ? null : fila.id)} />)}</div>}
      </section>

      {esOwner && mostrarProyeccion && (
        <ModalProyeccion
          reporte={reporte}
          form={form}
          loading={costoEstimadoMutation.isPending}
          onClose={() => setMostrarProyeccion(false)}
          onChange={setForm}
          onSubmit={guardarProyeccion}
        />
      )}
    </div>
  );
}

function FilaAnalisis({ fila, tipo, expandido, onToggle }: { fila: AnalisisRentabilidad; tipo: 'campanias' | 'lotes'; expandido: boolean; onToggle: () => void }) {
  const subtitulo = tipo === 'campanias' ? `${(fila as any).lotes} lotes · ${fila.siembras} siembras · ${NUMERO(fila.hectareas)} ha` : `${(fila as any).campo?.nombre ?? 'Campo'} · ${fila.siembras} siembras · ${NUMERO(fila.hectareas)} ha`;
  return <article>
    <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50">
      <div className="min-w-0"><p className="truncate font-semibold text-slate-900">{fila.nombre}</p><p className="mt-1 text-xs text-slate-500">{subtitulo}</p></div>
      <div className="flex items-center gap-4 sm:gap-7"><div className="hidden text-right sm:block"><p className="text-xs text-slate-400">Ingresos</p><p className="text-sm font-semibold text-emerald-700">{PESOS(fila.ingresos)}</p></div><div className="hidden text-right md:block"><p className="text-xs text-slate-400">Costo real</p><p className="text-sm font-semibold text-red-600">{PESOS(fila.costosReales)}</p></div><div className="text-right"><p className="text-xs text-slate-400">Margen</p><p className={`text-sm font-bold ${fila.margen >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>{PESOS(fila.margen)}</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${fila.rentabilidad === null ? 'bg-slate-100 text-slate-500' : fila.rentabilidad >= 20 ? 'bg-emerald-100 text-emerald-700' : fila.rentabilidad > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{fila.rentabilidad === null ? 'Sin ventas' : `${fila.rentabilidad}%`}</span>{expandido ? <ChevronUp className="text-slate-400" size={17} /> : <ChevronDown className="text-slate-400" size={17} />}</div>
    </button>
    {expandido && <div className="grid gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:grid-cols-2 lg:grid-cols-4"><Valor label="Producción" value={`${NUMERO(fila.produccionKg)} kg`} /><Valor label="Egresos manuales" value={PESOS(fila.egresosManuales)} /><Valor label="Estimado / real" value={`${PESOS(fila.costosEstimados)} / ${PESOS(fila.costosReales)}`} /><Valor label="Margen por ha" value={fila.porHectarea ? PESOS(fila.porHectarea.margen) : 'Sin superficie'} /></div>}
  </article>;
}

function ModalProyeccion({ reporte, form, loading, onClose, onChange, onSubmit }: { reporte: ReporteRentabilidad; form: CreateCostoEstimadoPayload; loading: boolean; onClose: () => void; onChange: React.Dispatch<React.SetStateAction<CreateCostoEstimadoPayload>>; onSubmit: (event: React.FormEvent) => void }) {
  const opciones = form.recursoTipo === 'CAMPANIA' ? reporte.campanias : reporte.lotes;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5"><h2 className="text-lg font-bold text-slate-900">Agregar costo estimado</h2><p className="mt-1 text-sm text-slate-500">Sirve para comparar lo planificado con lo real. No crea un movimiento en Finanzas.</p></div><form onSubmit={onSubmit} className="space-y-4"><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium text-slate-700">Asignar a<select value={form.recursoTipo} onChange={(event) => onChange((actual) => ({ ...actual, recursoTipo: event.target.value as 'LOTE' | 'CAMPANIA', recursoId: 0 }))} className="input mt-1"><option value="LOTE">Lote</option><option value="CAMPANIA">Campaña</option></select></label><label className="text-sm font-medium text-slate-700">Destino<select value={form.recursoId || ''} onChange={(event) => onChange((actual) => ({ ...actual, recursoId: Number(event.target.value) }))} className="input mt-1"><option value="">Seleccionar</option>{opciones.map((opcion) => <option key={opcion.id} value={opcion.id}>{opcion.nombre}{form.recursoTipo === 'LOTE' ? ` · ${(opcion as any).campo.nombre}` : ''}</option>)}</select></label></div><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium text-slate-700">Rubro<select value={form.rubro} onChange={(event) => onChange((actual) => ({ ...actual, rubro: event.target.value as RubroCostoProductivo }))} className="input mt-1">{RUBROS.map((rubro) => <option key={rubro.value} value={rubro.value}>{rubro.label}</option>)}</select></label><label className="text-sm font-medium text-slate-700">Fecha<input required type="date" value={form.fecha} onChange={(event) => onChange((actual) => ({ ...actual, fecha: event.target.value }))} className="input mt-1" /></label></div><label className="block text-sm font-medium text-slate-700">Descripción<input required value={form.descripcion} onChange={(event) => onChange((actual) => ({ ...actual, descripcion: event.target.value }))} className="input mt-1" placeholder="Ej.: Aplicación prevista" /></label><label className="block text-sm font-medium text-slate-700">Monto estimado (ARS)<input required min="0.01" step="0.01" type="number" value={form.monto || ''} onChange={(event) => onChange((actual) => ({ ...actual, monto: Number(event.target.value) }))} className="input mt-1" /></label><div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancelar</button><button disabled={loading} type="submit" className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">{loading ? 'Guardando...' : 'Guardar proyección'}</button></div></form></div></div>;
}

function Kpi({ icon: Icon, color, label, value }: { icon: typeof TrendingUp; color: 'emerald' | 'red' | 'blue' | 'amber'; label: string; value: string }) {
  const estilos = { emerald: 'bg-emerald-50 text-emerald-700', red: 'bg-red-50 text-red-700', blue: 'bg-blue-50 text-blue-700', amber: 'bg-amber-50 text-amber-700' }[color];
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`inline-flex rounded-xl p-2.5 ${estilos}`}><Icon size={18} /></div><p className="mt-4 text-xl font-bold text-slate-900">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></article>;
}

function Valor({ label, value, color = 'text-slate-900' }: { label: string; value: string; color?: string }) {
  return <div><p className="text-xs text-slate-500">{label}</p><p className={`mt-1 text-sm font-bold ${color}`}>{value}</p></div>;
}

function EmptyReport({ label }: { label: string }) {
  return <div className="flex flex-col items-center justify-center gap-2 py-14 text-center text-slate-500"><BarChart3 size={28} className="text-slate-300" /><p className="text-sm">{label}</p></div>;
}

export default function RentabilidadPage() {
  const isPro = useAuthStore((state) => state.isPro());
  if (!isPro) return <PlanBanner feature="Rentabilidad y proyecciones" description="Compará costos estimados y reales por lote o campaña, con indicadores por hectárea. Disponible en Pro." />;
  return <RentabilidadContent />;
}
