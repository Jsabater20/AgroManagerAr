import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Auditar } from '../audit/decorators/audit.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { AlertasService } from './alertas.service';
import { CrearTareaAlertaClimaticaDto } from './dto/crear-tarea-alerta-climatica.dto';
import { UpdatePreferenciasAlertasDto } from './dto/update-preferencias-alertas.dto';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@Controller('alertas')
@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
export class AlertasController {
  constructor(private readonly alertasService: AlertasService) {}

  @Get()
  listar(@Request() req: AuthRequest) {
    return this.alertasService.obtenerParaOrganizacion(
      req.user.id,
      req.organizacionId,
    );
  }

  @Get('preferencias')
  obtenerPreferencias(@Request() req: AuthRequest) {
    return this.alertasService.obtenerPreferencias(req.user.id, req.organizacionId);
  }

  @Patch('preferencias')
  actualizarPreferencias(
    @Request() req: AuthRequest,
    @Body() datos: UpdatePreferenciasAlertasDto,
  ) {
    return this.alertasService.actualizarPreferencias(
      req.user.id,
      req.organizacionId,
      datos,
    );
  }

  @Post('gestion/:id/tarea-climatica')
  @Auditar('crear_tarea_desde_alerta_climatica', 'AlertaGestion')
  crearTareaClimatica(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() datos: CrearTareaAlertaClimaticaDto,
  ) {
    return this.alertasService.crearTareaDesdeAlertaClimatica(
      req.user.id,
      req.organizacionId,
      id,
      datos,
    );
  }

  @Get('gestion/resumen')
  resumenGestion(@Request() req: AuthRequest) {
    return this.alertasService.resumenGestion(
      req.user.id,
      req.organizacionId,
    );
  }

  @Get('gestion')
  listarGestion(
    @Request() req: AuthRequest,
    @Query('estado') estado?: string,
    @Query('severidad') severidad?: string,
  ) {
    return this.alertasService.listarGestion(
      req.user.id,
      req.organizacionId,
      { estado, severidad },
    );
  }

  @Patch('gestion/:id/leida')
  marcarGestionLeida(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.alertasService.marcarGestionLeida(
      req.user.id,
      req.organizacionId,
      id,
    );
  }

  @Patch('gestion/:id/revisada')
  revisarGestion(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.alertasService.revisarGestion(
      req.user.id,
      req.organizacionId,
      id,
    );
  }
}
