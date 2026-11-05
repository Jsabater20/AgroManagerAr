import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  CategoriaChecklistPreventivoHidrico,
  EstadoChecklistPreventivoHidrico,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { ReferidosService } from '../referidos/referidos.service';
import {
  CreateCampoDto,
  UpdateCampoDto,
  CreateLoteDto,
  UpdatePerfilRiesgoHidricoDto,
} from './dto/campos.dto';
import {
  CreateChecklistPreventivoHidricoDto,
  UpdateChecklistPreventivoHidricoDto,
} from './dto/checklist-hidrico.dto';
import { UpdateUmbralAlertaHidricaCampoDto } from './dto/umbrales-alerta-hidrica.dto';

const UMBRALES_ALERTA_HIDRICA_POR_DEFECTO = {
  activo: true,
  lluviaDiariaMm: 25,
  lluviaAcumulada48hMm: 50,
  probabilidadLluviaPct: 70,
  crearAccionesAutomaticas: false,
};

const TIPOS_ALERTA_HIDRICA = [
  'CLIMA_LLUVIA_INTENSA',
  'CLIMA_LLUVIA_ACUMULADA',
  'CLIMA_PROBABILIDAD_LLUVIA',
];

@Injectable()
export class CamposService {
  constructor(
    private prisma: PrismaService,
    private planService: PlanService,
    private memberAccessService: MemberAccessService,
    private referidosService: ReferidosService,
  ) {}

