import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        usuario: {
            email: string;
            nombre: string;
            rol: import(".prisma/client").$Enums.Rol;
            createdAt: Date;
            id: number;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        usuario: {
            email: string;
            nombre: string;
            rol: import(".prisma/client").$Enums.Rol;
            createdAt: Date;
            updatedAt: Date;
            resetToken: string | null;
            resetTokenExpiry: Date | null;
            id: number;
        };
        token: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    me(req: {
        user: unknown;
    }): unknown;
}
