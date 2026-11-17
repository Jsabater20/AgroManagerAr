import { AgroBotAccionesService } from './agrobot-acciones.service';

describe('AgroBotAccionesService', () => {
  it('prepara un trabajo con responsable, campo y fecha relativa', async () => {
    const prisma = {
      organizacion: {
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          id: 7, nombre: 'Establecimiento Demo', plan: 'PRO', actividadPrincipal: 'MIXTA', actividadesProductivas: [],
        }),
      },
      campo: {
        findMany: jest.fn().mockResolvedValue([{ id: 3, nombre: 'Las Meninas', hectareas: 150, lotes: [] }]),
      },
      usuarioOrganizacion: {
        findMany: jest.fn().mockResolvedValue([{ id: 25, usuario: { nombre: 'Juan', apellido: 'Perez' } }]),
      },
    };
    const acceso = { requireModule: jest.fn().mockResolvedValue({ esOwner: true }) };
    const service = new AgroBotAccionesService(prisma as any, acceso as any, {} as any, {} as any);

    const propuesta = await service.prepararCreacionTrabajo(
      11, 7, 'Asignale a Juan Perez revisar alambrados en el campo Las Meninas mañana',
    );

    expect(propuesta).toMatchObject({
      estado: 'LISTA_PARA_CONFIRMAR',
      sePuedeConfirmar: true,
      trabajo: {
        titulo: 'revisar alambrados',
        responsable: { id: 25, nombre: 'Juan Perez' },
        campo: { id: 3, nombre: 'Las Meninas' },
      },
    });
    expect(propuesta?.trabajo.fechaInicio).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('confirma mediante la creación transaccional de campos', async () => {
    const camposService = {
      createConLotes: jest.fn().mockResolvedValue({
        id: 42,
        nombre: 'Los Patitos',
        lotes: [{ id: 80, nombre: 'Norte', hectareas: 200 }],
      }),
    };
    const service = new AgroBotAccionesService(
      {} as any,
      {} as any,
      camposService as any,
    );

    const resultado = await service.confirmarCreacionCampo(11, 7, {
      campo: { nombre: 'Los Patitos', hectareas: 200 },
      lotes: [{ nombre: 'Norte', hectareas: 200 }],
    });

    expect(resultado).toMatchObject({ id: 42, nombre: 'Los Patitos' });
    expect(camposService.createConLotes).toHaveBeenCalledWith(
      { nombre: 'Los Patitos', hectareas: 200 },
      [{ nombre: 'Norte', hectareas: 200 }],
      11,
      7,
      undefined,
    );
  });

  it('solo incluye los campos asignados cuando el usuario no es owner', async () => {
    const prisma = {
      organizacion: {
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          id: 7,
          nombre: 'Los Patitos',
          plan: 'PRO',
          actividadPrincipal: 'MIXTA',
          actividadesProductivas: [{ tipoActividad: 'AGRICULTURA' }],
        }),
      },
      campo: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: 4,
            nombre: 'El Norte',
            hectareas: 120,
            lotes: [{ id: 9, nombre: 'Lote A', hectareas: 60 }],
          },
        ]),
      },
    };
    const memberAccess = {
      requireModule: jest.fn().mockResolvedValue({
        esOwner: false,
        usuarioOrganizacionId: 22,
      }),
    };
    const service = new AgroBotAccionesService(prisma as any, memberAccess as any, {} as any, {} as any);

    const contexto = await service.obtenerContextoCampos(11, 7);

    expect(contexto.permisos).toEqual({ puedeGestionarCampos: true, esOwner: false });
    expect(contexto.campos).toHaveLength(1);
    expect(prisma.campo.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          AsignacionCampo: {
            some: { usuarioOrganizacionId: 22, activo: true },
          },
        }),
      }),
    );
  });

  it('no expone campos cuando el modulo no esta habilitado', async () => {
    const prisma = {
      organizacion: {
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          id: 7,
          nombre: 'Los Patitos',
          plan: 'FREE',
          actividadPrincipal: null,
          actividadesProductivas: [],
        }),
      },
      campo: { findMany: jest.fn() },
    };
    const memberAccess = {
      requireModule: jest.fn().mockRejectedValue(new Error('Sin acceso')),
    };
    const service = new AgroBotAccionesService(prisma as any, memberAccess as any, {} as any, {} as any);

    const contexto = await service.obtenerContextoCampos(11, 7);

    expect(contexto.permisos).toEqual({ puedeGestionarCampos: false, esOwner: false });
    expect(contexto.campos).toEqual([]);
    expect(prisma.campo.findMany).not.toHaveBeenCalled();
  });

  it('prepara una propuesta confirmable sin crear registros', async () => {
    const prisma = {
      organizacion: {
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          id: 7,
          nombre: 'Establecimiento Demo',
          plan: 'PRO',
          actividadPrincipal: 'MIXTA',
          actividadesProductivas: [],
        }),
      },
      campo: { findMany: jest.fn().mockResolvedValue([]) },
    };
    const memberAccess = {
      requireModule: jest.fn().mockResolvedValue({ esOwner: true }),
    };
    const service = new AgroBotAccionesService(prisma as any, memberAccess as any, {} as any, {} as any);

    const propuesta = await service.prepararCreacionCampo(
      11,
      7,
      'Creame el campo Los Patitos de 200 ha, con dos lotes: Norte de 120 ha y Sur de 80 ha, mixto de ganaderia y agricultura.',
    );

    expect(propuesta).toMatchObject({
      estado: 'LISTA_PARA_CONFIRMAR',
      sePuedeConfirmar: true,
      campo: {
        nombre: 'Los Patitos',
        hectareas: 200,
        actividadesDetectadas: ['AGRICULTURA', 'GANADERIA'],
      },
      lotes: [
        { nombre: 'Norte', hectareas: 120 },
        { nombre: 'Sur', hectareas: 80 },
      ],
    });
    expect((prisma.campo as any).create).toBeUndefined();
  });

  it('pide las superficies que faltan antes de permitir confirmar', async () => {
    const prisma = {
      organizacion: {
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          id: 7,
          nombre: 'Establecimiento Demo',
          plan: 'PRO',
          actividadPrincipal: 'MIXTA',
          actividadesProductivas: [],
        }),
      },
      campo: { findMany: jest.fn().mockResolvedValue([]) },
    };
    const memberAccess = {
      requireModule: jest.fn().mockResolvedValue({ esOwner: true }),
    };
    const service = new AgroBotAccionesService(prisma as any, memberAccess as any, {} as any, {} as any);

    const propuesta = await service.prepararCreacionCampo(
      11,
      7,
      'Creame el campo Los Patitos con dos lotes Norte y Sur para ganaderia y agricultura.',
    );

    expect(propuesta).toMatchObject({
      estado: 'FALTAN_DATOS',
      sePuedeConfirmar: false,
      campo: { nombre: 'Los Patitos', hectareas: null },
    });
    expect(propuesta?.faltantes).toEqual(
      expect.arrayContaining([
        'las hectáreas totales del campo',
        'las hectáreas del lote Norte',
        'las hectáreas del lote Sur',
      ]),
    );
  });
});
