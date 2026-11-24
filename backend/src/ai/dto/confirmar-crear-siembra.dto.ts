import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class ConfirmarCrearSiembraAgroBotDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  loteId!: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  tipoCultivoId!: number;

  @IsDateString()
  fechaSiembra!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  observaciones?: string;
}
