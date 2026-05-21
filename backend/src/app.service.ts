import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

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
    const gmailUser = process.env.EMAIL_USER;
    const gmailPass = process.env.EMAIL_PASS;
    if (!gmailUser || !gmailPass)
      throw new InternalServerErrorException('Email service not configured');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      family: 4,     // forzar IPv4 (Railway no soporta IPv6 saliente)
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"AgroManager AR" <${gmailUser}>`,
      to: gmailUser,
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
  }
}
