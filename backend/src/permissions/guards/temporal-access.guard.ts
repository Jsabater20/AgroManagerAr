import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PermissionsService } from '../permissions.service';

@Injectable()
export class TemporalAccessGuard implements CanActivate {
  constructor(private permissionsService: PermissionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { sub: usuarioId } = request.user; // De JWT
    const organizacionId = parseInt(request.query.organizacionId) || request.body?.organizacionId;

    if (!organizacionId) {
      throw new ForbiddenException('Organización no especificada');
    }

    // Validar acceso temporal
    const tieneAcceso = await this.permissionsService.verificarAccesoTemporal(
      usuarioId,
      organizacionId,
    );

    if (!tieneAcceso) {
      throw new ForbiddenException('Tu acceso ha expirado o no tienes permiso');
    }

    return true;
  }
}
