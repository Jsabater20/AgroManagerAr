import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando migración de usuarios a organizaciones...');

  // Obtener todos los usuarios
  const usuarios = await prisma.usuario.findMany();
  console.log(`📊 Encontrados ${usuarios.length} usuarios`);

  for (const usuario of usuarios) {
    try {
      // Verificar si ya tiene org
      const orgExistente = await prisma.organizacion.findFirst({
        where: { propietarioId: usuario.id },
      });

      if (orgExistente) {
        console.log(
    `✓ Usuario ${usuario.email} ya tiene org (ID: ${orgExistente.id})`);
        continue;
      }

      // Crear organización personal
      const org = await prisma.organizacion.create({
        data: {
          nombre: `${usuario.nombre} ${usuario.apellido || ''}`.trim(),
          email: usuario.email,
          plan: usuario.plan,
          propietarioId: usuario.id,
        },
      });

      console.log(`✓ Org creada para ${usuario.email} (ID: ${org.id})`);

      // Crear membresía del usuario en su propia org
      await prisma.usuarioOrganizacion.create({
        data: {
          usuarioId: usuario.id,
          organizacionId: org.id,
          rol: 'OWNER',
          estado: 'ACTIVO',
        },
      });

      console.log(`  └─ Membresía creada`);

      // Actualizar recursos del usuario a la org
      await prisma.campo.updateMany({
        where: { usuarioId: usuario.id },
        data: { organizacionId: org.id },
      });

      const camposUpdated = await prisma.campo.count({
        where: { usuarioId: usuario.id, organizacionId: org.id },
      });

      if (camposUpdated > 0) {
        console.log(`  └─ ${camposUpdated} campos asignados`);
      }

      await prisma.animal.updateMany({
        where: { usuarioId: usuario.id },
        data: { organizacionId: org.id },
      });

      const animalesUpdated = await prisma.animal.count({
        where: { usuarioId: usuario.id, organizacionId: org.id },
      });

      if (animalesUpdated > 0) {
        console.log(`  └─ ${animalesUpdated} animales asignados`);
      }

      await prisma.maquinaria.updateMany({
        where: { usuarioId: usuario.id },
        data: { organizacionId: org.id },
      });

      const maquinariasUpdated = await prisma.maquinaria.count({
        where: { usuarioId: usuario.id, organizacionId: org.id },
      });

      if (maquinariasUpdated > 0) {
        console.log(`  └─ ${maquinariasUpdated} maquinarias asignadas`);
      }

      await prisma.tareaRural.updateMany({
        where: { usuarioId: usuario.id },
        data: { organizacionId: org.id },
      });

      const tareasUpdated = await prisma.tareaRural.count({
        where: { usuarioId: usuario.id, organizacionId: org.id },
      });

      if (tareasUpdated > 0) {
        console.log(`  └─ ${tareasUpdated} tareas asignadas`);
      }

      await prisma.movimientoFinanciero.updateMany({
        where: { usuarioId: usuario.id },
        data: { organizacionId: org.id },
      });

      const movimientosUpdated = await prisma.movimientoFinanciero.count({
        where: { usuarioId: usuario.id, organizacionId: org.id },
      });

      if (movimientosUpdated > 0) {
        console.log(`  └─ ${movimientosUpdated} movimientos asignados`);
      }

      await prisma.campania.updateMany({
        where: { usuarioId: usuario.id },
        data: { organizacionId: org.id },
      });

      const campanasUpdated = await prisma.campania.count({
        where: { usuarioId: usuario.id, organizacionId: org.id },
      });

      if (campanasUpdated > 0) {
        console.log(`  └─ ${campanasUpdated} campañas asignadas`);
      }
    } catch (error) {
      console.error(`❌ Error migrando usuario ${usuario.email}:`, error);
    }
  }

  console.log('\n✅ Migración completada');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('Error fatal:', e);
  process.exit(1);
});
