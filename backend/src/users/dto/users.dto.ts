import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

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

export class PrepararFotoPerfilDto {
  @IsIn(['image/jpeg', 'image/png', 'image/webp'])
  mimeType!: 'image/jpeg' | 'image/png' | 'image/webp';
}

export class ConfirmarFotoPerfilDto {
  @IsString()
  @MaxLength(300)
  storageKey!: string;
}

export class ActualizarEncuadreFotoPerfilDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  posicionX?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  posicionY?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2)
  escala?: number;
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
