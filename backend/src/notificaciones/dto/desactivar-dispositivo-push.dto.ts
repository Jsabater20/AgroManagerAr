import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class DesactivarDispositivoPushDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  expoPushToken: string;
}
