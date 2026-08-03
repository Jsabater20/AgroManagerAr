import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import { AsignarCampoDto } from './dto/asignar-campo.dto';
import { ActualizarVisibilidadModuloDto } from './dto/actualizar-visibilidad-modulo.dto';
import { MiembroResponseDto } from './dto/miembro-response.dto';

const MODULOS_DISPONIBLES = [
  'Dashboard',
  'Campos',
  'Cultivos',
  'Siembras',
  'Insumos',
  'Ganadería',
  'Tareas',
  'Maquinarias',
  'Finanzas',
  'Reportes',
  'Clima',
];

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async obtenerOrganizaciones() {
    return await this.prisma.organizacion.findMany({
      select: {
        id: true,
        nombre: true,
        propietarioId: true,
        propietario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
    });
  }

  async obtenerMiembros(organizacionId: number): Promise<MiembroResponseDto[]> {
    const miembros = await this.prisma.usuarioOrganizacion.findMany({
      where: { organizacionId, activo: true },
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
            nombre: true,
            apellido: true,
          },
        },
        AsignacionCampo: {
          where: { activo: true },
          include: { Campo: { select: { id: true, nombre: true } } },
        },
        VisibilidadModulo: {
          where: { activo: true },
          select: { moduloNombre: true, activo: true },
        },
      },
    });

    return miembros.map((m) => ({
      id: m.id,
      usuarioId: m.usuarioId,
      usuario: m.usuario,
      roles: JSON.parse(m.roles || '[]'),
      activo: m.activo,
      campos: m.AsignacionCampo.map((ac) => ({
        id: ac.Campo.id,
        nombre: ac.Campo.nombre,
      })),
      modulos: m.VisibilidadModulo.map((vm) => ({
        moduloNombre: vm.moduloNombre,
        activo: vm.activo,
      })),
    }));
  }

  async actualizarMiembro(
    organizacionId: number,
    usuarioOrganizacionId: number,
    dto: ActualizarMiembroDto,
  ): Promise<MiembroResponseDto> {
    const miembro = await this.prisma.usuarioOrganizacion.findFirst({
      where: { id: usuarioOrganizacionId, organizacionId },
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
            nombre: true,
            apellido: true,
          },
        },
        AsignacionCampo: {
          where: { activo: true },
          include: { Campo: { select: { id: true, nombre: true } } },
        },
        VisibilidadModulo: {
          where: { activo: true },
        },
      },
    });

    if (!miembro) {
      throw new NotFoundException('Miembro no encontrado');
    }

    const actualizado = await this.prisma.usuarioOrganizacion.update({
      where: { id: usuarioOrganizacionId },
      data: {
        roles: JSON.stringify(dto.roles || []),
      },
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
            nombre: true,
            apellido: true,
          },
        },
        AsignacionCampo: {
          where: { activo: true },
          include: { Campo: { select: { id: true, nombre: true } } },
        },
        VisibilidadModulo: {
          where: { activo: true },
        },
      },
    });

    return {
      id: actualizado.id,
      usuarioId: actualizado.usuarioId,
      usuario: actualizado.usuario,
      roles: JSON.parse(actualizado.roles || '[]'),
      activo: actualizado.activo,
      campos: actualizado.AsignacionCampo.map((ac) => ({
        id: ac.Campo.id,
        nombre: ac.Campo.nombre,
      })),
      modulos: actualizado.VisibilidadModulo.map((vm) => ({
        moduloNombre: vm.moduloNombre,
        activo: vm.activo,
      })),
    };
  }

  async asignarCampo(
    organizacionId: number,
    usuarioOrganizacionId: number,
    dto: AsignarCampoDto,
  ): Promise<void> {
    const miembro = await this.prisma.usuarioOrganizacion.findFirst({
      where: { id: usuarioOrganizacionId, organizacionId },
    });

    if (!miembro) {
      throw new NotFoundException('Miembro no encontrado');
    }

    const campo = await this.prisma.campo.findFirst({
      where: { id: dto.campoId, organizacionId },
    });

    if (!campo) {
      throw new NotFoundException('Campo no encontrado');
    }

    await this.prisma.asignacionCampo.upsert({
      where: {
        usuarioOrganizacionId_campoId: {
          usuarioOrganizacionId,
          campoId: dto.campoId,
        },
      },
      create: {
        usuarioOrganizacionId,
        campoId: dto.campoId,
        activo: true,
      },
      update: {
        activo: true,
      },
    });
  }

  async desasignarCampo(
    organizacionId: number,
    usuarioOrganizacionId: number,
    campoId: number,
  ): Promise<void> {
    const miembro = await this.prisma.usuarioOrganizacion.findFirst({
      where: { id: usuarioOrganizacionId, organizacionId },
    });

    if (!miembro) {
      throw new NotFoundException('Miembro no encontrado');
    }

    await this.prisma.asignacionCampo.updateMany({
      where: { usuarioOrganizacionId, campoId },
      data: { activo: false },
    });
  }

  async actualizarVisibilidadModulo(
    organizacionId: number,
    usuarioOrganizacionId: number,
    dto: ActualizarVisibilidadModuloDto,
  ): Promise<void> {
    if (!MODULOS_DISPONIBLES.includes(dto.moduloNombre)) {
      throw new BadRequestException(`Módulo no válido: ${dto.moduloNombre}`);
    }

    const miembro = await this.prisma.usuarioOrganizacion.findFirst({
      where: { id: usuarioOrganizacionId, organizacionId },
    });

    if (!miembro) {
      throw new NotFoundException('Miembro no encontrado');
    }

    await this.prisma.visibilidadModulo.upsert({
      where: {
        usuarioOrganizacionId_moduloNombre: {
          usuarioOrganizacionId,
          moduloNombre: dto.moduloNombre,
        },
      },
      create: {
        usuarioOrganizacionId,
        moduloNombre: dto.moduloNombre,
        activo: dto.activo,
      },
      update: {
        activo: dto.activo,
      },
    });
  }

  async obtenerModulosDisponibles(): Promise<string[]> {
    return MODULOS_DISPONIBLES;
  }

  async habilitarModulosPorDefecto(usuarioOrganizacionId: number): Promise<void> {
    for (const modulo of MODULOS_DISPONIBLES) {
      await this.prisma.visibilidadModulo.upsert({
        where: {
          usuarioOrganizacionId_moduloNombre: {
            usuarioOrganizacionId,
            moduloNombre: modulo,
          },
        },
        create: {
          usuarioOrganizacionId,
          moduloNombre: modulo,
          activo: true,
        },
        update: {
          activo: true,
        },
      });
    }
  }

  async eliminarMiembro(
    organizacionId: number,
    usuarioOrganizacionId: number,
  ): Promise<void> {
    const miembro = await this.prisma.usuarioOrganizacion.findFirst({
      where: { id: usuarioOrganizacionId, organizacionId },
    });

    if (!miembro) {
      throw new NotFoundException('Miembro no encontrado');
    }

    await this.prisma.usuarioOrganizacion.update({
      where: { id: usuarioOrganizacionId },
      data: { activo: false },
    });
  }
}
