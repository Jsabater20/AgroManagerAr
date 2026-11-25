import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ActividadProductiva } from '@prisma/client';

class CampoDesdeAgroBotDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  nombre!: string;

  @IsNumber()
  @Min(0.1)
  @Type(() => Number)
  hectareas!: number;
}

class LoteDesdeAgroBotDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  nombre!: string;

  @IsNumber()
  @Min(0.1)
  @Type(() => Number)
  hectareas!: number;
}

export class ConfirmarCrearCampoAgroBotDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  idempotencyKey?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(ActividadProductiva, { each: true })
  actividades?: ActividadProductiva[];

  @ValidateNested()
  @Type(() => CampoDesdeAgroBotDto)
  campo!: CampoDesdeAgroBotDto;

  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => LoteDesdeAgroBotDto)
  lotes!: LoteDesdeAgroBotDto[];
}
