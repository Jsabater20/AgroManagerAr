import { IsString, IsBoolean } from 'class-validator';

export class ActualizarVisibilidadModuloDto {
  @IsString()
  moduloNombre!: string;

  @IsBoolean()
  activo!: boolean;
}
