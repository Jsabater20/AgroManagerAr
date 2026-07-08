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
    const user = request.user as { id: number; organizacionId?: number };
    const orgIdParam = (request.params.organizacionId || request.body?.organizacionId) as
      | string
      | undefined;
    const organizacionId = orgIdParam ? parseInt(orgIdParam, 10) : undefined;

    if (!organizacionId || isNaN(organizacionId)) {
      // Si no hay organizacionId en la ruta, usar la del JWT
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

    request.organizacionId = organizacionId;
    return true;
  }
}
