import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum } from 'class-validator';
import { ActividadProductiva } from '@prisma/client';

export class ActualizarActividadProductivaDto {
  @IsEnum(ActividadProductiva)
  actividadPrincipal!: ActividadProductiva;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  @IsEnum(ActividadProductiva, { each: true })
  actividades!: ActividadProductiva[];
}
