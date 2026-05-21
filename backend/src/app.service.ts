import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendContactEmail(
    nombre: string,
    email: string,
    asunto: string,
    mensaje: string,
  ): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !toEmail)
      throw new InternalServerErrorException('Email service not configured');

    const resend = new Resend(apiKey);

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

    const { error } = await resend.emails.send({
      from: `AgroManager AR <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: asunto ? `[Contacto] ${asunto}` : `[Contacto] Consulta de ${nombre}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#166534;margin-bottom:4px">Nueva consulta desde AgroManager AR</h2>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Asunto:</strong> ${asunto || '—'}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
          <p style="white-space:pre-line">${mensaje}</p>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend] error sending email:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
