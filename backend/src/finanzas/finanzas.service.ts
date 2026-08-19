import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto/finanzas.dto';

@Injectable()
export class FinanzasService {
  constructor(
    private prisma: PrismaService,
    private memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Finanzas');
    return this.prisma.movimientoFinanciero.findMany({
      where: { organizacionId },
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
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Finanzas');
    const m = await this.prisma.movimientoFinanciero.findFirst({
      where: { id, organizacionId },
    });
    if (!m) throw new NotFoundException('Movimiento no encontrado');
    return m;
  }

  async create(usuarioId: number, organizacionId: number, dto: CreateMovimientoDto) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Finanzas');
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
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Finanzas');
    const movimientos = await this.prisma.movimientoFinanciero.findMany({
      where: { organizacionId },
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
