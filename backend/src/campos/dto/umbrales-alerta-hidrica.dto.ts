import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateUmbralAlertaHidricaCampoDto {
  @IsBoolean()
  activo!: boolean;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(500)
  @Type(() => Number)
  lluviaDiariaMm!: number;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(1000)
  @Type(() => Number)
  lluviaAcumulada48hMm!: number;

  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  probabilidadLluviaPct!: number;

  @IsOptional()
  @IsBoolean()
  crearAccionesAutomaticas?: boolean;
}
