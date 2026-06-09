import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Map, Plus, Loader2, ChevronRight, Tractor } from 'lucide-react';
import { camposApi } from '../../api/campos.api';
import NuevoCampoWizard from './NuevoCampoWizard';

export default function CamposPage() {
  const [showWizard, setShowWizard] = useState(false);

  const { data: campos, isLoading } = useQuery({
    queryKey: ['campos'],
    queryFn: camposApi.getAll,
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campos</h1>
          <p className="text-gray-500 mt-1 text-sm">Administrá tus establecimientos y lotes</p>
        </div>
        <button
          onClick={() => setShowWizard(true)}
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
        <EmptyState onAdd={() => setShowWizard(true)} />
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

      {showWizard && <NuevoCampoWizard onClose={() => setShowWizard(false)} />}
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
