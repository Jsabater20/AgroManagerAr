import { useAuthStore } from '../store/auth.store';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export type UserRole = 'owner' | 'member' | 'superadmin';

interface PermissionsContext {
  isOwner: boolean;
  isMember: boolean;
  isSuperAdmin: boolean;
  usuarioOrganizacionId: number | null;
  role: UserRole;
  organizacionId: number;
  isLoading: boolean;
}

export const usePermissions = (): PermissionsContext => {
  const { orgId } = useParams<{ orgId: string }>();
  const { usuario, isLoading } = useAuthStore();

  return useMemo(() => {
    const organizacionId = parseInt(orgId || '0');
    
    if (isLoading || !usuario) {
      return {
        isOwner: false,
        isMember: false,
        isSuperAdmin: false,
        usuarioOrganizacionId: null,
        role: 'member',
        organizacionId,
        isLoading: true,
      };
    }

    const isSuperAdmin = usuario.rolGlobal === 'SUPERADMIN';
    const isOwner = usuario.organizaciones?.some((o: any) => o.id === organizacionId);
    const usuarioOrganizacionId = usuario.usuarioOrganizacionId || null;
    const isMember = !isOwner && !!usuarioOrganizacionId;

    let role: UserRole = 'member';
    if (isSuperAdmin) role = 'superadmin';
    else if (isOwner) role = 'owner';

    return {
      isOwner: isOwner || false,
      isMember,
      isSuperAdmin,
      usuarioOrganizacionId,
      role,
      organizacionId,
      isLoading: false,
    };
  }, [orgId, usuario, isLoading]);
};