import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { isDemoAccount } from './system-accounts';

const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

// Rutas globales que el demo no puede modificar (tablas sin usuarioId)
const DEMO_BLOCKED_PATHS = ['/api/cultivos', '/api/insumos'];

@Injectable()
export class DemoGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      user?: { email: string };
      method: string;
      path: string;
    }>();

    if (!req.user) return true;

    const isBlockedPath = DEMO_BLOCKED_PATHS.some((p) => req.path.startsWith(p));

    if (
      isDemoAccount(req.user.email) &&
      WRITE_METHODS.has(req.method) &&
      isBlockedPath
    ) {
      throw new ForbiddenException(
        'En la cuenta demo no se pueden modificar tipos de cultivo ni insumos.',
      );
    }

    return true;
  }
}
