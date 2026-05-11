import {
  IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber,
  IsOptional, IsString, Min,
} from 'class-validator';
import { Type } from 'class-transformer';

enum EstadoSiembra {
  EN_CURSO = 'EN_CURSO',
  COSECHADA = 'COSECHADA',
  PERDIDA = 'PERDIDA',
}

export class CreateSiembraDto {
  @IsInt()
  @Type(() => Number)
  loteId!: number;

  @IsInt()
  @Type(() => Number)
  tipoCultivoId!: number;

  @IsDateString()
  fechaSiembra!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  densidad?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateSiembraDto {
  @IsOptional()
  @IsDateString()
  fechaSiembra?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  densidad?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsEnum(EstadoSiembra)
  estado?: EstadoSiembra;
}

export class CreateCosechaDto {
  @IsDateString()
  fechaCosecha!: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  rendimientoKgHa!: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalKg!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  humedad?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateAplicacionDto {
  @IsInt()
  @Type(() => Number)
  insumoId!: number;

  @IsDateString()
  fecha!: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  cantidad!: number;

  @IsNotEmpty()
  unidad!: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
