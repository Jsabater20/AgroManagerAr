import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Request } from '@nestjs/common';
import { DemoGuard } from '../auth/demo.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfirmarAsignacionPromocionDto } from './dto/confirmar-asignacion-promocion.dto';
import { PromocionesService } from './promociones.service';

interface AuthRequest {
  user: { id: number };
}

@Controller('promociones')
@UseGuards(JwtAuthGuard, DemoGuard)
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Get('admin/lanzamiento')
  obtenerLanzamiento(@Request() req: AuthRequest) {
    return this.promocionesService.obtenerLanzamientoParaAdmin(req.user.id);
  }

  @Post('admin/lanzamiento/borrador')
  crearBorrador(@Request() req: AuthRequest) {
    return this.promocionesService.crearBorradorLanzamiento(req.user.id);
  }

  @Get('admin/:id/simulacion')
  simularExistentes(@Request() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.promocionesService.simularAsignacionExistentes(req.user.id, id);
  }

  @Post('admin/:id/activar')
  activar(@Request() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.promocionesService.activarLanzamiento(req.user.id, id);
  }

  @Post('admin/:id/pausar')
  pausar(@Request() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.promocionesService.pausarLanzamiento(req.user.id, id);
  }

  @Post('admin/:id/asignar-existentes')
  asignarExistentes(
    @Request() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ConfirmarAsignacionPromocionDto,
  ) {
    return this.promocionesService.asignarUsuariosExistentes(req.user.id, id, dto.confirmar);
  }

  @Get('mi-promocion')
  obtenerMiPromocion(
    @Request() req: AuthRequest & { query: { organizacionId?: string } },
  ) {
    const organizacionId = Number(req.query.organizacionId);
    if (!Number.isInteger(organizacionId) || organizacionId <= 0) {
      return null;
    }
    return this.promocionesService.obtenerPromocionUsuario(
      req.user.id,
      organizacionId,
    );
  }

  @Post('mis-asignaciones/:id/bienvenida-vista')
  marcarBienvenidaVista(@Request() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.promocionesService.marcarBienvenidaVista(req.user.id, id);
  }
}
