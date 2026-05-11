import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTareaDto, UpdateTareaDto, UpdateTareaEstadoDto } from './dto/tareas.dto';

@Injectable()
export class TareasService {
  constructor(private prisma: PrismaService) {}

  findAll(usuarioId: number) {
    return this.prisma.tareaRural.findMany({
      where: { usuarioId },
      include: { campo: { select: { id: true, nombre: true } } },
      orderBy: [{ fechaProgramada: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: number, usuarioId: number) {
    const tarea = await this.prisma.tareaRural.findUnique({
      where: { id },
      include: { campo: { select: { id: true, nombre: true } } },
    });
    if (!tarea) throw new NotFoundException('Tarea no encontrada');
    if (tarea.usuarioId !== usuarioId) throw new ForbiddenException();
    return tarea;
  }

  create(dto: CreateTareaDto, usuarioId: number) {
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

  async update(id: number, dto: UpdateTareaDto, usuarioId: number) {
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

  async updateEstado(id: number, dto: UpdateTareaEstadoDto, usuarioId: number) {
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

  async remove(id: number, usuarioId: number) {
    await this.findOne(id, usuarioId);
    return this.prisma.tareaRural.delete({ where: { id } });
  }
}
