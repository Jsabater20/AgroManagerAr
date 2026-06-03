import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

export const DEMO_EMAIL = 'demo@agromanager.ar';

@Injectable()
export class DemoService {
  private readonly logger = new Logger(DemoService.name);

  constructor(private prisma: PrismaService) {}

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

    // ── Borrar datos de usuario demo en orden correcto ──────────────────────
    const campos = await this.prisma.campo.findMany({
      where: { usuarioId: uid },
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
          await this.prisma.aplicacionInsumo.deleteMany({ where: { siembraId: { in: siembraIds } } });
          await this.prisma.cosecha.deleteMany({ where: { siembraId: { in: siembraIds } } });
          await this.prisma.siembra.deleteMany({ where: { id: { in: siembraIds } } });
        }
        await this.prisma.lote.deleteMany({ where: { id: { in: loteIds } } });
      }
    }

    await this.prisma.campania.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.campo.deleteMany({ where: { usuarioId: uid } });

    const animales = await this.prisma.animal.findMany({
      where: { usuarioId: uid },
      select: { id: true },
    });
    const animalIds = animales.map((a) => a.id);
    if (animalIds.length) {
      await this.prisma.registroPeso.deleteMany({ where: { animalId: { in: animalIds } } });
      await this.prisma.prenez.deleteMany({ where: { animalId: { in: animalIds } } });
      await this.prisma.animal.deleteMany({ where: { id: { in: animalIds } } });
    }

    await this.prisma.tareaRural.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.movimientoFinanciero.deleteMany({ where: { usuarioId: uid } });

    // ── Re-crear datos demo ──────────────────────────────────────────────────
    await this.seedDemoData(uid);
  }

  async seedDemoData(uid: number) {
    // Obtener tipos de cultivo e insumos existentes por nombre
    const [soja, maiz, trigo, girasol] = await Promise.all([
      this.prisma.tipoCultivo.findFirst({ where: { nombre: 'Soja' } }),
      this.prisma.tipoCultivo.findFirst({ where: { nombre: 'Maíz' } }),
      this.prisma.tipoCultivo.findFirst({ where: { nombre: 'Trigo' } }),
      this.prisma.tipoCultivo.findFirst({ where: { nombre: 'Girasol' } }),
    ]);
    const [glifosato, urea, fda, semSoja, semMaiz, mancozeb, cipermetrina, nitrato] =
      await Promise.all([
        this.prisma.insumo.findFirst({ where: { nombre: 'Glifosato 48%' } }),
        this.prisma.insumo.findFirst({ where: { nombre: 'Urea Granulada' } }),
        this.prisma.insumo.findFirst({ where: { nombre: 'Fosfato Diamónico' } }),
        this.prisma.insumo.findFirst({ where: { nombre: 'Semilla Soja NK7059' } }),
        this.prisma.insumo.findFirst({ where: { nombre: 'Semilla Maíz DK7210' } }),
        this.prisma.insumo.findFirst({ where: { nombre: 'Mancozeb 80%' } }),
        this.prisma.insumo.findFirst({ where: { nombre: 'Cipermetrina 25%' } }),
        this.prisma.insumo.findFirst({ where: { nombre: 'Nitrato de Amonio' } }),
      ]);

    if (!soja || !maiz || !trigo || !girasol) return;
    if (!glifosato || !urea || !fda || !semSoja || !semMaiz || !mancozeb || !cipermetrina || !nitrato) return;

    // ─── Campos y Lotes ──────────────────────────────────────────────────────
    const campoEsperanza = await this.prisma.campo.create({
      data: {
        nombre: 'La Esperanza',
        hectareas: 500,
        ubicacion: 'Pergamino, Buenos Aires',
        propietario: 'Juan Pérez',
        usuarioId: uid,
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
        propietario: 'Juan Pérez',
        usuarioId: uid,
        lotes: {
          create: [
            { nombre: 'Potrero 1', hectareas: 160 },
            { nombre: 'Potrero 2', hectareas: 160 },
          ],
        },
      },
      include: { lotes: true },
    });

    const [lNorte, lSur, lEste] = campoEsperanza.lotes;
    const [p1, p2] = campoProgreso.lotes;

    // ─── Campañas ────────────────────────────────────────────────────────────
    const camp2425 = await this.prisma.campania.create({
      data: {
        nombre: 'Campaña 2024/2025',
        fechaInicio: new Date('2024-10-01'),
        fechaFin: new Date('2025-06-30'),
        descripcion: 'Primera campaña completa en ambos campos',
        usuarioId: uid,
      },
    });
    const camp2526 = await this.prisma.campania.create({
      data: {
        nombre: 'Campaña 2025/2026',
        fechaInicio: new Date('2025-10-01'),
        descripcion: 'Campaña actual en curso',
        usuarioId: uid,
      },
    });

    // ─── Siembras ─────────────────────────────────────────────────────────────
    const siem1 = await this.prisma.siembra.create({
      data: {
        loteId: lNorte.id, tipoCultivoId: soja.id,
        fechaSiembra: new Date('2024-11-10'), densidad: 60, estado: 'COSECHADA',
        observaciones: 'Siembra directa, muy buena nascencia', campaniaId: camp2425.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({ data: [
      { siembraId: siem1.id, insumoId: semSoja.id, fecha: new Date('2024-11-10'), cantidad: 60, unidad: 'kg', observaciones: 'Inoculante aplicado' },
      { siembraId: siem1.id, insumoId: glifosato.id, fecha: new Date('2024-12-05'), cantidad: 2.5, unidad: 'litros', observaciones: 'Control de malezas temprano' },
      { siembraId: siem1.id, insumoId: fda.id, fecha: new Date('2024-11-10'), cantidad: 120, unidad: 'kg', observaciones: 'Fertilización de arranque' },
      { siembraId: siem1.id, insumoId: mancozeb.id, fecha: new Date('2025-01-20'), cantidad: 1.5, unidad: 'kg', observaciones: 'Prevención mancha ojo de rana' },
    ]});
    await this.prisma.cosecha.create({ data: {
      siembraId: siem1.id, fechaCosecha: new Date('2025-04-15'),
      rendimientoKgHa: 3400, totalKg: 3400 * lNorte.hectareas,
      humedad: 13.5, observaciones: 'Excelente campaña, sin inconvenientes',
    }});

    const siem2 = await this.prisma.siembra.create({
      data: {
        loteId: lSur.id, tipoCultivoId: maiz.id,
        fechaSiembra: new Date('2024-10-20'), densidad: 8, estado: 'COSECHADA',
        observaciones: 'Densidad ajustada por suelo arcilloso', campaniaId: camp2425.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({ data: [
      { siembraId: siem2.id, insumoId: semMaiz.id, fecha: new Date('2024-10-20'), cantidad: 22, unidad: 'kg' },
      { siembraId: siem2.id, insumoId: urea.id, fecha: new Date('2024-10-20'), cantidad: 150, unidad: 'kg', observaciones: 'Fertilización base' },
      { siembraId: siem2.id, insumoId: urea.id, fecha: new Date('2024-12-10'), cantidad: 100, unidad: 'kg', observaciones: 'Fertirriego V6' },
      { siembraId: siem2.id, insumoId: cipermetrina.id, fecha: new Date('2025-01-05'), cantidad: 0.4, unidad: 'litros', observaciones: 'Control cogollero' },
    ]});
    await this.prisma.cosecha.create({ data: {
      siembraId: siem2.id, fechaCosecha: new Date('2025-03-25'),
      rendimientoKgHa: 8800, totalKg: 8800 * lSur.hectareas,
      humedad: 14.2, observaciones: 'Rendimiento récord para el lote',
    }});

    const siem3 = await this.prisma.siembra.create({
      data: {
        loteId: p1.id, tipoCultivoId: trigo.id,
        fechaSiembra: new Date('2024-06-15'), densidad: 120, estado: 'COSECHADA', campaniaId: camp2425.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({ data: [
      { siembraId: siem3.id, insumoId: fda.id, fecha: new Date('2024-06-15'), cantidad: 100, unidad: 'kg' },
      { siembraId: siem3.id, insumoId: nitrato.id, fecha: new Date('2024-08-01'), cantidad: 80, unidad: 'kg', observaciones: 'Encañazón' },
      { siembraId: siem3.id, insumoId: mancozeb.id, fecha: new Date('2024-09-10'), cantidad: 1.2, unidad: 'kg', observaciones: 'Fusariosis preventivo' },
    ]});
    await this.prisma.cosecha.create({ data: {
      siembraId: siem3.id, fechaCosecha: new Date('2024-12-05'),
      rendimientoKgHa: 3100, totalKg: 3100 * p1.hectareas, humedad: 12.8,
    }});

    const siem4 = await this.prisma.siembra.create({
      data: {
        loteId: lEste.id, tipoCultivoId: soja.id,
        fechaSiembra: new Date('2025-11-05'), densidad: 62, estado: 'EN_CURSO',
        observaciones: 'Variedad de ciclo largo', campaniaId: camp2526.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({ data: [
      { siembraId: siem4.id, insumoId: semSoja.id, fecha: new Date('2025-11-05'), cantidad: 62, unidad: 'kg' },
      { siembraId: siem4.id, insumoId: glifosato.id, fecha: new Date('2025-12-10'), cantidad: 2, unidad: 'litros' },
    ]});

    const siem5 = await this.prisma.siembra.create({
      data: {
        loteId: p2.id, tipoCultivoId: girasol.id,
        fechaSiembra: new Date('2025-10-25'), densidad: 5.5, estado: 'EN_CURSO', campaniaId: camp2526.id,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({ data: [
      { siembraId: siem5.id, insumoId: fda.id, fecha: new Date('2025-10-25'), cantidad: 90, unidad: 'kg' },
      { siembraId: siem5.id, insumoId: cipermetrina.id, fecha: new Date('2025-12-20'), cantidad: 0.3, unidad: 'litros', observaciones: 'Barrenador del girasol' },
    ]});

    // ─── Animales ─────────────────────────────────────────────────────────────
    const animalesData = [
      { nombre: 'Pantanera 01', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VACA', peso: 480, fechaNacimiento: new Date('2019-08-15') },
      { nombre: 'Pantanera 02', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VACA', peso: 510, fechaNacimiento: new Date('2018-05-22') },
      { nombre: 'Pantanera 03', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VACA', peso: 465, fechaNacimiento: new Date('2020-03-10') },
      { nombre: 'Pantanera 04', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VACA', peso: 495, fechaNacimiento: new Date('2019-11-30') },
      { nombre: 'Pantanera 05', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VACA', peso: 520, fechaNacimiento: new Date('2017-07-18') },
      { nombre: 'Vaquillona 01', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VAQUILLONA', peso: 340, fechaNacimiento: new Date('2022-10-05') },
      { nombre: 'Patagón', especie: 'BOVINO', sexo: 'MACHO', categoria: 'TORO', peso: 820, fechaNacimiento: new Date('2018-02-14') },
      { nombre: 'Ternero 01', especie: 'BOVINO', sexo: 'MACHO', categoria: 'TERNERO', peso: 145, fechaNacimiento: new Date('2024-09-12') },
      { nombre: 'Ternero 02', especie: 'BOVINO', sexo: 'MACHO', categoria: 'TERNERO', peso: 138, fechaNacimiento: new Date('2024-10-01') },
      { nombre: 'Ternera 01', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'TERNERA', peso: 130, fechaNacimiento: new Date('2024-09-25') },
      { nombre: 'Novillo 01', especie: 'BOVINO', sexo: 'MACHO', categoria: 'NOVILLO', peso: 390, fechaNacimiento: new Date('2022-08-20') },
      { nombre: 'Novillo 02', especie: 'BOVINO', sexo: 'MACHO', categoria: 'NOVILLO', peso: 410, fechaNacimiento: new Date('2022-07-15') },
    ] as const;

    const animales = await Promise.all(
      animalesData.map((a) => this.prisma.animal.create({ data: { ...a, usuarioId: uid } })),
    );

    for (const vaca of animales.slice(0, 5)) {
      const base = vaca.peso ?? 480;
      await this.prisma.registroPeso.createMany({ data: [
        { animalId: vaca.id, peso: base - 40, fecha: new Date('2024-11-01') },
        { animalId: vaca.id, peso: base - 20, fecha: new Date('2025-01-01') },
        { animalId: vaca.id, peso: base, fecha: new Date('2025-03-01') },
        { animalId: vaca.id, peso: base + 10, fecha: new Date('2025-05-01') },
      ]});
    }

    const [p01, p02, p03] = animales;
    await this.prisma.prenez.createMany({ data: [
      { animalId: p01.id, fechaInicio: new Date('2025-03-10'), fechaEstimadaParto: new Date('2025-12-15'), estado: 'EN_CURSO' },
      { animalId: p02.id, fechaInicio: new Date('2025-04-05'), fechaEstimadaParto: new Date('2026-01-10'), estado: 'EN_CURSO' },
      { animalId: p03.id, fechaInicio: new Date('2024-08-01'), fechaEstimadaParto: new Date('2025-05-08'), estado: 'COMPLETADA', observaciones: 'Parto sin complicaciones' },
    ]});

    // ─── Tareas ───────────────────────────────────────────────────────────────
    await this.prisma.tareaRural.createMany({ data: [
      { usuarioId: uid, titulo: 'Aplicar herbicida Lote Este', descripcion: 'Glifosato para control de yuyo colorado', tipo: 'FUMIGACION', estado: 'PENDIENTE', prioridad: 'ALTA', fechaProgramada: new Date('2026-05-15'), campoId: campoEsperanza.id },
      { usuarioId: uid, titulo: 'Revisión sanitaria rodeo', descripcion: 'Vacunación antiaftosa y brucelosis', tipo: 'VETERINARIA', estado: 'PENDIENTE', prioridad: 'ALTA', fechaProgramada: new Date('2026-05-20') },
      { usuarioId: uid, titulo: 'Fertilizar Potrero 2', descripcion: 'Urea 100kg/ha en cobertura', tipo: 'FERTILIZACION', estado: 'EN_CURSO', prioridad: 'MEDIA', fechaProgramada: new Date('2026-05-08'), campoId: campoProgreso.id },
      { usuarioId: uid, titulo: 'Mantenimiento aguada norte', descripcion: 'Revisión bebederos y bomba', tipo: 'MANTENIMIENTO', estado: 'PENDIENTE', prioridad: 'BAJA', fechaProgramada: new Date('2026-05-25'), campoId: campoEsperanza.id },
      { usuarioId: uid, titulo: 'Cosecha soja Lote Este', descripcion: 'Coordinar cosechadora', tipo: 'COSECHA', estado: 'PENDIENTE', prioridad: 'URGENTE', fechaProgramada: new Date('2026-04-20'), campoId: campoEsperanza.id },
      { usuarioId: uid, titulo: 'Análisis de suelo Lote Norte', descripcion: 'Laboratorio Rizobacter', tipo: 'OTRO', estado: 'COMPLETADA', prioridad: 'MEDIA', fechaProgramada: new Date('2025-09-10'), fechaCompletada: new Date('2025-09-12'), campoId: campoEsperanza.id },
      { usuarioId: uid, titulo: 'Reparar alambrado sur', descripcion: '200m de alambre de 5 hilos', tipo: 'MANTENIMIENTO', estado: 'COMPLETADA', prioridad: 'MEDIA', fechaProgramada: new Date('2025-10-05'), fechaCompletada: new Date('2025-10-07'), campoId: campoEsperanza.id },
      { usuarioId: uid, titulo: 'Siembra trigo invierno', descripcion: 'Variedad Buck SY 200', tipo: 'SIEMBRA', estado: 'PENDIENTE', prioridad: 'ALTA', fechaProgramada: new Date('2026-06-15'), campoId: campoProgreso.id },
      { usuarioId: uid, titulo: 'Desmalezado caminos internos', descripcion: 'Rotativa en caminos del campo', tipo: 'MANTENIMIENTO', estado: 'COMPLETADA', prioridad: 'BAJA', fechaProgramada: new Date('2025-11-20'), fechaCompletada: new Date('2025-11-22'), campoId: campoEsperanza.id },
      { usuarioId: uid, titulo: 'Control de plagas girasol', descripcion: 'Monitoreo y eventual aplicación', tipo: 'FUMIGACION', estado: 'EN_CURSO', prioridad: 'ALTA', fechaProgramada: new Date('2026-01-10'), campoId: campoProgreso.id },
    ]});

    // ─── Finanzas ─────────────────────────────────────────────────────────────
    await this.prisma.movimientoFinanciero.createMany({ data: [
      { usuarioId: uid, tipo: 'INGRESO', concepto: 'Venta soja Lote Norte 408t', monto: 408000 * 3400 / 1000 * 2.1, fecha: new Date('2025-04-20'), categoria: 'COSECHA', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'INGRESO', concepto: 'Venta maíz Lote Sur 1584t', monto: 1584 * 180 * 0.9, fecha: new Date('2025-03-28'), categoria: 'COSECHA', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'INGRESO', concepto: 'Venta trigo Potrero 1 496t', monto: 496 * 160 * 0.85, fecha: new Date('2024-12-10'), categoria: 'COSECHA', campoId: campoProgreso.id },
      { usuarioId: uid, tipo: 'INGRESO', concepto: 'Venta novillo 01 y 02', monto: 420000, fecha: new Date('2025-02-15'), categoria: 'VENTA_ANIMAL' },
      { usuarioId: uid, tipo: 'INGRESO', concepto: 'Arrendamiento parcela oeste', monto: 85000, fecha: new Date('2025-01-05'), categoria: 'OTRO', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'INGRESO', concepto: 'Venta terneros 3 cabezas', monto: 180000, fecha: new Date('2025-05-02'), categoria: 'VENTA_ANIMAL' },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Semilla soja NK7059 — 60kg × 120ha', monto: 72000, fecha: new Date('2024-11-08'), categoria: 'INSUMO', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Semilla maíz DK7210 — 22kg × 180ha', monto: 95000, fecha: new Date('2024-10-18'), categoria: 'INSUMO', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Urea 250kg × 180ha', monto: 48000, fecha: new Date('2024-10-20'), categoria: 'INSUMO', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'FDA 100kg × 160ha trigo', monto: 22000, fecha: new Date('2024-06-14'), categoria: 'INSUMO', campoId: campoProgreso.id },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Servicio cosecha soja', monto: 110000, fecha: new Date('2025-04-15'), categoria: 'SERVICIO', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Servicio cosecha maíz', monto: 135000, fecha: new Date('2025-03-24'), categoria: 'SERVICIO', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Combustible — campaña completa', monto: 62000, fecha: new Date('2025-01-15'), categoria: 'COMBUSTIBLE' },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Mano de obra — 3 peones mensual', monto: 180000, fecha: new Date('2025-02-01'), categoria: 'MANO_DE_OBRA' },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Vacunación antiaftosa rodeo', monto: 18500, fecha: new Date('2025-04-01'), categoria: 'VETERINARIA' },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Reparación tranquera y alambrado', monto: 25000, fecha: new Date('2025-03-10'), categoria: 'MANTENIMIENTO', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'Semilla soja Lote Este', monto: 78000, fecha: new Date('2025-11-03'), categoria: 'INSUMO', campoId: campoEsperanza.id },
      { usuarioId: uid, tipo: 'EGRESO', concepto: 'FDA girasol Potrero 2', monto: 19800, fecha: new Date('2025-10-23'), categoria: 'INSUMO', campoId: campoProgreso.id },
    ]});
  }

  /** Fuerza un reset manual (para endpoint admin o seed inicial) */
  async forceReset() {
    await this.resetDemoData();
  }

  /** Hashea la password del demo si se necesita en seed externo */
  async getDemoPasswordHash() {
    return bcrypt.hash('Demo1234', 10);
  }
}
