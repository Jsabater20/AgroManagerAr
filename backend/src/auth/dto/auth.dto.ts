import { IsEmail, IsNotEmpty, Matches, MinLength, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email!: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido!: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/(?=.*[a-z])/, {
    message: 'La contraseña debe incluir al menos una minúscula',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'La contraseña debe incluir al menos una mayúscula',
  })
  @Matches(/(?=.*\d)/, {
    message: 'La contraseña debe incluir al menos un número',
  })
  password!: string;

  @IsOptional()
  @IsString()
  invitationToken?: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email!: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  token!: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/(?=.*[a-z])/, {
    message: 'La contraseña debe incluir al menos una minúscula',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'La contraseña debe incluir al menos una mayúscula',
  })
  @Matches(/(?=.*\d)/, {
    message: 'La contraseña debe incluir al menos un número',
  })
  newPassword!: string;
}
