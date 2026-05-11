import { IsString, IsOptional, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCampaniaDto {
  @IsString()
  nombre!: string;

  @IsDateString()
  fechaInicio!: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateCampaniaDto extends PartialType(CreateCampaniaDto) {}
