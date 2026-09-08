import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TipoGalponAvicola } from '@prisma/client';

export class CreateGalponAvicolaDto {
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsEnum(TipoGalponAvicola)
  tipo!: TipoGalponAvicola;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  capacidad?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateRegistroAvicolaDto {
  @IsDateString()
  fecha!: string;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  avesPresentes!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  huevos?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  mortandad?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  alimentoKg?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  pesoPromedioGr?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
