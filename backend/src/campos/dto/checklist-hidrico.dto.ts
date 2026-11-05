import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  CategoriaChecklistPreventivoHidrico,
  EstadoChecklistPreventivoHidrico,
} from '@prisma/client';

export const TIPOS_PLANTILLA_PREVENTIVA = [
  'LLUVIA_INTENSA',
  'EXCESO_AGUA',
  'SEQUIA',
  'HELADA',
  'VIENTO_FUERTE',
] as const;

export type TipoPlantillaPreventiva = (typeof TIPOS_PLANTILLA_PREVENTIVA)[number];

export class CargarPlantillaPreventivaHidricaDto {
  @IsOptional()
  @IsIn(TIPOS_PLANTILLA_PREVENTIVA)
  tipo?: TipoPlantillaPreventiva;
}

export class CreateChecklistPreventivoHidricoDto {
  @IsString()
  @IsNotEmpty({ message: 'El título de la acción es requerido' })
  @MaxLength(160)
  titulo!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  descripcion?: string;

  @IsOptional()
  @IsEnum(CategoriaChecklistPreventivoHidrico)
  categoria?: CategoriaChecklistPreventivoHidrico;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  responsableId?: number | null;

  @IsOptional()
  @IsDateString()
  fechaLimite?: string | null;
}

export class UpdateChecklistPreventivoHidricoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El título de la acción no puede estar vacío' })
  @MaxLength(160)
  titulo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  descripcion?: string | null;

  @IsOptional()
  @IsEnum(CategoriaChecklistPreventivoHidrico)
  categoria?: CategoriaChecklistPreventivoHidrico;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  responsableId?: number | null;

  @IsOptional()
  @IsDateString()
  fechaLimite?: string | null;
}

export class UpdateEstadoChecklistPreventivoHidricoDto {
  @IsEnum(EstadoChecklistPreventivoHidrico)
  estado!: EstadoChecklistPreventivoHidrico;
}
