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
exports.FinanzasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinanzasService = class FinanzasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(usuarioId) {
        return this.prisma.movimientoFinanciero.findMany({
            where: { usuarioId },
            include: {
                campo: { select: { id: true, nombre: true } },
                siembra: {
                    select: { id: true, tipoCultivo: { select: { nombre: true } } },
                },
            },
            orderBy: { fecha: 'desc' },
        });
    }
    async findOne(id, usuarioId) {
        const m = await this.prisma.movimientoFinanciero.findFirst({
            where: { id, usuarioId },
        });
        if (!m)
            throw new common_1.NotFoundException('Movimiento no encontrado');
        return m;
    }
    create(usuarioId, dto) {
        return this.prisma.movimientoFinanciero.create({
            data: { ...dto, usuarioId, fecha: new Date(dto.fecha) },
            include: { campo: { select: { id: true, nombre: true } } },
        });
    }
    async update(id, usuarioId, dto) {
        await this.findOne(id, usuarioId);
        const data = { ...dto };
        if (dto.fecha)
            data['fecha'] = new Date(dto.fecha);
        return this.prisma.movimientoFinanciero.update({ where: { id }, data });
    }
    async remove(id, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.movimientoFinanciero.delete({ where: { id } });
    }
    async resumen(usuarioId) {
        const movimientos = await this.prisma.movimientoFinanciero.findMany({
            where: { usuarioId },
        });
        const ingresos = movimientos
            .filter((m) => m.tipo === 'INGRESO')
            .reduce((a, m) => a + m.monto, 0);
        const egresos = movimientos
            .filter((m) => m.tipo === 'EGRESO')
            .reduce((a, m) => a + m.monto, 0);
        return { ingresos, egresos, saldo: ingresos - egresos };
    }
};
exports.FinanzasService = FinanzasService;
exports.FinanzasService = FinanzasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanzasService);
//# sourceMappingURL=finanzas.service.js.map