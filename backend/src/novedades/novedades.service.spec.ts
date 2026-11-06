import { EstadoNovedadProducto } from '@prisma/client';
import { NovedadesService } from './novedades.service';

describe('NovedadesService', () => {
  const jwtSecretAnterior = process.env.JWT_SECRET;
  const prisma = {
    usuario: { findUnique: jest.fn(), findMany: jest.fn(), count: jest.fn(), update: jest.fn() },
    novedadProducto: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      count: jest.fn(),
    },
    novedadProductoLectura: { count: jest.fn(), upsert: jest.fn() },
    envioCorreoNovedad: { count: jest.fn(), upsert: jest.fn(), update: jest.fn() },
  } as any;
  const notificaciones = { crearNotificacionSiNoExiste: jest.fn() } as any;
  const mailer = { enviarCorreo: jest.fn() } as any;
  const service = new NovedadesService(prisma, notificaciones, mailer);

  beforeEach(() => {
    jest.resetAllMocks();
    process.env.JWT_SECRET = 'jwt-secreto-pruebas-novedades';
  });

  afterAll(() => {
    if (jwtSecretAnterior === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = jwtSecretAnterior;
  });

  it('lista únicamente novedades publicadas e informa la lectura del usuario', async () => {
    prisma.novedadProducto.findMany.mockResolvedValue([
      {
        id: 'novedad-1',
        titulo: 'AgroManager Clima',
        resumen: 'Pronóstico por campo',
        contenido: 'Detalle',
        categoria: 'CLIMA',
        version: '1.0',
        destacada: true,
        publicadaEn: new Date(),
        lecturas: [{ leidaEn: new Date('2026-11-03T10:00:00.000Z') }],
      },
    ]);

    await expect(service.listarParaUsuario(7)).resolves.toEqual([
      expect.objectContaining({ id: 'novedad-1', leida: true }),
    ]);
    expect(prisma.novedadProducto.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ estado: EstadoNovedadProducto.PUBLICADA }),
      }),
    );
  });

  it('publica una novedad y avisa solo a usuarios que aceptaron novedades', async () => {
    prisma.usuario.findUnique
      .mockResolvedValueOnce({ rolGlobal: 'SUPERADMIN' });
    prisma.novedadProducto.updateMany.mockResolvedValue({ count: 1 });
    prisma.novedadProducto.findUnique
      .mockResolvedValueOnce({
        id: 'novedad-1',
        estado: EstadoNovedadProducto.PUBLICADA,
        titulo: 'Nueva función',
        resumen: 'Ya está disponible',
      })
      .mockResolvedValueOnce({
        id: 'novedad-1',
        estado: EstadoNovedadProducto.PUBLICADA,
      });
    prisma.usuario.findMany
      .mockResolvedValueOnce([{ id: 3 }, { id: 5 }])
      .mockResolvedValueOnce([]);
    notificaciones.crearNotificacionSiNoExiste.mockResolvedValue(true);

    const resultado = await service.publicar(1, 'novedad-1');

    expect(resultado).toEqual(expect.objectContaining({
      destinatariosNotificados: 2,
      yaPublicada: false,
    }));
    expect(notificaciones.crearNotificacionSiNoExiste).toHaveBeenCalledTimes(2);
    expect(notificaciones.crearNotificacionSiNoExiste).toHaveBeenCalledWith(3, expect.objectContaining({
      tipo: 'NOVEDAD_PRODUCTO',
      enlace: '/novedades?open=novedad-1',
    }));
    expect(prisma.usuario.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ recibeNovedades: true }),
    }));
  });

  it('genera una vista previa sin enviar correos ni habilitar campañas', async () => {
    prisma.usuario.findUnique
      .mockResolvedValueOnce({ rolGlobal: 'SUPERADMIN' });
    prisma.novedadProducto.findUnique.mockResolvedValue({
      id: 'novedad-2',
      titulo: 'Mejora de reportes',
      resumen: 'Nuevos indicadores',
      contenido: 'Podés revisar los indicadores desde Reportes.',
    });
    prisma.usuario.count.mockResolvedValue(12);

    const vistaPrevia = await service.previsualizarCorreo(1, 'novedad-2');

    expect(vistaPrevia).toEqual(expect.objectContaining({
      asunto: 'AgroManager AR: Mejora de reportes',
      destinatariosElegibles: 12,
      envioHabilitado: false,
    }));
    expect(vistaPrevia.html).toContain('Mejora de reportes');
    expect(mailer.enviarCorreo).not.toHaveBeenCalled();
  });

  it('permite enviar una prueba a un email indicado por el superadmin', async () => {
    const configuracionAnterior = process.env.NOVEDADES_EMAILS_HABILITADOS;
    process.env.NOVEDADES_EMAILS_HABILITADOS = 'true';
    prisma.usuario.findUnique
      .mockResolvedValueOnce({ rolGlobal: 'SUPERADMIN' })
      .mockResolvedValueOnce({
        email: 'cuenta-sin-buzon@agromanagerar.com',
        nombre: 'Joaquín',
        emailVerificado: false,
      });
    prisma.novedadProducto.findUnique.mockResolvedValue({
      id: 'novedad-prueba',
      titulo: 'AgroManager Clima',
      resumen: 'Nuevo pronóstico',
      contenido: 'Conocé las nuevas herramientas.',
    });
    mailer.enviarCorreo.mockResolvedValue({ id: 'resend-prueba' });

    try {
      await expect(
        service.enviarCorreoPrueba(1, 'novedad-prueba', 'mi-email@gmail.com'),
      ).resolves.toEqual({ ok: true, destinatario: 'mi-email@gmail.com' });
      expect(mailer.enviarCorreo).toHaveBeenCalledWith(expect.objectContaining({
        email: 'mi-email@gmail.com',
        asunto: '[PRUEBA] AgroManager AR: AgroManager Clima',
      }));
    } finally {
      if (configuracionAnterior === undefined) delete process.env.NOVEDADES_EMAILS_HABILITADOS;
      else process.env.NOVEDADES_EMAILS_HABILITADOS = configuracionAnterior;
    }
  });

  it('permite anular las novedades desde un enlace firmado', async () => {
    prisma.usuario.findUnique.mockResolvedValue({
      id: 11,
      email: 'productor@example.com',
      recibePromociones: false,
    });
    const firma = (service as any).generarFirmaDesuscripcion({
      id: 11,
      email: 'productor@example.com',
    });
    prisma.usuario.update.mockResolvedValue({ id: 11 });

    await expect(service.desuscribirDeNovedades(11, firma)).resolves.toEqual({ ok: true });
    expect(prisma.usuario.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 11 },
      data: expect.objectContaining({
        recibeNovedades: false,
        recibeComunicaciones: false,
      }),
    }));
  });

  it('envía en lote solo con confirmación y la habilitación explícita', async () => {
    const configuracionAnterior = process.env.NOVEDADES_EMAILS_HABILITADOS;
    process.env.NOVEDADES_EMAILS_HABILITADOS = 'true';
    prisma.usuario.findUnique.mockResolvedValueOnce({ rolGlobal: 'SUPERADMIN' });
    prisma.novedadProducto.findUnique.mockResolvedValue({
      id: 'novedad-3',
      estado: EstadoNovedadProducto.PUBLICADA,
      titulo: 'Clima por campo',
      resumen: 'Nuevo pronóstico',
      contenido: 'Consultá los datos desde la aplicación.',
    });
    prisma.usuario.findMany
      .mockResolvedValueOnce([{ id: 9, email: 'productor@example.com', nombre: 'María' }])
      .mockResolvedValueOnce([]);
    prisma.envioCorreoNovedad.upsert.mockResolvedValue({ id: 'envio-1', estado: 'PENDIENTE' });
    mailer.enviarCorreo.mockResolvedValue({ id: 'resend-1' });

    try {
      await expect(service.enviarCorreos(1, 'novedad-3', { confirmar: true })).resolves.toEqual({
        enviados: 1,
        omitidos: 0,
        errores: 0,
      });
      expect(mailer.enviarCorreo).toHaveBeenCalledWith(expect.objectContaining({
        email: 'productor@example.com',
        asunto: 'AgroManager AR: Clima por campo',
      }));
      expect(mailer.enviarCorreo.mock.calls[0][0].html).toContain('desuscribir-novedades?usuario=9');
      expect(prisma.envioCorreoNovedad.update).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ estado: 'ENVIADO' }),
      }));
    } finally {
      if (configuracionAnterior === undefined) delete process.env.NOVEDADES_EMAILS_HABILITADOS;
      else process.env.NOVEDADES_EMAILS_HABILITADOS = configuracionAnterior;
    }
  });
});
