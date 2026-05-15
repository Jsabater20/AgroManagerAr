import { IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  nombre?: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(1)
  passwordActual!: string;

  @IsString()
  @MinLength(8)
  passwordNueva!: string;
}

export class UpdateUserPlanDto {
  @IsIn(['FREE', 'PRO'])
  plan: 'FREE' | 'PRO';
}

export class UpdateUserRolDto {
  @IsIn(['ADMIN', 'OPERADOR'])
  rol: 'ADMIN' | 'OPERADOR';
}
