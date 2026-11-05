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
  type TipoPlantillaPreventiva,
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

const plantillasPreventivas: Array<{
  tipo: TipoPlantillaPreventiva;
  titulo: string;
  descripcion: string;
  cuandoUsarla: string;
}> = [
  {
    tipo: 'LLUVIA_INTENSA',
    titulo: 'Lluvias fuertes',
    descripcion: 'Prepará drenajes, accesos, instalaciones e insumos antes de que llueva.',
    cuandoUsarla: 'Cuando se anuncian lluvias importantes o tormentas.',
  },
  {
    tipo: 'EXCESO_AGUA',
    titulo: 'Exceso de agua',
    descripcion: 'Revisá los sectores bajos y cuidá caminos, equipos e instalaciones.',
    cuandoUsarla: 'Después de varios días de lluvia, anegamientos o desbordes.',
  },
  {
    tipo: 'SEQUIA',
    titulo: 'Sequía',
    descripcion: 'Controlá agua, forraje, riego y los lotes que pueden sufrir primero.',
    cuandoUsarla: 'Cuando hay poca lluvia o las reservas de agua empiezan a bajar.',
  },
  {
    tipo: 'HELADA',
    titulo: 'Helada',
    descripcion: 'Organizá controles para cultivos, animales, bombas y cañerías expuestas.',
    cuandoUsarla: 'Cuando se pronostican temperaturas muy bajas.',
  },
  {
    tipo: 'VIENTO_FUERTE',
    titulo: 'Viento fuerte',
    descripcion: 'Asegurá instalaciones y postergá los trabajos que puedan ser riesgosos.',
    cuandoUsarla: 'Ante ráfagas, tormentas o frentes de viento fuerte.',
  },
];

const estilosCategoria: Record<CategoriaChecklistPreventivoHidrico, string> = {
  DRENAJE: 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-200',
  ACCESO: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200',
  INFRAESTRUCTURA: 'bg-violet-100 text-violet-800 dark:bg-violet-950/70 dark:text-violet-200',
  GANADERIA: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200',
  MAQUINARIA_E_INSUMOS: 'bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-200',
  GENERAL: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
};

