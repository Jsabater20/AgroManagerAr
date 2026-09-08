import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import {
  CreateCosechaFrutihorticolaDto,
  CreateCultivoFrutihorticolaDto,
  UpdateCultivoFrutihorticolaDto,
} from './dto/frutihorticultura.dto';

@Injectable()
export class FrutihorticulturaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    const acceso = await this.requireAccess(usuarioId, organizacionId);

    return this.prisma.cultivoFrutihorticola.findMany({
      where: {
        organizacionId,
        ...(acceso.esOwner
          ? {}
          : {
              campo: {
                AsignacionCampo: {
                  some: {
                    usuarioOrganizacionId: acceso.usuarioOrganizacionId,
                    activo: true,
                  },
                },
              },
            }),
      },
      include: {
        campo: { select: { id: true, nombre: true } },
        lote: { select: { id: true, nombre: true } },
        cosechas: { orderBy: { fechaCosecha: 'desc' } },
      },
      orderBy: [{ estado: 'asc' }, { fechaInicio: 'desc' }],
    });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    const acceso = await this.requireAccess(usuarioId, organizacionId);
    const cultivo = await this.prisma.cultivoFrutihorticola.findFirst({
      where: { id, organizacionId },
      include: {
        campo: { select: { id: true, nombre: true } },
        lote: { select: { id: true, nombre: true } },
        cosechas: { orderBy: { fechaCosecha: 'desc' } },
      },
    });
    if (!cultivo) throw new NotFoundException('Cultivo frutihorticola no encontrado');

    if (!acceso.esOwner) {
      await this.verificarCampoAsignado(
        acceso.usuarioOrganizacionId,
        cultivo.campoId,
      );
    }
    return cultivo;
  }

  async create(
    dto: CreateCultivoFrutihorticolaDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.requireAccess(usuarioId, organizacionId);
    await this.validarUbicacion(
      dto.campoId,
      dto.loteId,
      usuarioId,
      organizacionId,
    );

    return this.prisma.cultivoFrutihorticola.create({
      data: {
        organizacionId,
        usuarioId,
        campoId: dto.campoId,
        loteId: dto.loteId,
        nombre: dto.nombre.trim(),
        especie: dto.especie.trim(),
        variedad: dto.variedad?.trim() || null,
        sistema: dto.sistema,
        fechaInicio: new Date(dto.fechaInicio),
        fechaEstimadaCosecha: dto.fechaEstimadaCosecha
          ? new Date(dto.fechaEstimadaCosecha)
          : null,
        superficieM2: dto.superficieM2,
        cantidadPlantas: dto.cantidadPlantas,
        observaciones: dto.observaciones?.trim() || null,
      },
      include: {
        campo: { select: { id: true, nombre: true } },
        lote: { select: { id: true, nombre: true } },
        cosechas: true,
      },
    });
  }

  async update(
    id: number,
    dto: UpdateCultivoFrutihorticolaDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.cultivoFrutihorticola.update({
      where: { id },
      data: {
        ...dto,
        nombre: dto.nombre?.trim(),
        especie: dto.especie?.trim(),
        variedad: dto.variedad?.trim(),
        observaciones: dto.observaciones?.trim(),
        fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : undefined,
        fechaEstimadaCosecha: dto.fechaEstimadaCosecha
          ? new Date(dto.fechaEstimadaCosecha)
          : undefined,
      },
      include: {
        campo: { select: { id: true, nombre: true } },
        lote: { select: { id: true, nombre: true } },
        cosechas: { orderBy: { fechaCosecha: 'desc' } },
      },
    });
  }

  async addCosecha(
    cultivoId: number,
    dto: CreateCosechaFrutihorticolaDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(cultivoId, usuarioId, organizacionId);
    const totalKg =
      (dto.kgPrimera ?? 0) + (dto.kgSegunda ?? 0) + (dto.kgDescarte ?? 0);
    if (totalKg <= 0) {
      throw new BadRequestException('Ingresá al menos un kilo de cosecha');
    }

    return this.prisma.cosechaFrutihorticola.create({
      data: {
        cultivoId,
        usuarioId,
        fechaCosecha: new Date(dto.fechaCosecha),
        kgPrimera: dto.kgPrimera ?? 0,
        kgSegunda: dto.kgSegunda ?? 0,
        kgDescarte: dto.kgDescarte ?? 0,
        destino: dto.destino?.trim() || null,
        observaciones: dto.observaciones?.trim() || null,
      },
    });
  }

  private requireAccess(usuarioId: number, organizacionId: number) {
    return this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Cultivos',
    );
  }

  private async validarUbicacion(
    campoId: number,
    loteId: number | undefined,
    usuarioId: number,
    organizacionId: number,
  ) {
    const campo = await this.prisma.campo.findFirst({
      where: { id: campoId, organizacionId },
      select: { id: true },
    });
    if (!campo) throw new NotFoundException('Campo no encontrado');

    const acceso = await this.requireAccess(usuarioId, organizacionId);
    if (!acceso.esOwner) {
      await this.verificarCampoAsignado(acceso.usuarioOrganizacionId, campoId);
    }

    if (!loteId) return;
    const lote = await this.prisma.lote.findFirst({
      where: { id: loteId, campoId },
      select: { id: true },
    });
    if (!lote) {
      throw new ForbiddenException('El lote no pertenece al campo seleccionado');
    }
  }

  private async verificarCampoAsignado(
    usuarioOrganizacionId: number | null | undefined,
    campoId: number,
  ) {
    if (!usuarioOrganizacionId) {
      throw new ForbiddenException('No tenes permiso sobre este campo');
    }
    const asignacion = await this.prisma.asignacionCampo.findFirst({
      where: { usuarioOrganizacionId, campoId, activo: true },
      select: { id: true },
    });
    if (!asignacion) {
      throw new ForbiddenException('No tenes permiso sobre este campo');
    }
  }
}
