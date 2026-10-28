import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto/finanzas.dto';

@Injectable()
export class FinanzasService {
  constructor(
    private prisma: PrismaService,
    private memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    const where = await this.obtenerFiltroVisible(usuarioId, organizacionId);
    return this.prisma.movimientoFinanciero.findMany({
      where,
      include: {
        campo: { select: { id: true, nombre: true } },
        siembra: {
          select: { id: true, tipoCultivo: { select: { nombre: true } } },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    const filtroVisible = await this.obtenerFiltroVisible(usuarioId, organizacionId);
    const m = await this.prisma.movimientoFinanciero.findFirst({
      where: { ...filtroVisible, id },
    });
    if (!m) throw new NotFoundException('Movimiento no encontrado');
    return m;
  }

  async create(usuarioId: number, organizacionId: number, dto: CreateMovimientoDto) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Finanzas',
    );
    const referencias = await this.normalizarReferencias(
      organizacionId,
      dto,
      acceso,
    );

    return this.prisma.movimientoFinanciero.create({
      data: {
        ...dto,
        ...referencias,
        usuarioId,
        organizacionId,
        fecha: new Date(dto.fecha),
      },
      include: { campo: { select: { id: true, nombre: true } } },
    });
  }

  async update(
    id: number,
    usuarioId: number,
    organizacionId: number,
    dto: UpdateMovimientoDto,
  ) {
    const movimiento = await this.findOne(id, usuarioId, organizacionId);
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Finanzas',
    );
    const referencias = await this.normalizarReferencias(
      organizacionId,
      {
        campoId: dto.campoId ?? movimiento.campoId ?? undefined,
        siembraId: dto.siembraId ?? movimiento.siembraId ?? undefined,
      },
      acceso,
    );
    const data: Record<string, unknown> = { ...dto };
    data['campoId'] = referencias.campoId;
    data['siembraId'] = referencias.siembraId;
    if (dto.fecha) data['fecha'] = new Date(dto.fecha);
    return this.prisma.movimientoFinanciero.update({ where: { id }, data });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.movimientoFinanciero.delete({ where: { id } });
  }

  async resumen(usuarioId: number, organizacionId: number) {
    const where = await this.obtenerFiltroVisible(usuarioId, organizacionId);
    const movimientos = await this.prisma.movimientoFinanciero.findMany({
      where,
    });
    const ingresos = movimientos
      .filter((m) => m.tipo === 'INGRESO')
      .reduce((a, m) => a + m.monto, 0);
    const egresos = movimientos
      .filter((m) => m.tipo === 'EGRESO')
      .reduce((a, m) => a + m.monto, 0);
    return { ingresos, egresos, saldo: ingresos - egresos };
  }

  private async obtenerFiltroVisible(
    usuarioId: number,
    organizacionId: number,
  ): Promise<Prisma.MovimientoFinancieroWhereInput> {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Finanzas',
    );

    if (acceso.esOwner) {
      return { organizacionId };
    }

    const asignacionCampo = {
      some: {
        usuarioOrganizacionId: acceso.usuarioOrganizacionId,
        activo: true,
      },
    };

    return {
      organizacionId,
      OR: [
        { campo: { AsignacionCampo: asignacionCampo } },
        {
          siembra: {
            lote: { campo: { AsignacionCampo: asignacionCampo } },
          },
        },
      ],
    };
  }

  private async normalizarReferencias(
    organizacionId: number,
    referencias: Pick<CreateMovimientoDto, 'campoId' | 'siembraId'>,
    acceso: { esOwner: boolean; usuarioOrganizacionId?: number },
  ): Promise<{ campoId: number | null; siembraId: number | null }> {
    let campoId = referencias.campoId ?? null;
    const siembraId = referencias.siembraId ?? null;

    if (siembraId) {
      const siembra = await this.prisma.siembra.findFirst({
        where: {
          id: siembraId,
          lote: { campo: { organizacionId } },
        },
        select: { lote: { select: { campoId: true } } },
      });

      if (!siembra) {
        throw new BadRequestException(
          'La siembra no pertenece a esta organización.',
        );
      }

      if (campoId && campoId !== siembra.lote.campoId) {
        throw new BadRequestException(
          'La siembra no corresponde al campo seleccionado.',
        );
      }

      campoId = siembra.lote.campoId;
    }

    if (campoId) {
      const campo = await this.prisma.campo.findFirst({
        where: { id: campoId, organizacionId },
        select: { id: true },
      });
      if (!campo) {
        throw new BadRequestException(
          'El campo no pertenece a esta organización.',
        );
      }
    }

    if (!acceso.esOwner) {
      if (!campoId || !acceso.usuarioOrganizacionId) {
        throw new ForbiddenException(
          'Los miembros solo pueden registrar movimientos asociados a un campo asignado.',
        );
      }

      const asignacion = await this.prisma.asignacionCampo.findFirst({
        where: {
          usuarioOrganizacionId: acceso.usuarioOrganizacionId,
          campoId,
          activo: true,
        },
        select: { id: true },
      });

      if (!asignacion) {
        throw new ForbiddenException('No tenés permisos sobre el campo asociado.');
      }
    }

    return { campoId, siembraId };
  }
}