const etiquetasEstadoTrabajo: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  EN_PROGRESO: 'En progreso',
  PAUSADA: 'Pausado',
  COMPLETADA: 'Completado',
  CANCELADA: 'Cancelado',
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
  const [selectorPlantillaAbierto, setSelectorPlantillaAbierto] = useState(false);
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
    mutationFn: (tipo: TipoPlantillaPreventiva) =>
      camposApi.cargarPlantillaChecklistPreventivoHidrico(campoId, tipo),
    onSuccess: ({ creados, tipo }) => {
      const nombreGuia = plantillasPreventivas.find((item) => item.tipo === tipo)?.titulo.toLowerCase() ?? 'esta situación';
      toast.success(
        creados
          ? `Se agregaron ${creados} acciones para ${nombreGuia}.`
          : 'Las acciones de esta guía ya están en el plan.',
      );
      setSelectorPlantillaAbierto(false);
      refrescar();
    },
    onError: (error) => toast.error(mensajeError(error, 'No se pudo cargar la plantilla.')),
  });

  const trabajoMutation = useMutation({
    mutationFn: (itemId: number) =>
      camposApi.crearTrabajoDesdeChecklistPreventivoHidrico(campoId, itemId),
    onSuccess: ({ creado }) => {
      toast.success(
        creado
          ? 'Trabajo creado. La persona asignada lo verá en Tareas.'
          : 'Este trabajo ya estaba creado en Tareas.',
      );
      queryClient.invalidateQueries({ queryKey: ['actividades', organizacionId] });
      refrescar();
    },
    onError: (error) => toast.error(mensajeError(error, 'No se pudo crear el trabajo.')),
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
  const completadas = items.length - pendientes;
  const avance = items.length ? Math.round((completadas / items.length) * 100) : 0;
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
                <h2 className="font-bold text-slate-900 dark:text-white">Plan de prevención del campo</h2>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200">Incluido en Free</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200">
                  {pendientes ? `${pendientes} por hacer` : 'Plan al día'}
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
                onClick={() => setSelectorPlantillaAbierto(true)}
                disabled={plantillaMutation.isPending}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-3.5 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50 disabled:opacity-60 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-200 dark:hover:bg-emerald-950/30"
              >
                {plantillaMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Droplets size={16} />}
                Elegir guía preventiva
              </button>
              <button type="button" onClick={abrirNuevo} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3.5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800">
                <Plus size={16} /> Agregar acción
              </button>
            </div>
          )}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-100 bg-white/75 p-3 dark:border-emerald-900/60 dark:bg-slate-900/75">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">1. Qué revisar</p>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">Elegí una acción concreta: accesos, drenajes, animales, maquinaria o infraestructura.</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-white/75 p-3 dark:border-emerald-900/60 dark:bg-slate-900/75">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">2. Quién lo hace</p>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">Asigná una persona y una fecha para que todos sepan qué les corresponde.</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-white/75 p-3 dark:border-emerald-900/60 dark:bg-slate-900/75">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">3. Confirmar y guardar</p>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">Al terminar, marcá la acción como realizada y adjuntá fotos si hace falta.</p>
          </div>
        </div>
        {items.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Avance del plan</span>
              <span>{completadas} de {items.length} acciones realizadas · {avance}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950/60">
              <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${avance}%` }} />
            </div>
          </div>
        )}
      </div>

      {items.length ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((item) => {
            const finalizada = item.estado === 'COMPLETADO';
            const trabajoControlaEstado = Boolean(
              item.trabajo && item.trabajo.estado !== 'CANCELADA',
            );
            const puedeCambiarEstado =
              item.puedeCompletar &&
              (!finalizada || puedeEditar) &&
              !trabajoControlaEstado;
            const creandoTrabajo =
              trabajoMutation.isPending && trabajoMutation.variables === item.id;
            return (
              <article key={item.id} className={`p-5 sm:p-6 ${finalizada ? 'bg-emerald-50/40 dark:bg-emerald-950/10' : ''}`}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${estilosCategoria[item.categoria]}`}>{etiquetaCategoria(item.categoria)}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${finalizada ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200'}`}>
                        {finalizada ? 'Realizada' : 'Por hacer'}
                      </span>
                      {item.origenAutomatico === 'ALERTA_HIDRICA' && <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-200">Sugerida por alerta de clima</span>}
                    </div>
                    <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Qué hay que hacer</p>
                    <h3 className={`mt-1 font-bold ${finalizada ? 'text-slate-600 line-through dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>{item.titulo}</h3>
                    {item.descripcion && <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">{item.descripcion}</p>}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5"><UserRound size={14} className="text-emerald-600 dark:text-emerald-300" />{item.responsable ? `Lo realiza: ${item.responsable.usuario.nombre} ${item.responsable.usuario.apellido}` : 'Sin responsable asignado'}</span>
                      <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-emerald-600 dark:text-emerald-300" />{item.fechaLimite ? `Para: ${formatearFecha(item.fechaLimite)}` : 'Sin fecha límite'}</span>
                      {finalizada && item.completadoPor && <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-300" />Confirmó: {item.completadoPor.nombre} {item.completadoPor.apellido}</span>}
                    </div>
                    {item.trabajo && (
                      <p className="mt-3 text-xs font-medium text-sky-700 dark:text-sky-300">
                        Este plan se actualiza desde Tareas: al completar o reabrir el trabajo, esta acción cambia automáticamente.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    {puedeEditar && !finalizada && (
                      item.trabajo ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-800 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200">
                          <ClipboardCheck size={14} /> Tareas: {etiquetasEstadoTrabajo[item.trabajo.estado] ?? item.trabajo.estado}
                        </span>
                      ) : item.responsable ? (
                        <button
                          type="button"
                          onClick={() => trabajoMutation.mutate(item.id)}
                          disabled={trabajoMutation.isPending}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-800 transition hover:bg-sky-100 disabled:opacity-60 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200 dark:hover:bg-sky-950/70"
                        >
                          {creandoTrabajo ? <Loader2 size={14} className="animate-spin" /> : <ClipboardCheck size={14} />}
                          Enviar como trabajo
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Asigná una persona para enviarlo a Tareas.</span>
                      )
                    )}
                    <EvidenceAction organizacionId={organizacionId} origen="CAMPOS" tipoRecurso="CHECKLIST_HIDRICO" recursoId={item.id} titulo={`Evidencia: ${item.titulo}`} compacto />
                    {puedeCambiarEstado && <button type="button" onClick={() => estadoMutation.mutate({ item, estado: finalizada ? 'PENDIENTE' : 'COMPLETADO' })} disabled={estadoMutation.isPending} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition disabled:opacity-60 ${finalizada ? 'border border-amber-200 text-amber-800 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-amber-950/30' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`}>
                      {estadoMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}{finalizada ? 'Volver a pendiente' : 'Marcar como realizada'}
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
          <h3 className="mt-3 font-bold text-slate-900 dark:text-white">Todavía no hay acciones en el plan</h3>
          <p className="mx-auto mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">Empezá con acciones sugeridas y adaptalas a la realidad de este campo. Incluyen drenajes, accesos, infraestructura y resguardo de animales.</p>
          {puedeEditar ? <button type="button" onClick={() => setSelectorPlantillaAbierto(true)} disabled={plantillaMutation.isPending} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60">{plantillaMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Droplets size={16} />} Elegir guía preventiva</button> : <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">El owner puede organizar las acciones y asignar responsables.</p>}
        </div>
      )}

      {selectorPlantillaAbierto && (
        <div
          className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/65 p-4"
          onClick={() => {
            if (!plantillaMutation.isPending) setSelectorPlantillaAbierto(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-guia-preventiva"
            className="mx-auto my-8 w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Guías simples</p>
                <h2 id="titulo-guia-preventiva" className="mt-1 text-xl font-bold text-slate-900 dark:text-white">¿Para qué situación querés prepararte?</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Elegí una guía y se agregarán acciones claras a este mismo plan. No se eliminan las acciones que ya tenés.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectorPlantillaAbierto(false)}
                disabled={plantillaMutation.isPending}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {plantillasPreventivas.map((plantilla) => (
                <article key={plantilla.tipo} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                      <Droplets size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white">{plantilla.titulo}</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">{plantilla.descripcion}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{plantilla.cuandoUsarla}</p>
                      <button
                        type="button"
                        onClick={() => plantillaMutation.mutate(plantilla.tipo)}
                        disabled={plantillaMutation.isPending}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {plantillaMutation.isPending ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                        Usar esta guía
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {editorAbierto && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/65 p-4" onClick={cerrarEditor}>
          <div className="mx-auto my-8 w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">{itemEnEdicion ? 'Editar acción del plan' : 'Nueva acción del plan'}</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Contá qué hay que hacer, quién se encarga y para cuándo debería estar resuelto.</p></div>
              <button type="button" onClick={cerrarEditor} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Cerrar"><X size={18} /></button>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); guardarMutation.mutate(); }} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">¿Qué hay que hacer? *</span><input required maxLength={160} value={formulario.titulo} onChange={(event) => setFormulario((actual) => ({ ...actual, titulo: event.target.value }))} className="input" placeholder="Ej.: Limpiar la alcantarilla del acceso principal" /></label>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">Indicaciones para la persona (opcional)</span><textarea maxLength={2000} rows={3} value={formulario.descripcion} onChange={(event) => setFormulario((actual) => ({ ...actual, descripcion: event.target.value }))} className="input resize-y" placeholder="Ej.: Revisar que no haya ramas, tierra o residuos que tapen el paso del agua." /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">¿Qué parte del campo cuidás?</span><select value={formulario.categoria} onChange={(event) => setFormulario((actual) => ({ ...actual, categoria: event.target.value as CategoriaChecklistPreventivoHidrico }))} className="input">{categorias.map((categoria) => <option key={categoria.value} value={categoria.value}>{categoria.label}</option>)}</select></label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">¿Para cuándo? (opcional)</span><input type="date" value={formulario.fechaLimite} onChange={(event) => setFormulario((actual) => ({ ...actual, fechaLimite: event.target.value }))} className="input" /></label>
              </div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200"><span className="mb-1.5 block">¿Quién lo hace? (opcional)</span><select value={formulario.responsableId} onChange={(event) => setFormulario((actual) => ({ ...actual, responsableId: event.target.value }))} className="input"><option value="">Lo defino más adelante</option>{miembrosQuery.data?.filter((miembro) => miembro.activo).map((miembro) => <option key={miembro.id} value={miembro.id}>{miembro.usuario.nombre} {miembro.usuario.apellido}{miembro.cargoPersonalizado ? ` · ${miembro.cargoPersonalizado}` : ''}</option>)}</select>{miembrosQuery.isLoading && <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500"><Loader2 size={12} className="animate-spin" />Cargando miembros...</span>}</label>
              <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800"><button type="button" onClick={cerrarEditor} disabled={guardarMutation.isPending} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">Cancelar</button><button type="submit" disabled={guardarMutation.isPending} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60">{guardarMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}{itemEnEdicion ? 'Guardar cambios' : 'Agregar al plan'}</button></div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
