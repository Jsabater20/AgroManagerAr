import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';
import {
  CreateSiembraDto,
  UpdateSiembraDto,
  CreateCosechaDto,
  CreateAplicacionDto,
} from './dto/siembras.dto';

@Injectable()
export class SiembrasService {
  constructor(
    private prisma: PrismaService,
    private planService: PlanService,
  ) {}

  async findAll(usuarioId: number) {
    return this.prisma.siembra.findMany({
      where: {
        lote: { campo: { usuarioId } },
      },
      include: {
        lote: { include: { campo: true } },
        tipoCultivo: true,
        cosechas: { orderBy: { fechaCosecha: 'desc' } },
      },
      orderBy: { fechaSiembra: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number) {
    const siembra = await this.prisma.siembra.findUnique({
      where: { id },
      include: {
        lote: { include: { campo: true } },
        tipoCultivo: true,
        cosechas: { orderBy: { fechaCosecha: 'desc' } },
        aplicaciones: {
          include: { insumo: true },
          orderBy: { fecha: 'desc' },
        },
      },
    });
    if (!siembra) throw new NotFoundException('Siembra no encontrada');
    if (siembra.lote.campo.usuarioId !== usuarioId) throw new ForbiddenException();
    return siembra;
  }

  async create(dto: CreateSiembraDto, usuarioId: number) {
    // Verificar que el lote pertenece al usuario
    const lote = await this.prisma.lote.findUnique({
      where: { id: dto.loteId },
      include: { campo: true },
    });
    if (!lote) throw new NotFoundException('Lote no encontrado');
    if (lote.campo.usuarioId !== usuarioId) throw new ForbiddenException();

    await this.planService.checkSiembrasLimit(usuarioId);

    return this.prisma.siembra.create({
      data: {
        loteId: dto.loteId,
        tipoCultivoId: dto.tipoCultivoId,
        fechaSiembra: new Date(dto.fechaSiembra),
        densidad: dto.densidad,
        observaciones: dto.observaciones,
      },
      include: { lote: true, tipoCultivo: true },
    });
  }

  async update(id: number, dto: UpdateSiembraDto, usuarioId: number) {
    await this.findOne(id, usuarioId);
    return this.prisma.siembra.update({
      where: { id },
      data: {
        ...dto,
        fechaSiembra: dto.fechaSiembra ? new Date(dto.fechaSiembra) : undefined,
      },
      include: { lote: true, tipoCultivo: true },
    });
  }

  async addCosecha(siembraId: number, dto: CreateCosechaDto, usuarioId: number) {
    await this.findOne(siembraId, usuarioId);
    return this.prisma.cosecha.create({
      data: {
        siembraId,
        fechaCosecha: new Date(dto.fechaCosecha),
        rendimientoKgHa: dto.rendimientoKgHa,
        totalKg: dto.totalKg,
        humedad: dto.humedad,
        observaciones: dto.observaciones,
      },
    });
  }

  async addAplicacion(siembraId: number, dto: CreateAplicacionDto, usuarioId: number) {
    await this.findOne(siembraId, usuarioId);
    return this.prisma.aplicacionInsumo.create({
      data: {
        siembraId,
        insumoId: dto.insumoId,
        fecha: new Date(dto.fecha),
        cantidad: dto.cantidad,
        unidad: dto.unidad,
        observaciones: dto.observaciones,
      },
      include: { insumo: true },
    });
  }
}
