import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

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
}

export class CreateLoteDto {
  @IsNotEmpty({ message: 'El nombre del lote es requerido' })
  nombre!: string;

  @IsNumber()
  @Min(0.1)
  @Type(() => Number)
  hectareas!: number;
}
