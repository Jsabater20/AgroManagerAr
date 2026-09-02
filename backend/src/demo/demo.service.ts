import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { DEMO_EMAIL } from '../auth/system-accounts';

export { DEMO_EMAIL } from '../auth/system-accounts';

@Injectable()
export class DemoService implements OnModuleInit {
  private readonly logger = new Logger(DemoService.name);

  constructor(private prisma: PrismaService) {}

  /** Al iniciar: resetea la demo si falta algún dato clave (ej. maquinarias vacías) */
  async onModuleInit() {
    try {
      const demo = await this.prisma.usuario.findUnique({
        where: { email: DEMO_EMAIL },
        select: { id: true },
      });
      if (!demo) return;

      const demoOrg = await this.prisma.organizacion.findFirst({
        where: { propietarioId: demo.id },
        select: { id: true, plan: true },
      });
      if (!demoOrg) return;

      await this.prisma.$transaction([
        this.prisma.usuario.update({
          where: { id: demo.id },
          data: { plan: 'PRO', planExpira: new Date('2035-12-31') },
        }),
        this.prisma.organizacion.update({
          where: { id: demoOrg.id },
          data: { plan: 'PRO' },
        }),
      ]);

      await Promise.all([
        this.prisma.campo.updateMany({
          where: { usuarioId: demo.id, organizacionId: { not: demoOrg.id } },
          data: { organizacionId: demoOrg.id },
        }),
        this.prisma.campania.updateMany({
          where: { usuarioId: demo.id, organizacionId: { not: demoOrg.id } },
          data: { organizacionId: demoOrg.id },
        }),
        this.prisma.animal.updateMany({
          where: { usuarioId: demo.id, organizacionId: { not: demoOrg.id } },
          data: { organizacionId: demoOrg.id },
        }),
        this.prisma.tareaRural.updateMany({
          where: { usuarioId: demo.id, organizacionId: { not: demoOrg.id } },
          data: { organizacionId: demoOrg.id },
        }),
        this.prisma.maquinaria.updateMany({
          where: { usuarioId: demo.id, organizacionId: { not: demoOrg.id } },
          data: { organizacionId: demoOrg.id },
        }),
        this.prisma.movimientoFinanciero.updateMany({
          where: { usuarioId: demo.id, organizacionId: { not: demoOrg.id } },
          data: { organizacionId: demoOrg.id },
        }),
      ]);

      const [campoCount, siembraCount, animalCount, tareaCount, maquinariaCount, finanzaCount] =
        await Promise.all([
          this.prisma.campo.count({ where: { usuarioId: demo.id } }),
          this.prisma.siembra.count({ where: { lote: { campo: { usuarioId: demo.id } } } }),
          this.prisma.animal.count({ where: { usuarioId: demo.id } }),
          this.prisma.tareaRural.count({ where: { usuarioId: demo.id } }),
          this.prisma.maquinaria.count({ where: { usuarioId: demo.id } }),
          this.prisma.movimientoFinanciero.count({ where: { usuarioId: demo.id } }),
        ]);
      const campoSinGps = await this.prisma.campo.findFirst({
        where: { usuarioId: demo.id, latitud: null },
      });
      if (
        campoCount < 4 ||
        siembraCount < 8 ||
        animalCount < 20 ||
        tareaCount < 14 ||
        maquinariaCount < 8 ||
        finanzaCount < 28 ||
        campoSinGps
      ) {
        this.logger.log('Demo incompleta — ejecutando reset...');
        await this.resetDemoData();
        this.logger.log('Reset inicial demo completado.');
      }
    } catch (e) {
      this.logger.error('Error en onModuleInit demo:', e);
    }
  }

  /** Cron: reinicia los datos demo todos los días a las 7:00 UTC (4:00 AR) */
  @Cron('0 7 * * *')
  async scheduledReset() {
    this.logger.log('Iniciando reset automático de cuenta demo...');
    await this.resetDemoData();
    this.logger.log('Reset demo completado.');
  }

