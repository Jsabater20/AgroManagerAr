import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { CamposService } from '../campos/campos.service';
import { ConfirmarCrearCampoAgroBotDto } from './dto/confirmar-crear-campo.dto';
import { ActividadesService } from '../actividades/actividades.service';
import { EstadoActividad, EstadoTarea, Prioridad, TipoRecursoActividad } from '@prisma/client';
import { ConfirmarCrearTrabajoAgroBotDto } from './dto/confirmar-crear-trabajo.dto';
import { ConfirmarCompletarTareaAgroBotDto } from './dto/confirmar-completar-tarea.dto';
import { TareasService } from '../tareas/tareas.service';
import type { ChatMessageDto } from './dto/ai.dto';
import { MaquinariasService } from '../maquinarias/maquinarias.service';
import { SiembrasService } from '../siembras/siembras.service';
import { TipoMaquinaria } from '../maquinarias/dto/maquinarias.dto';
import { ConfirmarCrearMaquinariaAgroBotDto } from './dto/confirmar-crear-maquinaria.dto';
import { ConfirmarCrearSiembraAgroBotDto } from './dto/confirmar-crear-siembra.dto';

export type CampoContextoAgroBot = {
  id: number;
  nombre: string;
  hectareas: number;
  lotes: Array<{
    id: number;
    nombre: string;
    hectareas: number;
  }>;
};

export type ContextoAccionesAgroBot = {
  organizacion: {
    id: number;
    nombre: string;
    plan: string;
    actividadPrincipal: string | null;
    actividades: string[];
  };
  permisos: {
    puedeGestionarCampos: boolean;
    esOwner: boolean;
  };
  campos: CampoContextoAgroBot[];
};

export type LotePropuestoAgroBot = {
  nombre: string | null;
  hectareas: number | null;
};

export type PropuestaCrearCampoAgroBot = {
  tipo: 'CREAR_CAMPO_CON_LOTES';
  estado: 'LISTA_PARA_CONFIRMAR' | 'FALTAN_DATOS' | 'REQUIERE_REVISION' | 'SIN_PERMISO';
  sePuedeConfirmar: boolean;
  titulo: string;
  campo: {
    nombre: string | null;
    hectareas: number | null;
    actividadesDetectadas: string[];
  };
  lotes: LotePropuestoAgroBot[];
  faltantes: string[];
  advertencias: string[];
  lectura: {
    organizacionNombre: string;
    camposVisibles: number;
    coincidencias: string[];
  };
};

export type PropuestaCrearTrabajoAgroBot = {
  tipo: 'CREAR_TRABAJO';
  estado: 'LISTA_PARA_CONFIRMAR' | 'FALTAN_DATOS' | 'SIN_PERMISO';
  sePuedeConfirmar: boolean;
  titulo: string;
  trabajo: {
    titulo: string | null;
    responsable: { id: number; nombre: string } | null;
    campo: { id: number; nombre: string } | null;
    fechaInicio: string | null;
    prioridad: Prioridad;
  };
  faltantes: string[];
  lectura: { organizacionNombre: string; miembrosDisponibles: number };
};

export type PropuestaCrearMaquinariaAgroBot = {
  tipo: 'CREAR_MAQUINARIA';
  estado: 'LISTA_PARA_CONFIRMAR' | 'FALTAN_DATOS' | 'SIN_PERMISO';
  sePuedeConfirmar: boolean;
  titulo: string;
  maquinaria: {
    nombre: string | null;
    tipo: TipoMaquinaria | null;
  };
  faltantes: string[];
  lectura: { organizacionNombre: string };
};

export type PropuestaCrearSiembraAgroBot = {
  tipo: 'CREAR_SIEMBRA';
  estado: 'LISTA_PARA_CONFIRMAR' | 'FALTAN_DATOS' | 'SIN_PERMISO';
  sePuedeConfirmar: boolean;
  titulo: string;
  siembra: {
    lote: { id: number; nombre: string; campoNombre: string } | null;
    cultivo: { id: number; nombre: string } | null;
    fechaSiembra: string | null;
  };
  faltantes: string[];
  lectura: { organizacionNombre: string; lotesDisponibles: number };
};

export type PropuestaCompletarTareaAgroBot = {
  tipo: 'COMPLETAR_TAREA';
  estado: 'LISTA_PARA_CONFIRMAR' | 'FALTAN_DATOS' | 'NO_ENCONTRADA' | 'REQUIERE_PRECISION' | 'SIN_PERMISO';
  sePuedeConfirmar: boolean;
  titulo: string;
  tarea: {
    id: number;
    titulo: string;
    origen: 'TAREA_RURAL' | 'TRABAJO_EQUIPO';
    estado: string;
  } | null;
  faltantes: string[];
  coincidencias: string[];
  lectura: { organizacionNombre: string };
};

export type PropuestaAccionAgroBot =
  | PropuestaCrearCampoAgroBot
  | PropuestaCrearTrabajoAgroBot
  | PropuestaCrearMaquinariaAgroBot
  | PropuestaCrearSiembraAgroBot
  | PropuestaCompletarTareaAgroBot;

const PALABRAS_CANTIDAD: Record<string, number> = {
  un: 1,
  uno: 1,
  una: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
  siete: 7,
  ocho: 8,
  nueve: 9,
  diez: 10,
};

/**
 * Prepara un contexto reducido y autorizado para futuras acciones de AgroBot.
 * Esta clase es estrictamente de lectura: no crea, edita ni elimina registros.
 */
