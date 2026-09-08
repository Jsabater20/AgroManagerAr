import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { CreateGalponAvicolaDto, CreateRegistroAvicolaDto } from './dto/avicola.dto';

@Injectable()
export class AvicolaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    await this.requireAccess(usuarioId, organizacionId);
    return this.prisma.galponAvicola.findMany({
      where: { organizacionId },
      include: {
        registros: {
          orderBy: { fecha: 'desc' },
          take: 30,
        },
      },
      orderBy: [{ activo: 'desc' }, { nombre: 'asc' }],
    });
  }

  async resumen(usuarioId: number, organizacionId: number) {
    await this.requireAccess(usuarioId, organizacionId);
    const today = new Date();
    const inicioDia = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const inicioMes = new Date(today.getFullYear(), today.getMonth(), 1);
    const [huevosHoy, huevosMes, mortandadMes, galponesActivos] = await Promise.all([
      this.prisma.registroAvicolaDiario.aggregate({
        where: { organizacionId, fecha: { gte: inicioDia } },
        _sum: { huevos: true },
      }),
      this.prisma.registroAvicolaDiario.aggregate({
        where: { organizacionId, fecha: { gte: inicioMes } },
        _sum: { huevos: true },
      }),
      this.prisma.registroAvicolaDiario.aggregate({
        where: { organizacionId, fecha: { gte: inicioMes } },
        _sum: { mortandad: true },
      }),
      this.prisma.galponAvicola.count({ where: { organizacionId, activo: true } }),
    ]);
    return {
      huevosHoy: huevosHoy._sum.huevos ?? 0,
      huevosMes: huevosMes._sum.huevos ?? 0,
      mortandadMes: mortandadMes._sum.mortandad ?? 0,
      galponesActivos,
    };
  }

  async createGalpon(dto: CreateGalponAvicolaDto, usuarioId: number, organizacionId: number) {
    await this.requireAccess(usuarioId, organizacionId);
    return this.prisma.galponAvicola.create({
      data: {
        organizacionId,
        usuarioId,
        nombre: dto.nombre.trim(),
        tipo: dto.tipo,
        capacidad: dto.capacidad,
        observaciones: dto.observaciones?.trim() || null,
      },
      include: { registros: true },
    });
  }

  async createRegistro(
    galponId: number,
    dto: CreateRegistroAvicolaDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.requireAccess(usuarioId, organizacionId);
    const galpon = await this.prisma.galponAvicola.findFirst({
      where: { id: galponId, organizacionId, activo: true },
      select: { id: true },
    });
    if (!galpon) throw new NotFoundException('Galpón activo no encontrado');

    const fecha = new Date(dto.fecha);
    const existente = await this.prisma.registroAvicolaDiario.findFirst({
      where: { galponId, fecha },
      select: { id: true },
    });
    if (existente) {
      throw new ConflictException('Ya cargaste el registro de este galpón para esa fecha');
    }

    return this.prisma.registroAvicolaDiario.create({
      data: {
        organizacionId,
        galponId,
        usuarioId,
        fecha,
        avesPresentes: dto.avesPresentes,
        huevos: dto.huevos ?? 0,
        mortandad: dto.mortandad ?? 0,
        alimentoKg: dto.alimentoKg ?? 0,
        pesoPromedioGr: dto.pesoPromedioGr,
        observaciones: dto.observaciones?.trim() || null,
      },
    });
  }

  async removeRegistro(id: number, usuarioId: number, organizacionId: number) {
    const acceso = await this.requireAccess(usuarioId, organizacionId);
    const registro = await this.prisma.registroAvicolaDiario.findFirst({
      where: { id, organizacionId },
      select: { id: true, usuarioId: true },
    });
    if (!registro) throw new NotFoundException('Registro avícola no encontrado');
    if (!acceso.esOwner && registro.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo podés eliminar tus propios registros');
    }
    await this.prisma.registroAvicolaDiario.delete({ where: { id } });
  }

  private requireAccess(usuarioId: number, organizacionId: number) {
    return this.memberAccessService.requireModule(usuarioId, organizacionId, 'GanaderÃ­a');
  }
}
