"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
const resend_1 = require("resend");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    resend = process.env.RESEND_API_KEY
        ? new resend_1.Resend(process.env.RESEND_API_KEY)
        : null;
    fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@agromanager.ar';
    frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existe = await this.prisma.usuario.findUnique({
            where: { email: dto.email },
        });
        if (existe) {
            throw new common_1.ConflictException('Ya existe un usuario con ese email');
        }
        const hash = await bcrypt.hash(dto.password, 10);
        const usuario = await this.prisma.usuario.create({
            data: {
                email: dto.email,
                nombre: dto.nombre,
                password: hash,
            },
            select: { id: true, email: true, nombre: true, rol: true, createdAt: true },
        });
        if (this.resend) {
            this.resend.emails
                .send({
                from: this.fromEmail,
                to: usuario.email,
                subject: '¡Bienvenido a AgroManager AR!',
                html: this.buildWelcomeEmail(usuario.nombre),
            })
                .catch(() => {
            });
        }
        const token = this.generarToken(usuario.id, usuario.email);
        return { usuario, token };
    }
    async login(dto) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: dto.email },
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const passwordValido = await bcrypt.compare(dto.password, usuario.password);
        if (!passwordValido) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const token = this.generarToken(usuario.id, usuario.email);
        const { password: _, ...usuarioSinPassword } = usuario;
        return { usuario: usuarioSinPassword, token };
    }
    async forgotPassword(dto) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: dto.email },
        });
        if (!usuario) {
            return {
                message: 'Si ese email está registrado, te enviaremos un enlace de recuperación.',
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
            message: 'Si ese email está registrado, te enviaremos un enlace de recuperación.',
        };
    }
    async resetPassword(dto) {
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
            throw new common_1.BadRequestException('El enlace de recuperación es inválido o ya expiró.');
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
    generarToken(userId, email) {
        return this.jwtService.sign({ sub: userId, email });
    }
    buildWelcomeEmail(nombre) {
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
    buildResetEmail(nombre, resetUrl) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map