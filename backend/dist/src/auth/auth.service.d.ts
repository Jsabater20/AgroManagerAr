import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private resend;
    private fromEmail;
    private frontendUrl;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    private generarToken;
    private buildWelcomeEmail;
    private buildResetEmail;
}
