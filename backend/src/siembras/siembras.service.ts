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

  async findAll(usuarioId: number, organizacionId: number) {
    return this.prisma.siembra.findMany({
      where: {
        lote: {
          campo: { usuarioId, organizacionId },
        },
      },
      include: {
        lote: { include: { campo: true } },
        tipoCultivo: true,
        cosechas: { orderBy: { fechaCosecha: 'desc' } },
      },
      orderBy: { fechaSiembra: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
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
    if (
      siembra.lote.campo.usuarioId !== usuarioId ||
      siembra.lote.campo.organizacionId !== organizacionId
    )
      throw new ForbiddenException();
    return siembra;
  }

  async create(
    dto: CreateSiembraDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    // Verificar que el lote pertenece al usuario y organización
    const lote = await this.prisma.lote.findUnique({
      where: { id: dto.loteId },
      include: { campo: true },
    });
    if (!lote) throw new NotFoundException('Lote no encontrado');
    if (
      lote.campo.usuarioId !== usuarioId ||
      lote.campo.organizacionId !== organizacionId
    )
      throw new ForbiddenException();

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

  async update(
    id: number,
    dto: UpdateSiembraDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.siembra.update({
      where: { id },
      data: {
        ...dto,
        fechaSiembra: dto.fechaSiembra ? new Date(dto.fechaSiembra) : undefined,
      },
      include: { lote: true, tipoCultivo: true },
    });
  }

  async addCosecha(
    siembraId: number,
    dto: CreateCosechaDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(siembraId, usuarioId, organizacionId);
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

  async addAplicacion(
    siembraId: number,
    dto: CreateAplicacionDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(siembraId, usuarioId, organizacionId);
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
