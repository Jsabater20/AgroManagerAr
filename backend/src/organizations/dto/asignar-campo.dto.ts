import { IsNumber } from 'class-validator';

export class AsignarCampoDto {
  @IsNumber()
  campoId!: number;
}
