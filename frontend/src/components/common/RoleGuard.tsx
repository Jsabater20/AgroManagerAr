import React from 'react';

type RolType = 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR';

interface RoleGuardProps {
  rol?: RolType;
  required: RolType | RolType[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ rol, required, children, fallback = null }: RoleGuardProps) {
  const rolesPermitidos = Array.isArray(required) ? required : [required];
  
  if (!rol || !rolesPermitidos.includes(rol)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
