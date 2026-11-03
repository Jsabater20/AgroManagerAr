import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  EstadoAsignacionPromocion,
  EstadoCampaniaPromocional,
  OrigenAsignacionPromocion,
  PlanTipo,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { sumarMesesCalendario, ZONA_HORARIA_PROMOCIONES } from './promociones-fechas';

export const CODIGO_CAMPANIA_LANZAMIENTO_2026 = 'AGROMANAGER_PRO_LANZAMIENTO_2026';

export const configuracionCampaniaLanzamiento2026 = {
  codigo: CODIGO_CAMPANIA_LANZAMIENTO_2026,
  nombre: '3 meses de AgroManager Pro gratis',
  inicioNuevosRegistros: new Date('2026-11-01T03:00:00.000Z'),
  finNuevosRegistros: new Date('2027-01-01T03:00:00.000Z'),
  duracionMeses: 3,
  incluyeOrganizacionesEmpresa: false,
} as const;

type SolicitudAsignacionPromocion = {
  campaniaId: number;
  usuarioId: number;
  otorgadoPorId: number;
  origen: OrigenAsignacionPromocion;
  fechaInicio?: Date;
};

type ResultadoAsignacionPromocion = {
  asignacionId: number;
  creada: boolean;
  estado: EstadoAsignacionPromocion;
  fechaInicio: Date;
  fechaFin: Date;
  organizacionesBeneficiadas: number[];
  detalle: string | null;
};

