import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Map, Plus, Loader2, ChevronRight, Tractor } from 'lucide-react';
import toast from 'react-hot-toast';
import { camposApi } from '../../api/campos.api';
import type { CreateCampoDto } from '../../api/types';

const emptyForm: CreateCampoDto = { nombre: '', hectareas: 0, ubicacion: '', propietario: '' };

export default function CamposPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<CreateCampoDto>(emptyForm);

  const { data: campos, isLoading } = useQuery({
    queryKey: ['campos'],
    queryFn: camposApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: camposApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campos'] });
      toast.success('Campo creado correctamente');
      setShowModal(false);
      setForm(emptyForm);
    },
    onError: () => toast.error('Error al crear el campo'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campos</h1>
          <p className="text-gray-500 mt-1 text-sm">Administrá tus establecimientos y lotes</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nuevo campo
        </button>
      </div>

      {/* Lista */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-green-600" />
        </div>
      ) : campos?.length === 0 ? (
        <EmptyState onAdd={() => setShowModal(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {campos?.map((campo) => (
            <Link
              key={campo.id}
              to={`/campos/${campo.id}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <Map size={20} className="text-emerald-700" />
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-green-600 transition-colors" />
              </div>

              <h2 className="text-base font-semibold text-gray-900 mt-4">{campo.nombre}</h2>

              {campo.ubicacion && (
                <p className="text-sm text-gray-500 mt-0.5">{campo.ubicacion}</p>
              )}

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{campo.hectareas}</span> ha
                </span>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{campo.lotes.length}</span> lote{campo.lotes.length !== 1 ? 's' : ''}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Modal crear campo */}
      {showModal && (
        <Modal title="Nuevo campo" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nombre del campo *">
              <input
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="input"
                placeholder="Ej: La Argentina"
              />
            </Field>
            <Field label="Hectáreas *">
              <input
                required
                type="number"
                min={0.1}
                step={0.1}
                value={form.hectareas || ''}
                onChange={(e) => setForm({ ...form, hectareas: parseFloat(e.target.value) })}
                className="input"
                placeholder="Ej: 250"
              />
            </Field>
            <Field label="Ubicación">
              <input
                value={form.ubicacion}
                onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
                className="input"
                placeholder="Ej: Córdoba, Argentina"
              />
            </Field>
            <Field label="Propietario">
              <input
                value={form.propietario}
                onChange={(e) => setForm({ ...form, propietario: e.target.value })}
                className="input"
                placeholder="Ej: Juan Pérez"
              />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {createMutation.isPending && <Loader2 size={14} className="animate-spin" />}
                Crear campo
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-emerald-50 p-5 rounded-2xl mb-4">
        <Tractor size={40} className="text-emerald-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">No tenés campos registrados</h2>
      <p className="text-gray-500 text-sm mt-1 mb-5">Creá tu primer campo para empezar a gestionar tus lotes</p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus size={16} />
        Crear primer campo
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
