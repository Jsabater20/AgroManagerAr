import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Especie,
  EstadoActividad,
  EstadoEmpresa,
  EstadoMaquinaria,
  RolEmpresa,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EmpresaAccessService } from './empresa-access.service';
import {
  ActualizarComercialEmpresaDto,
  ActualizarMiembroEmpresaDto,
  CrearEstablecimientoEmpresaDto,
  CrearEmpresaDto,
  CrearMiembroEmpresaDto,
  VincularOrganizacionDto,
} from './dto/empresas.dto';

const ESTADOS_ACTIVOS: EstadoActividad[] = [
  EstadoActividad.PENDIENTE,
  EstadoActividad.EN_PROGRESO,
  EstadoActividad.PAUSADA,
];

@Injectable()
export class EmpresasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly empresaAccessService: EmpresaAccessService,
  ) {}

  async crearEmpresa(superAdminId: number, dto: CrearEmpresaDto) {
    await this.requerirSuperAdmin(superAdminId);

    const propietario = await this.prisma.usuario.findUnique({
      where: { id: dto.propietarioId },
      select: { id: true },
    });
    if (!propietario) throw new NotFoundException('Propietario no encontrado');

    return this.prisma.$transaction(async (tx) => {
      const empresa = await tx.empresa.create({
        data: {
          nombre: dto.nombre.trim(),
          propietarioId: propietario.id,
          limiteEstablecimientos: dto.limiteEstablecimientos ?? 3,
        },
      });

      await tx.usuarioEmpresa.create({
        data: {
          empresaId: empresa.id,
          usuarioId: propietario.id,
          rol: RolEmpresa.OWNER,
          accesoTodasOrganizaciones: true,
        },
      });

      return empresa;
    });
  }

  async listarParaAdmin(superAdminId: number) {
    await this.requerirSuperAdmin(superAdminId);

    const empresas = await this.prisma.empresa.findMany({
      include: {
        propietario: {
          select: { id: true, nombre: true, apellido: true, email: true },
        },
        organizaciones: {
          include: {
            organizacion: { select: { id: true, nombre: true, plan: true } },
          },
        },
        _count: { select: { miembros: true } },
      },
      orderBy: [{ createdAt: 'desc' }],
    });

    return empresas.map((empresa) => ({
      id: empresa.id,
      nombre: empresa.nombre,
      activo: empresa.activo,
      estadoComercial: empresa.estadoComercial,
      limiteEstablecimientos: empresa.limiteEstablecimientos,
      fechaInicioComercial: empresa.fechaInicioComercial,
      fechaVencimiento: empresa.fechaVencimiento,
      observacionesComerciales: empresa.observacionesComerciales,
      createdAt: empresa.createdAt,
      updatedAt: empresa.updatedAt,
      propietario: empresa.propietario,
      establecimientos: empresa.organizaciones.map((vinculo) => vinculo.organizacion),
      miembros: empresa._count.miembros,
    }));
  }

  async actualizarComercial(
    superAdminId: number,
    empresaId: number,
    dto: ActualizarComercialEmpresaDto,
  ) {
    await this.requerirSuperAdmin(superAdminId);

    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
      select: {
        id: true,
        estadoComercial: true,
        fechaInicioComercial: true,
        fechaVencimiento: true,
      },
    });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');

    if (dto.limiteEstablecimientos !== undefined) {
      const establecimientosActuales = await this.prisma.empresaOrganizacion.count({
        where: { empresaId: empresa.id },
      });
      if (dto.limiteEstablecimientos < establecimientosActuales) {
        throw new BadRequestException(
          'El límite no puede ser menor a los establecimientos ya vinculados',
        );
      }
    }

    const estadoComercial = dto.estadoComercial ?? empresa.estadoComercial;
    const fechaInicioComercial =
      dto.fechaInicioComercial !== undefined
        ? new Date(dto.fechaInicioComercial)
        : estadoComercial === EstadoEmpresa.ACTIVA &&
            empresa.estadoComercial !== EstadoEmpresa.ACTIVA &&
            !empresa.fechaInicioComercial
          ? new Date()
          : undefined;
    const fechaVencimiento =
      dto.fechaVencimiento !== undefined ? new Date(dto.fechaVencimiento) : undefined;
    const inicioParaValidar = fechaInicioComercial ?? empresa.fechaInicioComercial;
    const vencimientoParaValidar = fechaVencimiento ?? empresa.fechaVencimiento;

    if (
      inicioParaValidar &&
      vencimientoParaValidar &&
      vencimientoParaValidar < inicioParaValidar
    ) {
      throw new BadRequestException('La fecha de vencimiento debe ser posterior al inicio');
    }

    return this.prisma.empresa.update({
      where: { id: empresa.id },
      data: {
        estadoComercial: dto.estadoComercial,
        limiteEstablecimientos: dto.limiteEstablecimientos,
        fechaInicioComercial,
        fechaVencimiento,
        observacionesComerciales: dto.observacionesComerciales,
      },
      select: {
        id: true,
        nombre: true,
        estadoComercial: true,
        limiteEstablecimientos: true,
        fechaInicioComercial: true,
        fechaVencimiento: true,
        observacionesComerciales: true,
      },
    });
  }

  async listarOrganizacionesDisponiblesAdmin(superAdminId: number, empresaId: number) {
    await this.requerirSuperAdmin(superAdminId);

    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
      select: { propietarioId: true },
    });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');

    return this.prisma.organizacion.findMany({
      where: {
        propietarioId: empresa.propietarioId,
        vinculacionEmpresa: null,
      },
      select: { id: true, nombre: true, email: true, plan: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async vincularOrganizacionAdmin(
    superAdminId: number,
    empresaId: number,
    dto: VincularOrganizacionDto,
  ) {
    await this.requerirSuperAdmin(superAdminId);

    return this.prisma.$transaction(async (tx) => {
      const empresa = await tx.empresa.findUnique({
        where: { id: empresaId },
        include: { organizaciones: { select: { id: true } } },
      });
      if (!empresa) throw new NotFoundException('Empresa no encontrada');
      this.validarEmpresaActivaParaEstablecimientos(empresa);

      const organizacion = await tx.organizacion.findUnique({
        where: { id: dto.organizacionId },
        select: {
          id: true,
          propietarioId: true,
          vinculacionEmpresa: { select: { empresaId: true } },
        },
      });
      if (!organizacion) throw new NotFoundException('Establecimiento no encontrado');
      if (organizacion.propietarioId !== empresa.propietarioId) {
        throw new ForbiddenException('El establecimiento no pertenece al responsable de esta empresa');
      }
      if (organizacion.vinculacionEmpresa) {
        throw new BadRequestException('Este establecimiento ya pertenece a una empresa');
      }
      this.validarCupoEstablecimientos(empresa);

      await tx.organizacion.update({
        where: { id: organizacion.id },
        data: { plan: 'PRO' },
      });
      return tx.empresaOrganizacion.create({
        data: { empresaId: empresa.id, organizacionId: organizacion.id },
      });
    });
  }

  async crearEstablecimientoAdmin(
    superAdminId: number,
    empresaId: number,
    dto: CrearEstablecimientoEmpresaDto,
  ) {
    await this.requerirSuperAdmin(superAdminId);

    const nombre = dto.nombre.trim();
    const email = dto.email.trim().toLowerCase();
    const existeEmail = await this.prisma.organizacion.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existeEmail) {
      throw new BadRequestException('Ya existe un establecimiento con ese email');
    }

    return this.prisma.$transaction(async (tx) => {
      const empresa = await tx.empresa.findUnique({
        where: { id: empresaId },
        include: { organizaciones: { select: { id: true } } },
      });
      if (!empresa) throw new NotFoundException('Empresa no encontrada');
      this.validarEmpresaActivaParaEstablecimientos(empresa);
      this.validarCupoEstablecimientos(empresa);

      const organizacion = await tx.organizacion.create({
        data: {
          nombre,
          email,
          plan: 'PRO',
          propietarioId: empresa.propietarioId,
        },
      });
      await tx.empresaOrganizacion.create({
        data: { empresaId: empresa.id, organizacionId: organizacion.id },
      });

      return organizacion;
    });
  }

  async desvincularOrganizacionAdmin(
    superAdminId: number,
    empresaId: number,
    organizacionId: number,
  ) {
    await this.requerirSuperAdmin(superAdminId);

    const vinculo = await this.prisma.empresaOrganizacion.findFirst({
      where: { empresaId, organizacionId },
      select: { id: true },
    });
    if (!vinculo) throw new NotFoundException('Establecimiento no vinculado a la empresa');

    await this.prisma.empresaOrganizacion.delete({ where: { id: vinculo.id } });
    return { ok: true };
  }

  async listarMisEmpresas(usuarioId: number) {
    const empresas = await this.prisma.empresa.findMany({
      where: {
        activo: true,
        OR: [
          { propietarioId: usuarioId },
          { miembros: { some: { usuarioId, activo: true } } },
        ],
      },
      include: {
        organizaciones: { select: { organizacionId: true } },
        miembros: {
          where: { usuarioId, activo: true },
          select: {
            rol: true,
            accesoTodasOrganizaciones: true,
            organizacionesAutorizadas: { select: { organizacionId: true } },
          },
        },
      },
      orderBy: { nombre: 'asc' },
    });

    return empresas.map((empresa) => {
      const membresia = empresa.miembros[0];
      const accesoTodas =
        empresa.propietarioId === usuarioId ||
        membresia?.accesoTodasOrganizaciones === true ||
        membresia?.rol === RolEmpresa.GERENTE_GENERAL;

      return {
        id: empresa.id,
        nombre: empresa.nombre,
        establecimientos: accesoTodas
          ? empresa.organizaciones.length
          : membresia?.organizacionesAutorizadas.length ?? 0,
        limiteEstablecimientos: empresa.limiteEstablecimientos,
        estadoComercial: empresa.estadoComercial,
        fechaInicioComercial: empresa.fechaInicioComercial,
        fechaVencimiento: empresa.fechaVencimiento,
        rol: empresa.propietarioId === usuarioId ? RolEmpresa.OWNER : membresia?.rol,
        accesoTodasOrganizaciones: accesoTodas,
      };
    });
  }

  async obtenerEmpresa(usuarioId: number, empresaId: number) {
    const acceso = await this.empresaAccessService.obtenerAcceso(usuarioId, empresaId);
    return {
      id: acceso.empresa.id,
      nombre: acceso.empresa.nombre,
      activo: acceso.empresa.activo,
      estadoComercial: acceso.empresa.estadoComercial,
      limiteEstablecimientos: acceso.empresa.limiteEstablecimientos,
      fechaInicioComercial: acceso.empresa.fechaInicioComercial,
      fechaVencimiento: acceso.empresa.fechaVencimiento,
      rol: acceso.esPropietario ? RolEmpresa.OWNER : acceso.membresia?.rol,
      puedeGestionar: acceso.puedeGestionar,
      establecimientosAutorizados: acceso.organizacionesIds.length,
    };
  }

  async listarOrganizaciones(usuarioId: number, empresaId: number) {
    const acceso = await this.empresaAccessService.obtenerAcceso(usuarioId, empresaId);
    const organizaciones = await this.prisma.organizacion.findMany({
      where: { id: { in: acceso.organizacionesIds } },
      select: {
        id: true,
        nombre: true,
        plan: true,
        propietarioId: true,
        campos: { select: { hectareas: true } },
      },
      orderBy: { nombre: 'asc' },
    });

    return organizaciones.map((organizacion) => ({
      id: organizacion.id,
      nombre: organizacion.nombre,
      plan: organizacion.plan,
      propietarioId: organizacion.propietarioId,
      hectareas: organizacion.campos.reduce((total, campo) => total + campo.hectareas, 0),
    }));
  }

  async obtenerDashboard(usuarioId: number, empresaId: number) {
    const acceso = await this.empresaAccessService.obtenerAcceso(usuarioId, empresaId);
    const organizacionIds = acceso.organizacionesIds;

    const [campos, animales, maquinarias, actividades, miembros] = await Promise.all([
      this.prisma.campo.aggregate({
        where: { organizacionId: { in: organizacionIds } },
        _count: true,
        _sum: { hectareas: true },
      }),
      this.prisma.animal.count({ where: { organizacionId: { in: organizacionIds } } }),
      this.prisma.maquinaria.count({ where: { organizacionId: { in: organizacionIds } } }),
      this.prisma.actividadMiembro.groupBy({
        by: ['estado'],
        where: { organizacionId: { in: organizacionIds }, activo: true },
        _count: true,
      }),
      this.prisma.usuarioOrganizacion.findMany({
        where: { organizacionId: { in: organizacionIds }, activo: true },
        distinct: ['usuarioId'],
        select: { usuarioId: true },
      }),
    ]);

    const hoy = new Date();
    const demoradas = await this.prisma.actividadMiembro.count({
      where: {
        organizacionId: { in: organizacionIds },
        activo: true,
        estado: { in: ESTADOS_ACTIVOS },
        fechaEstimadaFin: { lt: hoy },
      },
    });
    const actividadesPorEstado = Object.fromEntries(
      actividades.map((actividad) => [actividad.estado, actividad._count]),
    ) as Record<string, number>;

    return {
      empresa: {
        id: acceso.empresa.id,
        nombre: acceso.empresa.nombre,
        establecimientos: organizacionIds.length,
        limiteEstablecimientos: acceso.empresa.limiteEstablecimientos,
        estadoComercial: acceso.empresa.estadoComercial,
        fechaInicioComercial: acceso.empresa.fechaInicioComercial,
        fechaVencimiento: acceso.empresa.fechaVencimiento,
      },
      resumen: {
        superficieHa: campos._sum.hectareas ?? 0,
        campos: campos._count,
        animales,
        maquinarias,
        miembros: miembros.length,
      },
      trabajos: {
        pendientes: actividadesPorEstado.PENDIENTE ?? 0,
        enProgreso: actividadesPorEstado.EN_PROGRESO ?? 0,
        pausadas: actividadesPorEstado.PAUSADA ?? 0,
        completadas: actividadesPorEstado.COMPLETADA ?? 0,
        demoradas,
      },
    };
  }

  async vincularOrganizacion(
    usuarioId: number,
    empresaId: number,
    dto: VincularOrganizacionDto,
  ) {
    const acceso = await this.empresaAccessService.requerirGestion(usuarioId, empresaId);
    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: dto.organizacionId },
      select: { id: true, propietarioId: true, plan: true },
    });
    if (!organizacion) throw new NotFoundException('Organización no encontrada');
    if (organizacion.propietarioId !== usuarioId) {
      throw new ForbiddenException('Solo podés vincular establecimientos propios');
    }
    if (organizacion.plan !== 'PRO') {
      throw new BadRequestException('El establecimiento debe tener plan Pro activo');
    }
    if (acceso.empresa.organizaciones.length >= acceso.empresa.limiteEstablecimientos) {
      throw new BadRequestException('Alcanzaste el límite de establecimientos de esta empresa');
    }

    try {
      return await this.prisma.empresaOrganizacion.create({
        data: { empresaId, organizacionId: organizacion.id },
      });
    } catch {
      throw new BadRequestException('Este establecimiento ya pertenece a una empresa');
    }
  }

  async desvincularOrganizacion(usuarioId: number, empresaId: number, organizacionId: number) {
    await this.empresaAccessService.requerirGestion(usuarioId, empresaId);
    const vinculo = await this.prisma.empresaOrganizacion.findFirst({
      where: { empresaId, organizacionId },
      select: { id: true },
    });
    if (!vinculo) throw new NotFoundException('Establecimiento no vinculado a la empresa');

    await this.prisma.empresaOrganizacion.delete({ where: { id: vinculo.id } });
    return { ok: true };
  }

  async listarMiembros(usuarioId: number, empresaId: number) {
    await this.empresaAccessService.requerirGestion(usuarioId, empresaId);
    const miembros = await this.prisma.usuarioEmpresa.findMany({
      where: { empresaId },
      include: {
        usuario: { select: { id: true, nombre: true, apellido: true, email: true } },
        organizacionesAutorizadas: { include: { organizacion: { select: { id: true, nombre: true } } } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return miembros.map((miembro) => ({
      id: miembro.id,
      usuario: miembro.usuario,
      rol: miembro.rol,
      activo: miembro.activo,
      accesoTodasOrganizaciones: miembro.accesoTodasOrganizaciones,
      organizaciones: miembro.organizacionesAutorizadas.map((vinculo) => vinculo.organizacion),
    }));
  }

  async listarMiembrosConsolidados(usuarioId: number, empresaId: number) {
    const acceso = await this.empresaAccessService.requerirGestion(usuarioId, empresaId);
    const miembros = await this.prisma.usuarioOrganizacion.findMany({
      where: { organizacionId: { in: acceso.organizacionesIds }, activo: true },
      select: {
        id: true,
        usuarioId: true,
        roles: true,
        usuario: { select: { id: true, nombre: true, apellido: true, email: true } },
        organizacion: { select: { id: true, nombre: true } },
      },
      orderBy: { usuario: { nombre: 'asc' } },
    });
    const trabajosPorMiembro = await this.prisma.actividadMiembro.groupBy({
      by: ['usuarioOrganizacionId'],
      where: {
        usuarioOrganizacionId: { in: miembros.map((miembro) => miembro.id) },
        activo: true,
        estado: { in: ESTADOS_ACTIVOS },
      },
      _count: true,
    });
    const trabajosActivos = new Map(
      trabajosPorMiembro.map((trabajo) => [trabajo.usuarioOrganizacionId, trabajo._count]),
    );
    const consolidados = new Map<
      number,
      {
        usuario: (typeof miembros)[number]['usuario'];
        establecimientos: Array<{ id: number; nombre: string; roles: string }>;
        trabajosActivos: number;
      }
    >();

    for (const miembro of miembros) {
      const existente = consolidados.get(miembro.usuarioId);
      const establecimiento = { ...miembro.organizacion, roles: miembro.roles };
      if (existente) {
        existente.establecimientos.push(establecimiento);
        existente.trabajosActivos += trabajosActivos.get(miembro.id) ?? 0;
      } else {
        consolidados.set(miembro.usuarioId, {
          usuario: miembro.usuario,
          establecimientos: [establecimiento],
          trabajosActivos: trabajosActivos.get(miembro.id) ?? 0,
        });
      }
    }

    return [...consolidados.values()];
  }

  async listarActividadesConsolidadas(
    usuarioId: number,
    empresaId: number,
    filtros: { organizacionId?: number; estado?: string; limite?: number },
  ) {
    const acceso = await this.empresaAccessService.requerirConsultaOperativa(usuarioId, empresaId);
    const organizacionIds = this.organizacionesFiltradas(acceso.organizacionesIds, filtros.organizacionId);
    const estado = this.estadoActividadValido(filtros.estado);

    return this.prisma.actividadMiembro.findMany({
      where: {
        organizacionId: { in: organizacionIds },
        ...(estado ? { estado } : {}),
      },
      select: {
        id: true,
        titulo: true,
        descripcion: true,
        recursoTipo: true,
        recursoId: true,
        contexto: true,
        fechaInicio: true,
        fechaEstimadaFin: true,
        fechaRealFin: true,
        estado: true,
        prioridad: true,
        activo: true,
        organizacion: { select: { id: true, nombre: true } },
        usuarioOrganizacion: {
          select: { usuario: { select: { id: true, nombre: true, apellido: true } } },
        },
      },
      orderBy: [{ fechaEstimadaFin: 'asc' }, { id: 'desc' }],
      take: this.normalizarLimite(filtros.limite),
    });
  }

  async listarMaquinariasConsolidadas(
    usuarioId: number,
    empresaId: number,
    filtros: { organizacionId?: number; estado?: string; limite?: number },
  ) {
    const acceso = await this.empresaAccessService.requerirConsultaOperativa(usuarioId, empresaId);
    const organizacionIds = this.organizacionesFiltradas(acceso.organizacionesIds, filtros.organizacionId);
    const estado = this.estadoMaquinariaValido(filtros.estado);

    return this.prisma.maquinaria.findMany({
      where: {
        organizacionId: { in: organizacionIds },
        ...(estado ? { estado } : {}),
      },
      select: {
        id: true,
        nombre: true,
        tipo: true,
        marca: true,
        modelo: true,
        patente: true,
        estado: true,
        horasUso: true,
        organizacion: { select: { id: true, nombre: true } },
        campo: { select: { id: true, nombre: true } },
      },
      orderBy: { nombre: 'asc' },
      take: this.normalizarLimite(filtros.limite),
    });
  }

  async listarGanaderiaConsolidada(
    usuarioId: number,
    empresaId: number,
    filtros: { organizacionId?: number; especie?: string; limite?: number },
  ) {
    const acceso = await this.empresaAccessService.requerirConsultaOperativa(usuarioId, empresaId);
    const organizacionIds = this.organizacionesFiltradas(acceso.organizacionesIds, filtros.organizacionId);
    const especie = this.especieValida(filtros.especie);
    const where = {
      organizacionId: { in: organizacionIds },
      ...(especie ? { especie } : {}),
    };
    const [total, animales] = await Promise.all([
      this.prisma.animal.count({ where }),
      this.prisma.animal.findMany({
        where,
        select: {
          id: true,
          nombre: true,
          especie: true,
          sexo: true,
          categoria: true,
          peso: true,
          fechaNacimiento: true,
          organizacion: { select: { id: true, nombre: true } },
        },
        orderBy: { nombre: 'asc' },
        take: this.normalizarLimite(filtros.limite),
      }),
    ]);
    return { total, animales };
  }

  async obtenerFinanzasConsolidadas(
    usuarioId: number,
    empresaId: number,
    filtros: { organizacionId?: number },
  ) {
    const acceso = await this.empresaAccessService.requerirConsultaFinanciera(usuarioId, empresaId);
    const organizacionIds = this.organizacionesFiltradas(acceso.organizacionesIds, filtros.organizacionId);
    const [organizaciones, movimientos] = await Promise.all([
      this.prisma.organizacion.findMany({
        where: { id: { in: organizacionIds } },
        select: { id: true, nombre: true },
        orderBy: { nombre: 'asc' },
      }),
      this.prisma.movimientoFinanciero.findMany({
        where: { organizacionId: { in: organizacionIds } },
        select: {
          id: true,
          tipo: true,
          concepto: true,
          monto: true,
          fecha: true,
          categoria: true,
          organizacionId: true,
          organizacion: { select: { id: true, nombre: true } },
        },
        orderBy: [{ fecha: 'desc' }, { id: 'desc' }],
      }),
    ]);
    const resumen = this.resumirMovimientos(movimientos);
    const egresosPorCategoria = this.agruparEgresosPorCategoria(movimientos);
    const evolucionMensual = this.agruparMovimientosPorMes(movimientos);

    return {
      resumen,
      porEstablecimiento: organizaciones.map((organizacion) => ({
        ...organizacion,
        ...this.resumirMovimientos(
          movimientos.filter((movimiento) => movimiento.organizacionId === organizacion.id),
        ),
      })),
      egresosPorCategoria,
      evolucionMensual,
      movimientos: movimientos.slice(0, 20),
    };
  }

  async obtenerRentabilidadConsolidada(
    usuarioId: number,
    empresaId: number,
    filtros: { organizacionId?: number },
  ) {
    const acceso = await this.empresaAccessService.requerirConsultaFinanciera(usuarioId, empresaId);
    const organizacionIds = this.organizacionesFiltradas(acceso.organizacionesIds, filtros.organizacionId);
    const [organizaciones, movimientos, siembras, campanias] = await Promise.all([
      this.prisma.organizacion.findMany({
        where: { id: { in: organizacionIds } },
        select: { id: true, nombre: true },
        orderBy: { nombre: 'asc' },
      }),
      this.prisma.movimientoFinanciero.findMany({
        where: { organizacionId: { in: organizacionIds } },
        select: { tipo: true, monto: true, fecha: true, organizacionId: true },
      }),
      this.prisma.siembra.findMany({
        where: { lote: { campo: { organizacionId: { in: organizacionIds } } } },
        select: {
          estado: true,
          lote: { select: { campo: { select: { organizacionId: true } } } },
          cosechas: { select: { totalKg: true } },
        },
      }),
      this.prisma.campania.findMany({
        where: { organizacionId: { in: organizacionIds } },
        select: {
          id: true,
          nombre: true,
          fechaInicio: true,
          fechaFin: true,
          organizacionId: true,
          organizacion: { select: { id: true, nombre: true } },
          siembras: { select: { cosechas: { select: { totalKg: true } } } },
        },
        orderBy: { fechaInicio: 'desc' },
      }),
    ]);
    const resumen = this.resumirMovimientos(movimientos);
    const produccionKg = this.totalProduccion(siembras);
    const ahora = new Date();
    const campaniasResumen = campanias.map((campania) => {
      const hasta = campania.fechaFin ?? ahora;
      const movimientosCampania = movimientos.filter(
        (movimiento) =>
          movimiento.organizacionId === campania.organizacionId &&
          movimiento.fecha >= campania.fechaInicio &&
          movimiento.fecha <= hasta,
      );
      const finanzas = this.resumirMovimientos(movimientosCampania);
      const totalKg = campania.siembras.reduce(
        (total, siembra) => total + siembra.cosechas.reduce((suma, cosecha) => suma + cosecha.totalKg, 0),
        0,
      );
      return {
        id: campania.id,
        nombre: campania.nombre,
        fechaInicio: campania.fechaInicio,
        fechaFin: campania.fechaFin,
        organizacion: campania.organizacion,
        siembras: campania.siembras.length,
        produccionKg: totalKg,
        ...finanzas,
        rentabilidad: this.calcularRentabilidad(finanzas.ingresos, finanzas.saldo),
      };
    });

    return {
      resumen: {
        ...resumen,
        produccionKg,
        rentabilidad: this.calcularRentabilidad(resumen.ingresos, resumen.saldo),
      },
      porEstablecimiento: organizaciones.map((organizacion) => {
        const finanzas = this.resumirMovimientos(
          movimientos.filter((movimiento) => movimiento.organizacionId === organizacion.id),
        );
        const produccion = this.totalProduccion(
          siembras.filter((siembra) => siembra.lote.campo.organizacionId === organizacion.id),
        );
        return {
          ...organizacion,
          ...finanzas,
          produccionKg: produccion,
          rentabilidad: this.calcularRentabilidad(finanzas.ingresos, finanzas.saldo),
        };
      }),
      campanias: campaniasResumen,
    };
  }

  async obtenerAuditoriaConsolidada(
    usuarioId: number,
    empresaId: number,
    filtros: {
      organizacionId?: number;
      accion?: string;
      usuarioId?: number;
      limite?: number;
      offset?: number;
    },
  ) {
    const acceso = await this.empresaAccessService.requerirGestion(usuarioId, empresaId);
    const organizacionIds = this.organizacionesFiltradas(acceso.organizacionesIds, filtros.organizacionId);
    const where = {
      organizacionId: { in: organizacionIds },
      ...(filtros.accion ? { accion: { contains: filtros.accion, mode: 'insensitive' as const } } : {}),
      ...(filtros.usuarioId ? { usuarioId: filtros.usuarioId } : {}),
    };
    const limite = this.normalizarLimite(filtros.limite);
    const offset = this.normalizarOffset(filtros.offset);
    const [registros, total] = await Promise.all([
      this.prisma.auditoriaLog.findMany({
        where,
        select: {
          id: true,
          usuarioId: true,
          organizacionId: true,
          accion: true,
          entidad: true,
          entidadId: true,
          cambios: true,
          ipAddress: true,
          userAgent: true,
          createdAt: true,
          usuario: { select: { id: true, nombre: true, apellido: true, email: true } },
          organizacion: { select: { id: true, nombre: true } },
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        take: limite,
        skip: offset,
      }),
      this.prisma.auditoriaLog.count({ where }),
    ]);

    return { registros, total, limite, offset };
  }

  async crearMiembro(usuarioId: number, empresaId: number, dto: CrearMiembroEmpresaDto) {
    await this.empresaAccessService.requerirGestion(usuarioId, empresaId);
    await this.validarOrganizacionesAutorizadas(
      empresaId,
      dto.organizacionesIds ?? [],
      dto.accesoTodasOrganizaciones ?? dto.rol === RolEmpresa.GERENTE_GENERAL,
    );

    const usuario = await this.prisma.usuario.findUnique({
      where: { id: dto.usuarioId },
      select: { id: true },
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const accesoTodas =
      dto.rol === RolEmpresa.GERENTE_GENERAL ||
      dto.accesoTodasOrganizaciones === true;
    return this.prisma.usuarioEmpresa.create({
      data: {
        empresaId,
        usuarioId: usuario.id,
        rol: dto.rol,
        accesoTodasOrganizaciones: accesoTodas,
        organizacionesAutorizadas: accesoTodas
          ? undefined
          : { create: (dto.organizacionesIds ?? []).map((organizacionId) => ({ organizacionId })) },
      },
    });
  }

  async actualizarMiembro(
    usuarioId: number,
    empresaId: number,
    miembroId: number,
    dto: ActualizarMiembroEmpresaDto,
  ) {
    await this.empresaAccessService.requerirGestion(usuarioId, empresaId);
    const miembro = await this.prisma.usuarioEmpresa.findFirst({
      where: { id: miembroId, empresaId },
      select: { id: true, rol: true, accesoTodasOrganizaciones: true },
    });
    if (!miembro) throw new NotFoundException('Miembro empresarial no encontrado');

    const rol = dto.rol ?? miembro.rol;
    const accesoTodas =
      rol === RolEmpresa.GERENTE_GENERAL
        ? true
        : dto.accesoTodasOrganizaciones ??
          (dto.organizacionesIds ? false : miembro.accesoTodasOrganizaciones);
    if (dto.organizacionesIds) {
      await this.validarOrganizacionesAutorizadas(empresaId, dto.organizacionesIds, accesoTodas);
    }

    return this.prisma.$transaction(async (tx) => {
      const actualizado = await tx.usuarioEmpresa.update({
        where: { id: miembro.id },
        data: {
          rol: dto.rol,
          activo: dto.activo,
          accesoTodasOrganizaciones: accesoTodas,
        },
      });
      if (dto.organizacionesIds) {
        await tx.usuarioEmpresaOrganizacion.deleteMany({ where: { usuarioEmpresaId: miembro.id } });
        if (!accesoTodas) {
          await tx.usuarioEmpresaOrganizacion.createMany({
            data: dto.organizacionesIds.map((organizacionId) => ({
              usuarioEmpresaId: miembro.id,
              organizacionId,
            })),
          });
        }
      }
      return actualizado;
    });
  }

  private resumirMovimientos(
    movimientos: Array<{ tipo: string; monto: number }>,
  ) {
    const ingresos = movimientos
      .filter((movimiento) => movimiento.tipo === 'INGRESO')
      .reduce((total, movimiento) => total + movimiento.monto, 0);
    const egresos = movimientos
      .filter((movimiento) => movimiento.tipo === 'EGRESO')
      .reduce((total, movimiento) => total + movimiento.monto, 0);
    return { ingresos, egresos, saldo: ingresos - egresos, movimientos: movimientos.length };
  }

  private agruparEgresosPorCategoria(
    movimientos: Array<{ tipo: string; categoria: string; monto: number }>,
  ) {
    const categorias = new Map<string, number>();
    for (const movimiento of movimientos) {
      if (movimiento.tipo !== 'EGRESO') continue;
      categorias.set(
        movimiento.categoria,
        (categorias.get(movimiento.categoria) ?? 0) + movimiento.monto,
      );
    }
    return [...categorias.entries()]
      .map(([categoria, monto]) => ({ categoria, monto }))
      .sort((primero, segundo) => segundo.monto - primero.monto);
  }

  private agruparMovimientosPorMes(
    movimientos: Array<{ tipo: string; monto: number; fecha: Date }>,
  ) {
    const meses = new Map<string, { ingresos: number; egresos: number }>();
    for (const movimiento of movimientos) {
      const periodo = `${movimiento.fecha.getUTCFullYear()}-${String(movimiento.fecha.getUTCMonth() + 1).padStart(2, '0')}`;
      const actual = meses.get(periodo) ?? { ingresos: 0, egresos: 0 };
      if (movimiento.tipo === 'INGRESO') actual.ingresos += movimiento.monto;
      if (movimiento.tipo === 'EGRESO') actual.egresos += movimiento.monto;
      meses.set(periodo, actual);
    }
    return [...meses.entries()]
      .map(([periodo, valores]) => ({
        periodo,
        ...valores,
        saldo: valores.ingresos - valores.egresos,
      }))
      .sort((primero, segundo) => primero.periodo.localeCompare(segundo.periodo));
  }

  private totalProduccion(
    siembras: Array<{ cosechas: Array<{ totalKg: number }> }>,
  ) {
    return siembras.reduce(
      (total, siembra) => total + siembra.cosechas.reduce((suma, cosecha) => suma + cosecha.totalKg, 0),
      0,
    );
  }

  private calcularRentabilidad(ingresos: number, saldo: number) {
    return ingresos > 0 ? Math.round((saldo / ingresos) * 100) : 0;
  }

  private organizacionesFiltradas(organizacionesIds: number[], organizacionId?: number) {
    if (!organizacionId) return organizacionesIds;
    if (!organizacionesIds.includes(organizacionId)) {
      throw new ForbiddenException('No tenés acceso a este establecimiento dentro de la empresa');
    }
    return [organizacionId];
  }

  private normalizarLimite(limite?: number) {
    if (!limite || !Number.isFinite(limite)) return 100;
    return Math.min(Math.max(Math.trunc(limite), 1), 250);
  }

  private normalizarOffset(offset?: number) {
    if (!offset || !Number.isFinite(offset)) return 0;
    return Math.max(Math.trunc(offset), 0);
  }

  private estadoActividadValido(estado?: string) {
    if (!estado) return undefined;
    if (!Object.values(EstadoActividad).includes(estado as EstadoActividad)) {
      throw new BadRequestException('Estado de actividad inválido');
    }
    return estado as EstadoActividad;
  }

  private estadoMaquinariaValido(estado?: string) {
    if (!estado) return undefined;
    if (!Object.values(EstadoMaquinaria).includes(estado as EstadoMaquinaria)) {
      throw new BadRequestException('Estado de maquinaria inválido');
    }
    return estado as EstadoMaquinaria;
  }

  private especieValida(especie?: string) {
    if (!especie) return undefined;
    if (!Object.values(Especie).includes(especie as Especie)) {
      throw new BadRequestException('Especie inválida');
    }
    return especie as Especie;
  }

  private async requerirSuperAdmin(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { rolGlobal: true },
    });
    if (usuario?.rolGlobal !== 'SUPERADMIN') {
      throw new ForbiddenException('Solo SUPERADMIN puede dar de alta una empresa');
    }
  }

  private validarEmpresaActivaParaEstablecimientos(empresa: {
    activo: boolean;
    estadoComercial: EstadoEmpresa;
  }) {
    if (!empresa.activo || empresa.estadoComercial !== EstadoEmpresa.ACTIVA) {
      throw new BadRequestException(
        'La empresa debe estar activa antes de habilitar establecimientos',
      );
    }
  }

  private validarCupoEstablecimientos(empresa: {
    organizaciones: { id: number }[];
    limiteEstablecimientos: number;
  }) {
    if (empresa.organizaciones.length >= empresa.limiteEstablecimientos) {
      throw new BadRequestException('Alcanzaste el límite de establecimientos de esta empresa');
    }
  }

  private async validarOrganizacionesAutorizadas(
    empresaId: number,
    organizacionesIds: number[],
    accesoTodas: boolean,
  ) {
    if (accesoTodas || organizacionesIds.length === 0) return;
    const cantidad = await this.prisma.empresaOrganizacion.count({
      where: { empresaId, organizacionId: { in: organizacionesIds } },
    });
    if (cantidad !== new Set(organizacionesIds).size) {
      throw new BadRequestException('Hay establecimientos fuera de esta empresa');
    }
  }
}
