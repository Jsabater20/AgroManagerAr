import { Injectable } from '@nestjs/common';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnaliticaService {
  constructor(
    private prisma: PrismaService,
    private memberAccessService: MemberAccessService,
    private planService: PlanService,
  ) {}

  async getRentabilidad(usuarioId: number, organizacionId: number) {
    await this.memberAccessService.requireModule(
      usuarioId,
      organizacionId,
      'Reportes',
    );
    await this.planService.checkProAccess(
      organizacionId,
      'Rentabilidad y reportes',
    );

    const [movimientos, siembras, campanias] = await Promise.all([
      this.prisma.movimientoFinanciero.findMany({
        where: { organizacionId },
        select: { tipo: true, categoria: true, monto: true, fecha: true },
      }),
      this.prisma.siembra.findMany({
        where: { lote: { campo: { organizacionId } } },
        select: {
          estado: true,
          aplicaciones: { select: { id: true } },
          cosechas: { select: { totalKg: true } },
        },
      }),
      this.prisma.campania.findMany({
        where: { organizacionId },
        orderBy: { fechaInicio: 'desc' },
        select: {
          id: true,
          nombre: true,
          fechaInicio: true,
          fechaFin: true,
          siembras: {
            select: {
              cosechas: { select: { totalKg: true } },
            },
          },
        },
      }),
    ]);

    const ingresos = this.totalMovimientos(movimientos, 'INGRESO');
    const egresos = this.totalMovimientos(movimientos, 'EGRESO');
    const produccionKg = siembras.reduce(
      (total, siembra) =>
        total + siembra.cosechas.reduce((sum, cosecha) => sum + cosecha.totalKg, 0),
      0,
    );
    const produccion = {
      siembras: siembras.length,
      enCurso: siembras.filter((siembra) => siembra.estado === 'EN_CURSO').length,
      cosechadas: siembras.filter((siembra) => siembra.estado === 'COSECHADA').length,
      perdidas: siembras.filter((siembra) => siembra.estado === 'PERDIDA').length,
      cosechas: siembras.reduce(
        (total, siembra) => total + siembra.cosechas.length,
        0,
      ),
      aplicaciones: siembras.reduce(
        (total, siembra) => total + siembra.aplicaciones.length,
        0,
      ),
      totalKg: produccionKg,
    };
    const egresosPorCategoria = Object.entries(
      movimientos
        .filter((movimiento) => movimiento.tipo === 'EGRESO')
        .reduce<Record<string, number>>((categorias, movimiento) => {
          categorias[movimiento.categoria] =
            (categorias[movimiento.categoria] ?? 0) + movimiento.monto;
          return categorias;
        }, {}),
    )
      .map(([categoria, monto]) => ({ categoria, monto }))
      .sort((a, b) => b.monto - a.monto);
    const ahora = new Date();
    const campaniasResumen = campanias.map((campania) => {
      const inicio = campania.fechaInicio.getTime();
      const fin = (campania.fechaFin ?? ahora).getTime();
      const movimientosCampania = movimientos.filter((movimiento) => {
        const fecha = movimiento.fecha.getTime();
        return fecha >= inicio && fecha <= fin;
      });
      const ingresosCampania = this.totalMovimientos(
        movimientosCampania,
        'INGRESO',
      );
      const egresosCampania = this.totalMovimientos(
        movimientosCampania,
        'EGRESO',
      );
      const margen = ingresosCampania - egresosCampania;
      const totalKg = campania.siembras.reduce(
        (total, siembra) =>
          total + siembra.cosechas.reduce((sum, cosecha) => sum + cosecha.totalKg, 0),
        0,
      );

      return {
        id: campania.id,
        nombre: campania.nombre,
        fechaInicio: campania.fechaInicio,
        fechaFin: campania.fechaFin,
        siembras: campania.siembras.length,
        produccionKg: totalKg,
        ingresos: ingresosCampania,
        egresos: egresosCampania,
        margen,
        rentabilidad:
          ingresosCampania > 0
            ? Math.round((margen / ingresosCampania) * 100)
            : 0,
      };
    });

    return {
      resumen: { ingresos, egresos, saldo: ingresos - egresos, produccionKg },
      produccion,
      egresosPorCategoria,
      campanias: campaniasResumen,
    };
  }

  private totalMovimientos(
    movimientos: Array<{ tipo: string; monto: number }>,
    tipo: string,
  ) {
    return movimientos
      .filter((movimiento) => movimiento.tipo === tipo)
      .reduce((total, movimiento) => total + movimiento.monto, 0);
  }
}
