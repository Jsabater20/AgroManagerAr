import { Injectable, ForbiddenException } from '@nestjs/common';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}
