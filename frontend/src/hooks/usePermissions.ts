import { useAuthStore } from '../store/auth.store';

export const usePermissions = () => {
  const usuario = useAuthStore((s) => s.usuario);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return {
      isOwner: false,
      isMember: false,
      isSuperAdmin: false,
      usuarioOrganizacionId: null,
      organizacionId: null,
      role: 'loading',
      isLoading: true,
    };
  }

  if (!usuario) {
    return {
      isOwner: false,
      isMember: false,
      isSuperAdmin: false,
      usuarioOrganizacionId: null,
      organizacionId: null,
      role: 'guest',
      isLoading: false,
    };
  }

  const organizaciones = usuario.organizaciones ?? [];
  const currentOrg =
    organizaciones.find(
      (org) => org.id === Number(usuario.usuarioOrganizacionId ?? 0),
    ) ??
    (organizaciones.length === 1 ? organizaciones[0] : undefined);

  const organizacionId = currentOrg ? Number(currentOrg.id) : null;
  const isSuperAdmin = usuario.rolGlobal === 'SUPERADMIN';

  const isOwner =
    Boolean(currentOrg) &&
    currentOrg!.propietarioId === usuario.id;

  const hasMembershipInCurrentOrg =
    Boolean(currentOrg) &&
    organizaciones.some((org) => org.id === organizacionId);

  const isMember =
    !isSuperAdmin &&
    !isOwner &&
    Boolean(currentOrg) &&
    hasMembershipInCurrentOrg;

  return {
    isOwner,
    isMember,
    isSuperAdmin,
    usuarioOrganizacionId: usuario.usuarioOrganizacionId ?? null,
    organizacionId,
    role: isSuperAdmin
      ? 'superadmin'
      : isOwner
        ? 'owner'
        : isMember
          ? 'member'
          : 'guest',
    isLoading: false,
  };
};