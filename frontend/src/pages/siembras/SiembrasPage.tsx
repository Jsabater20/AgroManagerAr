import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Sprout, Plus, Loader2, BadgeCheck, AlertCircle, Clock,
  ChevronDown, Wheat, FlaskConical, ChevronLeft, ChevronRight, X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { siembrasApi } from '../../api/siembras.api';
import { camposApi } from '../../api/campos.api';
import { cultivosApi } from '../../api/cultivos.api';
import { insumosApi } from '../../api/insumos.api';
import type {
  CreateSiembraDto, CreateCosechaDto, CreateAplicacionDto,
  EstadoSiembra, Siembra,
} from '../../api/types';

const PAGE_SIZE = 10;

const emptyForm: CreateSiembraDto = {
  loteId: 0, tipoCultivoId: 0, fechaSiembra: '', densidad: undefined, observaciones: '',
};
const emptyCosecha: CreateCosechaDto = {
  fechaCosecha: '', rendimientoKgHa: 0, totalKg: 0, humedad: undefined, observaciones: '',
};
const emptyAplicacion: CreateAplicacionDto = {
  insumoId: 0, fecha: '', cantidad: 0, unidad: '', observaciones: '',
};

const ESTADO_CONFIG: Record<EstadoSiembra, { label: string; color: string; Icon: typeof Clock }> = {
  EN_CURSO:  { label: 'En curso',  color: 'bg-blue-100 text-blue-700',   Icon: Clock },
  COSECHADA: { label: 'Cosechada', color: 'bg-green-100 text-green-700', Icon: BadgeCheck },
  PERDIDA:   { label: 'Perdida',   color: 'bg-red-100 text-red-700',     Icon: AlertCircle },
};
const ESTADOS: EstadoSiembra[] = ['EN_CURSO', 'COSECHADA', 'PERDIDA'];

