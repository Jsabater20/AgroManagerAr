import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { CreateRegistroOrdeneDto } from './dto/tambo.dto';

@Injectable()
export class TamboService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    await this.requireAccess(usuarioId, organizacionId);
    return this.prisma.registroOrdene.findMany({
      where: { organizacionId },
      include: {
        animal: { select: { id: true, nombre: true, categoria: true } },
        usuario: { select: { id: true, nombre: true, apellido: true } },
      },
      orderBy: [{ fecha: 'desc' }, { createdAt: 'desc' }],
      take: 150,
    });
  }

  async resumen(usuarioId: number, organizacionId: number) {
    await this.requireAccess(usuarioId, organizacionId);
    const today = new Date();
    const inicioDia = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const inicioMes = new Date(today.getFullYear(), today.getMonth(), 1);

    const [hoy, mes, totalVacas] = await Promise.all([
      this.prisma.registroOrdene.aggregate({
        where: { organizacionId, fecha: { gte: inicioDia } },
        _sum: { litros: true },
        _count: true,
      }),
      this.prisma.registroOrdene.aggregate({
        where: { organizacionId, fecha: { gte: inicioMes } },
        _sum: { litros: true },
        _count: true,
      }),
      this.prisma.animal.count({
        where: { organizacionId, especie: 'BOVINO', sexo: 'HEMBRA' },
      }),
    ]);

    return {
      litrosHoy: hoy._sum.litros ?? 0,
      registrosHoy: hoy._count,
      litrosMes: mes._sum.litros ?? 0,
      registrosMes: mes._count,
      vacasRegistradas: totalVacas,
    };
  }

  async create(
    dto: CreateRegistroOrdeneDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.requireAccess(usuarioId, organizacionId);
    if (dto.animalId) {
      const animal = await this.prisma.animal.findFirst({
        where: {
          id: dto.animalId,
          organizacionId,
          especie: 'BOVINO',
          sexo: 'HEMBRA',
        },
        select: { id: true },
      });
      if (!animal) {
        throw new NotFoundException('Seleccioná una vaca registrada en este establecimiento');
      }
    }

    return this.prisma.registroOrdene.create({
      data: {
        organizacionId,
        usuarioId,
        animalId: dto.animalId,
        fecha: new Date(dto.fecha),
        turno: dto.turno,
        litros: dto.litros,
        observaciones: dto.observaciones?.trim() || null,
      },
      include: {
        animal: { select: { id: true, nombre: true, categoria: true } },
        usuario: { select: { id: true, nombre: true, apellido: true } },
      },
    });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    const acceso = await this.requireAccess(usuarioId, organizacionId);
    const registro = await this.prisma.registroOrdene.findFirst({
      where: { id, organizacionId },
      select: { id: true, usuarioId: true },
    });
    if (!registro) throw new NotFoundException('Registro de ordeñe no encontrado');
    if (!acceso.esOwner && registro.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo podés eliminar tus propios registros');
    }
    await this.prisma.registroOrdene.delete({ where: { id } });
  }

  private requireAccess(usuarioId: number, organizacionId: number) {
    return this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'GanaderÃ­a',
    );
  }
}
