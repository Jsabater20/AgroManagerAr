import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationsService } from './organizations.service';
import {
  CreateOrganizacionDto,
  UpdateOrganizacionDto,
  InvitarMiembroDto,
} from './organizations.dto';
import { Auditar } from '../audit/decorators/audit.decorator';

@Controller('organizaciones')
export class OrganizationsController {
  private readonly logger = new Logger(OrganizationsController.name);

  constructor(private organizationsService: OrganizationsService) {}

  // ────────────────────────────────────────────────────────────────────────────
  // PÚBLICO: Obtener invitación por token (sin autenticación)
  // ────────────────────────────────────────────────────────────────────────────
  @Get('invitaciones/:token')
  async obtenerInvitacion(@Param('token') token: string) {
    return this.organizationsService.obtenerInvitacionPorToken(token);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // PROTEGIDO: Resto de endpoints
  // ────────────────────────────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Post()
  @Auditar('crear_organizacion', 'Organizacion')
  async crearOrganizacion(
    @Request() req: { user: { id: number } },
    @Body() dto: CreateOrganizacionDto,
  ) {
    return this.organizationsService.crearOrganizacion(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async obtenerOrganizaciones(
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.obtenerOrganizacionesDelUsuario(
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async obtenerOrganizacion(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.obtenerOrganizacion(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Auditar('actualizar_organizacion', 'Organizacion')
  async actualizarOrganizacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrganizacionDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.actualizarOrganizacion(
      id,
      req.user.id,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/invitar')
  @Auditar('invitar_miembro', 'UsuarioOrganizacion')
  async invitarMiembro(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: InvitarMiembroDto,
    @Request() req: { user: { id: number } },
  ) {
    this.logger.log(`[invitarMiembro] START - orgId=${id}, email=${dto.email}, rol=${dto.rol}, userId=${req.user.id}`);
    this.logger.debug(`[invitarMiembro] DTO object: ${JSON.stringify(dto)}`);
    
    try {
      const result = await this.organizationsService.invitarMiembro(id, req.user.id, dto);
      this.logger.log(`[invitarMiembro] SUCCESS - invitationId=${result.id}`);
      return result;
    } catch (error: any) {
      this.logger.error(`[invitarMiembro] FAILED - ${error.message}`, error.stack);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('invitaciones/:token/aceptar')
  @Auditar('aceptar_invitacion', 'UsuarioOrganizacion')
  async aceptarInvitacion(
    @Param('token') token: string,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.aceptarInvitacion(token, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/miembros')
  async obtenerMiembros(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.obtenerMiembros(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/miembros/:miembroId')
  @Auditar('eliminar_miembro', 'UsuarioOrganizacion')
  async eliminarMiembro(
    @Param('id', ParseIntPipe) id: number,
    @Param('miembroId', ParseIntPipe) miembroId: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.eliminarMiembro(
      id,
      req.user.id,
      miembroId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/miembros/:miembroId/rol')
  @Auditar('cambiar_rol_miembro', 'UsuarioOrganizacion')
  async cambiarRolMiembro(
    @Param('id', ParseIntPipe) id: number,
    @Param('miembroId', ParseIntPipe) miembroId: number,
    @Body() dto: { rol: string },
    @Request() req: { user: { id: number } },
  ) {
    return this.organizationsService.cambiarRolMiembro(
      id,
      miembroId,
      dto.rol as 'OWNER' | 'ADMIN' | 'OPERARIO' | 'ASESOR' | 'CONTRATISTA' | 'CONTADOR',
      req.user.id,
    );
  }
}
