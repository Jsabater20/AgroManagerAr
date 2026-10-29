import { IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TipoRecursoActividad } from '@prisma/client';
import { CreateCostoActividadDto } from './create-costo-actividad.dto';

export class CreateCostoEstimadoDto extends CreateCostoActividadDto {
  @IsEnum([
    TipoRecursoActividad.CAMPO,
    TipoRecursoActividad.LOTE,
    TipoRecursoActividad.SIEMBRA,
    TipoRecursoActividad.CAMPANIA,
    TipoRecursoActividad.MAQUINARIA,
  ])
  recursoTipo!:
    | TipoRecursoActividad.CAMPO
    | TipoRecursoActividad.LOTE
    | TipoRecursoActividad.SIEMBRA
    | TipoRecursoActividad.CAMPANIA
    | TipoRecursoActividad.MAQUINARIA;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  recursoId!: number;
}
