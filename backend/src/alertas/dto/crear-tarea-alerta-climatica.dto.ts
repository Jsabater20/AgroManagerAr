import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CrearTareaAlertaClimaticaDto {
  @IsInt()
  @Type(() => Number)
  usuarioOrganizacionId!: number;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observacion?: string;
}
