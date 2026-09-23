import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
  IsEnum,
  Matches,
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

  @IsOptional()
  @IsDateString()
  fechaEstimadaFin?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'horarioInicio debe tener el formato HH:mm',
  })
  horarioInicio?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'horarioFin debe tener el formato HH:mm',
  })
  horarioFin?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  observacionInicial?: string;

  @IsEnum(Prioridad)
  @IsNotEmpty()
  prioridad: Prioridad;
}
