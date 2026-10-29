import { AlertasService } from './alertas.service';

describe('AlertasService', () => {
  const prisma = {
    asignacionCampo: { findMany: jest.fn() },
    actividadMiembro: { findMany: jest.fn() },
    costoProductivo: { findMany: jest.fn() },
    organizacion: { findMany: jest.fn() },
    lote: { findMany: jest.fn() },
    siembra: { findMany: jest.fn() },
    maquinaria: { findMany: jest.fn() },
  } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const notificacionesService = { crearNotificacionSiNoExiste: jest.fn() } as any;
  const service = new AlertasService(
    prisma,
    memberAccessService,
    notificacionesService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    prisma.actividadMiembro.findMany.mockResolvedValue([
      {
        id: 8,
        organizacionId: 1,
        titulo: 'Aplicar fertilizante',
        fechaEstimadaFin: new Date('2026-10-10'),
        recursoTipo: 'LOTE',
        recursoId: 4,
      },
    ]);
    prisma.costoProductivo.findMany.mockResolvedValue([
      {
        organizacionId: 1,
        tipo: 'ESTIMADO',
        monto: 100000,
        campoId: 2,
        loteId: 4,
        campaniaId: null,
        campo: { nombre: 'El Ombú' },
        lote: { nombre: 'Lote norte' },
        campania: null,
      },
      {
        organizacionId: 1,
        tipo: 'REAL',
        monto: 130000,
        campoId: 2,
        loteId: 4,
        campaniaId: null,
        campo: { nombre: 'El Ombú' },
        lote: { nombre: 'Lote norte' },
        campania: null,
      },
    ]);
    prisma.organizacion.findMany.mockResolvedValue([{ id: 1, propietarioId: 10 }]);
    notificacionesService.crearNotificacionSiNoExiste.mockResolvedValue(true);
  });

  it('detecta trabajos vencidos y costos reales por encima de la proyección', async () => {
    const alertas = await service.obtenerParaOrganizacion(10, 1);

    expect(alertas).toEqual(expect.arrayContaining([
      expect.objectContaining({ tipo: 'TRABAJO_VENCIDO', organizacionId: 1 }),
      expect.objectContaining({
        tipo: 'COSTO_SUPERA_ESTIMADO',
        mensaje: expect.stringContaining('30%'),
      }),
    ]));
    expect(notificacionesService.crearNotificacionSiNoExiste).toHaveBeenCalledTimes(2);
  });
});
