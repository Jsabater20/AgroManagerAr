import { CategoriaChecklistPreventivoHidrico } from '@prisma/client';
import { MemberAccessService } from '../organizations/member-access.service';
import { PlanService } from '../plan/plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReferidosService } from '../referidos/referidos.service';
import { CamposService } from './campos.service';

describe('CamposService - automatización preventiva hídrica', () => {
  let prisma: {
    umbralAlertaHidricaCampo: { findFirst: jest.Mock };
    checklistPreventivoHidrico: { findFirst: jest.Mock; create: jest.Mock };
    organizacion: { findUnique: jest.Mock };
  };
  let planService: { isOrgPro: jest.Mock };
  let service: CamposService;

  beforeEach(() => {
    prisma = {
      umbralAlertaHidricaCampo: { findFirst: jest.fn().mockResolvedValue({ id: 1 }) },
      checklistPreventivoHidrico: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 17 }),
      },
      organizacion: { findUnique: jest.fn().mockResolvedValue({ propietarioId: 3 }) },
    };
    planService = { isOrgPro: jest.fn().mockResolvedValue(true) };
    service = new CamposService(
      prisma as unknown as PrismaService,
      planService as unknown as PlanService,
      {} as MemberAccessService,
      {} as ReferidosService,
    );
  });

  it('crea una acción preventiva solo cuando el owner activó la automatización', async () => {
    const resultado = await service.asegurarAccionPreventivaAutomatica(2, 7, {
      titulo: 'Acumulado relevante',
      mensaje: 'Se esperan 90 mm en las próximas 48 horas.',
    });

    expect(resultado).toEqual({ creada: true, itemId: 17 });
    expect(prisma.checklistPreventivoHidrico.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          organizacionId: 2,
          campoId: 7,
          creadoPorId: 3,
          categoria: CategoriaChecklistPreventivoHidrico.DRENAJE,
          origenAutomatico: 'ALERTA_HIDRICA',
        }),
      }),
    );
  });

  it('no duplica una acción automática pendiente para el mismo campo', async () => {
    prisma.checklistPreventivoHidrico.findFirst.mockResolvedValue({ id: 11 });

    const resultado = await service.asegurarAccionPreventivaAutomatica(2, 7, {
      titulo: 'Lluvias previstas',
      mensaje: 'Se esperan 35 mm.',
    });

    expect(resultado).toEqual({ creada: false, motivo: 'YA_EXISTE', itemId: 11 });
    expect(prisma.checklistPreventivoHidrico.create).not.toHaveBeenCalled();
  });

  it('no crea acciones automáticas cuando la organización ya no tiene Pro activo', async () => {
    planService.isOrgPro.mockResolvedValue(false);

    await expect(service.asegurarAccionPreventivaAutomatica(2, 7, {
      titulo: 'Lluvias previstas',
      mensaje: 'Se esperan 35 mm.',
    })).resolves.toEqual({ creada: false, motivo: 'PLAN_FREE' });

    expect(prisma.umbralAlertaHidricaCampo.findFirst).not.toHaveBeenCalled();
    expect(prisma.checklistPreventivoHidrico.create).not.toHaveBeenCalled();
  });
});
