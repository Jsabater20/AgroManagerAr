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
exports.GanadoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const plan_service_1 = require("../plan/plan.service");
const GESTATION_DAYS = {
    BOVINO: 283,
    PORCINO: 114,
    EQUINO: 340,
    OVINO: 147,
    CAPRINO: 150,
    AVIAR: 21,
};
let GanadoService = class GanadoService {
    prisma;
    planService;
    constructor(prisma, planService) {
        this.prisma = prisma;
        this.planService = planService;
    }
    findAll(usuarioId) {
        return this.prisma.animal.findMany({
            where: { usuarioId },
            include: { preneces: { orderBy: { createdAt: 'desc' } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, usuarioId) {
        const animal = await this.prisma.animal.findUnique({
            where: { id },
            include: { preneces: { orderBy: { createdAt: 'desc' } } },
        });
        if (!animal)
            throw new common_1.NotFoundException('Animal no encontrado');
        if (animal.usuarioId !== usuarioId)
            throw new common_1.ForbiddenException();
        return animal;
    }
    async create(dto, usuarioId) {
        await this.planService.checkAnimalesLimit(usuarioId);
        return this.prisma.animal.create({
            data: {
                nombre: dto.nombre,
                especie: dto.especie,
                sexo: dto.sexo,
                categoria: dto.categoria,
                peso: dto.peso,
                fechaNacimiento: dto.fechaNacimiento
                    ? new Date(dto.fechaNacimiento)
                    : undefined,
                observaciones: dto.observaciones,
                usuarioId,
            },
            include: { preneces: true },
        });
    }
    async update(id, dto, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.animal.update({
            where: { id },
            data: {
                nombre: dto.nombre,
                categoria: dto.categoria,
                peso: dto.peso,
                fechaNacimiento: dto.fechaNacimiento
                    ? new Date(dto.fechaNacimiento)
                    : undefined,
                observaciones: dto.observaciones,
            },
            include: { preneces: true },
        });
    }
    async remove(id, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.animal.delete({ where: { id } });
    }
    async addPrenez(animalId, dto, usuarioId) {
        const animal = await this.findOne(animalId, usuarioId);
        const fechaInicio = new Date(dto.fechaInicio);
        const days = GESTATION_DAYS[animal.especie] ?? 283;
        const fechaEstimadaParto = new Date(fechaInicio);
        fechaEstimadaParto.setDate(fechaEstimadaParto.getDate() + days);
        return this.prisma.prenez.create({
            data: {
                animalId,
                fechaInicio,
                fechaEstimadaParto,
                observaciones: dto.observaciones,
            },
        });
    }
    async updatePrenezEstado(prenezId, dto, usuarioId) {
        const prenez = await this.prisma.prenez.findUnique({
            where: { id: prenezId },
            include: { animal: true },
        });
        if (!prenez)
            throw new common_1.NotFoundException('Preñez no encontrada');
        if (prenez.animal.usuarioId !== usuarioId)
            throw new common_1.ForbiddenException();
        return this.prisma.prenez.update({
            where: { id: prenezId },
            data: { estado: dto.estado },
        });
    }
    async getPesos(animalId, usuarioId) {
        await this.findOne(animalId, usuarioId);
        return this.prisma.registroPeso.findMany({
            where: { animalId },
            orderBy: { fecha: 'asc' },
        });
    }
    async addPeso(animalId, dto, usuarioId) {
        await this.findOne(animalId, usuarioId);
        const registro = await this.prisma.registroPeso.create({
            data: {
                animalId,
                peso: dto.peso,
                fecha: new Date(dto.fecha),
                observaciones: dto.observaciones,
            },
        });
        await this.prisma.animal.update({
            where: { id: animalId },
            data: { peso: dto.peso },
        });
        return registro;
    }
    async removePeso(pesoId, usuarioId) {
        const registro = await this.prisma.registroPeso.findUnique({
            where: { id: pesoId },
            include: { animal: true },
        });
        if (!registro)
            throw new common_1.NotFoundException('Registro de peso no encontrado');
        if (registro.animal.usuarioId !== usuarioId)
            throw new common_1.ForbiddenException();
        return this.prisma.registroPeso.delete({ where: { id: pesoId } });
    }
};
exports.GanadoService = GanadoService;
exports.GanadoService = GanadoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        plan_service_1.PlanService])
], GanadoService);
//# sourceMappingURL=ganado.service.js.map