  async resetDemoData() {
    const demo = await this.prisma.usuario.findUnique({
      where: { email: DEMO_EMAIL },
      select: { id: true },
    });
    if (!demo) return;

    const uid = demo.id;

    // ── Obtener organización de demo ──────────────────────────────────────────
    const orgDemo = await this.prisma.organizacion.findFirst({
      where: { propietarioId: uid },
      select: { id: true },
    });

    if (!orgDemo) {
      this.logger.warn('Demo sin organización asociada');
      return;
    }

    const demoOrgId = orgDemo.id;

    // ── Borrar datos de usuario demo EN ORDEN CORRECTO ────────────────────────
    // Buscar campos TANTO por usuarioId COMO por organizacionId para garantizar limpieza completa

    const campos = await this.prisma.campo.findMany({
      where: {
        OR: [{ usuarioId: uid }, { organizacionId: demoOrgId }],
      },
      select: { id: true },
    });
    const campoIds = campos.map((c) => c.id);

    if (campoIds.length) {
      const lotes = await this.prisma.lote.findMany({
        where: { campoId: { in: campoIds } },
        select: { id: true },
      });
      const loteIds = lotes.map((l) => l.id);

      if (loteIds.length) {
        const siembras = await this.prisma.siembra.findMany({
          where: { loteId: { in: loteIds } },
          select: { id: true },
        });
        const siembraIds = siembras.map((s) => s.id);

        if (siembraIds.length) {
          await this.prisma.aplicacionInsumo.deleteMany({
            where: { siembraId: { in: siembraIds } },
          });
          await this.prisma.cosecha.deleteMany({
            where: { siembraId: { in: siembraIds } },
          });
          await this.prisma.siembra.deleteMany({
            where: { id: { in: siembraIds } },
          });
        }
        await this.prisma.lote.deleteMany({
          where: { id: { in: loteIds } },
        });
      }

      await this.prisma.campo.deleteMany({
        where: { id: { in: campoIds } },
      });
    }

    // Campanias
    await this.prisma.campania.deleteMany({
      where: { OR: [{ usuarioId: uid }] },
    });

    // Animales
    const animales = await this.prisma.animal.findMany({
      where: { usuarioId: uid },
      select: { id: true },
    });
    const animalIds = animales.map((a) => a.id);
    if (animalIds.length) {
      await this.prisma.registroPeso.deleteMany({
        where: { animalId: { in: animalIds } },
      });
      await this.prisma.prenez.deleteMany({
        where: { animalId: { in: animalIds } },
      });
      await this.prisma.animal.deleteMany({
        where: { id: { in: animalIds } },
      });
    }

    // Tareas
    await this.prisma.tareaRural.deleteMany({
      where: { usuarioId: uid },
    });

    // Movimientos financieros
    await this.prisma.movimientoFinanciero.deleteMany({
      where: { usuarioId: uid },
    });

    // Maquinarias
    await this.prisma.maquinaria.deleteMany({
      where: { usuarioId: uid },
    });

    this.logger.log('Datos demo limpiados. Reinsertando...');

    // ── Re-crear datos demo ──────────────────────────────────────────────────
    await this.seedDemoData(uid, demoOrgId);
  }

