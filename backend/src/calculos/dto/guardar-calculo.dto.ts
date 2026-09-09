import { TipoCalculo } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class GuardarCalculoDto {
  @IsEnum(TipoCalculo)
  tipo: TipoCalculo;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  titulo: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  campoId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  loteId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maquinariaId?: number;

  @IsObject()
  datos: Record<string, unknown>;

  @IsObject()
  resultado: Record<string, unknown>;
}
