import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

interface AuthRequest extends Request {
  user?: { id: number; email: string };
  params?: { orgId?: string };
}

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const userId = request.user?.id;
    const orgId = request.params?.orgId ? parseInt(request.params.orgId) : null;

    if (!userId || !orgId) {
      throw new BadRequestException('Invalid user or organization');
    }

    const org = await this.prisma.organizacion.findUnique({
      where: { id: orgId },
      select: { propietarioId: true },
    });

    if (!org || org.propietarioId !== userId) {
      throw new ForbiddenException(
        'Solo el propietario puede acceder a este panel',
      );
    }

    return true;
  }
}
