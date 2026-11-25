import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EstadoSolicitudDigital, TipoEventoAgroManagerDigital } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../mailer/mailer.service';
import { ActualizarSolicitudDigitalDto, CrearSolicitudDigitalDto } from './dto/solicitud-digital.dto';

@Injectable()
export class AgroManagerDigitalService {
  private readonly logger = new Logger(AgroManagerDigitalService.name);
  constructor(private readonly prisma: PrismaService, private readonly mailer: MailerService) {}

  async registrarEvento(dto: { tipo: TipoEventoAgroManagerDigital; origen?: string; medio?: string; campania?: string }) {
    const origen = this.normalizarOrigen(dto.origen);
    await this.prisma.eventoAgroManagerDigital.create({
      data: {
        tipo: dto.tipo,
        origen,
        medio: this.normalizarEtiqueta(dto.medio),
        campania: this.normalizarEtiqueta(dto.campania),
      },
    });
    return { ok: true };
  }

  async analitica(adminId: number) {
    await this.requerirAdmin(adminId);
    const desde = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const where = { createdAt: { gte: desde } };
    const [eventos, origenes, medios, campanias] = await Promise.all([
      this.prisma.eventoAgroManagerDigital.groupBy({ by: ['tipo'], where, _count: { _all: true } }),
      this.prisma.eventoAgroManagerDigital.groupBy({ by: ['origen'], where: { ...where, origen: { not: null } }, _count: { _all: true }, orderBy: { _count: { origen: 'desc' } }, take: 10 }),
      this.prisma.eventoAgroManagerDigital.groupBy({ by: ['medio'], where: { ...where, medio: { not: null } }, _count: { _all: true }, orderBy: { _count: { medio: 'desc' } }, take: 10 }),
      this.prisma.eventoAgroManagerDigital.groupBy({ by: ['campania'], where: { ...where, campania: { not: null } }, _count: { _all: true }, orderBy: { _count: { campania: 'desc' } }, take: 10 }),
    ]);
    const conteos = Object.fromEntries(eventos.map((evento) => [evento.tipo, evento._count._all]));
    return {
      desde,
      dias: 30,
      visitas: conteos[TipoEventoAgroManagerDigital.VISITA] ?? 0,
      clicsPresupuesto: conteos[TipoEventoAgroManagerDigital.CLICK_PRESUPUESTO] ?? 0,
      clicsWhatsApp: conteos[TipoEventoAgroManagerDigital.CLICK_WHATSAPP] ?? 0,
      formulariosIniciados: conteos[TipoEventoAgroManagerDigital.FORMULARIO_INICIADO] ?? 0,
      solicitudesEnviadas: conteos[TipoEventoAgroManagerDigital.FORMULARIO_ENVIADO] ?? 0,
      origenes: origenes.filter((origen) => origen.origen).map((origen) => ({ nombre: origen.origen, cantidad: origen._count._all })),
      medios: medios.filter((medio) => medio.medio).map((medio) => ({ nombre: medio.medio, cantidad: medio._count._all })),
      campanias: campanias.filter((campania) => campania.campania).map((campania) => ({ nombre: campania.campania, cantidad: campania._count._all })),
    };
  }

  @Cron('0 0 1 * *')
  async eliminarEventosAntiguos() {
    const limite = new Date();
    limite.setFullYear(limite.getFullYear() - 1);
    await this.prisma.eventoAgroManagerDigital.deleteMany({ where: { createdAt: { lt: limite } } });
  }

