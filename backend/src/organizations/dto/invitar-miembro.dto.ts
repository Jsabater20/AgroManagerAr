import { IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';

export class InvitarMiembroDto {
  @IsEmail()
  email!: string;

  @IsEnum(['OWNER', 'ADMIN', 'OPERARIO', 'CONTADOR', 'MECANICO', 'ASESOR'])
  @IsOptional()
  rol?: string;

  @IsString()
  @IsOptional()
  mensaje?: string;
}
