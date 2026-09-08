import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Apple, CalendarDays, Loader2, MapPin, Plus, Scale, Sprout } from 'lucide-react';
import toast from 'react-hot-toast';
import { camposApi } from '../../api/campos.api';
import {
  frutihorticulturaApi,
  type CreateCosechaFrutihorticolaDto,
  type CreateCultivoFrutihorticolaDto,
  type CultivoFrutihorticola,
  type EstadoCultivoFrutihorticola,
  type SistemaFrutihorticola,
} from '../../api/frutihorticultura.api';

const SISTEMAS: Array<{ value: SistemaFrutihorticola; label: string }> = [
  { value: 'CAMPO_ABIERTO', label: 'Campo abierto' },
  { value: 'INVERNADERO', label: 'Invernadero' },
  { value: 'HUERTA', label: 'Huerta' },
  { value: 'MONTE_FRUTAL', label: 'Monte frutal' },
  { value: 'OTRO', label: 'Otro sistema' },
];

const ESTADOS: Record<EstadoCultivoFrutihorticola, string> = {
  PLANIFICADO: 'Planificado',
  EN_CURSO: 'En curso',
  FINALIZADO: 'Finalizado',
  PERDIDO: 'Perdido',
};

const emptyCultivo: CreateCultivoFrutihorticolaDto = {
  campoId: 0,
  nombre: '',
  especie: '',
  sistema: 'HUERTA',
  fechaInicio: '',
};

const emptyCosecha: CreateCosechaFrutihorticolaDto = {
  fechaCosecha: new Date().toISOString().slice(0, 10),
  kgPrimera: 0,
  kgSegunda: 0,
  kgDescarte: 0,
  destino: '',
  observaciones: '',
};

