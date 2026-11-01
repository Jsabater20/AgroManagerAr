import { AnaliticaService } from './analitica.service';

describe('AnaliticaService', () => {
  const prisma = {
    asignacionCampo: { findMany: jest.fn() },
    lote: { findMany: jest.fn() },
    campania: { findMany: jest.fn() },
    movimientoFinanciero: { findMany: jest.fn() },
    costoProductivo: { findMany: jest.fn() },
  } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const planService = { checkProAccess: jest.fn() } as any;
  const service = new AnaliticaService(prisma, memberAccessService, planService);

  beforeEach(() => {
    jest.clearAllMocks();
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    planService.checkProAccess.mockResolvedValue(undefined);
    prisma.lote.findMany.mockResolvedValue([
      {
        id: 7,
        nombre: 'Lote norte',
        hectareas: 100,
        campo: { id: 1, nombre: 'El Ombú' },
        siembras: [{
          id: 15,
          campaniaId: 3,
          estado: 'EN_CURSO',
          tipoCultivo: { nombre: 'Soja' },
          cosechas: [{ totalKg: 12000 }],
        }],
      },
    ]);
    prisma.campania.findMany.mockResolvedValue([
      { id: 3, nombre: 'Campaña 2026', fechaInicio: new Date('2026-06-01'), fechaFin: null },
    ]);
    prisma.movimientoFinanciero.findMany.mockResolvedValue([
      { id: 1, tipo: 'INGRESO', categoria: 'COSECHA', concepto: 'Venta soja', monto: 500000, fecha: new Date(), origen: 'MANUAL', campoId: 1, siembraId: 15 },
      { id: 2, tipo: 'EGRESO', categoria: 'INSUMO', concepto: 'Fertilizante', monto: 120000, fecha: new Date(), origen: 'COSTO_PRODUCTIVO', campoId: 1, siembraId: 15 },
      { id: 3, tipo: 'EGRESO', categoria: 'SERVICIO', concepto: 'Gasto sin cultivo', monto: 25000, fecha: new Date(), origen: 'MANUAL', campoId: 1, siembraId: null },
    ]);
    prisma.costoProductivo.findMany.mockResolvedValue([
      { id: 20, tipo: 'REAL', rubro: 'INSUMO', monto: 120000, fecha: new Date(), campoId: 1, loteId: 7, siembraId: 15, campaniaId: 3 },
      { id: 21, tipo: 'ESTIMADO', rubro: 'INSUMO', monto: 100000, fecha: new Date(), campoId: 1, loteId: 7, siembraId: null, campaniaId: null },
    ]);
  });

  it('atribuye costos y movimientos por relación, sin duplicar el egreso generado desde un costo', async () => {
    const reporte = await service.getRentabilidad(10, 1);

    expect(reporte.lotes[0]).toEqual(expect.objectContaining({
      ingresos: 500000,
      costosReales: 120000,
      costosEstimados: 100000,
      egresos: 120000,
      margen: 380000,
    }));
    expect(reporte.campanias[0]).toEqual(expect.objectContaining({
      ingresos: 500000,
      costosReales: 120000,
      egresos: 120000,
      margen: 380000,
    }));
    expect(reporte.sinAsignar.egresosManuales).toBe(25000);
  });
});
