import { IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePermisoTemporalDto {
  @IsNumber()
  usuarioOrganizacionId!: number;

  @IsDateString()
  fechaInicio!: string; // ISO 8601

  @IsDateString()
  fechaVencimiento!: string; // ISO 8601

  @IsString()
  recursoTipo!: string; // "CAMPO", "TAREA", "CULTIVO", "MAQUINARIA", "GANADO"

  @IsNumber()
  recursoId!: number;

  @IsOptional()
  @IsString()
  notas?: string;
}
