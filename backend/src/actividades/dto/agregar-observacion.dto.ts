import { IsOptional, IsString, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class AgregarObservacionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  contenido: string;

  @IsOptional()
  @IsString()
  @MaxLength(5_500_000)
  fotoBase64?: string;

  @IsOptional()
  @IsUUID()
  idempotencyKey?: string;
}
