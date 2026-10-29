import { ActividadesService } from './actividades.service';

describe('ActividadesService', () => {
  const prisma = {
    organizacion: { findUnique: jest.fn() },
    calculoGuardado: { findFirst: jest.fn() },
  } as any;
  const planService = {
    isOrgPro: jest.fn(),
    checkActividadesActivasLimit: jest.fn(),
  } as any;
  const notificacionesService = { notificarUsuario: jest.fn() } as any;
  const service = new ActividadesService(
    prisma,
    planService,
    notificacionesService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    planService.isOrgPro.mockResolvedValue(true);
    prisma.organizacion.findUnique.mockResolvedValue({ propietarioId: 10 });
  });

  it('conserva el cálculo de origen al crear un trabajo', async () => {
    prisma.calculoGuardado.findFirst.mockResolvedValue({
      id: 44,
      campoId: 7,
      loteId: 12,
      maquinariaId: null,
    });
    const crearSpy = jest
      .spyOn(service, 'crear')
      .mockResolvedValue({ id: 99 } as any);

    await service.crearDesdeCalculo(
      1,
      {
        titulo: 'Aplicar fertilizante',
        usuarioOrganizacionId: 3,
        recursoTipo: 'LOTE' as any,
        recursoId: 12,
        calculoOrigenId: 44,
        fechaInicio: '2026-10-28',
        prioridad: 'MEDIA' as any,
      },
      10,
    );

    expect(crearSpy).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ calculoOrigenId: 44 }),
      10,
      44,
    );
  });
});
