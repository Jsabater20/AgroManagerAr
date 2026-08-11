import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { usePermissions } from '../../hooks/usePermissions';
import { OwnerPanelPage } from '../organizaciones/OwnerPanelPage';

export default function MiembrosPage() {
  const usuario = useAuthStore((s) => s.usuario);
  const currentOrg = useAuthStore((s) => s.currentOrg());
  const { isOwner, isMember, isSuperAdmin, isLoading } = usePermissions();

  if (isLoading || !usuario) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  const orgPlan = currentOrg?.plan ?? 'FREE';

  if (isSuperAdmin || isOwner) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Miembros</h1>
        <p className="text-sm text-gray-500 mb-4">
          Organización: {currentOrg?.nombre ?? 'Sin organización'} · Plan: {orgPlan}
        </p>

        <OwnerPanelPage />
      </div>
    );
  }

  if (isMember) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Miembros</h1>
        <p className="text-sm text-gray-500 mb-4">
          Vista limitada para miembro · Organización: {currentOrg?.nombre ?? 'Sin organización'}
        </p>

        <div className="bg-white rounded-xl border p-4">
          <p>Vista limitada de recursos y actividades del miembro.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
      No tienes acceso a esta sección.
    </div>
  );
}