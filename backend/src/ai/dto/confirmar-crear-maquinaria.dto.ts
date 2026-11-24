import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { TipoMaquinaria } from '../../maquinarias/dto/maquinarias.dto';

export class ConfirmarCrearMaquinariaAgroBotDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  nombre!: string;

  @IsEnum(TipoMaquinaria)
  tipo!: TipoMaquinaria;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  marca?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  modelo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  patente?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  campoId?: number;
}