@Injectable()
export class AgroBotAccionesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberAccessService: MemberAccessService,
    private readonly camposService: CamposService,
    private readonly actividadesService: ActividadesService,
    private readonly tareasService: TareasService,
    private readonly maquinariasService: MaquinariasService,
    private readonly siembrasService: SiembrasService,
  ) {}

  async obtenerContextoCampos(
    usuarioId: number,
    organizacionId: number,
  ): Promise<ContextoAccionesAgroBot> {
    const [organizacion, accesoCampos] = await Promise.all([
      this.prisma.organizacion.findUniqueOrThrow({
        where: { id: organizacionId },
        select: {
          id: true,
          nombre: true,
          plan: true,
          actividadPrincipal: true,
          actividadesProductivas: {
            where: { activo: true },
            select: { tipoActividad: true },
          },
        },
      }),
      this.memberAccessService
        .requireModule(usuarioId, organizacionId, 'Campos')
        .catch(() => null),
    ]);

    const datosOrganizacion = {
      id: organizacion.id,
      nombre: organizacion.nombre,
      plan: organizacion.plan,
      actividadPrincipal: organizacion.actividadPrincipal,
      actividades: organizacion.actividadesProductivas.map(
        (actividad) => actividad.tipoActividad,
      ),
    };

    if (!accesoCampos) {
      return {
        organizacion: datosOrganizacion,
        permisos: { puedeGestionarCampos: false, esOwner: false },
        campos: [],
      };
    }

    const campos = await this.prisma.campo.findMany({
      where: {
        organizacionId,
        ...(accesoCampos.esOwner
          ? {}
          : {
              AsignacionCampo: {
                some: {
                  usuarioOrganizacionId: accesoCampos.usuarioOrganizacionId,
                  activo: true,
                },
              },
            }),
      },
      select: {
        id: true,
        nombre: true,
        hectareas: true,
        lotes: {
          select: { id: true, nombre: true, hectareas: true },
          orderBy: { nombre: 'asc' },
        },
      },
      orderBy: { nombre: 'asc' },
    });

    return {
      organizacion: datosOrganizacion,
      permisos: {
        puedeGestionarCampos: true,
        esOwner: accesoCampos.esOwner,
      },
      campos,
    };
  }

  async prepararCreacionCampo(
    usuarioId: number,
    organizacionId: number,
    mensaje: string,
    historial: ChatMessageDto[] = [],
  ): Promise<PropuestaCrearCampoAgroBot | null> {
    const solicitud = this.obtenerSolicitudCampo(historial, mensaje);
    if (!solicitud) {
      return null;
    }

    const contexto = await this.obtenerContextoCampos(usuarioId, organizacionId);
    const { campo, indiceHectareas } = this.extraerCampoDeSolicitud(solicitud);
    const lotes = this.extraerLotesDeSolicitud(solicitud, indiceHectareas);
    const mensajeCompleto = solicitud.join('\n');
    const faltantes: string[] = [];
    const advertencias: string[] = [];

    if (!contexto.permisos.puedeGestionarCampos) {
      return {
        tipo: 'CREAR_CAMPO_CON_LOTES',
        estado: 'SIN_PERMISO',
        sePuedeConfirmar: false,
        titulo: 'No tenes acceso para gestionar campos',
        campo: {
          ...campo,
          actividadesDetectadas: this.extraerActividades(mensajeCompleto),
        },
        lotes,
        faltantes: [],
        advertencias: [
          'El owner debe habilitarte el módulo Campos para que puedas preparar esta acción.',
        ],
        lectura: {
          organizacionNombre: contexto.organizacion.nombre,
          camposVisibles: 0,
          coincidencias: [],
        },
      };
    }

    if (!campo.nombre) {
      faltantes.push('el nombre del campo');
    }
    if (!campo.hectareas) {
      faltantes.push('las hectáreas totales del campo');
    }

    const cantidadLotesSolicitada = this.extraerCantidadLotesSolicitada(mensajeCompleto);
    if (!lotes.length) {
      faltantes.push('al menos un lote con su nombre y hectáreas');
    }
    if (cantidadLotesSolicitada && lotes.length < cantidadLotesSolicitada) {
      const restantes = cantidadLotesSolicitada - lotes.length;
      faltantes.push(
        `el nombre de ${restantes} lote${restantes === 1 ? '' : 's'} solicitado${restantes === 1 ? '' : 's'}`,
      );
    }
    if (cantidadLotesSolicitada && lotes.length === 0) {
      faltantes.push('los nombres de los lotes');
    }

    lotes.forEach((lote, indice) => {
      if (!lote.nombre) {
        faltantes.push(`el nombre del lote ${indice + 1}`);
      }
      if (!lote.hectareas) {
        faltantes.push(`las hectáreas del lote ${lote.nombre ?? indice + 1}`);
      }
    });

    const coincidencias = campo.nombre
      ? contexto.campos
          .filter((campoExistente) =>
            this.normalizar(campoExistente.nombre) === this.normalizar(campo.nombre!),
          )
          .map((campoExistente) => campoExistente.nombre)
      : [];

    if (coincidencias.length) {
      advertencias.push(
        `Ya existe un campo visible llamado ${coincidencias.join(', ')}. Elegí otro nombre o revisá si querés actualizar el existente.`,
      );
    }

    const totalLotes = lotes.reduce(
      (total, lote) => total + (lote.hectareas ?? 0),
      0,
    );
    if (campo.hectareas && lotes.length && lotes.every((lote) => lote.hectareas)) {
      if (Math.abs(totalLotes - campo.hectareas) > 0.01) {
        advertencias.push(
          `Los lotes suman ${totalLotes} ha y el campo ${campo.hectareas} ha. Revisá las superficies antes de confirmar.`,
        );
      }
    }

    const actividadesDetectadas = this.extraerActividades(mensajeCompleto);
    if (!actividadesDetectadas.length) {
      faltantes.push('la actividad del campo: agricultura, ganadería o mixta');
    }
    if (actividadesDetectadas.length) {
      advertencias.push(
        `Se reconoció actividad ${actividadesDetectadas.join(' y ').toLocaleLowerCase('es-AR')}. El campo se creará con sus datos básicos; la actividad productiva se manejará desde la configuración correspondiente.`,
      );
    }

    const requiereRevision = coincidencias.length > 0 || (
      campo.hectareas !== null &&
      lotes.length > 0 &&
      lotes.every((lote) => lote.hectareas !== null) &&
      Math.abs(totalLotes - campo.hectareas) > 0.01
    );
    const estado = !faltantes.length && !requiereRevision
      ? 'LISTA_PARA_CONFIRMAR'
      : requiereRevision
        ? 'REQUIERE_REVISION'
        : 'FALTAN_DATOS';

    return {
      tipo: 'CREAR_CAMPO_CON_LOTES',
      estado,
      sePuedeConfirmar: estado === 'LISTA_PARA_CONFIRMAR',
      titulo: campo.nombre
        ? `Crear campo ${campo.nombre}`
        : 'Crear un nuevo campo',
      campo: { ...campo, actividadesDetectadas },
      lotes,
      faltantes: [...new Set(faltantes)],
      advertencias,
      lectura: {
        organizacionNombre: contexto.organizacion.nombre,
        camposVisibles: contexto.campos.length,
        coincidencias,
      },
    };
  }

  async confirmarCreacionCampo(
    usuarioId: number,
    organizacionId: number,
    dto: ConfirmarCrearCampoAgroBotDto,
  ) {
    return this.camposService.createConLotes(
      {
        nombre: dto.campo.nombre,
        hectareas: dto.campo.hectareas,
        actividades: dto.actividades,
      },
      dto.lotes,
      usuarioId,
      organizacionId,
      dto.idempotencyKey,
    );
  }

  async prepararCreacionTrabajo(
    usuarioId: number,
    organizacionId: number,
    mensaje: string,
  ): Promise<PropuestaCrearTrabajoAgroBot | null> {
    if (!this.esPedidoDeCrearTrabajo(mensaje)) return null;

    const acceso = await this.memberAccessService
      .requireModule(usuarioId, organizacionId, 'Tareas')
      .catch(() => null);
    const organizacion = await this.prisma.organizacion.findUniqueOrThrow({
      where: { id: organizacionId },
      select: { nombre: true },
    });

    if (!acceso?.esOwner) {
      return {
        tipo: 'CREAR_TRABAJO', estado: 'SIN_PERMISO', sePuedeConfirmar: false,
        titulo: 'No tenes permiso para asignar trabajos',
        trabajo: { titulo: null, responsable: null, campo: null, fechaInicio: null, prioridad: Prioridad.MEDIA },
        faltantes: [],
        lectura: { organizacionNombre: organizacion.nombre, miembrosDisponibles: 0 },
      };
    }

    const [miembros, contextoCampos] = await Promise.all([
      this.prisma.usuarioOrganizacion.findMany({
        where: { organizacionId, activo: true },
        select: { id: true, usuario: { select: { nombre: true, apellido: true } } },
        orderBy: { usuario: { nombre: 'asc' } },
      }),
      this.obtenerContextoCampos(usuarioId, organizacionId),
    ]);
    const personas = miembros.map((miembro) => ({
      id: miembro.id,
      nombre: [miembro.usuario.nombre, miembro.usuario.apellido].filter(Boolean).join(' ').trim(),
    }));
    const consulta = this.normalizar(mensaje);
    const responsable = personas
      .sort((a, b) => b.nombre.length - a.nombre.length)
      .find((persona) => this.normalizar(persona.nombre) && consulta.includes(this.normalizar(persona.nombre))) ?? null;
    const campo = contextoCampos.campos
      .sort((a, b) => b.nombre.length - a.nombre.length)
      .find((item) => consulta.includes(this.normalizar(item.nombre))) ?? null;
    const fechaInicio = this.extraerFechaTrabajo(consulta);
    const titulo = this.extraerTituloTrabajo(mensaje, responsable?.nombre, campo?.nombre);
    const faltantes = [
      ...(titulo ? [] : ['qué trabajo hay que realizar']),
      ...(responsable ? [] : ['a qué miembro se le asigna']),
      ...(fechaInicio ? [] : ['la fecha de inicio (por ejemplo, hoy, mañana o 25/11/2026)']),
    ];

    return {
      tipo: 'CREAR_TRABAJO',
      estado: faltantes.length ? 'FALTAN_DATOS' : 'LISTA_PARA_CONFIRMAR',
      sePuedeConfirmar: !faltantes.length,
      titulo: titulo ? `Asignar trabajo: ${titulo}` : 'Asignar un trabajo',
      trabajo: {
        titulo,
        responsable,
        campo: campo ? { id: campo.id, nombre: campo.nombre } : null,
        fechaInicio,
        prioridad: /\burgente\b/.test(consulta) ? Prioridad.URGENTE : /\balta\b/.test(consulta) ? Prioridad.ALTA : /\bbaja\b/.test(consulta) ? Prioridad.BAJA : Prioridad.MEDIA,
      },
      faltantes,
      lectura: { organizacionNombre: organizacion.nombre, miembrosDisponibles: personas.length },
    };
  }

  async confirmarCreacionTrabajo(
    usuarioId: number,
    organizacionId: number,
    dto: ConfirmarCrearTrabajoAgroBotDto,
  ) {
    return this.actividadesService.crear(organizacionId, {
      titulo: dto.titulo,
      usuarioOrganizacionId: dto.usuarioOrganizacionId,
      recursoTipo: dto.recursoTipo,
      ...(dto.recursoId ? { recursoId: dto.recursoId } : {}),
      fechaInicio: dto.fechaInicio,
      prioridad: dto.prioridad,
    }, usuarioId, undefined, dto.idempotencyKey);
  }

  async prepararCreacionMaquinaria(
    usuarioId: number,
    organizacionId: number,
    mensaje: string,
    historial: ChatMessageDto[] = [],
  ): Promise<PropuestaCrearMaquinariaAgroBot | null> {
    const solicitud = this.obtenerSolicitudDesdeHistorial(
      historial,
      mensaje,
      (texto) => this.esPedidoDeCrearMaquinaria(texto),
    );
    if (!solicitud) return null;
    const mensajeCompleto = solicitud.join('\n');

    const [acceso, organizacion] = await Promise.all([
      this.memberAccessService
        .requireModule(usuarioId, organizacionId, 'Maquinarias')
        .catch(() => null),
      this.prisma.organizacion.findUniqueOrThrow({
        where: { id: organizacionId },
        select: { nombre: true },
      }),
    ]);
    const lectura = { organizacionNombre: organizacion.nombre };
    if (!acceso) {
      return {
        tipo: 'CREAR_MAQUINARIA',
        estado: 'SIN_PERMISO',
        sePuedeConfirmar: false,
        titulo: 'No tenés acceso para registrar maquinarias',
        maquinaria: { nombre: null, tipo: null },
        faltantes: [],
        lectura,
      };
    }

    const tipo = this.extraerTipoMaquinaria(mensajeCompleto);
    const nombre = this.extraerNombreMaquinaria(mensajeCompleto, tipo);
    const faltantes = [
      ...(tipo ? [] : ['el tipo de maquinaria o vehículo']),
      ...(nombre ? [] : ['el nombre para identificarla']),
    ];

    return {
      tipo: 'CREAR_MAQUINARIA',
      estado: faltantes.length ? 'FALTAN_DATOS' : 'LISTA_PARA_CONFIRMAR',
      sePuedeConfirmar: !faltantes.length,
      titulo: nombre ? `Registrar ${nombre}` : 'Registrar maquinaria o vehículo',
      maquinaria: { nombre, tipo },
      faltantes,
      lectura,
    };
  }

  async confirmarCreacionMaquinaria(
    usuarioId: number,
    organizacionId: number,
    dto: ConfirmarCrearMaquinariaAgroBotDto,
  ) {
    return this.maquinariasService.create(usuarioId, organizacionId, dto);
  }

  async prepararCreacionSiembra(
    usuarioId: number,
    organizacionId: number,
    mensaje: string,
    historial: ChatMessageDto[] = [],
  ): Promise<PropuestaCrearSiembraAgroBot | null> {
    const solicitud = this.obtenerSolicitudDesdeHistorial(
      historial,
      mensaje,
      (texto) => this.esPedidoDeCrearSiembra(texto),
    );
    if (!solicitud) return null;
    const mensajeCompleto = solicitud.join('\n');

    const [acceso, organizacion, cultivos] = await Promise.all([
      this.memberAccessService
        .requireModule(usuarioId, organizacionId, 'Siembras')
        .catch(() => null),
      this.prisma.organizacion.findUniqueOrThrow({
        where: { id: organizacionId },
        select: { nombre: true },
      }),
      this.prisma.tipoCultivo.findMany({
        select: { id: true, nombre: true },
        orderBy: { nombre: 'asc' },
      }),
    ]);

    if (!acceso) {
      return {
        tipo: 'CREAR_SIEMBRA',
        estado: 'SIN_PERMISO',
        sePuedeConfirmar: false,
        titulo: 'No tenés acceso para registrar siembras',
        siembra: { lote: null, cultivo: null, fechaSiembra: null },
        faltantes: [],
        lectura: { organizacionNombre: organizacion.nombre, lotesDisponibles: 0 },
      };
    }

    const lotes = await this.obtenerLotesParaSiembra(
      organizacionId,
      acceso.esOwner,
      acceso.usuarioOrganizacionId,
    );
    const consulta = this.normalizar(mensajeCompleto);
    const lote = lotes
      .sort((a, b) => b.nombre.length - a.nombre.length)
      .find((item) => consulta.includes(this.normalizar(item.nombre))) ?? null;
    const cultivo = cultivos
      .sort((a, b) => b.nombre.length - a.nombre.length)
      .find((item) => consulta.includes(this.normalizar(item.nombre))) ?? null;
    const fechaSiembra = this.extraerFechaTrabajo(consulta);
    const faltantes = [
      ...(lote ? [] : ['el lote existente donde se realizará']),
      ...(cultivo ? [] : ['el cultivo a sembrar']),
      ...(fechaSiembra ? [] : ['la fecha de siembra (por ejemplo, hoy, mañana o 25/11/2026)']),
    ];

    return {
      tipo: 'CREAR_SIEMBRA',
      estado: faltantes.length ? 'FALTAN_DATOS' : 'LISTA_PARA_CONFIRMAR',
      sePuedeConfirmar: !faltantes.length,
      titulo: cultivo && lote ? `Registrar siembra de ${cultivo.nombre}` : 'Registrar una siembra',
      siembra: {
        lote: lote ? { id: lote.id, nombre: lote.nombre, campoNombre: lote.campo.nombre } : null,
        cultivo,
        fechaSiembra,
      },
      faltantes,
      lectura: { organizacionNombre: organizacion.nombre, lotesDisponibles: lotes.length },
    };
  }

  async confirmarCreacionSiembra(
    usuarioId: number,
    organizacionId: number,
    dto: ConfirmarCrearSiembraAgroBotDto,
  ) {
    return this.siembrasService.create(dto, usuarioId, organizacionId);
  }

  async prepararCompletarTarea(
    usuarioId: number,
    organizacionId: number,
    mensaje: string,
  ): Promise<PropuestaCompletarTareaAgroBot | null> {
    if (!this.esPedidoDeCompletarTarea(mensaje)) return null;

    const organizacion = await this.prisma.organizacion.findUniqueOrThrow({
      where: { id: organizacionId },
      select: { nombre: true },
    });
    const lectura = { organizacionNombre: organizacion.nombre };
    const acceso = await this.memberAccessService
      .requireModule(usuarioId, organizacionId, 'Tareas')
      .catch(() => null);

    if (!acceso) {
      return {
        tipo: 'COMPLETAR_TAREA',
        estado: 'SIN_PERMISO',
        sePuedeConfirmar: false,
        titulo: 'No tenés acceso para completar tareas',
        tarea: null,
        faltantes: [],
        coincidencias: [],
        lectura,
      };
    }

    const [tareas, trabajos] = await Promise.all([
      this.tareasService.findAll(usuarioId, organizacionId),
      this.actividadesService.listar(organizacionId, usuarioId, { activo: true }),
    ]);
    const candidatas = [
      ...tareas
        .filter((tarea) => tarea.estado !== EstadoTarea.COMPLETADA)
        .map((tarea) => ({
          id: tarea.id,
          titulo: tarea.titulo,
          origen: 'TAREA_RURAL' as const,
          estado: tarea.estado,
        })),
      ...trabajos
        .filter(
          (trabajo) =>
            trabajo.estado !== EstadoActividad.COMPLETADA &&
            trabajo.estado !== EstadoActividad.CANCELADA,
        )
        .map((trabajo) => ({
          id: trabajo.id,
          titulo: trabajo.titulo,
          origen: 'TRABAJO_EQUIPO' as const,
          estado: trabajo.estado,
        })),
    ];
    const nombreBuscado = this.extraerNombreTareaACompletar(mensaje);

    if (!nombreBuscado) {
      return {
        tipo: 'COMPLETAR_TAREA',
        estado: 'FALTAN_DATOS',
        sePuedeConfirmar: false,
        titulo: 'Indicame qué tarea querés completar',
        tarea: null,
        faltantes: ['el nombre de la tarea o trabajo'],
        coincidencias: [],
        lectura,
      };
    }

    const coincidencias = candidatas.filter((tarea) => {
      const titulo = this.normalizar(tarea.titulo);
      return titulo === nombreBuscado || titulo.includes(nombreBuscado) || nombreBuscado.includes(titulo);
    });
    const coincidenciaExacta = coincidencias.find(
      (tarea) => this.normalizar(tarea.titulo) === nombreBuscado,
    );
    const tarea = coincidenciaExacta ?? (coincidencias.length === 1 ? coincidencias[0] : null);

    if (!coincidencias.length) {
      return {
        tipo: 'COMPLETAR_TAREA',
        estado: 'NO_ENCONTRADA',
        sePuedeConfirmar: false,
        titulo: 'No encontré una tarea pendiente con ese nombre',
        tarea: null,
        faltantes: ['un nombre que coincida con una tarea pendiente'],
        coincidencias: [],
        lectura,
      };
    }

    if (!tarea) {
      return {
        tipo: 'COMPLETAR_TAREA',
        estado: 'REQUIERE_PRECISION',
        sePuedeConfirmar: false,
        titulo: 'Encontré más de una tarea similar',
        tarea: null,
        faltantes: ['el nombre exacto de la tarea que querés completar'],
        coincidencias: coincidencias.map((coincidencia) => coincidencia.titulo),
        lectura,
      };
    }

    return {
      tipo: 'COMPLETAR_TAREA',
      estado: 'LISTA_PARA_CONFIRMAR',
      sePuedeConfirmar: true,
      titulo: `Marcar como hecha: ${tarea.titulo}`,
      tarea,
      faltantes: [],
      coincidencias: [],
      lectura,
    };
  }

  async confirmarCompletarTarea(
    usuarioId: number,
    organizacionId: number,
    dto: ConfirmarCompletarTareaAgroBotDto,
  ) {
    if (dto.origen === 'TAREA_RURAL') {
      const tarea = await this.tareasService.findOne(dto.tareaId, usuarioId, organizacionId);
      const resultado = tarea.estado === EstadoTarea.COMPLETADA
        ? tarea
        : await this.tareasService.updateEstado(
            dto.tareaId,
            { estado: EstadoTarea.COMPLETADA },
            usuarioId,
            organizacionId,
          );
      return { id: resultado.id, titulo: resultado.titulo, origen: dto.origen };
    }

    const actividad = await this.actividadesService.obtener(
      organizacionId,
      dto.tareaId,
      usuarioId,
    );
    if (actividad.estado === EstadoActividad.CANCELADA) {
      throw new BadRequestException('No se puede completar un trabajo cancelado.');
    }
    if (actividad.estado === EstadoActividad.COMPLETADA) {
      return { id: actividad.id, titulo: actividad.titulo, origen: dto.origen };
    }

    if (
      actividad.estado === EstadoActividad.PENDIENTE ||
      actividad.estado === EstadoActividad.PAUSADA
    ) {
      await this.actividadesService.cambiarEstado(
        organizacionId,
        actividad.id,
        { estado: EstadoActividad.EN_PROGRESO },
        usuarioId,
      );
    }
    const resultado = await this.actividadesService.cambiarEstado(
      organizacionId,
      actividad.id,
      { estado: EstadoActividad.COMPLETADA },
      usuarioId,
    );
    return { id: resultado.id, titulo: resultado.titulo, origen: dto.origen };
  }

  aTextoParaPlanificacion(contexto: ContextoAccionesAgroBot): string {
    const campos = contexto.campos.length
      ? contexto.campos
          .map((campo) => {
            const lotes = campo.lotes.length
              ? campo.lotes
                  .map((lote) => `${lote.nombre} (${lote.hectareas} ha)`)
                  .join(', ')
              : 'sin lotes registrados';
            return `- ${campo.nombre} (${campo.hectareas} ha): ${lotes}.`;
          })
          .join('\n')
      : '- No hay campos visibles para este usuario.';

    return [
      'Contexto autorizado para preparar acciones (solo lectura):',
      `Organizacion: ${contexto.organizacion.nombre}.`,
      `Plan: ${contexto.organizacion.plan}.`,
      `Actividad principal: ${contexto.organizacion.actividadPrincipal ?? 'sin definir'}.`,
      `Actividades productivas activas: ${contexto.organizacion.actividades.join(', ') || 'sin definir'}.`,
      `Puede gestionar campos: ${contexto.permisos.puedeGestionarCampos ? 'si' : 'no'}.`,
      `Es owner: ${contexto.permisos.esOwner ? 'si' : 'no'}.`,
      'Campos y lotes visibles:',
      campos,
      'Usa este contexto solo para evitar duplicados, respetar permisos y pedir datos faltantes.',
    ].join('\n');
  }

  textoDePropuesta(propuesta: PropuestaCrearCampoAgroBot): string {
    if (propuesta.estado === 'SIN_PERMISO') {
      return 'No puedo preparar este alta porque no tenés habilitado el módulo Campos en este establecimiento.';
    }

    if (!propuesta.campo.nombre) {
      return [
        'Para crear un campo voy a pedirte estos datos:',
        '1. Nombre del campo.',
        '2. Hectáreas totales.',
        '3. Lotes: nombre y hectáreas de cada uno.',
        '4. Actividad: agricultura, ganadería o mixta.',
        '',
        'Empecemos: ¿qué nombre querés darle al campo?',
      ].join('\n');
    }

    if (!propuesta.campo.hectareas) {
      return `Perfecto, anoté **${propuesta.campo.nombre}**. ¿Cuántas hectáreas tiene en total?`;
    }

    if (!propuesta.lotes.length || propuesta.lotes.some((lote) => !lote.nombre || !lote.hectareas)) {
      return [
        `Bien, el campo **${propuesta.campo.nombre}** tendrá **${propuesta.campo.hectareas} ha**.`,
        'Ahora indicame los lotes con su nombre y hectáreas.',
        'Por ejemplo: `Norte 120 ha y Sur 80 ha`.',
      ].join('\n\n');
    }

    if (!propuesta.campo.actividadesDetectadas.length) {
      return [
        'Ya tengo el campo y sus lotes.',
        'Por último, ¿qué actividad desarrolla: **agricultura**, **ganadería** o **mixta**?',
      ].join('\n\n');
    }

    const campo = propuesta.campo.nombre ?? 'sin nombre definido';
    const hectareas = propuesta.campo.hectareas
      ? `${propuesta.campo.hectareas} ha`
      : 'superficie pendiente';
    const lotes = propuesta.lotes.length
      ? propuesta.lotes
          .map((lote) => `${lote.nombre ?? 'sin nombre'}${lote.hectareas ? ` (${lote.hectareas} ha)` : ''}`)
          .join(', ')
      : 'sin lotes detallados';

    const resumen = `Leí los datos visibles de ${propuesta.lectura.organizacionNombre}. Entendí: campo **${campo}** (${hectareas})${propuesta.lotes.length ? `, con lotes: ${lotes}` : ''}.`;

    if (propuesta.estado === 'LISTA_PARA_CONFIRMAR') {
      return `${resumen}\n\nLa propuesta está lista para revisar y confirmar. Todavía no se creó ningún dato.`;
    }

    const pendientes = propuesta.faltantes.length
      ? ` Para dejarla lista necesito: ${propuesta.faltantes.join(', ')}.`
      : '';
    const revisiones = propuesta.advertencias.length
      ? ` Revisá también: ${propuesta.advertencias.join(' ')}`
      : '';
    return `${resumen}\n\nTodavía no voy a crear nada.${pendientes}${revisiones}`;
  }

  textoDePropuestaCompletar(propuesta: PropuestaCompletarTareaAgroBot): string {
    if (propuesta.estado === 'SIN_PERMISO') {
      return 'No tenés acceso para completar tareas en este establecimiento.';
    }
    if (propuesta.estado === 'NO_ENCONTRADA') {
      return 'No encontré una tarea pendiente con ese nombre. Indicame el título tal como aparece en la lista de tareas.';
    }
    if (propuesta.estado === 'REQUIERE_PRECISION') {
      return `Encontré más de una coincidencia: ${propuesta.coincidencias.join(', ')}. Decime cuál querés marcar como hecha.`;
    }
    if (propuesta.estado === 'FALTAN_DATOS') {
      return 'Decime qué tarea o trabajo querés marcar como hecho.';
    }

    return `Preparé el cierre de **${propuesta.tarea!.titulo}**. Revisalo y confirmá para marcarlo como hecho.`;
  }

  private esPedidoDeCrearCampo(mensaje: string): boolean {
    const consulta = this.normalizar(mensaje);
    if (/^(como|donde|puedo|ayuda|explicame)\b/.test(consulta)) {
      return false;
    }
    const solicitaAlta = /\b(crea|crear|agrega|agregar|registra|registrar|alta|nuevo)\w*/.test(consulta);
    const describeCampo = /\bcampo\b/.test(consulta)
      || (/\blotes?\b/.test(consulta) && /\b(?:ha|hectareas?)\b/.test(consulta));
    return solicitaAlta && describeCampo;
  }

  private esPedidoDeCrearMaquinaria(mensaje: string): boolean {
    const consulta = this.normalizar(mensaje);
    const solicitaAlta = /\b(crea|crear|agrega|agregar|registra|registrar|alta|nuevo)\w*/.test(consulta);
    const mencionaEquipo = /\b(maquinaria|vehiculo|camioneta|pickup|tractor|sembradora|pulverizadora|cosechadora|mixer|acoplado|tolva|herramienta)\b/.test(consulta);
    return solicitaAlta && mencionaEquipo;
  }

  private esPedidoDeCrearSiembra(mensaje: string): boolean {
    const consulta = this.normalizar(mensaje);
    return /\b(crea|crear|agrega|agregar|registra|registrar|carga|cargar)\w*/.test(consulta)
      && /\b(siembra|sembrar|sembrado)\b/.test(consulta);
  }

  private extraerTipoMaquinaria(mensaje: string): TipoMaquinaria | null {
    const consulta = this.normalizar(mensaje);
    if (/\btractor\b/.test(consulta)) return TipoMaquinaria.TRACTOR;
    if (/\bsembradora\b/.test(consulta)) return TipoMaquinaria.SEMBRADORA;
    if (/\bpulverizadora\b/.test(consulta)) return TipoMaquinaria.PULVERIZADORA;
    if (/\bcosechadora\b/.test(consulta)) return TipoMaquinaria.COSECHADORA;
    if (/\b(camioneta|pickup|camion)\b/.test(consulta)) return TipoMaquinaria.CAMIONETA;
    if (/\bmixer\b/.test(consulta)) return TipoMaquinaria.MIXER;
    if (/\bacoplado\b/.test(consulta)) return TipoMaquinaria.ACOPLADO;
    if (/\btolva\b/.test(consulta)) return TipoMaquinaria.TOLVA;
    if (/\bherramienta\b/.test(consulta)) return TipoMaquinaria.HERRAMIENTA;
    return null;
  }

  private extraerNombreMaquinaria(
    mensaje: string,
    tipo: TipoMaquinaria | null,
  ): string | null {
    const explicito = mensaje.match(/(?:llamada|llamado|nombre(?:\s+es|:))\s+(.+)/i)?.[1];
    if (explicito) return this.limpiarNombre(explicito);
    if (!tipo) return null;

    const patronesPorTipo: Record<TipoMaquinaria, RegExp> = {
      [TipoMaquinaria.TRACTOR]: /\btractor\s+(.+)/i,
      [TipoMaquinaria.SEMBRADORA]: /\bsembradora\s+(.+)/i,
      [TipoMaquinaria.PULVERIZADORA]: /\bpulverizadora\s+(.+)/i,
      [TipoMaquinaria.COSECHADORA]: /\bcosechadora\s+(.+)/i,
      [TipoMaquinaria.CAMIONETA]: /\b(?:camioneta|pickup|camion)\s+(.+)/i,
      [TipoMaquinaria.MIXER]: /\bmixer\s+(.+)/i,
      [TipoMaquinaria.ACOPLADO]: /\bacoplado\s+(.+)/i,
      [TipoMaquinaria.TOLVA]: /\btolva\s+(.+)/i,
      [TipoMaquinaria.HERRAMIENTA]: /\bherramienta\s+(.+)/i,
      [TipoMaquinaria.OTRO]: /$^/,
    };
    const coincidencia = mensaje.match(patronesPorTipo[tipo])?.[1];
    if (!coincidencia) return null;

    return this.limpiarNombre(
      coincidencia.replace(/\b(?:para|en|del|de la)\s+(?:la\s+)?(?:organizacion|empresa|estancia|campo)\b.*$/i, ''),
    );
  }

  private async obtenerLotesParaSiembra(
    organizacionId: number,
    esOwner: boolean,
    usuarioOrganizacionId?: number,
  ) {
    if (!esOwner && !usuarioOrganizacionId) return [];
    return this.prisma.lote.findMany({
      where: {
        campo: {
          organizacionId,
          ...(esOwner
            ? {}
            : {
                AsignacionCampo: {
                  some: { usuarioOrganizacionId, activo: true },
                },
              }),
        },
      },
      select: {
        id: true,
        nombre: true,
        campo: { select: { nombre: true } },
      },
      orderBy: [{ campo: { nombre: 'asc' } }, { nombre: 'asc' }],
    });
  }

  private obtenerSolicitudCampo(
    historial: ChatMessageDto[],
    mensaje: string,
  ): string[] | null {
    return this.obtenerSolicitudDesdeHistorial(
      historial,
      mensaje,
      (texto) => this.esPedidoDeCrearCampo(texto),
    );
  }

  private obtenerSolicitudDesdeHistorial(
    historial: ChatMessageDto[],
    mensaje: string,
    esInicio: (texto: string) => boolean,
  ): string[] | null {
    const mensajesUsuario = [
      ...historial.filter((item) => item.role === 'user').map((item) => item.text),
      mensaje,
    ];
    let indiceInicio = -1;
    for (let indice = mensajesUsuario.length - 1; indice >= 0; indice -= 1) {
      if (esInicio(mensajesUsuario[indice])) {
        indiceInicio = indice;
        break;
      }
    }
    if (indiceInicio < 0) return null;

    return mensajesUsuario.slice(indiceInicio);
  }

  private extraerCampoDeSolicitud(mensajes: string[]) {
    const campoInicial = this.extraerCampo(mensajes[0]);
    let nombre = campoInicial.nombre;
    let hectareas = campoInicial.hectareas;
    let indiceNombre = nombre ? 0 : -1;
    let indiceHectareas = hectareas ? 0 : -1;

    for (let indice = 1; indice < mensajes.length; indice += 1) {
      if (!nombre) {
        const nombreDetectado = this.extraerNombreCampoRespuesta(mensajes[indice]);
        if (nombreDetectado) {
          nombre = nombreDetectado;
          indiceNombre = indice;
          continue;
        }
      }
      if (!hectareas && indice > indiceNombre) {
        const superficie = this.extraerHectareas(mensajes[indice]);
        if (superficie) {
          hectareas = superficie;
          indiceHectareas = indice;
        }
      }
    }

    return {
      campo: { nombre, hectareas },
      indiceHectareas,
    };
  }

  private extraerNombreCampoRespuesta(mensaje: string): string | null {
    const explicito = mensaje.match(
      /(?:se\s+llama|nombre(?:\s+del\s+campo)?\s*(?:es|:)?|campo\s+(?:llamado|llamada))\s+(.+)/i,
    )?.[1];
    if (explicito) return this.limpiarNombre(explicito);

    const consulta = this.normalizar(mensaje);
    if (
      !consulta ||
      /\b(?:ha|hectarea|lote|agricultur|ganader|mixto|mixta|sin\s+lotes)\b/.test(consulta) ||
      /\d/.test(consulta)
    ) {
      return null;
    }
    return this.limpiarNombre(mensaje);
  }

  private extraerLotesDeSolicitud(
    mensajes: string[],
    indiceHectareas: number,
  ): LotePropuestoAgroBot[] {
    const inicio = indiceHectareas > 0 ? indiceHectareas + 1 : 0;
    return mensajes.slice(inicio).flatMap((mensaje) => this.extraerLotes(mensaje));
  }

  private esPedidoDeCompletarTarea(mensaje: string): boolean {
    const consulta = this.normalizar(mensaje);
    const mencionaTarea = /\b(tarea|trabajo|actividad)\b/.test(consulta);
    const solicitaCompletar = /\b(marca|marcar|completa|completar|termina|terminar|finaliza|finalizar|hecha|hecho|realizada|realizado)\w*/.test(consulta);
    return mencionaTarea && solicitaCompletar;
  }

  private extraerNombreTareaACompletar(mensaje: string): string | null {
    const entreComillas = mensaje.match(/["']([^"']{3,255})["']/)?.[1];
    if (entreComillas) return this.normalizar(entreComillas);

    const consulta = this.normalizar(mensaje);
    const coincidencia = consulta.match(
      /\b(?:tarea|trabajo|actividad)\s+(?:llamada\s+)?(.+?)(?=\s+(?:como\s+)?(?:hecha|hecho|completada|completado|realizada|realizado|terminada|terminado)\b|$)/,
    );
    return this.limpiarNombre(coincidencia?.[1])
      ? this.normalizar(coincidencia![1])
      : null;
  }

  private esPedidoDeCrearTrabajo(mensaje: string): boolean {
    const consulta = this.normalizar(mensaje);
    return /\b(asigna|asignar|asignale|crea|crear|programa|programar)\b/.test(consulta)
      && /\b(trabajo|tarea|asigna|asignale)\b/.test(consulta);
  }

  private extraerTituloTrabajo(mensaje: string, responsable?: string, campo?: string): string | null {
    const entreComillas = mensaje.match(/["']([^"']{3,255})["']/)?.[1];
    if (entreComillas) return this.limpiarNombre(entreComillas);
    let titulo = mensaje;
    titulo = titulo.replace(/^(?:asigna(?:le|r)?|crea(?:me)?|crear|programa(?:r)?)(?:\s+una?)?\s*(?:tarea|trabajo)?\s*/i, '');
    if (responsable) {
      titulo = this.quitarFragmento(titulo, `a ${responsable}`);
      titulo = this.quitarFragmento(titulo, `para ${responsable}`);
    }
    titulo = titulo.replace(
      /\s+(?:en\s+(?:el\s+)?campo|hoy|manana|mañana|el\s+\d{1,2}[/-]\d{1,2}[/-]\d{4}|urgente|alta|baja)\b.*$/i,
      '',
    );
    if (campo) {
      titulo = this.quitarFragmento(titulo, `en el campo ${campo}`);
      titulo = this.quitarFragmento(titulo, `en campo ${campo}`);
      titulo = this.quitarFragmento(titulo, campo);
    }
    titulo = titulo.replace(/\b(hoy|manana|mañana|el\s+\d{1,2}[/-]\d{1,2}[/-]\d{4}|urgente|alta|baja)\b/gi, '');
    return this.limpiarNombre(titulo.replace(/\s+/g, ' '));
  }

  private extraerFechaTrabajo(consulta: string): string | null {
    const fecha = new Date();
    if (/\bmanana\b/.test(consulta)) fecha.setDate(fecha.getDate() + 1);
    else if (!/\bhoy\b/.test(consulta)) {
      const coincidencia = consulta.match(/\b(\d{1,2})[/-](\d{1,2})[/-](\d{4})\b/);
      if (!coincidencia) return null;
      fecha.setFullYear(Number(coincidencia[3]), Number(coincidencia[2]) - 1, Number(coincidencia[1]));
      if (Number.isNaN(fecha.getTime())) return null;
    }
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
  }

  private quitarFragmento(texto: string, fragmento: string) {
    const indice = this.normalizar(texto).indexOf(this.normalizar(fragmento));
    if (indice < 0) return texto;
    return `${texto.slice(0, indice)} ${texto.slice(indice + fragmento.length)}`;
  }

  private extraerCampo(mensaje: string): Pick<PropuestaCrearCampoAgroBot['campo'], 'nombre' | 'hectareas'> {
    const nombreCoincidente = mensaje.match(
      /(?:crea(?:me)?|crear|agrega(?:me)?|agregar|registra(?:me)?|registrar|da(?:me)?\s+de\s+alta)\s+(?:un\s+|el\s+)?campo\s+(?:llamado\s+)?["“']?(.+?)["”']?(?=\s*(?:,|;|\.|\bcon\b|\bde\s+\d+(?:[.,]\d+)?\s*(?:ha|hectareas?)\b|$))/i,
    );
    const nombre = this.limpiarNombre(nombreCoincidente?.[1]);
    const desdeCampo = nombreCoincidente?.index !== undefined
      ? mensaje.slice(nombreCoincidente.index, nombreCoincidente.index + 180)
      : mensaje;
    const hectareas = this.extraerHectareas(desdeCampo);

    return { nombre, hectareas };
  }

  private extraerLotes(mensaje: string): LotePropuestoAgroBot[] {
    const coincidencia = mensaje.match(
      /\b(?:con\s+)?(?:(?:\d+|un|uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s+)?lotes?\s*(?::|=)?\s*(.+?)(?=$|[.;]|\s*,?\s*(?:que\s+sea|actividad|mixto|mixta|para)\b)/i,
    );
    if (!coincidencia?.[1]) {
      return mensaje
        .split(/\s*(?:,|\by\b|\be\b)\s*/i)
        .map((detalle) => this.extraerLote(detalle))
        .filter((lote) => lote.nombre && lote.hectareas);
    }

    return coincidencia[1]
      .split(/\s*(?:,|\by\b|\be\b)\s*/i)
      .map((detalle) => this.extraerLote(detalle))
      .filter((lote) => lote.nombre || lote.hectareas);
  }

  private extraerLote(detalle: string): LotePropuestoAgroBot {
    const hectareasCoincidentes = detalle.match(/(\d+(?:[.,]\d+)?)\s*(?:ha|hectareas?)\b/i);
    const hectareas = hectareasCoincidentes
      ? Number(hectareasCoincidentes[1].replace(',', '.'))
      : null;
    const nombreSinSuperficie = hectareasCoincidentes
      ? detalle.slice(0, hectareasCoincidentes.index)
      : detalle;
    const nombre = this.limpiarNombre(
      nombreSinSuperficie.replace(/\bde\s*$/i, ''),
    );
    return { nombre, hectareas };
  }

  private extraerCantidadLotesSolicitada(mensaje: string): number | null {
    const coincidencia = this.normalizar(mensaje).match(
      /\b(\d+|un|uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s+lotes?\b/,
    );
    if (!coincidencia?.[1]) return null;
    return Number(coincidencia[1]) || PALABRAS_CANTIDAD[coincidencia[1]] || null;
  }

  private extraerActividades(mensaje: string): string[] {
    const consulta = this.normalizar(mensaje);
    const actividades: string[] = [];
    if (/\bagricultur/.test(consulta)) actividades.push('AGRICULTURA');
    if (/\bganader/.test(consulta)) actividades.push('GANADERIA');
    if (/\bmixto|mixta\b/.test(consulta)) {
      actividades.push('AGRICULTURA', 'GANADERIA');
    }
    return [...new Set(actividades)];
  }

  private extraerHectareas(texto: string): number | null {
    const coincidencia = texto.match(/(\d+(?:[.,]\d+)?)\s*(?:ha|hectareas?)\b/i);
    if (!coincidencia?.[1]) return null;
    const hectareas = Number(coincidencia[1].replace(',', '.'));
    return hectareas > 0 ? hectareas : null;
  }

  private limpiarNombre(valor: string | undefined): string | null {
    const limpio = valor
      ?.replace(/^[\s"“']+|[\s"”']+$/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return limpio || null;
  }

  private normalizar(valor: string): string {
    return valor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es-AR')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
