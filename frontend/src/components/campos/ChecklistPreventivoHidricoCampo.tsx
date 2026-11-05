import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  Loader2,
  Pencil,
  Plus,
  Save,
  ShieldAlert,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  camposApi,
  type CategoriaChecklistPreventivoHidrico,
  type ChecklistPreventivoHidrico,
  type GuardarChecklistPreventivoHidrico,
} from '../../api/campos.api';
import { organizacionesApi } from '../../api/organizaciones.api';
import { EvidenceAction } from '../evidencias/EvidenceAction';

type FormularioChecklist = {
  titulo: string;
  descripcion: string;
  categoria: CategoriaChecklistPreventivoHidrico;
  responsableId: string;
  fechaLimite: string;
};

const formularioVacio = (): FormularioChecklist => ({
  titulo: '',
  descripcion: '',
  categoria: 'GENERAL',
  responsableId: '',
  fechaLimite: '',
});

const categorias: Array<{ value: CategoriaChecklistPreventivoHidrico; label: string }> = [
  { value: 'DRENAJE', label: 'Drenaje y escurrimiento' },
  { value: 'ACCESO', label: 'Accesos y caminos' },
  { value: 'INFRAESTRUCTURA', label: 'Infraestructura' },
  { value: 'GANADERIA', label: 'Ganadería' },
  { value: 'MAQUINARIA_E_INSUMOS', label: 'Maquinaria e insumos' },
  { value: 'GENERAL', label: 'General' },
];

const estilosCategoria: Record<CategoriaChecklistPreventivoHidrico, string> = {
  DRENAJE: 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-200',
  ACCESO: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200',
  INFRAESTRUCTURA: 'bg-violet-100 text-violet-800 dark:bg-violet-950/70 dark:text-violet-200',
  GANADERIA: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200',
  MAQUINARIA_E_INSUMOS: 'bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-200',
  GENERAL: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
};

const etiquetaCategoria = (categoria: CategoriaChecklistPreventivoHidrico) =>
  categorias.find((item) => item.value === categoria)?.label ?? 'General';

const formatearFecha = (valor: string | null) => {
  if (!valor) return null;
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(
    new Date(`${valor.slice(0, 10)}T12:00:00`),
  );
};

const mensajeError = (error: any, porDefecto: string) => {
  const mensaje = error?.response?.data?.message;
  return Array.isArray(mensaje) ? mensaje[0] : mensaje || porDefecto;
};

const crearPayload = (formulario: FormularioChecklist): GuardarChecklistPreventivoHidrico => ({
  titulo: formulario.titulo.trim(),
  descripcion: formulario.descripcion.trim() || null,
  categoria: formulario.categoria,
  responsableId: formulario.responsableId ? Number(formulario.responsableId) : null,
  fechaLimite: formulario.fechaLimite
    ? `${formulario.fechaLimite}T12:00:00.000Z`
    : null,
});

const formularioDesdeItem = (item: ChecklistPreventivoHidrico): FormularioChecklist => ({
  titulo: item.titulo,
  descripcion: item.descripcion ?? '',
  categoria: item.categoria,
  responsableId: item.responsableId ? String(item.responsableId) : '',
  fechaLimite: item.fechaLimite?.slice(0, 10) ?? '',
});

