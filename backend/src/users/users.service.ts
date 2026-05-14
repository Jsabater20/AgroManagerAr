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
      data: { nombre: dto.nombre },
      select: { id: true, email: true, nombre: true, rol: true, plan: true },
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

  async updateUserPlan(adminId: number, targetId: number, dto: UpdateUserPlanDto) {
    const admin = await this.prisma.usuario.findUnique({
      where: { id: adminId },
      select: { rol: true },
    });
    if (admin?.rol !== 'ADMIN') throw new ForbiddenException('Solo admins');

    const expira = dto.plan === 'PRO'
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 año manual
      : null;

    return this.prisma.usuario.update({
      where: { id: targetId },
      data: { plan: dto.plan, planExpira: expira },
      select: { id: true, email: true, nombre: true, plan: true, planExpira: true },
    });
  }

  async updateUserRol(adminId: number, targetId: number, dto: UpdateUserRolDto) {
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
    if (adminId === targetId) throw new ForbiddenException('No podés eliminar tu propia cuenta desde el panel');

    await this.prisma.usuario.delete({ where: { id: targetId } });
    return { ok: true };
  }
}
