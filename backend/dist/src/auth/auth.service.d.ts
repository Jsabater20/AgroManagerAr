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
    private generarToken;
    private buildWelcomeEmail;
    private buildResetEmail;
}
