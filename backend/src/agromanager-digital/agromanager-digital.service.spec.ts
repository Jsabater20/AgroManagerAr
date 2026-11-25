import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { AgroManagerDigitalService } from './agromanager-digital.service';

describe('AgroManagerDigitalService', () => {
  const solicitud = {
    id: 42,
    email: 'cliente@example.com',
    nombre: 'Ana <Productora>',
    establecimiento: 'La Esperanza',
    actividad: 'Agricultura',
    servicio: 'Sitio web',
    provincia: 'Buenos Aires',
    localidad: 'Pergamino',
    descripcion: 'Consulta inicial',
    telefono: '123456',
    createdAt: new Date('2026-11-25T12:00:00.000Z'),
  };
  const prisma = {
    usuario: { findUnique: jest.fn() },
    solicitudAgroManagerDigital: { create: jest.fn(), findMany: jest.fn() },
    eventoAgroManagerDigital: { create: jest.fn(), groupBy: jest.fn(), deleteMany: jest.fn() },
  } as any;
  const mailer = { enviarCorreo: jest.fn() } as any;
  const service = new AgroManagerDigitalService(prisma, mailer);
  const solicitudDto = {
    nombre: 'Ana <Productora>',
    establecimiento: 'La Esperanza',
    email: 'CLIENTE@example.com',
    telefono: '123456',
    provincia: 'Buenos Aires',
    localidad: 'Pergamino',
    actividad: 'Agricultura',
    servicio: 'Sitio web',
    tieneSitioWeb: false,
    descripcion: 'Consulta inicial',
    consienteContacto: true,
  };
  const adminEmailOriginal = process.env.DIGITAL_LEADS_ADMIN_EMAIL;

  beforeEach(() => {
    jest.resetAllMocks();
    prisma.solicitudAgroManagerDigital.create.mockResolvedValue(solicitud);
    mailer.enviarCorreo.mockResolvedValue({ id: 'email-id' });
    process.env.DIGITAL_LEADS_ADMIN_EMAIL = 'ventas@example.com';
  });

  afterAll(() => {
    if (adminEmailOriginal === undefined) delete process.env.DIGITAL_LEADS_ADMIN_EMAIL;
    else process.env.DIGITAL_LEADS_ADMIN_EMAIL = adminEmailOriginal;
  });

  it('guarda la solicitud y envía aviso al equipo y acuse al interesado', async () => {
    await expect(service.crear(solicitudDto as any)).resolves.toEqual({
      id: 42,
      mensaje: 'Recibimos tu consulta. Te contactaremos para conversar sobre el proyecto.',
    });

    expect(prisma.solicitudAgroManagerDigital.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: 'cliente@example.com' }),
      }),
    );
    expect(mailer.enviarCorreo).toHaveBeenCalledTimes(2);
    expect(mailer.enviarCorreo).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ email: 'ventas@example.com' }),
    );
    expect(mailer.enviarCorreo).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ email: 'cliente@example.com' }),
    );
    expect(mailer.enviarCorreo.mock.calls[0][0].html).toContain('Ana &lt;Productora&gt;');
  });

  it('guarda preferencias de identidad, contenido y funciones a medida', async () => {
    await service.crear({
      ...solicitudDto,
      tipoProyecto: 'PROFESIONAL_COMERCIAL',
      informacionPublicar: ['Trayectoria', 'Servicios'],
      requiereCatalogo: true,
      administraContenido: true,
      tieneIdentidadVisual: true,
      tieneDominioPropio: false,
      requiereMantenimiento: true,
      referenciaUrl: 'https://referencia.example.com',
      funcionalidadesPersonalizadas: 'Panel para administrar el catálogo',
    } as any);

    expect(prisma.solicitudAgroManagerDigital.create.mock.calls[0][0].data).toMatchObject({
      tipoProyecto: 'PROFESIONAL_COMERCIAL',
      informacionPublicar: ['Trayectoria', 'Servicios'],
      requiereCatalogo: true,
      administraContenido: true,
      tieneIdentidadVisual: true,
      tieneDominioPropio: false,
      requiereMantenimiento: true,
      referenciaUrl: 'https://referencia.example.com',
      funcionalidadesPersonalizadas: 'Panel para administrar el catálogo',
    });
    expect(mailer.enviarCorreo.mock.calls[0][0].html).toContain('Panel para administrar el catálogo');
  });

  it('mantiene la solicitud aunque fallen ambos correos', async () => {
    mailer.enviarCorreo.mockRejectedValue(new Error('Resend no disponible'));

    await expect(service.crear(solicitudDto as any)).resolves.toEqual(
      expect.objectContaining({ id: 42 }),
    );
    expect(prisma.solicitudAgroManagerDigital.create).toHaveBeenCalledTimes(1);
    expect(mailer.enviarCorreo).toHaveBeenCalledTimes(2);
  });

  it('envía el acuse aunque no se haya configurado el buzón comercial', async () => {
    delete process.env.DIGITAL_LEADS_ADMIN_EMAIL;

    await service.crear(solicitudDto as any);

    expect(mailer.enviarCorreo).toHaveBeenCalledTimes(1);
    expect(mailer.enviarCorreo).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'cliente@example.com' }),
    );
  });

  it('no persiste solicitudes sin consentimiento', async () => {
    await expect(service.crear({ ...solicitudDto, consienteContacto: false } as any))
      .rejects.toBeInstanceOf(BadRequestException);

    expect(prisma.solicitudAgroManagerDigital.create).not.toHaveBeenCalled();
    expect(mailer.enviarCorreo).not.toHaveBeenCalled();
  });

  it('exporta las solicitudes según los filtros y valida el rol administrador', async () => {
    prisma.usuario.findUnique.mockResolvedValue({ id: 7, email: 'admin@example.com', rolGlobal: 'SUPERADMIN' });
    prisma.solicitudAgroManagerDigital.findMany.mockResolvedValue([solicitud]);

    await expect(service.exportar(7, 'La Esperanza', 'NUEVA')).resolves.toEqual([solicitud]);

    expect(prisma.solicitudAgroManagerDigital.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        estado: 'NUEVA',
        OR: expect.arrayContaining([expect.objectContaining({ establecimiento: expect.anything() })]),
      }),
    }));
  });

  it('registra eventos sin conservar una URL completa como origen', async () => {
    await expect(service.registrarEvento({ tipo: 'VISITA' as any, origen: 'https://social.example/path?email=private@example.com' }))
      .resolves.toEqual({ ok: true });

    expect(prisma.eventoAgroManagerDigital.create).toHaveBeenCalledWith({
      data: { tipo: 'VISITA', origen: 'social.example', medio: null, campania: null },
    });
  });

  it('conserva etiquetas UTM limpias y descarta datos identificables', async () => {
    await service.registrarEvento({
      tipo: 'VISITA' as any,
      origen: 'instagram_ads',
      medio: 'social-paid',
      campania: 'Lanzamiento 2026',
    });

    expect(prisma.eventoAgroManagerDigital.create).toHaveBeenCalledWith({
      data: { tipo: 'VISITA', origen: 'instagram_ads', medio: 'social-paid', campania: 'Lanzamiento 2026' },
    });
    await service.registrarEvento({ tipo: 'VISITA' as any, origen: 'Directo', campania: 'persona@example.com' });
    expect(prisma.eventoAgroManagerDigital.create).toHaveBeenLastCalledWith({
      data: { tipo: 'VISITA', origen: 'Directo', medio: null, campania: null },
    });
  });

  it('resume eventos recientes para el panel superadmin', async () => {
    prisma.usuario.findUnique.mockResolvedValue({ id: 7, email: 'admin@example.com', rolGlobal: 'SUPERADMIN' });
    prisma.eventoAgroManagerDigital.groupBy
      .mockResolvedValueOnce([
        { tipo: 'VISITA', _count: { _all: 12 } },
        { tipo: 'FORMULARIO_ENVIADO', _count: { _all: 3 } },
      ])
      .mockResolvedValueOnce([{ origen: 'social.example', _count: { _all: 4 } }])
      .mockResolvedValueOnce([{ medio: 'social-paid', _count: { _all: 2 } }])
      .mockResolvedValueOnce([{ campania: 'lanzamiento', _count: { _all: 2 } }]);

    await expect(service.analitica(7)).resolves.toEqual(expect.objectContaining({
      dias: 30,
      visitas: 12,
      solicitudesEnviadas: 3,
      origenes: [{ nombre: 'social.example', cantidad: 4 }],
      medios: [{ nombre: 'social-paid', cantidad: 2 }],
      campanias: [{ nombre: 'lanzamiento', cantidad: 2 }],
    }));
  });

  it('deniega la analítica a usuarios que no son superadmin', async () => {
    prisma.usuario.findUnique.mockResolvedValue({ id: 8, email: 'usuario@example.com', rolGlobal: 'USER' });

    await expect(service.analitica(8)).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.eventoAgroManagerDigital.groupBy).not.toHaveBeenCalled();
  });

  it('purga los eventos de más de un año', async () => {
    prisma.eventoAgroManagerDigital.deleteMany.mockResolvedValue({ count: 4 });

    await service.eliminarEventosAntiguos();

    const llamada = prisma.eventoAgroManagerDigital.deleteMany.mock.calls[0][0];
    expect(llamada.where.createdAt.lt).toBeInstanceOf(Date);
    expect(llamada.where.createdAt.lt.getFullYear()).toBe(new Date().getFullYear() - 1);
  });
});
