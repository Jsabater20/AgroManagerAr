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

  const currentOrg =
    usuario.organizaciones?.find(
      (org) => org.id === Number(usuario.usuarioOrganizacionId ?? 0),
    ) ?? usuario.organizaciones?.[0];

  const organizacionId = Number(currentOrg?.id ?? usuario.usuarioOrganizacionId ?? 0);

  const isSuperAdmin = usuario.rolGlobal === 'SUPERADMIN';

  const isOwner =
    Boolean(currentOrg) &&
    currentOrg!.propietarioId === usuario.id;

  const hasMembershipInCurrentOrg =
    Boolean(
      usuario.organizaciones?.some(
        (org) => org.id === organizacionId,
      ),
    );

  const isMember =
    !isOwner &&
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