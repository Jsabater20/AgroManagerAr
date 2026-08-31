import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { isProtectedProAccount } from '../auth/system-accounts';
import { R2StorageService } from '../storage/r2-storage.service';
import {
  UpdateProfileDto,
  ChangePasswordDto,
  UpdateUserPlanDto,
  UpdateUserRolDto,
  PrepararFotoPerfilDto,
  ConfirmarFotoPerfilDto,
} from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private r2StorageService: R2StorageService,
  ) {}

  async getProfile(usuarioId: number) {
    const u = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        rol: true,
        rolGlobal: true,
        plan: true,
        planExpira: true,
        createdAt: true,
        fotoPerfilStorageKey: true,
      },
    });
    if (!u) throw new NotFoundException('Usuario no encontrado');

    const orgsDelUsuario = await this.prisma.organizacion.findMany({
      where: { propietarioId: usuarioId },
      select: { id: true, nombre: true, email: true, plan: true, propietarioId: true },
    });

    const orgsComoMiembro = await this.prisma.usuarioOrganizacion.findMany({
      where: { usuarioId, activo: true },
      select: {
        id: true,
        organizacion: { select: { id: true, nombre: true, email: true, plan: true, propietarioId: true } },
      },
    });

    const organizaciones = Array.from(
      new Map(
        [...orgsDelUsuario, ...orgsComoMiembro.map((m) => m.organizacion)].map(
          (organizacion) => [organizacion.id, organizacion],
        ),
      ).values(),
    );

    const orgPrincipal = orgsDelUsuario[0] || orgsComoMiembro[0]?.organizacion;
    const usuarioOrganizacionId = orgPrincipal?.id;

    return {
      ...u,
      fotoPerfilStorageKey: undefined,
      fotoPerfilUrl: await this.obtenerFotoPerfilUrl(u.fotoPerfilStorageKey),
      organizaciones,
      usuarioOrganizacionId,
    };
  }

  async updateProfile(usuarioId: number, dto: UpdateProfileDto) {
    const u = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { nombre: dto.nombre, apellido: dto.apellido },
      select: { id: true, email: true, nombre: true, apellido: true, rol: true, plan: true },
    });
    return u;
  }

  async prepararFotoPerfil(
    usuarioId: number,
    dto: PrepararFotoPerfilDto,
  ) {
    this.r2StorageService.verificarConfiguracion();
    const storageKey = this.r2StorageService.crearStorageKeyPerfil(
      usuarioId,
      dto.mimeType,
    );

    return {
      storageKey,
      uploadUrl: await this.r2StorageService.crearUrlDeSubida(
        storageKey,
        dto.mimeType,
      ),
    };
  }

  async confirmarFotoPerfil(
    usuarioId: number,
    dto: ConfirmarFotoPerfilDto,
  ) {
    const prefijoPermitido = `usuarios/${usuarioId}/perfil/`;
    if (!dto.storageKey.startsWith(prefijoPermitido)) {
      throw new BadRequestException('La foto no pertenece al perfil actual');
    }

    const metadata = await this.r2StorageService.verificarArchivo(dto.storageKey);
    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(metadata.mimeType ?? '') ||
      metadata.tamanoBytes < 1 ||
      metadata.tamanoBytes > 5 * 1024 * 1024
    ) {
      throw new BadRequestException('La foto de perfil debe ser una imagen de hasta 5 MB');
    }

    const usuarioActual = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { fotoPerfilStorageKey: true },
    });
    if (!usuarioActual) throw new NotFoundException('Usuario no encontrado');

    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { fotoPerfilStorageKey: dto.storageKey },
    });

    if (
      usuarioActual.fotoPerfilStorageKey &&
      usuarioActual.fotoPerfilStorageKey !== dto.storageKey
    ) {
      await this.r2StorageService
        .eliminarArchivos([usuarioActual.fotoPerfilStorageKey])
        .catch(() => undefined);
    }

    return this.getProfile(usuarioId);
  }

  async eliminarFotoPerfil(usuarioId: number) {
    const usuario = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { fotoPerfilStorageKey: null },
      select: { fotoPerfilStorageKey: true },
    });

    if (usuario.fotoPerfilStorageKey) {
      await this.r2StorageService
        .eliminarArchivos([usuario.fotoPerfilStorageKey])
        .catch(() => undefined);
    }

    return { ok: true };
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

  async getAllUsers(adminId: number) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rolGlobal: true },
    });

    if (admin?.rolGlobal !== 'SUPERADMIN')
      throw new ForbiddenException('Solo SUPERADMIN');

    return this.prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        rolGlobal: true,
        plan: true,
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
    const [admin, target] = await Promise.all([
      this.prisma.usuario.findUnique({
        where: { id: adminId },
        select: { rolGlobal: true },
      }),
      this.prisma.usuario.findUnique({
        where: { id: targetId },
        select: { email: true },
      }),
    ]);
    if (admin?.rolGlobal !== 'SUPERADMIN') {
      throw new ForbiddenException('Solo SUPERADMIN');
    }
    if (!target) throw new NotFoundException('Usuario no encontrado');
    if (dto.plan === 'FREE' && isProtectedProAccount(target.email)) {
      throw new ForbiddenException('Esta cuenta debe mantener el Plan PRO');
    }

    const expira =
      dto.plan === 'PRO'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : null;

    const [usuario] = await this.prisma.$transaction([
      this.prisma.usuario.update({
        where: { id: targetId },
        data: { plan: dto.plan, planExpira: expira },
        select: {
          id: true,
          email: true,
          nombre: true,
          plan: true,
          planExpira: true,
        },
      }),
      this.prisma.organizacion.updateMany({
        where: { propietarioId: targetId },
        data: { plan: dto.plan },
      }),
    ]);

    return usuario;
  }

  async updateUserRol(
    adminId: number,
    targetId: number,
    dto: UpdateUserRolDto,
  ) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rolGlobal: true },
    });
    if (admin?.rolGlobal !== 'SUPERADMIN') throw new ForbiddenException('Solo SUPERADMIN');

    return this.prisma.usuario.update({
      where: { id: targetId },
      data: { rolGlobal: dto.rol },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        rolGlobal: true,
        createdAt: true,
      },
    });
  }

  async deleteUser(adminId: number, targetId: number) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rolGlobal: true },
    });
    if (admin?.rolGlobal !== 'SUPERADMIN') throw new ForbiddenException('Solo SUPERADMIN');

    const user = await this.prisma.usuario.findUnique({
      where: { id: targetId },
      select: { id: true, email: true },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return this.prisma.usuario.delete({
      where: { id: targetId },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        rolGlobal: true,
        createdAt: true,
      },
    });
  }

  async seedDemoData(adminId: number) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rol: true },
    });
    if (admin?.rol !== 'ADMIN') throw new ForbiddenException('Solo admins');

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

    await this.prisma.registroPeso.deleteMany({
      where: { animal: { usuarioId: uid } },
    });
    await this.prisma.prenez.deleteMany({
      where: { animal: { usuarioId: uid } },
    });
    await this.prisma.animal.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.cosecha.deleteMany({
      where: { siembra: { lote: { campo: { usuarioId: uid } } } },
    });
    await this.prisma.aplicacionInsumo.deleteMany({
      where: { siembra: { lote: { campo: { usuarioId: uid } } } },
    });
    await this.prisma.siembra.deleteMany({
      where: { lote: { campo: { usuarioId: uid } } },
    });
    await this.prisma.lote.deleteMany({
      where: { campo: { usuarioId: uid } },
    });
    await this.prisma.campo.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.tareaRural.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.movimientoFinanciero.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.maquinaria.deleteMany({ where: { usuarioId: uid } });
    await this.prisma.campania.deleteMany({ where: { usuarioId: uid } });

    return { ok: true };
  }

  private async obtenerFotoPerfilUrl(storageKey?: string | null) {
    if (!storageKey) return null;

    try {
      return await this.r2StorageService.crearUrlDeLectura(storageKey);
    } catch {
      return null;
    }
  }
}
