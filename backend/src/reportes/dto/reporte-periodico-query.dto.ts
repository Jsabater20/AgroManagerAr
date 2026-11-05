import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class ReportePeriodicoQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  organizacionId?: number;

  @IsOptional()
  @IsDateString()
  fechaReferencia?: string;
}

export class DesgloseProductivoQueryDto extends ReportePeriodicoQueryDto {
  @IsOptional()
  @IsIn(['SEMANAL', 'MENSUAL'])
  tipo?: 'SEMANAL' | 'MENSUAL';
}
