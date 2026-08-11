import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando migración de usuarios a organizaciones...');

  const usuarios = await prisma.usuario.findMany();
  console.log(`📊 Encontrados ${usuarios.length} usuarios`);

  for (const usuario of usuarios) {
    try {
      const orgExistente = await prisma.organizacion.findFirst({
        where: { propietarioId: usuario.id },
      });

      if (orgExistente) {
        console.log(`✓ Usuario ${usuario.email} ya tiene org (ID: ${orgExistente.id})`);
        continue;
      }

      const org = await prisma.organizacion.create({
        data: {
          nombre: `${usuario.nombre} ${usuario.apellido || ''}`.trim(),
          email: usuario.email,
          plan: usuario.plan,
          propietarioId: usuario.id,
        },
      });

      await prisma.usuarioOrganizacion.create({
        data: {
          usuarioId: usuario.id,
          organizacionId: org.id,
          roles: JSON.stringify(['OWNER']),
          activo: true,
          fechaInvitacion: new Date(),
        },
      });

      console.log(`✅ Org creada para ${usuario.email} (ID: ${org.id})`);
    } catch (err) {
      console.error(`❌ Error con ${usuario.email}`, err);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
