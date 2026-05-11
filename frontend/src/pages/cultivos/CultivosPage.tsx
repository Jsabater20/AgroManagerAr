import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Leaf, Plus, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { cultivosApi } from '../../api/cultivos.api';

export default function CultivosPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: cultivos, isLoading } = useQuery({
    queryKey: ['cultivos'],
    queryFn: cultivosApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: cultivosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cultivos'] });
      toast.success('Cultivo creado');
      setShowModal(false);
      setForm({ nombre: '', descripcion: '' });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      const msg = err?.response?.data?.message;
      toast.error(msg || 'Error al crear el cultivo');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: cultivosApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cultivos'] });
      toast.success('Cultivo eliminado');
      setDeleteId(null);
    },
    onError: () => toast.error('No se puede eliminar: tiene siembras asociadas'),
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tipos de cultivo</h1>
          <p className="text-gray-500 mt-1 text-sm">Maíz, soja, trigo y más</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nuevo cultivo
        </button>
      </div>

      {/* Lista */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-green-600" />
        </div>
      ) : cultivos?.length === 0 ? (
        <EmptyState onAdd={() => setShowModal(true)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {cultivos?.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="bg-emerald-50 p-2 rounded-xl mt-0.5">
                  <Leaf size={16} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{c.nombre}</p>
                  {c.descripcion && (
                    <p className="text-xs text-gray-400 mt-0.5">{c.descripcion}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setDeleteId(c.id)}
                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal crear */}
      {showModal && (
        <Modal title="Nuevo tipo de cultivo" onClose={() => setShowModal(false)}>
          <form
            onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }}
            className="space-y-4"
          >
            <Field label="Nombre *">
              <input
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="input"
                placeholder="Ej: Soja, Maíz, Trigo"
              />
            </Field>
            <Field label="Descripción">
              <input
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                className="input"
                placeholder="Opcional"
              />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {createMutation.isPending && <Loader2 size={14} className="animate-spin" />}
                Crear
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Confirmar eliminación */}
      {deleteId !== null && (
        <Modal title="Eliminar cultivo" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-gray-700 mb-5">
            ¿Eliminás este tipo de cultivo? Solo es posible si no tiene siembras asociadas.
          </p>
          <div className="flex justify-end gap-3">
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              Cancelar
            </button>
            <button
              onClick={() => deleteMutation.mutate(deleteId!)}
              disabled={deleteMutation.isPending}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
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
        <Leaf size={40} className="text-emerald-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">No hay cultivos cargados</h2>
      <p className="text-gray-500 text-sm mt-1 mb-5">Cargá los tipos de cultivo que manejás en tus campos</p>
      <button onClick={onAdd} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
        <Plus size={16} />
        Nuevo cultivo
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
