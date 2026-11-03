import { IsBoolean } from 'class-validator';

export class ConfirmarAsignacionPromocionDto {
  @IsBoolean()
  confirmar!: boolean;
}
