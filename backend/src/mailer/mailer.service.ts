import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
  private resend: Resend;
  private readonly logger = new Logger(MailerService.name);

  constructor() {
    if (!process.env.RESEND_API_KEY) {
      this.logger.warn('RESEND_API_KEY not configured. Email functionality will not work.');
    }
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async enviarInvitacion(
    email: string,
    nombreOrganizacion: string,
    nombreInvitador: string,
    linkInvitacion: string,
  ) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #16a34a;">¡Invitación a AgroManager AR!</h1>
        <p>Hola,</p>
        <p><strong>${nombreInvitador}</strong> te ha invitado a unirte a <strong>${nombreOrganizacion}</strong> en AgroManager AR.</p>
        <p>Haz clic en el botón de abajo para aceptar la invitación:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${linkInvitacion}" style="display: inline-block; padding: 12px 30px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Aceptar Invitación
          </a>
        </p>
        <p>O copia este enlace en tu navegador:</p>
        <p style="word-break: break-all; color: #666; font-size: 12px;">${linkInvitacion}</p>
        <p style="color: #999; font-size: 12px;">Este enlace expira en 7 días.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">AgroManager AR Team</p>
      </div>
    `;

    return await this.resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: `Invitación a ${nombreOrganizacion} - AgroManager AR`,
      html: htmlContent,
    });
  }

  async enviarVerificacionEmail(email: string, linkVerificacion: string) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #16a34a;">Verifica tu email</h1>
        <p>Hola,</p>
        <p>Necesitamos verificar tu email para completar el registro en AgroManager AR.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${linkVerificacion}" style="display: inline-block; padding: 12px 30px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Verificar Email
          </a>
        </p>
        <p style="color: #999; font-size: 12px;">Este enlace expira en 24 horas.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">AgroManager AR Team</p>
      </div>
    `;

    return await this.resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Verifica tu email - AgroManager AR',
      html: htmlContent,
    });
  }

  async enviarResetPassword(email: string, linkReset: string, nombreUsuario: string) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #16a34a;">Reinicia tu contraseña</h1>
        <p>Hola ${nombreUsuario},</p>
        <p>Recibimos una solicitud para reiniciar tu contraseña en AgroManager AR.</p>
        <p>Haz clic en el botón de abajo para crear una nueva contraseña:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${linkReset}" style="display: inline-block; padding: 12px 30px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
            Reiniciar Contraseña
          </a>
        </p>
        <p style="color: #999; font-size: 12px;">Este enlace expira en 1 hora.</p>
        <p style="color: #999; font-size: 12px;">Si no solicitaste este cambio, ignora este email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">AgroManager AR Team</p>
      </div>
    `;

    return await this.resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Reinicia tu contraseña - AgroManager AR',
      html: htmlContent,
    });
  }
}
