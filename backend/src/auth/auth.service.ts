import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Resend } from 'resend';
import {
  EstadoEmpresa,
  InvitacionOrganizacion,
  Organizacion,
  RolEmpresa,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReferidosService } from '../referidos/referidos.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
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
    process.env.RESEND_FROM_EMAIL ?? 'noreply@agromanagerar.com';
  private frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private referidosService: ReferidosService,
    private notificacionesService: NotificacionesService,
  ) {}

  async register(dto: RegisterDto) {
    const existe = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });
    if (existe) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    const referente = dto.codigoReferido
      ? await this.referidosService.buscarReferentePorCodigo(dto.codigoReferido)
      : null;

    let invitacion:
      | (InvitacionOrganizacion & { organizacion: Organizacion })
      | null = null;
    if (dto.invitationToken) {
      const foundInvitacion =
        await this.prisma.invitacionOrganizacion.findUnique({
          where: { token: dto.invitationToken },
          include: { organizacion: true },
        });

      if (!foundInvitacion) {
        throw new BadRequestException('Invitación no encontrada');
      }

      if (foundInvitacion.estado !== 'PENDIENTE') {
        throw new BadRequestException('Invitación ya fue usada');
      }

      if (new Date() > foundInvitacion.expiresAt) {
        throw new BadRequestException('Invitación expirada');
      }

      if (foundInvitacion.email !== dto.email) {
        throw new BadRequestException(
          `Esta invitación es para el email ${foundInvitacion.email}`,
        );
      }

      invitacion = foundInvitacion;
    }

    const esRegistroEmpresa = dto.tipoRegistro === 'EMPRESA';
    if (invitacion && esRegistroEmpresa) {
      throw new BadRequestException(
        'Las cuentas invitadas deben registrarse desde la invitación recibida.',
      );
    }

    const nombreEmpresa = dto.nombreEmpresa?.trim();
    if (esRegistroEmpresa && !nombreEmpresa) {
      throw new BadRequestException('El nombre de la empresa es obligatorio');
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    const usuario = await this.prisma.usuario.create({
      data: {
        email: dto.email,
        nombre: dto.nombre,
        apellido: dto.apellido,
        password: hash,
        emailVerificado: false,
        emailVerifToken: tokenHash,
      },
      select: { id: true, email: true, nombre: true, apellido: true },
    });

    if (referente) {
      await this.referidosService.registrarReferido(referente.id, usuario.id);
    }

    if (invitacion) {
      await this.prisma.usuarioOrganizacion.create({
        data: {
          usuarioId: usuario.id,
          organizacionId: invitacion.organizacionId,
          roles: JSON.stringify([invitacion.rol]),
          activo: true,
        },
      });

      await this.prisma.invitacionOrganizacion.update({
        where: { id: invitacion.id },
        data: {
          estado: 'ACEPTADA',
          aceptadoEn: new Date(),
          usuarioId: usuario.id,
        },
      });
    } else if (esRegistroEmpresa) {
      await this.prisma.$transaction(async (tx) => {
        const empresa = await tx.empresa.create({
          data: {
            nombre: nombreEmpresa!,
            propietarioId: usuario.id,
            estadoComercial: EstadoEmpresa.PENDIENTE,
          },
        });

        await tx.usuarioEmpresa.create({
          data: {
            empresaId: empresa.id,
            usuarioId: usuario.id,
            rol: RolEmpresa.OWNER,
            accesoTodasOrganizaciones: true,
          },
        });
      });
    } else {
      await this.prisma.organizacion.create({
        data: {
          nombre: `${usuario.nombre} ${dto.apellido}`,
          email: usuario.email,
          plan: 'FREE',
          propietarioId: usuario.id,
        },
      });
    }

    await this.notificacionesService.notificarNuevoRegistro(
      usuario.id,
      esRegistroEmpresa ? 'EMPRESA' : 'DUENO_CAMPO',
    );

    const verifyUrl = `${this.frontendUrl}/verify-email?token=${rawToken}`;
    if (this.resend) {
      const result = await this.resend.emails.send({
        from: `AgroManager AR <${this.fromEmail}>`,
        to: usuario.email,
        subject: 'Verificá tu cuenta — AgroManager AR',
        html: this.buildVerifyEmail(usuario.nombre, verifyUrl),
      });
      if (result.error) {
        console.error(
          '[Resend] Error enviando email de verificación:',
          result.error,
        );
      }
    }

    return {
      message:
        'Registrado. Revisá tu email para verificar tu cuenta antes de ingresar.',
      tipoRegistro: esRegistroEmpresa ? 'EMPRESA' : 'DUENO_CAMPO',
    };
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        password: true,
        rol: true,
        rolGlobal: true,
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

    const orgsDelUsuario = await this.prisma.organizacion.findMany({
      where: { propietarioId: usuario.id },
      select: { id: true, nombre: true, plan: true },
    });

    const orgsComoMiembro = await this.prisma.usuarioOrganizacion.findMany({
      where: { usuarioId: usuario.id, activo: true },
      select: {
        organizacion: { select: { id: true, nombre: true, plan: true } },
      },
    });

    const organizaciones = Array.from(
      new Map(
        [...orgsDelUsuario, ...orgsComoMiembro.map((m) => m.organizacion)].map(
          (organizacion) => [organizacion.id, organizacion],
        ),
      ).values(),
    );

    const empresas = await this.prisma.empresa.findMany({
      where: {
        activo: true,
        OR: [
          { propietarioId: usuario.id },
          { miembros: { some: { usuarioId: usuario.id, activo: true } } },
        ],
      },
      select: {
        id: true,
        nombre: true,
        estadoComercial: true,
        limiteEstablecimientos: true,
        propietarioId: true,
      },
      orderBy: { nombre: 'asc' },
    });

    const orgPrincipal = orgsDelUsuario[0] || orgsComoMiembro[0]?.organizacion;
    const usuarioOrganizacionId = orgPrincipal?.id ?? null;
    const token = this.generarToken(
      usuario.id,
      usuario.email,
      usuarioOrganizacionId,
      usuario.rolGlobal,
    );

    const { password, emailVerificado, ...usuarioSinPassword } = usuario;
    return {
      usuario: {
        ...usuarioSinPassword,
        organizaciones,
        empresas,
        usuarioOrganizacionId,
      },
      token,
    };
  }

  async verifyEmail(token: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const usuario = await this.prisma.usuario.findFirst({
      where: { emailVerifToken: tokenHash },
    });
    if (!usuario) {
      throw new BadRequestException(
        'El enlace de verificación es inválido o ya fue usado.',
      );
    }
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { emailVerificado: true, emailVerifToken: null },
    });
    await this.referidosService.marcarEmailVerificado(usuario.id);
    return {
      message: 'Email verificado correctamente. Ya podés iniciar sesión.',
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    console.log(`[Auth] forgotPassword called for: ${dto.email}`);
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (!usuario) {
      console.log(
        `[Auth] forgotPassword: email no encontrado en BD: ${dto.email}`,
      );
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
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { resetToken: tokenHash, resetTokenExpiry: expiry },
    });

    console.log(
      `[Auth] forgotPassword: usuario encontrado id=${usuario.id}, resend=${!!this.resend}`,
    );
    if (this.resend) {
      const resetUrl = `${this.frontendUrl}/reset-password?token=${rawToken}`;
      const result = await this.resend.emails.send({
        from: `AgroManager AR <${this.fromEmail}>`,
        to: usuario.email,
        subject: 'Recuperá tu contraseña — AgroManager AR',
        html: this.buildResetEmail(usuario.nombre, resetUrl),
      });
      if (result.error) {
        console.error(
          '[Resend] Error enviando email de recuperación:',
          result.error,
        );
      }
    }

    return {
      message:
        'Si ese email está registrado, te enviaremos un enlace de recuperación.',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const rawToken = dto.token;
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    const usuario = await this.prisma.usuario.findFirst({
      where: { resetToken: tokenHash },
    });

    if (!usuario) {
      throw new BadRequestException('Token de recuperación inválido o expirado.');
    }

    if (usuario.resetTokenExpiry && new Date() > usuario.resetTokenExpiry) {
      throw new BadRequestException('El token de recuperación ha expirado.');
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

  private generarToken(
    userId: number,
    email: string,
    orgId?: number,
    rolGlobal?: string,
  ) {
    return this.jwtService.sign({
      sub: userId,
      email,
      organizacionId: orgId,
      rolGlobal,
    });
  }

  private buildVerifyEmail(nombre: string, verifyUrl: string) {
    return `
      <html>
        <body>
          <h1>Verificá tu cuenta</h1>
          <p>Hola ${nombre},</p>
          <p>Hace clic en el siguiente enlace para verificar tu cuenta:</p>
          <a href="${verifyUrl}">Verificar cuenta</a>
        </body>
      </html>
    `;
  }

  private buildResetEmail(nombre: string, resetUrl: string) {
    return `
      <html>
        <body>
          <h1>Recuperá tu contraseña</h1>
          <p>Hola ${nombre},</p>
          <p>Hace clic en el siguiente enlace para recuperar tu contraseña:</p>
          <a href="${resetUrl}">Recuperar contraseña</a>
        </body>
      </html>
    `;
  }
}
