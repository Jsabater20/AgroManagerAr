import {
  IsDateString, IsEnum, IsNotEmpty, IsNumber,
  IsOptional, IsString, Min,
} from 'class-validator';
import { Type } from 'class-transformer';

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
