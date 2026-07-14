import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

export interface AuditLogData {
  usuarioId: number;
  organizacionId?: number;
  accion: string; // "login", "crear_campo", "modificar_tarea", etc.
  entidad?: string; // "Campo", "Tarea", "Maquinaria"
  entidadId?: number;
  cambios?: Record<string, any>; // JSON con detalles
  ipAddress?: string | null;
  userAgent?: string | null;
}

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  // Registrar acción en auditoría
  async registrar(data: AuditLogData) {
    try {
      return await this.prisma.auditoriaLog.create({
        data: {
          usuarioId: data.usuarioId,
          organizacionId: data.organizacionId,
          accion: data.accion,
          entidad: data.entidad,
          entidadId: data.entidadId,
          cambios: data.cambios ? JSON.stringify(data.cambios) : null,
          ipAddress: data.ipAddress || undefined,
          userAgent: data.userAgent || undefined,
        },
      });
    } catch (error) {
      console.error('Error registrando auditoría:', error);
    }
  }

  // Extraer IP y User-Agent de request
  extraerMetadatos(request?: Request) {
    if (!request) return { ipAddress: null, userAgent: null };

    const ipAddress =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      request.ip ||
      null;

    const userAgent = (request.headers['user-agent'] as string) || null;

    return { ipAddress, userAgent };
  }

  // Obtener auditoría de organización
  async obtenerPorOrganizacion(
    organizacionId: number,
    limite = 100,
    offset = 0,
  ) {
    return this.prisma.auditoriaLog.findMany({
      where: { organizacionId },
      orderBy: { createdAt: 'desc' },
      take: limite,
      skip: offset,
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
            nombre: true,
            apellido: true,
          },
        },
      },
    });
  }

  // Contar registros de auditoría
  async contarPorOrganizacion(organizacionId: number) {
    return this.prisma.auditoriaLog.count({
      where: { organizacionId },
    });
  }

  // Obtener auditoría de usuario
  async obtenerPorUsuario(usuarioId: number, limite = 100, offset = 0) {
    return this.prisma.auditoriaLog.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
      take: limite,
      skip: offset,
    });
  }
}
