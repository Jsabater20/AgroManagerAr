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
exports.SiembrasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const plan_service_1 = require("../plan/plan.service");
let SiembrasService = class SiembrasService {
    prisma;
    planService;
    constructor(prisma, planService) {
        this.prisma = prisma;
        this.planService = planService;
    }
    async findAll(usuarioId) {
        return this.prisma.siembra.findMany({
            where: {
                lote: { campo: { usuarioId } },
            },
            include: {
                lote: { include: { campo: true } },
                tipoCultivo: true,
                cosechas: { orderBy: { fechaCosecha: 'desc' } },
            },
            orderBy: { fechaSiembra: 'desc' },
        });
    }
    async findOne(id, usuarioId) {
        const siembra = await this.prisma.siembra.findUnique({
            where: { id },
            include: {
                lote: { include: { campo: true } },
                tipoCultivo: true,
                cosechas: { orderBy: { fechaCosecha: 'desc' } },
                aplicaciones: {
                    include: { insumo: true },
                    orderBy: { fecha: 'desc' },
                },
            },
        });
        if (!siembra)
            throw new common_1.NotFoundException('Siembra no encontrada');
        if (siembra.lote.campo.usuarioId !== usuarioId)
            throw new common_1.ForbiddenException();
        return siembra;
    }
    async create(dto, usuarioId) {
        const lote = await this.prisma.lote.findUnique({
            where: { id: dto.loteId },
            include: { campo: true },
        });
        if (!lote)
            throw new common_1.NotFoundException('Lote no encontrado');
        if (lote.campo.usuarioId !== usuarioId)
            throw new common_1.ForbiddenException();
        await this.planService.checkSiembrasLimit(usuarioId);
        return this.prisma.siembra.create({
            data: {
                loteId: dto.loteId,
                tipoCultivoId: dto.tipoCultivoId,
                fechaSiembra: new Date(dto.fechaSiembra),
                densidad: dto.densidad,
                observaciones: dto.observaciones,
            },
            include: { lote: true, tipoCultivo: true },
        });
    }
    async update(id, dto, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.siembra.update({
            where: { id },
            data: {
                ...dto,
                fechaSiembra: dto.fechaSiembra ? new Date(dto.fechaSiembra) : undefined,
            },
            include: { lote: true, tipoCultivo: true },
        });
    }
    async addCosecha(siembraId, dto, usuarioId) {
        await this.findOne(siembraId, usuarioId);
        return this.prisma.cosecha.create({
            data: {
                siembraId,
                fechaCosecha: new Date(dto.fechaCosecha),
                rendimientoKgHa: dto.rendimientoKgHa,
                totalKg: dto.totalKg,
                humedad: dto.humedad,
                observaciones: dto.observaciones,
            },
        });
    }
    async addAplicacion(siembraId, dto, usuarioId) {
        await this.findOne(siembraId, usuarioId);
        return this.prisma.aplicacionInsumo.create({
            data: {
                siembraId,
                insumoId: dto.insumoId,
                fecha: new Date(dto.fecha),
                cantidad: dto.cantidad,
                unidad: dto.unidad,
                observaciones: dto.observaciones,
            },
            include: { insumo: true },
        });
    }
};
exports.SiembrasService = SiembrasService;
exports.SiembrasService = SiembrasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        plan_service_1.PlanService])
], SiembrasService);
//# sourceMappingURL=siembras.service.js.map