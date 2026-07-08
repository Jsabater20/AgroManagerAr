import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto/finanzas.dto';

@Injectable()
export class FinanzasService {
  constructor(private prisma: PrismaService) {}

  findAll(usuarioId: number, organizacionId: number) {
    return this.prisma.movimientoFinanciero.findMany({
      where: { usuarioId, organizacionId },
      include: {
        campo: { select: { id: true, nombre: true } },
        siembra: {
          select: { id: true, tipoCultivo: { select: { nombre: true } } },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    const m = await this.prisma.movimientoFinanciero.findFirst({
      where: { id, usuarioId, organizacionId },
    });
    if (!m) throw new NotFoundException('Movimiento no encontrado');
    return m;
  }

  create(usuarioId: number, organizacionId: number, dto: CreateMovimientoDto) {
    return this.prisma.movimientoFinanciero.create({
      data: {
        ...dto,
        usuarioId,
        organizacionId,
        fecha: new Date(dto.fecha),
      },
      include: { campo: { select: { id: true, nombre: true } } },
    });
  }

  async update(
    id: number,
    usuarioId: number,
    organizacionId: number,
    dto: UpdateMovimientoDto,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    const data: Record<string, unknown> = { ...dto };
    if (dto.fecha) data['fecha'] = new Date(dto.fecha);
    return this.prisma.movimientoFinanciero.update({ where: { id }, data });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.movimientoFinanciero.delete({ where: { id } });
  }

  async resumen(usuarioId: number, organizacionId: number) {
    const movimientos = await this.prisma.movimientoFinanciero.findMany({
      where: { usuarioId, organizacionId },
    });
    const ingresos = movimientos
      .filter((m) => m.tipo === 'INGRESO')
      .reduce((a, m) => a + m.monto, 0);
    const egresos = movimientos
      .filter((m) => m.tipo === 'EGRESO')
      .reduce((a, m) => a + m.monto, 0);
    return { ingresos, egresos, saldo: ingresos - egresos };
  }
}
