import { TareasService } from './tareas.service';

describe('TareasService', () => {
  const prisma = {
    tareaRural: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
    },
  } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const service = new TareasService(prisma, memberAccessService);

  beforeEach(() => {
    jest.clearAllMocks();
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
  });

  it('crea una única próxima tarea al completar una tarea semanal', async () => {
    const fechaProgramada = new Date('2030-01-10T12:00:00.000Z');
    const tarea = {
      id: 12,
      usuarioId: 4,
      titulo: 'Revisar alambrado',
      descripcion: 'Sector norte',
      tipo: 'MANTENIMIENTO',
      estado: 'PENDIENTE',
      prioridad: 'MEDIA',
      fechaProgramada,
      fechaLimite: new Date('2030-01-12T12:00:00.000Z'),
      repetir: 'SEMANAL',
      campoId: 8,
      observaciones: null,
      organizacionId: 1,
      campo: { id: 8, nombre: 'Las Meninas' },
    };
    prisma.tareaRural.findUnique.mockResolvedValue(tarea);
    prisma.tareaRural.update.mockResolvedValue({ ...tarea, estado: 'COMPLETADA' });
    prisma.tareaRural.upsert.mockResolvedValue({
      ...tarea,
      id: 13,
      estado: 'PENDIENTE',
      tareaOrigenId: 12,
      fechaProgramada: new Date('2030-01-17T12:00:00.000Z'),
    });

    const resultado = await service.updateEstado(
      12,
      { estado: 'COMPLETADA' },
      4,
      1,
    );

    expect(prisma.tareaRural.upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { tareaOrigenId: 12 },
      create: expect.objectContaining({
        tareaOrigenId: 12,
        repetir: 'SEMANAL',
        fechaProgramada: expect.any(Date),
      }),
    }));
    expect(resultado).toEqual(expect.objectContaining({
      siguienteTarea: expect.objectContaining({ id: 13, tareaOrigenId: 12 }),
    }));
  });
});
