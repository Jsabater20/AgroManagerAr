import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TipoEventoAgroManagerDigital } from '@prisma/client';

export class CrearSolicitudDigitalDto {
  @IsString() @IsNotEmpty() @MaxLength(120) nombre!: string;
  @IsString() @IsNotEmpty() @MaxLength(160) establecimiento!: string;
  @IsEmail() @MaxLength(180) email!: string;
  @IsString() @IsNotEmpty() @MaxLength(40) telefono!: string;
  @IsString() @IsNotEmpty() @MaxLength(100) provincia!: string;
  @IsString() @IsNotEmpty() @MaxLength(100) localidad!: string;
  @IsString() @IsNotEmpty() @MaxLength(100) actividad!: string;
  @IsString() @IsNotEmpty() @MaxLength(80) servicio!: string;
  @IsBoolean() tieneSitioWeb!: boolean;
  @IsString() @IsNotEmpty() @MaxLength(3000) descripcion!: string;
  @IsOptional() @IsString() @MaxLength(120) presupuesto?: string;
  @IsOptional() @IsString() @MaxLength(100) fechaInicio?: string;
  @IsOptional() @IsString() @MaxLength(2000) comentarios?: string;
  @IsBoolean() consienteContacto!: boolean;
  @IsOptional() @IsString() @MaxLength(200) sitioWeb?: string;
}

export class ActualizarSolicitudDigitalDto {
  @IsOptional() @IsString() estado?: string;
  @IsOptional() @IsString() @MaxLength(3000) observacionesInternas?: string;
  @IsOptional() @IsString() @MaxLength(3000) presupuestoEnviado?: string;
  @IsOptional() @IsString() @MaxLength(1000) seguimiento?: string;
}

export class RegistrarEventoDigitalDto {
  @IsEnum(TipoEventoAgroManagerDigital)
  tipo!: TipoEventoAgroManagerDigital;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  origen?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  medio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  campania?: string;
}
