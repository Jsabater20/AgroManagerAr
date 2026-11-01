import { IsDateString, IsIn, IsOptional } from 'class-validator';

export class ReportePeriodicoQueryDto {
  @IsOptional()
  @IsDateString()
  fechaReferencia?: string;
}

export class DesgloseProductivoQueryDto extends ReportePeriodicoQueryDto {
  @IsOptional()
  @IsIn(['SEMANAL', 'MENSUAL'])
  tipo?: 'SEMANAL' | 'MENSUAL';
}
