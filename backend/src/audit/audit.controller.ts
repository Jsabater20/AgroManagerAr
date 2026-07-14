import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationGuard } from '../organizations/organization.guard';

@Controller('auditoria')
@UseGuards(JwtAuthGuard, OrganizationGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get('organizaciones/:organizacionId')
  async obtenerAuditoria(
    @Param('organizacionId') organizacionId: string,
    @Query('limite') limite: string = '100',
    @Query('offset') offset: string = '0',
  ) {
    const registros = await this.auditService.obtenerPorOrganizacion(
      parseInt(organizacionId),
      parseInt(limite),
      parseInt(offset),
    );

    const total = await this.auditService.contarPorOrganizacion(
      parseInt(organizacionId),
    );

    return {
      registros,
      total,
      limite: parseInt(limite),
      offset: parseInt(offset),
    };
  }

  @Get('mi-actividad')
  async obtenerMiActividad(
    @Query('limite') limite: string = '100',
    @Query('offset') offset: string = '0',
    @Query('usuarioId') usuarioId: string,
  ) {
    return this.auditService.obtenerPorUsuario(
      parseInt(usuarioId),
      parseInt(limite),
      parseInt(offset),
    );
  }
}
