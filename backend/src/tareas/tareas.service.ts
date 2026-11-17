import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { EstadoTarea, RepetirTarea } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { CreateTareaDto, UpdateTareaDto, UpdateTareaEstadoDto } from './dto/tareas.dto';

@Injectable()
export class TareasService {
  constructor(
    private prisma: PrismaService,
    private memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Tareas');
    return this.prisma.tareaRural.findMany({
      where: { organizacionId },
      include: { campo: { select: { id: true, nombre: true } } },
      orderBy: [{ fechaProgramada: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Tareas');
    const tarea = await this.prisma.tareaRural.findUnique({
      where: { id },
      include: { campo: { select: { id: true, nombre: true } } },
    });
    if (!tarea) throw new NotFoundException('Tarea no encontrada');
    if (tarea.organizacionId !== organizacionId) throw new ForbiddenException();
    return tarea;
  }

  async create(dto: CreateTareaDto, usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Tareas');
    return this.prisma.tareaRural.create({
      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        tipo: dto.tipo,
        prioridad: dto.prioridad,
        fechaProgramada: new Date(dto.fechaProgramada),
        fechaLimite: dto.fechaLimite ? new Date(dto.fechaLimite) : undefined,
        repetir: dto.repetir,
        campoId: dto.campoId,
        observaciones: dto.observaciones,
        usuarioId,
        organizacionId,
      },
      include: { campo: { select: { id: true, nombre: true } } },
    });
  }

  async update(id: number, dto: UpdateTareaDto, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.tareaRural.update({
      where: { id },
      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        tipo: dto.tipo,
        prioridad: dto.prioridad,
        fechaProgramada: dto.fechaProgramada ? new Date(dto.fechaProgramada) : undefined,
        fechaLimite: dto.fechaLimite ? new Date(dto.fechaLimite) : undefined,
        repetir: dto.repetir,
        campoId: dto.campoId,
        observaciones: dto.observaciones,
      },
      include: { campo: { select: { id: true, nombre: true } } },
    });
  }

  async updateEstado(id: number, dto: UpdateTareaEstadoDto, usuarioId: number, organizacionId: number) {
    const tarea = await this.findOne(id, usuarioId, organizacionId);
    const tareaActualizada = await this.prisma.tareaRural.update({
      where: { id },
      data: {
        estado: dto.estado,
        fechaCompletada: dto.estado === 'COMPLETADA' ? new Date() : null,
      },
      include: { campo: { select: { id: true, nombre: true } } },
    });

    const debeCrearSiguiente =
      dto.estado === EstadoTarea.COMPLETADA
      && tarea.estado !== EstadoTarea.COMPLETADA
      && tarea.repetir !== RepetirTarea.UNICA;

    if (!debeCrearSiguiente) return tareaActualizada;

    const fechaProgramada = this.obtenerProximaFecha(tarea.fechaProgramada, tarea.repetir);
    const diferenciaLimite = tarea.fechaLimite
      ? tarea.fechaLimite.getTime() - tarea.fechaProgramada.getTime()
      : null;
    const siguienteTarea = await this.prisma.tareaRural.upsert({
      where: { tareaOrigenId: tarea.id },
      create: {
        usuarioId: tarea.usuarioId,
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        tipo: tarea.tipo,
        prioridad: tarea.prioridad,
        fechaProgramada,
        fechaLimite: diferenciaLimite === null
          ? null
          : new Date(fechaProgramada.getTime() + diferenciaLimite),
        repetir: tarea.repetir,
        campoId: tarea.campoId,
        observaciones: tarea.observaciones,
        organizacionId: tarea.organizacionId,
        tareaOrigenId: tarea.id,
      },
      update: {},
      include: { campo: { select: { id: true, nombre: true } } },
    });

    return { ...tareaActualizada, siguienteTarea };
  }

  private obtenerProximaFecha(fechaBase: Date, repetir: RepetirTarea) {
    let proximaFecha = this.sumarPeriodo(fechaBase, repetir);
    const inicioHoy = new Date();
    inicioHoy.setHours(0, 0, 0, 0);

    while (proximaFecha < inicioHoy) {
      proximaFecha = this.sumarPeriodo(proximaFecha, repetir);
    }

    return proximaFecha;
  }

  private sumarPeriodo(fecha: Date, repetir: RepetirTarea) {
    const siguiente = new Date(fecha);
    if (repetir === RepetirTarea.SEMANAL) {
      siguiente.setDate(siguiente.getDate() + 7);
      return siguiente;
    }
    if (repetir === RepetirTarea.QUINCENAL) {
      siguiente.setDate(siguiente.getDate() + 15);
      return siguiente;
    }

    const dia = siguiente.getDate();
    siguiente.setDate(1);
    siguiente.setMonth(siguiente.getMonth() + 1);
    const ultimoDia = new Date(
      siguiente.getFullYear(),
      siguiente.getMonth() + 1,
      0,
    ).getDate();
    siguiente.setDate(Math.min(dia, ultimoDia));
    return siguiente;
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.tareaRural.delete({ where: { id } });
  }
}
