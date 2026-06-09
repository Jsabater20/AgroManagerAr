import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export enum TipoMaquinaria {
  TRACTOR = 'TRACTOR',
  SEMBRADORA = 'SEMBRADORA',
  PULVERIZADORA = 'PULVERIZADORA',
  COSECHADORA = 'COSECHADORA',
  CAMIONETA = 'CAMIONETA',
  MIXER = 'MIXER',
  ACOPLADO = 'ACOPLADO',
  TOLVA = 'TOLVA',
  HERRAMIENTA = 'HERRAMIENTA',
  OTRO = 'OTRO',
}

export enum EstadoMaquinaria {
  OPERATIVA = 'OPERATIVA',
  EN_MANTENIMIENTO = 'EN_MANTENIMIENTO',
  FUERA_DE_SERVICIO = 'FUERA_DE_SERVICIO',
}

export enum TipoMantenimiento {
  CAMBIO_ACEITE = 'CAMBIO_ACEITE',
  REVISION_GENERAL = 'REVISION_GENERAL',
  REPARACION = 'REPARACION',
  OTRO = 'OTRO',
}

export enum TipoGastoMaq {
  COMBUSTIBLE = 'COMBUSTIBLE',
  REPARACION = 'REPARACION',
  REPUESTO = 'REPUESTO',
  SERVICIO = 'SERVICIO',
  SEGURO = 'SEGURO',
  OTRO = 'OTRO',
}

export class CreateMaquinariaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(TipoMaquinaria)
  tipo: TipoMaquinaria;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsString()
  @IsOptional()
  modelo?: string;

  @IsInt()
  @IsOptional()
  anio?: number;

  @IsString()
  @IsOptional()
  patente?: string;

  @IsEnum(EstadoMaquinaria)
  @IsOptional()
  estado?: EstadoMaquinaria;

  @IsNumber()
  @IsOptional()
  horasUso?: number;

  @IsDateString()
  @IsOptional()
  seguroVencimiento?: string;

  @IsDateString()
  @IsOptional()
  vtvVencimiento?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsInt()
  @IsOptional()
  campoId?: number;
}

export class UpdateMaquinariaDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEnum(TipoMaquinaria)
  @IsOptional()
  tipo?: TipoMaquinaria;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsString()
  @IsOptional()
  modelo?: string;

  @IsInt()
  @IsOptional()
  anio?: number;

  @IsString()
  @IsOptional()
  patente?: string;

  @IsEnum(EstadoMaquinaria)
  @IsOptional()
  estado?: EstadoMaquinaria;

  @IsNumber()
  @IsOptional()
  horasUso?: number;

  @IsDateString()
  @IsOptional()
  seguroVencimiento?: string;

  @IsDateString()
  @IsOptional()
  vtvVencimiento?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsInt()
  @IsOptional()
  campoId?: number;
}

export class CreateMantenimientoDto {
  @IsEnum(TipoMantenimiento)
  tipo: TipoMantenimiento;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  fecha: string;

  @IsNumber()
  @IsOptional()
  horasUso?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  costo?: number;

  @IsDateString()
  @IsOptional()
  proximoMantenimiento?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

export class CreateGastoDto {
  @IsEnum(TipoGastoMaq)
  tipo: TipoGastoMaq;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @Min(0)
  monto: number;

  @IsDateString()
  fecha: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
