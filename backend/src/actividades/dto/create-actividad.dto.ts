import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Prioridad, TipoRecursoActividad } from '@prisma/client';

export class CreateActividadDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  titulo: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  descripcion?: string;

  @IsInt()
  @IsNotEmpty()
  usuarioOrganizacionId: number;

  @IsEnum(TipoRecursoActividad)
  @IsNotEmpty()
  recursoTipo: TipoRecursoActividad;

  @IsOptional()
  @IsInt()
  recursoId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  contexto?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsDateString()
  @IsNotEmpty()
  fechaEstimadaFin: string;

  @IsEnum(Prioridad)
  @IsNotEmpty()
  prioridad: Prioridad;
}
