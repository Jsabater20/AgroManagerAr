import { Injectable, ForbiddenException } from '@nestjs/common';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';
import { Resend } from 'resend';
import { PrismaService } from '../prisma/prisma.service';

const LIMITES_FREE = {
  campos: 1,
  lotesPerCampo: 3,
  animales: 20,
  siembras: 10,
  maquinarias: 5,
};

const PRECIOS = {
  mensual: {
    monto: 13990,
    frecuencia: 1,
    label: 'AgroManager AR Pro Mensual',
    descuento: null,
  },
  anual: {
    monto: 139900,
    frecuencia: 12,
    label: 'AgroManager AR Pro Anual',
    descuento: 'Ahorrá un 16% con el plan anual',
  },
};

const TRIAL_DIAS = 30;

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
      select: {
        plan: true,
        planExpira: true,
        mpSuscripcionId: true,
        trialUsado: true,
      },
    });
    return u;
  }

  async getOrgPlan(organizacionId: number) {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { plan: true },
    });
    if (!org) return null;
    return { plan: org.plan };
  }

  async isPro(usuarioId: number): Promise<boolean> {
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { plan: true, planExpira: true, rol: true },
    });
    if (!u) return false;
    if (u.rol === 'ADMIN') return true;
    if (u.plan !== 'PRO') return false;
    if (u.planExpira && u.planExpira < new Date()) {
      await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: { plan: 'FREE' },
      });
      return false;
    }
    return true;
  }

  async isOrgPro(organizacionId: number): Promise<boolean> {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { plan: true },
    });
    if (!org || org.plan !== 'PRO') return false;
    return true;
  }

  async checkCamposLimit(organizacionId: number) {
    if (await this.isOrgPro(organizacionId)) return;
    const count = await this.prisma.campo.count({ where: { organizacionId } });
    if (count >= LIMITES_FREE.campos) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.campos} campo. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkLotesLimit(organizacionId: number) {
    if (await this.isOrgPro(organizacionId)) return;
    const count = await this.prisma.lote.count({
      where: { campo: { organizacionId } },
    });
    if (count >= LIMITES_FREE.lotesPerCampo) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.lotesPerCampo} lotes por organización. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkAnimalesLimit(organizacionId: number) {
    if (await this.isOrgPro(organizacionId)) return;
    const count = await this.prisma.animal.count({ where: { organizacionId } });
    if (count >= LIMITES_FREE.animales) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.animales} animales. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkSiembrasLimit(organizacionId: number) {
    if (await this.isOrgPro(organizacionId)) return;
    const count = await this.prisma.siembra.count({
      where: { lote: { campo: { organizacionId } } },
    });
    if (count >= LIMITES_FREE.siembras) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.siembras} siembras. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkMaquinariasLimit(organizacionId: number) {
    if (await this.isOrgPro(organizacionId)) return;
    const count = await this.prisma.maquinaria.count({ where: { organizacionId } });
    if (count >= LIMITES_FREE.maquinarias) {
      throw new ForbiddenException(
        `Plan Free: máximo ${LIMITES_FREE.maquinarias} maquinarias. Actualizá a Pro para agregar más.`,
      );
    }
  }

  async checkProAccess(organizacionId: number, feature: string) {
    if (await this.isOrgPro(organizacionId)) return;
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
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { trialUsado: true },
    });
    const client = this.getMPClient();
    const preApproval = new PreApproval(client);
    const autoRecurring: Record<string, unknown> = {
      frequency: p.frecuencia,
      frequency_type: 'months',
      transaction_amount: p.monto,
      currency_id: 'ARS',
    };
    if (!u?.trialUsado) {
      autoRecurring.free_trial = { frequency: TRIAL_DIAS, frequency_type: 'days' };
    }
    const result = await preApproval.create({
      body: {
        reason: p.label,
        payer_email: email,
        auto_recurring: autoRecurring as any,
        back_url: `${this.frontendUrl}/suscripcion-exitosa`,
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

    const [refId, tipo] = (suscripcion.external_reference ?? '').split(':');
    let usuarioId = parseInt(refId);

    if (!usuarioId) {
      const raw = suscripcion as unknown as Record<string, unknown>;
      const payerEmail =
        typeof raw['payer_email'] === 'string' ? raw['payer_email'] : undefined;
      if (!payerEmail) return { ok: true };
      const found = await this.prisma.usuario.findUnique({
        where: { email: payerEmail },
        select: { id: true },
      });
      if (!found) return { ok: true };
      usuarioId = found.id;
    }

    const status = suscripcion.status;
    if (status === 'authorized') {
      const expira = new Date();
      expira.setDate(expira.getDate() + (tipo === 'anual' ? 400 : 45));

      const usuario = await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: {
          plan: 'PRO',
          planExpira: expira,
          mpSuscripcionId: suscripcionId,
          trialUsado: true,
        },
        select: { email: true, nombre: true, plan: true, planExpira: true },
      });

      const org = await this.prisma.organizacion.findFirst({
        where: { propietarioId: usuarioId },
      });

      if (org) {
        await this.prisma.organizacion.update({
          where: { id: org.id },
          data: { plan: 'PRO' },
        });
      }

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

      const org = await this.prisma.organizacion.findFirst({
        where: { propietarioId: usuarioId },
      });

      if (org) {
        await this.prisma.organizacion.update({
          where: { id: org.id },
          data: { plan: 'FREE' },
        });
      }

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

  async verificarYActivar(
    usuarioId: number,
    preapprovalId: string,
  ): Promise<{
    activado: boolean;
    status: string;
    plan?: string;
    planExpira?: Date;
  }> {
    const client = this.getMPClient();
    const preApproval = new PreApproval(client);
    const suscripcion = await preApproval.get({ id: preapprovalId });

    const [refId, tipo] = (suscripcion.external_reference ?? '0:mensual').split(':');
    if (parseInt(refId) !== usuarioId) {
      throw new ForbiddenException(
        'Esta suscripción no pertenece a tu cuenta.',
      );
    }

    const status = suscripcion.status ?? 'unknown';
    if (status !== 'authorized') {
      return { activado: false, status };
    }

    const expira = new Date();
    expira.setDate(expira.getDate() + (tipo === 'anual' ? 400 : 45));

    const usuario = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        plan: 'PRO',
        planExpira: expira,
        mpSuscripcionId: preapprovalId,
        trialUsado: true,
      },
      select: { email: true, nombre: true, plan: true, planExpira: true },
    });

    const org = await this.prisma.organizacion.findFirst({
      where: { propietarioId: usuarioId },
    });

    if (org) {
      await this.prisma.organizacion.update({
        where: { id: org.id },
        data: { plan: 'PRO' },
      });
    }

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

    return {
      activado: true,
      status,
      plan: usuario.plan,
      planExpira: usuario.planExpira ?? undefined,
    };
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

    const org = await this.prisma.organizacion.findFirst({
      where: { propietarioId: usuarioId },
    });

    if (org) {
      await this.prisma.organizacion.update({
        where: { id: org.id },
        data: { plan: 'FREE' },
      });
    }

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
      tipo === 'anual' ? '$139.900 ARS / año' : '$13.990 ARS / mes';
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
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
      <tr style="background:#15803d;">
        <td style="padding:24px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:28px;">¡Bienvenido a Pro!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 24px;">
          <p style="color:#4b5563;line-height:1.7;margin:0 0 24px;">
            Hola <strong>${nombre}</strong>, tu plan Pro está activo. Ahora tenés acceso completo a todas las herramientas de <strong>AgroManager AR</strong> sin límites.
          </p>
          <p style="color:#374151;font-weight:700;font-size:15px;margin:0 0 12px;">Lo que desbloqueaste:</p>
          <table cellpadding="7" cellspacing="0" width="100%">
            <tr><td style="color:#15803d;font-size:16px;width:28px;">⚡</td><td style="color:#4b5563;font-size:14px;"><strong>Campos, lotes y animales ilimitados</strong></td></tr>
            <tr><td style="color:#15803d;font-size:16px;">🤖</td><td style="color:#4b5563;font-size:14px;"><strong>AgroBot IA</strong> — Asistente con contexto de tu establecimiento</td></tr>
            <tr><td style="color:#15803d;font-size:16px;">📊</td><td style="color:#4b5563;font-size:14px;"><strong>Reportes avanzados</strong> y export de datos</td></tr>
            <tr><td style="color:#15803d;font-size:16px;">🎯</td><td style="color:#4b5563;font-size:14px;"><strong>Campañas y gestión integral</strong></td></tr>
            <tr><td style="color:#15803d;font-size:16px;">👥</td><td style="color:#4b5563;font-size:14px;"><strong>Soporte prioritario</strong></td></tr>
          </table>
          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:16px;margin:20px 0;text-align:center;">
            <p style="color:#166534;font-weight:700;font-size:14px;margin:0;">
              ${precio} • ${tipo === 'anual' ? 'Anual' : 'Mensual'}<br/>
              <span style="font-size:12px;color:#4b7c0f;">Próxima renovación: ${renovacion}</span>
            </p>
          </div>
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
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
      <tr style="background:#dc2626;">
        <td style="padding:24px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:28px;">Tu suscripción fue cancelada</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 24px;">
          <p style="color:#4b5563;line-height:1.7;margin:0 0 24px;">
            Hola <strong>${nombre}</strong>, tu suscripción Pro ha sido cancelada.
          </p>
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px 20px;margin:0 0 24px;">
            <p style="color:#991b1b;font-weight:700;font-size:14px;margin:0 0 10px;">Lo que ya no tenés disponible:</p>
            <table cellpadding="5" cellspacing="0">
              <tr><td style="color:#dc2626;font-size:14px;width:22px;">✕</td><td style="color:#6b7280;font-size:13px;">AgroBot IA</td></tr>
              <tr><td style="color:#dc2626;font-size:14px;">✕</td><td style="color:#6b7280;font-size:13px;">Campos y animales ilimitados</td></tr>
              <tr><td style="color:#dc2626;font-size:14px;">✕</td><td style="color:#6b7280;font-size:13px;">Reportes avanzados</td></tr>
              <tr><td style="color:#dc2626;font-size:14px;">✕</td><td style="color:#6b7280;font-size:13px;">Campañas</td></tr>
            </table>
          </div>
          <p style="color:#6b7280;font-size:13px;margin:0;">
            Tus datos están seguros y siguen disponibles en tu cuenta Free. Si cambias de idea, podés reactivar Pro en cualquier momento.
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
