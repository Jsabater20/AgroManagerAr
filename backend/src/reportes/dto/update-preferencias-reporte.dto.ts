import { IsBoolean, IsIn, IsOptional } from 'class-validator';

export class UpdatePreferenciasReporteDto {
  @IsOptional()
  @IsIn(['SEMANAL', 'MENSUAL'])
  tipoPeriodo?: 'SEMANAL' | 'MENSUAL';

  @IsOptional()
  @IsIn(['LOTES', 'CAMPANIAS'])
  vistaDesglose?: 'LOTES' | 'CAMPANIAS';

  @IsOptional()
  @IsBoolean()
  envioAutomatico?: boolean;

  @IsOptional()
  @IsIn(['SEMANAL', 'MENSUAL'])
  frecuenciaEnvio?: 'SEMANAL' | 'MENSUAL';
}
