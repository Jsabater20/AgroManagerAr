import { ForbiddenException } from '@nestjs/common';
import { EstadoChecklistPreventivoHidrico } from '@prisma/client';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReferidosService } from '../referidos/referidos.service';
import { CamposService } from './campos.service';

describe('CamposService - checklist preventivo hídrico', () => {
  let prisma: {
    campo: { findFirst: jest.Mock };
    checklistPreventivoHidrico: { findFirst: jest.Mock; update: jest.Mock };
  };
  let memberAccessService: { requireModule: jest.Mock; requireCampo: jest.Mock };
  let service: CamposService;

  beforeEach(() => {
    prisma = {
      campo: { findFirst: jest.fn().mockResolvedValue({ id: 7 }) },
      checklistPreventivoHidrico: {
        findFirst: jest.fn().mockResolvedValue({ id: 12, responsableId: 18 }),
        update: jest.fn().mockResolvedValue({ id: 12 }),
      },
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

  it('permite al responsable asignado completar su acción', async () => {
    memberAccessService.requireModule.mockResolvedValue({
      esOwner: false,
      usuarioOrganizacionId: 18,
    });

    await service.actualizarEstadoChecklistPreventivoHidrico(
      7,
      12,
      EstadoChecklistPreventivoHidrico.COMPLETADO,
      3,
      2,
    );

    expect(prisma.checklistPreventivoHidrico.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 12 },
        data: expect.objectContaining({
          estado: EstadoChecklistPreventivoHidrico.COMPLETADO,
          completadoPorId: 3,
        }),
      }),
    );
  });

  it('impide que otro miembro complete una acción ajena', async () => {
    memberAccessService.requireModule.mockResolvedValue({
      esOwner: false,
      usuarioOrganizacionId: 19,
    });

    await expect(
      service.actualizarEstadoChecklistPreventivoHidrico(
        7,
        12,
        EstadoChecklistPreventivoHidrico.COMPLETADO,
        4,
        2,
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(prisma.checklistPreventivoHidrico.update).not.toHaveBeenCalled();
  });
});
