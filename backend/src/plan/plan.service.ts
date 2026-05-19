import { Injectable, ForbiddenException } from '@nestjs/common';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';
import { Resend } from 'resend';
import { PrismaService } from '../prisma/prisma.service';

const LIMITES_FREE = {
  campos: 1,
  lotesPerCampo: 3,
  animales: 20,
  siembras: 10,
};

const PRECIOS = {
  mensual: {
    monto: 13990,
    frecuencia: 1,
    label: 'AgroManager AR Pro Mensual',
    descuento: null,
  },
  anual: {
    monto: 153890,
    frecuencia: 12,
    label: 'AgroManager AR Pro Anual',
    descuento: 'Ahorrá un 16% con el plan anual',
  },
};

const TRIAL_DIAS = 14;

@Injectable()
export class PlanService {
  private frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';
  private resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;
  private fromEmail =
    process.env.RESEND_FROM_EMAIL ?? 'noreply@agromanagerar.com';

  private getMPClient() {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) throw new Error('MP_ACCESS_TOKEN no configurado');
    return new MercadoPagoConfig({ accessToken: token });
  }

  constructor(private prisma: PrismaService) {}

  getLimitesFree() {
    return LIMITES_FREE;
  }

  getPrecios() {
    return {
      free: { precio: 0, label: 'Gratis', trial: null },
      mensual: {
        precio: PRECIOS.mensual.monto,
        label: 'Pro Mensual',
        descuento: PRECIOS.mensual.descuento,
        trialDias: TRIAL_DIAS,
      },
      anual: {
        precio: PRECIOS.anual.monto,
        label: 'Pro Anual',
        descuento: PRECIOS.anual.descuento,
        trialDias: TRIAL_DIAS,
      },
    };
  }

  async getUsuarioPlan(usuarioId: number) {
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { plan: true, planExpira: true, mpSuscripcionId: true },
    });
    return u;
  }

  async isPro(usuarioId: number): Promise<boolean> {
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { plan: true, planExpira: true },
    });
    if (!u || u.plan !== 'PRO') return false;
    if (u.planExpira && u.planExpira < new Date()) {
      await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: { plan: 'FREE' },
      });
      return false;
    }
    return true;
  }

  async checkCamposLimit(usuarioId: number) {
    if (await this.isPro(usuarioId)) return;
    const count = await this.prisma.campo.count({ where: { usuarioId } });
    if (count >= LIMITES_FREE.campos) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.campos} campo. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkLotesLimit(campoId: number, usuarioId: number) {
    if (await this.isPro(usuarioId)) return;
    const count = await this.prisma.lote.count({ where: { campoId } });
    if (count >= LIMITES_FREE.lotesPerCampo) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.lotesPerCampo} lotes por campo. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkAnimalesLimit(usuarioId: number) {
    if (await this.isPro(usuarioId)) return;
    const count = await this.prisma.animal.count({ where: { usuarioId } });
    if (count >= LIMITES_FREE.animales) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.animales} animales. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkSiembrasLimit(usuarioId: number) {
    if (await this.isPro(usuarioId)) return;
    const count = await this.prisma.siembra.count({
      where: { lote: { campo: { usuarioId } } },
    });
    if (count >= LIMITES_FREE.siembras) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.siembras} siembras. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkProAccess(usuarioId: number, feature: string) {
    if (await this.isPro(usuarioId)) return;
    throw new ForbiddenException(
      `${feature} está disponible solo en el plan Pro. Actualizá para acceder.`,
    );
  }

  async crearCheckout(
    usuarioId: number,
    email: string,
    tipo: 'mensual' | 'anual',
  ) {
    const p = PRECIOS[tipo];
    const client = this.getMPClient();
    const preApproval = new PreApproval(client);
    const result = await preApproval.create({
      body: {
        reason: p.label,
        payer_email: email,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        auto_recurring: {
          frequency: p.frecuencia,
          frequency_type: 'months',
          transaction_amount: p.monto,
          currency_id: 'ARS',
          free_trial: {
            frequency: TRIAL_DIAS,
            frequency_type: 'days',
          },
        } as any,
        back_url: `${this.frontendUrl}/precios?status=success`,
        external_reference: `${usuarioId}:${tipo}`,
        status: 'pending',
      },
    });
    return { init_point: result.init_point, id: result.id };
  }

  async procesarWebhook(body: Record<string, unknown>) {
    if (body.type !== 'subscription_preapproval') return { ok: true };
    const dataObj = body.data as Record<string, unknown> | undefined;
    const suscripcionId = dataObj?.id as string | undefined;
    if (!suscripcionId) return { ok: true };

    const client = this.getMPClient();
    const preApproval = new PreApproval(client);
    const suscripcion = await preApproval.get({ id: suscripcionId });

    const [refId, tipo] = (suscripcion.external_reference ?? '0:mensual').split(
      ':',
    );
    const usuarioId = parseInt(refId);
    if (!usuarioId) return { ok: true };

    const status = suscripcion.status;
    if (status === 'authorized') {
      const expira = new Date();
      // Mensual: +35 días de buffer; Anual: +370 días de buffer
      expira.setDate(expira.getDate() + (tipo === 'anual' ? 370 : 35));
      const usuario = await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: {
          plan: 'PRO',
          planExpira: expira,
          mpSuscripcionId: suscripcionId,
        },
        select: { email: true, nombre: true },
      });
      if (this.resend) {
        this.resend.emails
          .send({
            from: this.fromEmail,
            to: usuario.email,
            subject: '¡Tu suscripción Pro está activa! — AgroManager AR',
            html: this.buildProEmail(
              usuario.nombre,
              tipo as 'mensual' | 'anual',
              expira,
            ),
          })
          .catch(() => {});
      }
    } else if (status === 'cancelled' || status === 'paused') {
      const usuario = await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: { plan: 'FREE', planExpira: null },
        select: { email: true, nombre: true },
      });
      if (this.resend) {
        this.resend.emails
          .send({
            from: this.fromEmail,
            to: usuario.email,
            subject: 'Tu suscripción Pro fue cancelada — AgroManager AR',
            html: this.buildCancelEmail(usuario.nombre),
          })
          .catch(() => {});
      }
    }
    return { ok: true };
  }

  async cancelarSuscripcion(usuarioId: number) {
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { mpSuscripcionId: true },
    });
    if (u?.mpSuscripcionId) {
      const client = this.getMPClient();
      const preApproval = new PreApproval(client);
      await preApproval.update({
        id: u.mpSuscripcionId,
        body: { status: 'cancelled' },
      });
    }
    const usuario = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { plan: 'FREE', planExpira: null, mpSuscripcionId: null },
      select: { email: true, nombre: true },
    });
    if (this.resend) {
      this.resend.emails
        .send({
          from: this.fromEmail,
          to: usuario.email,
          subject: 'Tu suscripción Pro fue cancelada — AgroManager AR',
          html: this.buildCancelEmail(usuario.nombre),
        })
        .catch(() => {});
    }
    return { ok: true };
  }

  private buildProEmail(
    nombre: string,
    tipo: 'mensual' | 'anual',
    expira: Date,
  ): string {
    const precio =
      tipo === 'anual' ? '$153.890 ARS / año' : '$13.990 ARS / mes';
    const renovacion = expira.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return `
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#15803d;padding:28px 32px;text-align:center;">
          <span style="color:#ffffff;font-size:22px;font-weight:700;">🌱 AgroManager AR</span>
          <p style="color:#bbf7d0;margin:6px 0 0;font-size:13px;">Gestión agrícola para Argentina</p>
        </td>
      </tr>

      <!-- Cuerpo -->
      <tr>
        <td style="padding:36px 32px;">
          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:center;">
            <p style="color:#15803d;font-size:20px;font-weight:700;margin:0 0 4px;">⚡ ¡Suscripción Pro activada!</p>
            <p style="color:#166534;font-size:13px;margin:0;">Plan ${tipo === 'anual' ? 'Anual' : 'Mensual'} · ${precio}</p>
          </div>

          <h2 style="color:#111827;font-size:20px;margin:0 0 12px;">Hola, ${nombre} 👋</h2>
          <p style="color:#4b5563;line-height:1.7;margin:0 0 24px;">
            Tu plan Pro está activo. Ahora tenés acceso completo a todas las herramientas
            de <strong>AgroManager AR</strong> sin límites.
          </p>

          <!-- Beneficios Pro -->
          <p style="color:#374151;font-weight:700;font-size:15px;margin:0 0 12px;">Lo que desbloqueaste:</p>
          <table cellpadding="7" cellspacing="0" width="100%">
            <tr><td style="color:#15803d;font-size:16px;width:28px;">⚡</td><td style="color:#4b5563;font-size:14px;"><strong>Campos, lotes y animales ilimitados</strong></td></tr>
            <tr><td style="color:#15803d;font-size:16px;">🤖</td><td style="color:#4b5563;font-size:14px;"><strong>AgroBot IA</strong> — Asistente con contexto de tu establecimiento</td></tr>
            <tr><td style="color:#15803d;font-size:16px;">📊</td><td style="color:#4b5563;font-size:14px;"><strong>Reportes avanzados</strong> y análisis de rentabilidad</td></tr>
            <tr><td style="color:#15803d;font-size:16px;">🌾</td><td style="color:#4b5563;font-size:14px;"><strong>Campañas agrícolas</strong> — Agrupá siembras por temporada</td></tr>
            <tr><td style="color:#15803d;font-size:16px;">📥</td><td style="color:#4b5563;font-size:14px;"><strong>Export CSV/PDF</strong> y historial completo</td></tr>
            <tr><td style="color:#15803d;font-size:16px;">🎯</td><td style="color:#4b5563;font-size:14px;"><strong>Soporte prioritario</strong></td></tr>
          </table>

          <!-- Renovación -->
          <div style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin:28px 0 0;">
            <p style="color:#92400e;font-size:13px;margin:0;">
              📅 Tu suscripción renueva el <strong>${renovacion}</strong>. Podés cancelarla en cualquier momento desde <a href="${this.frontendUrl}/precios" style="color:#92400e;">Planes</a>.
            </p>
          </div>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
            <tr>
              <td style="background:#15803d;border-radius:10px;">
                <a href="${this.frontendUrl}/dashboard"
                   style="display:inline-block;padding:14px 32px;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;">
                  Ir a mi dashboard →
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
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

  private buildCancelEmail(nombre: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#15803d;padding:28px 32px;text-align:center;">
          <span style="color:#ffffff;font-size:22px;font-weight:700;">🌱 AgroManager AR</span>
          <p style="color:#bbf7d0;margin:6px 0 0;font-size:13px;">Gestión agrícola para Argentina</p>
        </td>
      </tr>

      <!-- Cuerpo -->
      <tr>
        <td style="padding:36px 32px;">
          <h2 style="color:#111827;font-size:20px;margin:0 0 12px;">Hola, ${nombre}</h2>
          <p style="color:#4b5563;line-height:1.7;margin:0 0 20px;">
            Tu suscripción <strong>Pro</strong> fue cancelada. Tu cuenta vuelve al plan <strong>Free</strong>.
            Tus datos están seguros — no se borra nada.
          </p>

          <!-- Qué perdés -->
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px 20px;margin:0 0 24px;">
            <p style="color:#991b1b;font-weight:700;font-size:14px;margin:0 0 10px;">Lo que ya no tenés disponible:</p>
            <table cellpadding="5" cellspacing="0">
              <tr><td style="color:#dc2626;font-size:14px;width:22px;">✕</td><td style="color:#6b7280;font-size:13px;">AgroBot IA</td></tr>
              <tr><td style="color:#dc2626;font-size:14px;">✕</td><td style="color:#6b7280;font-size:13px;">Campos y animales ilimitados</td></tr>
              <tr><td style="color:#dc2626;font-size:14px;">✕</td><td style="color:#6b7280;font-size:13px;">Reportes avanzados y export</td></tr>
              <tr><td style="color:#dc2626;font-size:14px;">✕</td><td style="color:#6b7280;font-size:13px;">Campañas agrícolas</td></tr>
            </table>
          </div>

          <p style="color:#4b5563;line-height:1.7;margin:0 0 24px;">
            Si fue un error o querés volver, podés reactivar Pro en cualquier momento con <strong>14 días gratis</strong>.
          </p>

          <!-- CTA volver -->
          <table cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
            <tr>
              <td style="background:#15803d;border-radius:10px;">
                <a href="${this.frontendUrl}/precios"
                   style="display:inline-block;padding:13px 28px;color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;">
                  Reactivar Pro →
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">
            AgroManager AR · <a href="${this.frontendUrl}" style="color:#9ca3af;">www.agromanagerar.com</a>
          </p>
          <p style="color:#d1d5db;font-size:11px;margin:6px 0 0;">Tus datos están seguros y siguen disponibles en tu cuenta Free.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
  }
}