export function ChecklistPreventivoHidricoCampo({
  campoId,
  organizacionId,
}: {
  campoId: number;
  organizacionId: number;
}) {
  const queryClient = useQueryClient();
  const [editorAbierto, setEditorAbierto] = useState(false);
  const [itemEnEdicion, setItemEnEdicion] = useState<ChecklistPreventivoHidrico | null>(null);
  const [formulario, setFormulario] = useState<FormularioChecklist>(formularioVacio());
  const claveConsulta = ['campos', campoId, 'checklist-hidrico'];

  const checklistQuery = useQuery({
    queryKey: claveConsulta,
    queryFn: () => camposApi.getChecklistPreventivoHidrico(campoId),
    enabled: campoId > 0,
  });
  const miembrosQuery = useQuery({
    queryKey: ['organizaciones', organizacionId, 'miembros'],
    queryFn: () => organizacionesApi.obtenerMiembros(organizacionId),
    enabled: editorAbierto && organizacionId > 0,
  });

  const refrescar = () => queryClient.invalidateQueries({ queryKey: claveConsulta });
  const cerrarEditor = () => {
    setEditorAbierto(false);
    setItemEnEdicion(null);
    setFormulario(formularioVacio());
  };

  const guardarMutation = useMutation({
    mutationFn: () => {
      const payload = crearPayload(formulario);
      return itemEnEdicion
        ? camposApi.updateChecklistPreventivoHidrico(campoId, itemEnEdicion.id, payload)
        : camposApi.createChecklistPreventivoHidrico(campoId, payload);
    },
    onSuccess: () => {
      toast.success(itemEnEdicion ? 'Acción preventiva actualizada.' : 'Acción preventiva creada.');
      cerrarEditor();
      refrescar();
    },
    onError: (error) => toast.error(mensajeError(error, 'No se pudo guardar la acción preventiva.')),
  });

  const plantillaMutation = useMutation({
    mutationFn: () => camposApi.cargarPlantillaChecklistPreventivoHidrico(campoId),
    onSuccess: ({ creados }) => {
      toast.success(creados ? `Se agregaron ${creados} acciones sugeridas.` : 'La plantilla ya está completa.');
      refrescar();
    },
    onError: (error) => toast.error(mensajeError(error, 'No se pudo cargar la plantilla.')),
  });

  const estadoMutation = useMutation({
    mutationFn: ({ item, estado }: { item: ChecklistPreventivoHidrico; estado: 'PENDIENTE' | 'COMPLETADO' }) =>
      camposApi.updateEstadoChecklistPreventivoHidrico(campoId, item.id, estado),
    onSuccess: () => {
      toast.success('Estado de la acción actualizado.');
      refrescar();
    },
    onError: (error) => toast.error(mensajeError(error, 'No se pudo actualizar el estado.')),
  });

  const eliminarMutation = useMutation({
    mutationFn: (itemId: number) => camposApi.removeChecklistPreventivoHidrico(campoId, itemId),
    onSuccess: () => {
      toast.success('Acción preventiva eliminada.');
      refrescar();
    },
    onError: (error) => toast.error(mensajeError(error, 'No se pudo eliminar la acción.')),
  });

  if (checklistQuery.isLoading) {
    return <div className="mb-8 h-72 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />;
  }
  if (checklistQuery.isError || !checklistQuery.data) return null;

  const { items, puedeEditar } = checklistQuery.data;
  const pendientes = items.filter((item) => item.estado === 'PENDIENTE').length;
  const abrirNuevo = () => {
    setItemEnEdicion(null);
    setFormulario(formularioVacio());
    setEditorAbierto(true);
  };
  const abrirEdicion = (item: ChecklistPreventivoHidrico) => {
    setItemEnEdicion(item);
    setFormulario(formularioDesdeItem(item));
    setEditorAbierto(true);
  };

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm dark:border-emerald-900/70 dark:bg-slate-900">
      <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-5 dark:border-emerald-900/60 dark:from-emerald-950/35 dark:via-slate-900 dark:to-teal-950/20 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3">
            <span className="h-fit rounded-xl bg-emerald-700 p-2.5 text-white shadow-sm"><ClipboardCheck size={20} /></span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold text-slate-900 dark:text-white">Plan preventivo por lluvias fuertes</h2>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200">Incluido en Free</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200">
                  {pendientes ? `${pendientes} pendiente${pendientes === 1 ? '' : 's'}` : 'Plan al día'}
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Organizá medidas previas, indicá quién se encarga y guardá la evidencia de cada recorrida.
              </p>
            </div>
          </div>
          {puedeEditar && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => plantillaMutation.mutate()}
                disabled={plantillaMutation.isPending}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-3.5 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50 disabled:opacity-60 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-200 dark:hover:bg-emerald-950/30"
              >
                {plantillaMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Droplets size={16} />}
                Cargar sugeridas
              </button>
              <button type="button" onClick={abrirNuevo} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3.5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800">
                <Plus size={16} />Nueva acción
              </button>
            </div>
          )}
        </div>
      </div>

      {items.length ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((item) => {
            const finalizada = item.estado === 'COMPLETADO';
            const puedeCambiarEstado = item.puedeCompletar && (!finalizada || puedeEditar);
            return (
              <article key={item.id} className={`p-5 sm:p-6 ${finalizada ? 'bg-emerald-50/40 dark:bg-emerald-950/10' : ''}`}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${estilosCategoria[item.categoria]}`}>{etiquetaCategoria(item.categoria)}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${finalizada ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200'}`}>
                        {finalizada ? 'Completada' : 'Pendiente'}
                      </span>
                      {item.origenAutomatico === 'ALERTA_HIDRICA' && <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-200">Creada por alerta</span>}
                    </div>
                    <h3 className={`mt-3 font-bold ${finalizada ? 'text-slate-600 line-through dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>{item.titulo}</h3>
                    {item.descripcion && <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">{item.descripcion}</p>}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {item.responsable && <span className="inline-flex items-center gap-1.5"><UserRound size={14} className="text-emerald-600 dark:text-emerald-300" />Responsable: {item.responsable.usuario.nombre} {item.responsable.usuario.apellido}</span>}
                      {item.fechaLimite && <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-emerald-600 dark:text-emerald-300" />Vence: {formatearFecha(item.fechaLimite)}</span>}
                      {finalizada && item.completadoPor && <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-300" />Completó: {item.completadoPor.nombre} {item.completadoPor.apellido}</span>}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    <EvidenceAction organizacionId={organizacionId} origen="CAMPOS" tipoRecurso="CHECKLIST_HIDRICO" recursoId={item.id} titulo={`Evidencia: ${item.titulo}`} compacto />
                    {puedeCambiarEstado && <button type="button" onClick={() => estadoMutation.mutate({ item, estado: finalizada ? 'PENDIENTE' : 'COMPLETADO' })} disabled={estadoMutation.isPending} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition disabled:opacity-60 ${finalizada ? 'border border-amber-200 text-amber-800 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-amber-950/30' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`}>
                      {estadoMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}{finalizada ? 'Reabrir' : 'Completar'}
                    </button>}
                    {puedeEditar && <button type="button" onClick={() => abrirEdicion(item)} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" aria-label={`Editar ${item.titulo}`}><Pencil size={16} /></button>}
                    {puedeEditar && <button type="button" onClick={() => { if (window.confirm(`¿Eliminar la acción “${item.titulo}”?`)) eliminarMutation.mutate(item.id); }} disabled={eliminarMutation.isPending} className="rounded-lg p-2 text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 dark:text-rose-300 dark:hover:bg-rose-950/30" aria-label={`Eliminar ${item.titulo}`}><Trash2 size={16} /></button>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="p-7 text-center sm:p-9">
          <ShieldAlert className="mx-auto h-9 w-9 text-emerald-600 dark:text-emerald-300" />
          <h3 className="mt-3 font-bold text-slate-900 dark:text-white">Todavía no hay acciones preventivas</h3>
          <p className="mx-auto mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">Usá el checklist sugerido para revisar drenajes, accesos, infraestructura y resguardo de la hacienda antes de un evento de lluvia intenso.</p>
          {!puedeEditar && <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">El owner puede organizar las acciones y asignar responsables.</p>}
        </div>
      )}

      {editorAbierto && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/65 p-4" onClick={cerrarEditor}>
          <div className="mx-auto my-8 w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">{itemEnEdicion ? 'Editar acción preventiva' : 'Nueva acción preventiva'}</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Definí qué hay que revisar, quién se encarga y cuándo debería estar resuelto.</p></div>
              <button type="button" onClick={cerrarEditor} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Cerrar"><X size={18} /></button>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); guardarMutation.mutate(); }} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">Acción a realizar *</span><input required maxLength={160} value={formulario.titulo} onChange={(event) => setFormulario((actual) => ({ ...actual, titulo: event.target.value }))} className="input" placeholder="Ej.: Limpiar la alcantarilla del acceso principal" /></label>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">Detalle u observación</span><textarea maxLength={2000} rows={3} value={formulario.descripcion} onChange={(event) => setFormulario((actual) => ({ ...actual, descripcion: event.target.value }))} className="input resize-y" placeholder="Indicaciones para realizar la acción o puntos a revisar." /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">Tipo de acción</span><select value={formulario.categoria} onChange={(event) => setFormulario((actual) => ({ ...actual, categoria: event.target.value as CategoriaChecklistPreventivoHidrico }))} className="input">{categorias.map((categoria) => <option key={categoria.value} value={categoria.value}>{categoria.label}</option>)}</select></label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">Fecha límite</span><input type="date" value={formulario.fechaLimite} onChange={(event) => setFormulario((actual) => ({ ...actual, fechaLimite: event.target.value }))} className="input" /></label>
              </div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">Responsable</span><select value={formulario.responsableId} onChange={(event) => setFormulario((actual) => ({ ...actual, responsableId: event.target.value }))} className="input"><option value="">Sin asignar por ahora</option>{miembrosQuery.data?.filter((miembro) => miembro.activo).map((miembro) => <option key={miembro.id} value={miembro.id}>{miembro.usuario.nombre} {miembro.usuario.apellido}{miembro.cargoPersonalizado ? ` · ${miembro.cargoPersonalizado}` : ''}</option>)}</select>{miembrosQuery.isLoading && <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500"><Loader2 size={12} className="animate-spin" />Cargando miembros...</span>}</label>
              <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800"><button type="button" onClick={cerrarEditor} disabled={guardarMutation.isPending} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">Cancelar</button><button type="submit" disabled={guardarMutation.isPending} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60">{guardarMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}{itemEnEdicion ? 'Guardar cambios' : 'Crear acción'}</button></div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
