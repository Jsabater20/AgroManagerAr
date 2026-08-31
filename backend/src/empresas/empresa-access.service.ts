import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RolEmpresa } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const ROLES_GESTION_EMPRESA = new Set<RolEmpresa>([
  RolEmpresa.OWNER,
  RolEmpresa.ADMINISTRADOR,
]);

const ROLES_CONSULTA_OPERATIVA = new Set<RolEmpresa>([
  RolEmpresa.OWNER,
  RolEmpresa.ADMINISTRADOR,
  RolEmpresa.GERENTE_GENERAL,
  RolEmpresa.GERENTE_ESTABLECIMIENTO,
  RolEmpresa.SUPERVISOR,
]);

const ROLES_CONSULTA_FINANCIERA = new Set<RolEmpresa>([
  RolEmpresa.OWNER,
  RolEmpresa.ADMINISTRADOR,
  RolEmpresa.GERENTE_GENERAL,
  RolEmpresa.GERENTE_ESTABLECIMIENTO,
  RolEmpresa.RESPONSABLE_FINANCIERO,
]);

@Injectable()
export class EmpresaAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerAcceso(usuarioId: number, empresaId: number) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
      include: {
        organizaciones: { select: { organizacionId: true } },
        miembros: {
          where: { usuarioId, activo: true },
          include: { organizacionesAutorizadas: { select: { organizacionId: true } } },
        },
      },
    });

    if (!empresa?.activo) {
      throw new NotFoundException('Empresa no encontrada o inactiva');
    }

    const esPropietario = empresa.propietarioId === usuarioId;
    const membresia = empresa.miembros[0];
    if (!esPropietario && !membresia) {
      throw new ForbiddenException('No tenés acceso a esta empresa');
    }

    const accesoTotal =
      esPropietario ||
      membresia?.accesoTodasOrganizaciones === true ||
      membresia?.rol === RolEmpresa.GERENTE_GENERAL;
    const organizacionesEmpresa = empresa.organizaciones.map(
      (vinculo) => vinculo.organizacionId,
    );
    const autorizadas = accesoTotal
      ? organizacionesEmpresa
      : membresia?.organizacionesAutorizadas
          .map((vinculo) => vinculo.organizacionId)
          .filter((organizacionId) => organizacionesEmpresa.includes(organizacionId)) ?? [];

    return {
      empresa,
      membresia,
      esPropietario,
      puedeGestionar: esPropietario || Boolean(membresia && ROLES_GESTION_EMPRESA.has(membresia.rol)),
      organizacionesIds: autorizadas,
    };
  }

  async requerirConsultaOperativa(usuarioId: number, empresaId: number) {
    const acceso = await this.obtenerAcceso(usuarioId, empresaId);
    if (
      !acceso.esPropietario &&
      (!acceso.membresia || !ROLES_CONSULTA_OPERATIVA.has(acceso.membresia.rol))
    ) {
      throw new ForbiddenException('No tenés permisos para consultar la operación empresarial');
    }
    return acceso;
  }

  async requerirConsultaFinanciera(usuarioId: number, empresaId: number) {
    const acceso = await this.obtenerAcceso(usuarioId, empresaId);
    if (
      !acceso.esPropietario &&
      (!acceso.membresia || !ROLES_CONSULTA_FINANCIERA.has(acceso.membresia.rol))
    ) {
      throw new ForbiddenException('No tenés permisos para consultar las finanzas empresariales');
    }
    return acceso;
  }

  async requerirGestion(usuarioId: number, empresaId: number) {
    const acceso = await this.obtenerAcceso(usuarioId, empresaId);
    if (!acceso.puedeGestionar) {
      throw new ForbiddenException('No tenés permisos para administrar esta empresa');
    }
    return acceso;
  }
}
