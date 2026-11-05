import { ForbiddenException } from '@nestjs/common';
import { EstadoChecklistPreventivoHidrico } from '@prisma/client';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReferidosService } from '../referidos/referidos.service';
import { ActividadesService } from '../actividades/actividades.service';
import { CamposService } from './campos.service';

describe('CamposService - checklist preventivo hídrico', () => {
  let prisma: {
    campo: { findFirst: jest.Mock };
    checklistPreventivoHidrico: { findFirst: jest.Mock; update: jest.Mock };
    actividadMiembro: { findFirst: jest.Mock };
  };
  let memberAccessService: { requireModule: jest.Mock; requireCampo: jest.Mock };
  let actividadesService: { crear: jest.Mock };
  let service: CamposService;

  beforeEach(() => {
    prisma = {
      campo: { findFirst: jest.fn().mockResolvedValue({ id: 7 }) },
      checklistPreventivoHidrico: {
        findFirst: jest.fn().mockResolvedValue({ id: 12, responsableId: 18 }),
        update: jest.fn().mockResolvedValue({ id: 12 }),
      },
      actividadMiembro: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    };
    memberAccessService = {
      requireModule: jest.fn(),
      requireCampo: jest.fn(),
    };
    actividadesService = { crear: jest.fn().mockResolvedValue({ id: 31 }) };
    service = new CamposService(
      prisma as unknown as PrismaService,
      {} as PlanService,
      memberAccessService as unknown as MemberAccessService,
      {} as ReferidosService,
      actividadesService as unknown as ActividadesService,
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

  it('crea un trabajo para el responsable sin duplicarlo', async () => {
    memberAccessService.requireModule.mockResolvedValue({
      esOwner: true,
      usuarioOrganizacionId: 18,
    });
    prisma.checklistPreventivoHidrico.findFirst.mockResolvedValue({
      id: 12,
      titulo: 'Revisar drenajes',
      descripcion: 'Quitar obstrucciones.',
      responsableId: 18,
      fechaLimite: new Date('2030-01-12T12:00:00.000Z'),
      estado: EstadoChecklistPreventivoHidrico.PENDIENTE,
      campo: { nombre: 'Las Meninas' },
    });

    const resultado = await service.crearTrabajoDesdeChecklistPreventivoHidrico(
      7,
      12,
      3,
      2,
    );

    expect(resultado).toEqual({ trabajo: { id: 31 }, creado: true });
    expect(actividadesService.crear).toHaveBeenCalledWith(
      2,
      expect.objectContaining({
        titulo: 'Prevención: Revisar drenajes',
        usuarioOrganizacionId: 18,
        recursoTipo: 'CAMPO',
        recursoId: 7,
        contexto: 'PREVENCION_HIDRICA:12',
        prioridad: 'ALTA',
      }),
      3,
    );
  });

  it('no duplica un trabajo que ya fue enviado a Tareas', async () => {
    memberAccessService.requireModule.mockResolvedValue({
      esOwner: true,
      usuarioOrganizacionId: 18,
    });
    prisma.checklistPreventivoHidrico.findFirst.mockResolvedValue({
      id: 12,
      titulo: 'Revisar drenajes',
      descripcion: null,
      responsableId: 18,
      fechaLimite: null,
      estado: EstadoChecklistPreventivoHidrico.PENDIENTE,
      campo: { nombre: 'Las Meninas' },
    });
    prisma.actividadMiembro.findFirst.mockResolvedValue({
      id: 31,
      estado: 'PENDIENTE',
    });

    await expect(
      service.crearTrabajoDesdeChecklistPreventivoHidrico(7, 12, 3, 2),
    ).resolves.toEqual({
      trabajo: { id: 31, estado: 'PENDIENTE' },
      creado: false,
    });
    expect(actividadesService.crear).not.toHaveBeenCalled();
  });
});
