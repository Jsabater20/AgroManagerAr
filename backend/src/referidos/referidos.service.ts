import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Injectable()
export class ReferidosService {
  constructor(
    private prisma: PrismaService,
    private notificacionesService: NotificacionesService,
  ) {}

  async buscarReferentePorCodigo(codigo: string) {
    const referente = await this.prisma.usuario.findUnique({
      where: { codigoReferido: codigo.trim() },
      select: { id: true },
    });
    if (!referente) {
      throw new BadRequestException('El código de referido no es válido.');
    }
    return referente;
  }

  async registrarReferido(referenteId: number, referidoId: number) {
    if (referenteId === referidoId) {
      throw new BadRequestException('No podés usar tu propio código de referido.');
    }

    return this.prisma.referido.create({
      data: { referenteId, referidoId },
    });
  }

  async marcarEmailVerificado(usuarioId: number) {
    await this.actualizarEstado(usuarioId);
  }

  async marcarPrimerCampoCreado(usuarioId: number) {
    await this.actualizarEstado(usuarioId);
  }

  async getResumen(usuarioId: number) {
    const [usuario, referidos] = await Promise.all([
      this.prisma.usuario.findUniqueOrThrow({
        where: { id: usuarioId },
        select: { codigoReferido: true },
      }),
      this.prisma.referido.findMany({
        where: { referenteId: usuarioId },
        select: {
          id: true,
          registradoEn: true,
          emailVerificadoEn: true,
          primerCampoCreadoEn: true,
          validadoEn: true,
          referido: { select: { nombre: true, apellido: true, email: true } },
        },
        orderBy: { registradoEn: 'desc' },
      }),
    ]);

    const validos = referidos.filter((referido) => referido.validadoEn).length;
    return {
      codigo: usuario.codigoReferido,
      validos,
      pendientes: referidos.length - validos,
      referidos,
    };
  }

  private async actualizarEstado(usuarioId: number) {
    const referido = await this.prisma.referido.findUnique({
      where: { referidoId: usuarioId },
      select: {
        id: true,
        referenteId: true,
        emailVerificadoEn: true,
        primerCampoCreadoEn: true,
        validadoEn: true,
      },
    });
    if (!referido || referido.validadoEn) return;

    const [usuario, primerCampo] = await Promise.all([
      this.prisma.usuario.findUnique({
        where: { id: usuarioId },
        select: { emailVerificado: true },
      }),
      this.prisma.campo.findFirst({
        where: { usuarioId },
        select: { id: true },
      }),
    ]);

    const ahora = new Date();
    const emailVerificadoEn = referido.emailVerificadoEn ?? (usuario?.emailVerificado ? ahora : null);
    const primerCampoCreadoEn = referido.primerCampoCreadoEn ?? (primerCampo ? ahora : null);
    const validadoEn = emailVerificadoEn && primerCampoCreadoEn ? ahora : null;

    if (emailVerificadoEn || primerCampoCreadoEn || validadoEn) {
      await this.prisma.referido.update({
        where: { id: referido.id },
        data: { emailVerificadoEn, primerCampoCreadoEn, validadoEn },
      });
      if (validadoEn) {
        void this.notificacionesService.notificarReferidosListos(referido.referenteId);
      }
    }
  }
}
