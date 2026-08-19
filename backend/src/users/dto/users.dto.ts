import { IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  apellido?: string;
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
  plan!: 'FREE' | 'PRO';
}

export class UpdateUserRolDto {
  @IsIn(['SUPERADMIN', 'USER'])
  rol!: 'SUPERADMIN' | 'USER';
}

export interface AdminPanelUserDto {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rolGlobal: string;
  createdAt: string;
}
