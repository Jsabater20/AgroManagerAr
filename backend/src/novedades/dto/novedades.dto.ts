import { PartialType } from '@nestjs/mapped-types';
import { CategoriaNovedadProducto } from '@prisma/client';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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
