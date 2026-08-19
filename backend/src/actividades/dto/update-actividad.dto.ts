import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Prioridad, TipoRecursoActividad } from '@prisma/client';

export class UpdateActividadDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  titulo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  descripcion?: string;

  @IsOptional()
  @IsEnum(TipoRecursoActividad)
  recursoTipo?: TipoRecursoActividad;

  @IsOptional()
  @IsInt()
  recursoId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  contexto?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaEstimadaFin?: string;

  @IsOptional()
  @IsEnum(Prioridad)
  prioridad?: Prioridad;
}
