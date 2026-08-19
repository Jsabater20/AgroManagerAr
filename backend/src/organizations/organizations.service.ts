import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import { AsignarCampoDto } from './dto/asignar-campo.dto';
import { ActualizarVisibilidadModuloDto } from './dto/actualizar-visibilidad-modulo.dto';
import { InvitarMiembroDto } from './dto/invitar-miembro.dto';
import { MiembroResponseDto } from './dto/miembro-response.dto';
import { InvitacionResponseDto } from './dto/invitacion-response.dto';
import { MiembroPanelDto, ActivityCountDto } from './dto/miembro-panel.dto';
import { RecursoAsignableDto } from './dto/recurso-asignable.dto';
import { CambiarRolOwnerDto } from './dto/cambiar-rol-owner.dto';
import { MailerService } from '../mailer/mailer.service';
import { PlanService } from '../plan/plan.service';

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

const DURACION_INVITACION_DIAS = 7;

@Injectable()
export class OrganizationsService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private planService: PlanService,
  ) {}

  private invitationUrl(token: string): string {
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';
    return `${frontendUrl}/aceptar-invitacion?token=${token}`;
  }

  // ─── VALIDACIÓN ───────────────────────────────────────────────────────────

  private async validarOwner(orgId: number, userId: number): Promise<void> {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: orgId },
      select: { propietarioId: true },
    });

    if (!org || org.propietarioId !== userId) {
      throw new ForbiddenException(
        'Solo el propietario puede realizar esta acción',
      );
    }
  }

  // ─── ORGANIZACIONES ───────────────────────────────────────────────────────

  async obtenerOrganizaciones(userId?: number) {
    if (!userId) {
      return await this.prisma.organizacion.findMany({
        select: {
          id: true,
          nombre: true,
          propietarioId: true,
        },
      });
    }

    const orgsComoOwner = await this.prisma.organizacion.findMany({
      where: { propietarioId: userId },
      select: {
        id: true,
        nombre: true,
        propietarioId: true,
      },
    });

    const orgsComoMiembro = await this.prisma.usuarioOrganizacion.findMany({
      where: { usuarioId: userId, activo: true },
      select: {
        organizacion: {
          select: {
            id: true,
            nombre: true,
            propietarioId: true,
          },
        },
      },
    });

    const allOrgs = [
      ...orgsComoOwner,
      ...orgsComoMiembro.map((m) => m.organizacion),
    ];

    const uniqueOrgs = Array.from(
      new Map(allOrgs.map((org) => [org.id, org])).values(),
    );

    return uniqueOrgs;
  }

  // ─── MIEMBROS ─────────────────────────────────────────────────────────────

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
          select: { moduloNombre: true, activo: true },
        },
      },
    });

    return miembros.map((m) => ({
      id: m.id,
      usuarioId: m.usuarioId,
      nombre: m.usuario.nombre,
      apellido: m.usuario.apellido,
      email: m.usuario.email,
      rol: m.roles,
      activo: m.activo,
      fechaIncorporacion: m.fechaInvitacion?.toISOString() || new Date().toISOString(),
      usuario: m.usuario,
      roles: m.roles ? [m.roles] : [],
      campos: m.AsignacionCampo.map((ac) => ({
        id: ac.Campo.id,
        nombre: ac.Campo.nombre,
      })),
      modulos: m.VisibilidadModulo,
    }));
  }

  // ─── PANEL DEL OWNER ───────────────────────────────────────────────────────

  async obtenerMiembroActual(
    organizacionId: number,
    usuarioId: number,
  ): Promise<MiembroResponseDto> {
    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: {
        usuarioId_organizacionId: { usuarioId, organizacionId },
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
          select: { moduloNombre: true, activo: true },
        },
      },
    });

    if (!miembro || !miembro.activo) {
      throw new NotFoundException('Membresia activa no encontrada');
    }

    const tieneTrabajosAsignados = await this.prisma.actividadMiembro.count({
      where: {
        organizacionId,
        usuarioOrganizacionId: miembro.id,
        activo: true,
      },
    });

    let modulos = miembro.VisibilidadModulo;
    if (tieneTrabajosAsignados > 0) {
      const moduloTareas = await this.prisma.visibilidadModulo.upsert({
        where: {
          usuarioOrganizacionId_moduloNombre: {
            usuarioOrganizacionId: miembro.id,
            moduloNombre: 'Tareas',
          },
        },
        update: { activo: true },
        create: {
          usuarioOrganizacionId: miembro.id,
          moduloNombre: 'Tareas',
          activo: true,
        },
        select: { moduloNombre: true, activo: true },
      });

      modulos = [
        ...miembro.VisibilidadModulo.filter(
          (modulo) => modulo.moduloNombre !== 'Tareas',
        ),
        moduloTareas,
      ];
    }

    return {
      id: miembro.id,
      usuarioId: miembro.usuarioId,
      usuario: miembro.usuario,
      roles: miembro.roles ? [miembro.roles] : [],
      activo: miembro.activo,
      campos: miembro.AsignacionCampo.map((asignacion) => ({
        id: asignacion.Campo.id,
        nombre: asignacion.Campo.nombre,
      })),
      modulos,
    };
  }

  async obtenerMiembrosPanel(
    orgId: number,
    userId: number,
  ): Promise<MiembroPanelDto[]> {
    // Validar que es owner
    await this.validarOwner(orgId, userId);

    const miembros = await this.prisma.usuarioOrganizacion.findMany({
      where: { organizacionId: orgId },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
          },
        },
        AsignacionCampo: {
          where: { activo: true },
          include: { Campo: { select: { nombre: true } } },
        },
        VisibilidadModulo: {
          select: { moduloNombre: true, activo: true },
        },
      },
    });

    const miembrosPanelPromises = miembros.map(async (m) => {
      // Contar actividades por estado
      const actividades = await this.prisma.tareaRural.groupBy({
        by: ['estado'],
        where: {
          usuarioId: m.usuarioId,
          organizacionId: orgId,
        },
        _count: true,
      });

      const activityCount: ActivityCountDto = {
        pendientes: 0,
        enProgreso: 0,
        completadas: 0,
      };

      actividades.forEach((a: any) => {
        if (a.estado === 'PENDIENTE') activityCount.pendientes = a._count;
        if (a.estado === 'EN_PROGRESO') activityCount.enProgreso = a._count;
        if (a.estado === 'COMPLETADA') activityCount.completadas = a._count;
      });

      return {
        id: m.id,
        nombre: m.usuario.nombre,
        apellido: m.usuario.apellido,
        email: m.usuario.email,
        rol: m.roles,
        activo: m.activo,
        fechaIncorporacion: m.fechaInvitacion?.toISOString() || '',
        actividades: activityCount,
        recursosCampos: m.AsignacionCampo.map((ac) => ac.Campo.nombre),
        modulos: m.VisibilidadModulo,
      };
    });

    return await Promise.all(miembrosPanelPromises);
  }

  async cambiarRolMiembroOwner(
    orgId: number,
    usuarioOrganizacionId: number,
    dto: CambiarRolOwnerDto,
    userId: number,
  ): Promise<{ success: boolean; message: string }> {
    // Validar owner
    await this.validarOwner(orgId, userId);

    // Verificar que no cambia el rol del owner
    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrganizacionId },
      include: { usuario: true },
    });

    if (!miembro || miembro.organizacionId !== orgId) {
      throw new NotFoundException('Miembro no encontrado');
    }

    const org = await this.prisma.organizacion.findUnique({
      where: { id: orgId },
      select: { propietarioId: true },
    });

    if (miembro.usuarioId === org?.propietarioId) {
      throw new BadRequestException('No puedes cambiar el rol del propietario');
    }

    // Actualizar rol
    await this.prisma.usuarioOrganizacion.update({
      where: { id: usuarioOrganizacionId },
      data: {
        roles: dto.nuevoRol,
      },
    });

    return {
      success: true,
      message: `Rol actualizado a ${dto.nuevoRol}`,
    };
  }

  async suspenderMiembro(
    orgId: number,
    usuarioOrganizacionId: number,
    userId: number,
  ): Promise<{ success: boolean; message: string }> {
    await this.validarOwner(orgId, userId);

    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrganizacionId },
    });

    if (!miembro || miembro.organizacionId !== orgId) {
      throw new NotFoundException('Miembro no encontrado');
    }

    await this.prisma.usuarioOrganizacion.update({
      where: { id: usuarioOrganizacionId },
      data: { activo: false },
    });

    return { success: true, message: 'Miembro suspendido' };
  }

  async activarMiembro(
    orgId: number,
    usuarioOrganizacionId: number,
    userId: number,
  ): Promise<{ success: boolean; message: string }> {
    await this.validarOwner(orgId, userId);

    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrganizacionId },
    });

    if (!miembro || miembro.organizacionId !== orgId) {
      throw new NotFoundException('Miembro no encontrado');
    }

    await this.prisma.usuarioOrganizacion.update({
      where: { id: usuarioOrganizacionId },
      data: { activo: true },
    });

    return { success: true, message: 'Miembro activado' };
  }

  async quitarMiembro(
    orgId: number,
    usuarioOrganizacionId: number,
    userId: number,
  ): Promise<{ success: boolean; message: string }> {
    await this.validarOwner(orgId, userId);

    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrganizacionId },
    });

    if (!miembro || miembro.organizacionId !== orgId) {
      throw new NotFoundException('Miembro no encontrado');
    }

    // Eliminar asignaciones de campos
    await this.prisma.asignacionCampo.deleteMany({
      where: { usuarioOrganizacionId },
    });

    // Marcar como inactivo (soft delete)
    await this.prisma.usuarioOrganizacion.update({
      where: { id: usuarioOrganizacionId },
      data: { activo: false },
    });

    return { success: true, message: 'Miembro removido de la organización' };
  }

  async obtenerRecursosAsignables(
    orgId: number,
    usuarioOrganizacionId: number,
    userId: number,
  ): Promise<RecursoAsignableDto[]> {
    await this.validarOwner(orgId, userId);

    // Obtener campos de la organización
    const campos = await this.prisma.campo.findMany({
      where: { organizacionId: orgId },
      select: { id: true, nombre: true },
    });

    // Obtener asignaciones actuales del miembro
    const asignacionesActuales = await this.prisma.asignacionCampo.findMany({
      where: { usuarioOrganizacionId, activo: true },
      select: { campoId: true },
    });

    const camposAsignadosIds = asignacionesActuales.map((a) => a.campoId);

    return campos.map((campo) => ({
      id: campo.id,
      nombre: campo.nombre,
      tipo: 'CAMPO' as const,
      asignado: camposAsignadosIds.includes(campo.id),
    }));
  }

  async asignarRecurso(
    orgId: number,
    usuarioOrganizacionId: number,
    recursoTipo: string,
    recursoId: number,
    userId: number,
  ): Promise<{ success: boolean; message: string }> {
    await this.validarOwner(orgId, userId);

    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrganizacionId },
    });

    if (!miembro || miembro.organizacionId !== orgId) {
      throw new NotFoundException('Miembro no encontrado');
    }

    if (recursoTipo === 'CAMPO') {
      // Verificar que el campo pertenece a la organización
      const campo = await this.prisma.campo.findUnique({
        where: { id: recursoId },
        select: { organizacionId: true },
      });

      if (!campo || campo.organizacionId !== orgId) {
        throw new NotFoundException('Campo no encontrado en esta organización');
      }

      // Verificar que no está ya asignado
      const yaAsignado = await this.prisma.asignacionCampo.findFirst({
        where: {
          usuarioOrganizacionId,
          campoId: recursoId,
        },
      });

      if (yaAsignado && yaAsignado.activo) {
        throw new BadRequestException('El campo ya está asignado a este miembro');
      }

      if (yaAsignado && !yaAsignado.activo) {
        // Reactivar si fue desactivado
        await this.prisma.asignacionCampo.update({
          where: { id: yaAsignado.id },
          data: { activo: true },
        });
      } else {
        // Crear nueva asignación
        await this.prisma.asignacionCampo.create({
          data: {
            usuarioOrganizacionId,
            campoId: recursoId,
            activo: true,
          },
        });
      }
    }

    return { success: true, message: `Recurso asignado al miembro` };
  }

  async retirarRecurso(
    orgId: number,
    usuarioOrganizacionId: number,
    recursoTipo: string,
    recursoId: number,
    userId: number,
  ): Promise<{ success: boolean; message: string }> {
    await this.validarOwner(orgId, userId);

    if (recursoTipo === 'CAMPO') {
      const asignacion = await this.prisma.asignacionCampo.findFirst({
        where: {
          usuarioOrganizacionId,
          campoId: recursoId,
        },
      });

      if (!asignacion) {
        throw new NotFoundException('Asignación no encontrada');
      }

      await this.prisma.asignacionCampo.update({
        where: { id: asignacion.id },
        data: { activo: false },
      });
    }

    return { success: true, message: 'Recurso retirado del miembro' };
  }

  // ─── INVITACIONES ─────────────────────────────────────────────────────────

  async obtenerUsoMiembros(
    organizacionId: number,
    userId: number,
  ) {
    await this.validarOwner(organizacionId, userId);
    return this.planService.getMiembrosUso(organizacionId);
  }

  async invitarMiembro(
    organizacionId: number,
    dto: InvitarMiembroDto,
  ): Promise<InvitacionResponseDto> {
    await this.planService.checkMiembrosLimit(organizacionId);

    // Verificar que el email no está ya en la organización
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });

    if (usuarioExistente) {
      const yaEsMiembro = await this.prisma.usuarioOrganizacion.findFirst({
        where: {
          organizacionId,
          usuarioId: usuarioExistente.id,
        },
      });

      if (yaEsMiembro) {
        throw new BadRequestException(
          'Este usuario ya es miembro de la organización',
        );
      }
    }

    // Crear token de invitación
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + DURACION_INVITACION_DIAS);

    const invitacion = await this.prisma.invitacionOrganizacion.create({
      data: {
        organizacionId,
        email: dto.email,
        rol: (dto.rol || 'OPERARIO') as any,
        token,
        estado: 'PENDIENTE',
        expiresAt,
        mensaje: dto.mensaje || null,
      },
    });

    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: {
        nombre: true,
        propietario: { select: { nombre: true } },
      },
    });

    if (organizacion) {
      await this.mailerService.enviarInvitacion(
        invitacion.email,
        organizacion.nombre,
        organizacion.propietario.nombre,
        this.invitationUrl(invitacion.token),
      );
    }

    return {
      id: invitacion.id,
      email: invitacion.email,
      rol: invitacion.rol,
      estado: invitacion.estado,
      mensaje: invitacion.mensaje || undefined,
      fechaInvitacion: invitacion.createdAt.toISOString(),
      expiresAt: invitacion.expiresAt.toISOString(),
      token: invitacion.token,
    };
  }

  async aceptarInvitacion(
    token: string,
    userId: number,
  ): Promise<{ success: boolean; message: string }> {
    const invitacion = await this.prisma.invitacionOrganizacion.findUnique({
      where: { token },
      include: { organizacion: true },
    });

    if (!invitacion) {
      throw new NotFoundException('Invitación no encontrada');
    }

    if (invitacion.estado !== 'PENDIENTE') {
      throw new BadRequestException(
        `La invitación ya ha sido ${invitacion.estado.toLowerCase()}`,
      );
    }

    if (new Date() > invitacion.expiresAt) {
      throw new BadRequestException('La invitación ha expirado');
    }

    await this.planService.checkMiembrosLimit(
      invitacion.organizacionId,
      invitacion.id,
    );

    const usuario = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Transacción: actualizar invitación y crear membresía
    await this.prisma.$transaction(async (tx) => {
      await tx.invitacionOrganizacion.update({
        where: { id: invitacion.id },
        data: {
          estado: 'ACEPTADA',
          aceptadoEn: new Date(),
          usuarioId: userId,
        },
      });

      const miembro = await tx.usuarioOrganizacion.create({
        data: {
          usuarioId: userId,
          organizacionId: invitacion.organizacionId,
          roles: invitacion.rol,
          activo: true,
          fechaInvitacion: new Date(),
        },
      });

      // Habilitar módulos por defecto
      await tx.visibilidadModulo.createMany({
        data: MODULOS_DISPONIBLES.map((moduloNombre) => ({
          usuarioOrganizacionId: miembro.id,
          moduloNombre,
          activo: false,
        })),
      });
    });

    return {
      success: true,
      message: 'Invitación aceptada correctamente',
    };
  }

  async obtenerInvitaciones(
    organizacionId: number,
  ): Promise<InvitacionResponseDto[]> {
    const invitaciones = await this.prisma.invitacionOrganizacion.findMany({
      where: { organizacionId, estado: 'PENDIENTE' },
      orderBy: { createdAt: 'desc' },
    });

    return invitaciones.map((inv) => ({
      id: inv.id,
      email: inv.email,
      rol: inv.rol,
      estado: inv.estado,
      mensaje: inv.mensaje || undefined,
      fechaInvitacion: inv.createdAt.toISOString(),
      expiresAt: inv.expiresAt.toISOString(),
      token: inv.token,
    }));
  }

  async reenviarInvitacion(
    organizacionId: number,
    invitacionId: number,
  ): Promise<{ success: boolean; message: string }> {
    const invitacion = await this.prisma.invitacionOrganizacion.findUnique({
      where: { id: invitacionId },
    });

    if (!invitacion || invitacion.organizacionId !== organizacionId) {
      throw new NotFoundException('Invitación no encontrada');
    }

    if (invitacion.estado !== 'PENDIENTE') {
      throw new BadRequestException(
        'Solo puedes reenviar invitaciones pendientes',
      );
    }

    // Extender fecha de expiración
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + DURACION_INVITACION_DIAS);

    const invitacionActualizada = await this.prisma.invitacionOrganizacion.update({
      where: { id: invitacionId },
      data: { expiresAt: newExpiresAt },
    });

    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: {
        nombre: true,
        propietario: { select: { nombre: true } },
      },
    });

    if (organizacion) {
      await this.mailerService.enviarInvitacion(
        invitacionActualizada.email,
        organizacion.nombre,
        organizacion.propietario.nombre,
        this.invitationUrl(invitacionActualizada.token),
      );
    }

    return { success: true, message: 'Invitación reenviada' };
  }

  async cancelarInvitacion(
    organizacionId: number,
    invitacionId: number,
  ): Promise<{ success: boolean; message: string }> {
    const invitacion = await this.prisma.invitacionOrganizacion.findUnique({
      where: { id: invitacionId },
    });

    if (!invitacion || invitacion.organizacionId !== organizacionId) {
      throw new NotFoundException('Invitación no encontrada');
    }

    await this.prisma.invitacionOrganizacion.update({
      where: { id: invitacionId },
      data: { estado: 'CANCELADA' },
    });

    return { success: true, message: 'Invitación cancelada' };
  }

  // ─── MIEMBROS (MÉTODOS HEREDADOS) ─────────────────────────────────────────

  async actualizarMiembro(
    organizacionId: number,
    usuarioOrgId: number,
    dto: ActualizarMiembroDto,
  ): Promise<void> {
    const usuarioOrg = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrgId },
    });

    if (!usuarioOrg || usuarioOrg.organizacionId !== organizacionId) {
      throw new NotFoundException('Usuario de la organización no encontrado');
    }

    if (dto.roles && dto.roles.length > 0) {
      await this.prisma.usuarioOrganizacion.update({
        where: { id: usuarioOrgId },
        data: { roles: dto.roles[0] },
      });
    }
  }

  async eliminarMiembro(
    organizacionId: number,
    usuarioOrgId: number,
  ): Promise<void> {
    const usuarioOrg = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrgId },
    });

    if (!usuarioOrg || usuarioOrg.organizacionId !== organizacionId) {
      throw new NotFoundException('Usuario de la organización no encontrado');
    }

    await this.prisma.asignacionCampo.deleteMany({
      where: { usuarioOrganizacionId: usuarioOrgId },
    });

    await this.prisma.usuarioOrganizacion.delete({
      where: { id: usuarioOrgId },
    });
  }

  // ─── CAMPOS ────────────────────────────────────────────────────────────────

  async asignarCampo(
    organizacionId: number,
    usuarioOrgId: number,
    dto: AsignarCampoDto,
  ): Promise<void> {
    const campo = await this.prisma.campo.findUnique({
      where: { id: dto.campoId },
    });

    if (!campo || campo.organizacionId !== organizacionId) {
      throw new NotFoundException('Campo no encontrado');
    }

    const yaAsignado = await this.prisma.asignacionCampo.findFirst({
      where: {
        usuarioOrganizacionId: usuarioOrgId,
        campoId: dto.campoId,
      },
    });

    if (yaAsignado) {
      throw new BadRequestException('El campo ya está asignado a este miembro');
    }

    await this.prisma.asignacionCampo.create({
      data: {
        usuarioOrganizacionId: usuarioOrgId,
        campoId: dto.campoId,
        activo: true,
      },
    });
  }

  async desasignarCampo(
    organizacionId: number,
    usuarioOrgId: number,
    campoId: number,
  ): Promise<void> {
    const asignacion = await this.prisma.asignacionCampo.findFirst({
      where: {
        usuarioOrganizacionId: usuarioOrgId,
        campoId,
      },
    });

    if (!asignacion) {
      throw new NotFoundException('Asignación no encontrada');
    }

    await this.prisma.asignacionCampo.delete({
      where: { id: asignacion.id },
    });
  }

  // ─── MÓDULOS ───────────────────────────────────────────────────────────────

  async actualizarVisibilidadModulo(
    organizacionId: number,
    usuarioOrgId: number,
    dto: ActualizarVisibilidadModuloDto,
  ): Promise<void> {
    // Validar que el usuario existe en la organización
    const usuarioOrg = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrgId },
    });

    if (!usuarioOrg || usuarioOrg.organizacionId !== organizacionId) {
      throw new NotFoundException('Usuario de la organización no encontrado');
    }

    const modulo = await this.prisma.visibilidadModulo.findFirst({
      where: {
        usuarioOrganizacionId: usuarioOrgId,
        moduloNombre: dto.moduloNombre,
      },
    });

    if (!modulo) {
      await this.prisma.visibilidadModulo.create({
        data: {
          usuarioOrganizacionId: usuarioOrgId,
          moduloNombre: dto.moduloNombre,
          activo: dto.activo,
        },
      });
    } else {
      await this.prisma.visibilidadModulo.update({
        where: { id: modulo.id },
        data: { activo: dto.activo },
      });
    }
  }
}
