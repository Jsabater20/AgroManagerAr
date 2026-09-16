import { IsEmail, IsString, IsEnum, IsOptional, IsInt, MaxLength, Min } from 'class-validator';
import { CargoEquipo } from '@prisma/client';

export class InvitarMiembroDto {
  @IsEmail()
  email!: string;

  @IsEnum(['OWNER', 'ADMIN', 'OPERARIO', 'CONTADOR', 'MECANICO', 'ASESOR'])
  @IsOptional()
  rol?: string;

  @IsString()
  @IsOptional()
  mensaje?: string;

  @IsEnum(CargoEquipo)
  @IsOptional()
  cargo?: CargoEquipo;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  cargoPersonalizado?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  responsableId?: number;
}
