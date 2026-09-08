import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCuadroYerbaDto {
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

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  superficieHa?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  edadPlantacion?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateCosechaYerbaDto {
  @IsDateString()
  fechaCosecha!: string;

  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  kgHojaVerde!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  kgCanchada?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  jornales?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
