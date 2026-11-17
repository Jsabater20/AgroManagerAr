import { ReportesService } from './reportes.service';

describe('ReportesService', () => {
  const prisma = { asignacionCampo: { findMany: jest.fn() } } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const planService = { isOrgPro: jest.fn() } as any;
  const alertasService = { listarParaOrganizaciones: jest.fn() } as any;
  const camposService = { obtenerResumenHidricoParaCampos: jest.fn() } as any;
  const service = new ReportesService(prisma, memberAccessService, planService, alertasService, camposService);

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.asignacionCampo.findMany.mockResolvedValue([]);
  });

  it('expone solo las capacidades básicas para una organización Free', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    planService.isOrgPro.mockResolvedValue(false);

    const capacidades = await service.obtenerCapacidades(8, 14);

    expect(capacidades.plan).toBe('FREE');
    expect(capacidades.permisos.puedeVerFinanzas).toBe(true);
    expect(capacidades.funcionalidades).toMatchObject({
      resumenBasicoManual: true,
      semanalMensual: false,
      pdfProfesional: false,
      automatizacion: false,
    });
  });

  it('no concede datos financieros a un miembro sin el módulo Finanzas', async () => {
    memberAccessService.requireModule
      .mockResolvedValueOnce({ esOwner: false, usuarioOrganizacionId: 3 })
      .mockRejectedValueOnce(new Error('Módulo no habilitado'));
    planService.isOrgPro.mockResolvedValue(true);

    const capacidades = await service.obtenerCapacidades(9, 15);

    expect(capacidades.plan).toBe('PRO');
    expect(capacidades.permisos).toMatchObject({ esOwner: false, puedeVerFinanzas: false });
    expect(capacidades.funcionalidades.semanalMensual).toBe(true);
  });
  it('resume producción, rendimiento y desvíos de costos por lote', () => {
    const comparativa = (service as any).crearComparativaDesglose(
      [
        {
          id: 1,
          nombre: 'Norte',
          hectareas: 50,
          campo: { id: 4, nombre: 'La Esperanza' },
          cosechaKg: 120000,
          rendimientoPromedioKgHa: 2400,
          costos: { reales: 540000, estimados: 450000, realPorHa: 10800 },
        },
        {
          id: 2,
          nombre: 'Sur',
          hectareas: 40,
          campo: { id: 4, nombre: 'La Esperanza' },
          cosechaKg: 88000,
          rendimientoPromedioKgHa: 2200,
          costos: { reales: 320000, estimados: 360000, realPorHa: 8000 },
        },
      ],
      [
        {
          id: 8,
          nombre: 'Campaña 2026',
          hectareas: 90,
          cosechaKg: 208000,
          costos: { reales: 860000, estimados: 810000, realPorHa: 9555.56 },
        },
      ],
      true,
    );

    expect(comparativa.lotes.mejorCosecha).toMatchObject({ nombre: 'Norte', valor: 120000 });
    expect(comparativa.lotes.mejorRendimiento).toMatchObject({ nombre: 'Norte', valor: 2400 });
    expect(comparativa.lotes.costos?.mayorCostoPorHa).toMatchObject({ nombre: 'Norte', valor: 10800 });
    expect(comparativa.lotes.costos?.mayorDesvio).toMatchObject({ nombre: 'Norte', valor: 20 });
  });
});
