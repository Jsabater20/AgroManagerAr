import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { MailerService } from '../mailer/mailer.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  periodoMensualCerrado,
  periodoSemanalCerrado,
  ZONA_HORARIA_REPORTES_DEFAULT,
} from './reportes-periodos';
import { ReportesService } from './reportes.service';

type TipoEnvio = 'SEMANAL' | 'MENSUAL';

@Injectable()
export class ReportesAutomaticosService {
  private readonly logger = new Logger(ReportesAutomaticosService.name);
  private readonly frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5174';

  constructor(
    private readonly prisma: PrismaService,
    private readonly reportesService: ReportesService,
    private readonly mailerService: MailerService,
    private readonly planService: PlanService,
  ) {}

  @Cron('0 9 * * 1', { timeZone: ZONA_HORARIA_REPORTES_DEFAULT })
  async enviarInformesSemanales() {
    await this.procesarEnvios('SEMANAL');
  }

  @Cron('0 9 1 * *', { timeZone: ZONA_HORARIA_REPORTES_DEFAULT })
  async enviarInformesMensuales() {
    await this.procesarEnvios('MENSUAL');
  }

  private async procesarEnvios(tipo: TipoEnvio) {
    const ahora = new Date();
    const periodo = tipo === 'SEMANAL'
      ? periodoSemanalCerrado(ahora)
      : periodoMensualCerrado(ahora);
    const preferencias = await this.prisma.preferenciaReporte.findMany({
      where: { envioAutomatico: true, frecuenciaEnvio: tipo },
      select: {
        usuarioId: true,
        organizacionId: true,
        usuario: { select: { email: true, nombre: true, emailVerificado: true } },
        organizacion: { select: { nombre: true } },
      },
    });

    for (const preferencia of preferencias) {
      if (!preferencia.usuario.emailVerificado) {
        this.logger.warn(`Se omitió un informe automático: el email del usuario ${preferencia.usuarioId} no está verificado.`);
        continue;
      }
      if (!await this.planService.isOrgPro(preferencia.organizacionId)) {
        this.logger.log(`Se pausó un informe automático: la organización ${preferencia.organizacionId} ya no tiene Pro activo.`);
        continue;
      }
      await this.enviarInforme(preferencia, tipo, ahora, periodo);
    }
  }

  private async enviarInforme(
    preferencia: {
      usuarioId: number;
      organizacionId: number;
      usuario: { email: string; nombre: string; emailVerificado: boolean };
      organizacion: { nombre: string };
    },
    tipo: TipoEnvio,
    fechaReferencia: Date,
    periodo: { desde: Date; hasta: Date; etiqueta: string },
  ) {
    let envioId: number;
    try {
      const envio = await this.prisma.envioReporteAutomatico.create({
        data: {
          usuarioId: preferencia.usuarioId,
          organizacionId: preferencia.organizacionId,
          tipoPeriodo: tipo,
          periodoDesde: periodo.desde,
          periodoHasta: periodo.hasta,
        },
        select: { id: true },
      });
      envioId = envio.id;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') return;
      this.logger.error(`No se pudo registrar el envío automático de reportes: ${this.mensajeError(error)}`);
      return;
    }

    try {
      const reporte = tipo === 'SEMANAL'
        ? await this.reportesService.generarSemanal(preferencia.usuarioId, preferencia.organizacionId, fechaReferencia)
        : await this.reportesService.generarMensual(preferencia.usuarioId, preferencia.organizacionId, fechaReferencia);
      const enlace = `${this.frontendUrl}/org/${preferencia.organizacionId}/reportes`;
      await this.mailerService.enviarCorreo({
        email: preferencia.usuario.email,
        asunto: `AgroManager AR: tu informe ${tipo.toLowerCase()}`,
        html: this.crearContenidoCorreo({
          nombreUsuario: preferencia.usuario.nombre,
          nombreOrganizacion: preferencia.organizacion.nombre,
          periodo: reporte.periodo.etiqueta,
          resumen: reporte.resumenInteligente?.resumen ?? reporte.resumen[0] ?? 'Informe disponible para revisar.',
          alertas: reporte.alertas.total,
          saldo: reporte.finanzas?.saldo ?? null,
          enlace,
        }),
      });
      await this.prisma.envioReporteAutomatico.update({
        where: { id: envioId },
        data: { estado: 'ENVIADO', enviadoEn: new Date(), error: null },
      });
    } catch (error) {
      const mensaje = this.mensajeError(error);
      this.logger.error(`No se pudo enviar el informe automático ${tipo} a ${preferencia.usuario.email}: ${mensaje}`);
      await this.prisma.envioReporteAutomatico.update({
        where: { id: envioId },
        data: { estado: 'ERROR', error: mensaje.slice(0, 1000) },
      });
    }
  }

  private crearContenidoCorreo({
    nombreUsuario,
    nombreOrganizacion,
    periodo,
    resumen,
    alertas,
    saldo,
    enlace,
  }: {
    nombreUsuario: string;
    nombreOrganizacion: string;
    periodo: string;
    resumen: string;
    alertas: number;
    saldo: number | null;
    enlace: string;
  }) {
    const seguro = (valor: string) => this.escaparHtml(valor);
    const saldoHtml = saldo === null
      ? ''
      : `<p style="margin: 0 0 8px;"><strong>Saldo operativo:</strong> $${saldo.toLocaleString('es-AR')}</p>`;
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
        <h1 style="color: #047857; margin-bottom: 8px;">Tu informe está listo</h1>
        <p>Hola ${seguro(nombreUsuario)},</p>
        <p>Preparamos el resumen de <strong>${seguro(nombreOrganizacion)}</strong> para el período <strong>${seguro(periodo)}</strong>.</p>
        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px;"><strong>Resumen:</strong> ${seguro(resumen)}</p>
          <p style="margin: 0 0 8px;"><strong>Alertas activas:</strong> ${alertas}</p>
          ${saldoHtml}
        </div>
        <p style="text-align: center; margin: 28px 0;">
          <a href="${seguro(enlace)}" style="display: inline-block; padding: 12px 24px; background: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Ver informe completo</a>
        </p>
        <p style="color: #6b7280; font-size: 12px;">Podés cambiar o desactivar estos envíos desde Reportes → Mis preferencias.</p>
      </div>
    `;
  }

  private escaparHtml(valor: string) {
    return valor.replace(/[&<>'"]/g, (caracter) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    })[caracter] ?? caracter);
  }

  private mensajeError(error: unknown) {
    return error instanceof Error ? error.message : 'Error desconocido';
  }
}
