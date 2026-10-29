import { IsIn, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCostoActividadDto } from './create-costo-actividad.dto';

const TIPOS_RECURSO_PRODUCTIVO = [
  'CAMPO',
  'LOTE',
  'SIEMBRA',
  'CAMPANIA',
  'MAQUINARIA',
] as const;

export class CreateCostoEstimadoDto extends CreateCostoActividadDto {
  @IsIn(TIPOS_RECURSO_PRODUCTIVO)
  recursoTipo!: (typeof TIPOS_RECURSO_PRODUCTIVO)[number];

  @Type(() => Number)
  @IsInt()
  @Min(1)
  recursoId!: number;
}
