import {
  IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber,
  IsOptional, IsString, Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SistemaLoteGanadero } from '@prisma/client';

enum Especie {
  BOVINO = 'BOVINO',
  PORCINO = 'PORCINO',
  EQUINO = 'EQUINO',
  OVINO = 'OVINO',
  CAPRINO = 'CAPRINO',
  AVIAR = 'AVIAR',
}

enum Sexo {
  MACHO = 'MACHO',
  HEMBRA = 'HEMBRA',
}

enum CategoriaAnimal {
  VACA = 'VACA',
  VAQUILLONA = 'VAQUILLONA',
  TERNERA = 'TERNERA',
  TORO = 'TORO',
  NOVILLO = 'NOVILLO',
  TERNERO = 'TERNERO',
  CERDA = 'CERDA',
  VERRACO = 'VERRACO',
  LECHON = 'LECHON',
  YEGUA = 'YEGUA',
  POTRANCA = 'POTRANCA',
  PADRILLO = 'PADRILLO',
  POTRO = 'POTRO',
  OVEJA = 'OVEJA',
  BORREGA = 'BORREGA',
  CARNERO = 'CARNERO',
  CORDERO = 'CORDERO',
  CABRA = 'CABRA',
  CABRIO = 'CABRIO',
  CABRITO = 'CABRITO',
  GALLINA = 'GALLINA',
  GALLO = 'GALLO',
  POLLO = 'POLLO',
  POLLA = 'POLLA',
}

enum EstadoPrenez {
  EN_CURSO = 'EN_CURSO',
  COMPLETADA = 'COMPLETADA',
  PERDIDA = 'PERDIDA',
}

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsEnum(Especie)
  especie!: Especie;

  @IsEnum(Sexo)
  sexo!: Sexo;

  @IsEnum(CategoriaAnimal)
  categoria!: CategoriaAnimal;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  peso?: number;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  loteGanaderoId?: number;
}

export class UpdateAnimalDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsEnum(CategoriaAnimal)
  categoria?: CategoriaAnimal;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  peso?: number;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  loteGanaderoId?: number;
}

export class CreatePrenezDto {
  @IsDateString()
  fechaInicio!: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdatePrenezEstadoDto {
  @IsEnum(EstadoPrenez)
  estado!: EstadoPrenez;
}

export class CreateRegistroPesoDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  peso!: number;

  @IsDateString()
  fecha!: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateLoteGanaderoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsEnum(SistemaLoteGanadero)
  sistema!: SistemaLoteGanadero;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  cantidadInicial!: number;

  @IsDateString()
  fechaIngreso!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  pesoPromedioIngresoKg?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  costoCompraTotal?: number;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateRegistroLoteGanaderoDto {
  @IsDateString()
  fecha!: string;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  cantidadActual!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  pesoPromedioKg?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  alimentoKg?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  bajas?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CerrarLoteGanaderoDto {
  @IsDateString()
  fechaEgreso!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  precioVentaTotal?: number;
}
