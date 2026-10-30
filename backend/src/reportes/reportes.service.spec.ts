import { ReportesService } from './reportes.service';

describe('ReportesService', () => {
  const prisma = { asignacionCampo: { findMany: jest.fn() } } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const planService = { isOrgPro: jest.fn() } as any;
  const alertasService = { listarParaOrganizaciones: jest.fn() } as any;
  const service = new ReportesService(prisma, memberAccessService, planService, alertasService);

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
});
