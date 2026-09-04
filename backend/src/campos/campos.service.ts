import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { ReferidosService } from '../referidos/referidos.service';
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
    private memberAccessService: MemberAccessService,
    private referidosService: ReferidosService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number, usuarioOrganizacionId?: number) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Campos',
    );
    let whereClause: any = { organizacionId };

    // Los miembros sólo ven campos asignados; el propietario ve todos los de su organización.
    if (!acceso.esOwner) {
      whereClause = {
        organizacionId,
        AsignacionCampo: {
          some: {
            usuarioOrganizacionId: acceso.usuarioOrganizacionId,
            activo: true,
          },
        },
      };
    }

    return this.prisma.campo.findMany({
      where: whereClause,
      include: { lotes: true, usuario: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
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
        usuario: true,
      },
    });
    if (!campo) throw new NotFoundException('Campo no encontrado');
    if (campo.organizacionId !== organizacionId) {
      throw new ForbiddenException('No tenés acceso a este campo');
    }
    await this.memberAccessService.requireCampo(usuarioId, organizacionId, id);
    return campo;
  }

  async create(dto: CreateCampoDto, usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Campos');
    await this.planService.checkCamposLimit(organizacionId);
    const campo = await this.prisma.campo.create({
      data: { ...dto, usuarioId, organizacionId },
      include: { lotes: true, usuario: true },
    });
    await this.referidosService.marcarPrimerCampoCreado(usuarioId);
    return campo;
  }

  async update(
    id: number,
    dto: UpdateCampoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.campo.update({
      where: { id },
      data: dto,
      include: { lotes: true, usuario: true },
    });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);

    const lotes = await this.prisma.lote.findMany({
      where: { campoId: id },
      select: { id: true },
    });
    const loteIds = lotes.map((l) => l.id);

    const siembras =
      loteIds.length > 0
        ? await this.prisma.siembra.findMany({
            where: { loteId: { in: loteIds } },
            select: { id: true },
          })
        : [];
    const siembraIds = siembras.map((s) => s.id);

    await this.prisma.$transaction([
      this.prisma.aplicacionInsumo.deleteMany({
        where: { siembraId: { in: siembraIds } },
      }),
      this.prisma.cosecha.deleteMany({
        where: { siembraId: { in: siembraIds } },
      }),
      this.prisma.siembra.updateMany({
        where: { id: { in: siembraIds } },
        data: { campaniaId: null },
      }),
      this.prisma.siembra.deleteMany({ where: { id: { in: siembraIds } } }),
      this.prisma.lote.deleteMany({ where: { campoId: id } }),
      this.prisma.tareaRural.updateMany({
        where: { campoId: id },
        data: { campoId: null },
      }),
      this.prisma.movimientoFinanciero.updateMany({
        where: { campoId: id },
        data: { campoId: null },
      }),
      this.prisma.campo.delete({ where: { id } }),
    ]);
  }

  async addLote(
    campoId: number,
    dto: CreateLoteDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    const campo = await this.findOne(campoId, usuarioId, organizacionId);
    await this.planService.checkLotesLimit(organizacionId);
    return this.prisma.lote.create({
      data: { ...dto, campoId },
    });
  }
}
