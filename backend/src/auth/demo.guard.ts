import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

const DEMO_EMAIL = 'demo@agromanager.ar';
const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

@Injectable()
export class DemoGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      user?: { email: string };
      method: string;
    }>();

    // Si el JWT guard aún no cargó el usuario, dejar pasar
    if (!req.user) return true;

    if (req.user.email === DEMO_EMAIL && WRITE_METHODS.has(req.method)) {
      throw new ForbiddenException(
        'La cuenta demo es de solo lectura. Registrate para acceder a todas las funcionalidades.',
      );
    }

    return true;
  }
}
