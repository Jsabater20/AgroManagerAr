import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoCultivoDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateTipoCultivoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
