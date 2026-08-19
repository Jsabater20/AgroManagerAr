import { IsInt, IsNotEmpty } from 'class-validator';

export class ReasignarActividadDto {
  @IsInt()
  @IsNotEmpty()
  usuarioOrganizacionId: number;
}