  async findAll(usuarioId: number, organizacionId: number, usuarioOrganizacionId?: number) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Campos',
    );
    let whereClause: any = { organizacionId };

    // Los miembros sólo ven campos asignados; el propietario ve todos los de su organización.
    if (!acceso.esOwner) {
      whereClause = {
        organizacionId,
        AsignacionCampo: {
          some: {
            usuarioOrganizacionId: acceso.usuarioOrganizacionId,
            activo: true,
          },
        },
      };
    }

    return this.prisma.campo.findMany({
      where: whereClause,
      include: { lotes: true, usuario: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, usuarioId: number, organizacionId: number) {
    const campo = await this.prisma.campo.findUnique({
      where: { id },
      include: {
        lotes: {
          include: {
            siembras: {
              include: { tipoCultivo: true },
              orderBy: { fechaSiembra: 'desc' },
            },
          },
        },
        usuario: true,
      },
    });
    if (!campo) throw new NotFoundException('Campo no encontrado');
    if (campo.organizacionId !== organizacionId) {
      throw new ForbiddenException('No tenés acceso a este campo');
    }
    await this.memberAccessService.requireCampo(usuarioId, organizacionId, id);
    return campo;
  }

  async create(dto: CreateCampoDto, usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Campos');
    await this.planService.checkCamposLimit(organizacionId);
    const campo = await this.prisma.campo.create({
      data: { ...dto, usuarioId, organizacionId },
      include: { lotes: true, usuario: true },
    });
    await this.referidosService.marcarPrimerCampoCreado(usuarioId);
    return campo;
  }

  async update(
    id: number,
    dto: UpdateCampoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    await this.findOne(id, usuarioId, organizacionId);
    return this.prisma.campo.update({
      where: { id },
      data: dto,
      include: { lotes: true, usuario: true },
    });
  }

  async remove(id: number, usuarioId: number, organizacionId: number) {
    await this.findOne(id, usuarioId, organizacionId);

    const lotes = await this.prisma.lote.findMany({
      where: { campoId: id },
      select: { id: true },
    });
    const loteIds = lotes.map((l) => l.id);

    const siembras =
      loteIds.length > 0
        ? await this.prisma.siembra.findMany({
            where: { loteId: { in: loteIds } },
            select: { id: true },
          })
        : [];
    const siembraIds = siembras.map((s) => s.id);
    const cultivosFrutihorticolas = await this.prisma.cultivoFrutihorticola.findMany({
      where: { campoId: id },
      select: { id: true },
    });
    const cultivosFrutihorticolasIds = cultivosFrutihorticolas.map(
      (cultivo) => cultivo.id,
    );
    const cuadrosYerba = await this.prisma.cuadroYerba.findMany({
      where: { campoId: id },
      select: { id: true },
    });
    const cuadrosYerbaIds = cuadrosYerba.map((cuadro) => cuadro.id);

    await this.prisma.$transaction([
      this.prisma.cosechaYerba.deleteMany({
        where: { cuadroId: { in: cuadrosYerbaIds } },
      }),
      this.prisma.cuadroYerba.deleteMany({ where: { campoId: id } }),
      this.prisma.cosechaFrutihorticola.deleteMany({
        where: { cultivoId: { in: cultivosFrutihorticolasIds } },
      }),
      this.prisma.cultivoFrutihorticola.deleteMany({ where: { campoId: id } }),
      this.prisma.aplicacionInsumo.deleteMany({
        where: { siembraId: { in: siembraIds } },
      }),
      this.prisma.cosecha.deleteMany({
        where: { siembraId: { in: siembraIds } },
      }),
      this.prisma.siembra.updateMany({
        where: { id: { in: siembraIds } },
        data: { campaniaId: null },
      }),
      this.prisma.siembra.deleteMany({ where: { id: { in: siembraIds } } }),
      this.prisma.lote.deleteMany({ where: { campoId: id } }),
      this.prisma.tareaRural.updateMany({
        where: { campoId: id },
        data: { campoId: null },
      }),
      this.prisma.movimientoFinanciero.updateMany({
        where: { campoId: id },
        data: { campoId: null },
      }),
      this.prisma.campo.delete({ where: { id } }),
    ]);
  }

  async addLote(
    campoId: number,
    dto: CreateLoteDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    const campo = await this.findOne(campoId, usuarioId, organizacionId);
    await this.planService.checkLotesLimit(organizacionId);
    return this.prisma.lote.create({
      data: { ...dto, campoId },
    });
  }

  async obtenerPerfilRiesgoHidrico(
    campoId: number,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(campoId, usuarioId, organizacionId);
    const perfil = await this.prisma.perfilRiesgoHidricoCampo.findUnique({
      where: { campoId },
      include: {
        actualizadoPor: {
          select: { id: true, nombre: true, apellido: true },
        },
      },
    });

    if (!perfil) {
      return {
        campoId,
        nivel: 'MEDIO' as const,
        zonasBajas: null,
        drenajes: null,
        caminosYAccesos: null,
        infraestructuraCritica: null,
        sectoresSeguros: null,
        observaciones: null,
        actualizadoPor: null,
        updatedAt: null,
        configurado: false,
        puedeEditar: acceso.esOwner,
      };
    }

    return {
      ...perfil,
      configurado: true,
      puedeEditar: acceso.esOwner,
    };
  }

  async actualizarPerfilRiesgoHidrico(
    campoId: number,
    dto: UpdatePerfilRiesgoHidricoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(campoId, usuarioId, organizacionId);
    if (!acceso.esOwner) {
      throw new ForbiddenException('Solo el owner puede actualizar el perfil de riesgo hídrico');
    }

    const datos = {
      nivel: dto.nivel,
      ...(dto.zonasBajas !== undefined ? { zonasBajas: this.normalizarTextoOpcional(dto.zonasBajas) } : {}),
      ...(dto.drenajes !== undefined ? { drenajes: this.normalizarTextoOpcional(dto.drenajes) } : {}),
      ...(dto.caminosYAccesos !== undefined ? { caminosYAccesos: this.normalizarTextoOpcional(dto.caminosYAccesos) } : {}),
      ...(dto.infraestructuraCritica !== undefined ? { infraestructuraCritica: this.normalizarTextoOpcional(dto.infraestructuraCritica) } : {}),
      ...(dto.sectoresSeguros !== undefined ? { sectoresSeguros: this.normalizarTextoOpcional(dto.sectoresSeguros) } : {}),
      ...(dto.observaciones !== undefined ? { observaciones: this.normalizarTextoOpcional(dto.observaciones) } : {}),
    };

    return this.prisma.perfilRiesgoHidricoCampo.upsert({
      where: { campoId },
      create: {
        organizacionId,
        campoId,
        actualizadoPorId: usuarioId,
        ...datos,
      },
      update: {
        ...datos,
        actualizadoPorId: usuarioId,
      },
      include: {
        actualizadoPor: {
          select: { id: true, nombre: true, apellido: true },
        },
      },
    });
  }

  async obtenerUmbralAlertaHidrica(
    campoId: number,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(
      campoId,
      usuarioId,
      organizacionId,
    );
    const esPro = await this.planService.isOrgPro(organizacionId);
    if (!esPro) {
      return {
        campoId,
        ...UMBRALES_ALERTA_HIDRICA_POR_DEFECTO,
        actualizadoPor: null,
        updatedAt: null,
        configurado: false,
        puedeEditar: false,
        esPro: false,
      };
    }
    const umbral = await this.prisma.umbralAlertaHidricaCampo.findUnique({
      where: { campoId },
      include: {
        actualizadoPor: { select: { id: true, nombre: true, apellido: true } },
      },
    });

    if (!umbral) {
      return {
        campoId,
        ...UMBRALES_ALERTA_HIDRICA_POR_DEFECTO,
        actualizadoPor: null,
        updatedAt: null,
        configurado: false,
        puedeEditar: acceso.esOwner,
        esPro: true,
      };
    }

    return { ...umbral, configurado: true, puedeEditar: acceso.esOwner, esPro: true };
  }

  async actualizarUmbralAlertaHidrica(
    campoId: number,
    dto: UpdateUmbralAlertaHidricaCampoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(
      campoId,
      usuarioId,
      organizacionId,
    );
    this.requerirOwner(acceso.esOwner, 'configurar las alertas hídricas');
    await this.planService.checkProAccess(
      organizacionId,
      'Los umbrales de alertas hídricas por campo',
    );

    if (dto.lluviaAcumulada48hMm < dto.lluviaDiariaMm) {
      throw new BadRequestException(
        'El acumulado de 48 horas debe ser igual o mayor al umbral diario',
      );
    }

    return this.prisma.umbralAlertaHidricaCampo.upsert({
      where: { campoId },
      create: {
        organizacionId,
        campoId,
        actualizadoPorId: usuarioId,
        ...dto,
      },
      update: {
        actualizadoPorId: usuarioId,
        ...dto,
      },
      include: {
        actualizadoPor: { select: { id: true, nombre: true, apellido: true } },
      },
    });
  }

  async asegurarAccionPreventivaAutomatica(
    organizacionId: number,
    campoId: number,
    alerta: { titulo: string; mensaje: string },
  ) {
    if (!await this.planService.isOrgPro(organizacionId)) {
      return { creada: false, motivo: 'PLAN_FREE' as const };
    }
    const automatizacion = await this.prisma.umbralAlertaHidricaCampo.findFirst({
      where: {
        organizacionId,
        campoId,
        activo: true,
        crearAccionesAutomaticas: true,
      },
      select: { id: true },
    });
    if (!automatizacion) return { creada: false, motivo: 'DESACTIVADA' as const };

    const pendiente = await this.prisma.checklistPreventivoHidrico.findFirst({
      where: {
        organizacionId,
        campoId,
        estado: EstadoChecklistPreventivoHidrico.PENDIENTE,
        origenAutomatico: 'ALERTA_HIDRICA',
      },
      select: { id: true },
    });
    if (pendiente) return { creada: false, motivo: 'YA_EXISTE' as const, itemId: pendiente.id };

    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: organizacionId },
      select: { propietarioId: true },
    });
    if (!organizacion) return { creada: false, motivo: 'ORGANIZACION_NO_ENCONTRADA' as const };

    const fechaLimite = new Date();
    fechaLimite.setHours(23, 59, 59, 999);
    const creada = await this.prisma.checklistPreventivoHidrico.create({
      data: {
        organizacionId,
        campoId,
        titulo: 'Preparar el campo ante alerta hídrica',
        descripcion: `${alerta.titulo}. ${alerta.mensaje}`,
        categoria: CategoriaChecklistPreventivoHidrico.DRENAJE,
        fechaLimite,
        creadoPorId: organizacion.propietarioId,
        origenAutomatico: 'ALERTA_HIDRICA',
        actualizadoAutomaticamenteEn: new Date(),
      },
      select: { id: true },
    });

    return { creada: true, itemId: creada.id };
  }

  async obtenerResumenHidricoDashboard(usuarioId: number, organizacionId: number) {
    const acceso = await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Dashboard',
    );
    const campoIds = acceso.esOwner
      ? undefined
      : (await this.prisma.asignacionCampo.findMany({
          where: {
            usuarioOrganizacionId: acceso.usuarioOrganizacionId,
            activo: true,
          },
          select: { campoId: true },
        })).map((asignacion) => asignacion.campoId);

    return this.obtenerResumenHidricoParaCampos(organizacionId, campoIds);
  }

  async obtenerResumenHidricoParaCampos(
    organizacionId: number,
    campoIds?: number[],
  ) {
    const esPro = await this.planService.isOrgPro(organizacionId);
    if (campoIds && !campoIds.length) {
      return {
        resumen: {
          totalCampos: 0,
          altoRiesgo: 0,
          sinPerfil: 0,
          accionesPendientes: 0,
          accionesAutomaticasPendientes: 0,
          alertasActivas: 0,
          automatizacionesActivas: 0,
        },
        campos: [],
      };
    }

    const filtroCampo = campoIds ? { id: { in: campoIds } } : {};
    const [campos, alertas] = await Promise.all([
      this.prisma.campo.findMany({
        where: { organizacionId, ...filtroCampo },
        select: {
          id: true,
          nombre: true,
          perfilRiesgoHidrico: { select: { nivel: true } },
          umbralAlertaHidrica: {
            select: { activo: true, crearAccionesAutomaticas: true },
          },
          checklistHidrico: {
            where: { estado: EstadoChecklistPreventivoHidrico.PENDIENTE },
            select: { id: true, origenAutomatico: true },
          },
        },
        orderBy: { nombre: 'asc' },
      }),
      this.prisma.alertaGestion.findMany({
        where: {
          organizacionId,
          estado: { in: ['ACTIVA', 'REVISADA'] },
          tipo: { in: TIPOS_ALERTA_HIDRICA },
          ...(campoIds ? { origenId: { in: campoIds.map(String) } } : {}),
        },
        select: { origenId: true, severidad: true },
      }),
    ]);

    const alertasPorCampo = new Map<number, Array<{ severidad: string }>>();
    for (const alerta of alertas) {
      const campoId = Number(alerta.origenId);
      if (!Number.isInteger(campoId)) continue;
      const actuales = alertasPorCampo.get(campoId) ?? [];
      actuales.push({ severidad: alerta.severidad });
      alertasPorCampo.set(campoId, actuales);
    }

    const prioridadRiesgo: Record<string, number> = { ALTO: 0, MEDIO: 1, BAJO: 2 };
    const detalleCampos = campos.map((campo) => {
      const alertasCampo = alertasPorCampo.get(campo.id) ?? [];
      const accionesAutomaticas = campo.checklistHidrico.filter(
        (item) => item.origenAutomatico === 'ALERTA_HIDRICA',
      ).length;
      const nivelRiesgo = campo.perfilRiesgoHidrico?.nivel ?? null;
      return {
        id: campo.id,
        nombre: campo.nombre,
        nivelRiesgo,
        perfilConfigurado: Boolean(campo.perfilRiesgoHidrico),
        accionesPendientes: campo.checklistHidrico.length,
        accionesAutomaticasPendientes: esPro ? accionesAutomaticas : 0,
        alertasActivas: alertasCampo.length,
        alertasPrioritarias: alertasCampo.filter(
          (alerta) => alerta.severidad === 'PRIORITARIA',
        ).length,
        automatizacionActiva: Boolean(
          esPro && campo.umbralAlertaHidrica?.activo &&
            campo.umbralAlertaHidrica.crearAccionesAutomaticas,
        ),
      };
    });

    const camposParaMostrar = detalleCampos
      .filter((campo) =>
        campo.alertasActivas > 0 ||
        campo.accionesPendientes > 0 ||
        campo.nivelRiesgo === 'ALTO' ||
        !campo.perfilConfigurado,
      )
      .sort((primero, segundo) => {
        if (segundo.alertasPrioritarias !== primero.alertasPrioritarias) {
          return segundo.alertasPrioritarias - primero.alertasPrioritarias;
        }
        if (segundo.alertasActivas !== primero.alertasActivas) {
          return segundo.alertasActivas - primero.alertasActivas;
        }
        const prioridadPrimero = primero.nivelRiesgo ? prioridadRiesgo[primero.nivelRiesgo] : 3;
        const prioridadSegundo = segundo.nivelRiesgo ? prioridadRiesgo[segundo.nivelRiesgo] : 3;
        return prioridadPrimero - prioridadSegundo;
      })
      .slice(0, 5);

    return {
      resumen: {
        totalCampos: campos.length,
        altoRiesgo: detalleCampos.filter((campo) => campo.nivelRiesgo === 'ALTO').length,
        sinPerfil: detalleCampos.filter((campo) => !campo.perfilConfigurado).length,
        accionesPendientes: detalleCampos.reduce(
          (total, campo) => total + campo.accionesPendientes,
          0,
        ),
        accionesAutomaticasPendientes: detalleCampos.reduce(
          (total, campo) => total + campo.accionesAutomaticasPendientes,
          0,
        ),
        alertasActivas: alertas.length,
        automatizacionesActivas: detalleCampos.filter(
          (campo) => campo.automatizacionActiva,
        ).length,
      },
      campos: camposParaMostrar,
    };
  }

  async listarChecklistPreventivoHidrico(
    campoId: number,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(
      campoId,
      usuarioId,
      organizacionId,
    );
    const items = await this.prisma.checklistPreventivoHidrico.findMany({
      where: { campoId, organizacionId },
      include: {
        responsable: {
          select: {
            id: true,
            cargo: true,
            cargoPersonalizado: true,
            usuario: { select: { id: true, nombre: true, apellido: true } },
          },
        },
        completadoPor: { select: { id: true, nombre: true, apellido: true } },
        creadoPor: { select: { id: true, nombre: true, apellido: true } },
      },
      orderBy: [{ estado: 'asc' }, { fechaLimite: 'asc' }, { createdAt: 'asc' }],
    });

    return {
      puedeEditar: acceso.esOwner,
      items: items.map((item) => ({
        ...item,
        puedeCompletar:
          acceso.esOwner || item.responsableId === acceso.usuarioOrganizacionId,
      })),
    };
  }

  async crearChecklistPreventivoHidrico(
    campoId: number,
    dto: CreateChecklistPreventivoHidricoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(
      campoId,
      usuarioId,
      organizacionId,
    );
    this.requerirOwner(acceso.esOwner, 'crear acciones preventivas');
    await this.validarResponsableChecklist(dto.responsableId, organizacionId);

    return this.prisma.checklistPreventivoHidrico.create({
      data: {
        organizacionId,
        campoId,
        titulo: this.normalizarTitulo(dto.titulo),
        descripcion: this.normalizarTextoOpcional(dto.descripcion),
        categoria: dto.categoria ?? CategoriaChecklistPreventivoHidrico.GENERAL,
        responsableId: dto.responsableId ?? null,
        fechaLimite: this.normalizarFechaOpcional(dto.fechaLimite),
        creadoPorId: usuarioId,
      },
    });
  }

  async actualizarChecklistPreventivoHidrico(
    campoId: number,
    itemId: number,
    dto: UpdateChecklistPreventivoHidricoDto,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(
      campoId,
      usuarioId,
      organizacionId,
    );
    this.requerirOwner(acceso.esOwner, 'editar acciones preventivas');
    await this.obtenerChecklistPreventivoHidrico(campoId, itemId, organizacionId);

    if (dto.responsableId !== undefined) {
      await this.validarResponsableChecklist(dto.responsableId, organizacionId);
    }

    return this.prisma.checklistPreventivoHidrico.update({
      where: { id: itemId },
      data: {
        ...(dto.titulo !== undefined ? { titulo: this.normalizarTitulo(dto.titulo) } : {}),
        ...(dto.descripcion !== undefined
          ? { descripcion: this.normalizarTextoOpcional(dto.descripcion) }
          : {}),
        ...(dto.categoria !== undefined ? { categoria: dto.categoria } : {}),
        ...(dto.responsableId !== undefined
          ? { responsableId: dto.responsableId }
          : {}),
        ...(dto.fechaLimite !== undefined
          ? { fechaLimite: this.normalizarFechaOpcional(dto.fechaLimite) }
          : {}),
      },
    });
  }

  async actualizarEstadoChecklistPreventivoHidrico(
    campoId: number,
    itemId: number,
    estado: EstadoChecklistPreventivoHidrico,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(
      campoId,
      usuarioId,
      organizacionId,
    );
    const item = await this.obtenerChecklistPreventivoHidrico(
      campoId,
      itemId,
      organizacionId,
    );
    const esResponsable = item.responsableId === acceso.usuarioOrganizacionId;

    if (!acceso.esOwner && !esResponsable) {
      throw new ForbiddenException('Solo el responsable asignado puede completar esta acción');
    }
    if (!acceso.esOwner && estado === EstadoChecklistPreventivoHidrico.PENDIENTE) {
      throw new ForbiddenException('Solo el owner puede reabrir una acción completada');
    }

    const completada = estado === EstadoChecklistPreventivoHidrico.COMPLETADO;
    return this.prisma.checklistPreventivoHidrico.update({
      where: { id: itemId },
      data: {
        estado,
        completadoEn: completada ? new Date() : null,
        completadoPorId: completada ? usuarioId : null,
      },
    });
  }

  async eliminarChecklistPreventivoHidrico(
    campoId: number,
    itemId: number,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(
      campoId,
      usuarioId,
      organizacionId,
    );
    this.requerirOwner(acceso.esOwner, 'eliminar acciones preventivas');
    await this.obtenerChecklistPreventivoHidrico(campoId, itemId, organizacionId);

    await this.prisma.checklistPreventivoHidrico.delete({ where: { id: itemId } });
    return { eliminado: true };
  }

  async crearPlantillaChecklistPreventivoHidrico(
    campoId: number,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.validarAccesoPerfilRiesgoHidrico(
      campoId,
      usuarioId,
      organizacionId,
    );
    this.requerirOwner(acceso.esOwner, 'cargar el checklist sugerido');

    const plantilla: Array<{
      titulo: string;
      descripcion: string;
      categoria: CategoriaChecklistPreventivoHidrico;
    }> = [
      {
        titulo: 'Revisar drenajes, zanjas y alcantarillas',
        descripcion: 'Limpiar obstrucciones y verificar que el agua pueda escurrir.',
        categoria: CategoriaChecklistPreventivoHidrico.DRENAJE,
      },
      {
        titulo: 'Verificar accesos, caminos y tranqueras',
        descripcion: 'Identificar los accesos que podrían cortarse y una alternativa segura.',
        categoria: CategoriaChecklistPreventivoHidrico.ACCESO,
      },
      {
        titulo: 'Resguardar insumos, maquinaria y tableros eléctricos',
        descripcion: 'Revisar techos, elevación, coberturas y puntos de riesgo.',
        categoria: CategoriaChecklistPreventivoHidrico.INFRAESTRUCTURA,
      },
      {
        titulo: 'Confirmar sectores altos y disponibilidad para hacienda',
        descripcion: 'Dejar definida la alternativa para resguardar animales si el agua sube.',
        categoria: CategoriaChecklistPreventivoHidrico.GANADERIA,
      },
      {
        titulo: 'Documentar la recorrida preventiva y sus novedades',
        descripcion: 'Registrar observaciones y fotos para que el equipo tenga una referencia común.',
        categoria: CategoriaChecklistPreventivoHidrico.GENERAL,
      },
    ];

    const existentes = await this.prisma.checklistPreventivoHidrico.findMany({
      where: {
        organizacionId,
        campoId,
        titulo: { in: plantilla.map((item) => item.titulo) },
      },
      select: { titulo: true },
    });
    const titulosExistentes = new Set(existentes.map((item) => item.titulo));
    const nuevos = plantilla.filter((item) => !titulosExistentes.has(item.titulo));

    if (nuevos.length) {
      await this.prisma.checklistPreventivoHidrico.createMany({
        data: nuevos.map((item) => ({
          ...item,
          organizacionId,
          campoId,
          creadoPorId: usuarioId,
        })),
      });
    }

    return { creados: nuevos.length };
  }

  private async validarAccesoPerfilRiesgoHidrico(
    campoId: number,
    usuarioId: number,
    organizacionId: number,
  ) {
    const acceso = await this.memberAccessService.requireModule(usuarioId, organizacionId, 'Campos');
    if (!acceso.esOwner) {
      await this.memberAccessService.requireCampo(usuarioId, organizacionId, campoId);
    }

    const campo = await this.prisma.campo.findFirst({
      where: { id: campoId, organizacionId },
      select: { id: true },
    });
    if (!campo) throw new NotFoundException('Campo no encontrado');
    return acceso;
  }

  private async obtenerChecklistPreventivoHidrico(
    campoId: number,
    itemId: number,
    organizacionId: number,
  ) {
    const item = await this.prisma.checklistPreventivoHidrico.findFirst({
      where: { id: itemId, campoId, organizacionId },
      select: { id: true, responsableId: true },
    });
    if (!item) throw new NotFoundException('Acción preventiva no encontrada');
    return item;
  }

  private async validarResponsableChecklist(
    responsableId: number | null | undefined,
    organizacionId: number,
  ) {
    if (responsableId == null) return;

    const responsable = await this.prisma.usuarioOrganizacion.findFirst({
      where: { id: responsableId, organizacionId, activo: true },
      select: { id: true },
    });
    if (!responsable) {
      throw new BadRequestException('El responsable debe ser un miembro activo de la organización');
    }
  }

  private requerirOwner(esOwner: boolean, accion: string) {
    if (!esOwner) {
      throw new ForbiddenException(`Solo el owner puede ${accion}`);
    }
  }

  private normalizarTitulo(valor: string) {
    const titulo = valor.trim();
    if (!titulo) throw new BadRequestException('El título de la acción es requerido');
    return titulo;
  }

  private normalizarTextoOpcional(valor?: string | null) {
    return valor?.trim() || null;
  }

  private normalizarFechaOpcional(valor?: string | null) {
    if (!valor) return null;
    const fecha = new Date(valor);
    if (Number.isNaN(fecha.getTime())) {
      throw new BadRequestException('La fecha límite no es válida');
    }
    return fecha;
  }
}
