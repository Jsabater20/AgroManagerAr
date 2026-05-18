import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { MercadoPagoConfig, PreApproval, PreApprovalPlan } from 'mercadopago';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

const LIMITES_FREE = {
  campos: 1,
  lotesPerCampo: 3,
  animales: 20,
  siembras: 10,
};

@Injectable()
export class PlanService {
  private frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';
  private mpPlanId = process.env.MP_PLAN_ID ?? '';

  private getMPClient() {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) throw new Error('MP_ACCESS_TOKEN no configurado');
    return new MercadoPagoConfig({ accessToken: token });
  }

  constructor(private prisma: PrismaService) {}

  getLimitesFree() {
    return LIMITES_FREE;
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

  // Crear plan en MP (ejecutar una vez desde /api/plan/setup)
  async crearPlanMP() {
    const client = this.getMPClient();
    const preApprovalPlan = new PreApprovalPlan(client);
    const result = await preApprovalPlan.create({
      body: {
        reason: 'AgroManager AR Pro',
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 12,
          currency_id: 'USD',
        },
        payment_methods_allowed: {
          payment_types: [{ id: 'credit_card' }, { id: 'debit_card' }],
        },
        back_url: `${this.frontendUrl}/precios?status=success`,
      },
    });
    return { id: result.id, status: result.status };
  }

  async crearCheckout(usuarioId: number, email: string) {
    const client = this.getMPClient();
    const preApproval = new PreApproval(client);
    const result = await preApproval.create({
      body: {
        preapproval_plan_id: this.mpPlanId,
        reason: 'AgroManager AR Pro',
        payer_email: email,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 12,
          currency_id: 'USD',
        },
        back_url: `${this.frontendUrl}/precios?status=success`,
        external_reference: String(usuarioId),
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

    const usuarioId = parseInt(suscripcion.external_reference ?? '0');
    if (!usuarioId) return { ok: true };

    const status = suscripcion.status;
    if (status === 'authorized') {
      const expira = new Date();
      expira.setDate(expira.getDate() + 35);
      await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: {
          plan: 'PRO',
          planExpira: expira,
          mpSuscripcionId: suscripcionId,
        },
      });
    } else if (status === 'cancelled' || status === 'paused') {
      await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: { plan: 'FREE', planExpira: null },
      });
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
    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { plan: 'FREE', planExpira: null, mpSuscripcionId: null },
    });
    return { ok: true };
  }

  // ─── Stripe ────────────────────────────────────────────────────────────────

  private getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY no configurado');
    return new Stripe(key);
  }

  async crearCheckoutStripe(usuarioId: number, email: string) {
    const stripe = this.getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 1200, // $12.00
            recurring: { interval: 'month' },
            product_data: { name: 'AgroManager AR Pro' },
          },
          quantity: 1,
        },
      ],
      metadata: { userId: String(usuarioId) },
      success_url: `${this.frontendUrl}/precios?status=success`,
      cancel_url: `${this.frontendUrl}/precios?status=cancel`,
    });
    return { url: session.url };
  }

  async procesarWebhookStripe(payload: Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET no configurado');

    const stripe = this.getStripe();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let event: any;
    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch {
      throw new BadRequestException('Webhook signature inválida');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = parseInt(session.metadata?.userId ?? '0');
      if (userId && session.subscription) {
        const expira = new Date();
        expira.setDate(expira.getDate() + 35);
        await this.prisma.usuario.update({
          where: { id: userId },
          data: {
            plan: 'PRO',
            planExpira: expira,
            mpSuscripcionId: String(session.subscription),
          },
        });
      }
    } else if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      await this.prisma.usuario.updateMany({
        where: { mpSuscripcionId: sub.id },
        data: { plan: 'FREE', planExpira: null, mpSuscripcionId: null },
      });
    } else if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object;
      if (invoice.subscription) {
        await this.prisma.usuario.updateMany({
          where: { mpSuscripcionId: String(invoice.subscription) },
          data: { plan: 'FREE', planExpira: null },
        });
      }
    }

    return { ok: true };
  }

  async cancelarSuscripcionStripe(usuarioId: number) {
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { mpSuscripcionId: true },
    });
    if (u?.mpSuscripcionId?.startsWith('sub_')) {
      const stripe = this.getStripe();
      await stripe.subscriptions.cancel(u.mpSuscripcionId);
    }
    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { plan: 'FREE', planExpira: null, mpSuscripcionId: null },
    });
    return { ok: true };
  }
}
