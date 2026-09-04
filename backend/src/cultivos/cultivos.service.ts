import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTipoCultivoDto, UpdateTipoCultivoDto } from './dto/cultivos.dto';
import { MemberAccessService } from '../organizations/member-access.service';

@Injectable()
export class CultivosService {
  constructor(
    private prisma: PrismaService,
    private memberAccessService: MemberAccessService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number) {
    await this.requireCultivosAccess(usuarioId, organizacionId);
    return this.prisma.tipoCultivo.findMany({ orderBy: { nombre: 'asc' } });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    await this.requireCultivosAccess(usuarioId, organizacionId);
    const cultivo = await this.prisma.tipoCultivo.findUnique({ where: { id } });
    if (!cultivo) throw new NotFoundException('Tipo de cultivo no encontrado');
    return cultivo;
  }

  async create(
    dto: CreateTipoCultivoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.requireCultivosAccess(usuarioId, organizacionId);
    const existe = await this.prisma.tipoCultivo.findUnique({
      where: { nombre: dto.nombre },
    });
    if (existe) throw new ConflictException('Ya existe ese tipo de cultivo');
    return this.prisma.tipoCultivo.create({ data: dto });
  }

  async update(
    id: number,
    dto: UpdateTipoCultivoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.tipoCultivo.update({ where: { id }, data: dto });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.tipoCultivo.delete({ where: { id } });
  }

  private requireCultivosAccess(usuarioId: number, organizacionId: number) {
    return this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Cultivos',
    );
  }
}
