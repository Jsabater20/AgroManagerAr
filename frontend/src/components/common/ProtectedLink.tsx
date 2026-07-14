import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { RoleGuard } from './RoleGuard';

type RolType = 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR';
type PermisoKey = 'verFinanzas' | 'crearCampo' | 'editarTarea' | 'verReportes' | 'cargarRecomendaciones' | 'verTareasAsignadas' | 'registrarGastos' | 'administrarUsuarios' | 'auditoria';

interface ProtectedLinkProps {
  to: string;
  children: ReactNode;
  requiredRoles?: RolType | RolType[];
  permission?: PermisoKey;
  className?: string;
  icon?: ReactNode;
}

export function ProtectedLink({
  to,
  children,
  requiredRoles,
  permission,
  className = '',
  icon,
}: ProtectedLinkProps) {
  return (
    <RoleGuard requiredRoles={requiredRoles} permission={permission}>
      <Link to={to} className={className}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    </RoleGuard>
  );
}