@Injectable()
export class PromocionesService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerCampaniaActivaParaRegistro(referencia = new Date()) {
    return this.prisma.campaniaPromocional.findFirst({
      where: {
        codigo: CODIGO_CAMPANIA_LANZAMIENTO_2026,
        estado: EstadoCampaniaPromocional.ACTIVA,
        inicioNuevosRegistros: { lte: referencia },
        finNuevosRegistros: { gt: referencia },
      },
      select: {
        id: true,
        codigo: true,
        duracionMeses: true,
        incluyeOrganizacionesEmpresa: true,
        activadaPorId: true,
        creadaPorId: true,
      },
    });
  }

  async crearBorradorLanzamiento(adminId: number) {
    await this.requerirSuperadmin(adminId);
    const existente = await this.prisma.campaniaPromocional.findUnique({
      where: { codigo: CODIGO_CAMPANIA_LANZAMIENTO_2026 },
    });
    if (existente) return existente;

    return this.prisma.campaniaPromocional.create({
      data: {
        ...configuracionCampaniaLanzamiento2026,
        creadaPorId: adminId,
        descripcion: 'Promoción de lanzamiento: tres meses calendario de AgroManager Pro sin costo.',
      },
    });
  }

  async obtenerLanzamientoParaAdmin(adminId: number) {
    await this.requerirSuperadmin(adminId);
    const campania = await this.prisma.campaniaPromocional.findUnique({
      where: { codigo: CODIGO_CAMPANIA_LANZAMIENTO_2026 },
      include: {
        _count: { select: { asignaciones: true } },
      },
    });
    if (!campania) return { campania: null };

    const [simulacion, resumen] = await Promise.all([
      this.simularAsignacionExistentesInterna(campania),
      this.obtenerResumenAsignaciones(campania.id),
    ]);
    return { campania, simulacion, resumen };
  }

  @Cron(CronExpression.EVERY_HOUR, { timeZone: ZONA_HORARIA_PROMOCIONES })
  async finalizarCampaniasVencidas(referencia = new Date()) {
    const resultado = await this.prisma.campaniaPromocional.updateMany({
      where: {
        estado: {
          in: [
            EstadoCampaniaPromocional.BORRADOR,
            EstadoCampaniaPromocional.ACTIVA,
            EstadoCampaniaPromocional.PAUSADA,
          ],
        },
        finNuevosRegistros: { lte: referencia },
      },
      data: {
        estado: EstadoCampaniaPromocional.FINALIZADA,
        mostrarEnSitio: false,
      },
    });
    return resultado.count;
  }

  async activarLanzamiento(adminId: number, campaniaId: number) {
    await this.requerirSuperadmin(adminId);
    const campania = await this.obtenerCampaniaAdministrable(campaniaId);
    if (campania.estado === EstadoCampaniaPromocional.FINALIZADA) {
      throw new BadRequestException('Una campaña finalizada no puede reactivarse');
    }
    const ahora = new Date();
    if (ahora >= campania.finNuevosRegistros) {
      throw new BadRequestException('La ventana de nuevos registros de esta campaña ya finalizó');
    }

    return this.prisma.campaniaPromocional.update({
      where: { id: campania.id },
      data: {
        estado: EstadoCampaniaPromocional.ACTIVA,
        activadaEn: campania.activadaEn ?? ahora,
        activadaPorId: campania.activadaPorId ?? adminId,
        mostrarEnSitio: true,
      },
    });
  }

  async pausarLanzamiento(adminId: number, campaniaId: number) {
    await this.requerirSuperadmin(adminId);
    const campania = await this.obtenerCampaniaAdministrable(campaniaId);
    if (campania.estado !== EstadoCampaniaPromocional.ACTIVA) {
      throw new BadRequestException('Solo se puede pausar una campaña activa');
    }

    return this.prisma.campaniaPromocional.update({
      where: { id: campania.id },
      data: {
        estado: EstadoCampaniaPromocional.PAUSADA,
        mostrarEnSitio: false,
      },
    });
  }

  async simularAsignacionExistentes(adminId: number, campaniaId: number) {
    await this.requerirSuperadmin(adminId);
    const campania = await this.obtenerCampaniaAdministrable(campaniaId);
    return this.simularAsignacionExistentesInterna(campania);
  }

  async asignarUsuariosExistentes(
    adminId: number,
    campaniaId: number,
    confirmado: boolean,
  ) {
    await this.requerirSuperadmin(adminId);
    if (!confirmado) {
      throw new BadRequestException('Confirmá la asignación antes de otorgar beneficios');
    }
    const campania = await this.obtenerCampaniaAdministrable(campaniaId);
    if (campania.estado !== EstadoCampaniaPromocional.ACTIVA || !campania.activadaEn) {
      throw new BadRequestException('La campaña debe estar activa antes de asignar beneficios');
    }

    const usuarios = await this.prisma.usuario.findMany({
      where: this.whereUsuariosElegibles(campania),
      select: { id: true },
      orderBy: { id: 'asc' },
    });
    const resultado = { procesados: usuarios.length, asignados: 0, omitidos: 0, existentes: 0 };

    for (const usuario of usuarios) {
      const asignacion = await this.asignarPromocion({
        campaniaId: campania.id,
        usuarioId: usuario.id,
        otorgadoPorId: campania.activadaPorId ?? adminId,
        origen: OrigenAsignacionPromocion.EXISTENTE,
        fechaInicio: campania.activadaEn,
      });
      if (!asignacion.creada) resultado.existentes += 1;
      else if (asignacion.estado === EstadoAsignacionPromocion.ASIGNADA) resultado.asignados += 1;
      else resultado.omitidos += 1;
    }

    return { ...resultado, fechaInicio: campania.activadaEn };
  }

  async asignarPromocionPorRegistro(usuarioId: number, fechaRegistro: Date) {
    const campania = await this.obtenerCampaniaActivaParaRegistro(fechaRegistro);
    if (!campania) return null;

    return this.asignarPromocion({
      campaniaId: campania.id,
      usuarioId,
      otorgadoPorId: campania.activadaPorId ?? campania.creadaPorId,
      origen: OrigenAsignacionPromocion.REGISTRO,
      fechaInicio: fechaRegistro,
    });
  }

  async asignarPromocion(
    solicitud: SolicitudAsignacionPromocion,
  ): Promise<ResultadoAsignacionPromocion> {
    const fechaInicio = solicitud.fechaInicio ?? new Date();
    const campania = await this.prisma.campaniaPromocional.findUnique({
      where: { id: solicitud.campaniaId },
      select: {
        id: true,
        estado: true,
        duracionMeses: true,
        incluyeOrganizacionesEmpresa: true,
      },
    });
    if (!campania) throw new BadRequestException('Campaña promocional no encontrada');
    if (campania.estado !== EstadoCampaniaPromocional.ACTIVA) {
      throw new BadRequestException('La campaña promocional no está activa');
    }

    const fechaFin = sumarMesesCalendario(fechaInicio, campania.duracionMeses);
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existente = await tx.asignacionPromocion.findUnique({
          where: {
            campaniaId_usuarioId: {
              campaniaId: campania.id,
              usuarioId: solicitud.usuarioId,
            },
          },
          include: { beneficios: { select: { organizacionId: true } } },
        });
        if (existente) return this.formatearResultadoExistente(existente);

        const organizaciones = await tx.organizacion.findMany({
          where: {
            propietarioId: solicitud.usuarioId,
            plan: 'FREE',
            ...(campania.incluyeOrganizacionesEmpresa
              ? {}
              : { vinculacionEmpresa: null }),
          },
          select: { id: true },
        });
        const organizacionesIds = organizaciones.map((organizacion) => organizacion.id);
        const detalle = organizacionesIds.length
          ? null
          : 'No hay organizaciones Free elegibles para esta campaña.';
        const estado = organizacionesIds.length
          ? EstadoAsignacionPromocion.ASIGNADA
          : EstadoAsignacionPromocion.OMITIDA;

        const asignacion = await tx.asignacionPromocion.create({
          data: {
            campaniaId: campania.id,
            usuarioId: solicitud.usuarioId,
            fechaInicio,
            fechaFin,
            origen: solicitud.origen,
            estado,
            detalle,
          },
          select: { id: true, estado: true, fechaInicio: true, fechaFin: true, detalle: true },
        });

        if (organizacionesIds.length) {
          await tx.beneficioProOrganizacion.createMany({
            data: organizacionesIds.map((organizacionId) => ({
              organizacionId,
              otorgadoPorId: solicitud.otorgadoPorId,
              asignacionPromocionId: asignacion.id,
              motivo: 'Promoción de lanzamiento 2026',
              fechaInicio,
              fechaFin,
            })),
            skipDuplicates: true,
          });
        }

        return {
          asignacionId: asignacion.id,
          creada: true,
          estado: asignacion.estado,
          fechaInicio: asignacion.fechaInicio,
          fechaFin: asignacion.fechaFin,
          organizacionesBeneficiadas: organizacionesIds,
          detalle: asignacion.detalle,
        };
      });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') {
        throw error;
      }
      const existente = await this.prisma.asignacionPromocion.findUnique({
        where: {
          campaniaId_usuarioId: {
            campaniaId: solicitud.campaniaId,
            usuarioId: solicitud.usuarioId,
          },
        },
        include: { beneficios: { select: { organizacionId: true } } },
      });
      if (!existente) throw error;
      return this.formatearResultadoExistente(existente);
    }
  }

  async puedeAplicarPromocionEnRegistro(referencia = new Date()) {
    const campania = await this.obtenerCampaniaActivaParaRegistro(referencia);
    return Boolean(campania);
  }

  async obtenerLanzamientoPublico(referencia = new Date()) {
    return this.prisma.campaniaPromocional.findFirst({
      where: {
        codigo: CODIGO_CAMPANIA_LANZAMIENTO_2026,
        estado: EstadoCampaniaPromocional.ACTIVA,
        mostrarEnSitio: true,
        inicioNuevosRegistros: { lte: referencia },
        finNuevosRegistros: { gt: referencia },
      },
      select: {
        nombre: true,
        codigo: true,
        finNuevosRegistros: true,
        duracionMeses: true,
      },
    });
  }

  async obtenerPromocionUsuario(usuarioId: number, organizacionId: number) {
    const ahora = new Date();
    const organizacion = await this.prisma.organizacion.findFirst({
      where: {
        id: organizacionId,
        OR: [
          { propietarioId: usuarioId },
          { miembros: { some: { usuarioId, activo: true } } },
        ],
      },
      select: {
        beneficiosPro: {
          where: {
            activo: true,
            fechaInicio: { lte: ahora },
            fechaFin: { gt: ahora },
            asignacionPromocion: { usuarioId },
          },
          orderBy: { fechaFin: 'desc' },
          take: 1,
          select: {
            fechaInicio: true,
            fechaFin: true,
            asignacionPromocion: {
              select: {
                id: true,
                origen: true,
                bienvenidaVistaEn: true,
                campania: { select: { codigo: true, nombre: true } },
              },
            },
          },
        },
      },
    });
    const beneficio = organizacion?.beneficiosPro[0];
    if (!beneficio?.asignacionPromocion) return null;

    const restanteMs = Math.max(0, beneficio.fechaFin.getTime() - ahora.getTime());
    return {
      asignacionId: beneficio.asignacionPromocion.id,
      origen: beneficio.asignacionPromocion.origen,
      bienvenidaVistaEn: beneficio.asignacionPromocion.bienvenidaVistaEn,
      fechaInicio: beneficio.fechaInicio,
      fechaFin: beneficio.fechaFin,
      diasRestantes: Math.ceil(restanteMs / (24 * 60 * 60 * 1000)),
      campania: beneficio.asignacionPromocion.campania,
    };
  }

  async marcarBienvenidaVista(usuarioId: number, asignacionId: number) {
    await this.prisma.asignacionPromocion.updateMany({
      where: { id: asignacionId, usuarioId, bienvenidaVistaEn: null },
      data: { bienvenidaVistaEn: new Date() },
    });
    return { ok: true };
  }

  private async simularAsignacionExistentesInterna(campania: {
    id: number;
    estado: EstadoCampaniaPromocional;
    duracionMeses: number;
    incluyeOrganizacionesEmpresa: boolean;
    activadaEn: Date | null;
  }) {
    const fechaInicio = campania.activadaEn ?? new Date();
    const whereUsuarios = this.whereUsuariosElegibles(campania);
    const whereOrganizaciones = this.whereOrganizacionesElegibles(campania);
    const [usuariosElegibles, organizacionesElegibles, usuariosYaAsignados, usuariosOmitidos] = await Promise.all([
      this.prisma.usuario.count({ where: whereUsuarios }),
      this.prisma.organizacion.count({
        where: {
          ...whereOrganizaciones,
          propietario: { asignacionesPromocionales: { none: { campaniaId: campania.id } } },
        },
      }),
      this.prisma.asignacionPromocion.count({ where: { campaniaId: campania.id } }),
      this.prisma.asignacionPromocion.count({
        where: { campaniaId: campania.id, estado: EstadoAsignacionPromocion.OMITIDA },
      }),
    ]);

    return {
      fechaInicio,
      fechaFin: sumarMesesCalendario(fechaInicio, campania.duracionMeses),
      usuariosElegibles,
      organizacionesElegibles,
      usuariosYaAsignados,
      usuariosOmitidos,
      esEstimacion: !campania.activadaEn,
    };
  }

  private async obtenerResumenAsignaciones(campaniaId: number) {
    const [total, otorgadas, omitidas, porRegistro, porExistentes] = await Promise.all([
      this.prisma.asignacionPromocion.count({ where: { campaniaId } }),
      this.prisma.asignacionPromocion.count({
        where: { campaniaId, estado: EstadoAsignacionPromocion.ASIGNADA },
      }),
      this.prisma.asignacionPromocion.count({
        where: { campaniaId, estado: EstadoAsignacionPromocion.OMITIDA },
      }),
      this.prisma.asignacionPromocion.count({
        where: { campaniaId, origen: OrigenAsignacionPromocion.REGISTRO },
      }),
      this.prisma.asignacionPromocion.count({
        where: { campaniaId, origen: OrigenAsignacionPromocion.EXISTENTE },
      }),
    ]);

    return { total, otorgadas, omitidas, porRegistro, porExistentes };
  }

  private whereUsuariosElegibles(campania: {
    id: number;
    incluyeOrganizacionesEmpresa: boolean;
  }): Prisma.UsuarioWhereInput {
    return {
      asignacionesPromocionales: { none: { campaniaId: campania.id } },
      organizacionesQueEsDueno: { some: this.whereOrganizacionesElegibles(campania) },
    };
  }

  private whereOrganizacionesElegibles(campania: {
    incluyeOrganizacionesEmpresa: boolean;
  }): Prisma.OrganizacionWhereInput {
    return {
      plan: PlanTipo.FREE,
      ...(campania.incluyeOrganizacionesEmpresa ? {} : { vinculacionEmpresa: { is: null } }),
    };
  }

  private async obtenerCampaniaAdministrable(campaniaId: number) {
    const campania = await this.prisma.campaniaPromocional.findUnique({
      where: { id: campaniaId },
      select: {
        id: true,
        estado: true,
        duracionMeses: true,
        incluyeOrganizacionesEmpresa: true,
        inicioNuevosRegistros: true,
        finNuevosRegistros: true,
        activadaEn: true,
        activadaPorId: true,
      },
    });
    if (!campania || campania.id === 0) {
      throw new BadRequestException('Campaña promocional no encontrada');
    }
    return campania;
  }

  private async requerirSuperadmin(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { rolGlobal: true },
    });
    if (usuario?.rolGlobal !== 'SUPERADMIN') {
      throw new BadRequestException('Solo SUPERADMIN puede administrar promociones');
    }
  }

  private formatearResultadoExistente(asignacion: {
    id: number;
    estado: EstadoAsignacionPromocion;
    fechaInicio: Date;
    fechaFin: Date;
    detalle: string | null;
    beneficios: Array<{ organizacionId: number }>;
  }): ResultadoAsignacionPromocion {
    return {
      asignacionId: asignacion.id,
      creada: false,
      estado: asignacion.estado,
      fechaInicio: asignacion.fechaInicio,
      fechaFin: asignacion.fechaFin,
      organizacionesBeneficiadas: asignacion.beneficios.map((beneficio) => beneficio.organizacionId),
      detalle: asignacion.detalle,
    };
  }
}
