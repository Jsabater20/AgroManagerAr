import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { CategoriaNovedadProducto } from '@prisma/client';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CrearNovedadProductoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(320)
  resumen!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(12000)
  contenido!: string;

  @IsOptional()
  @IsEnum(CategoriaNovedadProducto)
  categoria?: CategoriaNovedadProducto;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  version?: string;

  @IsOptional()
  @IsBoolean()
  destacada?: boolean;
}

export class ActualizarNovedadProductoDto extends PartialType(CrearNovedadProductoDto) {}

export class ConfirmarEnvioNovedadDto {
  @IsBoolean()
  confirmar!: boolean;
}

export class EnviarCorreoPruebaNovedadDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;
}

export class DesuscribirNovedadesDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  usuarioId!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  firma!: string;
}