export default function FrutihorticulturaPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const queryClient = useQueryClient();
  const [crearAbierto, setCrearAbierto] = useState(false);
  const [cosechaAbierta, setCosechaAbierta] = useState<CultivoFrutihorticola | null>(null);
  const [cultivoForm, setCultivoForm] = useState<CreateCultivoFrutihorticolaDto>(emptyCultivo);
  const [cosechaForm, setCosechaForm] = useState<CreateCosechaFrutihorticolaDto>(emptyCosecha);

  const cultivosQuery = useQuery({
    queryKey: ['frutihorticultura', organizacionId],
    queryFn: frutihorticulturaApi.getAll,
  });
  const camposQuery = useQuery({
    queryKey: ['campos', organizacionId],
    queryFn: () => camposApi.getAll(),
  });

  const campoSeleccionado = (camposQuery.data ?? []).find((campo: any) => campo.id === cultivoForm.campoId);
  const totalKg = useMemo(
    () => (cultivosQuery.data ?? []).flatMap((cultivo) => cultivo.cosechas).reduce(
      (total, cosecha) => total + cosecha.kgPrimera + cosecha.kgSegunda + cosecha.kgDescarte,
      0,
    ),
    [cultivosQuery.data],
  );

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['frutihorticultura', organizacionId] });
  const createMutation = useMutation({
    mutationFn: frutihorticulturaApi.create,
    onSuccess: () => {
      refresh();
      setCrearAbierto(false);
      setCultivoForm(emptyCultivo);
      toast.success('Producción frutihortícola registrada.');
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudo registrar el cultivo.'),
  });
  const cosechaMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateCosechaFrutihorticolaDto }) => frutihorticulturaApi.addCosecha(id, dto),
    onSuccess: () => {
      refresh();
      setCosechaAbierta(null);
      setCosechaForm(emptyCosecha);
      toast.success('Cosecha registrada por calidad.');
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudo registrar la cosecha.'),
  });
  const estadoMutation = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: EstadoCultivoFrutihorticola }) => frutihorticulturaApi.update(id, { estado }),
    onSuccess: refresh,
    onError: () => toast.error('No se pudo actualizar el estado.'),
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">Producción especializada</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Frutihorticultura</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Registrá huertas, invernaderos y montes frutales. SeguÍ cada cultivo y separá la cosecha por primera, segunda y descarte.</p>
        </div>
        <button type="button" onClick={() => setCrearAbierto(true)} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800">
          <Plus size={16} /> Nuevo cultivo
        </button>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Summary icon={Sprout} label="Cultivos activos" value={(cultivosQuery.data ?? []).filter((cultivo) => cultivo.estado === 'EN_CURSO').length} />
        <Summary icon={Apple} label="Unidades registradas" value={cultivosQuery.data?.length ?? 0} />
        <Summary icon={Scale} label="Cosecha acumulada" value={totalKg.toLocaleString('es-AR') + ' kg'} />
      </section>

      {cultivosQuery.isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>
      ) : !cultivosQuery.data?.length ? (
        <EmptyState onCreate={() => setCrearAbierto(true)} />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {cultivosQuery.data.map((cultivo) => <CultivoCard key={cultivo.id} cultivo={cultivo} onCosecha={() => { setCosechaAbierta(cultivo); setCosechaForm(emptyCosecha); }} onEstado={(estado) => estadoMutation.mutate({ id: cultivo.id, estado })} actualizando={estadoMutation.isPending} />)}
        </section>
      )}

      {crearAbierto && (
        <Dialog title="Nuevo cultivo frutihortícola" onClose={() => setCrearAbierto(false)}>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); createMutation.mutate(cultivoForm); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Campo *"><select required className="input" value={cultivoForm.campoId} onChange={(event) => setCultivoForm({ ...cultivoForm, campoId: Number(event.target.value), loteId: undefined })}><option value={0} disabled>Elegí un campo</option>{(camposQuery.data ?? []).map((campo: any) => <option key={campo.id} value={campo.id}>{campo.nombre}</option>)}</select></Field>
              <Field label="Lote (opcional)"><select className="input" value={cultivoForm.loteId ?? ''} disabled={!campoSeleccionado} onChange={(event) => setCultivoForm({ ...cultivoForm, loteId: event.target.value ? Number(event.target.value) : undefined })}><option value="">Sin lote específico</option>{(campoSeleccionado?.lotes ?? []).map((lote: any) => <option key={lote.id} value={lote.id}>{lote.nombre}</option>)}</select></Field>
              <Field label="Nombre de la unidad *"><input required className="input" placeholder="Ej: Tomate - Invernadero 1" value={cultivoForm.nombre} onChange={(event) => setCultivoForm({ ...cultivoForm, nombre: event.target.value })} /></Field>
              <Field label="Especie *"><input required className="input" placeholder="Ej: Tomate, frutilla o durazno" value={cultivoForm.especie} onChange={(event) => setCultivoForm({ ...cultivoForm, especie: event.target.value })} /></Field>
              <Field label="Variedad"><input className="input" placeholder="Opcional" value={cultivoForm.variedad ?? ''} onChange={(event) => setCultivoForm({ ...cultivoForm, variedad: event.target.value })} /></Field>
              <Field label="Sistema *"><select className="input" value={cultivoForm.sistema} onChange={(event) => setCultivoForm({ ...cultivoForm, sistema: event.target.value as SistemaFrutihorticola })}>{SISTEMAS.map((sistema) => <option key={sistema.value} value={sistema.value}>{sistema.label}</option>)}</select></Field>
              <Field label="Fecha de inicio *"><input required type="date" className="input" value={cultivoForm.fechaInicio} onChange={(event) => setCultivoForm({ ...cultivoForm, fechaInicio: event.target.value })} /></Field>
              <Field label="Cosecha estimada"><input type="date" className="input" value={cultivoForm.fechaEstimadaCosecha ?? ''} onChange={(event) => setCultivoForm({ ...cultivoForm, fechaEstimadaCosecha: event.target.value || undefined })} /></Field>
              <Field label="Superficie (m2)"><input type="number" min="0" className="input" value={cultivoForm.superficieM2 ?? ''} onChange={(event) => setCultivoForm({ ...cultivoForm, superficieM2: event.target.value ? Number(event.target.value) : undefined })} /></Field>
              <Field label="Cantidad de plantas"><input type="number" min="0" className="input" value={cultivoForm.cantidadPlantas ?? ''} onChange={(event) => setCultivoForm({ ...cultivoForm, cantidadPlantas: event.target.value ? Number(event.target.value) : undefined })} /></Field>
            </div>
            <Field label="Observaciones"><textarea rows={3} className="input resize-none" value={cultivoForm.observaciones ?? ''} onChange={(event) => setCultivoForm({ ...cultivoForm, observaciones: event.target.value })} placeholder="Opcional" /></Field>
            <DialogActions onCancel={() => setCrearAbierto(false)} loading={createMutation.isPending} label="Guardar cultivo" />
          </form>
        </Dialog>
      )}

      {cosechaAbierta && (
        <Dialog title={'Registrar cosecha - ' + cosechaAbierta.nombre} onClose={() => setCosechaAbierta(null)}>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); cosechaMutation.mutate({ id: cosechaAbierta.id, dto: cosechaForm }); }}>
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">Separá los kilos por calidad para conocer el resultado real de cada cosecha.</p>
            <Field label="Fecha *"><input required type="date" className="input" value={cosechaForm.fechaCosecha} onChange={(event) => setCosechaForm({ ...cosechaForm, fechaCosecha: event.target.value })} /></Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Primera (kg)"><input type="number" min="0" step="0.1" className="input" value={cosechaForm.kgPrimera || ''} onChange={(event) => setCosechaForm({ ...cosechaForm, kgPrimera: Number(event.target.value) || 0 })} /></Field>
              <Field label="Segunda (kg)"><input type="number" min="0" step="0.1" className="input" value={cosechaForm.kgSegunda || ''} onChange={(event) => setCosechaForm({ ...cosechaForm, kgSegunda: Number(event.target.value) || 0 })} /></Field>
              <Field label="Descarte (kg)"><input type="number" min="0" step="0.1" className="input" value={cosechaForm.kgDescarte || ''} onChange={(event) => setCosechaForm({ ...cosechaForm, kgDescarte: Number(event.target.value) || 0 })} /></Field>
            </div>
            <Field label="Destino"><input className="input" placeholder="Ej: Mercado local, empaque o consumo interno" value={cosechaForm.destino ?? ''} onChange={(event) => setCosechaForm({ ...cosechaForm, destino: event.target.value })} /></Field>
            <Field label="Observaciones"><textarea rows={2} className="input resize-none" value={cosechaForm.observaciones ?? ''} onChange={(event) => setCosechaForm({ ...cosechaForm, observaciones: event.target.value })} placeholder="Opcional" /></Field>
            <DialogActions onCancel={() => setCosechaAbierta(null)} loading={cosechaMutation.isPending} label="Registrar cosecha" />
          </form>
        </Dialog>
      )}
    </div>
  );
}

