import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { GuardarCalculoDto } from './dto/guardar-calculo.dto';

@Injectable()
export class CalculosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly planService: PlanService,
    private readonly memberAccessService: MemberAccessService,
  ) {}

  async obtenerCamposDisponibles(usuarioId: number, organizacionId: number) {
    const esPro = await this.planService.isOrgPro(organizacionId);
    if (!esPro) {
      throw new ForbiddenException(
        'El autocompletado de campos y lotes esta disponible con el Plan Pro.',
      );
    }

    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Campos',
    );

    return this.prisma.campo.findMany({
      where: acceso.esOwner
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
      select: {
        id: true,
        nombre: true,
        hectareas: true,
        lotes: {
          select: { id: true, nombre: true, hectareas: true, campoId: true },
          orderBy: { nombre: 'asc' },
        },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async obtenerMaquinariasDisponibles(
    usuarioId: number,
    organizacionId: number,
  ) {
    const esPro = await this.planService.isOrgPro(organizacionId);
    if (!esPro) {
      throw new ForbiddenException(
        'La calculadora de maquinaria esta disponible con el Plan Pro.',
      );
    }

    await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Maquinarias',
    );

    return this.prisma.maquinaria.findMany({
      where: { organizacionId },
      select: {
        id: true,
        nombre: true,
        tipo: true,
        marca: true,
        modelo: true,
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async obtenerCostosRegistrados(
    usuarioId: number,
    organizacionId: number,
    campoId: number,
  ) {
    if (!Number.isInteger(campoId) || campoId <= 0) {
      throw new BadRequestException('Campo inválido.');
    }
    if (!(await this.planService.isOrgPro(organizacionId))) {
      throw new ForbiddenException(
        'Los costos registrados para cálculos están disponibles con el Plan Pro.',
      );
    }

    await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Finanzas',
    );
    await this.memberAccessService.requireCampo(
      usuarioId,
      organizacionId,
      campoId,
    );

    const gastos = await this.prisma.movimientoFinanciero.aggregate({
      where: {
        organizacionId,
        campoId,
        tipo: 'EGRESO',
      },
      _sum: { monto: true },
      _count: true,
    });

    return {
      totalEgresos: gastos._sum.monto ?? 0,
      cantidadMovimientos: gastos._count,
    };
  }

  async listar(usuarioId: number, organizacionId: number) {
    const acceso = await this.requireProAndCalculosModule(usuarioId, organizacionId);

    return this.prisma.calculoGuardado.findMany({
      where: {
        organizacionId,
        ...(acceso.esOwner ? {} : { usuarioId }),
      },
      select: {
        id: true,
        tipo: true,
        titulo: true,
        campoId: true,
        loteId: true,
        maquinariaId: true,
        datos: true,
        resultado: true,
        createdAt: true,
        usuario: { select: { id: true, nombre: true, apellido: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async guardar(
    dto: GuardarCalculoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.requireProAndCalculosModule(usuarioId, organizacionId);
    await this.validarRecursos(dto, usuarioId, organizacionId);

    return this.prisma.calculoGuardado.create({
      data: {
        organizacionId,
        usuarioId,
        tipo: dto.tipo,
        titulo: dto.titulo.trim(),
        campoId: dto.campoId,
        loteId: dto.loteId,
        maquinariaId: dto.maquinariaId,
        datos: dto.datos as Prisma.InputJsonValue,
        resultado: dto.resultado as Prisma.InputJsonValue,
      },
    });
  }

  private async requireProAndCalculosModule(
    usuarioId: number,
    organizacionId: number,
  ) {
    if (!(await this.planService.isOrgPro(organizacionId))) {
      throw new ForbiddenException(
        'El historial de calculos esta disponible con el Plan Pro.',
      );
    }

    return this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Cálculos',
    );
  }

  private async validarRecursos(
    dto: GuardarCalculoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    let campoId = dto.campoId;

    if (dto.loteId) {
      const lote = await this.prisma.lote.findFirst({
        where: { id: dto.loteId, campo: { organizacionId } },
        select: { campoId: true },
      });
      if (!lote) {
        throw new BadRequestException('El lote no pertenece a esta organización.');
      }
      if (campoId && campoId !== lote.campoId) {
        throw new BadRequestException('El lote no corresponde al campo seleccionado.');
      }
      campoId = lote.campoId;
    }

    if (campoId) {
      await this.memberAccessService.requireCampo(
        usuarioId,
        organizacionId,
        campoId,
      );
    }

    if (dto.maquinariaId) {
      await this.memberAccessService.requireModule(
        usuarioId,
        organizacionId,
        'Maquinarias',
      );
      const maquinaria = await this.prisma.maquinaria.findFirst({
        where: { id: dto.maquinariaId, organizacionId },
        select: { id: true },
      });
      if (!maquinaria) {
        throw new BadRequestException(
          'La maquinaria no pertenece a esta organización.',
        );
      }
    }
  }
}
