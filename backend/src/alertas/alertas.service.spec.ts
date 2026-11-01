import { AlertasService } from './alertas.service';

describe('AlertasService', () => {
  const prisma = {
    asignacionCampo: { findMany: jest.fn() },
    actividadMiembro: { findMany: jest.fn() },
    costoProductivo: { findMany: jest.fn() },
    organizacion: { findMany: jest.fn(), findUnique: jest.fn() },
    lote: { findMany: jest.fn() },
    siembra: { findMany: jest.fn() },
    maquinaria: { findMany: jest.fn() },
    alertaGestion: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      count: jest.fn(),
    },
    alertaLectura: { upsert: jest.fn() },
  } as any;
  const memberAccessService = { requireModule: jest.fn() } as any;
  const planService = { isOrgPro: jest.fn() } as any;
  const notificacionesService = { crearNotificacionSiNoExiste: jest.fn() } as any;
  const service = new AlertasService(
    prisma,
    memberAccessService,
    planService,
    notificacionesService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    memberAccessService.requireModule.mockResolvedValue({ esOwner: true });
    planService.isOrgPro.mockResolvedValue(true);
    prisma.actividadMiembro.findMany.mockResolvedValueOnce([
      {
        id: 8,
        organizacionId: 1,
        titulo: 'Aplicar fertilizante',
        fechaEstimadaFin: new Date('2026-10-10'),
        recursoTipo: 'LOTE',
        recursoId: 4,
      },
    ]).mockResolvedValueOnce([]);
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
    prisma.organizacion.findUnique.mockResolvedValue({ propietarioId: 10 });
    prisma.maquinaria.findMany.mockResolvedValue([]);
    prisma.alertaGestion.findMany.mockResolvedValue([]);
    prisma.alertaGestion.findFirst.mockResolvedValue({ id: 'alerta-1' });
    prisma.alertaLectura.upsert.mockResolvedValue({ id: 'lectura-1' });
    prisma.alertaGestion.create.mockImplementation(({ data }) => Promise.resolve({
      id: 'alerta-1',
      ciclo: 1,
      titulo: data.titulo,
      mensaje: data.mensaje,
      enlace: data.enlace,
    }));
    prisma.alertaGestion.update.mockImplementation(({ data }) => Promise.resolve({
      id: 'alerta-1',
      ciclo: data.ciclo ?? 1,
      titulo: data.titulo,
      mensaje: data.mensaje,
      enlace: data.enlace,
    }));
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

  it('prioriza alertas de inicio, seguimiento y vencimiento de trabajos', async () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    const proximaSemana = new Date(hoy);
    proximaSemana.setDate(proximaSemana.getDate() + 7);

    prisma.actividadMiembro.findMany.mockReset();
    prisma.actividadMiembro.findMany.mockResolvedValueOnce([
      {
        id: 1,
        organizacionId: 1,
        titulo: 'Revisar alambrado',
        estado: 'PENDIENTE',
        fechaInicio: ayer,
        fechaEstimadaFin: proximaSemana,
        recursoTipo: 'CAMPO',
        recursoId: 4,
      },
      {
        id: 2,
        organizacionId: 1,
        titulo: 'Controlar siembra',
        estado: 'EN_PROGRESO',
        fechaInicio: ayer,
        fechaEstimadaFin: hoy,
        recursoTipo: 'LOTE',
        recursoId: 5,
      },
      {
        id: 3,
        organizacionId: 1,
        titulo: 'Preparar maquinaria',
        estado: 'PENDIENTE',
        fechaInicio: hoy,
        fechaEstimadaFin: proximaSemana,
        recursoTipo: 'MAQUINARIA',
        recursoId: 6,
      },
      {
        id: 4,
        organizacionId: 1,
        titulo: 'Aplicar fertilizante',
        estado: 'PENDIENTE',
        fechaInicio: ayer,
        fechaEstimadaFin: ayer,
        recursoTipo: 'LOTE',
        recursoId: 7,
      },
    ]).mockResolvedValueOnce([]);
    prisma.costoProductivo.findMany.mockResolvedValue([]);

    const alertas = await service.listarParaOrganizaciones([1]);

    expect(alertas.map((alerta) => alerta.tipo)).toEqual(expect.arrayContaining([
      'TRABAJO_SIN_INICIAR',
      'TRABAJO_PROXIMO_A_VENCER',
      'TRABAJO_COMIENZA_HOY',
      'TRABAJO_VENCIDO',
    ]));
    expect(alertas).toHaveLength(4);
  });

  it('limita las alertas económicas a organizaciones Pro', async () => {
    planService.isOrgPro.mockResolvedValue(false);
    prisma.actividadMiembro.findMany.mockReset();
    prisma.actividadMiembro.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    prisma.costoProductivo.findMany.mockResolvedValue([]);

    await service.listarParaOrganizaciones([1]);

    expect(prisma.costoProductivo.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ organizacionId: { in: [] } }),
    }));
  });

  it('alerta trabajos de cálculos completados sin costo real registrado', async () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    prisma.actividadMiembro.findMany.mockReset();
    prisma.actividadMiembro.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{
        id: 12,
        organizacionId: 1,
        titulo: 'Aplicar fertilizante calculado',
        fechaRealFin: hoy,
        recursoTipo: 'LOTE',
        recursoId: 7,
      }]);
    prisma.costoProductivo.findMany.mockResolvedValue([]);

    const alertas = await service.listarParaOrganizaciones([1]);

    expect(alertas).toEqual(expect.arrayContaining([
      expect.objectContaining({
        tipo: 'ACTIVIDAD_COMPLETADA_SIN_COSTO_REAL',
        origenId: '12',
      }),
    ]));
  });

  it('alerta mantenimientos y documentación de maquinaria próximos o vencidos', async () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    const enDiezDias = new Date(hoy);
    enDiezDias.setDate(enDiezDias.getDate() + 10);

    prisma.actividadMiembro.findMany.mockReset();
    prisma.actividadMiembro.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    prisma.costoProductivo.findMany.mockResolvedValue([]);
    prisma.maquinaria.findMany.mockResolvedValue([{
      id: 21,
      organizacionId: 1,
      nombre: 'Tractor John Deere',
      seguroVencimiento: enDiezDias,
      vtvVencimiento: ayer,
      mantenimientos: [{ id: 31, proximoMantenimiento: ayer }],
    }]);

    const alertas = await service.listarParaOrganizaciones([1]);

    expect(alertas.map((alerta) => alerta.tipo)).toEqual(expect.arrayContaining([
      'MAQUINARIA_MANTENIMIENTO_VENCIDO',
      'MAQUINARIA_SEGURO_PROXIMO_A_VENCER',
      'MAQUINARIA_VTV_VENCIDA',
    ]));
    expect(alertas).toHaveLength(3);
  });

  it('marca como leída una alerta persistente dentro de la organización activa', async () => {
    await service.marcarGestionLeida(10, 1, 'alerta-1');

    expect(prisma.alertaGestion.findFirst).toHaveBeenCalledWith({
      where: { id: 'alerta-1', organizacionId: 1 },
      select: { id: true },
    });
    expect(prisma.alertaLectura.upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { alertaId_usuarioId: { alertaId: 'alerta-1', usuarioId: 10 } },
    }));
  });

  it('crea, resuelve y reabre alertas sin duplicar notificaciones del mismo ciclo', async () => {
    const alerta = {
      organizacionId: 1,
      tipo: 'TRABAJO_VENCIDO',
      severidad: 'ALTA',
      titulo: 'Trabajo vencido',
      mensaje: 'La actividad requiere seguimiento.',
      enlace: '/org/1/trabajos/8',
      dedupeKey: 'trabajo-vencido-8',
      origenTipo: 'ACTIVIDAD_MIEMBRO',
      origenId: '8',
    } as any;

    prisma.alertaGestion.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{
        id: 'alerta-1',
        clave: alerta.dedupeKey,
        estado: 'ACTIVA',
        ciclo: 1,
      }])
      .mockResolvedValueOnce([{
        id: 'alerta-1',
        clave: alerta.dedupeKey,
        estado: 'RESUELTA',
        ciclo: 1,
      }]);

    await (service as any).sincronizarAlertasPersistentes(1, [alerta]);
    await (service as any).sincronizarAlertasPersistentes(1, []);
    await (service as any).sincronizarAlertasPersistentes(1, [alerta]);

    expect(prisma.alertaGestion.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ estado: 'ACTIVA', clave: alerta.dedupeKey }),
    }));
    expect(prisma.alertaGestion.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ estado: 'RESUELTA' }),
    }));
    expect(prisma.alertaGestion.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ estado: 'ACTIVA', ciclo: 2, resueltaEn: null }),
    }));
    expect(notificacionesService.crearNotificacionSiNoExiste).toHaveBeenCalledTimes(2);
    expect(notificacionesService.crearNotificacionSiNoExiste).toHaveBeenLastCalledWith(10, expect.objectContaining({
      dedupeKey: 'alerta-alerta-1-ciclo-2',
    }));
  });
});
