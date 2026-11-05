import { BadRequestException } from '@nestjs/common';
import { MemberAccessService } from '../organizations/member-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { ClimaService } from './clima.service';

describe('ClimaService', () => {
  const campoConCoordenadas = {
    id: 3,
    nombre: 'Las Meninas',
    ubicacion: 'Rojas, Buenos Aires',
    provincia: 'Buenos Aires',
    localidad: 'Rojas',
    latitud: -34.2,
    longitud: -60.7,
  };

  let prisma: {
    campo: { findFirst: jest.Mock };
    cachePronosticoClima: { findUnique: jest.Mock };
    lote: { findUnique: jest.Mock };
    $transaction: jest.Mock;
  };
  let memberAccessService: { requireCampoParaModulo: jest.Mock };
  let service: ClimaService;

  beforeEach(() => {
    prisma = {
      campo: { findFirst: jest.fn() },
      cachePronosticoClima: { findUnique: jest.fn() },
      lote: { findUnique: jest.fn() },
      $transaction: jest.fn(),
    };
    memberAccessService = { requireCampoParaModulo: jest.fn() };
    service = new ClimaService(
      prisma as unknown as PrismaService,
      memberAccessService as unknown as MemberAccessService,
    );
  });

  it('informa cuando el campo todavía no tiene coordenadas', async () => {
    prisma.campo.findFirst.mockResolvedValue({
      ...campoConCoordenadas,
      latitud: null,
      longitud: null,
    });

    const respuesta = await service.obtenerPronostico(8, 2, 3);

    expect(respuesta).toMatchObject({
      estado: 'UBICACION_PENDIENTE',
      campo: { id: 3, tieneCoordenadas: false },
      datos: null,
    });
    expect(memberAccessService.requireCampoParaModulo).toHaveBeenCalledWith(8, 2, 3, 'Clima');
    expect(prisma.cachePronosticoClima.findUnique).not.toHaveBeenCalled();
  });

  it('devuelve la caché vigente sin consultar el proveedor', async () => {
    prisma.campo.findFirst.mockResolvedValue(campoConCoordenadas);
    prisma.cachePronosticoClima.findUnique.mockResolvedValue({
      proveedor: 'OPEN_METEO_COMMERCIAL',
      datos: { temperaturaActual: 22 },
      obtenidoEn: new Date('2026-11-03T12:00:00.000Z'),
      expiraEn: new Date(Date.now() + 60_000),
      actualizadoProveedorEn: null,
      errorUltimaConsulta: null,
    });

    const respuesta = await service.obtenerPronostico(8, 2, 3);

    expect(respuesta).toMatchObject({
      estado: 'DISPONIBLE',
      campo: { id: 3, tieneCoordenadas: true },
      datos: { temperaturaActual: 22 },
    });
  });

  it('rechaza fechas de lluvia que no existen en el calendario', async () => {
    prisma.campo.findFirst.mockResolvedValue(campoConCoordenadas);

    await expect(
      service.crearPrecipitacion(8, 2, {
        campoId: 3,
        fecha: '2026-02-30',
        milimetros: 12.5,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});
