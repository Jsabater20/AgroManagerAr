import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum TipoInsumo {
  FERTILIZANTE = 'FERTILIZANTE',
  HERBICIDA = 'HERBICIDA',
  FUNGICIDA = 'FUNGICIDA',
  INSECTICIDA = 'INSECTICIDA',
  SEMILLA = 'SEMILLA',
  OTRO = 'OTRO',
}

export class CreateInsumoDto {
  @IsNotEmpty()
  nombre!: string;

  @IsEnum(TipoInsumo, { message: 'Tipo de insumo inválido' })
  tipo!: TipoInsumo;

  @IsNotEmpty({ message: 'La unidad es requerida (ej: kg, litros, kg/ha)' })
  unidad!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateInsumoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEnum(TipoInsumo)
  tipo?: TipoInsumo;

  @IsOptional()
  @IsString()
  unidad?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
