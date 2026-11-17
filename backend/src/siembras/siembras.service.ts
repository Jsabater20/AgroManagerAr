import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';
import { MemberAccessService } from '../organizations/member-access.service';
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
    private memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Siembras',
    );
    return this.prisma.siembra.findMany({
      where: {
        lote: {
          campo: acceso.esOwner
            ? { organizacionId }
            : {
                organizacionId,
                AsignacionCampo: {
                  some: {
                    usuarioOrganizacionId: acceso.usuarioOrganizacionId,
                    activo: true,
                  },
                },
              },
        },
      },
      include: {
        lote: { include: { campo: true } },
        tipoCultivo: true,
        campania: { select: { id: true, nombre: true } },
        cosechas: {
          include: { registradaPor: { select: { id: true, nombre: true, apellido: true } } },
          orderBy: { fechaCosecha: 'desc' },
        },
        aplicaciones: {
          include: {
            insumo: true,
            registradaPor: { select: { id: true, nombre: true, apellido: true } },
          },
          orderBy: { fecha: 'desc' },
        },
      },
      orderBy: { fechaSiembra: 'desc' },
    });
  }

  async listAvailableLotes(usuarioId: number, organizacionId: number) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Siembras',
    );
    const lotes = await this.prisma.lote.findMany({
      where: {
        campo: acceso.esOwner
          ? { organizacionId }
          : {
              organizacionId,
              AsignacionCampo: {
                some: {
                  usuarioOrganizacionId: acceso.usuarioOrganizacionId,
                  activo: true,
                },
              },
            },
      },
      select: {
        id: true,
        nombre: true,
        hectareas: true,
        campo: { select: { nombre: true } },
      },
      orderBy: [{ campo: { nombre: 'asc' } }, { nombre: 'asc' }],
    });

    return lotes.map((lote) => ({
      id: lote.id,
      nombre: lote.nombre,
      descripcion: `${lote.campo.nombre} · ${lote.hectareas} ha`,
    }));
  }

  private async validarCampania(
    campaniaId: number,
    organizacionId: number,
    fechaSiembra: Date,
  ) {
    const campania = await this.prisma.campania.findFirst({
      where: { id: campaniaId, organizacionId },
      select: { id: true, fechaInicio: true, fechaFin: true },
    });
    if (!campania) throw new NotFoundException('Campania no encontrada');

    if (fechaSiembra < campania.fechaInicio || (campania.fechaFin && fechaSiembra > campania.fechaFin)) {
      throw new ConflictException('La fecha de siembra debe estar dentro del periodo de la campania');
    }
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    const siembra = await this.prisma.siembra.findUnique({
      where: { id },
      include: {
        lote: { include: { campo: true } },
        tipoCultivo: true,
        campania: { select: { id: true, nombre: true } },
        cosechas: {
          include: { registradaPor: { select: { id: true, nombre: true, apellido: true } } },
          orderBy: { fechaCosecha: 'desc' },
        },
        aplicaciones: {
          include: {
            insumo: true,
            registradaPor: { select: { id: true, nombre: true, apellido: true } },
          },
          orderBy: { fecha: 'desc' },
        },
      },
    });
    if (!siembra) throw new NotFoundException('Siembra no encontrada');
    if (siembra.lote.campo.organizacionId !== organizacionId)
      throw new ForbiddenException();
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Siembras',
    );
    if (!acceso.esOwner) {
      const asignacion = await this.prisma.asignacionCampo.findFirst({
        where: {
          usuarioOrganizacionId: acceso.usuarioOrganizacionId,
          campoId: siembra.lote.campo.id,
          activo: true,
        },
      });
      if (!asignacion) throw new ForbiddenException();
    }
    return siembra;
  }

  async create(
    dto: CreateSiembraDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    // Verificar que el lote pertenece al usuario y organización
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Siembras',
    );
    const lote = await this.prisma.lote.findUnique({
      where: { id: dto.loteId },
      include: { campo: true },
    });
    if (!lote) throw new NotFoundException('Lote no encontrado');
    if (lote.campo.organizacionId !== organizacionId)
      throw new ForbiddenException();
    if (!acceso.esOwner) {
      const asignacion = await this.prisma.asignacionCampo.findFirst({
        where: {
          usuarioOrganizacionId: acceso.usuarioOrganizacionId,
          campoId: lote.campoId,
          activo: true,
        },
      });
      if (!asignacion) throw new ForbiddenException();
    }

    await this.planService.checkSiembrasLimit(organizacionId);

    const fechaSiembra = new Date(dto.fechaSiembra);
    const siembraActiva = await this.prisma.siembra.findFirst({
      where: { loteId: dto.loteId, estado: 'EN_CURSO' },
      select: { id: true },
    });
    if (siembraActiva) {
      throw new ConflictException('Este lote ya tiene una siembra en curso. Finalizala o marcalo como perdida antes de registrar otra.');
    }
    if (dto.campaniaId) {
      await this.validarCampania(dto.campaniaId, organizacionId, fechaSiembra);
    }

    return this.prisma.siembra.create({
      data: {
        loteId: dto.loteId,
        tipoCultivoId: dto.tipoCultivoId,
        usuarioId,
        fechaSiembra,
        densidad: dto.densidad,
        observaciones: dto.observaciones,
        campaniaId: dto.campaniaId,
      },
      include: {
        lote: { include: { campo: true } },
        tipoCultivo: true,
        campania: { select: { id: true, nombre: true } },
        registradaPor: { select: { id: true, nombre: true, apellido: true } },
      },
    });
  }

  async update(
    id: number,
    dto: UpdateSiembraDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    const siembra = await this.findOne(id, usuarioId, organizacionId);
    const fechaSiembra = dto.fechaSiembra ? new Date(dto.fechaSiembra) : siembra.fechaSiembra;
    if (dto.campaniaId) {
      await this.validarCampania(dto.campaniaId, organizacionId, fechaSiembra);
    }
    return this.prisma.siembra.update({
      where: { id },
      data: {
        ...dto,
        fechaSiembra: dto.fechaSiembra ? fechaSiembra : undefined,
      },
      include: {
        lote: { include: { campo: true } },
        tipoCultivo: true,
        campania: { select: { id: true, nombre: true } },
      },
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
        usuarioId,
        fechaCosecha: new Date(dto.fechaCosecha),
        rendimientoKgHa: dto.rendimientoKgHa,
        totalKg: dto.totalKg,
        humedad: dto.humedad,
        observaciones: dto.observaciones,
      },
      include: { registradaPor: { select: { id: true, nombre: true, apellido: true } } },
    });
  }

  async addAplicacion(
    siembraId: number,
    dto: CreateAplicacionDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(siembraId, usuarioId, organizacionId);
    await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Insumos',
    );
    const insumo = await this.prisma.insumo.findFirst({
      where: { id: dto.insumoId, organizacionId },
      select: { id: true },
    });
    if (!insumo) {
      throw new NotFoundException('Insumo no encontrado');
    }
    return this.prisma.aplicacionInsumo.create({
      data: {
        siembraId,
        insumoId: dto.insumoId,
        usuarioId,
        fecha: new Date(dto.fecha),
        cantidad: dto.cantidad,
        unidad: dto.unidad,
        observaciones: dto.observaciones,
      },
      include: {
        insumo: true,
        registradaPor: { select: { id: true, nombre: true, apellido: true } },
      },
    });
  }
}
