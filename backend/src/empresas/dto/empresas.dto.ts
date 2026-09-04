import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { EstadoEmpresa, RolEmpresa } from '@prisma/client';

export class CrearEmpresaDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  nombre!: string;

  @IsInt()
  @Min(1)
  propietarioId!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limiteEstablecimientos?: number;
}

export class ActualizarComercialEmpresaDto {
  @IsOptional()
  @IsEnum(EstadoEmpresa)
  estadoComercial?: EstadoEmpresa;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limiteEstablecimientos?: number;

  @IsOptional()
  @IsDateString()
  fechaInicioComercial?: string;

  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  observacionesComerciales?: string | null;
}

export class VincularOrganizacionDto {
  @IsInt()
  @Min(1)
  organizacionId!: number;
}

export class CrearEstablecimientoEmpresaDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  nombre!: string;

  @IsEmail()
  @MaxLength(160)
  email!: string;
}

export class CrearMiembroEmpresaDto {
  @IsInt()
  @Min(1)
  usuarioId!: number;

  @IsEnum(RolEmpresa)
  rol!: RolEmpresa;

  @IsOptional()
  @IsBoolean()
  accesoTodasOrganizaciones?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @IsInt({ each: true })
  organizacionesIds?: number[];
}

export class ActualizarMiembroEmpresaDto {
  @IsOptional()
  @IsEnum(RolEmpresa)
  rol?: RolEmpresa;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsBoolean()
  accesoTodasOrganizaciones?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @IsInt({ each: true })
  organizacionesIds?: number[];
}
