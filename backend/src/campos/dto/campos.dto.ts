import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NivelRiesgoHidrico } from '@prisma/client';

export class CreateCampoDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre!: string;

  @IsNumber()
  @Min(0.1)
  @Type(() => Number)
  hectareas!: number;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  propietario?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  latitud?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  longitud?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  provincia?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  localidad?: string;
}

export class UpdateCampoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Type(() => Number)
  hectareas?: number;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  propietario?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  latitud?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  longitud?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  provincia?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  localidad?: string;
}

export class CreateLoteDto {
  @IsNotEmpty({ message: 'El nombre del lote es requerido' })
  nombre!: string;

  @IsNumber()
  @Min(0.1)
  @Type(() => Number)
  hectareas!: number;
}

export class UpdatePerfilRiesgoHidricoDto {
  @IsEnum(NivelRiesgoHidrico)
  nivel!: NivelRiesgoHidrico;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  zonasBajas?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  drenajes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  caminosYAccesos?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  infraestructuraCritica?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  sectoresSeguros?: string;

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  observaciones?: string;
}
