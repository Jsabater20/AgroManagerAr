import React from 'react';
import { useAuthStore } from '../../store/auth.store';
import { useRolePermissions } from '../../hooks/useRolePermissions';

type RolType = 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR';
type PermisoKey = keyof ReturnType<typeof useRolePermissions>;

interface PermissionGuardProps {
  /** Rol(es) requerido(s) */
  requiredRoles?: RolType | RolType[];
  /** Permiso específico requerido (usa el hook) */
  permission?: PermisoKey;
  /** Contenido a mostrar si tiene permisos */
  children: React.ReactNode;
  /** Fallback si NO tiene permisos (default: null) */
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  requiredRoles,
  permission,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { usuario } = useAuthStore();
  const permisos = useRolePermissions(usuario?.rol as RolType);
  const userRole = usuario?.rol as RolType;

  // Si pide permiso específico, validar con el hook
  if (permission) {
    if (!permisos[permission]) {
      return <>{fallback}</>;
    }
    return <>{children}</>;
  }

  // Si pide rol específico
  if (requiredRoles) {
    const rolesPermitidos = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    if (!userRole || !rolesPermitidos.includes(userRole)) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}
