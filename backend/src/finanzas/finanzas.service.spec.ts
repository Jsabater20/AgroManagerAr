import { BadRequestException } from '@nestjs/common';
import { FinanzasService } from './finanzas.service';

describe('FinanzasService', () => {
  const prisma = {
    campo: { findFirst: jest.fn() },
    siembra: { findFirst: jest.fn() },
    asignacionCampo: { findFirst: jest.fn() },
    movimientoFinanciero: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const service = new FinanzasService(prisma, memberAccessService);

  beforeEach(() => {
    jest.clearAllMocks();
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    prisma.campo.findFirst.mockResolvedValue({ id: 7 });
  });

  it('normaliza el campo de una siembra de la misma organización', async () => {
    prisma.siembra.findFirst.mockResolvedValue({ lote: { campoId: 7 } });
    prisma.movimientoFinanciero.create.mockResolvedValue({ id: 1 });

    await service.create(10, 1, {
      tipo: 'EGRESO',
      concepto: 'Fertilización lote norte',
      monto: 120000,
      fecha: '2026-10-28',
      categoria: 'INSUMO',
      siembraId: 25,
    });

    expect(prisma.movimientoFinanciero.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          organizacionId: 1,
          campoId: 7,
          siembraId: 25,
        }),
      }),
    );
  });

  it('rechaza una siembra que no corresponde al campo indicado', async () => {
    prisma.siembra.findFirst.mockResolvedValue({ lote: { campoId: 7 } });

    await expect(
      service.create(10, 1, {
        tipo: 'EGRESO',
        concepto: 'Fertilización lote norte',
        monto: 120000,
        fecha: '2026-10-28',
        categoria: 'INSUMO',
        campoId: 8,
        siembraId: 25,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prisma.movimientoFinanciero.create).not.toHaveBeenCalled();
  });
});
