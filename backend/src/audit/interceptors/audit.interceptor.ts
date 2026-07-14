import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { AuditService, AuditLogData } from '../audit.service';
import { AUDIT_KEY, AuditMetadata } from '../decorators/audit.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private auditService: AuditService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const metadata = this.reflector.get<AuditMetadata>(
      AUDIT_KEY,
      context.getHandler(),
    );

    if (!metadata) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const { sub: usuarioId } = request.user || {};
    const organizacionId = parseInt(request.query.organizacionId);
    const { ipAddress, userAgent } = this.auditService.extraerMetadatos(request);

    return next.handle().pipe(
      tap(async (response) => {
        try {
          const logData: AuditLogData = {
            usuarioId,
            organizacionId,
            accion: metadata.accion,
            entidad: metadata.entidad,
            entidadId: response?.id || null,
            cambios: response,
            ipAddress,
            userAgent,
          };

          await this.auditService.registrar(logData);
        } catch (error) {
          console.error('Error en audit interceptor:', error);
        }
      }),
    );
  }
}
