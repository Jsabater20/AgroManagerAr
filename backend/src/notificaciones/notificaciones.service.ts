import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegistrarDispositivoPushDto } from './dto/registrar-dispositivo-push.dto';

interface NotificacionPush {
  titulo: string;
  mensaje: string;
  datos: Record<string, string | number>;
}

interface ExpoPushTicket {
  status: 'ok' | 'error';
  details?: { error?: string };
}

interface ExpoPushResponse {
  data?: ExpoPushTicket[];
}

@Injectable()
export class NotificacionesService {
  constructor(private readonly prisma: PrismaService) {}

  async registrarDispositivo(
    usuarioId: number,
    dto: RegistrarDispositivoPushDto,
  ) {
    return this.prisma.dispositivoPush.upsert({
      where: { expoPushToken: dto.expoPushToken },
      update: {
        usuarioId,
        plataforma: dto.plataforma,
        activo: true,
      },
      create: {
        usuarioId,
        plataforma: dto.plataforma,
        expoPushToken: dto.expoPushToken,
      },
      select: { id: true, plataforma: true, activo: true },
    });
  }

  async desactivarDispositivo(usuarioId: number, expoPushToken: string) {
    await this.prisma.dispositivoPush.updateMany({
      where: { usuarioId, expoPushToken },
      data: { activo: false },
    });
  }

  async notificarUsuario(
    usuarioId: number,
    notificacion: NotificacionPush,
  ): Promise<void> {
    try {
      const dispositivos = await this.prisma.dispositivoPush.findMany({
        where: { usuarioId, activo: true },
        select: { expoPushToken: true },
      });
      const tokens = dispositivos
        .map((dispositivo) => dispositivo.expoPushToken)
        .filter((token) => this.esTokenExpoValido(token));

      if (!tokens.length) return;

      const respuesta = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          tokens.map((to) => ({
            to,
            sound: 'default',
            title: notificacion.titulo,
            body: notificacion.mensaje,
            data: notificacion.datos,
          })),
        ),
      });

      if (!respuesta.ok) return;

      const cuerpo = (await respuesta.json()) as ExpoPushResponse;
      const tokensInvalidos = (cuerpo.data ?? [])
        .map((ticket, index) =>
          ticket.status === 'error' &&
          ticket.details?.error === 'DeviceNotRegistered'
            ? tokens[index]
            : null,
        )
        .filter((token): token is string => Boolean(token));

      if (tokensInvalidos.length) {
        await this.prisma.dispositivoPush.updateMany({
          where: { expoPushToken: { in: tokensInvalidos } },
          data: { activo: false },
        });
      }
    } catch {}
  }

  private esTokenExpoValido(token: string): boolean {
    return /^(Expo|Exponent)PushToken\[[^\]]+\]$/.test(token);
  }
}
