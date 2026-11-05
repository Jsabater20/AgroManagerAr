import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReferidosService } from '../referidos/referidos.service';
import { CamposService } from './campos.service';

describe('CamposService - resumen hídrico', () => {
  const prisma = {
    asignacionCampo: { findMany: jest.fn() },
    campo: { findMany: jest.fn() },
    alertaGestion: { findMany: jest.fn() },
  } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const planService = { isOrgPro: jest.fn() } as any;
  const service = new CamposService(
    prisma as PrismaService,
    planService as PlanService,
    memberAccessService as MemberAccessService,
    {} as ReferidosService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    planService.isOrgPro.mockResolvedValue(true);
  });

  it('resume riesgos, acciones y alertas de los campos disponibles', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    prisma.campo.findMany.mockResolvedValue([
      {
        id: 11,
        nombre: 'La Esperanza',
        perfilRiesgoHidrico: { nivel: 'ALTO' },
        umbralAlertaHidrica: { activo: true, crearAccionesAutomaticas: true },
        checklistHidrico: [
          { id: 1, origenAutomatico: 'ALERTA_HIDRICA' },
          { id: 2, origenAutomatico: null },
        ],
      },
      {
        id: 12,
        nombre: 'Los Álamos',
        perfilRiesgoHidrico: null,
        umbralAlertaHidrica: null,
        checklistHidrico: [],
      },
    ]);
    prisma.alertaGestion.findMany.mockResolvedValue([
      { origenId: '11', severidad: 'PRIORITARIA' },
      { origenId: '11', severidad: 'ADVERTENCIA' },
    ]);

    const resultado = await service.obtenerResumenHidricoDashboard(3, 2);

    expect(resultado.resumen).toEqual({
      totalCampos: 2,
      altoRiesgo: 1,
      sinPerfil: 1,
      accionesPendientes: 2,
      accionesAutomaticasPendientes: 1,
      alertasActivas: 2,
      automatizacionesActivas: 1,
    });
    expect(resultado.campos[0]).toMatchObject({
      id: 11,
      alertasPrioritarias: 1,
      accionesPendientes: 2,
      automatizacionActiva: true,
    });
  });
});
