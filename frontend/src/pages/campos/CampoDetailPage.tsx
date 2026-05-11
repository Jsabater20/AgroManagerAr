import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, Map, Plus, Loader2, Layers, Trash2, AlertTriangle, Pencil, ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { camposApi } from '../../api/campos.api';
import type { CreateLoteDto, CreateCampoDto } from '../../api/types';

const emptyLote: CreateLoteDto = { nombre: '', hectareas: 0 };

export default function CampoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const campoId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showLoteModal, setShowLoteModal] = useState(false);
  const [loteForm, setLoteForm] = useState<CreateLoteDto>(emptyLote);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<CreateCampoDto>({ nombre: '', hectareas: 0, ubicacion: '', propietario: '' });

  const { data: campo, isLoading } = useQuery({
    queryKey: ['campos', campoId],
    queryFn: () => camposApi.getOne(campoId),
    enabled: !!campoId,
  });

  const addLoteMutation = useMutation({
    mutationFn: (dto: CreateLoteDto) => camposApi.addLote(campoId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campos', campoId] });
      queryClient.invalidateQueries({ queryKey: ['campos'] });
      toast.success('Lote agregado');
      setShowLoteModal(false);
      setLoteForm(emptyLote);
    },
    onError: () => toast.error('Error al agregar el lote'),
  });

  const editCampoMutation = useMutation({
    mutationFn: (dto: CreateCampoDto) => camposApi.update(campoId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campos', campoId] });
      queryClient.invalidateQueries({ queryKey: ['campos'] });
      toast.success('Campo actualizado');
      setShowEditModal(false);
    },
    onError: () => toast.error('Error al actualizar el campo'),
  });

  const deleteCampoMutation = useMutation({
    mutationFn: () => camposApi.remove(campoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campos'] });
      toast.success('Campo eliminado');
      navigate('/campos');
    },
    onError: () => toast.error('No se pudo eliminar el campo'),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 size={32} className="animate-spin text-green-600" />
      </div>
    );
  }

  if (!campo) {
    return (
      <div className="text-center py-24 text-gray-500">
        Campo no encontrado.{' '}
        <Link to="/campos" className="text-green-700 underline">Volver</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb / header */}
      <div className="mb-8">
        <Link to="/campos" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 mb-3 w-fit">
          <ArrowLeft size={15} />
          Campos
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 p-2.5 rounded-xl">
              <Map size={22} className="text-emerald-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{campo.nombre}</h1>
              {campo.ubicacion && (
                <p className="text-gray-500 text-sm">{campo.ubicacion}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setEditForm({ nombre: campo.nombre, hectareas: campo.hectareas, ubicacion: campo.ubicacion ?? '', propietario: campo.propietario ?? '' }); setShowEditModal(true); }}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Pencil size={15} />
              Editar
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 size={15} />
              Eliminar campo
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Hectáreas totales" value={`${campo.hectareas} ha`} />
        <StatCard label="Lotes" value={String(campo.lotes.length)} />
        {campo.propietario && <StatCard label="Propietario" value={campo.propietario} />}
      </div>

      {/* Lotes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Layers size={18} className="text-emerald-600" />
            Lotes
          </h2>
          <button
            onClick={() => setShowLoteModal(true)}
            className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={15} />
            Agregar lote
          </button>
        </div>

        {campo.lotes.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Layers size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">Este campo no tiene lotes todavía</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {campo.lotes.map((lote) => (
              <Link
                key={lote.id}
                to={`/campos/${campo.id}/lotes/${lote.id}`}
                className="flex items-center justify-between py-3 hover:bg-gray-50 -mx-1 px-1 rounded-lg transition-colors group"
              >
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">{lote.nombre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Ver trazabilidad →</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {lote.hectareas} ha
                  </span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-green-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Modal: agregar lote */}
      {showLoteModal && (
        <Modal title="Agregar lote" onClose={() => setShowLoteModal(false)}>
          <form onSubmit={(e) => { e.preventDefault(); addLoteMutation.mutate(loteForm); }} className="space-y-4">
            <Field label="Nombre del lote *">
              <input
                required
                value={loteForm.nombre}
                onChange={(e) => setLoteForm({ ...loteForm, nombre: e.target.value })}
                className="input"
                placeholder="Ej: Lote 1 Norte"
              />
            </Field>
            <Field label="Hectáreas *">
              <input
                required
                type="number"
                min={0.1}
                step={0.1}
                value={loteForm.hectareas || ''}
                onChange={(e) => setLoteForm({ ...loteForm, hectareas: parseFloat(e.target.value) })}
                className="input"
                placeholder="Ej: 50"
              />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowLoteModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                Cancelar
              </button>
              <button type="submit" disabled={addLoteMutation.isPending} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                {addLoteMutation.isPending && <Loader2 size={14} className="animate-spin" />}
                Agregar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: editar campo */}
      {showEditModal && (
        <Modal title="Editar campo" onClose={() => setShowEditModal(false)}>
          <form onSubmit={(e) => { e.preventDefault(); editCampoMutation.mutate(editForm); }} className="space-y-4">
            <Field label="Nombre *">
              <input required value={editForm.nombre} onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })} className="input" placeholder="Ej: La Pampa" />
            </Field>
            <Field label="Hectáreas *">
              <input required type="number" min={0.1} step={0.1} value={editForm.hectareas || ''} onChange={(e) => setEditForm({ ...editForm, hectareas: parseFloat(e.target.value) })} className="input" />
            </Field>
            <Field label="Ubicación">
              <input value={editForm.ubicacion ?? ''} onChange={(e) => setEditForm({ ...editForm, ubicacion: e.target.value })} className="input" placeholder="Ej: Córdoba, Argentina" />
            </Field>
            <Field label="Propietario">
              <input value={editForm.propietario ?? ''} onChange={(e) => setEditForm({ ...editForm, propietario: e.target.value })} className="input" placeholder="Opcional" />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancelar</button>
              <button type="submit" disabled={editCampoMutation.isPending} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                {editCampoMutation.isPending && <Loader2 size={14} className="animate-spin" />}
                Guardar cambios
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Confirmar eliminación */}
      {showDeleteConfirm && (
        <Modal title="Eliminar campo" onClose={() => setShowDeleteConfirm(false)}>
          <div className="flex items-start gap-3 mb-5">
            <AlertTriangle size={20} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700">
              ¿Estás seguro que querés eliminar <strong>{campo.nombre}</strong>? Se eliminarán también todos sus lotes. Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
              Cancelar
            </button>
            <button
              onClick={() => deleteCampoMutation.mutate()}
              disabled={deleteCampoMutation.isPending}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {deleteCampoMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Sí, eliminar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
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
