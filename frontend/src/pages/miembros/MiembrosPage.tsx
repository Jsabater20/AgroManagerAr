// src/pages/miembros/MiembrosPage.tsx (CORREGIDO)

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/auth.store';
import { usePermissions } from '../../hooks/usePermissions';
import { ownerAdminApi } from '../../api/owner-admin.api';
import { OwnerPanelPage } from '../organizaciones/OwnerPanelPage';
import { Loader2, Users, Shield, Briefcase, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function MiembrosPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const { usuario, isLoading: authLoading } = useAuthStore();
  const { isOwner, isMember, isLoading: permissionsLoading } = usePermissions();
  
  const orgIdNum = orgId ? parseInt(orgId) : 0;

  // Datos de miembros (para ambos roles)
  const { data: miembros, isLoading: miembrosLoading } = useQuery({
    queryKey: ['miembros-panel', orgIdNum],
    queryFn: () => ownerAdminApi.obtenerMiembrosPanel(orgIdNum),
    enabled: orgIdNum > 0 && !authLoading && !permissionsLoading,
  });

  const isLoading = authLoading || permissionsLoading || miembrosLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 size={32} className="animate-spin text-green-600" />
      </div>
    );
  }

  // OWNER o SUPERADMIN+OWNER: mostrar panel completo de administración
  if (isOwner) {
    return <OwnerPanelPage />;
  }

  // MIEMBRO: mostrar solo su información
  if (isMember && usuario) {
    const miembro = miembros?.find((m: any) => m.id === usuario.usuarioOrganizacionId);

    if (!miembro) {
      return (
        <div className="text-center py-12 text-gray-500">
          No tienes asignaciones en esta organización.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil Organizacional</h1>
          <p className="text-gray-500 mt-1">Tu información dentro de la organización</p>
        </div>

        {/* Información personal en la organización */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {miembro.nombre} {miembro.apellido}
              </h2>
              <p className="text-gray-500">{miembro.email}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Rol */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-lg">
                    <Shield size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Rol</p>
                    <p className="text-sm font-semibold text-gray-900">{miembro.rol}</p>
                  </div>
                </div>

                {/* Fecha de incorporación */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-green-50 rounded-lg">
                    <Users size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Incorporado</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(miembro.fechaIncorporacion).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${miembro.activo ? 'bg-green-50' : 'bg-red-50'}`}>
                    {miembro.activo ? (
                      <CheckCircle2 size={20} className="text-green-600" />
                    ) : (
                      <AlertCircle size={20} className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Estado</p>
                    <p className={`text-sm font-semibold ${miembro.activo ? 'text-green-600' : 'text-red-600'}`}>
                      {miembro.activo ? 'Activo' : 'Suspendido'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recursos asignados */}
        {miembro.recursosCampos.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-emerald-600" />
              Campos Asignados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {miembro.recursosCampos.map((campo: string) => (
                <div key={campo} className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="text-sm font-medium text-emerald-900">{campo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resumen de actividades */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Estado de Actividades</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <Clock size={24} className="text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{miembro.actividades.pendientes}</p>
              <p className="text-xs text-gray-600 mt-1">Pendientes</p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <Briefcase size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{miembro.actividades.enProgreso}</p>
              <p className="text-xs text-gray-600 mt-1">En Progreso</p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle2 size={24} className="text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{miembro.actividades.completadas}</p>
              <p className="text-xs text-gray-600 mt-1">Completadas</p>
            </div>
          </div>
        </div>

        {/* Accesos y permisos */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-blue-600" />
            Accesos y Permisos
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>✓ Acceso a tus actividades asignadas</p>
            <p>✓ Visualización de tus recursos</p>
            <p>✓ Consulta de observaciones en actividades</p>
            <p>✓ Registro de progreso en tareas</p>
          </div>
        </div>
      </div>
    );
  }

  // Sin permisos (ni owner ni member)
  return (
    <div className="text-center py-12 text-gray-500">
      No tienes acceso a esta sección.
    </div>
  );
}