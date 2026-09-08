import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  EstadoCultivoFrutihorticola,
  SistemaFrutihorticola,
} from '@prisma/client';

export class CreateCultivoFrutihorticolaDto {
  @IsInt()
  @Type(() => Number)
  campoId!: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  loteId?: number;

  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @IsString()
  especie!: string;

  @IsOptional()
  @IsString()
  variedad?: string;

  @IsEnum(SistemaFrutihorticola)
  sistema!: SistemaFrutihorticola;

  @IsDateString()
  fechaInicio!: string;

  @IsOptional()
  @IsDateString()
  fechaEstimadaCosecha?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  superficieM2?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  cantidadPlantas?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateCultivoFrutihorticolaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  especie?: string;

  @IsOptional()
  @IsString()
  variedad?: string;

  @IsOptional()
  @IsEnum(SistemaFrutihorticola)
  sistema?: SistemaFrutihorticola;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaEstimadaCosecha?: string;

  @IsOptional()
  @IsEnum(EstadoCultivoFrutihorticola)
  estado?: EstadoCultivoFrutihorticola;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  superficieM2?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  cantidadPlantas?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateCosechaFrutihorticolaDto {
  @IsDateString()
  fechaCosecha!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  kgPrimera?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  kgSegunda?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  kgDescarte?: number;

  @IsOptional()
  @IsString()
  destino?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
