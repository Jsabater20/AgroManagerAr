import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegistrarDispositivoPushDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  expoPushToken: string;

  @IsString()
  @IsIn(['android', 'ios'])
  plataforma: 'android' | 'ios';
}
