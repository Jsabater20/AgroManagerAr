"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const mercadopago_1 = require("mercadopago");
const prisma_service_1 = require("../prisma/prisma.service");
const LIMITES_FREE = {
    campos: 1,
    lotesPerCampo: 3,
    animales: 20,
    siembras: 10,
};
let PlanService = class PlanService {
    prisma;
    frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';
    mpPlanId = process.env.MP_PLAN_ID ?? '';
    getMPClient() {
        const token = process.env.MP_ACCESS_TOKEN;
        if (!token)
            throw new Error('MP_ACCESS_TOKEN no configurado');
        return new mercadopago_1.MercadoPagoConfig({ accessToken: token });
    }
    constructor(prisma) {
        this.prisma = prisma;
    }
    getLimitesFree() {
        return LIMITES_FREE;
    }
    async getUsuarioPlan(usuarioId) {
        const u = await this.prisma.usuario.findUnique({
            where: { id: usuarioId },
            select: { plan: true, planExpira: true, mpSuscripcionId: true },
        });
        return u;
    }
    async isPro(usuarioId) {
        const u = await this.prisma.usuario.findUnique({
            where: { id: usuarioId },
            select: { plan: true, planExpira: true },
        });
        if (!u || u.plan !== 'PRO')
            return false;
        if (u.planExpira && u.planExpira < new Date()) {
            await this.prisma.usuario.update({
                where: { id: usuarioId },
                data: { plan: 'FREE' },
            });
            return false;
        }
        return true;
    }
    async checkCamposLimit(usuarioId) {
        if (await this.isPro(usuarioId))
            return;
        const count = await this.prisma.campo.count({ where: { usuarioId } });
        if (count >= LIMITES_FREE.campos) {
            throw new common_1.ForbiddenException(`Plan Free: máximo ${LIMITES_FREE.campos} campo. Actualizá a Pro para agregar más.`);
        }
    }
    async checkLotesLimit(campoId, usuarioId) {
        if (await this.isPro(usuarioId))
            return;
        const count = await this.prisma.lote.count({ where: { campoId } });
        if (count >= LIMITES_FREE.lotesPerCampo) {
            throw new common_1.ForbiddenException(`Plan Free: máximo ${LIMITES_FREE.lotesPerCampo} lotes por campo. Actualizá a Pro para agregar más.`);
        }
    }
    async checkAnimalesLimit(usuarioId) {
        if (await this.isPro(usuarioId))
            return;
        const count = await this.prisma.animal.count({ where: { usuarioId } });
        if (count >= LIMITES_FREE.animales) {
            throw new common_1.ForbiddenException(`Plan Free: máximo ${LIMITES_FREE.animales} animales. Actualizá a Pro para agregar más.`);
        }
    }
    async checkSiembrasLimit(usuarioId) {
        if (await this.isPro(usuarioId))
            return;
        const count = await this.prisma.siembra.count({
            where: { lote: { campo: { usuarioId } } },
        });
        if (count >= LIMITES_FREE.siembras) {
            throw new common_1.ForbiddenException(`Plan Free: máximo ${LIMITES_FREE.siembras} siembras. Actualizá a Pro para agregar más.`);
        }
    }
    async crearPlanMP() {
        const client = this.getMPClient();
        const preApprovalPlan = new mercadopago_1.PreApprovalPlan(client);
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
    async crearCheckout(usuarioId, email) {
        const client = this.getMPClient();
        const preApproval = new mercadopago_1.PreApproval(client);
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
    async procesarWebhook(body) {
        if (body.type !== 'subscription_preapproval')
            return { ok: true };
        const dataObj = body.data;
        const suscripcionId = dataObj?.id;
        if (!suscripcionId)
            return { ok: true };
        const client = this.getMPClient();
        const preApproval = new mercadopago_1.PreApproval(client);
        const suscripcion = await preApproval.get({ id: suscripcionId });
        const usuarioId = parseInt(suscripcion.external_reference ?? '0');
        if (!usuarioId)
            return { ok: true };
        const status = suscripcion.status;
        if (status === 'authorized') {
            const expira = new Date();
            expira.setDate(expira.getDate() + 35);
            await this.prisma.usuario.update({
                where: { id: usuarioId },
                data: { plan: 'PRO', planExpira: expira, mpSuscripcionId: suscripcionId },
            });
        }
        else if (status === 'cancelled' || status === 'paused') {
            await this.prisma.usuario.update({
                where: { id: usuarioId },
                data: { plan: 'FREE', planExpira: null },
            });
        }
        return { ok: true };
    }
    async cancelarSuscripcion(usuarioId) {
        const u = await this.prisma.usuario.findUnique({
            where: { id: usuarioId },
            select: { mpSuscripcionId: true },
        });
        if (u?.mpSuscripcionId) {
            const client = this.getMPClient();
            const preApproval = new mercadopago_1.PreApproval(client);
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
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanService);
//# sourceMappingURL=plan.service.js.map