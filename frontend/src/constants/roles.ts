export type RolOrganizacion = 'ADMIN' | 'OPERARIO' | 'CONTADOR' | 'ASESOR' | 'CONTRATISTA';

export const ROLES_DISPONIBLES: { value: RolOrganizacion; label: string }[] = [
  { value: 'OPERARIO', label: 'Operario' },
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'CONTADOR', label: 'Contador' },
  { value: 'ASESOR', label: 'Asesor' },
  { value: 'CONTRATISTA', label: 'Contratista' },
];

export const ROLES_TRADUCIDOS: Record<string, string> = {
  OWNER: 'Propietario',
  ADMIN: 'Administrador',
  OPERARIO: 'Operario',
  ASESOR: 'Asesor',
  CONTADOR: 'Contador',
  CONTRATISTA: 'Contratista',
};

export function getRolTraducido(rol: string): string {
  return ROLES_TRADUCIDOS[rol] || rol;
}
