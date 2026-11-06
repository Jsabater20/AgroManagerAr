import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Auditar } from '../audit/decorators/audit.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ActualizarNovedadProductoDto,
  ConfirmarEnvioNovedadDto,
  CrearNovedadProductoDto,
  EnviarCorreoPruebaNovedadDto,
} from './dto/novedades.dto';
import { NovedadesService } from './novedades.service';

interface AuthRequest {
  user: { id: number };
}

@Controller('novedades')
@UseGuards(JwtAuthGuard)
export class NovedadesController {
  constructor(private readonly novedadesService: NovedadesService) {}

  @Get()
  listar(@Request() req: AuthRequest) {
    return this.novedadesService.listarParaUsuario(req.user.id);
  }

  @Get('resumen')
  resumen(@Request() req: AuthRequest) {
    return this.novedadesService.obtenerResumenParaUsuario(req.user.id);
  }

  @Post(':id/lectura')
  marcarLeida(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.novedadesService.marcarLeida(req.user.id, id);
  }

  @Get('admin/todas')
  listarParaAdmin(@Request() req: AuthRequest) {
    return this.novedadesService.listarParaAdmin(req.user.id);
  }

  @Get('admin/:id/preview-email')
  previsualizarCorreo(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.novedadesService.previsualizarCorreo(req.user.id, id);
  }

  @Get('admin/:id/resumen-envio-email')
  resumenEnvioCorreo(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.novedadesService.resumenEnvioCorreo(req.user.id, id);
  }

  @Post('admin')
  @Auditar('crear_novedad_producto', 'NovedadProducto')
  crear(@Request() req: AuthRequest, @Body() dto: CrearNovedadProductoDto) {
    return this.novedadesService.crearBorrador(req.user.id, dto);
  }

  @Patch('admin/:id')
  @Auditar('modificar_novedad_producto', 'NovedadProducto')
  actualizar(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: ActualizarNovedadProductoDto,
  ) {
    return this.novedadesService.actualizar(req.user.id, id, dto);
  }

  @Post('admin/:id/publicar')
  @Auditar('publicar_novedad_producto', 'NovedadProducto')
  publicar(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.novedadesService.publicar(req.user.id, id);
  }

  @Post('admin/:id/email-prueba')
  @Auditar('enviar_prueba_novedad_producto', 'NovedadProducto')
  enviarCorreoPrueba(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto?: EnviarCorreoPruebaNovedadDto,
  ) {
    return this.novedadesService.enviarCorreoPrueba(req.user.id, id, dto?.email);
  }

  @Post('admin/:id/enviar-emails')
  @Auditar('enviar_novedad_producto', 'NovedadProducto')
  enviarCorreos(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: ConfirmarEnvioNovedadDto,
  ) {
    return this.novedadesService.enviarCorreos(req.user.id, id, dto);
  }
}
