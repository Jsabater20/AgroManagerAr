import { IsDateString, IsNotEmpty } from 'class-validator';

export class PrologarActividadDto {
  @IsDateString()
  @IsNotEmpty()
  fechaEstimadaFin: string;
}
