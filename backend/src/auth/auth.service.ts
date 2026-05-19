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
  private fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@agromanager.ar';
  private frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';

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
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    const usuario = await this.prisma.usuario.create({
      data: {
        email: dto.email,
        nombre: dto.nombre,
        password: hash,
        emailVerificado: false,
        emailVerifToken: tokenHash,
      },
      select: { id: true, email: true, nombre: true },
    });

    const verifyUrl = `${this.frontendUrl}/verify-email?token=${rawToken}`;
    if (this.resend) {
      this.resend.emails
        .send({
          from: this.fromEmail,
          to: usuario.email,
          subject: 'Verificá tu cuenta — AgroManager AR',
          html: this.buildVerifyEmail(usuario.nombre, verifyUrl),
        })
        .catch(() => {});
    }

    return {
      message:
        'Registrado. Revisá tu email para verificar tu cuenta antes de ingresar.',
    };
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        nombre: true,
        password: true,
        rol: true,
        plan: true,
        emailVerificado: true,
      },
    });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!usuario.emailVerificado) {
      throw new UnauthorizedException(
        'Verificación pendiente. Revisá tu email y hacé clic en el enlace de verificación.',
      );
    }

    const token = this.generarToken(usuario.id, usuario.email);
    const { password: _, emailVerificado: __, ...usuarioSinPassword } = usuario;
    return { usuario: usuarioSinPassword, token };
  }

  async verifyEmail(token: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const usuario = await this.prisma.usuario.findFirst({
      where: { emailVerifToken: tokenHash },
    });
    if (!usuario) {
      throw new BadRequestException('El enlace de verificación es inválido o ya fue usado.');
    }
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { emailVerificado: true, emailVerifToken: null },
    });
    return { message: 'Email verificado correctamente. Ya podés iniciar sesión.' };
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
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      <!-- Header verde -->
      <tr>
        <td style="background:#15803d;padding:28px 32px;text-align:center;">
          <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">🌱 AgroManager AR</span>
          <p style="color:#bbf7d0;margin:6px 0 0;font-size:13px;">Gestión agrícola para Argentina</p>
        </td>
      </tr>

      <!-- Cuerpo -->
      <tr>
        <td style="padding:36px 32px;">
          <h2 style="color:#111827;font-size:22px;margin:0 0 12px;">¡Bienvenido, ${nombre}! 👋</h2>
          <p style="color:#4b5563;line-height:1.7;margin:0 0 24px;">
            Tu cuenta en <strong>AgroManager AR</strong> fue creada exitosamente.
            Ya podés ingresar y empezar a gestionar tu campo desde un solo lugar.
          </p>

          <!-- Botón CTA -->
          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
            <tr>
              <td style="background:#15803d;border-radius:10px;">
                <a href="${this.frontendUrl}/dashboard"
                   style="display:inline-block;padding:14px 32px;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;">
                  Ir a mi dashboard →
                </a>
              </td>
            </tr>
          </table>

          <!-- Lo que podés hacer -->
          <p style="color:#374151;font-weight:700;font-size:15px;margin:0 0 12px;">¿Qué podés hacer con tu cuenta Free?</p>
          <table cellpadding="6" cellspacing="0" width="100%">
            <tr><td style="color:#15803d;font-size:18px;width:28px;">✓</td><td style="color:#4b5563;font-size:14px;">1 campo con hasta 3 lotes</td></tr>
            <tr><td style="color:#15803d;font-size:18px;">✓</td><td style="color:#4b5563;font-size:14px;">Hasta 20 animales y 10 siembras</td></tr>
            <tr><td style="color:#15803d;font-size:18px;">✓</td><td style="color:#4b5563;font-size:14px;">Gestión de tareas, finanzas e insumos</td></tr>
            <tr><td style="color:#15803d;font-size:18px;">✓</td><td style="color:#4b5563;font-size:14px;">Pronóstico del tiempo y mapa de Argentina</td></tr>
          </table>

          <!-- Upgrade hint -->
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;margin:28px 0 0;">
            <p style="color:#15803d;font-weight:700;margin:0 0 6px;font-size:14px;">⚡ Querés más? Probá Pro 14 días gratis</p>
            <p style="color:#4b5563;font-size:13px;margin:0 0 12px;">Campos, lotes y animales ilimitados · AgroBot IA · Reportes avanzados · Campañas</p>
            <a href="${this.frontendUrl}/precios"
               style="color:#15803d;font-weight:700;font-size:13px;text-decoration:underline;">
              Ver planes y precios →
            </a>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">
            AgroManager AR · <a href="${this.frontendUrl}" style="color:#9ca3af;">www.agromanagerar.com</a>
          </p>
          <p style="color:#d1d5db;font-size:11px;margin:6px 0 0;">
            Recibiste este email porque te registraste en AgroManager AR.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
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

  private buildVerifyEmail(nombre: string, verifyUrl: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:#15803d;padding:28px 32px;text-align:center;">
          <span style="color:#ffffff;font-size:22px;font-weight:700;">🌱 AgroManager AR</span>
          <p style="color:#bbf7d0;margin:6px 0 0;font-size:13px;">Gestión agrícola para Argentina</p>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 32px;">
          <h2 style="color:#111827;font-size:22px;margin:0 0 12px;">Hola, ${nombre} 👋</h2>
          <p style="color:#4b5563;line-height:1.7;margin:0 0 8px;">
            Gracias por registrarte en <strong>AgroManager AR</strong>.
            Para activar tu cuenta y comenzar a usarla, confirmá tu email haciendo clic en el botón de abajo.
          </p>
          <p style="color:#9ca3af;font-size:13px;margin:0 0 28px;">El enlace expira en <strong>24 horas</strong>.</p>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
            <tr>
              <td style="background:#15803d;border-radius:10px;">
                <a href="${verifyUrl}"
                   style="display:inline-block;padding:14px 32px;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;">
                  Verificar mi cuenta →
                </a>
              </td>
            </tr>
          </table>
          <p style="color:#6b7280;font-size:13px;margin:0;">
            Si no creaste esta cuenta, podés ignorar este email sin problema.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">
            AgroManager AR · <a href="${this.frontendUrl}" style="color:#9ca3af;">www.agromanagerar.com</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
  }
}
