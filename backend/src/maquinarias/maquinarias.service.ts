import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateGastoDto,
  CreateMaquinariaDto,
  CreateMantenimientoDto,
  UpdateMaquinariaDto,
} from './dto/maquinarias.dto';

@Injectable()
export class MaquinariasService {
  constructor(private prisma: PrismaService) {}

  async findAll(usuarioId: number, organizacionId: number, usuarioOrganizacionId?: number) {
    let whereClause: any = { organizacionId };

    // Si viene usuarioOrganizacionId, filtrar por maquinarias asignadas
    if (usuarioOrganizacionId) {
      whereClause = {
        organizacionId,
        // Nota: si no hay AsignacionMaquinaria, solo mostrar al owner
        usuarioId: undefined, // Cambiar lógica si existe junction table
      };
      // Por ahora, retornar vacío si no es owner (no existe junction table de asignaciones)
      // TODO: Crear tabla AsignacionMaquinaria si se necesita reasignar maquinarias
    } else {
      // Owner ve todas las maquinarias de la org
      whereClause = { organizacionId };
    }

    return this.prisma.maquinaria.findMany({
      where: whereClause,
      include: {
        campo: { select: { id: true, nombre: true } },
        mantenimientos: {
          orderBy: { fecha: 'desc' },
          take: 1,
        },
        gastos: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    const maquinaria = await this.prisma.maquinaria.findUnique({
      where: { id },
      include: {
        campo: { select: { id: true, nombre: true } },
        mantenimientos: { orderBy: { fecha: 'desc' } },
        gastos: { orderBy: { fecha: 'desc' } },
      },
    });
    if (!maquinaria) throw new NotFoundException('Maquinaria no encontrada');
    if (maquinaria.organizacionId !== organizacionId)
      throw new ForbiddenException('No autorizado');
    return maquinaria;
  }

  create(usuarioId: number, organizacionId: number, dto: CreateMaquinariaDto) {
    return this.prisma.maquinaria.create({
      data: {
        ...dto,
        usuarioId,
        organizacionId,
        seguroVencimiento: dto.seguroVencimiento
          ? new Date(dto.seguroVencimiento)
          : undefined,
        vtvVencimiento: dto.vtvVencimiento
          ? new Date(dto.vtvVencimiento)
          : undefined,
      },
    });
  }

  async update(
    id: number,
    usuarioId: number,
    organizacionId: number,
    dto: UpdateMaquinariaDto,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.maquinaria.update({
      where: { id },
      data: {
        ...dto,
        seguroVencimiento: dto.seguroVencimiento
          ? new Date(dto.seguroVencimiento)
          : undefined,
        vtvVencimiento: dto.vtvVencimiento
          ? new Date(dto.vtvVencimiento)
          : undefined,
      },
    });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.maquinaria.delete({ where: { id } });
  }

  // ── Mantenimientos ────────────────────────────────────────────────────────

  async addMantenimiento(
    maquinariaId: number,
    usuarioId: number,
    organizacionId: number,
    dto: CreateMantenimientoDto,
  ) {
    await this.findOne(maquinariaId, usuarioId, organizacionId);
    const mantenimiento = await this.prisma.mantenimientoMaquinaria.create({
      data: {
        ...dto,
        maquinariaId,
        fecha: new Date(dto.fecha),
        proximoMantenimiento: dto.proximoMantenimiento
          ? new Date(dto.proximoMantenimiento)
          : undefined,
      },
    });
    // Actualizar horasUso en la maquinaria si se informaron
    if (dto.horasUso !== undefined) {
      await this.prisma.maquinaria.update({
        where: { id: maquinariaId },
        data: { horasUso: dto.horasUso },
      });
    }
    return mantenimiento;
  }

  async removeMantenimiento(
    maquinariaId: number,
    mantenimientoId: number,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(maquinariaId, usuarioId, organizacionId);
    const m = await this.prisma.mantenimientoMaquinaria.findUnique({
      where: { id: mantenimientoId },
    });
    if (!m || m.maquinariaId !== maquinariaId)
      throw new NotFoundException('Mantenimiento no encontrado');
    return this.prisma.mantenimientoMaquinaria.delete({
      where: { id: mantenimientoId },
    });
  }

  // ── Gastos ────────────────────────────────────────────────────────────────

  async addGasto(
    maquinariaId: number,
    usuarioId: number,
    organizacionId: number,
    dto: CreateGastoDto,
  ) {
    await this.findOne(maquinariaId, usuarioId, organizacionId);
    return this.prisma.gastoMaquinaria.create({
      data: {
        ...dto,
        maquinariaId,
        fecha: new Date(dto.fecha),
      },
    });
  }

  async removeGasto(
    maquinariaId: number,
    gastoId: number,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(maquinariaId, usuarioId, organizacionId);
    const g = await this.prisma.gastoMaquinaria.findUnique({
      where: { id: gastoId },
    });
    if (!g || g.maquinariaId !== maquinariaId)
      throw new NotFoundException('Gasto no encontrado');
    return this.prisma.gastoMaquinaria.delete({ where: { id: gastoId } });
  }
}
