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
exports.TareasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TareasService = class TareasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(usuarioId) {
        return this.prisma.tareaRural.findMany({
            where: { usuarioId },
            include: { campo: { select: { id: true, nombre: true } } },
            orderBy: [{ fechaProgramada: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async findOne(id, usuarioId) {
        const tarea = await this.prisma.tareaRural.findUnique({
            where: { id },
            include: { campo: { select: { id: true, nombre: true } } },
        });
        if (!tarea)
            throw new common_1.NotFoundException('Tarea no encontrada');
        if (tarea.usuarioId !== usuarioId)
            throw new common_1.ForbiddenException();
        return tarea;
    }
    create(dto, usuarioId) {
        return this.prisma.tareaRural.create({
            data: {
                titulo: dto.titulo,
                descripcion: dto.descripcion,
                tipo: dto.tipo,
                prioridad: dto.prioridad,
                fechaProgramada: new Date(dto.fechaProgramada),
                campoId: dto.campoId,
                observaciones: dto.observaciones,
                usuarioId,
            },
            include: { campo: { select: { id: true, nombre: true } } },
        });
    }
    async update(id, dto, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.tareaRural.update({
            where: { id },
            data: {
                titulo: dto.titulo,
                descripcion: dto.descripcion,
                tipo: dto.tipo,
                prioridad: dto.prioridad,
                fechaProgramada: dto.fechaProgramada ? new Date(dto.fechaProgramada) : undefined,
                campoId: dto.campoId,
                observaciones: dto.observaciones,
            },
            include: { campo: { select: { id: true, nombre: true } } },
        });
    }
    async updateEstado(id, dto, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.tareaRural.update({
            where: { id },
            data: {
                estado: dto.estado,
                fechaCompletada: dto.estado === 'COMPLETADA' ? new Date() : null,
            },
            include: { campo: { select: { id: true, nombre: true } } },
        });
    }
    async remove(id, usuarioId) {
        await this.findOne(id, usuarioId);
        return this.prisma.tareaRural.delete({ where: { id } });
    }
};
exports.TareasService = TareasService;
exports.TareasService = TareasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TareasService);
//# sourceMappingURL=tareas.service.js.map