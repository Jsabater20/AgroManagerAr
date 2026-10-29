import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CategoriaMovimiento,
  EstadoActividad,
  OrigenMovimientoFinanciero,
  Prisma,
  RubroCostoProductivo,
  TipoCostoProductivo,
  TipoMovimiento,
} from '@prisma/client';
import type { TipoRecursoActividad } from '@prisma/client';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCostoActividadDto } from './dto/create-costo-actividad.dto';
import { CreateCostoEstimadoDto } from './dto/create-costo-estimado.dto';

const costoIncluye = {
  creadoPor: {
    select: { id: true, nombre: true, apellido: true },
  },
  movimientoFinanciero: {
    select: {
      id: true,
      concepto: true,
      monto: true,
      moneda: true,
      fecha: true,
      categoria: true,
      origen: true,
    },
  },
} satisfies Prisma.CostoProductivoInclude;

type ContextoProductivo = {
  campoId: number | null;
  loteId: number | null;
  siembraId: number | null;
  campaniaId: number | null;
  maquinariaId: number | null;
};

@Injectable()
export class CostosProductivosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly planService: PlanService,
  ) {}

  async listarPorActividad(orgId: number, actividadId: number) {
    await this.obtenerActividadCompletada(orgId, actividadId, false);

    return this.prisma.costoProductivo.findMany({
      where: { organizacionId: orgId, actividadId },
      include: costoIncluye,
      orderBy: { fecha: 'desc' },
    });
  }

  async crearDesdeActividad(
    orgId: number,
    actividadId: number,
    dto: CreateCostoActividadDto,
    userId: number,
  ) {
    await this.planService.checkProAccess(orgId, 'El registro de costos reales');

    const actividad = await this.obtenerActividadCompletada(orgId, actividadId, true);
    const costoExistente = await this.obtenerPorIdempotencia(
      orgId,
      dto.idempotencyKey,
    );
    if (costoExistente) return costoExistente;

    const contexto = await this.resolverContextoProductivo(orgId, actividad);
    const categoria = this.obtenerCategoriaFinanciera(dto.rubro);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const movimiento = await tx.movimientoFinanciero.create({
          data: {
            usuarioId: userId,
            organizacionId: orgId,
            tipo: TipoMovimiento.EGRESO,
            concepto: dto.descripcion,
            monto: dto.monto,
            moneda: 'ARS',
            origen: OrigenMovimientoFinanciero.COSTO_PRODUCTIVO,
            fecha: new Date(dto.fecha),
            categoria,
            campoId: contexto.campoId,
            siembraId: contexto.siembraId,
            observaciones: `Costo real del trabajo: ${actividad.titulo}`,
          },
        });

        const costo = await tx.costoProductivo.create({
          data: {
            organizacionId: orgId,
            actividadId,
            calculoGuardadoId: actividad.calculoOrigenId,
            movimientoFinancieroId: movimiento.id,
            campoId: contexto.campoId,
            loteId: contexto.loteId,
            siembraId: contexto.siembraId,
            campaniaId: contexto.campaniaId,
            maquinariaId: contexto.maquinariaId,
            creadoPorId: userId,
            tipo: TipoCostoProductivo.REAL,
            rubro: dto.rubro,
            descripcion: dto.descripcion,
            cantidad: dto.cantidad,
            unidad: dto.unidad,
            costoUnitario: dto.costoUnitario,
            monto: dto.monto,
            superficieHa: dto.superficieHa,
            fecha: new Date(dto.fecha),
            idempotencyKey: dto.idempotencyKey,
          },
          include: costoIncluye,
        });

        await tx.auditoriaLog.create({
          data: {
            usuarioId: userId,
            organizacionId: orgId,
            accion: 'COSTO_PRODUCTIVO_REGISTRADO',
            entidad: 'CostoProductivo',
            entidadId: costo.id,
            cambios: JSON.stringify({
              actividadId,
              movimientoFinancieroId: movimiento.id,
              rubro: dto.rubro,
              monto: dto.monto,
            }),
          },
        });

        return costo;
      });
    } catch (error) {
      if (!this.esConflictoIdempotencia(error) || !dto.idempotencyKey) {
        throw error;
      }

      const costo = await this.obtenerPorIdempotencia(orgId, dto.idempotencyKey);
      if (costo) return costo;
      throw error;
    }
  }

  async crearEstimado(
    orgId: number,
    dto: CreateCostoEstimadoDto,
    userId: number,
  ) {
    await this.planService.checkProAccess(orgId, 'La proyección de costos');

    const costoExistente = await this.obtenerPorIdempotencia(
      orgId,
      dto.idempotencyKey,
    );
    if (costoExistente) return costoExistente;

    const contexto = await this.resolverContextoProductivo(orgId, dto);
    if (!contexto.campoId && !contexto.loteId && !contexto.siembraId && !contexto.campaniaId) {
      throw new BadRequestException('Seleccioná un recurso válido para el costo estimado.');
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const costo = await tx.costoProductivo.create({
          data: {
            organizacionId: orgId,
            campoId: contexto.campoId,
            loteId: contexto.loteId,
            siembraId: contexto.siembraId,
            campaniaId: contexto.campaniaId,
            maquinariaId: contexto.maquinariaId,
            creadoPorId: userId,
            tipo: TipoCostoProductivo.ESTIMADO,
            rubro: dto.rubro,
            descripcion: dto.descripcion,
            cantidad: dto.cantidad,
            unidad: dto.unidad,
            costoUnitario: dto.costoUnitario,
            monto: dto.monto,
            superficieHa: dto.superficieHa,
            fecha: new Date(dto.fecha),
            idempotencyKey: dto.idempotencyKey,
          },
          include: costoIncluye,
        });

        await tx.auditoriaLog.create({
          data: {
            usuarioId: userId,
            organizacionId: orgId,
            accion: 'COSTO_PRODUCTIVO_ESTIMADO_CREADO',
            entidad: 'CostoProductivo',
            entidadId: costo.id,
            cambios: JSON.stringify({
              recursoTipo: dto.recursoTipo,
              recursoId: dto.recursoId,
              rubro: dto.rubro,
              monto: dto.monto,
            }),
          },
        });

        return costo;
      });
    } catch (error) {
      if (!this.esConflictoIdempotencia(error) || !dto.idempotencyKey) {
        throw error;
      }

      const costo = await this.obtenerPorIdempotencia(orgId, dto.idempotencyKey);
      if (costo) return costo;
      throw error;
    }
  }

  private async obtenerActividadCompletada(
    orgId: number,
    actividadId: number,
    requiereCompletada: boolean,
  ) {
    const actividad = await this.prisma.actividadMiembro.findFirst({
      where: { id: actividadId, organizacionId: orgId },
      select: {
        id: true,
        titulo: true,
        estado: true,
        recursoTipo: true,
        recursoId: true,
        calculoOrigenId: true,
      },
    });

    if (!actividad) {
      throw new NotFoundException('Trabajo no encontrado en esta organización.');
    }

    if (requiereCompletada && actividad.estado !== EstadoActividad.COMPLETADA) {
      throw new BadRequestException(
        'Solo podés registrar costos reales cuando el trabajo está completado.',
      );
    }

    return actividad;
  }

  private async resolverContextoProductivo(
    orgId: number,
    actividad: {
      recursoTipo: TipoRecursoActividad;
      recursoId: number | null;
    },
  ): Promise<ContextoProductivo> {
    const vacio: ContextoProductivo = {
      campoId: null,
      loteId: null,
      siembraId: null,
      campaniaId: null,
      maquinariaId: null,
    };

    if (!actividad.recursoId) return vacio;

    switch (actividad.recursoTipo) {
      case 'CAMPO': {
        const campo = await this.prisma.campo.findFirst({
          where: { id: actividad.recursoId, organizacionId: orgId },
          select: { id: true },
        });
        if (!campo) throw new BadRequestException('El campo del trabajo ya no está disponible.');
        return { ...vacio, campoId: campo.id };
      }
      case 'LOTE': {
        const lote = await this.prisma.lote.findFirst({
          where: {
            id: actividad.recursoId,
            campo: { organizacionId: orgId },
          },
          select: { id: true, campoId: true },
        });
        if (!lote) throw new BadRequestException('El lote del trabajo ya no está disponible.');
        return { ...vacio, campoId: lote.campoId, loteId: lote.id };
      }
      case 'SIEMBRA': {
        const siembra = await this.prisma.siembra.findFirst({
          where: {
            id: actividad.recursoId,
            lote: { campo: { organizacionId: orgId } },
          },
          select: {
            id: true,
            campaniaId: true,
            lote: { select: { id: true, campoId: true } },
          },
        });
        if (!siembra) throw new BadRequestException('La siembra del trabajo ya no está disponible.');
        return {
          ...vacio,
          campoId: siembra.lote.campoId,
          loteId: siembra.lote.id,
          siembraId: siembra.id,
          campaniaId: siembra.campaniaId,
        };
      }
      case 'MAQUINARIA': {
        const maquinaria = await this.prisma.maquinaria.findFirst({
          where: { id: actividad.recursoId, organizacionId: orgId },
          select: { id: true, campoId: true },
        });
        if (!maquinaria) {
          throw new BadRequestException('La maquinaria del trabajo ya no está disponible.');
        }
        return {
          ...vacio,
          campoId: maquinaria.campoId,
          maquinariaId: maquinaria.id,
        };
      }
      case 'CAMPANIA': {
        const campania = await this.prisma.campania.findFirst({
          where: { id: actividad.recursoId, organizacionId: orgId },
          select: { id: true },
        });
        if (!campania) {
          throw new BadRequestException('La campaña del trabajo ya no está disponible.');
        }
        return { ...vacio, campaniaId: campania.id };
      }
      default:
        return vacio;
    }
  }

  private obtenerCategoriaFinanciera(
    rubro: RubroCostoProductivo,
  ): CategoriaMovimiento {
    const categorias: Record<RubroCostoProductivo, CategoriaMovimiento> = {
      INSUMO: CategoriaMovimiento.INSUMO,
      MAQUINARIA: CategoriaMovimiento.MANTENIMIENTO,
      MANO_DE_OBRA: CategoriaMovimiento.MANO_DE_OBRA,
      CONTRATISTA: CategoriaMovimiento.SERVICIO,
      SERVICIO: CategoriaMovimiento.SERVICIO,
      COMBUSTIBLE: CategoriaMovimiento.COMBUSTIBLE,
      MANTENIMIENTO: CategoriaMovimiento.MANTENIMIENTO,
      OTRO: CategoriaMovimiento.OTRO,
    };
    return categorias[rubro];
  }

  private async obtenerPorIdempotencia(
    orgId: number,
    idempotencyKey?: string,
  ) {
    if (!idempotencyKey) return null;

    const costo = await this.prisma.costoProductivo.findUnique({
      where: { idempotencyKey },
      include: costoIncluye,
    });

    if (costo && costo.organizacionId !== orgId) {
      throw new BadRequestException('La clave de registro ya fue utilizada.');
    }

    return costo;
  }

  private esConflictoIdempotencia(error: unknown): boolean {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    );
  }
}
