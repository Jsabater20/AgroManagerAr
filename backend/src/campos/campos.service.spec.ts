import { ForbiddenException } from '@nestjs/common';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReferidosService } from '../referidos/referidos.service';
import { CamposService } from './campos.service';

describe('CamposService - perfil de riesgo hídrico', () => {
  let prisma: {
    campo: { findFirst: jest.Mock };
    perfilRiesgoHidricoCampo: { findUnique: jest.Mock; upsert: jest.Mock };
  };
  let memberAccessService: { requireModule: jest.Mock; requireCampo: jest.Mock };
  let service: CamposService;

  beforeEach(() => {
    prisma = {
      campo: { findFirst: jest.fn().mockResolvedValue({ id: 7 }) },
      perfilRiesgoHidricoCampo: { findUnique: jest.fn(), upsert: jest.fn() },
    };
    memberAccessService = {
      requireModule: jest.fn(),
      requireCampo: jest.fn(),
    };
    service = new CamposService(
      prisma as unknown as PrismaService,
      {} as PlanService,
      memberAccessService as unknown as MemberAccessService,
      {} as ReferidosService,
    );
  });

  it('permite a un miembro asignado consultar el perfil sin configurarlo', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: false, usuarioOrganizacionId: 14 });
    prisma.perfilRiesgoHidricoCampo.findUnique.mockResolvedValue(null);

    const resultado = await service.obtenerPerfilRiesgoHidrico(7, 3, 2);

    expect(memberAccessService.requireCampo).toHaveBeenCalledWith(3, 2, 7);
    expect(resultado).toMatchObject({
      campoId: 7,
      nivel: 'MEDIO',
      configurado: false,
      puedeEditar: false,
    });
  });

  it('impide a un miembro modificar el perfil de riesgo hídrico', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: false, usuarioOrganizacionId: 14 });

    await expect(service.actualizarPerfilRiesgoHidrico(7, { nivel: 'ALTO' }, 3, 2))
      .rejects.toBeInstanceOf(ForbiddenException);

    expect(prisma.perfilRiesgoHidricoCampo.upsert).not.toHaveBeenCalled();
  });

  it('guarda el perfil completo cuando lo actualiza el owner', async () => {
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    prisma.perfilRiesgoHidricoCampo.upsert.mockResolvedValue({ id: 1, campoId: 7, nivel: 'ALTO' });

    await service.actualizarPerfilRiesgoHidrico(7, {
      nivel: 'ALTO',
      zonasBajas: 'Bajo del lote norte',
      drenajes: 'Limpiar cuneta oeste',
      sectoresSeguros: 'Potrero alto',
    }, 3, 2);

    expect(prisma.perfilRiesgoHidricoCampo.upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { campoId: 7 },
      create: expect.objectContaining({
        organizacionId: 2,
        campoId: 7,
        actualizadoPorId: 3,
        nivel: 'ALTO',
        zonasBajas: 'Bajo del lote norte',
      }),
    }));
  });
});
