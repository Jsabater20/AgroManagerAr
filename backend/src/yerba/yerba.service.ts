import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { CreateCosechaYerbaDto, CreateCuadroYerbaDto } from './dto/yerba.dto';

@Injectable()
export class YerbaService {
  constructor(private readonly prisma: PrismaService, private readonly memberAccessService: MemberAccessService) {}

  async findAll(usuarioId: number, organizacionId: number) {
    const acceso = await this.requireAccess(usuarioId, organizacionId);
    return this.prisma.cuadroYerba.findMany({
      where: { organizacionId, ...(acceso.esOwner ? {} : { campo: { AsignacionCampo: { some: { usuarioOrganizacionId: acceso.usuarioOrganizacionId, activo: true } } } }) },
      include: { campo: { select: { id: true, nombre: true } }, lote: { select: { id: true, nombre: true } }, cosechas: { orderBy: { fechaCosecha: 'desc' }, take: 30 } },
      orderBy: [{ activo: 'desc' }, { nombre: 'asc' }],
    });
  }

  async resumen(usuarioId: number, organizacionId: number) {
    const acceso = await this.requireAccess(usuarioId, organizacionId);
    const inicioAnio = new Date(new Date().getFullYear(), 0, 1);
    const whereCuadro = acceso.esOwner ? { organizacionId } : { organizacionId, campo: { AsignacionCampo: { some: { usuarioOrganizacionId: acceso.usuarioOrganizacionId, activo: true } } } };
    const cuadros = await this.prisma.cuadroYerba.findMany({ where: whereCuadro, select: { id: true } });
    const cuadroIds = cuadros.map((cuadro) => cuadro.id);
    const [cosechaAnual, cantidadCosechas] = await Promise.all([
      this.prisma.cosechaYerba.aggregate({ where: { cuadroId: { in: cuadroIds }, fechaCosecha: { gte: inicioAnio } }, _sum: { kgHojaVerde: true, kgCanchada: true } }),
      this.prisma.cosechaYerba.count({ where: { cuadroId: { in: cuadroIds }, fechaCosecha: { gte: inicioAnio } } }),
    ]);
    return { cuadrosActivos: cuadros.length, cosechasAnuales: cantidadCosechas, kgHojaVerde: cosechaAnual._sum.kgHojaVerde ?? 0, kgCanchada: cosechaAnual._sum.kgCanchada ?? 0 };
  }

  async createCuadro(dto: CreateCuadroYerbaDto, usuarioId: number, organizacionId: number) {
    await this.requireAccess(usuarioId, organizacionId);
    await this.validarUbicacion(dto.campoId, dto.loteId, usuarioId, organizacionId);
    return this.prisma.cuadroYerba.create({ data: { organizacionId, usuarioId, campoId: dto.campoId, loteId: dto.loteId, nombre: dto.nombre.trim(), superficieHa: dto.superficieHa, edadPlantacion: dto.edadPlantacion, observaciones: dto.observaciones?.trim() || null }, include: { campo: { select: { id: true, nombre: true } }, lote: { select: { id: true, nombre: true } }, cosechas: true } });
  }

  async createCosecha(cuadroId: number, dto: CreateCosechaYerbaDto, usuarioId: number, organizacionId: number) {
    await this.findOne(cuadroId, usuarioId, organizacionId);
    return this.prisma.cosechaYerba.create({ data: { cuadroId, usuarioId, fechaCosecha: new Date(dto.fechaCosecha), kgHojaVerde: dto.kgHojaVerde, kgCanchada: dto.kgCanchada, jornales: dto.jornales, observaciones: dto.observaciones?.trim() || null } });
  }

  async removeCosecha(id: number, usuarioId: number, organizacionId: number) {
    const acceso = await this.requireAccess(usuarioId, organizacionId);
    const cosecha = await this.prisma.cosechaYerba.findFirst({ where: { id, cuadro: { organizacionId } }, include: { cuadro: { select: { campoId: true } } } });
    if (!cosecha) throw new NotFoundException('Cosecha de yerba no encontrada');
    if (!acceso.esOwner) await this.verificarCampoAsignado(acceso.usuarioOrganizacionId, cosecha.cuadro.campoId);
    if (!acceso.esOwner && cosecha.usuarioId !== usuarioId) throw new ForbiddenException('Solo podés eliminar tus propios registros');
    await this.prisma.cosechaYerba.delete({ where: { id } });
  }

  private async findOne(id: number, usuarioId: number, organizacionId: number) {
    const acceso = await this.requireAccess(usuarioId, organizacionId);
    const cuadro = await this.prisma.cuadroYerba.findFirst({ where: { id, organizacionId }, select: { id: true, campoId: true } });
    if (!cuadro) throw new NotFoundException('Cuadro yerbatero no encontrado');
    if (!acceso.esOwner) await this.verificarCampoAsignado(acceso.usuarioOrganizacionId, cuadro.campoId);
    return cuadro;
  }

  private requireAccess(usuarioId: number, organizacionId: number) { return this.memberAccessService.requireModule(usuarioId, organizacionId, 'Cultivos'); }
  private async validarUbicacion(campoId: number, loteId: number | undefined, usuarioId: number, organizacionId: number) {
    const campo = await this.prisma.campo.findFirst({ where: { id: campoId, organizacionId }, select: { id: true } });
    if (!campo) throw new NotFoundException('Campo no encontrado');
    const acceso = await this.requireAccess(usuarioId, organizacionId);
    if (!acceso.esOwner) await this.verificarCampoAsignado(acceso.usuarioOrganizacionId, campoId);
    if (!loteId) return;
    const lote = await this.prisma.lote.findFirst({ where: { id: loteId, campoId }, select: { id: true } });
    if (!lote) throw new ForbiddenException('El lote no pertenece al campo seleccionado');
  }
  private async verificarCampoAsignado(usuarioOrganizacionId: number | null | undefined, campoId: number) {
    if (!usuarioOrganizacionId) throw new ForbiddenException('No tenes permiso sobre este campo');
    const asignacion = await this.prisma.asignacionCampo.findFirst({ where: { usuarioOrganizacionId, campoId, activo: true }, select: { id: true } });
    if (!asignacion) throw new ForbiddenException('No tenes permiso sobre este campo');
  }
}
