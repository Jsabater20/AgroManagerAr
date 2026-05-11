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
exports.CampaniasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CampaniasService = class CampaniasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(usuarioId) {
        return this.prisma.campania.findMany({
            where: { usuarioId },
            include: {
                siembras: {
                    include: {
                        tipoCultivo: { select: { nombre: true } },
                        lote: { include: { campo: { select: { nombre: true } } } },
                        cosechas: true,
                    },
                },
            },
            orderBy: { fechaInicio: 'desc' },
        });
    }
    async findOne(id, usuarioId) {
        const c = await this.prisma.campania.findFirst({
            where: { id, usuarioId },
            include: {
                siembras: {
                    include: {
                        tipoCultivo: { select: { nombre: true } },
                        lote: { include: { campo: { select: { nombre: true } } } },
                        cosechas: true,
                    },
                },
            },
        });
        if (!c)
            throw new common_1.NotFoundException('Campaña no encontrada');
        return c;
    }
    create(usuarioId, dto) {
        return this.prisma.campania.create({
            data: {
                ...dto,
                usuarioId,
                fechaInicio: new Date(dto.fechaInicio),
                fechaFin: dto.fechaFin ? new Date(dto.fechaFin) : undefined,
            },
        });
    }
    async update(id, usuarioId, dto) {
        await this.findOne(id, usuarioId);
        const data = { ...dto };
        if (dto.fechaInicio)
            data['fechaInicio'] = new Date(dto.fechaInicio);
        if (dto.fechaFin)
            data['fechaFin'] = new Date(dto.fechaFin);
        return this.prisma.campania.update({ where: { id }, data });
    }
    async remove(id, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.campania.delete({ where: { id } });
    }
    async asignarSiembras(id, usuarioId, siembraIds) {
        await this.findOne(id, usuarioId);
        await this.prisma.siembra.updateMany({
            where: { id: { in: siembraIds } },
            data: { campaniaId: id },
        });
        return this.findOne(id, usuarioId);
    }
};
exports.CampaniasService = CampaniasService;
exports.CampaniasService = CampaniasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CampaniasService);
//# sourceMappingURL=campanias.service.js.map