import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

class TooManyRequestsException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}

type ReservaUsoAgroBot = {
  fecha: Date;
  aviso: string | null;
};

@Injectable()
export class AgroBotLimitesService {
  private readonly limiteDiario = this.leerLimite('AGROBOT_IA_LIMITE_DIARIO', 20);
  private readonly limiteMensual = this.leerLimite('AGROBOT_IA_LIMITE_MENSUAL', 250);

  constructor(private readonly prisma: PrismaService) {}

  async reservarConsultaGemini(
    usuarioId: number,
    organizacionId: number,
  ): Promise<ReservaUsoAgroBot> {
    const fecha = this.inicioDelDia();
    const inicioMes = new Date(
      Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), 1),
    );

    return this.prisma.$transaction(async (tx) => {
      const usoDiario = await tx.usoAgroBotIa.upsert({
        where: {
          usuarioId_organizacionId_fecha: { usuarioId, organizacionId, fecha },
        },
        create: { usuarioId, organizacionId, fecha, consultas: 1 },
        update: { consultas: { increment: 1 } },
      });
      const usoMensual = await tx.usoAgroBotIa.aggregate({
        where: { usuarioId, organizacionId, fecha: { gte: inicioMes } },
        _sum: { consultas: true },
      });
      const consultasMensuales = usoMensual._sum.consultas ?? 0;

      if (usoDiario.consultas > this.limiteDiario) {
        throw new TooManyRequestsException(
          `Alcanzaste el límite diario de ${this.limiteDiario} consultas con IA. Las consultas operativas de AgroBot no consumen este cupo.`,
        );
      }
      if (consultasMensuales > this.limiteMensual) {
        throw new TooManyRequestsException(
          `Alcanzaste el límite mensual de ${this.limiteMensual} consultas con IA. Las consultas operativas de AgroBot no consumen este cupo.`,
        );
      }

      return {
        fecha,
        aviso: this.crearAviso(usoDiario.consultas, consultasMensuales),
      };
    });
  }

  async liberarReserva(usuarioId: number, organizacionId: number, fecha: Date) {
    await this.prisma.usoAgroBotIa.updateMany({
      where: { usuarioId, organizacionId, fecha, consultas: { gt: 0 } },
      data: { consultas: { decrement: 1 } },
    });
  }

  private crearAviso(consultasDiarias: number, consultasMensuales: number) {
    const restantesDiarias = this.limiteDiario - consultasDiarias;
    const restantesMensuales = this.limiteMensual - consultasMensuales;
    const cercaDelLimiteDiario = restantesDiarias <= 3 || consultasDiarias / this.limiteDiario >= 0.8;
    const cercaDelLimiteMensual = restantesMensuales <= 10 || consultasMensuales / this.limiteMensual >= 0.8;

    if (!cercaDelLimiteDiario && !cercaDelLimiteMensual) return null;
    if (restantesDiarias <= restantesMensuales) {
      return `Te quedan ${Math.max(restantesDiarias, 0)} consulta${restantesDiarias === 1 ? '' : 's'} con IA disponibles hoy.`;
    }
    return `Te quedan ${Math.max(restantesMensuales, 0)} consulta${restantesMensuales === 1 ? '' : 's'} con IA disponibles este mes.`;
  }

  private inicioDelDia() {
    const ahora = new Date();
    return new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate()));
  }

  private leerLimite(nombreVariable: string, valorPredeterminado: number) {
    const valor = Number(process.env[nombreVariable]);
    return Number.isInteger(valor) && valor > 0 ? valor : valorPredeterminado;
  }
}
