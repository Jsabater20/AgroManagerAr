import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';
import {
  CreateCampoDto,
  UpdateCampoDto,
  CreateLoteDto,
} from './dto/campos.dto';

@Injectable()
export class CamposService {
  constructor(
    private prisma: PrismaService,
    private planService: PlanService,
  ) {}

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
    await this.planService.checkCamposLimit(usuarioId);
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

    // Obtener IDs de lotes y siembras para eliminar en cascada
    const lotes = await this.prisma.lote.findMany({
      where: { campoId: id },
      select: { id: true },
    });
    const loteIds = lotes.map((l) => l.id);

    const siembras = loteIds.length > 0
      ? await this.prisma.siembra.findMany({
          where: { loteId: { in: loteIds } },
          select: { id: true },
        })
      : [];
    const siembraIds = siembras.map((s) => s.id);

    await this.prisma.$transaction([
      // Eliminar registros hijos de siembras
      this.prisma.aplicacionInsumo.deleteMany({ where: { siembraId: { in: siembraIds } } }),
      this.prisma.cosecha.deleteMany({ where: { siembraId: { in: siembraIds } } }),
      // Desvincular campañas de siembras (campaniaId nullable)
      this.prisma.siembra.updateMany({ where: { id: { in: siembraIds } }, data: { campaniaId: null } }),
      // Eliminar siembras y lotes
      this.prisma.siembra.deleteMany({ where: { id: { in: siembraIds } } }),
      this.prisma.lote.deleteMany({ where: { campoId: id } }),
      // Desvincular tareas y movimientos (campoId nullable)
      this.prisma.tareaRural.updateMany({ where: { campoId: id }, data: { campoId: null } }),
      this.prisma.movimientoFinanciero.updateMany({ where: { campoId: id }, data: { campoId: null } }),
      // Eliminar el campo
      this.prisma.campo.delete({ where: { id } }),
    ]);
  }

  async addLote(campoId: number, dto: CreateLoteDto, usuarioId: number) {
    await this.findOne(campoId, usuarioId);
    await this.planService.checkLotesLimit(campoId, usuarioId);
    return this.prisma.lote.create({
      data: { ...dto, campoId },
    });
  }
}
