import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import {
  UpdateProfileDto,
  ChangePasswordDto,
  UpdateUserPlanDto,
  UpdateUserRolDto,
} from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(usuarioId: number) {
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        email: true,
        nombre: true,
        rol: true,
        plan: true,
        planExpira: true,
        createdAt: true,
      },
    });
    if (!u) throw new NotFoundException('Usuario no encontrado');
    return u;
  }

  async updateProfile(usuarioId: number, dto: UpdateProfileDto) {
    const u = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { nombre: dto.nombre, apellido: dto.apellido },
      select: { id: true, email: true, nombre: true, apellido: true, rol: true, plan: true },
    });
    return u;
  }

  async changePassword(usuarioId: number, dto: ChangePasswordDto) {
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { password: true },
    });
    if (!u) throw new NotFoundException('Usuario no encontrado');

    const valid = await bcrypt.compare(dto.passwordActual, u.password);
    if (!valid) throw new UnauthorizedException('Contraseña actual incorrecta');

    const hash = await bcrypt.hash(dto.passwordNueva, 10);
    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { password: hash },
    });
    return { ok: true };
  }

  // ─── ADMIN ────────────────────────────────────────────────────────────────

  async getAllUsers(adminId: number) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rol: true },
    });
    if (admin?.rol !== 'ADMIN') throw new ForbiddenException('Solo admins');

    return this.prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nombre: true,
        rol: true,
        plan: true,
        planExpira: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async updateUserPlan(
    adminId: number,
    targetId: number,
    dto: UpdateUserPlanDto,
  ) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rol: true },
    });
    if (admin?.rol !== 'ADMIN') throw new ForbiddenException('Solo admins');

    const expira =
      dto.plan === 'PRO'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 año manual
        : null;

    return this.prisma.usuario.update({
      where: { id: targetId },
      data: { plan: dto.plan, planExpira: expira },
      select: {
        id: true,
        email: true,
        nombre: true,
        plan: true,
        planExpira: true,
      },
    });
  }

  async updateUserRol(
    adminId: number,
    targetId: number,
    dto: UpdateUserRolDto,
  ) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rol: true },
    });
    if (admin?.rol !== 'ADMIN') throw new ForbiddenException('Solo admins');

    return this.prisma.usuario.update({
      where: { id: targetId },
      data: { rol: dto.rol },
      select: { id: true, email: true, nombre: true, rol: true },
    });
  }

  async deleteUser(adminId: number, targetId: number) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rol: true },
    });
    if (admin?.rol !== 'ADMIN') throw new ForbiddenException('Solo admins');
    if (adminId === targetId)
      throw new ForbiddenException(
        'No podés eliminar tu propia cuenta desde el panel',
      );

    // Borrado cascada: primero eliminar todas las referencias
    // 1. Miembro de organizaciones
    await this.prisma.usuarioOrganizacion.deleteMany({
      where: { usuarioId: targetId },
    });

    // 2. Invitaciones recibidas
    await this.prisma.invitacionOrganizacion.deleteMany({
      where: { usuarioId: targetId },
    });

    // 3. Invitaciones pendientes con este email
    const user = await this.prisma.usuario.findUnique({
      where: { id: targetId },
      select: { email: true },
    });
    if (user) {
      await this.prisma.invitacionOrganizacion.deleteMany({
        where: { email: user.email },
      });
    }

    // 4. Organizaciones donde es propietario (transferir o eliminar)
    const organizacionesOwner = await this.prisma.organizacion.findMany({
      where: { propietarioId: targetId },
    });

    // Eliminar las organizaciones que posee (también elimina datos cascada en DB)
    for (const org of organizacionesOwner) {
      // Primero eliminar miembros
      await this.prisma.usuarioOrganizacion.deleteMany({
        where: { organizacionId: org.id },
      });
      // Luego eliminar invitaciones
      await this.prisma.invitacionOrganizacion.deleteMany({
        where: { organizacionId: org.id },
      });
      // Finalmente eliminar la organización
      await this.prisma.organizacion.delete({
        where: { id: org.id },
      });
    }

    // 5. Finalmente eliminar el usuario
    await this.prisma.usuario.delete({ where: { id: targetId } });
    return { ok: true };
  }

  // ─── SEED DEMO ────────────────────────────────────────────────────────────
  async seedDemoData(adminId: number) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rol: true },
    });
    if (admin?.rol !== 'ADMIN') throw new ForbiddenException('Solo admins');

    // Find or create demo user
    let demo = await this.prisma.usuario.findUnique({
      where: { email: 'demo@agromanager.ar' },
    });
    if (!demo) {
      const h = await bcrypt.hash('Demo1234', 10);
      demo = await this.prisma.usuario.create({
        data: {
          email: 'demo@agromanager.ar',
          nombre: 'Usuario Demo',
          password: h,
          rol: 'OPERADOR',
        },
      });
    }
    const uid = demo.id;

    // Wipe existing demo data in dependency order
    await this.prisma.registroPeso.deleteMany({
      where: { animal: { usuarioId: uid } },
    });
    await this.prisma.prenez.deleteMany({
      where: { animal: { usuarioId: uid } },
    });
    await this.prisma.animal.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.movimientoFinanciero.deleteMany({
      where: { usuarioId: uid },
    });
    await this.prisma.tareaRural.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.cosecha.deleteMany({
      where: { siembra: { lote: { campo: { usuarioId: uid } } } },
    });
    await this.prisma.aplicacionInsumo.deleteMany({
      where: { siembra: { lote: { campo: { usuarioId: uid } } } },
    });
    await this.prisma.siembra.deleteMany({
      where: { lote: { campo: { usuarioId: uid } } },
    });
    await this.prisma.campania.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.lote.deleteMany({ where: { campo: { usuarioId: uid } } });
    await this.prisma.campo.deleteMany({ where: { usuarioId: uid } });

    // Lookup global TipoCultivos
    const tc = await this.prisma.tipoCultivo.findMany();
    const soja = tc.find((t) => t.nombre === 'Soja')!;
    const maiz = tc.find((t) => t.nombre === 'Maíz')!;
    const trigo = tc.find((t) => t.nombre === 'Trigo')!;
    const girasol = tc.find((t) => t.nombre === 'Girasol')!;

    // ── Campos con lotes ──────────────────────────────────────────────────────
    const campo1 = await this.prisma.campo.create({
      data: {
        nombre: 'La Esperanza',
        ubicacion: 'Córdoba',
        hectareas: 320,
        usuarioId: uid,
        lotes: {
          create: [
            { nombre: 'Lote Norte', hectareas: 80 },
            { nombre: 'Lote Sur', hectareas: 120 },
            { nombre: 'Lote Este', hectareas: 120 },
          ],
        },
      },
      include: { lotes: true },
    });
    const campo2 = await this.prisma.campo.create({
      data: {
        nombre: 'El Progreso',
        ubicacion: 'Buenos Aires',
        hectareas: 180,
        usuarioId: uid,
        lotes: {
          create: [
            { nombre: 'Potrero 1', hectareas: 90 },
            { nombre: 'Potrero 2', hectareas: 90 },
          ],
        },
      },
      include: { lotes: true },
    });

    const loteNorte = campo1.lotes.find((l) => l.nombre === 'Lote Norte')!;
    const loteSur = campo1.lotes.find((l) => l.nombre === 'Lote Sur')!;
    const loteEste = campo1.lotes.find((l) => l.nombre === 'Lote Este')!;
    const potrero1 = campo2.lotes.find((l) => l.nombre === 'Potrero 1')!;
    const potrero2 = campo2.lotes.find((l) => l.nombre === 'Potrero 2')!;

    // ── Campañas ──────────────────────────────────────────────────────────────
    const c2425 = await this.prisma.campania.create({
      data: {
        nombre: 'Campaña 24/25',
        fechaInicio: new Date('2024-10-01'),
        fechaFin: new Date('2025-06-30'),
        usuarioId: uid,
      },
    });
    const c2526 = await this.prisma.campania.create({
      data: {
        nombre: 'Campaña 25/26',
        fechaInicio: new Date('2025-10-01'),
        usuarioId: uid,
      },
    });

    // ── Siembras ──────────────────────────────────────────────────────────────
    const s1 = await this.prisma.siembra.create({
      data: {
        campaniaId: c2425.id,
        tipoCultivoId: soja.id,
        loteId: loteNorte.id,
        fechaSiembra: new Date('2024-11-15'),
        estado: 'COSECHADA',
        densidad: 65,
      },
    });
    await this.prisma.aplicacionInsumo.createMany({
      data: [
        {
          siembraId: s1.id,
          insumoId: 4,
          fecha: new Date('2024-12-05'),
          cantidad: 2.5,
          unidad: 'litros',
          observaciones: 'Control de malezas temprano',
        },
        {
          siembraId: s1.id,
          insumoId: 1,
          fecha: new Date('2025-01-10'),
          cantidad: 120,
          unidad: 'kg',
          observaciones: 'Fertilización base',
        },
      ],
    });
    await this.prisma.cosecha.create({
      data: {
        siembraId: s1.id,
        fechaCosecha: new Date('2025-04-10'),
        rendimientoKgHa: 3250,
        totalKg: 260000,
        observaciones: 'Excelente campaña',
      },
    });

    const s2 = await this.prisma.siembra.create({
      data: {
        campaniaId: c2425.id,
        tipoCultivoId: maiz.id,
        loteId: potrero1.id,
        fechaSiembra: new Date('2024-10-20'),
        estado: 'COSECHADA',
        densidad: 72,
      },
    });
    await this.prisma.cosecha.create({
      data: {
        siembraId: s2.id,
        fechaCosecha: new Date('2025-03-15'),
        rendimientoKgHa: 9800,
        totalKg: 882000,
        observaciones: 'Buen rendimiento, sin stress hídrico',
      },
    });

    const s3 = await this.prisma.siembra.create({
      data: {
        campaniaId: c2425.id,
        tipoCultivoId: trigo.id,
        loteId: loteSur.id,
        fechaSiembra: new Date('2024-06-20'),
        estado: 'COSECHADA',
        densidad: 180,
      },
    });
    await this.prisma.cosecha.create({
      data: {
        siembraId: s3.id,
        fechaCosecha: new Date('2024-11-25'),
        rendimientoKgHa: 4100,
        totalKg: 492000,
        observaciones: 'Sin heladas, buen peso de grano',
      },
    });

    await this.prisma.siembra.create({
      data: {
        campaniaId: c2526.id,
        tipoCultivoId: soja.id,
        loteId: loteEste.id,
        fechaSiembra: new Date('2025-11-08'),
        estado: 'EN_CURSO',
        densidad: 60,
      },
    });
    await this.prisma.siembra.create({
      data: {
        campaniaId: c2526.id,
        tipoCultivoId: girasol.id,
        loteId: potrero2.id,
        fechaSiembra: new Date('2025-10-25'),
        estado: 'EN_CURSO',
        densidad: 55,
      },
    });

    // ── Ganadería ─────────────────────────────────────────────────────────────
    const animales = await Promise.all([
      this.prisma.animal.create({
        data: {
          usuarioId: uid,
          nombre: 'Vaca 001',
          especie: 'BOVINO',
          categoria: 'VACA',
          sexo: 'HEMBRA',
          fechaNacimiento: new Date('2020-03-12'),
        },
      }),
      this.prisma.animal.create({
        data: {
          usuarioId: uid,
          nombre: 'Vaca 002',
          especie: 'BOVINO',
          categoria: 'VACA',
          sexo: 'HEMBRA',
          fechaNacimiento: new Date('2019-08-05'),
        },
      }),
      this.prisma.animal.create({
        data: {
          usuarioId: uid,
          nombre: 'Vaquillona 003',
          especie: 'BOVINO',
          categoria: 'VAQUILLONA',
          sexo: 'HEMBRA',
          fechaNacimiento: new Date('2022-11-18'),
        },
      }),
      this.prisma.animal.create({
        data: {
          usuarioId: uid,
          nombre: 'Toro 004',
          especie: 'BOVINO',
          categoria: 'TORO',
          sexo: 'MACHO',
          fechaNacimiento: new Date('2018-06-01'),
        },
      }),
      this.prisma.animal.create({
        data: {
          usuarioId: uid,
          nombre: 'Ternera 010',
          especie: 'BOVINO',
          categoria: 'TERNERA',
          sexo: 'HEMBRA',
          fechaNacimiento: new Date('2025-08-10'),
        },
      }),
    ]);
    await this.prisma.registroPeso.createMany({
      data: [
        { animalId: animales[0].id, fecha: new Date('2025-04-01'), peso: 520 },
        { animalId: animales[1].id, fecha: new Date('2025-04-01'), peso: 498 },
        { animalId: animales[2].id, fecha: new Date('2025-04-01'), peso: 385 },
        { animalId: animales[3].id, fecha: new Date('2025-04-01'), peso: 780 },
      ],
    });

    // ── Tareas ────────────────────────────────────────────────────────────────
    await this.prisma.tareaRural.createMany({
      data: [
        {
          usuarioId: uid,
          titulo: 'Aplicar herbicida Lote Este',
          tipo: 'FUMIGACION',
          estado: 'PENDIENTE',
          prioridad: 'ALTA',
          fechaProgramada: new Date('2026-05-20'),
          campoId: campo1.id,
        },
        {
          usuarioId: uid,
          titulo: 'Fertilización Campaña 25/26',
          tipo: 'FERTILIZACION',
          estado: 'PENDIENTE',
          prioridad: 'MEDIA',
          fechaProgramada: new Date('2026-05-25'),
          campoId: campo2.id,
        },
        {
          usuarioId: uid,
          titulo: 'Control de plagas girasol',
          tipo: 'FUMIGACION',
          estado: 'EN_CURSO',
          prioridad: 'ALTA',
          fechaProgramada: new Date('2026-05-10'),
          campoId: campo2.id,
        },
        {
          usuarioId: uid,
          titulo: 'Vacunación aftosa rodeo',
          tipo: 'VETERINARIA',
          estado: 'COMPLETADA',
          prioridad: 'MEDIA',
          fechaProgramada: new Date('2026-04-01'),
          campoId: campo1.id,
        },
        {
          usuarioId: uid,
          titulo: 'Relevamiento de lotes soja',
          tipo: 'OTRO',
          estado: 'COMPLETADA',
          prioridad: 'BAJA',
          fechaProgramada: new Date('2026-02-15'),
          campoId: campo1.id,
        },
        {
          usuarioId: uid,
          titulo: 'Reparación alambrado perimetral',
          tipo: 'MANTENIMIENTO',
          estado: 'PENDIENTE',
          prioridad: 'BAJA',
          fechaProgramada: new Date('2026-06-01'),
          campoId: campo2.id,
        },
      ],
    });

    // ── Finanzas ──────────────────────────────────────────────────────────────
    await this.prisma.movimientoFinanciero.createMany({
      data: [
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta soja campaña 24/25',
          monto: 832000,
          fecha: new Date('2025-04-20'),
          categoria: 'COSECHA',
          campoId: campo1.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta maíz campaña 24/25',
          monto: 1631700,
          fecha: new Date('2025-03-28'),
          categoria: 'COSECHA',
          campoId: campo2.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta trigo campaña 24/25',
          monto: 1377600,
          fecha: new Date('2024-12-02'),
          categoria: 'COSECHA',
          campoId: campo1.id,
        },
        {
          usuarioId: uid,
          tipo: 'INGRESO',
          concepto: 'Venta 2 novillos',
          monto: 990000,
          fecha: new Date('2025-05-12'),
          categoria: 'VENTA_ANIMAL',
          campoId: campo1.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Semillas campaña 25/26',
          monto: 145000,
          fecha: new Date('2025-10-15'),
          categoria: 'INSUMO',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Herbicidas y fungicidas',
          monto: 87500,
          fecha: new Date('2025-11-20'),
          categoria: 'INSUMO',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Servicio cosecha soja',
          monto: 110000,
          fecha: new Date('2025-04-15'),
          categoria: 'SERVICIO',
          campoId: campo1.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Servicio cosecha maíz',
          monto: 135000,
          fecha: new Date('2025-03-24'),
          categoria: 'SERVICIO',
          campoId: campo2.id,
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Combustible campaña completa',
          monto: 62000,
          fecha: new Date('2025-01-15'),
          categoria: 'COMBUSTIBLE',
        },
        {
          usuarioId: uid,
          tipo: 'EGRESO',
          concepto: 'Mano de obra — 3 peones',
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
          concepto: 'Reparación alambrado',
          monto: 25000,
          fecha: new Date('2025-03-10'),
          categoria: 'MANTENIMIENTO',
          campoId: campo1.id,
        },
      ],
    });

    return {
      ok: true,
      demoUserId: uid,
      message: 'Demo data seeded successfully',
    };
  }
}
