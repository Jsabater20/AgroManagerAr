// backend/src/organizaciones/organizaciones.controller.ts - COMPLETO
import { Controller, Get, Patch, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationsService } from './organizations.service';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import { AsignarCampoDto } from './dto/asignar-campo.dto';
import { ActualizarVisibilidadModuloDto } from './dto/actualizar-visibilidad-modulo.dto';

@Controller('organizaciones')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private organizacionesService: OrganizationsService) {}

  @Get(':orgId/miembros')
  async obtenerMiembros(@Param('orgId') orgId: string) {
    return await this.organizacionesService.obtenerMiembros(parseInt(orgId));
  }

  @Patch(':orgId/miembros/:usuarioOrgId')
  async actualizarMiembro(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Body() dto: ActualizarMiembroDto,
  ) {
    return await this.organizacionesService.actualizarMiembro(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      dto,
    );
  }

  @Delete(':orgId/miembros/:usuarioOrgId')
  async eliminarMiembro(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
  ) {
    await this.organizacionesService.eliminarMiembro(parseInt(orgId), parseInt(usuarioOrgId));
    return { mensaje: 'Miembro eliminado' };
  }

  @Post(':orgId/miembros/:usuarioOrgId/campos')
  async asignarCampo(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Body() dto: AsignarCampoDto,
  ) {
    await this.organizacionesService.asignarCampo(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      dto,
    );
    return { mensaje: 'Campo asignado' };
  }

  @Delete(':orgId/miembros/:usuarioOrgId/campos/:campoId')
  async desasignarCampo(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Param('campoId') campoId: string,
  ) {
    await this.organizacionesService.desasignarCampo(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      parseInt(campoId),
    );
    return { mensaje: 'Campo desasignado' };
  }

  @Patch(':orgId/miembros/:usuarioOrgId/modulos')
  async actualizarVisibilidadModulo(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Body() dto: ActualizarVisibilidadModuloDto,
  ) {
    await this.organizacionesService.actualizarVisibilidadModulo(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      dto,
    );
    return { mensaje: 'Visibilidad actualizada' };
  }

  @Get('modulos/disponibles')
  async obtenerModulosDisponibles() {
    const modulos = await this.organizacionesService.obtenerModulosDisponibles();
    return { modulos };
  }
}
