import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateOrganizacionDto {
  @IsString()
  nombre!: string;

  @IsEmail()
  email!: string;
}

export class UpdateOrganizacionDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class InvitarMiembroDto {
  @IsEmail()
  email!: string;

  @IsEnum(['OWNER', 'ADMIN', 'OPERARIO', 'CONTADOR', 'ASESOR', 'CONTRATISTA'], {
    message: 'El rol debe ser uno de: OWNER, ADMIN, OPERARIO, CONTADOR, ASESOR, CONTRATISTA',
  })
  @IsOptional()
  rol?: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'CONTADOR' | 'ASESOR' | 'CONTRATISTA';
}
