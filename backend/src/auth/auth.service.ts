import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Resend } from 'resend';
import { PrismaService } from '../prisma/prisma.service';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  private resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;
  private fromEmail =
    process.env.RESEND_FROM_EMAIL ?? 'noreply@agromanager.ar';
  private frontendUrl =
    process.env.FRONTEND_URL ?? 'http://localhost:5174';

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existe = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });
    if (existe) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        email: dto.email,
        nombre: dto.nombre,
        password: hash,
      },
      select: { id: true, email: true, nombre: true, rol: true, plan: true, createdAt: true },
    });

    // Email de bienvenida (best-effort, no bloquea el registro)
    if (this.resend) {
      this.resend.emails
        .send({
          from: this.fromEmail,
          to: usuario.email,
          subject: '¡Bienvenido a AgroManager AR!',
          html: this.buildWelcomeEmail(usuario.nombre),
        })
        .catch(() => {
          // silencioso — no falla el registro si el email falla
        });
    }

    const token = this.generarToken(usuario.id, usuario.email);
    return { usuario, token };
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
      select: { id: true, email: true, nombre: true, password: true, rol: true, plan: true },
    });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.generarToken(usuario.id, usuario.email);
    const { password: _, ...usuarioSinPassword } = usuario;
    return { usuario: usuarioSinPassword, token };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    // Respuesta genérica para no revelar si el email existe
    if (!usuario) {
      return {
        message:
          'Si ese email está registrado, te enviaremos un enlace de recuperación.',
      };
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { resetToken: tokenHash, resetTokenExpiry: expiry },
    });

    if (this.resend) {
      const resetUrl = `${this.frontendUrl}/reset-password?token=${rawToken}`;
      await this.resend.emails.send({
        from: this.fromEmail,
        to: usuario.email,
        subject: 'Recuperá tu contraseña — AgroManager AR',
        html: this.buildResetEmail(usuario.nombre, resetUrl),
      });
    }

    return {
      message:
        'Si ese email está registrado, te enviaremos un enlace de recuperación.',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = crypto
      .createHash('sha256')
      .update(dto.token)
      .digest('hex');

    const usuario = await this.prisma.usuario.findFirst({
      where: {
        resetToken: tokenHash,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!usuario) {
      throw new BadRequestException(
        'El enlace de recuperación es inválido o ya expiró.',
      );
    }

    const hash = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        password: hash,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: 'Contraseña actualizada correctamente.' };
  }

  private generarToken(userId: number, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }

  private buildWelcomeEmail(nombre: string): string {
    return `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="font-size:24px;font-weight:bold;color:#15803d;">AgroManager AR</span>
        </div>
        <h2 style="color:#111827;margin-bottom:8px;">¡Bienvenido, ${nombre}! 🌱</h2>
        <p style="color:#6b7280;line-height:1.6;">
          Tu cuenta fue creada exitosamente. Ya podés empezar a gestionar tu campo:
          campos, cultivos, ganadería, tareas, finanzas y más.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${this.frontendUrl}/dashboard"
             style="background:#15803d;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
            Ir al dashboard
          </a>
        </div>
        <p style="color:#9ca3af;font-size:12px;text-align:center;">AgroManager AR — Gestión agrícola para Argentina</p>
      </div>
    `;
  }

  private buildResetEmail(nombre: string, resetUrl: string): string {
    return `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="font-size:24px;font-weight:bold;color:#15803d;">AgroManager AR</span>
        </div>
        <h2 style="color:#111827;margin-bottom:8px;">Recuperá tu contraseña</h2>
        <p style="color:#6b7280;line-height:1.6;">
          Hola ${nombre}, recibimos una solicitud para restablecer la contraseña de tu cuenta.
          Hacé clic en el botón de abajo. El enlace expira en <strong>1 hora</strong>.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${resetUrl}"
             style="background:#15803d;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
            Restablecer contraseña
          </a>
        </div>
        <p style="color:#6b7280;font-size:13px;">
          Si no solicitaste este cambio, ignorá este email. Tu contraseña no fue modificada.
        </p>
        <p style="color:#9ca3af;font-size:12px;text-align:center;">AgroManager AR — Gestión agrícola para Argentina</p>
      </div>
    `;
  }
}
