import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Wheat, Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, CheckSquare, Square } from 'lucide-react';
import toast from 'react-hot-toast';
import { campaniasApi } from '../../api/campanias.api';
import { siembrasApi } from '../../api/siembras.api';
import { useAuthStore } from '../../store/auth.store';
import { PlanBanner } from '../../components/ui/PlanBanner';
import type { CreateCampaniaDto, Siembra } from '../../api/types';

const fmtDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-';

const ESTADO_COLOR: Record<string, string> = {
  EN_CURSO: 'bg-blue-100 text-blue-700', COSECHADA: 'bg-green-100 text-green-700', PERDIDA: 'bg-red-100 text-red-700',
};
const ESTADO_LABEL: Record<string, string> = {
  EN_CURSO: 'En curso', COSECHADA: 'Cosechada', PERDIDA: 'Perdida',
};

const EMPTY: CreateCampaniaDto = { nombre: '', fechaInicio: new Date().toISOString().slice(0, 10), fechaFin: '', descripcion: '' };

export function CampaniasContent() {
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [asignarModal, setAsignarModal] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<CreateCampaniaDto>(EMPTY);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

  const { data: campanias = [], isLoading } = useQuery({ queryKey: ['campanias'], queryFn: campaniasApi.getAll });
  const { data: todasSiembras = [] } = useQuery({ queryKey: ['siembras'], queryFn: siembrasApi.getAll });

  const createMut = useMutation({
    mutationFn: campaniasApi.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['campanias'] }); toast.success('Campaña creada'); closeModal(); },
    onError: () => toast.error('Error al crear campaña'),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: Partial<CreateCampaniaDto> }) => campaniasApi.update(id, dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['campanias'] }); toast.success('Campaña actualizada'); closeModal(); },
    onError: () => toast.error('Error al actualizar'),
  });
  const deleteMut = useMutation({
    mutationFn: campaniasApi.remove,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['campanias'] }); toast.success('Campaña eliminada'); },
    onError: () => toast.error('Error al eliminar'),
  });
  const asignarMut = useMutation({
    mutationFn: ({ id, siembraIds }: { id: number; siembraIds: number[] }) => campaniasApi.asignarSiembras(id, siembraIds),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['campanias'] }); qc.invalidateQueries({ queryKey: ['siembras'] }); toast.success('Siembras asignadas'); setAsignarModal(null); },
    onError: () => toast.error('Error al asignar'),
  });

  const openCreate = () => { setForm(EMPTY); setEditId(null); setModal(true); };
  const openEdit   = (c: typeof campanias[0]) => {
    setForm({ nombre: c.nombre, fechaInicio: c.fechaInicio.slice(0, 10),
      fechaFin: c.fechaFin?.slice(0, 10) ?? '', descripcion: c.descripcion ?? '' });
    setEditId(c.id); setModal(true);
  };
  const closeModal = () => { setModal(false); setEditId(null); };

  const openAsignar = (campaniaId: number) => {
    const camp = campanias.find(c => c.id === campaniaId);
    setSeleccionadas(camp?.siembras.map(s => s.id) ?? []);
    setAsignarModal(campaniaId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dto = { ...form, fechaFin: form.fechaFin || undefined };
    if (editId) updateMut.mutate({ id: editId, dto });
    else createMut.mutate(dto);
  };

  const toggleSiembra = (id: number) =>
    setSeleccionadas(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const renderStats = (siembras: Siembra[]) => {
    const totalKg   = siembras.flatMap(s => s.cosechas).reduce((a, c) => a + c.totalKg, 0);
    const cosechas  = siembras.flatMap(s => s.cosechas).length;
    const enCurso   = siembras.filter(s => s.estado === 'EN_CURSO').length;
    return { totalKg, cosechas, enCurso, total: siembras.length };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campañas agrícolas</h1>
          <p className="text-gray-500 text-sm mt-1">Agrupá siembras por campaña y comparás rendimientos</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Nueva campaña
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-gray-400">Cargando...</div>
      ) : campanias.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center text-gray-400">
          <Wheat size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No hay campañas creadas</p>
          <p className="text-sm mt-1">Creá una campaña para agrupar tus siembras</p>
        </div>
      ) : (
        <div className="space-y-3">
          {campanias.map(camp => {
            const stats = renderStats(camp.siembras);
            const isOpen = expanded === camp.id;
            return (
              <div key={camp.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header de campaña */}
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : camp.id)}
                >
                  <div className="bg-green-50 p-2.5 rounded-xl shrink-0">
                    <Wheat size={18} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{camp.nombre}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {fmtDate(camp.fechaInicio)} — {fmtDate(camp.fechaFin)}
                      {camp.descripcion && ` · ${camp.descripcion}`}
                    </p>
                  </div>

                  {/* Mini stats */}
                  <div className="hidden md:flex gap-6 text-center shrink-0">
                    <div><p className="text-lg font-bold text-gray-900">{stats.total}</p><p className="text-xs text-gray-400">siembras</p></div>
                    <div><p className="text-lg font-bold text-blue-600">{stats.enCurso}</p><p className="text-xs text-gray-400">en curso</p></div>
                    <div><p className="text-lg font-bold text-green-700">{stats.totalKg > 0 ? `${(stats.totalKg / 1000).toFixed(1)}t` : '-'}</p><p className="text-xs text-gray-400">cosechado</p></div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button onClick={e => { e.stopPropagation(); openAsignar(camp.id); }}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                      Siembras
                    </button>
                    <button onClick={e => { e.stopPropagation(); openEdit(camp); }}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); if (confirm('¿Eliminar esta campaña?')) deleteMut.mutate(camp.id); }}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                    {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </div>

                {/* Siembras de la campaña */}
                {isOpen && camp.siembras.length > 0 && (
                  <div className="border-t border-gray-100">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50/60">
                        <tr>
                          {['Cultivo', 'Campo / Lote', 'Fecha siembra', 'Estado', 'Cosechas', 'Total kg', 'kg/ha prom.'].map(h => (
                            <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-2.5">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {camp.siembras.map(s => {
                          const totalKg   = s.cosechas.reduce((a, c) => a + c.totalKg, 0);
                          const promKgHa  = s.cosechas.length
                            ? Math.round(s.cosechas.reduce((a, c) => a + c.rendimientoKgHa, 0) / s.cosechas.length) : null;
                          return (
                            <tr key={s.id} className="hover:bg-gray-50/50">
                              <td className="px-5 py-3 font-medium text-gray-900">{s.tipoCultivo.nombre}</td>
                              <td className="px-5 py-3 text-gray-500">{s.lote.campo.nombre} / {s.lote.nombre}</td>
                              <td className="px-5 py-3 text-gray-500">{fmtDate(s.fechaSiembra)}</td>
                              <td className="px-5 py-3">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${ESTADO_COLOR[s.estado]}`}>
                                  {ESTADO_LABEL[s.estado]}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-center text-gray-500">{s.cosechas.length}</td>
                              <td className="px-5 py-3 text-gray-600">{totalKg > 0 ? `${totalKg.toLocaleString('es-AR')} kg` : '-'}</td>
                              <td className="px-5 py-3 text-gray-600">{promKgHa ? `${promKgHa.toLocaleString('es-AR')} kg/ha` : '-'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      {stats.totalKg > 0 && (
                        <tfoot>
                          <tr className="border-t border-gray-200 bg-gray-50/40">
                            <td colSpan={5} className="px-5 py-2.5 text-xs font-semibold text-gray-500">TOTAL CAMPAÑA</td>
                            <td className="px-5 py-2.5 text-sm font-bold text-gray-900">
                              {stats.totalKg.toLocaleString('es-AR')} kg
                            </td>
                            <td />
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                )}
                {isOpen && camp.siembras.length === 0 && (
                  <div className="border-t border-gray-100 px-5 py-6 text-center text-sm text-gray-400">
                    Esta campaña no tiene siembras asignadas todavía.
                    <button onClick={() => openAsignar(camp.id)} className="text-green-700 font-medium ml-1 hover:underline">Asignar ahora</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal crear/editar */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{editId ? 'Editar campaña' : 'Nueva campaña'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre *</label>
                <input required value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  className="input" placeholder="Ej: Campaña 2025/2026" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Inicio *</label>
                  <input required type="date" value={form.fechaInicio}
                    onChange={e => setForm(f => ({ ...f, fechaInicio: e.target.value }))} className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fin (opcional)</label>
                  <input type="date" value={form.fechaFin ?? ''}
                    onChange={e => setForm(f => ({ ...f, fechaFin: e.target.value }))} className="input" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                <input value={form.descripcion ?? ''} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                  className="input" placeholder="Opcional" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" disabled={createMut.isPending || updateMut.isPending}
                  className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-semibold disabled:opacity-60">
                  {editId ? 'Guardar cambios' : 'Crear campaña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal asignar siembras */}
      {asignarModal !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Asignar siembras a la campaña</h2>
              <button onClick={() => setAsignarModal(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto flex-1 p-6">
              {todasSiembras.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No hay siembras disponibles</p>
              ) : (
                <div className="space-y-2">
                  {todasSiembras.map((s: Siembra) => {
                    const checked = seleccionadas.includes(s.id);
                    return (
                      <button key={s.id} type="button" onClick={() => toggleSiembra(s.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${checked ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                        {checked ? <CheckSquare size={16} className="text-green-600 shrink-0" /> : <Square size={16} className="text-gray-400 shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{s.tipoCultivo.nombre}</p>
                          <p className="text-xs text-gray-400">{s.lote.campo.nombre} / {s.lote.nombre} · {fmtDate(s.fechaSiembra)}</p>
                        </div>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${ESTADO_COLOR[s.estado]}`}>
                          {ESTADO_LABEL[s.estado]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setAsignarModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancelar
              </button>
              <button onClick={() => asignarMut.mutate({ id: asignarModal, siembraIds: seleccionadas })}
                disabled={asignarMut.isPending}
                className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-semibold disabled:opacity-60">
                Guardar ({seleccionadas.length} seleccionadas)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CampaniasPage() {
  const isPro = useAuthStore((s) => s.isPro());
  if (!isPro) return <PlanBanner feature="Campañas agrícolas" description="Gestioná campañas completas, asigná siembras y hacé seguimiento de cada ciclo productivo. Disponible en Pro." />;
  return <CampaniasContent />;
}
