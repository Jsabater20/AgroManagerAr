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

  findAll(usuarioId: number) {
    return this.prisma.maquinaria.findMany({
      where: { usuarioId },
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

  async findOne(id: number, usuarioId: number) {
    const maquinaria = await this.prisma.maquinaria.findUnique({
      where: { id },
      include: {
        campo: { select: { id: true, nombre: true } },
        mantenimientos: { orderBy: { fecha: 'desc' } },
        gastos: { orderBy: { fecha: 'desc' } },
      },
    });
    if (!maquinaria) throw new NotFoundException('Maquinaria no encontrada');
    if (maquinaria.usuarioId !== usuarioId)
      throw new ForbiddenException('No autorizado');
    return maquinaria;
  }

  create(usuarioId: number, dto: CreateMaquinariaDto) {
    return this.prisma.maquinaria.create({
      data: {
        ...dto,
        usuarioId,
        seguroVencimiento: dto.seguroVencimiento
          ? new Date(dto.seguroVencimiento)
          : undefined,
        vtvVencimiento: dto.vtvVencimiento
          ? new Date(dto.vtvVencimiento)
          : undefined,
      },
    });
  }

  async update(id: number, usuarioId: number, dto: UpdateMaquinariaDto) {
    await this.findOne(id, usuarioId);
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

  async remove(id: number, usuarioId: number) {
    await this.findOne(id, usuarioId);
    return this.prisma.maquinaria.delete({ where: { id } });
  }

  // ── Mantenimientos ────────────────────────────────────────────────────────

  async addMantenimiento(
    maquinariaId: number,
    usuarioId: number,
    dto: CreateMantenimientoDto,
  ) {
    await this.findOne(maquinariaId, usuarioId);
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
  ) {
    await this.findOne(maquinariaId, usuarioId);
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
    dto: CreateGastoDto,
  ) {
    await this.findOne(maquinariaId, usuarioId);
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
  ) {
    await this.findOne(maquinariaId, usuarioId);
    const g = await this.prisma.gastoMaquinaria.findUnique({
      where: { id: gastoId },
    });
    if (!g || g.maquinariaId !== maquinariaId)
      throw new NotFoundException('Gasto no encontrado');
    return this.prisma.gastoMaquinaria.delete({ where: { id: gastoId } });
  }
}
