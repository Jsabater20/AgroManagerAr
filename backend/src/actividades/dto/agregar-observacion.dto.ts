import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class AgregarObservacionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  contenido: string;
}
