/**
 * AgroManager AR — Demo Seed
 * Ejecutar: npm run seed
 *
 * SEGURO: solo toca al usuario ADMIN y al usuario DEMO.
 * Las cuentas de clientes reales NO se borran.
 *
 * - 1 usuario ADMIN (joaquinsabater@agromanagerar.com / Jsadmin1234)
 * - 1 usuario DEMO  (demo@agromanager.ar / Demo1234) ← PRO interactivo, reset 24hs
 * - 2 campos, 5 lotes, 4 tipos de cultivo, 8 insumos
 * - 2 campañas, 5 siembras, 12 bovinos, 10 tareas, 18 movimientos financieros
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'joaquinsabater@agromanagerar.com';
const DEMO_EMAIL = 'demo@agromanager.ar';

const prisma = new PrismaClient();

async function limpiarDemoData(demoId: number) {
  const campos = await prisma.campo.findMany({ where: { usuarioId: demoId }, select: { id: true } });
  const campoIds = campos.map((c) => c.id);
  if (campoIds.length) {
    const lotes = await prisma.lote.findMany({ where: { campoId: { in: campoIds } }, select: { id: true } });
    const loteIds = lotes.map((l) => l.id);
    if (loteIds.length) {
      const siembras = await prisma.siembra.findMany({ where: { loteId: { in: loteIds } }, select: { id: true } });
      const siembraIds = siembras.map((s) => s.id);
      if (siembraIds.length) {
        await prisma.aplicacionInsumo.deleteMany({ where: { siembraId: { in: siembraIds } } });
        await prisma.cosecha.deleteMany({ where: { siembraId: { in: siembraIds } } });
        await prisma.siembra.deleteMany({ where: { id: { in: siembraIds } } });
      }
      await prisma.lote.deleteMany({ where: { id: { in: loteIds } } });
    }
  }
  await prisma.campania.deleteMany({ where: { usuarioId: demoId } });
  await prisma.campo.deleteMany({ where: { usuarioId: demoId } });
  const animales = await prisma.animal.findMany({ where: { usuarioId: demoId }, select: { id: true } });
  const animalIds = animales.map((a) => a.id);
  if (animalIds.length) {
    await prisma.registroPeso.deleteMany({ where: { animalId: { in: animalIds } } });
    await prisma.prenez.deleteMany({ where: { animalId: { in: animalIds } } });
    await prisma.animal.deleteMany({ where: { id: { in: animalIds } } });
  }
  await prisma.tareaRural.deleteMany({ where: { usuarioId: demoId } });
  await prisma.movimientoFinanciero.deleteMany({ where: { usuarioId: demoId } });
  await prisma.maquinaria.deleteMany({ where: { usuarioId: demoId } });
}

async function main() {
  console.log('🌱 Iniciando seed (seguro — no toca cuentas reales)...');

  const sojaExist    = await prisma.tipoCultivo.findFirst({ where: { nombre: 'Soja' } });
  const maizExist    = await prisma.tipoCultivo.findFirst({ where: { nombre: 'Maíz' } });
  const trigoExist   = await prisma.tipoCultivo.findFirst({ where: { nombre: 'Trigo' } });
  const girasolExist = await prisma.tipoCultivo.findFirst({ where: { nombre: 'Girasol' } });
  const soja    = sojaExist    ?? await prisma.tipoCultivo.create({ data: { nombre: 'Soja', descripcion: 'Glycine max' } });
  const maiz    = maizExist    ?? await prisma.tipoCultivo.create({ data: { nombre: 'Maíz', descripcion: 'Zea mays' } });
  const trigo   = trigoExist   ?? await prisma.tipoCultivo.create({ data: { nombre: 'Trigo', descripcion: 'Triticum aestivum' } });
  const girasol = girasolExist ?? await prisma.tipoCultivo.create({ data: { nombre: 'Girasol', descripcion: 'Helianthus annuus' } });
  console.log('🌿 Tipos de cultivo OK');

  async function getOrCreateInsumo(nombre: string, tipo: string, unidad: string, descripcion: string) {
    return (await prisma.insumo.findFirst({ where: { nombre } }))
      ?? prisma.insumo.create({ data: { nombre, tipo: tipo as any, unidad, descripcion } });
  }

  const [glifosato, urea, fda, semSoja, semMaiz, mancozeb, cipermetrina, nitrato] =
    await Promise.all([
      getOrCreateInsumo('Glifosato 48%',       'HERBICIDA',    'litros', 'Herbicida sistémico'),
      getOrCreateInsumo('Urea Granulada',      'FERTILIZANTE', 'kg',     '46% N'),
      getOrCreateInsumo('Fosfato Diamónico',   'FERTILIZANTE', 'kg',     '18-46-0'),
      getOrCreateInsumo('Semilla Soja NK7059', 'SEMILLA',      'kg',     'Grupo VII, tolerante a sequía'),
      getOrCreateInsumo('Semilla Maíz DK7210', 'SEMILLA',      'kg',     'Híbrido simple, alto rendimiento'),
      getOrCreateInsumo('Mancozeb 80%',        'FUNGICIDA',    'kg',     'Fungicida preventivo'),
      getOrCreateInsumo('Cipermetrina 25%',    'INSECTICIDA',  'litros', 'Insecticida piretroide'),
      getOrCreateInsumo('Nitrato de Amonio',   'FERTILIZANTE', 'kg',     '34.5% N'),
    ]);
  console.log('🧴 Insumos OK');

  const hashAdmin = await bcrypt.hash('Jsadmin1234', 10);
  const usuario = await prisma.usuario.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      emailVerificado: true,
      rol: 'ADMIN',
      rolGlobal: 'SUPERADMIN',
      plan: 'PRO',
      planExpira: new Date('2099-12-31'),
    },
    create: {
      email: ADMIN_EMAIL,
      nombre: 'Joaquín Sabater',
      password: hashAdmin,
      rol: 'ADMIN',
      rolGlobal: 'SUPERADMIN',
      plan: 'PRO',
      planExpira: new Date('2099-12-31'),
      emailVerificado: true,
    },
  });
  console.log(`👤 Admin: ${usuario.email} (SUPERADMIN, PRO)`);

  const hashDemo = await bcrypt.hash('Demo1234', 10);
  const usuarioDemo = await prisma.usuario.upsert({
    where: { email: DEMO_EMAIL },
    update: {
      plan: 'PRO',
      planExpira: new Date('2035-12-31'),
      emailVerificado: true,
      trialUsado: true,
      rol: 'OPERADOR',
    },
    create: {
      email: DEMO_EMAIL,
      nombre: 'Usuario Demo',
      apellido: '',
      password: hashDemo,
      rol: 'OPERADOR',
      plan: 'PRO',
      planExpira: new Date('2035-12-31'),
      emailVerificado: true,
      trialUsado: true,
    },
  });
  console.log(`🎮 Demo: ${usuarioDemo.email} (PRO interactivo)`);

  let orgDemo = await prisma.organizacion.findFirst({
    where: { propietarioId: usuarioDemo.id },
  });
  if (!orgDemo) {
    orgDemo = await prisma.organizacion.create({
      data: {
        nombre: 'Usuario Demo',
        email: DEMO_EMAIL,
        plan: 'PRO',
        propietarioId: usuarioDemo.id,
      },
    });
  } else {
    await prisma.organizacion.update({
      where: { id: orgDemo.id },
      data: { plan: 'PRO' },
    });
  }

  const miembroDemo = await prisma.usuarioOrganizacion.findFirst({
    where: { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id },
  });

  if (!miembroDemo) {
    await prisma.usuarioOrganizacion.create({
      data: {
        usuarioId: usuarioDemo.id,
        organizacionId: orgDemo.id,
        roles: JSON.stringify(['OWNER']),
        activo: true,
        fechaInvitacion: new Date(),
      },
    });
  }

  await limpiarDemoData(usuarioDemo.id);
  console.log('🗑️  Datos demo anteriores eliminados');

  const campoEsperanza = await prisma.campo.create({
    data: {
      nombre: 'La Esperanza',
      hectareas: 500,
      ubicacion: 'Pergamino, Buenos Aires',
      propietario: 'Juan Pérez',
      usuarioId: usuarioDemo.id,
      organizacionId: orgDemo.id,
      lotes: {
        create: [
          { nombre: 'Lote Norte', hectareas: 120 },
          { nombre: 'Lote Sur',   hectareas: 180 },
          { nombre: 'Lote Este',  hectareas: 200 },
        ],
      },
    },
    include: { lotes: true },
  });

  const campoProgreso = await prisma.campo.create({
    data: {
      nombre: 'El Progreso',
      hectareas: 320,
      ubicacion: 'Marcos Juárez, Córdoba',
      propietario: 'Juan Pérez',
      usuarioId: usuarioDemo.id,
      organizacionId: orgDemo.id,
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
  console.log('🏡 Campos y lotes creados');

  const camp2425 = await prisma.campania.create({
    data: {
      nombre: 'Campaña 2024/2025',
      fechaInicio: new Date('2024-10-01'),
      fechaFin: new Date('2025-06-30'),
      descripcion: 'Primera campaña completa en ambos campos',
      usuarioId: usuarioDemo.id,
      organizacionId: orgDemo.id,
    },
  });

  const camp2526 = await prisma.campania.create({
    data: {
      nombre: 'Campaña 2025/2026',
      fechaInicio: new Date('2025-10-01'),
      descripcion: 'Campaña actual en curso',
      usuarioId: usuarioDemo.id,
      organizacionId: orgDemo.id,
    },
  });
  console.log('📅 Campañas creadas');

  const siem1 = await prisma.siembra.create({
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
  await prisma.aplicacionInsumo.createMany({
    data: [
      { siembraId: siem1.id, insumoId: semSoja.id, fecha: new Date('2024-11-10'), cantidad: 60, unidad: 'kg', observaciones: 'Inoculante aplicado' },
      { siembraId: siem1.id, insumoId: glifosato.id, fecha: new Date('2024-12-05'), cantidad: 2.5, unidad: 'litros', observaciones: 'Control de malezas temprano' },
      { siembraId: siem1.id, insumoId: fda.id, fecha: new Date('2024-11-10'), cantidad: 120, unidad: 'kg', observaciones: 'Fertilización de arranque' },
      { siembraId: siem1.id, insumoId: mancozeb.id, fecha: new Date('2025-01-20'), cantidad: 1.5, unidad: 'kg', observaciones: 'Prevención mancha ojo de rana' },
    ],
  });
  await prisma.cosecha.create({
    data: {
      siembraId: siem1.id,
      fechaCosecha: new Date('2025-04-15'),
      rendimientoKgHa: 3400,
      totalKg: 3400 * lNorte.hectareas,
      humedad: 13.5,
      observaciones: 'Excelente campaña, sin inconvenientes',
    },
  });

  const siem2 = await prisma.siembra.create({
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
  await prisma.aplicacionInsumo.createMany({
    data: [
      { siembraId: siem2.id, insumoId: semMaiz.id, fecha: new Date('2024-10-20'), cantidad: 22, unidad: 'kg', observaciones: 'Sembradora John Deere' },
      { siembraId: siem2.id, insumoId: urea.id, fecha: new Date('2024-10-20'), cantidad: 150, unidad: 'kg', observaciones: 'Fertilización base' },
      { siembraId: siem2.id, insumoId: urea.id, fecha: new Date('2024-12-10'), cantidad: 100, unidad: 'kg', observaciones: 'Fertirriego V6' },
      { siembraId: siem2.id, insumoId: cipermetrina.id, fecha: new Date('2025-01-05'), cantidad: 0.4, unidad: 'litros', observaciones: 'Control cogollero' },
    ],
  });
  await prisma.cosecha.create({
    data: {
      siembraId: siem2.id,
      fechaCosecha: new Date('2025-03-25'),
      rendimientoKgHa: 8800,
      totalKg: 8800 * lSur.hectareas,
      humedad: 14.2,
      observaciones: 'Rendimiento récord para el lote',
    },
  });

  const siem3 = await prisma.siembra.create({
    data: {
      loteId: p1.id,
      tipoCultivoId: trigo.id,
      fechaSiembra: new Date('2024-06-15'),
      densidad: 120,
      estado: 'COSECHADA',
      campaniaId: camp2425.id,
    },
  });
  await prisma.aplicacionInsumo.createMany({
    data: [
      { siembraId: siem3.id, insumoId: fda.id, fecha: new Date('2024-06-15'), cantidad: 100, unidad: 'kg' },
      { siembraId: siem3.id, insumoId: nitrato.id, fecha: new Date('2024-08-01'), cantidad: 80, unidad: 'kg', observaciones: 'Encañazón' },
      { siembraId: siem3.id, insumoId: mancozeb.id, fecha: new Date('2024-09-10'), cantidad: 1.2, unidad: 'kg', observaciones: 'Fusariosis preventivo' },
    ],
  });
  await prisma.cosecha.create({
    data: {
      siembraId: siem3.id,
      fechaCosecha: new Date('2024-12-05'),
      rendimientoKgHa: 3100,
      totalKg: 3100 * p1.hectareas,
      humedad: 12.8,
    },
  });

  const siem4 = await prisma.siembra.create({
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
  await prisma.aplicacionInsumo.createMany({
    data: [
      { siembraId: siem4.id, insumoId: semSoja.id, fecha: new Date('2025-11-05'), cantidad: 62, unidad: 'kg' },
      { siembraId: siem4.id, insumoId: glifosato.id, fecha: new Date('2025-12-10'), cantidad: 2, unidad: 'litros' },
    ],
  });

  const siem5 = await prisma.siembra.create({
    data: {
      loteId: p2.id,
      tipoCultivoId: girasol.id,
      fechaSiembra: new Date('2025-10-25'),
      densidad: 40,
      estado: 'EN_CURSO',
      campaniaId: camp2526.id,
    },
  });
  await prisma.aplicacionInsumo.createMany({
    data: [
      { siembraId: siem5.id, insumoId: semSoja.id, fecha: new Date('2025-10-25'), cantidad: 20, unidad: 'kg' },
    ],
  });

  const vacaDemo = await prisma.animal.create({
    data: {
      usuarioId: usuarioDemo.id,
      organizacionId: orgDemo.id,
      nombre: 'Pantanera 01',
      especie: 'BOVINO',
      sexo: 'HEMBRA',
      categoria: 'VACA',
      peso: 480,
      fechaNacimiento: new Date('2019-08-15'),
    },
  });
  await prisma.animal.createMany({
    data: [
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, nombre: 'Pantanera 02', especie: 'BOVINO', sexo: 'HEMBRA', categoria: 'VACA', peso: 510 },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, nombre: 'Patagón', especie: 'BOVINO', sexo: 'MACHO', categoria: 'TORO', peso: 820 },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, nombre: 'Novillo 01', especie: 'BOVINO', sexo: 'MACHO', categoria: 'NOVILLO', peso: 390 },
    ],
  });
  await prisma.prenez.create({
    data: {
      animalId: vacaDemo.id,
      fechaInicio: new Date('2026-02-15'),
      fechaEstimadaParto: new Date('2026-11-25'),
      estado: 'EN_CURSO',
    },
  });

  await prisma.tareaRural.createMany({
    data: [
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, campoId: campoEsperanza.id, titulo: 'Revisar pulverizadora', tipo: 'MANTENIMIENTO', estado: 'PENDIENTE', prioridad: 'ALTA', fechaProgramada: new Date('2026-08-20') },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, campoId: campoProgreso.id, titulo: 'Control sanitario del rodeo', tipo: 'VETERINARIA', estado: 'EN_CURSO', prioridad: 'MEDIA', fechaProgramada: new Date('2026-08-17') },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, campoId: campoEsperanza.id, titulo: 'Analizar suelo Lote Norte', tipo: 'OTRO', estado: 'COMPLETADA', prioridad: 'BAJA', fechaProgramada: new Date('2026-08-05'), fechaCompletada: new Date('2026-08-07') },
    ],
  });

  await prisma.maquinaria.createMany({
    data: [
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, campoId: campoEsperanza.id, nombre: 'Tractor John Deere 5075E', tipo: 'TRACTOR', estado: 'OPERATIVA', marca: 'John Deere', modelo: '5075E', anio: 2021, horasUso: 1500 },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, campoId: campoEsperanza.id, nombre: 'Pulverizadora Jacto Condor 3000', tipo: 'PULVERIZADORA', estado: 'OPERATIVA', marca: 'Jacto', modelo: 'Condor 3000', anio: 2020, horasUso: 650 },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, nombre: 'Cosechadora Claas Lexion 650', tipo: 'COSECHADORA', estado: 'OPERATIVA', marca: 'Claas', modelo: 'Lexion 650', anio: 2018, horasUso: 1200 },
    ],
  });

  await prisma.movimientoFinanciero.createMany({
    data: [
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, campoId: campoEsperanza.id, tipo: 'INGRESO', concepto: 'Venta de soja Lote Norte', monto: 856800, fecha: new Date('2026-07-28'), categoria: 'COSECHA' },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, campoId: campoProgreso.id, tipo: 'INGRESO', concepto: 'Venta de novillos', monto: 420000, fecha: new Date('2026-08-02'), categoria: 'VENTA_ANIMAL' },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, campoId: campoEsperanza.id, tipo: 'EGRESO', concepto: 'Fertilizante y semilla', monto: 165000, fecha: new Date('2026-08-04'), categoria: 'INSUMO' },
      { usuarioId: usuarioDemo.id, organizacionId: orgDemo.id, tipo: 'EGRESO', concepto: 'Combustible maquinaria', monto: 78000, fecha: new Date('2026-08-10'), categoria: 'COMBUSTIBLE' },
    ],
  });

  console.log('✅ Seed demo finalizado con organización PRO');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
