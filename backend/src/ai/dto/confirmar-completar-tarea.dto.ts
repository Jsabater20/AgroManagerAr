import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class ConfirmarCompletarTareaAgroBotDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  idempotencyKey?: string;

  @IsIn(['TAREA_RURAL', 'TRABAJO_EQUIPO'])
  origen!: 'TAREA_RURAL' | 'TRABAJO_EQUIPO';

  @IsInt()
  @Min(1)
  @Type(() => Number)
  tareaId!: number;
}
