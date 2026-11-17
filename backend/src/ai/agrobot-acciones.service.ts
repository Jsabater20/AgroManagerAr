import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberAccessService } from '../organizations/member-access.service';
import { CamposService } from '../campos/campos.service';
import { ConfirmarCrearCampoAgroBotDto } from './dto/confirmar-crear-campo.dto';
import { ActividadesService } from '../actividades/actividades.service';
import { Prioridad, TipoRecursoActividad } from '@prisma/client';
import { ConfirmarCrearTrabajoAgroBotDto } from './dto/confirmar-crear-trabajo.dto';

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

export type PropuestaAccionAgroBot =
  | PropuestaCrearCampoAgroBot
  | PropuestaCrearTrabajoAgroBot;

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
  ): Promise<PropuestaCrearCampoAgroBot | null> {
    if (!this.esPedidoDeCrearCampo(mensaje)) {
      return null;
    }

    const contexto = await this.obtenerContextoCampos(usuarioId, organizacionId);
    const campo = this.extraerCampo(mensaje);
    const lotes = this.extraerLotes(mensaje);
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
          actividadesDetectadas: this.extraerActividades(mensaje),
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

    const cantidadLotesSolicitada = this.extraerCantidadLotesSolicitada(mensaje);
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

    const actividadesDetectadas = this.extraerActividades(mensaje);
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

  private esPedidoDeCrearCampo(mensaje: string): boolean {
    const consulta = this.normalizar(mensaje);
    if (/^(como|donde|puedo|ayuda|explicame)\b/.test(consulta)) {
      return false;
    }
    return /\bcampo\b/.test(consulta) && /\b(crea|crear|agrega|agregar|registra|registrar|alta|nuevo)\w*/.test(consulta);
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
      return [];
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
    if (/\bmixto|mixta\b/.test(consulta) && !actividades.length) actividades.push('MIXTA');
    return actividades;
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
