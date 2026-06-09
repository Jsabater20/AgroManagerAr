import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

enum TipoTarea {
  SIEMBRA = 'SIEMBRA',
  COSECHA = 'COSECHA',
  FUMIGACION = 'FUMIGACION',
  FERTILIZACION = 'FERTILIZACION',
  RIEGO = 'RIEGO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  VETERINARIA = 'VETERINARIA',
  OTRO = 'OTRO',
}

enum EstadoTarea {
  PENDIENTE = 'PENDIENTE',
  EN_CURSO = 'EN_CURSO',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
}

enum Prioridad {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE',
}

enum RepetirTarea {
  UNICA = 'UNICA',
  SEMANAL = 'SEMANAL',
  QUINCENAL = 'QUINCENAL',
  MENSUAL = 'MENSUAL',
}

export class CreateTareaDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(TipoTarea)
  tipo!: TipoTarea;

  @IsOptional()
  @IsEnum(Prioridad)
  prioridad?: Prioridad;

  @IsDateString()
  fechaProgramada!: string;

  @IsOptional()
  @IsDateString()
  fechaLimite?: string;

  @IsOptional()
  @IsEnum(RepetirTarea)
  repetir?: RepetirTarea;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  campoId?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateTareaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(TipoTarea)
  tipo?: TipoTarea;

  @IsOptional()
  @IsEnum(Prioridad)
  prioridad?: Prioridad;

  @IsOptional()
  @IsDateString()
  fechaProgramada?: string;

  @IsOptional()
  @IsDateString()
  fechaLimite?: string;

  @IsOptional()
  @IsEnum(RepetirTarea)
  repetir?: RepetirTarea;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  campoId?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateTareaEstadoDto {
  @IsEnum(EstadoTarea)
  estado!: EstadoTarea;
}

