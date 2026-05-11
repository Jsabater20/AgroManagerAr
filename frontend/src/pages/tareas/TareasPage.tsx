import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ClipboardList, Plus, Loader2, CheckCircle2, Clock, AlertTriangle,
  XCircle, ChevronLeft, ChevronRight, X, Trash2, Pencil,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { tareasApi } from '../../api/tareas.api';
import { camposApi } from '../../api/campos.api';
import type {
  TareaRural, CreateTareaDto,
  TipoTarea, EstadoTarea, Prioridad,
} from '../../api/types';

const PAGE_SIZE = 10;

const TIPOS: TipoTarea[] = [
  'SIEMBRA', 'COSECHA', 'FUMIGACION', 'FERTILIZACION',
  'RIEGO', 'MANTENIMIENTO', 'VETERINARIA', 'OTRO',
];

const TIPO_LABELS: Record<TipoTarea, string> = {
  SIEMBRA: 'Siembra', COSECHA: 'Cosecha', FUMIGACION: 'Fumigación',
  FERTILIZACION: 'Fertilización', RIEGO: 'Riego',
  MANTENIMIENTO: 'Mantenimiento', VETERINARIA: 'Veterinaria', OTRO: 'Otro',
};

const TIPO_COLORS: Record<TipoTarea, string> = {
  SIEMBRA: 'bg-green-100 text-green-700',
  COSECHA: 'bg-amber-100 text-amber-700',
  FUMIGACION: 'bg-purple-100 text-purple-700',
  FERTILIZACION: 'bg-blue-100 text-blue-700',
  RIEGO: 'bg-cyan-100 text-cyan-700',
  MANTENIMIENTO: 'bg-gray-100 text-gray-700',
  VETERINARIA: 'bg-pink-100 text-pink-700',
  OTRO: 'bg-orange-100 text-orange-700',
};

const ESTADOS: EstadoTarea[] = ['PENDIENTE', 'EN_CURSO', 'COMPLETADA', 'CANCELADA'];

const ESTADO_CONFIG: Record<EstadoTarea, { label: string; color: string; Icon: typeof Clock }> = {
  PENDIENTE:  { label: 'Pendiente',  color: 'bg-yellow-100 text-yellow-700', Icon: Clock },
  EN_CURSO:   { label: 'En curso',   color: 'bg-blue-100 text-blue-700',     Icon: Clock },
  COMPLETADA: { label: 'Completada', color: 'bg-green-100 text-green-700',   Icon: CheckCircle2 },
  CANCELADA:  { label: 'Cancelada',  color: 'bg-gray-100 text-gray-500',     Icon: XCircle },
};

const PRIORIDADES: Prioridad[] = ['BAJA', 'MEDIA', 'ALTA', 'URGENTE'];

const PRIORIDAD_CONFIG: Record<Prioridad, { label: string; color: string; dot: string }> = {
  BAJA:    { label: 'Baja',    color: 'text-gray-500',  dot: 'bg-gray-400' },
  MEDIA:   { label: 'Media',   color: 'text-blue-600',  dot: 'bg-blue-500' },
  ALTA:    { label: 'Alta',    color: 'text-orange-600', dot: 'bg-orange-500' },
  URGENTE: { label: 'Urgente', color: 'text-red-600',   dot: 'bg-red-500' },
};

const emptyForm: CreateTareaDto = {
  titulo: '', tipo: 'OTRO', prioridad: 'MEDIA',
  fechaProgramada: '', campoId: undefined, descripcion: '', observaciones: '',
};

function isOverdue(t: TareaRural): boolean {
  if (t.estado === 'COMPLETADA' || t.estado === 'CANCELADA') return false;
  return new Date(t.fechaProgramada) < new Date(new Date().toDateString());
}

