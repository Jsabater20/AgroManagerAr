import { IsEnum, IsNotEmpty } from 'class-validator';

enum RolOrganizacion {
  OWNER = 'OWNER',
  ADMINISTRADOR = 'ADMINISTRADOR',
  OPERARIO = 'OPERARIO',
  CONTADOR = 'CONTADOR',
  MECANICO = 'MECANICO',
  MIEMBRO = 'MIEMBRO',
}

export class CambiarRolOwnerDto {
  @IsNotEmpty()
  @IsEnum(RolOrganizacion)
  nuevoRol: RolOrganizacion;
}
