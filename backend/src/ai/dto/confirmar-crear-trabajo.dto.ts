import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Prioridad, TipoRecursoActividad } from '@prisma/client';

export class ConfirmarCrearTrabajoAgroBotDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  idempotencyKey?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  titulo!: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  usuarioOrganizacionId!: number;

  @IsEnum(TipoRecursoActividad)
  recursoTipo!: TipoRecursoActividad;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  recursoId?: number;

  @IsDateString()
  fechaInicio!: string;

  @IsEnum(Prioridad)
  prioridad!: Prioridad;
}
