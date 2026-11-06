import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EstadoEnvioCorreoNovedad, EstadoNovedadProducto, Prisma } from '@prisma/client';
import { createHmac, timingSafeEqual } from 'crypto';
import { MailerService } from '../mailer/mailer.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  ActualizarNovedadProductoDto,
  ConfirmarEnvioNovedadDto,
  CrearNovedadProductoDto,
} from './dto/novedades.dto';

const seleccionNovedadUsuario = {
  id: true,
  titulo: true,
  resumen: true,
  contenido: true,
  categoria: true,
  version: true,
  destacada: true,
  publicadaEn: true,
} satisfies Prisma.NovedadProductoSelect;

@Injectable()
export class NovedadesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificacionesService: NotificacionesService,
    private readonly mailerService: MailerService,
  ) {}

  async listarParaUsuario(usuarioId: number) {
    const novedades = await this.prisma.novedadProducto.findMany({
      where: {
        estado: EstadoNovedadProducto.PUBLICADA,
        publicadaEn: { lte: new Date() },
      },
      select: {
        ...seleccionNovedadUsuario,
        lecturas: {
          where: { usuarioId },
          select: { leidaEn: true },
        },
      },
      orderBy: [{ destacada: 'desc' }, { publicadaEn: 'desc' }],
      take: 50,
    });

    return novedades.map(({ lecturas, ...novedad }) => ({
      ...novedad,
      leida: lecturas.length > 0,
      leidaEn: lecturas[0]?.leidaEn ?? null,
    }));
  }

  async obtenerResumenParaUsuario(usuarioId: number) {
    const where: Prisma.NovedadProductoWhereInput = {
      estado: EstadoNovedadProducto.PUBLICADA,
      publicadaEn: { lte: new Date() },
    };
    const [total, leidas, ultima] = await Promise.all([
      this.prisma.novedadProducto.count({ where }),
      this.prisma.novedadProductoLectura.count({
        where: { usuarioId, novedad: where },
      }),
      this.prisma.novedadProducto.findFirst({
        where,
        select: seleccionNovedadUsuario,
        orderBy: [{ destacada: 'desc' }, { publicadaEn: 'desc' }],
      }),
    ]);

    return {
      total,
      sinLeer: Math.max(total - leidas, 0),
      ultima,
    };
  }

  async marcarLeida(usuarioId: number, novedadId: string) {
    const novedad = await this.prisma.novedadProducto.findFirst({
      where: {
        id: novedadId,
        estado: EstadoNovedadProducto.PUBLICADA,
        publicadaEn: { lte: new Date() },
      },
      select: { id: true },
    });
    if (!novedad) throw new NotFoundException('Novedad no encontrada');

    await this.prisma.novedadProductoLectura.upsert({
      where: {
        novedadId_usuarioId: { novedadId: novedad.id, usuarioId },
      },
      create: { novedadId: novedad.id, usuarioId },
      update: {},
    });
    return { ok: true };
  }

  async listarParaAdmin(adminId: number) {
    await this.requerirSuperadmin(adminId);
    return this.prisma.novedadProducto.findMany({
      include: {
        creadoPor: {
          select: { id: true, nombre: true, apellido: true, email: true },
        },
        _count: { select: { lecturas: true } },
      },
      orderBy: [{ estado: 'asc' }, { updatedAt: 'desc' }],
    });
  }

  async crearBorrador(adminId: number, dto: CrearNovedadProductoDto) {
    await this.requerirSuperadmin(adminId);
    return this.prisma.novedadProducto.create({
      data: {
        titulo: this.normalizarTexto(dto.titulo),
        resumen: this.normalizarTexto(dto.resumen),
        contenido: this.normalizarTexto(dto.contenido),
        categoria: dto.categoria,
        version: this.normalizarOpcional(dto.version),
        destacada: dto.destacada ?? false,
        creadoPorId: adminId,
      },
    });
  }

  async actualizar(
    adminId: number,
    novedadId: string,
    dto: ActualizarNovedadProductoDto,
  ) {
    await this.requerirSuperadmin(adminId);
    const novedad = await this.obtenerAdministrable(novedadId);
    const data = this.datosActualizacion(dto);
    if (!Object.keys(data).length) {
      throw new BadRequestException('Indicá al menos un dato para actualizar');
    }

    return this.prisma.novedadProducto.update({
      where: { id: novedad.id },
      data,
    });
  }

  async publicar(adminId: number, novedadId: string) {
    await this.requerirSuperadmin(adminId);
    const resultado = await this.prisma.novedadProducto.updateMany({
      where: { id: novedadId, estado: EstadoNovedadProducto.BORRADOR },
      data: {
        estado: EstadoNovedadProducto.PUBLICADA,
        publicadaEn: new Date(),
      },
    });

    const novedad = await this.obtenerAdministrable(novedadId);
    if (!resultado.count) {
      if (novedad.estado === EstadoNovedadProducto.PUBLICADA) {
        return {
          novedad,
          destinatariosNotificados: 0,
          yaPublicada: true,
        };
      }
      throw new BadRequestException('No se pudo publicar la novedad');
    }

    const destinatariosNotificados = await this.notificarPublicacion(novedad);
    await this.prisma.novedadProducto.update({
      where: { id: novedad.id },
      data: { notificadaEn: new Date() },
    });

    return {
      novedad: await this.obtenerAdministrable(novedad.id),
      destinatariosNotificados,
      yaPublicada: false,
    };
  }

  async previsualizarCorreo(adminId: number, novedadId: string) {
    await this.requerirSuperadmin(adminId);
    const novedad = await this.obtenerAdministrable(novedadId);
    const destinatariosElegibles = await this.prisma.usuario.count({
      where: { recibeNovedades: true, emailVerificado: true },
    });
    return {
      asunto: `AgroManager AR: ${novedad.titulo}`,
      html: this.generarHtmlCorreo(novedad, 'Productor/a'),
      destinatariosElegibles,
      envioHabilitado: this.envioCorreoHabilitado(),
    };
  }

  async resumenEnvioCorreo(adminId: number, novedadId: string) {
    await this.requerirSuperadmin(adminId);
    await this.obtenerAdministrable(novedadId);
    const whereElegibles = { recibeNovedades: true, emailVerificado: true };
    const [destinatariosElegibles, enviados, errores, pendientes] = await Promise.all([
      this.prisma.usuario.count({ where: whereElegibles }),
      this.prisma.envioCorreoNovedad.count({
        where: { novedadId, estado: EstadoEnvioCorreoNovedad.ENVIADO },
      }),
      this.prisma.envioCorreoNovedad.count({
        where: { novedadId, estado: EstadoEnvioCorreoNovedad.ERROR },
      }),
      this.prisma.envioCorreoNovedad.count({
        where: { novedadId, estado: EstadoEnvioCorreoNovedad.PENDIENTE },
      }),
    ]);

    return {
      destinatariosElegibles,
      enviados,
      errores,
      pendientes,
      envioHabilitado: this.envioCorreoHabilitado(),
    };
  }

  async enviarCorreoPrueba(adminId: number, novedadId: string, emailPrueba?: string) {
    await this.requerirSuperadmin(adminId);
    this.requerirEnvioCorreoHabilitado();
    const [novedad, administrador] = await Promise.all([
      this.obtenerAdministrable(novedadId),
      this.prisma.usuario.findUnique({
        where: { id: adminId },
        select: { email: true, nombre: true, emailVerificado: true },
      }),
    ]);
    const destinatario = emailPrueba?.trim().toLowerCase() || administrador?.email;
    if (!destinatario) {
      throw new BadRequestException('Indicá un email válido para recibir la prueba');
    }
    if (!emailPrueba && !administrador?.emailVerificado) {
      throw new BadRequestException('Verificá el email del superadmin antes de enviar una prueba');
    }

    await this.mailerService.enviarCorreo({
      email: destinatario,
      asunto: `[PRUEBA] AgroManager AR: ${novedad.titulo}`,
      html: this.generarHtmlCorreo(novedad, administrador?.nombre ?? 'Productor/a'),
    });
    return { ok: true, destinatario };
  }

  async enviarCorreos(
    adminId: number,
    novedadId: string,
    dto: ConfirmarEnvioNovedadDto,
  ) {
    await this.requerirSuperadmin(adminId);
    if (!dto.confirmar) {
      throw new BadRequestException('Confirmá el envío antes de iniciar la comunicación');
    }
    this.requerirEnvioCorreoHabilitado();
    const novedad = await this.obtenerAdministrable(novedadId);
    if (novedad.estado !== EstadoNovedadProducto.PUBLICADA) {
      throw new BadRequestException('Publicá la novedad antes de enviar su comunicación');
    }

    let ultimoUsuarioId = 0;
    let enviados = 0;
    let omitidos = 0;
    let errores = 0;

    while (true) {
      const destinatarios = await this.prisma.usuario.findMany({
        where: {
          recibeNovedades: true,
          emailVerificado: true,
          id: { gt: ultimoUsuarioId },
        },
        select: { id: true, email: true, nombre: true },
        orderBy: { id: 'asc' },
        take: 25,
      });
      if (!destinatarios.length) break;

      for (const destinatario of destinatarios) {
        const envio = await this.prisma.envioCorreoNovedad.upsert({
          where: {
            novedadId_usuarioId: { novedadId: novedad.id, usuarioId: destinatario.id },
          },
          create: { novedadId: novedad.id, usuarioId: destinatario.id },
          update: {},
        });
        if (envio.estado === EstadoEnvioCorreoNovedad.ENVIADO) {
          omitidos += 1;
          continue;
        }

        try {
          await this.mailerService.enviarCorreo({
            email: destinatario.email,
            asunto: `AgroManager AR: ${novedad.titulo}`,
            html: this.generarHtmlCorreo(
              novedad,
              destinatario.nombre,
              this.obtenerUrlDesuscripcion(destinatario),
            ),
          });
          await this.prisma.envioCorreoNovedad.update({
            where: { id: envio.id },
            data: {
              estado: EstadoEnvioCorreoNovedad.ENVIADO,
              intentos: { increment: 1 },
              error: null,
              enviadoEn: new Date(),
            },
          });
          enviados += 1;
        } catch (error) {
          const mensaje = error instanceof Error ? error.message : 'No se pudo enviar el correo';
          await this.prisma.envioCorreoNovedad.update({
            where: { id: envio.id },
            data: {
              estado: EstadoEnvioCorreoNovedad.ERROR,
              intentos: { increment: 1 },
              error: mensaje.slice(0, 1000),
            },
          });
          errores += 1;
        }
      }

      ultimoUsuarioId = destinatarios[destinatarios.length - 1].id;
      if (destinatarios.length < 25) break;
    }

    return { enviados, omitidos, errores };
  }

  private async notificarPublicacion(novedad: {
    id: string;
    titulo: string;
    resumen: string;
  }) {
    let ultimoUsuarioId = 0;
    let creadas = 0;

    while (true) {
      const destinatarios = await this.prisma.usuario.findMany({
        where: {
          recibeNovedades: true,
          id: { gt: ultimoUsuarioId },
        },
        select: { id: true },
        orderBy: { id: 'asc' },
        take: 100,
      });
      if (!destinatarios.length) break;

      const resultados = await Promise.all(
        destinatarios.map((usuario) =>
          this.notificacionesService.crearNotificacionSiNoExiste(usuario.id, {
            tipo: 'NOVEDAD_PRODUCTO',
            titulo: novedad.titulo,
            mensaje: novedad.resumen,
            enlace: `/novedades?open=${encodeURIComponent(novedad.id)}`,
            dedupeKey: `novedad-${novedad.id}-usuario-${usuario.id}`,
            enviarPush: true,
          }),
        ),
      );
      creadas += resultados.filter(Boolean).length;
      ultimoUsuarioId = destinatarios[destinatarios.length - 1].id;
      if (destinatarios.length < 100) break;
    }

    return creadas;
  }

  private datosActualizacion(dto: ActualizarNovedadProductoDto) {
    const data: Prisma.NovedadProductoUpdateInput = {};
    if (dto.titulo !== undefined) data.titulo = this.normalizarTexto(dto.titulo);
    if (dto.resumen !== undefined) data.resumen = this.normalizarTexto(dto.resumen);
    if (dto.contenido !== undefined) data.contenido = this.normalizarTexto(dto.contenido);
    if (dto.categoria !== undefined) data.categoria = dto.categoria;
    if (dto.version !== undefined) data.version = this.normalizarOpcional(dto.version);
    if (dto.destacada !== undefined) data.destacada = dto.destacada;
    return data;
  }

  private async obtenerAdministrable(novedadId: string) {
    const novedad = await this.prisma.novedadProducto.findUnique({
      where: { id: novedadId },
    });
    if (!novedad) throw new NotFoundException('Novedad no encontrada');
    return novedad;
  }

  private async requerirSuperadmin(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { rolGlobal: true },
    });
    if (usuario?.rolGlobal !== 'SUPERADMIN') {
      throw new ForbiddenException('Solo SUPERADMIN puede administrar novedades');
    }
  }

  private normalizarTexto(valor: string) {
    const texto = valor.trim();
    if (!texto) throw new BadRequestException('El texto no puede quedar vacío');
    return texto;
  }

  private normalizarOpcional(valor?: string) {
    const texto = valor?.trim();
    return texto || null;
  }

  private envioCorreoHabilitado() {
    return process.env.NOVEDADES_EMAILS_HABILITADOS?.trim().toLowerCase() === 'true';
  }

  private requerirEnvioCorreoHabilitado() {
    if (!this.envioCorreoHabilitado()) {
      throw new BadRequestException(
        'El envío de correos de novedades está deshabilitado. Configurá NOVEDADES_EMAILS_HABILITADOS=true cuando la campaña esté aprobada.',
      );
    }
  }

  async desuscribirDeNovedades(usuarioId: number, firma: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        email: true,
        recibePromociones: true,
      },
    });
    if (!usuario || !this.firmaDesuscripcionValida(usuario, firma)) {
      throw new BadRequestException('El enlace para dejar de recibir novedades no es válido');
    }

    const ahora = new Date();
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        recibeNovedades: false,
        recibeComunicaciones: usuario.recibePromociones,
        comunicacionesConsentidasEn: usuario.recibePromociones ? ahora : null,
        preferenciasComunicacionesActualizadasEn: ahora,
      },
    });
    return { ok: true };
  }

  private generarHtmlCorreo(
    novedad: { id: string; titulo: string; resumen: string; contenido: string },
    nombreDestinatario: string,
    urlDesuscripcion?: string,
  ) {
    const url = `${this.obtenerUrlFrontend()}/novedades?open=${encodeURIComponent(novedad.id)}`;
    const titulo = this.escapeHtml(novedad.titulo);
    const resumen = this.escapeHtml(novedad.resumen);
    const contenido = this.escapeHtml(novedad.contenido).replace(/\n/g, '<br />');
    const nombre = this.escapeHtml(nombreDestinatario || 'Productor/a');
    return `
      <div style="margin:0 auto;max-width:600px;padding:24px;font-family:Arial,sans-serif;color:#172033;line-height:1.6">
        <div style="border-radius:18px;background:linear-gradient(135deg,#047857,#0f172a);padding:28px;color:#ffffff">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#a7f3d0">Novedades de AgroManager AR</p>
          <h1 style="margin:0;font-size:26px;line-height:1.25">${titulo}</h1>
        </div>
        <p>Hola ${nombre},</p>
        <p><strong>${resumen}</strong></p>
        <p>${contenido}</p>
        <p style="margin:28px 0;text-align:center"><a href="${url}" style="display:inline-block;border-radius:10px;background:#047857;padding:12px 20px;color:#ffffff;text-decoration:none;font-weight:700">Ver novedad en AgroManager</a></p>
        <p style="font-size:12px;color:#64748b">Recibís este correo porque tenés una cuenta en AgroManager AR. ${urlDesuscripcion ? `<a href="${urlDesuscripcion}" style="color:#047857">Dejar de recibir novedades</a>.` : 'Podés cambiar esta preferencia desde tu perfil.'}</p>
      </div>
    `;
  }

  private obtenerUrlDesuscripcion(usuario: { id: number; email: string }) {
    const parametros = new URLSearchParams({
      usuario: String(usuario.id),
      firma: this.generarFirmaDesuscripcion(usuario),
    });
    return `${this.obtenerUrlFrontend()}/desuscribir-novedades?${parametros.toString()}`;
  }

  private generarFirmaDesuscripcion(usuario: { id: number; email: string }) {
    const secreto = process.env.JWT_SECRET;
    if (!secreto) {
      throw new InternalServerErrorException('No se pudo configurar el enlace para dejar de recibir novedades');
    }
    return createHmac('sha256', secreto)
      .update(`novedades:${usuario.id}:${usuario.email.toLowerCase()}`)
      .digest('base64url');
  }

  private firmaDesuscripcionValida(usuario: { id: number; email: string }, firma: string) {
    const esperada = Buffer.from(this.generarFirmaDesuscripcion(usuario));
    const recibida = Buffer.from(firma);
    return esperada.length === recibida.length && timingSafeEqual(esperada, recibida);
  }

  private obtenerUrlFrontend() {
    const url = process.env.FRONTEND_URL?.split(',')[0]?.trim() || 'https://agromanagerar.com';
    return url.replace(/\/$/, '');
  }

  private escapeHtml(valor: string) {
    return valor
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