export default function SiembrasPage() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<CreateSiembraDto>(emptyForm);
  const [selectedCampoId, setSelectedCampoId] = useState<number>(0);
  const [estadoTarget, setEstadoTarget] = useState<Siembra | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState<EstadoSiembra>('EN_CURSO');
  const [cosechaTarget, setCosechaTarget] = useState<Siembra | null>(null);
  const [cosechaForm, setCosechaForm] = useState<CreateCosechaDto>(emptyCosecha);
  const [aplicacionTarget, setAplicacionTarget] = useState<Siembra | null>(null);
  const [aplicacionForm, setAplicacionForm] = useState<CreateAplicacionDto>(emptyAplicacion);

  const [filterEstado, setFilterEstado] = useState<EstadoSiembra | ''>('');
  const [filterCampoId, setFilterCampoId] = useState<number>(0);
  const [page, setPage] = useState(1);

  const { data: siembras, isLoading } = useQuery({ queryKey: ['siembras'], queryFn: siembrasApi.getAll });
  const { data: campos } = useQuery({ queryKey: ['campos'], queryFn: camposApi.getAll });
  const { data: cultivos } = useQuery({ queryKey: ['cultivos'], queryFn: cultivosApi.getAll });
  const { data: insumos } = useQuery({ queryKey: ['insumos'], queryFn: insumosApi.getAll });

  const lotesDisponibles = campos?.find((c) => c.id === selectedCampoId)?.lotes ?? [];

  const filtered = (siembras ?? []).filter((s) => {
    if (filterEstado && s.estado !== filterEstado) return false;
    if (filterCampoId && s.lote.campo.id !== filterCampoId) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = filterEstado !== '' || filterCampoId !== 0;
  const resetFilters = () => { setFilterEstado(''); setFilterCampoId(0); setPage(1); };

  const createMutation = useMutation({
    mutationFn: siembrasApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siembras'] });
      toast.success('Siembra registrada');
      setShowModal(false); setForm(emptyForm); setSelectedCampoId(0);
    },
    onError: () => toast.error('Error al registrar la siembra'),
  });

  const estadoMutation = useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: EstadoSiembra }) => siembrasApi.updateEstado(id, estado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siembras'] });
      toast.success('Estado actualizado');
      setEstadoTarget(null);
    },
    onError: () => toast.error('Error al actualizar el estado'),
  });

  const cosechaMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateCosechaDto }) => siembrasApi.addCosecha(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siembras'] });
      toast.success('Cosecha registrada');
      setCosechaTarget(null); setCosechaForm(emptyCosecha);
    },
    onError: () => toast.error('Error al registrar la cosecha'),
  });

  const aplicacionMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateAplicacionDto }) => siembrasApi.addAplicacion(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siembras'] });
      toast.success('Aplicacion registrada');
      setAplicacionTarget(null); setAplicacionForm(emptyAplicacion);
    },
    onError: () => toast.error('Error al registrar la aplicacion'),
  });

  const openEstadoModal = (s: Siembra) => { setNuevoEstado(s.estado); setEstadoTarget(s); };
  const openCosechaModal = (s: Siembra) => { setCosechaForm({ ...emptyCosecha, fechaCosecha: today() }); setCosechaTarget(s); };
  const openAplicacionModal = (s: Siembra) => { setAplicacionForm({ ...emptyAplicacion, fecha: today() }); setAplicacionTarget(s); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Siembras</h1>
          <p className="text-gray-500 mt-1 text-sm">Registros de siembra y estado de cultivos</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />Nueva siembra
        </button>
      </div>

      {/* Filtros */}
      {!isLoading && (siembras?.length ?? 0) > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-5 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <select value={filterEstado} onChange={(e) => { setFilterEstado(e.target.value as EstadoSiembra | ''); setPage(1); }} className="input w-auto! text-sm">
            <option value="">Todos los estados</option>
            {ESTADOS.map((e) => <option key={e} value={e}>{ESTADO_CONFIG[e].label}</option>)}
          </select>
          <select value={filterCampoId} onChange={(e) => { setFilterCampoId(Number(e.target.value)); setPage(1); }} className="input w-auto! text-sm">
            <option value={0}>Todos los campos</option>
            {campos?.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
          {hasFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="text-xs text-gray-400 ml-auto">
            {filtered.length} {filtered.length === 1 ? 'siembra' : 'siembras'}{hasFilters ? ' encontradas' : ' en total'}
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-green-600" /></div>
      ) : siembras?.length === 0 ? (
        <EmptyState onAdd={() => setShowModal(true)} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">No hay siembras que coincidan con los filtros.</p>
          <button onClick={resetFilters} className="mt-2 text-green-700 text-sm hover:underline">Limpiar filtros</button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Campo / Lote</th>
                  <th className="text-left px-5 py-3">Cultivo</th>
                  <th className="text-left px-5 py-3">Fecha</th>
                  <th className="text-left px-5 py-3">Densidad</th>
                  <th className="text-left px-5 py-3">Cosechas</th>
                  <th className="text-left px-5 py-3">Estado</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paged.map((s) => {
                  const cfg = ESTADO_CONFIG[s.estado];
                  const Icon = cfg.Icon;
                  return (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-gray-900">
                        {s.lote.campo.nombre}<span className="text-gray-400 font-normal"> / {s.lote.nombre}</span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">{s.tipoCultivo.nombre}</td>
                      <td className="px-5 py-3.5 text-gray-600">{formatDate(s.fechaSiembra)}</td>
                      <td className="px-5 py-3.5 text-gray-600">{s.densidad ? `${s.densidad} kg/ha` : '-'}</td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {s.cosechas.length > 0 ? <span className="font-medium text-green-700">{s.cosechas.length}</span> : '-'}
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => openEstadoModal(s)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${cfg.color}`}>
                          <Icon size={12} />{cfg.label}<ChevronDown size={11} />
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        {s.estado === 'EN_CURSO' && (
                          <div className="flex items-center gap-2 justify-end">
                            <button onClick={() => openAplicacionModal(s)}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                              <FlaskConical size={13} />Insumo
                            </button>
                            <button onClick={() => openCosechaModal(s)}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                              <Wheat size={13} />Cosecha
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="text-xs text-gray-400">Pagina {page} de {totalPages}</p>
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

      {showModal && (
        <Modal title="Nueva siembra" onClose={() => setShowModal(false)}>
          <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
            <Field label="Campo *">
              <select required value={selectedCampoId} onChange={(e) => { setSelectedCampoId(Number(e.target.value)); setForm({ ...form, loteId: 0 }); }} className="input">
                <option value={0} disabled>Selecciona un campo</option>
                {campos?.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </Field>
            <Field label="Lote *">
              <select required value={form.loteId} disabled={!selectedCampoId} onChange={(e) => setForm({ ...form, loteId: Number(e.target.value) })} className="input">
                <option value={0} disabled>Selecciona un lote</option>
                {lotesDisponibles.map((l) => <option key={l.id} value={l.id}>{l.nombre} - {l.hectareas} ha</option>)}
              </select>
            </Field>
            <Field label="Tipo de cultivo *">
              <select required value={form.tipoCultivoId} onChange={(e) => setForm({ ...form, tipoCultivoId: Number(e.target.value) })} className="input">
                <option value={0} disabled>Selecciona un cultivo</option>
                {cultivos?.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </Field>
            <Field label="Fecha de siembra *">
              <input required type="date" value={form.fechaSiembra} onChange={(e) => setForm({ ...form, fechaSiembra: e.target.value })} className="input" />
            </Field>
            <Field label="Densidad (kg/ha)">
              <input type="number" min={0} step={0.1} value={form.densidad ?? ''} onChange={(e) => setForm({ ...form, densidad: e.target.value ? parseFloat(e.target.value) : undefined })} className="input" placeholder="Opcional" />
            </Field>
            <Field label="Observaciones">
              <textarea rows={2} value={form.observaciones} onChange={(e) => setForm({ ...form, observaciones: e.target.value })} className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => setShowModal(false)} loading={createMutation.isPending} label="Registrar" />
          </form>
        </Modal>
      )}

      {estadoTarget && (
        <Modal title="Cambiar estado" onClose={() => setEstadoTarget(null)}>
          <p className="text-sm text-gray-600 mb-4">
            <strong>{estadoTarget.tipoCultivo.nombre}</strong> en <strong>{estadoTarget.lote.campo.nombre} / {estadoTarget.lote.nombre}</strong>
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {ESTADOS.map((e) => {
              const cfg = ESTADO_CONFIG[e]; const Icon = cfg.Icon;
              return (
                <label key={e} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${nuevoEstado === e ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="estado" value={e} checked={nuevoEstado === e} onChange={() => setNuevoEstado(e)} className="sr-only" />
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}><Icon size={12} /> {cfg.label}</span>
                </label>
              );
            })}
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setEstadoTarget(null)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancelar</button>
            <button disabled={estadoMutation.isPending || nuevoEstado === estadoTarget.estado}
              onClick={() => estadoMutation.mutate({ id: estadoTarget.id, estado: nuevoEstado })}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              {estadoMutation.isPending && <Loader2 size={14} className="animate-spin" />}Guardar
            </button>
          </div>
        </Modal>
      )}

      {cosechaTarget && (
        <Modal title="Registrar cosecha" onClose={() => setCosechaTarget(null)}>
          <p className="text-sm text-gray-600 mb-4">
            <strong>{cosechaTarget.tipoCultivo.nombre}</strong> - {cosechaTarget.lote.campo.nombre} / {cosechaTarget.lote.nombre}
          </p>
          <form onSubmit={(e) => { e.preventDefault(); cosechaMutation.mutate({ id: cosechaTarget.id, dto: cosechaForm }); }} className="space-y-4">
            <Field label="Fecha de cosecha *">
              <input required type="date" value={cosechaForm.fechaCosecha} onChange={(e) => setCosechaForm({ ...cosechaForm, fechaCosecha: e.target.value })} className="input" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Rendimiento (kg/ha) *">
                <input required type="number" min={0} step={0.1} value={cosechaForm.rendimientoKgHa || ''}
                  onChange={(e) => setCosechaForm({ ...cosechaForm, rendimientoKgHa: parseFloat(e.target.value) })} className="input" placeholder="Ej: 3500" />
              </Field>
              <Field label="Total kg *">
                <input required type="number" min={0} step={0.1} value={cosechaForm.totalKg || ''}
                  onChange={(e) => setCosechaForm({ ...cosechaForm, totalKg: parseFloat(e.target.value) })} className="input" placeholder="Ej: 87500" />
              </Field>
            </div>
            <Field label="Humedad (%)">
              <input type="number" min={0} max={100} step={0.1} value={cosechaForm.humedad ?? ''}
                onChange={(e) => setCosechaForm({ ...cosechaForm, humedad: e.target.value ? parseFloat(e.target.value) : undefined })} className="input" placeholder="Opcional" />
            </Field>
            <Field label="Observaciones">
              <textarea rows={2} value={cosechaForm.observaciones} onChange={(e) => setCosechaForm({ ...cosechaForm, observaciones: e.target.value })} className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => setCosechaTarget(null)} loading={cosechaMutation.isPending} label="Registrar cosecha" />
          </form>
        </Modal>
      )}

      {aplicacionTarget && (
        <Modal title="Registrar aplicacion de insumo" onClose={() => setAplicacionTarget(null)}>
          <p className="text-sm text-gray-600 mb-4">
            <strong>{aplicacionTarget.tipoCultivo.nombre}</strong> - {aplicacionTarget.lote.campo.nombre} / {aplicacionTarget.lote.nombre}
          </p>
          <form onSubmit={(e) => { e.preventDefault(); aplicacionMutation.mutate({ id: aplicacionTarget.id, dto: aplicacionForm }); }} className="space-y-4">
            <Field label="Insumo *">
              <select required value={aplicacionForm.insumoId}
                onChange={(e) => {
                  const insumo = insumos?.find((i) => i.id === Number(e.target.value));
                  setAplicacionForm({ ...aplicacionForm, insumoId: Number(e.target.value), unidad: insumo?.unidad ?? '' });
                }} className="input">
                <option value={0} disabled>Selecciona un insumo</option>
                {insumos?.map((i) => <option key={i.id} value={i.id}>{i.nombre} ({i.tipo})</option>)}
              </select>
            </Field>
            <Field label="Fecha *">
              <input required type="date" value={aplicacionForm.fecha} onChange={(e) => setAplicacionForm({ ...aplicacionForm, fecha: e.target.value })} className="input" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Cantidad *">
                <input required type="number" min={0} step={0.01} value={aplicacionForm.cantidad || ''}
                  onChange={(e) => setAplicacionForm({ ...aplicacionForm, cantidad: parseFloat(e.target.value) })} className="input" placeholder="Ej: 5" />
              </Field>
              <Field label="Unidad *">
                <input required value={aplicacionForm.unidad} onChange={(e) => setAplicacionForm({ ...aplicacionForm, unidad: e.target.value })} className="input" placeholder="Ej: l/ha" />
              </Field>
            </div>
            <Field label="Observaciones">
              <textarea rows={2} value={aplicacionForm.observaciones} onChange={(e) => setAplicacionForm({ ...aplicacionForm, observaciones: e.target.value })} className="input resize-none" placeholder="Opcional" />
            </Field>
            <ModalActions onCancel={() => setAplicacionTarget(null)} loading={aplicacionMutation.isPending} label="Registrar aplicacion" />
          </form>
        </Modal>
      )}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-emerald-50 p-5 rounded-2xl mb-4"><Sprout size={40} className="text-emerald-600" /></div>
      <h2 className="text-lg font-semibold text-gray-900">No hay siembras registradas</h2>
      <p className="text-gray-500 text-sm mt-1 mb-5">Registra tu primera siembra para hacer el seguimiento de cultivos</p>
      <button onClick={onAdd} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
        <Plus size={16} />Nueva siembra
      </button>
    </div>
  );
}

function today() { return new Date().toISOString().split('T')[0]; }
function formatDate(iso: string) { return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }); }

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
