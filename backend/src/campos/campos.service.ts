import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCampoDto,
  UpdateCampoDto,
  CreateLoteDto,
} from './dto/campos.dto';

@Injectable()
export class CamposService {
  constructor(private prisma: PrismaService) {}

  async findAll(usuarioId: number) {
    return this.prisma.campo.findMany({
      where: { usuarioId },
      include: { lotes: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number) {
    const campo = await this.prisma.campo.findUnique({
      where: { id },
      include: {
        lotes: {
          include: {
            siembras: {
              include: { tipoCultivo: true },
              orderBy: { fechaSiembra: 'desc' },
            },
          },
        },
      },
    });
    if (!campo) throw new NotFoundException('Campo no encontrado');
    if (campo.usuarioId !== usuarioId) throw new ForbiddenException();
    return campo;
  }

  async create(dto: CreateCampoDto, usuarioId: number) {
    return this.prisma.campo.create({
      data: { ...dto, usuarioId },
      include: { lotes: true },
    });
  }

  async update(id: number, dto: UpdateCampoDto, usuarioId: number) {
    await this.findOne(id, usuarioId);
    return this.prisma.campo.update({
      where: { id },
      data: dto,
      include: { lotes: true },
    });
  }

  async remove(id: number, usuarioId: number) {
    await this.findOne(id, usuarioId);
    return this.prisma.campo.delete({ where: { id } });
  }

  async addLote(campoId: number, dto: CreateLoteDto, usuarioId: number) {
    await this.findOne(campoId, usuarioId);
    return this.prisma.lote.create({
      data: { ...dto, campoId },
    });
  }
}
