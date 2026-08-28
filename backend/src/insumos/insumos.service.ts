import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInsumoDto, UpdateInsumoDto } from './dto/insumos.dto';
import { MemberAccessService } from '../organizations/member-access.service';

@Injectable()
export class InsumosService {
  constructor(
    private prisma: PrismaService,
    private memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    await this.requireInsumosAccess(usuarioId, organizacionId);
    return this.prisma.insumo.findMany({ orderBy: { nombre: 'asc' } });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    await this.requireInsumosAccess(usuarioId, organizacionId);
    const insumo = await this.prisma.insumo.findUnique({ where: { id } });
    if (!insumo) throw new NotFoundException('Insumo no encontrado');
    return insumo;
  }

  async create(
    dto: CreateInsumoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.requireInsumosAccess(usuarioId, organizacionId);
    return this.prisma.insumo.create({ data: dto });
  }

  async update(
    id: number,
    dto: UpdateInsumoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.insumo.update({ where: { id }, data: dto });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.insumo.delete({ where: { id } });
  }

  private requireInsumosAccess(usuarioId: number, organizacionId: number) {
    return this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Insumos',
    );
  }
}
