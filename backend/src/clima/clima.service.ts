import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MemberAccessService } from '../organizations/member-access.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRegistroPrecipitacionDto,
  UpdateRegistroPrecipitacionDto,
} from './dto/registro-precipitacion.dto';
import {
  OpenMeteoCommercialProvider,
  type WeatherProvider,
} from './weather-provider';

const PROVEEDOR_PRONOSTICO = 'OPEN_METEO_COMMERCIAL';
const DURACION_CACHE_MINUTOS = 30;
const MAXIMO_CACHE_DESACTUALIZADA_HORAS = 6;

type CampoClima = {
  id: number;
  nombre: string;
  ubicacion: string | null;
  provincia: string | null;
  localidad: string | null;
  latitud: number | null;
  longitud: number | null;
};

@Injectable()
export class ClimaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
  ) {}

  async obtenerPronostico(
    usuarioId: number,
    organizacionId: number,
    campoId: number,
  ) {
    const campo = await this.obtenerCampoAutorizado(usuarioId, organizacionId, campoId);
    if (!this.coordenadasValidas(campo.latitud, campo.longitud)) {
      return {
        estado: 'UBICACION_PENDIENTE',
        campo: this.resumenCampo(campo),
        mensaje: 'Configurá coordenadas válidas del campo para consultar el pronóstico de esta zona.',
        datos: null,
      };
    }

    const latitud = campo.latitud as number;
    const longitud = campo.longitud as number;
    const ahora = new Date();
    const cache = await this.prisma.cachePronosticoClima.findUnique({
      where: { campoId_proveedor: { campoId, proveedor: PROVEEDOR_PRONOSTICO } },
    });
    if (cache && cache.expiraEn > ahora) {
      return this.respuestaDesdeCache('DISPONIBLE', campo, cache);
    }

    const proveedor = this.obtenerProveedorConfigurado();
    if (!proveedor) {
      return this.respuestaSinProveedor(campo, cache, ahora);
    }

    try {
      const datos = await proveedor.obtenerPronostico(latitud, longitud);
      const obtenidoEn = new Date();
      const expiraEn = new Date(obtenidoEn.getTime() + DURACION_CACHE_MINUTOS * 60_000);
      const actualizadoProveedorEn = datos.actualizadoProveedorEn
        ? new Date(datos.actualizadoProveedorEn)
        : null;
      const actualizado = await this.prisma.cachePronosticoClima.upsert({
        where: { campoId_proveedor: { campoId, proveedor: PROVEEDOR_PRONOSTICO } },
        create: {
          organizacionId,
          campoId,
          proveedor: PROVEEDOR_PRONOSTICO,
          latitud,
          longitud,
          datos: datos as Prisma.InputJsonValue,
          obtenidoEn,
          expiraEn,
          actualizadoProveedorEn: actualizadoProveedorEn && !Number.isNaN(actualizadoProveedorEn.getTime())
            ? actualizadoProveedorEn
            : null,
        },
        update: {
          organizacionId,
          latitud,
          longitud,
          datos: datos as Prisma.InputJsonValue,
          obtenidoEn,
          expiraEn,
          actualizadoProveedorEn: actualizadoProveedorEn && !Number.isNaN(actualizadoProveedorEn.getTime())
            ? actualizadoProveedorEn
            : null,
          errorUltimaConsulta: null,
        },
      });
      return this.respuestaDesdeCache('DISPONIBLE', campo, actualizado);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'No se pudo actualizar el pronóstico';
      if (cache) {
        await this.prisma.cachePronosticoClima.update({
          where: { id: cache.id },
          data: { errorUltimaConsulta: mensaje },
        }).catch(() => undefined);
      }
      return this.respuestaSinProveedor(campo, cache, ahora, mensaje);
    }
  }

  async actualizarPronosticosParaAlertas(organizacionId: number) {
    const proveedor = this.obtenerProveedorConfigurado();
    if (!proveedor) return;
    const alertasClimaActivas = await this.prisma.preferenciaAlerta.findFirst({
      where: { organizacionId, alertasClimaActivas: true },
      select: { id: true },
    });
    if (!alertasClimaActivas) return;

    const campos = await this.prisma.campo.findMany({
      where: {
        organizacionId,
        latitud: { not: null },
        longitud: { not: null },
      },
      select: {
        id: true,
        nombre: true,
        ubicacion: true,
        provincia: true,
        localidad: true,
        latitud: true,
        longitud: true,
      },
    });

    for (const campo of campos) {
      if (!this.coordenadasValidas(campo.latitud, campo.longitud)) continue;
      await this.actualizarCachePronostico(organizacionId, campo, proveedor);
    }
  }

  async listarPrecipitaciones(
    usuarioId: number,
    organizacionId: number,
    campoId: number,
  ) {
    await this.obtenerCampoAutorizado(usuarioId, organizacionId, campoId);
    return this.prisma.registroPrecipitacion.findMany({
      where: { organizacionId, campoId },
      orderBy: [{ fecha: 'desc' }, { createdAt: 'desc' }],
      take: 100,
      include: {
        lote: { select: { id: true, nombre: true } },
        usuario: { select: { id: true, nombre: true, apellido: true } },
      },
    });
  }

  async resumenPrecipitaciones(
    usuarioId: number,
    organizacionId: number,
    campoId: number,
  ) {
    await this.obtenerCampoAutorizado(usuarioId, organizacionId, campoId);
    const ahora = new Date();
    const inicioSemana = new Date(ahora.getTime() - 6 * 24 * 60 * 60 * 1000);
    const inicioMes = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), 1, 3));
    const inicioAnio = new Date(Date.UTC(ahora.getUTCFullYear(), 0, 1, 3));
    const dondeBase = { organizacionId, campoId };
    const [semanal, mensual, anual, ultimos] = await Promise.all([
      this.prisma.registroPrecipitacion.aggregate({
        where: { ...dondeBase, fecha: { gte: inicioSemana } },
        _sum: { milimetros: true },
      }),
      this.prisma.registroPrecipitacion.aggregate({
        where: { ...dondeBase, fecha: { gte: inicioMes } },
        _sum: { milimetros: true },
      }),
      this.prisma.registroPrecipitacion.aggregate({
        where: { ...dondeBase, fecha: { gte: inicioAnio } },
        _sum: { milimetros: true },
      }),
      this.prisma.registroPrecipitacion.findMany({
        where: dondeBase,
        orderBy: { fecha: 'asc' },
        take: 365,
        select: { fecha: true, milimetros: true },
      }),
    ]);

    return {
      semanaMm: Number(semanal._sum.milimetros ?? 0),
      mesMm: Number(mensual._sum.milimetros ?? 0),
      anioMm: Number(anual._sum.milimetros ?? 0),
      registros: ultimos.map((registro) => ({
        fecha: registro.fecha,
        milimetros: Number(registro.milimetros),
      })),
    };
  }

  async crearPrecipitacion(
    usuarioId: number,
    organizacionId: number,
    dto: CreateRegistroPrecipitacionDto,
  ) {
    await this.obtenerCampoAutorizado(usuarioId, organizacionId, dto.campoId);
    await this.validarLote(dto.campoId, dto.loteId);
    const fecha = this.normalizarFecha(dto.fecha);
    return this.prisma.$transaction(async (tx) => {
      const creado = await tx.registroPrecipitacion.create({
        data: {
          organizacionId,
          campoId: dto.campoId,
          loteId: dto.loteId ?? null,
          usuarioId,
          fecha,
          milimetros: dto.milimetros,
          observaciones: dto.observaciones?.trim() || null,
        },
      });
      await tx.historialRegistroPrecipitacion.create({
        data: {
          registroId: creado.id,
          usuarioId,
          accion: 'CREADO',
          datosDespues: this.snapshotPrecipitacion(creado),
        },
      });
      return creado;
    });
  }

  async actualizarPrecipitacion(
    usuarioId: number,
    organizacionId: number,
    registroId: number,
    dto: UpdateRegistroPrecipitacionDto,
  ) {
    const registro = await this.prisma.registroPrecipitacion.findFirst({
      where: { id: registroId, organizacionId },
    });
    if (!registro) throw new NotFoundException('Registro de precipitación no encontrado');
    const acceso = await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Clima');
    await this.memberAccessService.requireCampoParaModulo(usuarioId, organizacionId, registro.campoId, 'Clima');
    if (!acceso.esOwner && registro.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo podés corregir tus propios registros de precipitaciones');
    }

    const antes = this.snapshotPrecipitacion(registro);
    return this.prisma.$transaction(async (tx) => {
      const modificado = await tx.registroPrecipitacion.update({
        where: { id: registro.id },
        data: {
          ...(dto.fecha ? { fecha: this.normalizarFecha(dto.fecha) } : {}),
          ...(dto.milimetros !== undefined ? { milimetros: dto.milimetros } : {}),
          ...(dto.observaciones !== undefined ? { observaciones: dto.observaciones.trim() || null } : {}),
          corregidoEn: new Date(),
        },
      });
      await tx.historialRegistroPrecipitacion.create({
        data: {
          registroId: registro.id,
          usuarioId,
          accion: 'CORREGIDO',
          datosAntes: antes,
          datosDespues: this.snapshotPrecipitacion(modificado),
        },
      });
      return modificado;
    });
  }

  private async obtenerCampoAutorizado(
    usuarioId: number,
    organizacionId: number,
    campoId: number,
  ): Promise<CampoClima> {
    await this.memberAccessService.requireCampoParaModulo(
      usuarioId,
      organizacionId,
      campoId,
      'Clima',
    );
    const campo = await this.prisma.campo.findFirst({
      where: { id: campoId, organizacionId },
      select: {
        id: true,
        nombre: true,
        ubicacion: true,
        provincia: true,
        localidad: true,
        latitud: true,
        longitud: true,
      },
    });
    if (!campo) throw new NotFoundException('Campo no encontrado');
    return campo;
  }

  private async validarLote(campoId: number, loteId?: number) {
    if (!loteId) return;
    const lote = await this.prisma.lote.findUnique({
      where: { id: loteId },
      select: { campoId: true },
    });
    if (!lote || lote.campoId !== campoId) {
      throw new BadRequestException('El lote no pertenece al campo seleccionado');
    }
  }

  private async actualizarCachePronostico(
    organizacionId: number,
    campo: CampoClima,
    proveedor: WeatherProvider,
  ) {
    const cache = await this.prisma.cachePronosticoClima.findUnique({
      where: { campoId_proveedor: { campoId: campo.id, proveedor: PROVEEDOR_PRONOSTICO } },
    });
    if (cache && cache.expiraEn > new Date()) return;

    try {
      const datos = await proveedor.obtenerPronostico(campo.latitud as number, campo.longitud as number);
      const obtenidoEn = new Date();
      const actualizadoProveedorEn = datos.actualizadoProveedorEn
        ? new Date(datos.actualizadoProveedorEn)
        : null;
      await this.prisma.cachePronosticoClima.upsert({
        where: { campoId_proveedor: { campoId: campo.id, proveedor: PROVEEDOR_PRONOSTICO } },
        create: {
          organizacionId,
          campoId: campo.id,
          proveedor: PROVEEDOR_PRONOSTICO,
          latitud: campo.latitud as number,
          longitud: campo.longitud as number,
          datos: datos as Prisma.InputJsonValue,
          obtenidoEn,
          expiraEn: new Date(obtenidoEn.getTime() + DURACION_CACHE_MINUTOS * 60_000),
          actualizadoProveedorEn: actualizadoProveedorEn && !Number.isNaN(actualizadoProveedorEn.getTime())
            ? actualizadoProveedorEn
            : null,
        },
        update: {
          organizacionId,
          latitud: campo.latitud as number,
          longitud: campo.longitud as number,
          datos: datos as Prisma.InputJsonValue,
          obtenidoEn,
          expiraEn: new Date(obtenidoEn.getTime() + DURACION_CACHE_MINUTOS * 60_000),
          actualizadoProveedorEn: actualizadoProveedorEn && !Number.isNaN(actualizadoProveedorEn.getTime())
            ? actualizadoProveedorEn
            : null,
          errorUltimaConsulta: null,
        },
      });
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'No se pudo actualizar el pronóstico';
      if (cache) {
        await this.prisma.cachePronosticoClima.update({
          where: { id: cache.id },
          data: { errorUltimaConsulta: mensaje },
        }).catch(() => undefined);
      }
    }
  }

  private obtenerProveedorConfigurado(): WeatherProvider | null {
    if (process.env.WEATHER_PROVIDER?.trim().toUpperCase() !== PROVEEDOR_PRONOSTICO) {
      return null;
    }
    const apiKey = process.env.OPEN_METEO_API_KEY?.trim();
    if (!apiKey) return null;
    return new OpenMeteoCommercialProvider(apiKey, process.env.OPEN_METEO_API_URL?.trim() || undefined);
  }

  private respuestaDesdeCache(
    estado: 'DISPONIBLE' | 'DESACTUALIZADO',
    campo: CampoClima,
    cache: {
      proveedor: string;
      datos: Prisma.JsonValue;
      obtenidoEn: Date;
      expiraEn: Date;
      actualizadoProveedorEn: Date | null;
      errorUltimaConsulta: string | null;
    },
  ) {
    return {
      estado,
      campo: this.resumenCampo(campo),
      proveedor: cache.proveedor,
      obtenidoEn: cache.obtenidoEn,
      expiraEn: cache.expiraEn,
      actualizadoProveedorEn: cache.actualizadoProveedorEn,
      error: cache.errorUltimaConsulta,
      datos: cache.datos,
    };
  }

  private respuestaSinProveedor(
    campo: CampoClima,
    cache: {
      proveedor: string;
      datos: Prisma.JsonValue;
      obtenidoEn: Date;
      expiraEn: Date;
      actualizadoProveedorEn: Date | null;
      errorUltimaConsulta: string | null;
    } | null,
    ahora: Date,
    error?: string,
  ) {
    const antiguedadMaxima = new Date(ahora.getTime() - MAXIMO_CACHE_DESACTUALIZADA_HORAS * 60 * 60 * 1000);
    if (cache && cache.obtenidoEn >= antiguedadMaxima) {
      return {
        ...this.respuestaDesdeCache('DESACTUALIZADO', campo, cache),
        mensaje: 'Mostramos el último pronóstico disponible. Verificá la hora de actualización antes de usarlo.',
      };
    }
    return {
      estado: error ? 'NO_DISPONIBLE' : 'PROVEEDOR_NO_CONFIGURADO',
      campo: this.resumenCampo(campo),
      mensaje: error
        ? 'No se pudo actualizar el pronóstico. Intentá nuevamente más tarde.'
        : 'El proveedor comercial de pronóstico todavía no está configurado para producción.',
      datos: null,
    };
  }

  private coordenadasValidas(latitud: number | null, longitud: number | null) {
    return (
      typeof latitud === 'number' && Number.isFinite(latitud) && latitud >= -90 && latitud <= 90
      && typeof longitud === 'number' && Number.isFinite(longitud) && longitud >= -180 && longitud <= 180
    );
  }

  private resumenCampo(campo: CampoClima) {
    return {
      id: campo.id,
      nombre: campo.nombre,
      ubicacion: campo.ubicacion,
      provincia: campo.provincia,
      localidad: campo.localidad,
      tieneCoordenadas: this.coordenadasValidas(campo.latitud, campo.longitud),
    };
  }

  private normalizarFecha(fecha: string) {
    const fechaSimple = fecha.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaSimple)) {
      throw new BadRequestException('La fecha de precipitación no es válida');
    }
    const normalizada = new Date(`${fechaSimple}T12:00:00.000Z`);
    if (
      Number.isNaN(normalizada.getTime())
      || normalizada.toISOString().slice(0, 10) !== fechaSimple
    ) {
      throw new BadRequestException('La fecha de precipitación no es válida');
    }
    return normalizada;
  }

  private snapshotPrecipitacion(registro: {
    campoId: number;
    loteId: number | null;
    fecha: Date;
    milimetros: { toString(): string };
    observaciones: string | null;
  }) {
    return {
      campoId: registro.campoId,
      loteId: registro.loteId,
      fecha: registro.fecha.toISOString(),
      milimetros: registro.milimetros.toString(),
      observaciones: registro.observaciones,
    };
  }
}
