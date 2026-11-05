import {
  EstadoAsignacionPromocion,
  EstadoCampaniaPromocional,
  OrigenAsignacionPromocion,
} from '@prisma/client';
import { PromocionesService } from './promociones.service';

describe('PromocionesService', () => {
  it('finaliza campañas vencidas sin modificar beneficios otorgados', async () => {
    const updateMany = jest.fn(async () => ({ count: 1 }));
    const prisma = { campaniaPromocional: { updateMany } } as any;
    const service = new PromocionesService(prisma);
    const referencia = new Date('2027-01-01T03:00:00.000Z');

    await expect(service.finalizarCampaniasVencidas(referencia)).resolves.toBe(1);
    expect(updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ finNuevosRegistros: { lte: referencia } }),
      data: {
        estado: EstadoCampaniaPromocional.FINALIZADA,
        mostrarEnSitio: false,
      },
    }));
  });

  it('no duplica ni extiende una asignación al ejecutarla otra vez', async () => {
    const fechaInicio = new Date('2026-11-05T15:00:00.000Z');
    let asignacionGuardada: any = null;
    const tx = {
      asignacionPromocion: {
        findUnique: jest.fn(async () => asignacionGuardada),
        create: jest.fn(async ({ data }) => {
          asignacionGuardada = {
            id: 24,
            estado: data.estado,
            fechaInicio: data.fechaInicio,
            fechaFin: data.fechaFin,
            detalle: data.detalle,
            beneficios: [{ organizacionId: 8 }],
          };
          return asignacionGuardada;
        }),
      },
      organizacion: {
        findMany: jest.fn(async () => [{ id: 8 }]),
      },
      beneficioProOrganizacion: {
        createMany: jest.fn(async () => ({ count: 1 })),
      },
    };
    const prisma = {
      campaniaPromocional: {
        findUnique: jest.fn(async () => ({
          id: 4,
          estado: EstadoCampaniaPromocional.ACTIVA,
          duracionMeses: 3,
          incluyeOrganizacionesEmpresa: false,
        })),
      },
      $transaction: jest.fn(async (callback) => callback(tx)),
      asignacionPromocion: {
        findUnique: jest.fn(async () => asignacionGuardada),
      },
    } as any;
    const service = new PromocionesService(prisma);
    const solicitud = {
      campaniaId: 4,
      usuarioId: 12,
      otorgadoPorId: 1,
      origen: OrigenAsignacionPromocion.EXISTENTE,
      fechaInicio,
    };

    const primera = await service.asignarPromocion(solicitud);
    const segunda = await service.asignarPromocion(solicitud);

    expect(primera.creada).toBe(true);
    expect(primera.estado).toBe(EstadoAsignacionPromocion.ASIGNADA);
    expect(segunda.creada).toBe(false);
    expect(segunda.fechaFin).toEqual(primera.fechaFin);
    expect(tx.beneficioProOrganizacion.createMany).toHaveBeenCalledTimes(1);
  });
});
