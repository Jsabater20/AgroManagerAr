import { BadRequestException } from '@nestjs/common';
import { CostosProductivosService } from './costos-productivos.service';

describe('CostosProductivosService', () => {
  const tx = {
    movimientoFinanciero: { create: jest.fn() },
    costoProductivo: { create: jest.fn() },
    auditoriaLog: { create: jest.fn() },
  } as any;
  const prisma = {
    actividadMiembro: { findFirst: jest.fn() },
    lote: { findFirst: jest.fn() },
    campo: { findFirst: jest.fn() },
    siembra: { findFirst: jest.fn() },
    maquinaria: { findFirst: jest.fn() },
    campania: { findFirst: jest.fn() },
    costoProductivo: { findUnique: jest.fn(), findMany: jest.fn() },
    $transaction: jest.fn(),
  } as any;
  const planService = { checkProAccess: jest.fn() } as any;
  const service = new CostosProductivosService(prisma, planService);

  beforeEach(() => {
    jest.clearAllMocks();
    planService.checkProAccess.mockResolvedValue(undefined);
    prisma.actividadMiembro.findFirst.mockResolvedValue({
      id: 8,
      titulo: 'Aplicar fertilizante',
      estado: 'COMPLETADA',
      recursoTipo: 'LOTE',
      recursoId: 12,
      calculoOrigenId: 44,
    });
    prisma.lote.findFirst.mockResolvedValue({ id: 12, campoId: 7 });
    prisma.costoProductivo.findUnique.mockResolvedValue(null);
    tx.movimientoFinanciero.create.mockResolvedValue({ id: 90 });
    tx.costoProductivo.create.mockResolvedValue({ id: 91, monto: 120000 });
    tx.auditoriaLog.create.mockResolvedValue({ id: 1 });
    prisma.$transaction.mockImplementation((callback: (client: typeof tx) => unknown) =>
      callback(tx),
    );
  });

  it('crea un único egreso financiero vinculado al costo real del trabajo', async () => {
    await service.crearDesdeActividad(
      1,
      8,
      {
        rubro: 'INSUMO',
        descripcion: 'Fertilizante aplicado',
        monto: 120000,
        fecha: '2026-10-28',
        idempotencyKey: 'costo-actividad-8-1',
      },
      10,
    );

    expect(tx.movimientoFinanciero.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          organizacionId: 1,
          tipo: 'EGRESO',
          origen: 'COSTO_PRODUCTIVO',
          categoria: 'INSUMO',
          campoId: 7,
        }),
      }),
    );
    expect(tx.costoProductivo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          actividadId: 8,
          calculoGuardadoId: 44,
          movimientoFinancieroId: 90,
          loteId: 12,
          tipo: 'REAL',
        }),
      }),
    );
  });

  it('no permite cargar un costo real antes de completar el trabajo', async () => {
    prisma.actividadMiembro.findFirst.mockResolvedValueOnce({
      id: 8,
      titulo: 'Aplicar fertilizante',
      estado: 'EN_PROGRESO',
      recursoTipo: 'LOTE',
      recursoId: 12,
      calculoOrigenId: null,
    });

    await expect(
      service.crearDesdeActividad(
        1,
        8,
        {
          rubro: 'INSUMO',
          descripcion: 'Fertilizante aplicado',
          monto: 120000,
          fecha: '2026-10-28',
        },
        10,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});
