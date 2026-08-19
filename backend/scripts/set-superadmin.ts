import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // CAMBIAR ESTE EMAIL AL TUYO
  const EMAIL = 'joaquinsabater@agromanagerar.com';

  const usuario = await prisma.usuario.findUnique({ where: { email: EMAIL } });
  if (!usuario) {
    console.error(`Usuario con email ${EMAIL} no encontrado`);
    process.exit(1);
  }

  const updated = await prisma.usuario.update({
    where: { id: usuario.id },
    data: { rolGlobal: 'SUPERADMIN' },
    select: { id: true, email: true, nombre: true, rolGlobal: true },
  });

  console.log('✅ Usuario actualizado:', updated);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