function daysLabel(t: TareaRural): string {
  if (t.estado === 'COMPLETADA' || t.estado === 'CANCELADA') return '';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff  = Math.ceil((new Date(t.fechaProgramada).getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  if (diff < 0)  return `Hace ${Math.abs(diff)} días`;
  return `En ${diff} días`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function today() { return new Date().toISOString().split('T')[0]; }

export default function TareasPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal]         = useState(false);
  const [editTarget, setEditTarget]       = useState<TareaRural | null>(null);
  const [form, setForm]                   = useState<CreateTareaDto>(emptyForm);
  const [estadoTarget, setEstadoTarget]   = useState<TareaRural | null>(null);
  const [nuevoEstado, setNuevoEstado]     = useState<EstadoTarea>('PENDIENTE');
  const [filterEstado, setFilterEstado]   = useState<EstadoTarea | ''>('');
  const [filterTipo, setFilterTipo]       = useState<TipoTarea | ''>('');
  const [page, setPage]                   = useState(1);

  const { data: tareas, isLoading } = useQuery({ queryKey: ['tareas'], queryFn: tareasApi.getAll });
  const { data: campos }            = useQuery({ queryKey: ['campos'], queryFn: camposApi.getAll });

  const filtered = useMemo(() => (tareas ?? []).filter((t) => {
    if (filterEstado && t.estado !== filterEstado) return false;
    if (filterTipo   && t.tipo   !== filterTipo)   return false;
    return true;
  }), [tareas, filterEstado, filterTipo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = filterEstado !== '' || filterTipo !== '';
  const resetFilters = () => { setFilterEstado(''); setFilterTipo(''); setPage(1); };

  const openCreate = () => { setForm({ ...emptyForm, fechaProgramada: today() }); setShowModal(true); };
  const openEdit   = (t: TareaRural) => {
    setForm({
      titulo: t.titulo, tipo: t.tipo, prioridad: t.prioridad,
      fechaProgramada: t.fechaProgramada.split('T')[0],
      campoId: t.campoId ?? undefined,
      descripcion: t.descripcion ?? '', observaciones: t.observaciones ?? '',
    });
    setEditTarget(t);
  };
  const closeModal = () => { setShowModal(false); setEditTarget(null); setForm(emptyForm); };

  const createMutation = useMutation({
    mutationFn: tareasApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tareas'] });
      toast.success('Tarea creada');
      closeModal();
    },
    onError: () => toast.error('Error al crear la tarea'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: Partial<CreateTareaDto> }) => tareasApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tareas'] });
      toast.success('Tarea actualizada');
      closeModal();
    },
    onError: () => toast.error('Error al actualizar la tarea'),
  });

  const estadoMutation = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: EstadoTarea }) => tareasApi.updateEstado(id, estado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tareas'] });
      toast.success('Estado actualizado');
      setEstadoTarget(null);
    },
    onError: () => toast.error('Error al actualizar el estado'),
  });

  const deleteMutation = useMutation({
    mutationFn: tareasApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tareas'] });
      toast.success('Tarea eliminada');
    },
    onError: () => toast.error('Error al eliminar la tarea'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTarget) {
      updateMutation.mutate({ id: editTarget.id, dto: form });
    } else {
      createMutation.mutate(form);
    }
  };

  // Stats
  const pendientes = (tareas ?? []).filter((t) => t.estado === 'PENDIENTE').length;
  const enCurso    = (tareas ?? []).filter((t) => t.estado === 'EN_CURSO').length;
  const vencidas   = (tareas ?? []).filter(isOverdue).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tareas rurales</h1>
          <p className="text-gray-500 mt-1 text-sm">Planificación y seguimiento de actividades</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />Nueva tarea
        </button>
      </div>

      {/* Mini stats */}
      {!isLoading && (tareas?.length ?? 0) > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Pendientes" value={pendientes} color="text-yellow-600" bg="bg-yellow-50" />
          <StatCard label="En curso"   value={enCurso}    color="text-blue-600"   bg="bg-blue-50" />
          <StatCard label="Vencidas"   value={vencidas}   color="text-red-600"    bg="bg-red-50" icon={vencidas > 0 ? <AlertTriangle size={16} className="text-red-500" /> : undefined} />
        </div>
      )}

      {/* Filtros */}
      {!isLoading && (tareas?.length ?? 0) > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-5 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <select value={filterEstado} onChange={(e) => { setFilterEstado(e.target.value as EstadoTarea | ''); setPage(1); }} className="input w-auto! text-sm">
            <option value="">Todos los estados</option>
            {ESTADOS.map((e) => <option key={e} value={e}>{ESTADO_CONFIG[e].label}</option>)}
          </select>
          <select value={filterTipo} onChange={(e) => { setFilterTipo(e.target.value as TipoTarea | ''); setPage(1); }} className="input w-auto! text-sm">
            <option value="">Todos los tipos</option>
            {TIPOS.map((t) => <option key={t} value={t}>{TIPO_LABELS[t]}</option>)}
          </select>
          {hasFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="text-xs text-gray-400 ml-auto">
            {filtered.length} {filtered.length === 1 ? 'tarea' : 'tareas'}{hasFilters ? ' encontradas' : ' en total'}
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-green-600" /></div>
      ) : tareas?.length === 0 ? (
        <EmptyState onAdd={openCreate} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">No hay tareas que coincidan con los filtros.</p>
          <button onClick={resetFilters} className="mt-2 text-green-700 text-sm hover:underline">Limpiar filtros</button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Tarea</th>
                  <th className="text-left px-5 py-3">Tipo</th>
                  <th className="text-left px-5 py-3">Campo</th>
                  <th className="text-left px-5 py-3">Fecha</th>
                  <th className="text-left px-5 py-3">Prioridad</th>
                  <th className="text-left px-5 py-3">Estado</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paged.map((t) => {
                  const estadoCfg = ESTADO_CONFIG[t.estado];
                  const EstadoIcon = estadoCfg.Icon;
                  const priCfg    = PRIORIDAD_CONFIG[t.prioridad];
                  const overdue   = isOverdue(t);
                  return (
                    <tr key={t.id} className={`hover:bg-gray-50 transition-colors ${overdue ? 'bg-red-50/40' : ''}`}>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-gray-900">{t.titulo}</p>
                        {t.descripcion && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{t.descripcion}</p>}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${TIPO_COLORS[t.tipo]}`}>
                          {TIPO_LABELS[t.tipo]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{t.campo?.nombre ?? '—'}</td>
                      <td className="px-5 py-3.5">
                        <p className="text-gray-600">{formatDate(t.fechaProgramada)}</p>
                        <p className={`text-xs mt-0.5 font-medium ${overdue ? 'text-red-500' : 'text-gray-400'}`}>
                          {daysLabel(t)}{overdue && <AlertTriangle size={10} className="inline ml-1" />}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${priCfg.color}`}>
                          <span className={`w-2 h-2 rounded-full ${priCfg.dot}`} />
                          {priCfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => { setNuevoEstado(t.estado); setEstadoTarget(t); }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${estadoCfg.color}`}>
                          <EstadoIcon size={11} />{estadoCfg.label}
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => openEdit(t)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => { if (window.confirm(`¿Eliminar "${t.titulo}"?`)) deleteMutation.mutate(t.id); }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="text-xs text-gray-400">Página {page} de {totalPages}</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === page ? 'bg-green-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal: Crear / Editar tarea */}
      {(showModal || editTarget) && (
        <Modal title={editTarget ? 'Editar tarea' : 'Nueva tarea'} onClose={closeModal}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Título *">
              <input required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="input" placeholder="Ej: Fumigar lote 3..." />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Tipo *">
                <select required value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoTarea })} className="input">
                  {TIPOS.map((t) => <option key={t} value={t}>{TIPO_LABELS[t]}</option>)}
                </select>
              </Field>
              <Field label="Prioridad">
                <select value={form.prioridad} onChange={(e) => setForm({ ...form, prioridad: e.target.value as Prioridad })} className="input">
                  {PRIORIDADES.map((p) => <option key={p} value={p}>{PRIORIDAD_CONFIG[p].label}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha programada *">
                <input required type="date" value={form.fechaProgramada}
                  onChange={(e) => setForm({ ...form, fechaProgramada: e.target.value })} className="input" />
              </Field>
              <Field label="Campo (opcional)">
                <select value={form.campoId ?? 0} onChange={(e) => setForm({ ...form, campoId: Number(e.target.value) || undefined })} className="input">
                  <option value={0}>Sin campo</option>
                  {campos?.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Descripción">
              <textarea rows={2} value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                className="input resize-none" placeholder="Opcional" />
            </Field>
            <Field label="Observaciones">
              <textarea rows={2} value={form.observaciones}
                onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
                className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions
              onCancel={closeModal}
              loading={createMutation.isPending || updateMutation.isPending}
              label={editTarget ? 'Guardar cambios' : 'Crear tarea'}
            />
          </form>
        </Modal>
      )}

      {/* Modal: Cambiar estado */}
      {estadoTarget && (
        <Modal title="Cambiar estado" onClose={() => setEstadoTarget(null)}>
          <p className="text-sm text-gray-600 mb-4">
            <strong>{estadoTarget.titulo}</strong>
            {estadoTarget.campo && <span className="text-gray-400"> · {estadoTarget.campo.nombre}</span>}
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {ESTADOS.map((e) => {
              const cfg  = ESTADO_CONFIG[e];
              const Icon = cfg.Icon;
              return (
                <label key={e} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${nuevoEstado === e ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="estado" value={e} checked={nuevoEstado === e} onChange={() => setNuevoEstado(e)} className="sr-only" />
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                    <Icon size={12} />{cfg.label}
                  </span>
                </label>
              );
            })}
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setEstadoTarget(null)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              Cancelar
            </button>
            <button
              disabled={estadoMutation.isPending || nuevoEstado === estadoTarget.estado}
              onClick={() => estadoMutation.mutate({ id: estadoTarget.id, estado: nuevoEstado })}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              {estadoMutation.isPending && <Loader2 size={14} className="animate-spin" />}Guardar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ label, value, color, bg, icon }: { label: string; value: number; color: string; bg: string; icon?: React.ReactNode }) {
  return (
    <div className={`${bg} rounded-xl px-5 py-4 flex items-center justify-between`}>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${color}`}>{value}</p>
      </div>
      {icon}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-emerald-50 p-5 rounded-2xl mb-4"><ClipboardList size={40} className="text-emerald-600" /></div>
      <h2 className="text-lg font-semibold text-gray-900">No hay tareas registradas</h2>
      <p className="text-gray-500 text-sm mt-1 mb-5">Planificá las actividades de tu campo</p>
      <button onClick={onAdd} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
        <Plus size={16} />Nueva tarea
      </button>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function ModalActions({ onCancel, loading, label }: { onCancel: () => void; loading: boolean; label: string }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" disabled={loading} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        {loading && <Loader2 size={14} className="animate-spin" />}{label}
      </button>
    </div>
  );
}
