import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  // Validar si usuario tiene acceso a recurso dentro de fecha válida
  async verificarAccesoTemporal(
    usuarioId: number,
    organizacionId: number,
    recursoTipo?: string,
    recursoId?: number,
  ): Promise<boolean> {
    try {
      const ahora = new Date();

      const permisos = await this.prisma.asignacionPermiso.findMany({
        where: {
          usuarioOrganizacion: {
            usuarioId,
            organizacionId,
          },
          activo: true,
          fechaInicio: { lte: ahora },
          fechaVencimiento: { gte: ahora },
        },
      });

      // Sin permisos específicos = sin acceso
      if (!permisos.length) return false;

      // Si hay permisos sin restricción de recurso = acceso total
      if (permisos.some(p => !p.recursoTipo)) return true;

      // Si hay recurso específico, validar que haya permiso
      if (recursoTipo && recursoId) {
        return permisos.some(
          p => p.recursoTipo === recursoTipo && p.recursoId === recursoId,
        );
      }

      return false;
    } catch (error) {
      console.error('Error verificando acceso temporal:', error);
      return false;
    }
  }

  // Auto-revocar permisos expirados
  async revocarPermisosExpirados() {
    const ahora = new Date();
    
    await this.prisma.asignacionPermiso.updateMany({
      where: {
        fechaVencimiento: { lt: ahora },
        activo: true,
      },
      data: { activo: false },
    });
  }

  // Crear permiso temporal (ASESOR visitando campo X del 01/10 al 05/10)
  async crearPermisoTemporal(
    usuarioOrganizacionId: number,
    rolPersonalizadoId: number,
    fechaInicio: Date,
    fechaVencimiento: Date,
    recursoTipo?: string,
    recursoId?: number,
    notas?: string,
  ) {
    return this.prisma.asignacionPermiso.create({
      data: {
        usuarioOrganizacionId,
        rolPersonalizadoId,
        fechaInicio,
        fechaVencimiento,
        recursoTipo,
        recursoId,
        notas,
        activo: true,
      },
    });
  }

  // Listar permisos activos de un usuario
  async listarPermisosActivos(usuarioOrganizacionId: number) {
    return this.prisma.asignacionPermiso.findMany({
      where: {
        usuarioOrganizacionId,
        activo: true,
      },
      include: {
        rolPersonalizado: true,
      },
    });
  }

  // Listar permisos temporales de una organización
  async listarPermisosTemporalesPorOrganizacion(organizacionId: number) {
    return this.prisma.asignacionPermiso.findMany({
      where: {
        usuarioOrganizacion: {
          organizacionId,
        },
        activo: true,
      },
      include: {
        rolPersonalizado: true,
        usuarioOrganizacion: {
          include: {
            usuario: true,
          },
        },
      },
    });
  }

  // Desactivar un permiso
  async desactivarPermiso(permisoId: number) {
    return this.prisma.asignacionPermiso.update({
      where: { id: permisoId },
      data: { activo: false },
    });
  }

  // Obtener roles personalizados de una organización
  async obtenerRolesPersonalizados(organizacionId: number) {
    return this.prisma.rolPersonalizado.findMany({
      where: {
        organizacionId,
      },
      select: {
        id: true,
        nombre: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
  }
}
