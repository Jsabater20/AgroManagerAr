import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MemberAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async requireModule(
    usuarioId: number,
    organizacionId: number,
    moduloNombre: string,
  ): Promise<{ esOwner: boolean; usuarioOrganizacionId?: number }> {
    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { propietarioId: true },
    });

    if (!organizacion) {
      throw new NotFoundException('Organizacion no encontrada');
    }

    if (organizacion.propietarioId === usuarioId) {
      return { esOwner: true };
    }

    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: {
        usuarioId_organizacionId: { usuarioId, organizacionId },
      },
      select: {
        id: true,
        activo: true,
        VisibilidadModulo: {
          where: { moduloNombre },
          select: { activo: true },
        },
      },
    });

    if (!miembro?.activo) {
      throw new ForbiddenException('No tenes acceso a esta organizacion');
    }

    if (!miembro.VisibilidadModulo.some((modulo) => modulo.activo)) {
      throw new ForbiddenException(`El propietario no habilito el modulo ${moduloNombre}`);
    }

    return { esOwner: false, usuarioOrganizacionId: miembro.id };
  }

  async requireCampo(
    usuarioId: number,
    organizacionId: number,
    campoId: number,
  ): Promise<void> {
    const acceso = await this.requireModule(usuarioId, organizacionId, 'Campos');

    if (acceso.esOwner) {
      return;
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
      throw new ForbiddenException('No tenes permiso sobre este campo');
    }
  }
}
