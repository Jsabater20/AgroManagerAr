import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRegistroPrecipitacionDto {
  @IsInt()
  @Type(() => Number)
  campoId!: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  loteId?: number;

  @IsDateString()
  fecha!: string;

  @IsNumber()
  @Min(0)
  @Max(2000)
  @Type(() => Number)
  milimetros!: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observaciones?: string;
}

export class UpdateRegistroPrecipitacionDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2000)
  @Type(() => Number)
  milimetros?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observaciones?: string;
}