  async seedDemoData(uid: number, organizacionId: number) {
    // Obtener tipos de cultivo e insumos existentes por nombre
    const [soja, maiz, trigo, girasol] = await Promise.all([
      this.prisma.tipoCultivo.findFirst({ where: { nombre: 'Soja' } }),
      this.prisma.tipoCultivo.findFirst({ where: { nombre: 'Maíz' } }),
      this.prisma.tipoCultivo.findFirst({ where: { nombre: 'Trigo' } }),
      this.prisma.tipoCultivo.findFirst({ where: { nombre: 'Girasol' } }),
    ]);
    const insumosDemo = [
      { nombre: 'Glifosato 48%', tipo: 'HERBICIDA', unidad: 'litros', descripcion: 'Herbicida sistémico' },
      { nombre: 'Urea Granulada', tipo: 'FERTILIZANTE', unidad: 'kg', descripcion: '46% N' },
      { nombre: 'Fosfato Diamónico', tipo: 'FERTILIZANTE', unidad: 'kg', descripcion: '18-46-0' },
      { nombre: 'Semilla Soja NK7059', tipo: 'SEMILLA', unidad: 'kg', descripcion: 'Grupo VII, tolerante a sequía' },
      { nombre: 'Semilla Maíz DK7210', tipo: 'SEMILLA', unidad: 'kg', descripcion: 'Híbrido simple, alto rendimiento' },
      { nombre: 'Mancozeb 80%', tipo: 'FUNGICIDA', unidad: 'kg', descripcion: 'Fungicida preventivo' },
      { nombre: 'Cipermetrina 25%', tipo: 'INSECTICIDA', unidad: 'litros', descripcion: 'Insecticida piretroide' },
      { nombre: 'Nitrato de Amonio', tipo: 'FERTILIZANTE', unidad: 'kg', descripcion: '34.5% N' },
    ] as const;

    const [glifosato, urea, fda, semSoja, semMaiz, mancozeb, cipermetrina, nitrato] =
      await Promise.all(
        insumosDemo.map(async (insumo) => {
          const existente = await this.prisma.insumo.findFirst({
            where: { nombre: insumo.nombre, organizacionId },
          });
          return existente ?? this.prisma.insumo.create({
            data: { ...insumo, organizacionId },
          });
        }),
      );

    if (!soja || !maiz || !trigo || !girasol) return;
    // ─── Campos y Lotes ──────────────────────────────────────────────────────
    const campoEsperanza = await this.prisma.campo.create({
      data: {
        nombre: 'La Esperanza',
        hectareas: 500,
        ubicacion: 'Pergamino, Buenos Aires',
        latitud: -33.8884,
        longitud: -60.5659,
        propietario: 'Juan Pérez',
        usuarioId: uid,
        organizacionId: organizacionId,
        lotes: {
          create: [
            { nombre: 'Lote Norte', hectareas: 120 },
            { nombre: 'Lote Sur', hectareas: 180 },
            { nombre: 'Lote Este', hectareas: 200 },
          ],
        },
      },
      include: { lotes: true },
    });

    const campoProgreso = await this.prisma.campo.create({
      data: {
        nombre: 'El Progreso',
        hectareas: 320,
        ubicacion: 'Marcos Juárez, Córdoba',
        latitud: -32.6978,
        longitud: -62.1028,
        propietario: 'Juan Pérez',
        usuarioId: uid,
        organizacionId: organizacionId,
        lotes: {
          create: [
            { nombre: 'Potrero 1', hectareas: 160 },
            { nombre: 'Potrero 2', hectareas: 160 },
          ],
        },
      },
      include: { lotes: true },
    });

    const campoLasMeninas = await this.prisma.campo.create({
      data: {
        nombre: 'Las Meninas',
        hectareas: 275,
        ubicacion: 'Rojas, Buenos Aires',
        latitud: -34.1975,
        longitud: -60.7331,
        propietario: 'Juan Pérez',
        usuarioId: uid,
        organizacionId,
        lotes: {
          create: [
            { nombre: 'Lote Molino', hectareas: 115 },
            { nombre: 'Lote Arboleda', hectareas: 160 },
          ],
        },
      },
      include: { lotes: true },
    });

    const campoElOmbu = await this.prisma.campo.create({
      data: {
        nombre: 'El Ombú',
        hectareas: 190,
        ubicacion: 'Colón, Buenos Aires',
        latitud: -33.8997,
        longitud: -61.1015,
        propietario: 'Juan Pérez',
        usuarioId: uid,
        organizacionId,
        lotes: {
          create: [
            { nombre: 'Bajo del Ombú', hectareas: 90 },
            { nombre: 'Loma Sur', hectareas: 100 },
          ],
        },
      },
      include: { lotes: true },
    });

    const [lNorte, lSur, lEste] = campoEsperanza.lotes;
    const [p1, p2] = campoProgreso.lotes;
    const [lMolino, lArboleda] = campoLasMeninas.lotes;
    const [lOmbu] = campoElOmbu.lotes;

    // ─── Campañas ────────────────────────────────────────────────────────────
    const camp2425 = await this.prisma.campania.create({
      data: {
        nombre: 'Campaña 2024/2025',
        fechaInicio: new Date('2024-10-01'),
        fechaFin: new Date('2025-06-30'),
        descripcion: 'Primera campaña completa en ambos campos',
        usuarioId: uid,
        organizacionId,
      },
    });

    const camp2526 = await this.prisma.campania.create({
      data: {
        nombre: 'Campaña 2025/2026',
        fechaInicio: new Date('2025-10-01'),
        descripcion: 'Campaña actual en curso',
        usuarioId: uid,
        organizacionId,
      },
    });

    const camp2627 = await this.prisma.campania.create({
      data: {
        nombre: 'Campaña 2026/2027',
        fechaInicio: new Date('2026-10-01'),
        descripcion: 'Planificación de rotaciones y cultivos de cobertura',
        usuarioId: uid,
        organizacionId,
      },
    });

    // ─── Siembras ─────────────────────────────────────────────────────────────
    const siem1 = await this.prisma.siembra.create({
      data: {
        loteId: lNorte.id,
        tipoCultivoId: soja.id,
        fechaSiembra: new Date('2024-11-10'),
        densidad: 60,
        estado: 'COSECHADA',
        observaciones: 'Siembra directa, muy buena nascencia',
        campaniaId: camp2425.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({
      data: [
        {
          siembraId: siem1.id,
          insumoId: semSoja.id,
          fecha: new Date('2024-11-10'),
          cantidad: 60,
          unidad: 'kg',
          observaciones: 'Inoculante aplicado',
        },
        {
          siembraId: siem1.id,
          insumoId: glifosato.id,
          fecha: new Date('2024-12-05'),
          cantidad: 2.5,
          unidad: 'litros',
          observaciones: 'Control de malezas temprano',
        },
        {
          siembraId: siem1.id,
          insumoId: fda.id,
          fecha: new Date('2024-11-10'),
          cantidad: 120,
          unidad: 'kg',
          observaciones: 'Fertilización de arranque',
        },
        {
          siembraId: siem1.id,
          insumoId: mancozeb.id,
          fecha: new Date('2025-01-20'),
          cantidad: 1.5,
          unidad: 'kg',
          observaciones: 'Prevención mancha ojo de rana',
        },
      ],
    });
    await this.prisma.cosecha.create({
      data: {
        siembraId: siem1.id,
        fechaCosecha: new Date('2025-04-15'),
        rendimientoKgHa: 3400,
        totalKg: 3400 * 120,
        humedad: 13.5,
        observaciones: 'Excelente campaña, sin inconvenientes',
      },
    });

    const siem2 = await this.prisma.siembra.create({
      data: {
        loteId: lSur.id,
        tipoCultivoId: maiz.id,
        fechaSiembra: new Date('2024-10-20'),
        densidad: 8,
        estado: 'COSECHADA',
        observaciones: 'Densidad ajustada por suelo arcilloso',
        campaniaId: camp2425.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({
      data: [
        {
          siembraId: siem2.id,
          insumoId: semMaiz.id,
          fecha: new Date('2024-10-20'),
          cantidad: 22,
          unidad: 'kg',
        },
        {
          siembraId: siem2.id,
          insumoId: urea.id,
          fecha: new Date('2024-10-20'),
          cantidad: 150,
          unidad: 'kg',
          observaciones: 'Fertilización base',
        },
        {
          siembraId: siem2.id,
          insumoId: urea.id,
          fecha: new Date('2024-12-10'),
          cantidad: 100,
          unidad: 'kg',
          observaciones: 'Fertirriego V6',
        },
        {
          siembraId: siem2.id,
          insumoId: cipermetrina.id,
          fecha: new Date('2025-01-05'),
          cantidad: 0.4,
          unidad: 'litros',
          observaciones: 'Control cogollero',
        },
      ],
    });
    await this.prisma.cosecha.create({
      data: {
        siembraId: siem2.id,
        fechaCosecha: new Date('2025-03-25'),
        rendimientoKgHa: 8800,
        totalKg: 8800 * 180,
        humedad: 14.2,
        observaciones: 'Rendimiento récord para el lote',
      },
    });

    const siem3 = await this.prisma.siembra.create({
      data: {
        loteId: p1.id,
        tipoCultivoId: trigo.id,
        fechaSiembra: new Date('2024-06-15'),
        densidad: 120,
        estado: 'COSECHADA',
        campaniaId: camp2425.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({
      data: [
        {
          siembraId: siem3.id,
          insumoId: fda.id,
          fecha: new Date('2024-06-15'),
          cantidad: 100,
          unidad: 'kg',
        },
        {
          siembraId: siem3.id,
          insumoId: nitrato.id,
          fecha: new Date('2024-08-01'),
          cantidad: 80,
          unidad: 'kg',
          observaciones: 'Encañazón',
        },
        {
          siembraId: siem3.id,
          insumoId: mancozeb.id,
          fecha: new Date('2024-09-10'),
          cantidad: 1.2,
          unidad: 'kg',
          observaciones: 'Fusariosis preventivo',
        },
      ],
    });
    await this.prisma.cosecha.create({
      data: {
        siembraId: siem3.id,
        fechaCosecha: new Date('2024-12-05'),
        rendimientoKgHa: 3100,
        totalKg: 3100 * 160,
        humedad: 12.8,
      },
    });

    const siem4 = await this.prisma.siembra.create({
      data: {
        loteId: lEste.id,
        tipoCultivoId: soja.id,
        fechaSiembra: new Date('2025-11-05'),
        densidad: 62,
        estado: 'EN_CURSO',
        observaciones: 'Variedad de ciclo largo',
        campaniaId: camp2526.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({
      data: [
        {
          siembraId: siem4.id,
          insumoId: semSoja.id,
          fecha: new Date('2025-11-05'),
          cantidad: 62,
          unidad: 'kg',
        },
        {
          siembraId: siem4.id,
          insumoId: glifosato.id,
          fecha: new Date('2025-12-10'),
          cantidad: 2,
          unidad: 'litros',
        },
      ],
    });

    const siem5 = await this.prisma.siembra.create({
      data: {
        loteId: p2.id,
        tipoCultivoId: girasol.id,
        fechaSiembra: new Date('2025-10-25'),
        densidad: 5.5,
        estado: 'EN_CURSO',
        campaniaId: camp2526.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({
      data: [
        {
          siembraId: siem5.id,
          insumoId: fda.id,
          fecha: new Date('2025-10-25'),
          cantidad: 90,
          unidad: 'kg',
        },
        {
          siembraId: siem5.id,
          insumoId: cipermetrina.id,
          fecha: new Date('2025-12-20'),
          cantidad: 0.3,
          unidad: 'litros',
          observaciones: 'Barrenador del girasol',
        },
      ],
    });

    // ─── Animales ─────────────────────────────────────────────────────────────
    const siem6 = await this.prisma.siembra.create({
      data: {
        loteId: lMolino.id,
        tipoCultivoId: maiz.id,
        fechaSiembra: new Date('2025-10-18'),
        densidad: 7.5,
        estado: 'EN_CURSO',
        observaciones: 'Maíz temprano con monitoreo semanal de humedad.',
        campaniaId: camp2526.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({
      data: [
        { siembraId: siem6.id, insumoId: semMaiz.id, fecha: new Date('2025-10-18'), cantidad: 20, unidad: 'kg' },
        { siembraId: siem6.id, insumoId: urea.id, fecha: new Date('2025-11-20'), cantidad: 130, unidad: 'kg' },
      ],
    });

    const siem7 = await this.prisma.siembra.create({
      data: {
        loteId: lArboleda.id,
        tipoCultivoId: trigo.id,
        fechaSiembra: new Date('2025-06-12'),
        densidad: 118,
        estado: 'COSECHADA',
        observaciones: 'Trigo de alta proteína para mercado local.',
        campaniaId: camp2425.id,
      },
    });
    await this.prisma.cosecha.create({
      data: {
        siembraId: siem7.id,
        fechaCosecha: new Date('2025-12-02'),
        rendimientoKgHa: 3550,
        totalKg: 3550 * 160,
        humedad: 12.4,
      },
    });

    const siem8 = await this.prisma.siembra.create({
      data: {
        loteId: lOmbu.id,
        tipoCultivoId: girasol.id,
        fechaSiembra: new Date('2026-10-10'),
        densidad: 5.2,
        estado: 'EN_CURSO',
        observaciones: 'Lote previsto para girasol alto oleico.',
        campaniaId: camp2627.id,
      },
    });
    await this.prisma.aplicacionInsumo.create({
      data: {
        siembraId: siem8.id,
        insumoId: fda.id,
        fecha: new Date('2026-10-10'),
        cantidad: 95,
        unidad: 'kg',
      },
    });

    const animalesData = [
      {
        nombre: 'Pantanera 01',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'VACA',
        peso: 480,
        fechaNacimiento: new Date('2019-08-15'),
      },
      {
        nombre: 'Pantanera 02',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'VACA',
        peso: 510,
        fechaNacimiento: new Date('2018-05-22'),
      },
      {
        nombre: 'Pantanera 03',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'VACA',
        peso: 465,
        fechaNacimiento: new Date('2020-03-10'),
      },
      {
        nombre: 'Pantanera 04',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'VACA',
        peso: 495,
        fechaNacimiento: new Date('2019-11-30'),
      },
      {
        nombre: 'Pantanera 05',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'VACA',
        peso: 520,
        fechaNacimiento: new Date('2017-07-18'),
      },
      {
        nombre: 'Vaquillona 01',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'VAQUILLONA',
        peso: 340,
        fechaNacimiento: new Date('2022-10-05'),
      },
      {
        nombre: 'Patagón',
        especie: 'BOVINO',
        sexo: 'MACHO',
        categoria: 'TORO',
        peso: 820,
        fechaNacimiento: new Date('2018-02-14'),
      },
      {
        nombre: 'Ternero 01',
        especie: 'BOVINO',
        sexo: 'MACHO',
        categoria: 'TERNERO',
        peso: 145,
        fechaNacimiento: new Date('2024-09-12'),
      },
      {
        nombre: 'Ternero 02',
        especie: 'BOVINO',
        sexo: 'MACHO',
        categoria: 'TERNERO',
        peso: 138,
        fechaNacimiento: new Date('2024-10-01'),
      },
      {
        nombre: 'Ternera 01',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'TERNERA',
        peso: 130,
        fechaNacimiento: new Date('2024-09-25'),
      },
      {
        nombre: 'Novillo 01',
        especie: 'BOVINO',
        sexo: 'MACHO',
        categoria: 'NOVILLO',
        peso: 390,
        fechaNacimiento: new Date('2022-08-20'),
      },
      {
        nombre: 'Novillo 02',
        especie: 'BOVINO',
        sexo: 'MACHO',
        categoria: 'NOVILLO',
        peso: 410,
        fechaNacimiento: new Date('2022-07-15'),
      },
      {
        nombre: 'Pantanera 06',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'VACA',
        peso: 505,
        fechaNacimiento: new Date('2018-09-08'),
      },
      {
        nombre: 'Vaquillona 02',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'VAQUILLONA',
        peso: 355,
        fechaNacimiento: new Date('2022-06-21'),
      },
      {
        nombre: 'Novillo 03',
        especie: 'BOVINO',
        sexo: 'MACHO',
        categoria: 'NOVILLO',
        peso: 430,
        fechaNacimiento: new Date('2021-11-12'),
      },
      {
        nombre: 'Ternero 03',
        especie: 'BOVINO',
        sexo: 'MACHO',
        categoria: 'TERNERO',
        peso: 152,
        fechaNacimiento: new Date('2024-08-30'),
      },
      {
        nombre: 'Ternera 02',
        especie: 'BOVINO',
        sexo: 'HEMBRA',
        categoria: 'TERNERA',
        peso: 142,
        fechaNacimiento: new Date('2024-10-18'),
      },
      {
        nombre: 'Mora',
        especie: 'EQUINO',
        sexo: 'HEMBRA',
        categoria: 'YEGUA',
        peso: 460,
        fechaNacimiento: new Date('2016-03-04'),
      },
      {
        nombre: 'Rayo',
        especie: 'EQUINO',
        sexo: 'MACHO',
        categoria: 'POTRO',
        peso: 290,
        fechaNacimiento: new Date('2023-01-18'),
      },
      {
        nombre: 'Oveja 01',
        especie: 'OVINO',
        sexo: 'HEMBRA',
        categoria: 'OVEJA',
        peso: 68,
        fechaNacimiento: new Date('2021-05-16'),
      },
    ] as const;

    const animales = await Promise.all(
      animalesData.map((a) =>
        this.prisma.animal.create({ data: { ...a, usuarioId: uid, organizacionId } }),
      ),
    );

    for (const vaca of animales.slice(0, 5)) {
      const base = vaca.peso ?? 480;
      await this.prisma.registroPeso.createMany({
        data: [
          { animalId: vaca.id, peso: base - 40, fecha: new Date('2024-11-01') },
          { animalId: vaca.id, peso: base - 20, fecha: new Date('2025-01-01') },
          { animalId: vaca.id, peso: base, fecha: new Date('2025-03-01') },
          { animalId: vaca.id, peso: base + 10, fecha: new Date('2025-05-01') },
        ],
      });
    }

    const [p01, p02, p03] = animales;
    await this.prisma.prenez.createMany({
      data: [
        {
          animalId: p01.id,
          fechaInicio: new Date('2025-03-10'),
          fechaEstimadaParto: new Date('2025-12-15'),
          estado: 'EN_CURSO',
        },
        {
          animalId: p02.id,
          fechaInicio: new Date('2025-04-05'),
          fechaEstimadaParto: new Date('2026-01-10'),
          estado: 'EN_CURSO',
        },
        {
          animalId: p03.id,
          fechaInicio: new Date('2024-08-01'),
          fechaEstimadaParto: new Date('2025-05-08'),
          estado: 'COMPLETADA',
          observaciones: 'Parto sin complicaciones',
        },
      ],
    });

    // ─── Tareas ───────────────────────────────────────────────────────────────
    await this.prisma.tareaRural.createMany({
      data: ([
        {
          usuarioId: uid,
          titulo: 'Aplicar herbicida Lote Este',
          descripcion: 'Glifosato para control de yuyo colorado',
          tipo: 'FUMIGACION',
          estado: 'PENDIENTE',
          prioridad: 'ALTA',
          fechaProgramada: new Date('2026-05-15'),
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          titulo: 'Revisión sanitaria rodeo',
          descripcion: 'Vacunación antiaftosa y brucelosis',
          tipo: 'VETERINARIA',
          estado: 'PENDIENTE',
          prioridad: 'ALTA',
          fechaProgramada: new Date('2026-05-20'),
        },
        {
          usuarioId: uid,
          titulo: 'Fertilizar Potrero 2',
          descripcion: 'Urea 100kg/ha en cobertura',
          tipo: 'FERTILIZACION',
          estado: 'EN_CURSO',
          prioridad: 'MEDIA',
          fechaProgramada: new Date('2026-05-08'),
          campoId: campoProgreso.id,
        },
        {
          usuarioId: uid,
          titulo: 'Mantenimiento aguada norte',
          descripcion: 'Revisión bebederos y bomba',
          tipo: 'MANTENIMIENTO',
          estado: 'PENDIENTE',
          prioridad: 'BAJA',
          fechaProgramada: new Date('2026-05-25'),
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          titulo: 'Cosecha soja Lote Este',
          descripcion: 'Coordinar cosechadora',
          tipo: 'COSECHA',
          estado: 'PENDIENTE',
          prioridad: 'URGENTE',
          fechaProgramada: new Date('2026-04-20'),
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          titulo: 'Análisis de suelo Lote Norte',
          descripcion: 'Laboratorio Rizobacter',
          tipo: 'OTRO',
          estado: 'COMPLETADA',
          prioridad: 'MEDIA',
          fechaProgramada: new Date('2025-09-10'),
          fechaCompletada: new Date('2025-09-12'),
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          titulo: 'Reparar alambrado sur',
          descripcion: '200m de alambre de 5 hilos',
          tipo: 'MANTENIMIENTO',
          estado: 'COMPLETADA',
          prioridad: 'MEDIA',
          fechaProgramada: new Date('2025-10-05'),
          fechaCompletada: new Date('2025-10-07'),
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          titulo: 'Siembra trigo invierno',
          descripcion: 'Variedad Buck SY 200',
          tipo: 'SIEMBRA',
          estado: 'PENDIENTE',
          prioridad: 'ALTA',
          fechaProgramada: new Date('2026-06-15'),
          campoId: campoProgreso.id,
        },
        {
          usuarioId: uid,
          titulo: 'Desmalezado caminos internos',
          descripcion: 'Rotativa en caminos del campo',
          tipo: 'MANTENIMIENTO',
          estado: 'COMPLETADA',
          prioridad: 'BAJA',
          fechaProgramada: new Date('2025-11-20'),
          fechaCompletada: new Date('2025-11-22'),
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          titulo: 'Control de plagas girasol',
          descripcion: 'Monitoreo y eventual aplicación',
          tipo: 'FUMIGACION',
          estado: 'EN_CURSO',
          prioridad: 'ALTA',
          fechaProgramada: new Date('2026-01-10'),
          campoId: campoProgreso.id,
        },
        {
          usuarioId: uid,
          titulo: 'Relevar malezas en Las Meninas',
          descripcion: 'Recorrer Lote Molino y registrar focos de rama negra',
          tipo: 'OTRO',
          estado: 'PENDIENTE',
          prioridad: 'MEDIA',
          fechaProgramada: new Date('2026-05-28'),
          campoId: campoLasMeninas.id,
        },
        {
          usuarioId: uid,
          titulo: 'Servicio tractor principal',
          descripcion: 'Cambio de aceite, filtros y revisión hidráulica',
          tipo: 'MANTENIMIENTO',
          estado: 'PENDIENTE',
          prioridad: 'ALTA',
          fechaProgramada: new Date('2026-06-03'),
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          titulo: 'Planificar siembra de cobertura',
          descripcion: 'Definir mezcla de vicia y centeno para El Ombú',
          tipo: 'SIEMBRA',
          estado: 'EN_CURSO',
          prioridad: 'MEDIA',
          fechaProgramada: new Date('2026-06-12'),
          campoId: campoElOmbu.id,
        },
        {
          usuarioId: uid,
          titulo: 'Control sanitario equinos',
          descripcion: 'Desparasitación y control odontológico anual',
          tipo: 'VETERINARIA',
          estado: 'CANCELADA',
          prioridad: 'BAJA',
          fechaProgramada: new Date('2025-12-15'),
          campoId: campoLasMeninas.id,
        },
      ] as const).map(
        (tarea): Prisma.TareaRuralCreateManyInput => ({ ...tarea, organizacionId }),
      ),
    });

    // ─── Maquinarias ─────────────────────────────────────────────────────────
    await this.prisma.maquinaria.createMany({
      data: ([
        {
          usuarioId: uid,
          nombre: 'Tractor John Deere 5075E',
          tipo: 'TRACTOR',
          estado: 'OPERATIVA',
          marca: 'John Deere',
          modelo: '5075E',
          anio: 2021,
          patente: 'AB123CD',
          campoId: campoEsperanza.id,
          horasUso: 1500,
          seguroVencimiento: new Date('2026-09-15'),
          vtvVencimiento: new Date('2026-10-20'),
          observaciones:
            'Usado para siembra y traslado de implementos. Último service realizado en mayo.',
        },
        {
          usuarioId: uid,
          nombre: 'Sembradora Presión Stara Megavário',
          tipo: 'SEMBRADORA',
          estado: 'OPERATIVA',
          marca: 'Stara',
          modelo: 'Megavário 25',
          anio: 2019,
          patente: 'CD456EF',
          horasUso: 800,
          seguroVencimiento: new Date('2026-06-30'),
          observaciones: '25 líneas, usada en ambos campos.',
        },
        {
          usuarioId: uid,
          nombre: 'Pulverizadora Jacto Condor 3000',
          tipo: 'PULVERIZADORA',
          estado: 'OPERATIVA',
          marca: 'Jacto',
          modelo: 'Condor 3000',
          anio: 2020,
          patente: 'EF789GH',
          horasUso: 650,
          observaciones: '3000 litros, barra de 24m.',
        },
        {
          usuarioId: uid,
          nombre: 'Cosechadora Claas Lexion 650',
          tipo: 'COSECHADORA',
          estado: 'OPERATIVA',
          marca: 'Claas',
          modelo: 'Lexion 650',
          anio: 2018,
          patente: 'GH012IJ',
          horasUso: 1200,
          seguroVencimiento: new Date('2026-08-15'),
          observaciones: 'Granos y girasol. Motor reciente.',
        },
        {
          usuarioId: uid,
          nombre: 'Rastra de Discos Bertoni RD32',
          tipo: 'HERRAMIENTA',
          estado: 'OPERATIVA',
          marca: 'Bertoni',
          modelo: 'RD32',
          anio: 2022,
          observaciones: '32 discos hidráulica independiente.',
        },
        {
          usuarioId: uid,
          nombre: 'Camioneta Toyota Hilux SRX',
          tipo: 'CAMIONETA',
          estado: 'OPERATIVA',
          marca: 'Toyota',
          modelo: 'Hilux SRX 4x4',
          anio: 2023,
          patente: 'AE345LM',
          campoId: campoLasMeninas.id,
          horasUso: 420,
          seguroVencimiento: new Date('2026-12-01'),
          vtvVencimiento: new Date('2026-11-18'),
          observaciones: 'Unidad de recorrida y traslados entre campos.',
        },
        {
          usuarioId: uid,
          nombre: 'Tolva Autodescargable Ombú 14T',
          tipo: 'TOLVA',
          estado: 'EN_MANTENIMIENTO',
          marca: 'Ombú',
          modelo: 'TA 14',
          anio: 2017,
          campoId: campoElOmbu.id,
          horasUso: 980,
          observaciones: 'Cambio de rodamientos programado antes de cosecha.',
        },
        {
          usuarioId: uid,
          nombre: 'Mixer Vertical Mainero 2910',
          tipo: 'MIXER',
          estado: 'FUERA_DE_SERVICIO',
          marca: 'Mainero',
          modelo: '2910',
          anio: 2016,
          horasUso: 2300,
          observaciones: 'En evaluación para reparación del sinfín.',
        },
      ] as const).map(
        (maquinaria): Prisma.MaquinariaCreateManyInput => ({ ...maquinaria, organizacionId }),
      ),
    });

    const maquinariasDemo = await this.prisma.maquinaria.findMany({
      where: { usuarioId: uid, organizacionId },
      select: { id: true, nombre: true },
    });
    const maquinariaIdPorNombre = new Map(
      maquinariasDemo.map((maquinaria) => [maquinaria.nombre, maquinaria.id]),
    );
    const tractorId = maquinariaIdPorNombre.get('Tractor John Deere 5075E');
    const tolvaId = maquinariaIdPorNombre.get('Tolva Autodescargable Ombú 14T');
    const camionetaId = maquinariaIdPorNombre.get('Camioneta Toyota Hilux SRX');

    if (tractorId && tolvaId && camionetaId) {
      await this.prisma.mantenimientoMaquinaria.createMany({
        data: [
          {
            maquinariaId: tractorId,
            tipo: 'CAMBIO_ACEITE',
            descripcion: 'Cambio de aceite, filtros y revisión de correas.',
            fecha: new Date('2026-05-18'),
            horasUso: 1500,
            costo: 185000,
            proximoMantenimiento: new Date('2026-11-18'),
          },
          {
            maquinariaId: tolvaId,
            tipo: 'REPARACION',
            descripcion: 'Reemplazo de rodamientos y ajuste de descarga.',
            fecha: new Date('2026-02-08'),
            costo: 98500,
            proximoMantenimiento: new Date('2026-10-01'),
          },
          {
            maquinariaId: camionetaId,
            tipo: 'REVISION_GENERAL',
            descripcion: 'Service preventivo para recorridas de campo.',
            fecha: new Date('2026-04-22'),
            horasUso: 48500,
            costo: 142000,
          },
        ],
      });

      await this.prisma.gastoMaquinaria.createMany({
        data: [
          {
            maquinariaId: tractorId,
            tipo: 'COMBUSTIBLE',
            descripcion: 'Gasoil para labores de siembra y fertilización.',
            monto: 286000,
            fecha: new Date('2026-05-20'),
          },
          {
            maquinariaId: tolvaId,
            tipo: 'REPUESTO',
            descripcion: 'Rodamientos y retenes para reparación de tolva.',
            monto: 67400,
            fecha: new Date('2026-02-06'),
          },
          {
            maquinariaId: camionetaId,
            tipo: 'SEGURO',
            descripcion: 'Póliza anual para uso productivo.',
            monto: 128000,
            fecha: new Date('2026-01-05'),
          },
        ],
      });
    }

    // Finanzas (ingresos y egresos)
    await this.prisma.movimientoFinanciero.createMany({
      data: ([
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta soja Lote Norte 408t',
          monto: (408000 * 3400) / 1000 * 2.1,
          fecha: new Date('2025-04-20'),
          categoria: 'COSECHA',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta maíz Lote Sur 1584t',
          monto: 1584 * 180 * 0.9,
          fecha: new Date('2025-03-28'),
          categoria: 'COSECHA',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta trigo Potrero 1 496t',
          monto: 496 * 160 * 0.85,
          fecha: new Date('2024-12-10'),
          categoria: 'COSECHA',
          campoId: campoProgreso.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta novillo 01 y 02',
          monto: 420000,
          fecha: new Date('2025-02-15'),
          categoria: 'VENTA_ANIMAL',
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Arrendamiento parcela oeste',
          monto: 85000,
          fecha: new Date('2025-01-05'),
          categoria: 'OTRO',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta terneros 3 cabezas',
          monto: 180000,
          fecha: new Date('2025-05-02'),
          categoria: 'VENTA_ANIMAL',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Semilla soja NK7059 — 60kg × 120ha',
          monto: 72000,
          fecha: new Date('2024-11-08'),
          categoria: 'INSUMO',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Semilla maíz DK7210 — 22kg × 180ha',
          monto: 95000,
          fecha: new Date('2024-10-18'),
          categoria: 'INSUMO',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Urea 250kg × 180ha',
          monto: 48000,
          fecha: new Date('2024-10-20'),
          categoria: 'INSUMO',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'FDA 100kg × 160ha trigo',
          monto: 22000,
          fecha: new Date('2024-06-14'),
          categoria: 'INSUMO',
          campoId: campoProgreso.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Servicio cosecha soja',
          monto: 110000,
          fecha: new Date('2025-04-15'),
          categoria: 'SERVICIO',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Servicio cosecha maíz',
          monto: 135000,
          fecha: new Date('2025-03-24'),
          categoria: 'SERVICIO',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Combustible — campaña completa',
          monto: 62000,
          fecha: new Date('2025-01-15'),
          categoria: 'COMBUSTIBLE',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Mano de obra — 3 peones mensual',
          monto: 180000,
          fecha: new Date('2025-02-01'),
          categoria: 'MANO_DE_OBRA',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Vacunación antiaftosa rodeo',
          monto: 18500,
          fecha: new Date('2025-04-01'),
          categoria: 'VETERINARIA',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Reparación tranquera y alambrado',
          monto: 25000,
          fecha: new Date('2025-03-10'),
          categoria: 'MANTENIMIENTO',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Semilla soja Lote Este',
          monto: 78000,
          fecha: new Date('2025-11-03'),
          categoria: 'INSUMO',
          campoId: campoEsperanza.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'FDA girasol Potrero 2',
          monto: 19800,
          fecha: new Date('2025-10-23'),
          categoria: 'INSUMO',
          campoId: campoProgreso.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta trigo Lote Arboleda',
          monto: 565000,
          fecha: new Date('2025-12-06'),
          categoria: 'COSECHA',
          campoId: campoLasMeninas.id,
          siembraId: siem7.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta de lana ovina',
          monto: 72000,
          fecha: new Date('2025-11-14'),
          categoria: 'VENTA_ANIMAL',
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Servicio de siembra a terceros',
          monto: 145000,
          fecha: new Date('2026-01-22'),
          categoria: 'SERVICIO',
          campoId: campoProgreso.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Reparación de tolva autodescargable',
          monto: 98500,
          fecha: new Date('2026-02-08'),
          categoria: 'MANTENIMIENTO',
          campoId: campoElOmbu.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Seguro anual camioneta Hilux',
          monto: 128000,
          fecha: new Date('2026-01-05'),
          categoria: 'OTRO',
          campoId: campoLasMeninas.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Análisis de suelo Las Meninas',
          monto: 46500,
          fecha: new Date('2026-03-12'),
          categoria: 'SERVICIO',
          campoId: campoLasMeninas.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Combustible recorridas de enero',
          monto: 87500,
          fecha: new Date('2026-01-31'),
          categoria: 'COMBUSTIBLE',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Fertilizante maíz Lote Molino',
          monto: 115000,
          fecha: new Date('2025-11-18'),
          categoria: 'INSUMO',
          campoId: campoLasMeninas.id,
          siembraId: siem6.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Honorarios asesor agronómico',
          monto: 92000,
          fecha: new Date('2026-02-01'),
          categoria: 'SERVICIO',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Mantenimiento de aguadas',
          monto: 38500,
          fecha: new Date('2026-03-04'),
          categoria: 'MANTENIMIENTO',
          campoId: campoElOmbu.id,
        },
      ] as const).map(
        (movimiento): Prisma.MovimientoFinancieroCreateManyInput => ({ ...movimiento, organizacionId }),
      ),
    });
  }
}
