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
  OtorgarBeneficioProDto,
  PrepararFotoPerfilDto,
  ConfirmarFotoPerfilDto,
  ActualizarEncuadreFotoPerfilDto,
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
        codigoReferido: true,
        createdAt: true,
        fotoPerfilStorageKey: true,
        fotoPerfilPosicionX: true,
        fotoPerfilPosicionY: true,
        fotoPerfilEscala: true,
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

    const beneficiosActivos = organizaciones.length
      ? await this.prisma.beneficioProOrganizacion.findMany({
          where: {
            organizacionId: { in: organizaciones.map((organizacion) => organizacion.id) },
            activo: true,
            fechaInicio: { lte: new Date() },
            fechaFin: { gt: new Date() },
          },
          orderBy: { fechaFin: 'desc' },
          select: { id: true, organizacionId: true, fechaInicio: true, fechaFin: true, motivo: true },
        })
      : [];

    const beneficioPorOrganizacion = new Map(
      beneficiosActivos.map((beneficio) => [beneficio.organizacionId, beneficio]),
    );
    const organizacionesConPlanEfectivo = organizaciones.map((organizacion) => {
      const beneficioPro = beneficioPorOrganizacion.get(organizacion.id) ?? null;
      return {
        ...organizacion,
        planEfectivo: organizacion.plan === 'PRO' || beneficioPro ? 'PRO' : 'FREE',
        beneficioPro,
      };
    });

    const empresas = await this.prisma.empresa.findMany({
      where: {
        activo: true,
        OR: [
          { propietarioId: usuarioId },
          { miembros: { some: { usuarioId, activo: true } } },
        ],
      },
      select: {
        id: true,
        nombre: true,
        estadoComercial: true,
        limiteEstablecimientos: true,
        propietarioId: true,
      },
      orderBy: { nombre: 'asc' },
    });

    const orgPrincipal = orgsDelUsuario[0] || orgsComoMiembro[0]?.organizacion;
    const usuarioOrganizacionId = orgPrincipal?.id;

    return {
      ...u,
      fotoPerfilStorageKey: undefined,
      fotoPerfilUrl: await this.obtenerFotoPerfilUrl(u.fotoPerfilStorageKey),
      fotoPerfilEncuadre: {
        posicionX: u.fotoPerfilPosicionX,
        posicionY: u.fotoPerfilPosicionY,
        escala: u.fotoPerfilEscala,
      },
      organizaciones: organizacionesConPlanEfectivo,
      empresas,
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
      data: {
        fotoPerfilStorageKey: dto.storageKey,
        fotoPerfilPosicionX: 50,
        fotoPerfilPosicionY: 50,
        fotoPerfilEscala: 1,
      },
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

  async actualizarEncuadreFotoPerfil(
    usuarioId: number,
    dto: ActualizarEncuadreFotoPerfilDto,
  ) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { fotoPerfilStorageKey: true },
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    if (!usuario.fotoPerfilStorageKey) {
      throw new BadRequestException('Primero tenés que cargar una foto de perfil');
    }

    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        fotoPerfilPosicionX: dto.posicionX ?? 50,
        fotoPerfilPosicionY: dto.posicionY ?? 50,
        fotoPerfilEscala: dto.escala ?? 1,
      },
    });

    return this.getProfile(usuarioId);
  }

  async eliminarFotoPerfil(usuarioId: number) {
    const usuario = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        fotoPerfilStorageKey: null,
        fotoPerfilPosicionX: 50,
        fotoPerfilPosicionY: 50,
        fotoPerfilEscala: 1,
      },
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

    const usuarios = await this.prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        rolGlobal: true,
        plan: true,
        createdAt: true,
        referidosComoReferente: {
          where: { validadoEn: { not: null } },
          select: { id: true },
        },
        organizacionesQueEsDueno: {
          select: {
            id: true,
            nombre: true,
            beneficiosPro: {
              where: {
                activo: true,
                fechaInicio: { lte: new Date() },
                fechaFin: { gt: new Date() },
              },
              orderBy: { fechaFin: 'desc' },
              take: 1,
              select: { id: true, fechaInicio: true, fechaFin: true, motivo: true },
            },
          },
        },
        membresiasOrganizacion: {
          where: { activo: true },
          select: {
            organizacion: {
              select: {
                id: true,
                nombre: true,
                beneficiosPro: {
                  where: {
                    activo: true,
                    fechaInicio: { lte: new Date() },
                    fechaFin: { gt: new Date() },
                  },
                  orderBy: { fechaFin: 'desc' },
                  take: 1,
                  select: { id: true, fechaInicio: true, fechaFin: true, motivo: true },
                },
                propietario: {
                  select: { id: true, nombre: true, apellido: true, email: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return usuarios.map(({ organizacionesQueEsDueno, membresiasOrganizacion, referidosComoReferente, ...usuario }) => ({
      ...usuario,
      referidosValidados: referidosComoReferente.length,
      vinculosOrganizacion: [
        ...organizacionesQueEsDueno.map((organizacion) => ({
          tipo: 'OWNER' as const,
          organizacion: { id: organizacion.id, nombre: organizacion.nombre },
          beneficioPro: organizacion.beneficiosPro[0] ?? null,
          owner: {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
          },
        })),
        ...membresiasOrganizacion
          .filter(({ organizacion }) => organizacion.propietario.id !== usuario.id)
          .map(({ organizacion }) => ({
            tipo: 'MIEMBRO' as const,
            organizacion: { id: organizacion.id, nombre: organizacion.nombre },
            beneficioPro: organizacion.beneficiosPro[0] ?? null,
            owner: organizacion.propietario,
          })),
      ],
    }));
  }

  private async validarSuperadmin(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { rolGlobal: true },
    });
    if (usuario?.rolGlobal !== 'SUPERADMIN') {
      throw new ForbiddenException('Solo SUPERADMIN');
    }
  }

  async otorgarBeneficioPro(adminId: number, dto: OtorgarBeneficioProDto) {
    await this.validarSuperadmin(adminId);

    const organizacion = await this.prisma.organizacion.findUnique({
      where: { id: dto.organizacionId },
      select: { id: true, nombre: true, plan: true },
    });
    if (!organizacion) throw new NotFoundException('Organización no encontrada');

    const ahora = new Date();
    const beneficioVigente = await this.prisma.beneficioProOrganizacion.findFirst({
      where: {
        organizacionId: dto.organizacionId,
        activo: true,
        fechaInicio: { lte: ahora },
        fechaFin: { gt: ahora },
      },
      orderBy: { fechaFin: 'desc' },
    });
    const fechaBase = beneficioVigente?.fechaFin ?? ahora;
    const fechaFin = new Date(fechaBase);
    fechaFin.setMonth(fechaFin.getMonth() + dto.duracionMeses);
    const motivo = dto.motivo?.trim() || null;

    const beneficio = beneficioVigente
      ? await this.prisma.beneficioProOrganizacion.update({
          where: { id: beneficioVigente.id },
          data: { fechaFin, motivo },
        })
      : await this.prisma.beneficioProOrganizacion.create({
          data: {
            organizacionId: dto.organizacionId,
            otorgadoPorId: adminId,
            fechaInicio: ahora,
            fechaFin,
            motivo,
          },
        });

    return {
      ...beneficio,
      organizacion: { id: organizacion.id, nombre: organizacion.nombre },
      planContratado: organizacion.plan,
    };
  }

  async revocarBeneficioPro(adminId: number, beneficioId: number) {
    await this.validarSuperadmin(adminId);

    const beneficio = await this.prisma.beneficioProOrganizacion.findUnique({
      where: { id: beneficioId },
      select: { id: true, organizacionId: true },
    });
    if (!beneficio) throw new NotFoundException('Beneficio no encontrado');

    return this.prisma.beneficioProOrganizacion.update({
      where: { id: beneficio.id },
      data: { activo: false, revocadoEn: new Date() },
      select: { id: true, organizacionId: true, activo: true, revocadoEn: true },
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
