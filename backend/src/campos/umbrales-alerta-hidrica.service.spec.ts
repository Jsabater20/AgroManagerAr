import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReferidosService } from '../referidos/referidos.service';
import { CamposService } from './campos.service';

describe('CamposService - umbrales de alerta hídrica', () => {
  let prisma: {
    campo: { findFirst: jest.Mock };
    umbralAlertaHidricaCampo: { findUnique: jest.Mock; upsert: jest.Mock };
  };
  let memberAccessService: { requireModule: jest.Mock; requireCampo: jest.Mock };
  let planService: { isOrgPro: jest.Mock; checkProAccess: jest.Mock };
  let service: CamposService;

  beforeEach(() => {
    prisma = {
      campo: { findFirst: jest.fn().mockResolvedValue({ id: 7 }) },
      umbralAlertaHidricaCampo: { findUnique: jest.fn(), upsert: jest.fn() },
    };
    memberAccessService = {
      requireModule: jest.fn(),
      requireCampo: jest.fn(),
    };
    planService = {
      isOrgPro: jest.fn().mockResolvedValue(true),
      checkProAccess: jest.fn().mockResolvedValue(undefined),
    };
    service = new CamposService(
      prisma as unknown as PrismaService,
      planService as unknown as PlanService,
      memberAccessService as unknown as MemberAccessService,
      {} as ReferidosService,
    );
  });

  it('devuelve valores preventivos por defecto sin crear configuración', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    prisma.umbralAlertaHidricaCampo.findUnique.mockResolvedValue(null);

    await expect(service.obtenerUmbralAlertaHidrica(7, 3, 2)).resolves.toMatchObject({
      campoId: 7,
      activo: true,
      lluviaDiariaMm: 25,
      lluviaAcumulada48hMm: 50,
      probabilidadLluviaPct: 70,
      configurado: false,
    });
  });

  it('mantiene los valores personalizados bloqueados en Free sin borrar la configuración guardada', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    planService.isOrgPro.mockResolvedValue(false);

    await expect(service.obtenerUmbralAlertaHidrica(7, 3, 2)).resolves.toMatchObject({
      campoId: 7,
      configurado: false,
      puedeEditar: false,
      esPro: false,
    });
    expect(prisma.umbralAlertaHidricaCampo.findUnique).not.toHaveBeenCalled();
  });

  it('solo permite al owner configurar los umbrales', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: false, usuarioOrganizacionId: 9 });

    await expect(service.actualizarUmbralAlertaHidrica(7, {
      activo: true,
      lluviaDiariaMm: 30,
      lluviaAcumulada48hMm: 60,
      probabilidadLluviaPct: 75,
      crearAccionesAutomaticas: false,
    }, 3, 2)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rechaza la edición de umbrales personalizados para organizaciones Free', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    planService.checkProAccess.mockRejectedValue(new ForbiddenException('Solo Pro'));

    await expect(service.actualizarUmbralAlertaHidrica(7, {
      activo: true,
      lluviaDiariaMm: 30,
      lluviaAcumulada48hMm: 60,
      probabilidadLluviaPct: 75,
      crearAccionesAutomaticas: false,
    }, 3, 2)).rejects.toBeInstanceOf(ForbiddenException);

    expect(prisma.umbralAlertaHidricaCampo.upsert).not.toHaveBeenCalled();
  });

  it('rechaza un acumulado menor que el umbral diario', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });

    await expect(service.actualizarUmbralAlertaHidrica(7, {
      activo: true,
      lluviaDiariaMm: 60,
      lluviaAcumulada48hMm: 40,
      probabilidadLluviaPct: 75,
      crearAccionesAutomaticas: false,
    }, 3, 2)).rejects.toBeInstanceOf(BadRequestException);

    expect(prisma.umbralAlertaHidricaCampo.upsert).not.toHaveBeenCalled();
  });
});
