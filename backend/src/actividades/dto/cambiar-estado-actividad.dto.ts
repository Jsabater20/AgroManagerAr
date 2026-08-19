import { IsEnum, IsNotEmpty } from 'class-validator';
import { EstadoActividad } from '@prisma/client';

export class CambiarEstadoActividadDto {
  @IsEnum(EstadoActividad)
  @IsNotEmpty()
  estado: EstadoActividad;
}
