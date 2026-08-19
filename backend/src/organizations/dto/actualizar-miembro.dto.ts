import { IsOptional, IsArray, IsString } from 'class-validator';

export class ActualizarMiembroDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}
