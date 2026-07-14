import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../mailer/mailer.service';
import {
  CreateOrganizacionDto,
  UpdateOrganizacionDto,
  InvitarMiembroDto,
} from './organizations.dto';
import * as crypto from 'crypto';
import { RolOrganizacion } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);

  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
  ) {}

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
    // Orgs donde es dueño
    const comoOwner = await this.prisma.organizacion.findMany({
      where: { propietarioId: usuarioId },
      select: { id: true, nombre: true, email: true, plan: true, propietarioId: true },
    });

    // Orgs donde es miembro
    const comoMiembro = await this.prisma.usuarioOrganizacion.findMany({
      where: { usuarioId },
      select: {
        organizacion: {
          select: { id: true, nombre: true, email: true, plan: true, propietarioId: true },
        },
      },
    });

    // Combinar y eliminar duplicados (en caso que sea owner y miembro)
    const todas = [
      ...comoOwner,
      ...comoMiembro.map((m) => m.organizacion),
    ];

    // Eliminar duplicados por ID
    const unicas = Array.from(
      new Map(todas.map((org) => [org.id, org])).values(),
    );

    return unicas;
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

    // Crear la invitación
    const invitacion = await this.prisma.invitacionOrganizacion.create({
      data: {
        organizacionId,
        email: dto.email,
        rol,
        token,
        estado: 'PENDIENTE',
        expiresAt,
      },
    });

    // Obtener datos del usuario que invita
    const usuarioInvitador = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    // Construir link de invitación (usar frontend URL)
    const frontendUrl = process.env.FRONTEND_URL || 'https://agro-manager-ar-px8f-git-develop-agro-manager-ar-s-projects.vercel.app';
    const linkInvitacion = `${frontendUrl}/aceptar-invitacion?token=${token}`;

    // Enviar email
    try {
      this.logger.log(`[invitarMiembro] Enviando email a ${dto.email}...`);
      const mailResult = await this.mailer.enviarInvitacion(
        dto.email,
        org.nombre,
        `${usuarioInvitador?.nombre || 'Un usuario'} ${usuarioInvitador?.apellido || ''}`.trim(),
        linkInvitacion,
      );
      this.logger.log(`[invitarMiembro] Email enviado exitosamente: ${JSON.stringify(mailResult)}`);
    } catch (error) {
      this.logger.error(`[invitarMiembro] Error al enviar email: ${error.message}`, error.stack);
      // No fallar si el email no se envía, pero logear el error
    }

    return invitacion;
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

  // ────────────────────────────────────────────────────────────────────────────
  // NUEVO: Cambiar rol de miembro
  // ────────────────────────────────────────────────────────────────────────────

  async cambiarRolMiembro(
    organizacionId: number,
    miembroId: number,
    nuevoRol: 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR',
    usuarioActualId: number,
  ) {
    // Validar que el usuario actual sea OWNER o ADMIN
    const org = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    const esOwner = org.propietarioId === usuarioActualId;
    const esMiembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: { usuarioId_organizacionId: { usuarioId: usuarioActualId, organizacionId } },
    });

    if (!esOwner && (!esMiembro || !['OWNER', 'ADMIN'].includes(esMiembro.rol))) {
      throw new ForbiddenException('No tienes permisos para cambiar roles');
    }

    // No permitir cambiar el OWNER
    const miembroActual = await this.prisma.usuarioOrganizacion.findUnique({
      where: { usuarioId_organizacionId: { usuarioId: miembroId, organizacionId } },
    });

    if (miembroActual?.rol === 'OWNER') {
      throw new ForbiddenException('No puedes cambiar el rol del propietario');
    }

    if (!miembroActual) {
      throw new NotFoundException('Miembro no encontrado');
    }

    // Cambiar rol
    return this.prisma.usuarioOrganizacion.update({
      where: { usuarioId_organizacionId: { usuarioId: miembroId, organizacionId } },
      data: { rol: nuevoRol as RolOrganizacion },
      include: {
        usuario: {
          select: { id: true, email: true, nombre: true, apellido: true },
        },
      },
    });
  }
}
