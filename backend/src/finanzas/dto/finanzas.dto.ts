import {
  IsEnum,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export enum TipoMovimiento {
  INGRESO = 'INGRESO',
  EGRESO = 'EGRESO',
}

export enum CategoriaMovimiento {
  COSECHA = 'COSECHA',
  VENTA_ANIMAL = 'VENTA_ANIMAL',
  INSUMO = 'INSUMO',
  SERVICIO = 'SERVICIO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  VETERINARIA = 'VETERINARIA',
  COMBUSTIBLE = 'COMBUSTIBLE',
  MANO_DE_OBRA = 'MANO_DE_OBRA',
  OTRO = 'OTRO',
}

export class CreateMovimientoDto {
  @IsEnum(TipoMovimiento)
  tipo!: TipoMovimiento;

  @IsString()
  concepto!: string;

  @IsNumber()
  @IsPositive()
  monto!: number;

  @IsDateString()
  fecha!: string;

  @IsEnum(CategoriaMovimiento)
  categoria!: CategoriaMovimiento;

  @IsOptional()
  @IsNumber()
  campoId?: number;

  @IsOptional()
  @IsNumber()
  siembraId?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateMovimientoDto extends PartialType(CreateMovimientoDto) {}