function CultivoCard({ cultivo, onCosecha, onEstado, actualizando }: { cultivo: CultivoFrutihorticola; onCosecha: () => void; onEstado: (estado: EstadoCultivoFrutihorticola) => void; actualizando: boolean }) {
  const total = cultivo.cosechas.reduce((sum, cosecha) => sum + cosecha.kgPrimera + cosecha.kgSegunda + cosecha.kgDescarte, 0);
  return <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"><div className="flex items-start justify-between gap-4"><div><p className="text-lg font-bold text-gray-900 dark:text-white">{cultivo.nombre}</p><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{cultivo.especie}{cultivo.variedad ? ' · ' + cultivo.variedad : ''}</p></div><select value={cultivo.estado} disabled={actualizando} onChange={(event) => onEstado(event.target.value as EstadoCultivoFrutihorticola)} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200">{Object.entries(ESTADOS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><div className="mt-4 grid gap-2 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2"><span className="inline-flex items-center gap-2"><MapPin size={15} className="text-emerald-600" />{cultivo.campo.nombre}{cultivo.lote ? ' · ' + cultivo.lote.nombre : ''}</span><span className="inline-flex items-center gap-2"><CalendarDays size={15} className="text-emerald-600" />Inicio: {formatDate(cultivo.fechaInicio)}</span></div><div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-100 pt-4 dark:border-gray-700"><div><p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Cosecha acumulada</p><p className="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-300">{total.toLocaleString('es-AR')} kg</p></div><button type="button" onClick={onCosecha} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"><Scale size={15} />Registrar cosecha</button></div></article>;
}

function Summary({ icon: Icon, label, value }: { icon: typeof Sprout; label: string; value: string | number }) { return <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"><Icon size={18} className="text-emerald-600" /><p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{value}</p><p className="text-sm text-gray-500 dark:text-gray-400">{label}</p></div>; }
function EmptyState({ onCreate }: { onCreate: () => void }) { return <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-800"><Apple size={38} className="mx-auto text-emerald-600" /><h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Todavía no registraste producción frutihortícola</h2><p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">Empezá por una huerta, un invernadero o un monte frutal y seguí su producción desde el inicio hasta la cosecha.</p><button type="button" onClick={onCreate} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"><Plus size={16} />Registrar primer cultivo</button></div>; }
function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) { return <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4" onClick={onClose}><div className="mx-auto my-6 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800" onClick={(event) => event.stopPropagation()}><h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">{title}</h2>{children}</div></div>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200"><span className="mb-1.5 block">{label}</span>{children}</label>; }
function DialogActions({ onCancel, loading, label }: { onCancel: () => void; loading: boolean; label: string }) { return <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Cancelar</button><button disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">{loading && <Loader2 size={15} className="animate-spin" />}{label}</button></div>; }
function formatDate(value: string) { return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(value)); }
