import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInsumoDto, UpdateInsumoDto } from './dto/insumos.dto';

@Injectable()
export class InsumosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.insumo.findMany({ orderBy: { nombre: 'asc' } });
  }

  async findOne(id: number) {
    const insumo = await this.prisma.insumo.findUnique({ where: { id } });
    if (!insumo) throw new NotFoundException('Insumo no encontrado');
    return insumo;
  }

  create(dto: CreateInsumoDto) {
    return this.prisma.insumo.create({ data: dto });
  }

  async update(id: number, dto: UpdateInsumoDto) {
    await this.findOne(id);
    return this.prisma.insumo.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.insumo.delete({ where: { id } });
  }
}
