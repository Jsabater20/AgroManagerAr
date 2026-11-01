import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePreferenciasAlertasDto {
  @IsOptional()
  @IsBoolean()
  alertasActivas?: boolean;

  @IsOptional()
  @IsBoolean()
  notificacionEnApp?: boolean;

  @IsOptional()
  @IsBoolean()
  notificacionPush?: boolean;

  @IsOptional()
  @IsBoolean()
  notificacionEmail?: boolean;

  @IsOptional()
  @IsBoolean()
  soloPrioritarias?: boolean;
}
