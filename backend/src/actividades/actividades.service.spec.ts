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

  it('marca la acción preventiva como realizada al completar su trabajo', async () => {
    const tx = {
      checklistPreventivoHidrico: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      auditoriaLog: { create: jest.fn().mockResolvedValue({}) },
    } as any;

    await (service as any).sincronizarAccionPreventivaHidrica(
      tx,
      {
        id: 90,
        organizacionId: 1,
        recursoTipo: 'CAMPO',
        contexto: 'PREVENCION_HIDRICA:12',
        estado: 'EN_PROGRESO',
      },
      'COMPLETADA',
      10,
    );

    expect(tx.checklistPreventivoHidrico.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 12, organizacionId: 1 },
        data: expect.objectContaining({
          estado: 'COMPLETADO',
          completadoPorId: 10,
        }),
      }),
    );
    expect(tx.auditoriaLog.create).toHaveBeenCalled();
  });

  it('reabre la acción preventiva al reabrir su trabajo', async () => {
    const tx = {
      checklistPreventivoHidrico: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      auditoriaLog: { create: jest.fn().mockResolvedValue({}) },
    } as any;

    await (service as any).sincronizarAccionPreventivaHidrica(
      tx,
      {
        id: 90,
        organizacionId: 1,
        recursoTipo: 'CAMPO',
        contexto: 'PREVENCION_HIDRICA:12',
        estado: 'COMPLETADA',
      },
      'EN_PROGRESO',
      10,
    );

    expect(tx.checklistPreventivoHidrico.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 12, organizacionId: 1 },
        data: {
          estado: 'PENDIENTE',
          completadoEn: null,
          completadoPorId: null,
        },
      }),
    );
  });
});
