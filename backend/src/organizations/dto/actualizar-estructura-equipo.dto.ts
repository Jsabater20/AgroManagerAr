import { CargoEquipo } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class ActualizarEstructuraEquipoDto {
  @IsEnum(CargoEquipo)
  cargo!: CargoEquipo;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  cargoPersonalizado?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  responsableId?: number | null;

  @IsBoolean()
  puedeGestionarEquipo!: boolean;
}
