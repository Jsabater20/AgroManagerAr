import { IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePermisoTemporalDto {
  @IsNumber()
  usuarioOrganizacionId: number;

  @IsNumber()
  rolPersonalizadoId: number;

  @IsDateString()
  fechaInicio: string; // ISO 8601

  @IsDateString()
  fechaVencimiento: string; // ISO 8601

  @IsOptional()
  @IsString()
  recursoTipo?: string; // "CAMPO", "TAREA", etc.

  @IsOptional()
  @IsNumber()
  recursoId?: number;

  @IsOptional()
  @IsString()
  notas?: string;
}
