import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TurnoOrdene } from '@prisma/client';

export class CreateRegistroOrdeneDto {
  @IsDateString()
  fecha!: string;

  @IsEnum(TurnoOrdene)
  turno!: TurnoOrdene;

  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  litros!: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  animalId?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
