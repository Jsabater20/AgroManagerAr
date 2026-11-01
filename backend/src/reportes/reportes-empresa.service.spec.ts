import { ReportesEmpresaService } from './reportes-empresa.service';

describe('ReportesEmpresaService', () => {
  const prisma = {
    organizacion: { findMany: jest.fn() },
    campo: { findMany: jest.fn() },
    cosecha: { findMany: jest.fn() },
    actividadMiembro: { findMany: jest.fn() },
    movimientoFinanciero: { findMany: jest.fn() },
    costoProductivo: { findMany: jest.fn() },
  } as any;
  const empresaAccessService = {
    requerirConsultaOperativa: jest.fn(),
    requerirConsultaFinanciera: jest.fn(),
  } as any;
  const alertasService = { listarParaOrganizaciones: jest.fn() } as any;
  const service = new ReportesEmpresaService(prisma, empresaAccessService, alertasService);

  beforeEach(() => {
    jest.clearAllMocks();
    empresaAccessService.requerirConsultaOperativa.mockResolvedValue({
      empresa: { id: 3, nombre: 'Empresa Norte' },
      organizacionesIds: [11],
    });
    empresaAccessService.requerirConsultaFinanciera.mockRejectedValue(new Error('Sin permiso'));
    prisma.organizacion.findMany.mockResolvedValue([{ id: 11, nombre: 'Establecimiento Uno' }]);
    prisma.campo.findMany.mockResolvedValue([{ organizacionId: 11, hectareas: 120 }]);
    prisma.cosecha.findMany.mockResolvedValue([]);
    prisma.actividadMiembro.findMany.mockResolvedValue([]);
    prisma.movimientoFinanciero.findMany.mockResolvedValue([]);
    prisma.costoProductivo.findMany.mockResolvedValue([]);
    alertasService.listarParaOrganizaciones.mockResolvedValue([]);
  });

  it('no expone finanzas empresariales si el rol no tiene ese permiso', async () => {
    const reporte = await service.obtenerConsolidado(8, 3, 'MENSUAL', new Date('2026-10-15T12:00:00Z'));

    expect(reporte.accesoFinanciero).toMatchObject({ nivel: 'SIN_ACCESO', establecimientosIncluidos: 0 });
    expect(reporte.resumen.finanzas).toBeNull();
    expect(reporte.establecimientos[0].finanzas).toBeNull();
    expect(prisma.movimientoFinanciero.findMany).not.toHaveBeenCalled();
    expect(prisma.costoProductivo.findMany).not.toHaveBeenCalled();
  });
});
