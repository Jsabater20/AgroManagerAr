import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTipoCultivoDto, UpdateTipoCultivoDto } from './dto/cultivos.dto';

@Injectable()
export class CultivosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipoCultivo.findMany({ orderBy: { nombre: 'asc' } });
  }

  async findOne(id: number) {
    const cultivo = await this.prisma.tipoCultivo.findUnique({ where: { id } });
    if (!cultivo) throw new NotFoundException('Tipo de cultivo no encontrado');
    return cultivo;
  }

  async create(dto: CreateTipoCultivoDto) {
    const existe = await this.prisma.tipoCultivo.findUnique({
      where: { nombre: dto.nombre },
    });
    if (existe) throw new ConflictException('Ya existe ese tipo de cultivo');
    return this.prisma.tipoCultivo.create({ data: dto });
  }

  async update(id: number, dto: UpdateTipoCultivoDto) {
    await this.findOne(id);
    return this.prisma.tipoCultivo.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tipoCultivo.delete({ where: { id } });
  }
}
