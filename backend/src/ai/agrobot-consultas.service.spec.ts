import { AgroBotConsultasService } from './agrobot-consultas.service';

describe('AgroBotConsultasService', () => {
  const prisma = {
    asignacionCampo: { findMany: jest.fn() },
    movimientoFinanciero: { findMany: jest.fn() },
    campo: { findMany: jest.fn() },
    actividadMiembro: { findMany: jest.fn() },
    costoProductivo: { findMany: jest.fn() },
    lote: { findMany: jest.fn() },
    gastoMaquinaria: { findMany: jest.fn() },
    mantenimientoMaquinaria: { findMany: jest.fn() },
    maquinaria: { findMany: jest.fn() },
  } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const service = new AgroBotConsultasService(prisma, memberAccessService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calcula los egresos del periodo dentro de la organizacion activa', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    prisma.movimientoFinanciero.findMany.mockResolvedValue([
      { tipo: 'EGRESO', monto: 125000, fecha: new Date() },
      { tipo: 'INGRESO', monto: 80000, fecha: new Date() },
      { tipo: 'EGRESO', monto: 75000, fecha: new Date() },
    ]);

    const respuesta = await service.responder(4, 19, 'Cuanto gaste este mes?');

    expect(respuesta?.texto).toContain('200.000');
    expect(prisma.movimientoFinanciero.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ organizacionId: 19 }),
      }),
    );
  });

  it('restringe los movimientos de un miembro a sus campos asignados', async () => {
    memberAccessService.requireModule.mockResolvedValue({
      esOwner: false,
      usuarioOrganizacionId: 81,
    });
    prisma.asignacionCampo.findMany.mockResolvedValue([{ campoId: 33 }]);
    prisma.movimientoFinanciero.findMany.mockResolvedValue([]);

    await service.responder(7, 12, 'Cuanto gaste este mes?');

    expect(prisma.movimientoFinanciero.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          organizacionId: 12,
          OR: [
            { campoId: { in: [33] } },
            { siembra: { lote: { campoId: { in: [33] } } } },
          ],
        }),
      }),
    );
  });

  it('identifica gastos de fertilizacion por concepto dentro del periodo solicitado', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    prisma.movimientoFinanciero.findMany.mockResolvedValue([
      { tipo: 'EGRESO', monto: 85000, fecha: new Date(), concepto: 'Urea para fertilizacion', categoria: 'INSUMO' },
      { tipo: 'EGRESO', monto: 30000, fecha: new Date(), concepto: 'Reparacion de bomba', categoria: 'MANTENIMIENTO' },
    ]);

    const respuesta = await service.responder(
      4,
      19,
      'Cuanto gaste en fertilizacion durante septiembre?',
    );

    expect(respuesta?.texto).toContain('85.000');
    expect(respuesta?.texto).not.toContain('115.000');
  });

  it('calcula hectareas solo con los campos visibles para un miembro', async () => {
    memberAccessService.requireModule.mockResolvedValue({
      esOwner: false,
      usuarioOrganizacionId: 90,
    });
    prisma.asignacionCampo.findMany.mockResolvedValue([{ campoId: 5 }]);
    prisma.campo.findMany.mockResolvedValue([
      { id: 5, nombre: 'La Esperanza', hectareas: 120 },
    ]);

    const respuesta = await service.responder(15, 20, 'Cuantas hectareas tengo registradas?');

    expect(respuesta?.texto).toContain('120 hectareas');
    expect(prisma.campo.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { organizacionId: 20, id: { in: [5] } },
      }),
    );
  });
});
