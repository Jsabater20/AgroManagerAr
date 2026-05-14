import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        usuario: {
            id: number;
            email: string;
            nombre: string;
            rol: import(".prisma/client").$Enums.Rol;
            createdAt: Date;
            plan: import(".prisma/client").$Enums.PlanTipo;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        usuario: {
            id: number;
            email: string;
            nombre: string;
            rol: import(".prisma/client").$Enums.Rol;
            plan: import(".prisma/client").$Enums.PlanTipo;
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
