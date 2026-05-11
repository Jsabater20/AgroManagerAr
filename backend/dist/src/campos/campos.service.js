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
exports.CamposService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CamposService = class CamposService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(usuarioId) {
        return this.prisma.campo.findMany({
            where: { usuarioId },
            include: { lotes: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, usuarioId) {
        const campo = await this.prisma.campo.findUnique({
            where: { id },
            include: {
                lotes: {
                    include: {
                        siembras: {
                            include: { tipoCultivo: true },
                            orderBy: { fechaSiembra: 'desc' },
                        },
                    },
                },
            },
        });
        if (!campo)
            throw new common_1.NotFoundException('Campo no encontrado');
        if (campo.usuarioId !== usuarioId)
            throw new common_1.ForbiddenException();
        return campo;
    }
    async create(dto, usuarioId) {
        return this.prisma.campo.create({
            data: { ...dto, usuarioId },
            include: { lotes: true },
        });
    }
    async update(id, dto, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.campo.update({
            where: { id },
            data: dto,
            include: { lotes: true },
        });
    }
    async remove(id, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.campo.delete({ where: { id } });
    }
    async addLote(campoId, dto, usuarioId) {
        await this.findOne(campoId, usuarioId);
        return this.prisma.lote.create({
            data: { ...dto, campoId },
        });
    }
};
exports.CamposService = CamposService;
exports.CamposService = CamposService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CamposService);
//# sourceMappingURL=campos.service.js.map