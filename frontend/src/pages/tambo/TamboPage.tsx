import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CalendarDays, Droplets, Loader2, Milk, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ganadoApi } from '../../api/ganado.api';
import { tamboApi, type CreateRegistroOrdeneDto, type RegistroOrdene, type TurnoOrdene } from '../../api/tambo.api';

const TURNOS: Record<TurnoOrdene, string> = {
  MANANA: 'Mañana',
  TARDE: 'Tarde',
  UNICO: 'Único',
};

const emptyForm: CreateRegistroOrdeneDto = {
  fecha: new Date().toISOString().slice(0, 10),
  turno: 'MANANA',
  litros: 0,
};

export default function TamboPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const organizacionId = Number(orgId);
  const queryClient = useQueryClient();
  const [abierto, setAbierto] = useState(false);
  const [form, setForm] = useState<CreateRegistroOrdeneDto>(emptyForm);

  const registrosQuery = useQuery({ queryKey: ['tambo', organizacionId], queryFn: tamboApi.getAll });
  const resumenQuery = useQuery({ queryKey: ['tambo-resumen', organizacionId], queryFn: tamboApi.getResumen });
  const animalesQuery = useQuery({ queryKey: ['ganado', organizacionId], queryFn: ganadoApi.getAll });
  const vacas = (animalesQuery.data ?? []).filter((animal) => animal.especie === 'BOVINO' && animal.sexo === 'HEMBRA');

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['tambo', organizacionId] });
    queryClient.invalidateQueries({ queryKey: ['tambo-resumen', organizacionId] });
  };
  const createMutation = useMutation({
    mutationFn: tamboApi.create,
    onSuccess: () => {
      refresh();
      setAbierto(false);
      setForm(emptyForm);
      toast.success('Ordeñe registrado correctamente.');
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudo registrar el ordeñe.'),
  });
  const removeMutation = useMutation({
    mutationFn: tamboApi.remove,
    onSuccess: () => {
      refresh();
      toast.success('Registro eliminado.');
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || 'No se pudo eliminar el registro.'),
  });

  const resumen = resumenQuery.data;
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600">Producción especializada</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Tambo y lácteos</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Llevá el control simple de los ordeñes, por vaca o por tanque general, sin mezclar información entre establecimientos.</p>
        </div>
        <button type="button" onClick={() => setAbierto(true)} className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800"><Plus size={16} /> Registrar ordeñe</button>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={Milk} label="Litros hoy" value={formatLitros(resumen?.litrosHoy ?? 0)} />
        <Metric icon={CalendarDays} label="Litros del mes" value={formatLitros(resumen?.litrosMes ?? 0)} />
        <Metric icon={Droplets} label="Registros hoy" value={resumen?.registrosHoy ?? 0} />
        <Metric icon={Milk} label="Vacas registradas" value={resumen?.vacasRegistradas ?? 0} />
      </section>

      <section className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-sm text-sky-900 dark:border-sky-900/60 dark:bg-sky-950/20 dark:text-sky-100">
        <strong>Cómo cargar:</strong> elegí una vaca cuando querés seguir su producción individual, o dejala sin seleccionar para registrar el total del tanque. Para evitar duplicados, usá una sola modalidad por turno.
      </section>

      {registrosQuery.isLoading ? <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-sky-600" /></div>
        : !registrosQuery.data?.length ? <EmptyState onCreate={() => setAbierto(true)} />
        : <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-sm"><thead className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"><tr><th className="px-5 py-3">Fecha</th><th className="px-5 py-3">Turno</th><th className="px-5 py-3">Origen</th><th className="px-5 py-3">Litros</th><th className="px-5 py-3">Registró</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-gray-100 dark:divide-gray-700">{registrosQuery.data.map((registro) => <RegistroRow key={registro.id} registro={registro} onRemove={() => removeMutation.mutate(registro.id)} removing={removeMutation.isPending} />)}</tbody></table></div></section>}

      {abierto && <Dialog title="Registrar ordeñe" onClose={() => setAbierto(false)}><form className="space-y-4" onSubmit={(event) => { event.preventDefault(); createMutation.mutate(form); }}><div className="grid gap-4 sm:grid-cols-2"><Field label="Fecha *"><input required type="date" className="input" value={form.fecha} onChange={(event) => setForm({ ...form, fecha: event.target.value })} /></Field><Field label="Turno *"><select className="input" value={form.turno} onChange={(event) => setForm({ ...form, turno: event.target.value as TurnoOrdene })}>{Object.entries(TURNOS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field><Field label="Vaca (opcional)"><select className="input" value={form.animalId ?? ''} onChange={(event) => setForm({ ...form, animalId: event.target.value ? Number(event.target.value) : undefined })}><option value="">Tanque general</option>{vacas.map((vaca) => <option key={vaca.id} value={vaca.id}>{vaca.nombre} · {vaca.categoria.toLowerCase()}</option>)}</select></Field><Field label="Litros *"><input required type="number" min="0.01" step="0.1" className="input" value={form.litros || ''} onChange={(event) => setForm({ ...form, litros: Number(event.target.value) || 0 })} placeholder="Ej: 18.5" /></Field></div><Field label="Observaciones"><textarea rows={3} className="input resize-none" value={form.observaciones ?? ''} onChange={(event) => setForm({ ...form, observaciones: event.target.value })} placeholder="Opcional: calidad, incidencia o dato relevante" /></Field><DialogActions onCancel={() => setAbierto(false)} loading={createMutation.isPending} label="Guardar ordeñe" /></form></Dialog>}
    </div>
  );
}

function RegistroRow({ registro, onRemove, removing }: { registro: RegistroOrdene; onRemove: () => void; removing: boolean }) { return <tr className="text-gray-700 dark:text-gray-200"><td className="px-5 py-3.5">{formatDate(registro.fecha)}</td><td className="px-5 py-3.5"><span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">{TURNOS[registro.turno]}</span></td><td className="px-5 py-3.5 font-medium">{registro.animal?.nombre ?? 'Tanque general'}</td><td className="px-5 py-3.5 font-bold text-sky-700 dark:text-sky-300">{formatLitros(registro.litros)}</td><td className="px-5 py-3.5">{[registro.usuario.nombre, registro.usuario.apellido].filter(Boolean).join(' ')}</td><td className="px-5 py-3.5 text-right"><button type="button" disabled={removing} onClick={onRemove} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-950/30" title="Eliminar registro"><Trash2 size={16} /></button></td></tr>; }
function Metric({ icon: Icon, label, value }: { icon: typeof Milk; label: string; value: number | string }) { return <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"><Icon size={18} className="text-sky-600" /><p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{value}</p><p className="text-sm text-gray-500 dark:text-gray-400">{label}</p></div>; }
function EmptyState({ onCreate }: { onCreate: () => void }) { return <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-800"><Milk size={38} className="mx-auto text-sky-600" /><h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Todavía no hay ordeñes registrados</h2><p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">Registrá la producción por vaca o como total de tanque para empezar a seguir el tambo.</p><button type="button" onClick={onCreate} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800"><Plus size={16} />Registrar primer ordeñe</button></div>; }
function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) { return <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4" onClick={onClose}><div className="mx-auto my-6 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800" onClick={(event) => event.stopPropagation()}><h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">{title}</h2>{children}</div></div>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200"><span className="mb-1.5 block">{label}</span>{children}</label>; }
function DialogActions({ onCancel, loading, label }: { onCancel: () => void; loading: boolean; label: string }) { return <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Cancelar</button><button disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60">{loading && <Loader2 size={15} className="animate-spin" />}{label}</button></div>; }
function formatLitros(value: number) { return value.toLocaleString('es-AR', { maximumFractionDigits: 1 }) + ' L'; }
function formatDate(value: string) { return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(value)); }
