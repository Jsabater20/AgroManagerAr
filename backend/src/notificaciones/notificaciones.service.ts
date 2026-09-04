import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegistrarDispositivoPushDto } from './dto/registrar-dispositivo-push.dto';

interface NotificacionPush {
  titulo: string;
  mensaje: string;
  datos: Record<string, string | number>;
}

interface CrearNotificacion {
  tipo: string;
  titulo: string;
  mensaje: string;
  enlace?: string;
  dedupeKey?: string;
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

  async listar(usuarioId: number) {
    return this.prisma.notificacion.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });
  }

  async marcarLeida(usuarioId: number, notificacionId: string) {
    await this.prisma.notificacion.updateMany({
      where: { id: notificacionId, usuarioId, leidaEn: null },
      data: { leidaEn: new Date() },
    });
    return { ok: true };
  }

  async notificarReferidosListos(referenteId: number) {
    const [referente, cantidadValidos, superadmins] = await Promise.all([
      this.prisma.usuario.findUnique({
        where: { id: referenteId },
        select: { nombre: true, apellido: true, email: true },
      }),
      this.prisma.referido.count({
        where: { referenteId, validadoEn: { not: null } },
      }),
      this.prisma.usuario.findMany({
        where: { rolGlobal: 'SUPERADMIN' },
        select: { id: true },
      }),
    ]);

    if (!referente || cantidadValidos < 3) return;

    const nombre = [referente.nombre, referente.apellido].filter(Boolean).join(' ');
    const mensaje = `${nombre} (${referente.email}) alcanzó ${cantidadValidos} referidos validados. Podés otorgarle un beneficio Pro temporal.`;

    await Promise.all(superadmins.map(async (superadmin) => {
      const dedupeKey = `referidos-3-${referenteId}-admin-${superadmin.id}`;
      const existente = await this.prisma.notificacion.findUnique({
        where: { dedupeKey },
        select: { id: true },
      });
      if (existente) return;

      const notificacion = await this.prisma.notificacion.create({
        data: {
          usuarioId: superadmin.id,
          tipo: 'REFERIDOS_LISTOS',
          titulo: 'Beneficio Pro para revisar',
          mensaje,
          enlace: '/admin',
          dedupeKey,
        },
      }).catch(() => null);

      if (!notificacion) return;
      await this.notificarUsuario(superadmin.id, {
        titulo: 'Beneficio Pro para revisar',
        mensaje,
        datos: { tipo: 'REFERIDOS_LISTOS', referenteId },
      });
    }));
  }

  async notificarNuevoRegistro(
    usuarioId: number,
    tipoRegistro: 'DUENO_CAMPO' | 'EMPRESA',
  ) {
    const [usuarioNuevo, superadmins] = await Promise.all([
      this.prisma.usuario.findUnique({
        where: { id: usuarioId },
        select: { nombre: true, apellido: true, email: true },
      }),
      this.prisma.usuario.findMany({
        where: { rolGlobal: 'SUPERADMIN' },
        select: { id: true },
      }),
    ]);
    if (!usuarioNuevo) return;

    const nombre = [usuarioNuevo.nombre, usuarioNuevo.apellido]
      .filter(Boolean)
      .join(' ');
    const tipo = tipoRegistro === 'EMPRESA' ? 'empresa' : 'productor';
    const mensaje = `${nombre} (${usuarioNuevo.email}) se registró como ${tipo}.`;

    await Promise.all(superadmins.map(async (superadmin) => {
      const dedupeKey = `registro-usuario-${usuarioId}-admin-${superadmin.id}`;
      const existente = await this.prisma.notificacion.findUnique({
        where: { dedupeKey },
        select: { id: true },
      });
      if (existente) return;

      const notificacion = await this.prisma.notificacion.create({
        data: {
          usuarioId: superadmin.id,
          tipo: 'NUEVO_REGISTRO',
          titulo: 'Nuevo usuario registrado',
          mensaje,
          enlace: '/admin',
          dedupeKey,
        },
      }).catch(() => null);
      if (!notificacion) return;

      await this.notificarUsuario(superadmin.id, {
        titulo: 'Nuevo usuario registrado',
        mensaje,
        datos: { tipo: 'NUEVO_REGISTRO', usuarioId },
      });
    }));
  }

  private esTokenExpoValido(token: string): boolean {
    return /^(Expo|Exponent)PushToken\[[^\]]+\]$/.test(token);
  }
}
