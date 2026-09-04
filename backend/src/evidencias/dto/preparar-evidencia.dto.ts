import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { OrigenEvidencia, TipoRecursoEvidencia } from '@prisma/client';

const MIME_TYPES_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];

export class ArchivoEvidenciaDto {
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsString()
  @IsIn(MIME_TYPES_PERMITIDOS)
  mimeType: string;

  @IsInt()
  @Min(1)
  @Max(10 * 1024 * 1024)
  tamanoBytes: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10000)
  ancho?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10000)
  alto?: number;
}

export class PrepararEvidenciaDto {
  @IsEnum(OrigenEvidencia)
  origen: OrigenEvidencia;

  @IsEnum(TipoRecursoEvidencia)
  tipoRecurso: TipoRecursoEvidencia;

  @IsInt()
  @Min(1)
  recursoId: number;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  comentario?: string;

  @ValidateNested({ each: true })
  @Type(() => ArchivoEvidenciaDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  archivos: ArchivoEvidenciaDto[];
}
