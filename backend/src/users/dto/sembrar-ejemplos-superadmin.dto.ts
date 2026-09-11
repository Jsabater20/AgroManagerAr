import { IsInt, Min } from 'class-validator';

export class SembrarEjemplosSuperadminDto {
  @IsInt()
  @Min(1)
  organizacionId: number;
}
