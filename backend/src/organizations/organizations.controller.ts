import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationsService } from './organizations.service';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import { AsignarCampoDto } from './dto/asignar-campo.dto';
import { ActualizarVisibilidadModuloDto } from './dto/actualizar-visibilidad-modulo.dto';
import { InvitarMiembroDto } from './dto/invitar-miembro.dto';
import { IsOwnerGuard } from './guards/is-owner.guard';
import { OrganizationGuard } from './organization.guard';
import { CambiarRolOwnerDto } from './dto/cambiar-rol-owner.dto';

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

@Controller('organizaciones')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private organizacionesService: OrganizationsService) {}

  // ─── ORGANIZACIONES ───────────────────────────────────────────────────────

  @Get()
  async obtenerOrganizaciones(@Request() req: AuthRequest) {
    return await this.organizacionesService.obtenerOrganizaciones(req.user?.id);
  }

  // ─── MIEMBROS ─────────────────────────────────────────────────────────────

  @Get(':orgId/miembros/actual')
  @UseGuards(OrganizationGuard)
  async obtenerMiembroActual(
    @Param('orgId') orgId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.obtenerMiembroActual(
      parseInt(orgId),
      req.user?.id || 0,
    );
  }

  @Get(':orgId/miembros/uso')
  @UseGuards(IsOwnerGuard)
  async obtenerUsoMiembros(
    @Param('orgId') orgId: string,
    @Request() req: AuthRequest,
  ) {
    return this.organizacionesService.obtenerUsoMiembros(
      parseInt(orgId),
      req.user?.id || 0,
    );
  }

  @Get(':orgId/miembros')
  @UseGuards(IsOwnerGuard)
  async obtenerMiembros(@Param('orgId') orgId: string) {
    return await this.organizacionesService.obtenerMiembros(parseInt(orgId));
  }

  @Post(':orgId/miembros/invitar')
  @UseGuards(IsOwnerGuard)
  async invitarMiembro(
    @Param('orgId') orgId: string,
    @Body() dto: InvitarMiembroDto,
  ) {
    return await this.organizacionesService.invitarMiembro(
      parseInt(orgId),
      dto,
    );
  }

  @Patch(':orgId/miembros/:usuarioOrgId')
  @UseGuards(IsOwnerGuard)
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
  @UseGuards(IsOwnerGuard)
  async eliminarMiembro(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
  ) {
    await this.organizacionesService.eliminarMiembro(
      parseInt(orgId),
      parseInt(usuarioOrgId),
    );
    return { mensaje: 'Miembro eliminado' };
  }

  // ─── INVITACIONES ─────────────────────────────────────────────────────────

  @Get(':orgId/invitaciones')
  @UseGuards(IsOwnerGuard)
  async obtenerInvitaciones(@Param('orgId') orgId: string) {
    return await this.organizacionesService.obtenerInvitaciones(parseInt(orgId));
  }

  @Post(':orgId/invitaciones/:invitacionId/reenviar')
  @UseGuards(IsOwnerGuard)
  async reenviarInvitacion(
    @Param('orgId') orgId: string,
    @Param('invitacionId') invitacionId: string,
  ) {
    await this.organizacionesService.reenviarInvitacion(
      parseInt(orgId),
      parseInt(invitacionId),
    );
    return { mensaje: 'Invitación reenviada' };
  }

  @Delete(':orgId/invitaciones/:invitacionId')
  @UseGuards(IsOwnerGuard)
  async cancelarInvitacion(
    @Param('orgId') orgId: string,
    @Param('invitacionId') invitacionId: string,
  ) {
    await this.organizacionesService.cancelarInvitacion(
      parseInt(orgId),
      parseInt(invitacionId),
    );
    return { mensaje: 'Invitación cancelada' };
  }

  @Post('invitaciones/:token/aceptar')
  async aceptarInvitacion(
    @Param('token') token: string,
    @Request() req: AuthRequest,
  ) {
    await this.organizacionesService.aceptarInvitacion(
      token,
      req.user?.id || 0,
    );
    return { mensaje: 'Invitación aceptada' };
  }

  // ─── PANEL DEL OWNER ───────────────────────────────────────────────────────

  @Get(':orgId/panel/miembros')
  @UseGuards(IsOwnerGuard)
  async obtenerMiembrosPanel(
    @Param('orgId') orgId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.obtenerMiembrosPanel(
      parseInt(orgId),
      req.user?.id || 0,
    );
  }

  @Patch(':orgId/panel/miembros/:usuarioOrgId/rol')
  @UseGuards(IsOwnerGuard)
  async cambiarRolMiembroOwner(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Body() dto: CambiarRolOwnerDto,
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.cambiarRolMiembroOwner(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      dto,
      req.user?.id || 0,
    );
  }

  @Patch(':orgId/panel/miembros/:usuarioOrgId/suspender')
  @UseGuards(IsOwnerGuard)
  async suspenderMiembro(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.suspenderMiembro(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      req.user?.id || 0,
    );
  }

  @Patch(':orgId/panel/miembros/:usuarioOrgId/activar')
  @UseGuards(IsOwnerGuard)
  async activarMiembro(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.activarMiembro(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      req.user?.id || 0,
    );
  }

  @Delete(':orgId/panel/miembros/:usuarioOrgId')
  @UseGuards(IsOwnerGuard)
  async quitarMiembro(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.quitarMiembro(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      req.user?.id || 0,
    );
  }

  @Get(':orgId/panel/recursos/:usuarioOrgId')
  @UseGuards(IsOwnerGuard)
  async obtenerRecursosAsignables(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.obtenerRecursosAsignables(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      req.user?.id || 0,
    );
  }

  @Post(':orgId/panel/recursos/:usuarioOrgId/asignar')
  @UseGuards(IsOwnerGuard)
  async asignarRecurso(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Body() body: { recursoTipo: string; recursoId: number },
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.asignarRecurso(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      body.recursoTipo,
      body.recursoId,
      req.user?.id || 0,
    );
  }

  @Post(':orgId/panel/recursos/:usuarioOrgId/retirar')
  @UseGuards(IsOwnerGuard)
  async retirarRecurso(
    @Param('orgId') orgId: string,
    @Param('usuarioOrgId') usuarioOrgId: string,
    @Body() body: { recursoTipo: string; recursoId: number },
    @Request() req: AuthRequest,
  ) {
    return await this.organizacionesService.retirarRecurso(
      parseInt(orgId),
      parseInt(usuarioOrgId),
      body.recursoTipo,
      body.recursoId,
      req.user?.id || 0,
    );
  }

  // ─── ASIGNACIONES ─────────────────────────────────────────────────────────

  @Post(':orgId/miembros/:usuarioOrgId/campos')
  @UseGuards(IsOwnerGuard)
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
  @UseGuards(IsOwnerGuard)
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
  @UseGuards(IsOwnerGuard)
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
}
