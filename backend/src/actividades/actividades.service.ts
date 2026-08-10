import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActividadMiembro,
  EstadoActividad,
  TipoRecursoActividad,
  ObservacionActividad,
} from '@prisma/client';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { CambiarEstadoActividadDto } from './dto/cambiar-estado-actividad.dto';
import { ReasignarActividadDto } from './dto/reasignar-actividad.dto';
import { PrologarActividadDto } from './dto/prolongar-actividad.dto';
import { AgregarObservacionDto } from './dto/agregar-observacion.dto';

@Injectable()
export class ActividadesService {
  constructor(private prisma: PrismaService) {}

  // ─── VALIDACIONES ─────────────────────────────────────────────────────

  async validarOwner(orgId: number, userId: number): Promise<void> {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: orgId },
      select: { propietarioId: true },
    });

    if (!org) {
      throw new NotFoundException('Organización no encontrada');
    }

    if (org.propietarioId !== userId) {
      throw new ForbiddenException(
        'No tienes permisos para esta operación',
      );
    }
  }

  async validarMiembroOrganizacion(
    orgId: number,
    usuarioOrgId: number,
  ): Promise<void> {
    const miembro = await this.prisma.usuarioOrganizacion.findUnique({
      where: { id: usuarioOrgId },
      select: { organizacionId: true, activo: true },
    });

    if (!miembro) {
      throw new NotFoundException('Miembro no encontrado');
    }

    if (miembro.organizacionId !== orgId) {
      throw new ForbiddenException(
        'El miembro no pertenece a esta organización',
      );
    }

    if (!miembro.activo) {
      throw new BadRequestException('El miembro está inactivo');
    }
  }

  async validarRecursoDeOrganizacion(
    orgId: number,
    recursoTipo: TipoRecursoActividad,
    recursoId: number | null,
  ): Promise<void> {
    if (recursoTipo === TipoRecursoActividad.GENERAL) {
      if (recursoId !== null && recursoId !== undefined) {
        throw new BadRequestException(
          'GENERAL no puede tener recursoId',
        );
      }
      return;
    }

    if (!recursoId) {
      throw new BadRequestException(
        `${recursoTipo} requiere recursoId`,
      );
    }

    switch (recursoTipo) {
      case TipoRecursoActividad.CAMPO: {
        const campo = await this.prisma.campo.findUnique({
          where: { id: recursoId },
          select: { organizacionId: true },
        });
        if (!campo || campo.organizacionId !== orgId) {
          throw new BadRequestException('Campo no pertenece a esta organización');
        }
        break;
      }

      case TipoRecursoActividad.LOTE: {
        const lote = await this.prisma.lote.findUnique({
          where: { id: recursoId },
          select: {
            campo: { select: { organizacionId: true } },
          },
        });
        if (!lote || lote.campo.organizacionId !== orgId) {
          throw new BadRequestException('Lote no pertenece a esta organización');
        }
        break;
      }

      case TipoRecursoActividad.SIEMBRA: {
        const siembra = await this.prisma.siembra.findUnique({
          where: { id: recursoId },
          select: {
            lote: { select: { campo: { select: { organizacionId: true } } } },
          },
        });
        if (!siembra || siembra.lote.campo.organizacionId !== orgId) {
          throw new BadRequestException('Siembra no pertenece a esta organización');
        }
        break;
      }

      case TipoRecursoActividad.ANIMAL: {
        const animal = await this.prisma.animal.findUnique({
          where: { id: recursoId },
          select: { organizacionId: true },
        });
        if (!animal || animal.organizacionId !== orgId) {
          throw new BadRequestException('Animal no pertenece a esta organización');
        }
        break;
      }

      case TipoRecursoActividad.TAREA: {
        const tarea = await this.prisma.tareaRural.findUnique({
          where: { id: recursoId },
          select: { organizacionId: true },
        });
        if (!tarea || tarea.organizacionId !== orgId) {
          throw new BadRequestException('Tarea no pertenece a esta organización');
        }
        break;
      }

      case TipoRecursoActividad.MAQUINARIA: {
        const maquinaria = await this.prisma.maquinaria.findUnique({
          where: { id: recursoId },
          select: { organizacionId: true },
        });
        if (!maquinaria || maquinaria.organizacionId !== orgId) {
          throw new BadRequestException('Maquinaria no pertenece a esta organización');
        }
        break;
      }

      case TipoRecursoActividad.CAMPANIA: {
        const campania = await this.prisma.campania.findUnique({
          where: { id: recursoId },
          select: { organizacionId: true },
        });
        if (!campania || campania.organizacionId !== orgId) {
          throw new BadRequestException('Campaña no pertenece a esta organización');
        }
        break;
      }

      default:
        throw new BadRequestException('Tipo de recurso inválido');
    }
  }

  validarContexto(recursoTipo: TipoRecursoActividad, contexto?: string): void {
    if (!contexto) return;

    const contextos_validos = ['FINANZAS'];

    if (!contextos_validos.includes(contexto)) {
      throw new BadRequestException(`Contexto no válido: ${contexto}`);
    }

    if (contexto === 'FINANZAS') {
      if (recursoTipo !== TipoRecursoActividad.CAMPO) {
        throw new BadRequestException(
          'FINANZAS solamente es válido con recursoTipo CAMPO',
        );
      }
    }
  }

  validarFechas(
    fechaInicio: Date,
    fechaEstimadaFin: Date,
    tolerancia?: Date,
  ): void {
    if (fechaInicio > fechaEstimadaFin) {
      throw new BadRequestException(
        'fechaInicio no puede ser mayor a fechaEstimadaFin',
      );
    }

    if (tolerancia && fechaEstimadaFin <= tolerancia) {
      throw new BadRequestException(
        'fechaEstimadaFin debe ser posterior a la fecha actual',
      );
    }
  }

  private puedeCambiarA(
    estadoActual: EstadoActividad,
    estadoNuevo: EstadoActividad,
    esOwner: boolean,
  ): boolean {
    if (estadoActual === estadoNuevo) return true;

    const transiciones: Record<EstadoActividad, EstadoActividad[]> = {
      [EstadoActividad.PENDIENTE]: [
        EstadoActividad.EN_PROGRESO,
        ...(esOwner ? [EstadoActividad.CANCELADA] : []),
      ],
      [EstadoActividad.EN_PROGRESO]: [
        EstadoActividad.PAUSADA,
        EstadoActividad.COMPLETADA,
        ...(esOwner ? [EstadoActividad.CANCELADA] : []),
      ],
      [EstadoActividad.PAUSADA]: [
        EstadoActividad.EN_PROGRESO,
        ...(esOwner ? [EstadoActividad.CANCELADA] : []),
      ],
      [EstadoActividad.COMPLETADA]: [
        ...(esOwner ? [EstadoActividad.EN_PROGRESO] : []),
      ],
      [EstadoActividad.CANCELADA]: [
        ...(esOwner ? [EstadoActividad.PENDIENTE] : []),
      ],
    };

    return transiciones[estadoActual]?.includes(estadoNuevo) ?? false;
  }

  // ─── CREAR ACTIVIDAD ──────────────────────────────────────────────────

  async crear(
    orgId: number,
    dto: CreateActividadDto,
    userId: number,
  ): Promise<ActividadMiembro> {
    await this.validarOwner(orgId, userId);
    await this.validarMiembroOrganizacion(orgId, dto.usuarioOrganizacionId);
    await this.validarRecursoDeOrganizacion(
      orgId,
      dto.recursoTipo,
      dto.recursoId ?? null,
    );
    this.validarContexto(dto.recursoTipo, dto.contexto);

    const fechaInicio = new Date(dto.fechaInicio);
    const fechaEstimadaFin = new Date(dto.fechaEstimadaFin);
    this.validarFechas(fechaInicio, fechaEstimadaFin);

    const resultado = await this.prisma.$transaction(async (tx) => {
      const actividad = await tx.actividadMiembro.create({
        data: {
          organizacionId: orgId,
          usuarioOrganizacionId: dto.usuarioOrganizacionId,
          creadoPorId: userId,
          titulo: dto.titulo,
          descripcion: dto.descripcion || null,
          recursoTipo: dto.recursoTipo,
          recursoId: dto.recursoId || null,
          contexto: dto.contexto || null,
          fechaInicio,
          fechaEstimadaFin,
          estado: EstadoActividad.PENDIENTE,
          prioridad: dto.prioridad,
          activo: true,
        },
        include: {
          usuarioOrganizacion: {
            include: { usuario: true },
          },
          creadoPor: true,
        },
      });

      await tx.auditoriaLog.create({
        data: {
          usuarioId: userId,
          organizacionId: orgId,
          accion: 'ACTIVIDAD_CREADA',
          entidad: 'ActividadMiembro',
          entidadId: actividad.id,
          cambios: JSON.stringify({
            titulo: actividad.titulo,
            recursoTipo: actividad.recursoTipo,
            miembroAsignado: actividad.usuarioOrganizacionId,
          }),
        },
      });

      return actividad;
    });

    return resultado;
  }

  // ─── LISTAR ACTIVIDADES ───────────────────────────────────────────────

  async listar(
    orgId: number,
    userId: number,
    filtros?: {
      estado?: EstadoActividad;
      prioridad?: string;
      activo?: boolean;
      usuarioOrganizacionId?: number;
    },
  ): Promise<ActividadMiembro[]> {
    const miembroOrg = await this.prisma.usuarioOrganizacion.findFirst({
      where: {
        usuarioId: userId,
        organizacionId: orgId,
      },
      select: { id: true },
    });

    if (!miembroOrg) {
      throw new ForbiddenException(
        'No eres miembro de esta organización',
      );
    }

    const esOwner = await this.esOwnerOrganizacion(orgId, userId);

    const where: any = {
      organizacionId: orgId,
    };

    if (!esOwner) {
      where.usuarioOrganizacionId = miembroOrg.id;
    } else {
      if (filtros?.usuarioOrganizacionId) {
        where.usuarioOrganizacionId = filtros.usuarioOrganizacionId;
      }
    }

    if (filtros?.estado) {
      where.estado = filtros.estado;
    }

    if (filtros?.prioridad) {
      where.prioridad = filtros.prioridad;
    }

    if (filtros?.activo !== undefined) {
      where.activo = filtros.activo;
    }

    return await this.prisma.actividadMiembro.findMany({
      where,
      include: {
        usuarioOrganizacion: {
          include: { usuario: true },
        },
        creadoPor: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── OBTENER UNA ACTIVIDAD ────────────────────────────────────────────

  async obtener(
    orgId: number,
    actividadId: number,
    userId: number,
  ): Promise<ActividadMiembro> {
    const actividad = await this.prisma.actividadMiembro.findUnique({
      where: { id: actividadId },
      include: {
        usuarioOrganizacion: {
          include: { usuario: true },
        },
        creadoPor: true,
      },
    });

    if (!actividad) {
      throw new NotFoundException('Actividad no encontrada');
    }

    if (actividad.organizacionId !== orgId) {
      throw new ForbiddenException(
        'La actividad no pertenece a esta organización',
      );
    }

    const esOwner = await this.esOwnerOrganizacion(orgId, userId);
    const esMiembroAsignado =
      actividad.usuarioOrganizacion.usuario.id === userId;

    if (!esOwner && !esMiembroAsignado) {
      throw new ForbiddenException(
        'No tienes permiso para ver esta actividad',
      );
    }

    return actividad;
  }

  // ─── ACTUALIZAR ACTIVIDAD ─────────────────────────────────────────────

  async actualizar(
    orgId: number,
    actividadId: number,
    dto: UpdateActividadDto,
    userId: number,
  ): Promise<ActividadMiembro> {
    await this.validarOwner(orgId, userId);

    const actividad = await this.obtenerActividad(orgId, actividadId);

    const actualizaciones: any = {};

    if (dto.titulo) actualizaciones.titulo = dto.titulo;
    if (dto.descripcion !== undefined) actualizaciones.descripcion = dto.descripcion;
    if (dto.prioridad) actualizaciones.prioridad = dto.prioridad;

    if (dto.recursoTipo || dto.recursoId !== undefined) {
      const nuevoTipo = dto.recursoTipo || actividad.recursoTipo;
      const nuevoId = dto.recursoId !== undefined ? dto.recursoId : actividad.recursoId;

      await this.validarRecursoDeOrganizacion(orgId, nuevoTipo, nuevoId ?? null);
      actualizaciones.recursoTipo = nuevoTipo;
      actualizaciones.recursoId = nuevoId;
    }

    if (dto.contexto !== undefined) {
      const tipoRecurso = dto.recursoTipo || actividad.recursoTipo;
      this.validarContexto(tipoRecurso, dto.contexto);
      actualizaciones.contexto = dto.contexto;
    }

    if (dto.fechaInicio || dto.fechaEstimadaFin) {
      const fechaInicio = dto.fechaInicio
        ? new Date(dto.fechaInicio)
        : actividad.fechaInicio;
      const fechaEstimadaFin = dto.fechaEstimadaFin
        ? new Date(dto.fechaEstimadaFin)
        : actividad.fechaEstimadaFin;

      this.validarFechas(fechaInicio, fechaEstimadaFin);
      actualizaciones.fechaInicio = fechaInicio;
      actualizaciones.fechaEstimadaFin = fechaEstimadaFin;
    }

    const resultado = await this.prisma.$transaction(async (tx) => {
      const actualizada = await tx.actividadMiembro.update({
        where: { id: actividadId },
        data: actualizaciones,
        include: {
          usuarioOrganizacion: { include: { usuario: true } },
          creadoPor: true,
        },
      });

      await tx.auditoriaLog.create({
        data: {
          usuarioId: userId,
          organizacionId: orgId,
          accion: 'ACTIVIDAD_EDITADA',
          entidad: 'ActividadMiembro',
          entidadId: actividadId,
          cambios: JSON.stringify(actualizaciones),
        },
      });

      return actualizada;
    });

    return resultado;
  }

  // ─── REASIGNAR ACTIVIDAD ──────────────────────────────────────────────

  async reasignar(
    orgId: number,
    actividadId: number,
    dto: ReasignarActividadDto,
    userId: number,
  ): Promise<ActividadMiembro> {
    await this.validarOwner(orgId, userId);
    await this.validarMiembroOrganizacion(orgId, dto.usuarioOrganizacionId);

    const actividad = await this.obtenerActividad(orgId, actividadId);

    const miembroAnterior = actividad.usuarioOrganizacionId;

    const resultado = await this.prisma.$transaction(async (tx) => {
      const reasignada = await tx.actividadMiembro.update({
        where: { id: actividadId },
        data: { usuarioOrganizacionId: dto.usuarioOrganizacionId },
        include: {
          usuarioOrganizacion: { include: { usuario: true } },
          creadoPor: true,
        },
      });

      await tx.auditoriaLog.create({
        data: {
          usuarioId: userId,
          organizacionId: orgId,
          accion: 'ACTIVIDAD_REASIGNADA',
          entidad: 'ActividadMiembro',
          entidadId: actividadId,
          cambios: JSON.stringify({
            miembroAnterior,
            miembroNuevo: dto.usuarioOrganizacionId,
          }),
        },
      });

      return reasignada;
    });

    return resultado;
  }

  // ─── PROLONGAR FECHA ──────────────────────────────────────────────────

  async prolongar(
    orgId: number,
    actividadId: number,
    dto: PrologarActividadDto,
    userId: number,
  ): Promise<ActividadMiembro> {
    await this.validarOwner(orgId, userId);

    const actividad = await this.obtenerActividad(orgId, actividadId);

    const nuevaFecha = new Date(dto.fechaEstimadaFin);

    if (nuevaFecha <= actividad.fechaEstimadaFin) {
      throw new BadRequestException(
        'La nueva fecha debe ser posterior a la fecha actual',
      );
    }

    this.validarFechas(actividad.fechaInicio, nuevaFecha);

    const resultado = await this.prisma.$transaction(async (tx) => {
      const prolongada = await tx.actividadMiembro.update({
        where: { id: actividadId },
        data: { fechaEstimadaFin: nuevaFecha },
        include: {
          usuarioOrganizacion: { include: { usuario: true } },
          creadoPor: true,
        },
      });

      await tx.auditoriaLog.create({
        data: {
          usuarioId: userId,
          organizacionId: orgId,
          accion: 'ACTIVIDAD_PROLONGADA',
          entidad: 'ActividadMiembro',
          entidadId: actividadId,
          cambios: JSON.stringify({
            fechaAnterior: actividad.fechaEstimadaFin,
            fechaNueva: nuevaFecha,
          }),
        },
      });

      return prolongada;
    });

    return resultado;
  }

  // ─── CAMBIAR ESTADO ───────────────────────────────────────────────────

  async cambiarEstado(
    orgId: number,
    actividadId: number,
    dto: CambiarEstadoActividadDto,
    userId: number,
  ): Promise<ActividadMiembro> {
    const actividad = await this.obtenerActividad(orgId, actividadId);

    const esOwner = await this.esOwnerOrganizacion(orgId, userId);
    const esMiembroAsignado =
      actividad.usuarioOrganizacion.usuario.id === userId;

    if (!esOwner && !esMiembroAsignado) {
      throw new ForbiddenException(
        'No tienes permiso para cambiar el estado',
      );
    }

    if (!this.puedeCambiarA(actividad.estado, dto.estado, esOwner)) {
      throw new BadRequestException(
        `No puedes cambiar de ${actividad.estado} a ${dto.estado}`,
      );
    }

    const actualizaciones: any = { estado: dto.estado };

    if (dto.estado === EstadoActividad.COMPLETADA) {
      actualizaciones.fechaRealFin = new Date();
    } else if (dto.estado === EstadoActividad.EN_PROGRESO && actividad.estado === EstadoActividad.COMPLETADA) {
      actualizaciones.fechaRealFin = null;
    }

    const resultado = await this.prisma.$transaction(async (tx) => {
      const actualizada = await tx.actividadMiembro.update({
        where: { id: actividadId },
        data: actualizaciones,
        include: {
          usuarioOrganizacion: { include: { usuario: true } },
          creadoPor: true,
        },
      });

      await tx.auditoriaLog.create({
        data: {
          usuarioId: userId,
          organizacionId: orgId,
          accion: 'ACTIVIDAD_ESTADO_CAMBIADO',
          entidad: 'ActividadMiembro',
          entidadId: actividadId,
          cambios: JSON.stringify({
            estadoAnterior: actividad.estado,
            estadoNuevo: dto.estado,
          }),
        },
      });

      return actualizada;
    });

    return resultado;
  }

  // ─── ARCHIVAR ─────────────────────────────────────────────────────────

  async archivar(
    orgId: number,
    actividadId: number,
    userId: number,
  ): Promise<ActividadMiembro> {
    await this.validarOwner(orgId, userId);

    const actividad = await this.obtenerActividad(orgId, actividadId);

    const resultado = await this.prisma.$transaction(async (tx) => {
      const archivada = await tx.actividadMiembro.update({
        where: { id: actividadId },
        data: { activo: false },
        include: {
          usuarioOrganizacion: { include: { usuario: true } },
          creadoPor: true,
        },
      });

      await tx.auditoriaLog.create({
        data: {
          usuarioId: userId,
          organizacionId: orgId,
          accion: 'ACTIVIDAD_ARCHIVADA',
          entidad: 'ActividadMiembro',
          entidadId: actividadId,
          cambios: JSON.stringify({ activo: false }),
        },
      });

      return archivada;
    });

    return resultado;
  }

  // ─── OBSERVACIONES ────────────────────────────────────────────────────

  async agregarObservacion(
    orgId: number,
    actividadId: number,
    dto: AgregarObservacionDto,
    userId: number,
  ): Promise<ObservacionActividad> {
    const actividad = await this.obtenerActividad(orgId, actividadId);

    const esOwner = await this.esOwnerOrganizacion(orgId, userId);
    const esMiembroAsignado =
      actividad.usuarioOrganizacion.usuario.id === userId;

    if (!esOwner && !esMiembroAsignado) {
      throw new ForbiddenException(
        'No tienes permiso para agregar observaciones',
      );
    }

    return await this.prisma.observacionActividad.create({
      data: {
        actividadMiembroId: actividadId,
        autorId: userId,
        contenido: dto.contenido,
        estadoActividadAlMomento: actividad.estado,
      },
      include: {
        autor: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
    });
  }

  async obtenerObservaciones(
    orgId: number,
    actividadId: number,
    userId: number,
  ): Promise<ObservacionActividad[]> {
    const actividad = await this.obtenerActividad(orgId, actividadId);

    const esOwner = await this.esOwnerOrganizacion(orgId, userId);
    const esMiembroAsignado =
      actividad.usuarioOrganizacion.usuario.id === userId;

    if (!esOwner && !esMiembroAsignado) {
      throw new ForbiddenException(
        'No tienes permiso para ver observaciones',
      );
    }

    return await this.prisma.observacionActividad.findMany({
      where: { actividadMiembroId: actividadId },
      include: {
        autor: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // ─── HISTORIAL ────────────────────────────────────────────────────────

  async obtenerHistorial(
    orgId: number,
    actividadId: number,
    userId: number,
  ): Promise<any[]> {
    await this.validarOwner(orgId, userId);

    const actividad = await this.obtenerActividad(orgId, actividadId);

    return await this.prisma.auditoriaLog.findMany({
      where: {
        organizacionId: orgId,
        entidad: 'ActividadMiembro',
        entidadId: actividadId,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── HELPERS ───────────────────────────────────────────────────────────

  private async esOwnerOrganizacion(
    orgId: number,
    userId: number,
  ): Promise<boolean> {
    const org = await this.prisma.organizacion.findUnique({
      where: { id: orgId },
      select: { propietarioId: true },
    });

    return org?.propietarioId === userId;
  }

  private async obtenerActividad(
    orgId: number,
    actividadId: number,
  ): Promise<
    ActividadMiembro & {
      usuarioOrganizacion: any;
      creadoPor: any;
    }
  > {
    const actividad = await this.prisma.actividadMiembro.findUnique({
      where: { id: actividadId },
      include: {
        usuarioOrganizacion: {
          include: { usuario: true },
        },
        creadoPor: true,
      },
    });

    if (!actividad) {
      throw new NotFoundException('Actividad no encontrada');
    }

    if (actividad.organizacionId !== orgId) {
      throw new ForbiddenException(
        'La actividad no pertenece a esta organización',
      );
    }

    return actividad;
  }
}
