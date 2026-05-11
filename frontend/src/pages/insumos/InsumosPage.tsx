import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FlaskConical, Plus, Loader2, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';

const PAGE_SIZE = 10;
import toast from 'react-hot-toast';
import { insumosApi } from '../../api/insumos.api';
import type { CreateInsumoDto, TipoInsumo } from '../../api/types';

const emptyForm: CreateInsumoDto = { nombre: '', tipo: 'FERTILIZANTE', unidad: '', descripcion: '' };

const TIPOS: { value: TipoInsumo; label: string; color: string }[] = [
  { value: 'FERTILIZANTE', label: 'Fertilizante', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'HERBICIDA',    label: 'Herbicida',    color: 'bg-orange-100 text-orange-700' },
  { value: 'FUNGICIDA',    label: 'Fungicida',    color: 'bg-purple-100 text-purple-700' },
  { value: 'INSECTICIDA',  label: 'Insecticida',  color: 'bg-red-100 text-red-700' },
  { value: 'SEMILLA',      label: 'Semilla',      color: 'bg-green-100 text-green-700' },
  { value: 'OTRO',         label: 'Otro',         color: 'bg-gray-100 text-gray-600' },
];

function tipoLabel(tipo: TipoInsumo) {
  return TIPOS.find((t) => t.value === tipo);
}

export default function InsumosPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<CreateInsumoDto>(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filterTipo, setFilterTipo] = useState<TipoInsumo | ''>('');
  const [page, setPage] = useState(1);

  const { data: insumos, isLoading } = useQuery({
    queryKey: ['insumos'],
    queryFn: insumosApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: insumosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insumos'] });
      toast.success('Insumo creado');
      setShowModal(false);
      setForm(emptyForm);
    },
    onError: () => toast.error('Error al crear el insumo'),
  });

  const deleteMutation = useMutation({
    mutationFn: insumosApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insumos'] });
      toast.success('Insumo eliminado');
      setDeleteId(null);
    },
    onError: () => toast.error('Error al eliminar el insumo'),
  });

  const filtered = (insumos ?? []).filter((i) => !filterTipo || i.tipo === filterTipo);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insumos</h1>
          <p className="text-gray-500 mt-1 text-sm">Semillas, agroquímicos y fertilizantes</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nuevo insumo
        </button>
      </div>

      {/* Filtro */}
      {!isLoading && (insumos?.length ?? 0) > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-5 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <select value={filterTipo} onChange={(e) => { setFilterTipo(e.target.value as TipoInsumo | ''); setPage(1); }} className="input w-auto! text-sm">
            <option value="">Todos los tipos</option>
            {TIPOS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          {filterTipo && (
            <button onClick={() => { setFilterTipo(''); setPage(1); }} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={14} />Limpiar
            </button>
          )}
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} {filtered.length === 1 ? 'insumo' : 'insumos'}</span>
        </div>
      )}

      {/* Lista */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-green-600" />
        </div>
      ) : insumos?.length === 0 ? (
        <EmptyState onAdd={() => setShowModal(true)} />
      ) : (
        <>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <th className="text-left px-5 py-3">Nombre</th>
                <th className="text-left px-5 py-3">Tipo</th>
                <th className="text-left px-5 py-3">Unidad</th>
                <th className="text-left px-5 py-3">Descripción</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paged.map((insumo) => {
                const cfg = tipoLabel(insumo.tipo);
                return (
                  <tr key={insumo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900">{insumo.nombre}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${cfg?.color}`}>
                        {cfg?.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{insumo.unidad}</td>
                    <td className="px-5 py-3.5 text-gray-500">{insumo.descripcion || '—'}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setDeleteId(insumo.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                      >
                        <Trash2 size={15} />
                      </button>
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

      {/* Modal crear */}
      {showModal && (
        <Modal title="Nuevo insumo" onClose={() => setShowModal(false)}>
          <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
            <Field label="Nombre *">
              <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="input" placeholder="Ej: Glifosato 48%" />
            </Field>
            <Field label="Tipo *">
              <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoInsumo })} className="input">
                {TIPOS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Unidad *">
              <input required value={form.unidad} onChange={(e) => setForm({ ...form, unidad: e.target.value })} className="input" placeholder="Ej: litros, kg, unidades" />
            </Field>
            <Field label="Descripción">
              <input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="input" placeholder="Opcional" />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancelar</button>
              <button type="submit" disabled={createMutation.isPending} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                {createMutation.isPending && <Loader2 size={14} className="animate-spin" />}
                Crear
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Confirmar eliminación */}
      {deleteId !== null && (
        <Modal title="Eliminar insumo" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-gray-700 mb-5">¿Eliminás este insumo? No se puede deshacer.</p>
          <div className="flex justify-end gap-3">
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancelar</button>
            <button onClick={() => deleteMutation.mutate(deleteId!)} disabled={deleteMutation.isPending} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              {deleteMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Eliminar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-emerald-50 p-5 rounded-2xl mb-4">
        <FlaskConical size={40} className="text-emerald-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">No hay insumos registrados</h2>
      <p className="text-gray-500 text-sm mt-1 mb-5">Cargá semillas, agroquímicos o fertilizantes para usarlos en las siembras</p>
      <button onClick={onAdd} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
        <Plus size={16} />
        Nuevo insumo
      </button>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
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
