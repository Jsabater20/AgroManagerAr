import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOrganizacionDto,
  UpdateOrganizacionDto,
  InvitarMiembroDto,
} from './organizations.dto';
import * as crypto from 'crypto';
import { RolOrganizacion } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async crearOrganizacion(usuarioId: number, dto: CreateOrganizacionDto) {
    return await this.prisma.organizacion.create({
      data: {
        nombre: dto.nombre,
        email: dto.email,
        plan: 'FREE',
        propietarioId: usuarioId,
      },
    });
  }

  async obtenerOrganizacionesDelUsuario(usuarioId: number) {
    // Orgs donde es dueño + orgs donde es miembro
    const comoOwner = await this.prisma.organizacion.findMany({
      where: { propietarioId: usuarioId },
      select: { id: true, nombre: true, email: true, plan: true },
    });

    const comoMiembro = await this.prisma.usuarioOrganizacion.findMany({
      where: { usuarioId },
      select: {
        organizacion: {
          select: { id: true, nombre: true, email: true, plan: true },
        },
        rol: true,
      },
    });

    return {
      comoOwner,
      comoMiembro: comoMiembro.map((m) => ({ ...m.organizacion, rol: m.rol })),
    };
  }

  async obtenerOrganizacion(organizacionId: number, usuarioId: number) {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      include: {
        propietario: { select: { id: true, email: true, nombre: true } },
        miembros: {
          include: {
            usuario: { select: { id: true, email: true, nombre: true } },
          },
        },
      },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    // Validar que el usuario sea owner o miembro
    const esOwner = org.propietarioId === usuarioId;
    const esMiembro = org.miembros.some((m) => m.usuarioId === usuarioId);

    if (!esOwner && !esMiembro) {
      throw new ForbiddenException('No tenés acceso a esta organización');
    }

    return org;
  }

  async actualizarOrganizacion(
    organizacionId: number,
    usuarioId: number,
    dto: UpdateOrganizacionDto,
  ) {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    if (org.propietarioId !== usuarioId) {
      throw new ForbiddenException(
        'Solo el dueño puede actualizar la organización',
      );
    }

    return await this.prisma.organizacion.update({
      where: { id: organizacionId },
      data: {
        nombre: dto.nombre,
        email: dto.email,
      },
    });
  }

  async invitarMiembro(
    organizacionId: number,
    usuarioId: number,
    dto: InvitarMiembroDto,
  ) {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    // Solo owner o admin pueden invitar
    if (org.propietarioId !== usuarioId) {
      const miembroActual = await this.prisma.usuarioOrganizacion.findUnique({
        where: { usuarioId_organizacionId: { usuarioId, organizacionId } },
      });

      if (!miembroActual || miembroActual.rol !== 'ADMIN') {
        throw new ForbiddenException('No tenés permiso para invitar miembros');
      }
    }

    // Chequear si ya está invitado/miembro
    const yaExiste = await this.prisma.invitacionOrganizacion.findFirst({
      where: {
        organizacionId,
        email: dto.email,
        estado: 'PENDIENTE',
      },
    });

    if (yaExiste) {
      throw new BadRequestException('Esta invitación ya existe');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
    const rol: RolOrganizacion = (dto.rol as RolOrganizacion) || 'OPERARIO';

    return await this.prisma.invitacionOrganizacion.create({
      data: {
        organizacionId,
        email: dto.email,
        rol,
        token,
        estado: 'PENDIENTE',
        expiresAt,
      },
    });
  }

  async aceptarInvitacion(token: string, usuarioId: number) {
    const invitacion = await this.prisma.invitacionOrganizacion.findUnique({
      where: { token },
    });

    if (!invitacion) {
      throw new NotFoundException('Invitación no encontrada');
    }

    if (invitacion.estado !== 'PENDIENTE') {
      throw new BadRequestException(
        `La invitación ya fue ${invitacion.estado.toLowerCase()}`,
      );
    }

    if (invitacion.expiresAt < new Date()) {
      throw new BadRequestException('La invitación ha expirado');
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario || usuario.email !== invitacion.email) {
      throw new ForbiddenException(
        'No podés aceptar esta invitación con este email',
      );
    }

    // Crear membresía
    await this.prisma.usuarioOrganizacion.create({
      data: {
        usuarioId,
        organizacionId: invitacion.organizacionId,
        rol: invitacion.rol,
        estado: 'ACTIVO',
      },
    });

    // Actualizar invitación
    await this.prisma.invitacionOrganizacion.update({
      where: { id: invitacion.id },
      data: {
        estado: 'ACEPTADA',
        aceptadoEn: new Date(),
        usuarioId,
      },
    });

    return { message: 'Invitación aceptada' };
  }

  async obtenerMiembros(organizacionId: number, usuarioId: number) {
    await this.obtenerOrganizacion(organizacionId, usuarioId);

    return await this.prisma.usuarioOrganizacion.findMany({
      where: { organizacionId },
      include: {
        usuario: {
          select: { id: true, email: true, nombre: true, apellido: true },
        },
      },
    });
  }

  async eliminarMiembro(
    organizacionId: number,
    usuarioId: number,
    miembroId: number,
  ) {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    if (org.propietarioId !== usuarioId) {
      throw new ForbiddenException('Solo el dueño puede eliminar miembros');
    }

    if (miembroId === usuarioId) {
      throw new BadRequestException('No podés eliminarte a ti mismo');
    }

    return await this.prisma.usuarioOrganizacion.delete({
      where: {
        usuarioId_organizacionId: {
          usuarioId: miembroId,
          organizacionId,
        },
      },
    });
  }
}
