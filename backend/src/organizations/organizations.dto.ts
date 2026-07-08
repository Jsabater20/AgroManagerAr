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

  @IsEnum(['OWNER', 'ADMIN', 'OPERARIO', 'CONTADOR'])
  @IsOptional()
  rol?: string;
}