  async crear(dto: CrearSolicitudDigitalDto) {
    if (dto.sitioWeb) throw new BadRequestException('No se pudo procesar la solicitud.');
    if (!dto.consienteContacto) throw new BadRequestException('Necesitamos tu consentimiento para contactarte por esta solicitud.');
    for (const [campo, valor] of Object.entries({
      nombre: dto.nombre,
      establecimiento: dto.establecimiento,
      telefono: dto.telefono,
      provincia: dto.provincia,
      localidad: dto.localidad,
      actividad: dto.actividad,
      servicio: dto.servicio,
      descripcion: dto.descripcion,
    })) {
      if (!valor.trim()) throw new BadRequestException(`El campo ${campo} es obligatorio.`);
    }
    const solicitud = await this.prisma.solicitudAgroManagerDigital.create({
      data: {
        nombre: dto.nombre.trim(), establecimiento: dto.establecimiento.trim(),
        email: dto.email.trim().toLowerCase(), telefono: dto.telefono.trim(),
        provincia: dto.provincia.trim(), localidad: dto.localidad.trim(),
        actividad: dto.actividad.trim(), servicio: dto.servicio.trim(),
        tieneSitioWeb: dto.tieneSitioWeb, descripcion: dto.descripcion.trim(),
        presupuesto: dto.presupuesto?.trim() || null, fechaInicio: dto.fechaInicio?.trim() || null,
        comentarios: dto.comentarios?.trim() || null, consienteContacto: true,
      },
      select: { id: true, email: true, nombre: true, establecimiento: true, actividad: true, servicio: true, provincia: true, localidad: true, descripcion: true, telefono: true, createdAt: true },
    });
    const adminEmail = process.env.DIGITAL_LEADS_ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await this.mailer.enviarCorreo({
          email: adminEmail,
          asunto: `Nueva consulta AgroManager Digital #${solicitud.id}`,
          html: `<h2>Nueva solicitud AgroManager Digital</h2><p><b>${this.escape(solicitud.nombre)}</b> · ${this.escape(solicitud.establecimiento)}</p><p>${this.escape(solicitud.email)} · ${this.escape(solicitud.telefono)}</p><p>${this.escape(solicitud.actividad)} · ${this.escape(solicitud.servicio)}</p><p>${this.escape(solicitud.localidad)}, ${this.escape(solicitud.provincia)}</p><p>${this.escape(solicitud.descripcion)}</p>`,
        });
      } catch (error) { this.logger.error(`No se pudo notificar la solicitud #${solicitud.id}`, error); }
    } else this.logger.warn('DIGITAL_LEADS_ADMIN_EMAIL no configurado; la solicitud quedó guardada en el panel.');
    try {
      await this.mailer.enviarCorreo({
        email: solicitud.email,
        asunto: 'Recibimos tu consulta · AgroManager Digital',
        html: `<p>Hola ${this.escape(solicitud.nombre)},</p><p>Recibimos tu consulta sobre ${this.escape(solicitud.servicio)}. La revisaremos y nos pondremos en contacto para conocer mejor tu proyecto.</p><p>Este mensaje confirma la recepción; no implica contratación ni presupuesto acordado.</p><p>AgroManager Digital</p>`,
      });
    } catch (error) { this.logger.warn(`No se pudo enviar acuse de recepción de solicitud #${solicitud.id}: ${String(error)}`); }
    return { id: solicitud.id, mensaje: 'Recibimos tu consulta. Te contactaremos para conversar sobre el proyecto.' };
  }

  async listar(adminId: number, buscar?: string, estado?: string) {
    await this.requerirAdmin(adminId);
    const estadoValido = estado && Object.values(EstadoSolicitudDigital).includes(estado as EstadoSolicitudDigital)
      ? estado as EstadoSolicitudDigital : undefined;
    const q = buscar?.trim();
    const [items, total, agrupados] = await Promise.all([
      this.prisma.solicitudAgroManagerDigital.findMany({
        where: { ...(estadoValido ? { estado: estadoValido } : {}), ...(q ? { OR: ['nombre', 'establecimiento', 'email', 'telefono'].map((field) => ({ [field]: { contains: q, mode: 'insensitive' as const } })) } : {}) },
        include: { seguimientos: { orderBy: { createdAt: 'desc' } } }, orderBy: { createdAt: 'desc' }, take: 200,
      }),
      this.prisma.solicitudAgroManagerDigital.count(),
      this.prisma.solicitudAgroManagerDigital.groupBy({ by: ['estado'], _count: { _all: true } }),
    ]);
    return { items, total, resumen: Object.fromEntries(agrupados.map((x) => [x.estado, x._count._all])) };
  }

  async exportar(adminId: number, buscar?: string, estado?: string) {
    await this.requerirAdmin(adminId);
    const estadoValido = estado && Object.values(EstadoSolicitudDigital).includes(estado as EstadoSolicitudDigital)
      ? estado as EstadoSolicitudDigital : undefined;
    const q = buscar?.trim();
    return this.prisma.solicitudAgroManagerDigital.findMany({
      where: {
        ...(estadoValido ? { estado: estadoValido } : {}),
        ...(q ? { OR: ['nombre', 'establecimiento', 'email', 'telefono'].map((field) => ({ [field]: { contains: q, mode: 'insensitive' as const } })) } : {}),
      },
      include: { seguimientos: { orderBy: { createdAt: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async actualizar(adminId: number, id: number, dto: ActualizarSolicitudDigitalDto) {
    const admin = await this.requerirAdmin(adminId);
    if (!Object.values(EstadoSolicitudDigital).includes(dto.estado as EstadoSolicitudDigital) && dto.estado) throw new BadRequestException('Estado no válido.');
    const existente = await this.prisma.solicitudAgroManagerDigital.findUnique({ where: { id }, select: { id: true } });
    if (!existente) throw new NotFoundException('Solicitud no encontrada.');
    return this.prisma.$transaction(async (tx) => {
      const item = await tx.solicitudAgroManagerDigital.update({
        where: { id }, data: { ...(dto.estado ? { estado: dto.estado as EstadoSolicitudDigital } : {}), ...(dto.observacionesInternas !== undefined ? { observacionesInternas: dto.observacionesInternas } : {}), ...(dto.presupuestoEnviado !== undefined ? { presupuestoEnviado: dto.presupuestoEnviado } : {}) },
      });
      if (dto.seguimiento?.trim()) await tx.seguimientoSolicitudDigital.create({ data: { solicitudId: id, administrador: admin.email, detalle: dto.seguimiento.trim() } });
      return item;
    });
  }

  private async requerirAdmin(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id }, select: { id: true, email: true, rolGlobal: true } });
    if (usuario?.rolGlobal !== 'SUPERADMIN') throw new ForbiddenException('Solo SUPERADMIN puede acceder a solicitudes comerciales.');
    return usuario;
  }

  private escape(value: string) { return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!); }

  private normalizarOrigen(value?: string) {
    const origen = value?.trim();
    if (!origen) return 'Directo';
    if (origen.toLowerCase() === 'agromanager ar') return 'AgroManager AR';
    if (/^[\p{L}\p{N}._ -]{1,120}$/u.test(origen) && !/\d{7,}/.test(origen)) return origen;
    try {
      const url = new URL(/^https?:\/\//i.test(origen) ? origen : `https://${origen}`);
      const host = url.hostname.toLowerCase();
      return /^[a-z0-9.-]{1,120}$/.test(host) ? host : null;
    } catch {
      return null;
    }
  }

  private normalizarEtiqueta(value?: string) {
    const etiqueta = value?.normalize('NFKC').trim();
    if (!etiqueta || /@/.test(etiqueta) || etiqueta.replace(/\D/g, '').length >= 7) return null;
    const segura = etiqueta.replace(/[^\p{L}\p{N} ._-]/gu, '').trim().slice(0, 120);
    return segura || null;
  }
}
