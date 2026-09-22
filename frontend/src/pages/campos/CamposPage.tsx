import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Map, Plus, Loader2, ChevronRight, Tractor } from 'lucide-react';
import { camposApi } from '../../api/campos.api';
import { listarEvidencias } from '../../api/evidencias.api';
import NuevoCampoWizard from './NuevoCampoWizard';
import EmptyState from '../../components/EmptyState';
import { ResponsablesRecurso } from '../../components/equipo/ResponsablesEquipo';

interface Campo {
  id: number;
  nombre: string;
  ubicacion?: string;
  hectareas: number;
  lotes: any[];
  usuarioId?: number;
}

export default function CamposPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const [showWizard, setShowWizard] = useState(false);

  const { data: campos, isLoading } = useQuery({
    queryKey: ['campos', orgId],
    queryFn: () => camposApi.getAll(),
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
        <EmptyState
          title="No tenés campos registrados"
          description="Creá tu primer campo para empezar a gestionar tus lotes"
          icon={Tractor}
          actionLabel="Crear primer campo"
          onAction={() => setShowWizard(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {campos?.map((campo: Campo) => <CampoCard key={campo.id} campo={campo} organizacionId={Number(orgId)} />)}
        </div>
      )}

      {showWizard && <NuevoCampoWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}

function CampoCard({ campo, organizacionId }: { campo: Campo; organizacionId: number }) {
  const evidenciaQuery = useQuery({
    queryKey: ['evidencias', 'portada-campo', organizacionId, campo.id],
    queryFn: () => listarEvidencias(organizacionId, 'CAMPO', campo.id),
    select: (evidencias) => evidencias.find((evidencia) => evidencia.archivos.length)?.archivos[0] ?? null,
    enabled: Boolean(organizacionId),
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
  const portada = evidenciaQuery.data;

  return (
    <Link
      to={`/org/${organizacionId}/campos/${campo.id}`}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      {portada ? (
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img
            src={portada.url}
            alt={`Evidencia de ${campo.nombre}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-5 pb-4 pt-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
              <Map size={14} /> Imagen reciente del campo
            </span>
          </div>
          <ChevronRight size={18} className="absolute right-4 top-4 text-white drop-shadow group-hover:text-emerald-200" />
        </div>
      ) : (
        <div className="flex items-start justify-between px-6 pt-6">
          <div className="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-500/15">
            <Map size={20} className="text-emerald-700 dark:text-emerald-300" />
          </div>
          <ChevronRight size={18} className="text-gray-300 transition-colors group-hover:text-green-600 dark:text-gray-500 dark:group-hover:text-emerald-300" />
        </div>
      )}

      <div className="p-6" style={portada ? { paddingTop: '1.25rem' } : undefined}>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">{campo.nombre}</h2>

        {campo.ubicacion && (
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{campo.ubicacion}</p>
        )}

        <ResponsablesRecurso
          organizacionId={organizacionId}
          modulo="Campos"
          recursoTipo="CAMPO"
          recursoId={campo.id}
          campoId={campo.id}
        />

        <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-white">{campo.hectareas}</span> ha
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-white">{campo.lotes.length}</span> lote{campo.lotes.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}
