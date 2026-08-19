import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as {
      id: number;
      organizacionId?: number;
      usuarioOrganizacionId?: number;
    };
    const rawOrgId =
      request.params?.organizacionId ??
      request.params?.orgId ??
      request.query?.organizacionId ??
      request.body?.organizacionId;
    const orgIdParam = Array.isArray(rawOrgId) ? rawOrgId[0] : rawOrgId;
    const organizacionId = orgIdParam ? parseInt(String(orgIdParam), 10) : undefined;

    if (!organizacionId || isNaN(organizacionId)) {
      if (user.organizacionId) {
        request.organizacionId = user.organizacionId;
        return true;
      }
      throw new ForbiddenException('Organización no especificada');
    }

    // Verificar que el usuario pertenece a esta org
    const esMiembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: {
        usuarioId_organizacionId: { usuarioId: user.id, organizacionId },
      },
    });

    const esOwner = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { propietarioId: true },
    });

    if (!esMiembro && esOwner?.propietarioId !== user.id) {
      throw new ForbiddenException('No tenés acceso a esta organización');
    }

    if (esMiembro && esOwner?.propietarioId !== user.id) {
      if (!esMiembro.activo) {
        throw new ForbiddenException('Tu membresia esta inactiva');
      }

      user.usuarioOrganizacionId = esMiembro.id;
    }

    request.organizacionId = organizacionId;
    return true;
  }
}
