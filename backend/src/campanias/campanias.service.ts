import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaniaDto, UpdateCampaniaDto } from './dto/campanias.dto';

@Injectable()
export class CampaniasService {
  constructor(private prisma: PrismaService) {}

  findAll(usuarioId: number, organizacionId: number) {
    return this.prisma.campania.findMany({
      where: { usuarioId, organizacionId },
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

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    const c = await this.prisma.campania.findFirst({
      where: { id, usuarioId, organizacionId },
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
    if (!c) throw new NotFoundException('Campaña no encontrada');
    return c;
  }

  create(usuarioId: number, organizacionId: number, dto: CreateCampaniaDto) {
    return this.prisma.campania.create({
      data: {
        ...dto,
        usuarioId,
        organizacionId,
        fechaInicio: new Date(dto.fechaInicio),
        fechaFin: dto.fechaFin ? new Date(dto.fechaFin) : undefined,
      },
    });
  }

  async update(
    id: number,
    usuarioId: number,
    organizacionId: number,
    dto: UpdateCampaniaDto,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    const data: Record<string, unknown> = { ...dto };
    if (dto.fechaInicio) data['fechaInicio'] = new Date(dto.fechaInicio);
    if (dto.fechaFin) data['fechaFin'] = new Date(dto.fechaFin);
    return this.prisma.campania.update({ where: { id }, data });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.campania.delete({ where: { id } });
  }

  async asignarSiembras(
    id: number,
    usuarioId: number,
    organizacionId: number,
    siembraIds: number[],
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    await this.prisma.siembra.updateMany({
      where: { id: { in: siembraIds } },
      data: { campaniaId: id },
    });
    return this.findOne(id, usuarioId, organizacionId);
  }
}
