import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmpresasService } from './empresas.service';
import {
  ActualizarMiembroEmpresaDto,
  CrearEmpresaDto,
  CrearMiembroEmpresaDto,
  VincularOrganizacionDto,
} from './dto/empresas.dto';

interface AuthRequest {
  user: { id: number };
}

@Controller('empresas')
@UseGuards(JwtAuthGuard)
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  crear(@Request() req: AuthRequest, @Body() dto: CrearEmpresaDto) {
    return this.empresasService.crearEmpresa(req.user.id, dto);
  }

  @Get('mias')
  listarMias(@Request() req: AuthRequest) {
    return this.empresasService.listarMisEmpresas(req.user.id);
  }

  @Get(':empresaId')
  obtener(@Request() req: AuthRequest, @Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.empresasService.obtenerEmpresa(req.user.id, empresaId);
  }

  @Get(':empresaId/dashboard')
  dashboard(@Request() req: AuthRequest, @Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.empresasService.obtenerDashboard(req.user.id, empresaId);
  }

  @Get(':empresaId/organizaciones')
  organizaciones(@Request() req: AuthRequest, @Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.empresasService.listarOrganizaciones(req.user.id, empresaId);
  }

  @Get(':empresaId/miembros/consolidados')
  miembrosConsolidados(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
  ) {
    return this.empresasService.listarMiembrosConsolidados(req.user.id, empresaId);
  }

  @Get(':empresaId/actividades')
  actividades(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Query('organizacionId') organizacionId?: string,
    @Query('estado') estado?: string,
    @Query('limite') limite?: string,
  ) {
    return this.empresasService.listarActividadesConsolidadas(req.user.id, empresaId, {
      organizacionId: this.parseOptionalInt(organizacionId),
      estado,
      limite: this.parseOptionalInt(limite),
    });
  }

  @Get(':empresaId/maquinarias')
  maquinarias(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Query('organizacionId') organizacionId?: string,
    @Query('estado') estado?: string,
    @Query('limite') limite?: string,
  ) {
    return this.empresasService.listarMaquinariasConsolidadas(req.user.id, empresaId, {
      organizacionId: this.parseOptionalInt(organizacionId),
      estado,
      limite: this.parseOptionalInt(limite),
    });
  }

  @Get(':empresaId/ganaderia')
  ganaderia(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Query('organizacionId') organizacionId?: string,
    @Query('especie') especie?: string,
    @Query('limite') limite?: string,
  ) {
    return this.empresasService.listarGanaderiaConsolidada(req.user.id, empresaId, {
      organizacionId: this.parseOptionalInt(organizacionId),
      especie,
      limite: this.parseOptionalInt(limite),
    });
  }

  @Get(':empresaId/finanzas')
  finanzas(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Query('organizacionId') organizacionId?: string,
  ) {
    return this.empresasService.obtenerFinanzasConsolidadas(req.user.id, empresaId, {
      organizacionId: this.parseOptionalInt(organizacionId),
    });
  }

  @Get(':empresaId/rentabilidad')
  rentabilidad(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Query('organizacionId') organizacionId?: string,
  ) {
    return this.empresasService.obtenerRentabilidadConsolidada(req.user.id, empresaId, {
      organizacionId: this.parseOptionalInt(organizacionId),
    });
  }

  @Get(':empresaId/auditoria')
  auditoria(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Query('organizacionId') organizacionId?: string,
    @Query('accion') accion?: string,
    @Query('usuarioId') usuarioId?: string,
    @Query('limite') limite?: string,
    @Query('offset') offset?: string,
  ) {
    return this.empresasService.obtenerAuditoriaConsolidada(req.user.id, empresaId, {
      organizacionId: this.parseOptionalInt(organizacionId),
      accion,
      usuarioId: this.parseOptionalInt(usuarioId),
      limite: this.parseOptionalInt(limite),
      offset: this.parseOffset(offset),
    });
  }

  @Post(':empresaId/organizaciones')
  vincularOrganizacion(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Body() dto: VincularOrganizacionDto,
  ) {
    return this.empresasService.vincularOrganizacion(req.user.id, empresaId, dto);
  }

  @Delete(':empresaId/organizaciones/:organizacionId')
  desvincularOrganizacion(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('organizacionId', ParseIntPipe) organizacionId: number,
  ) {
    return this.empresasService.desvincularOrganizacion(req.user.id, empresaId, organizacionId);
  }

  @Get(':empresaId/miembros')
  miembros(@Request() req: AuthRequest, @Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.empresasService.listarMiembros(req.user.id, empresaId);
  }

  @Post(':empresaId/miembros')
  crearMiembro(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Body() dto: CrearMiembroEmpresaDto,
  ) {
    return this.empresasService.crearMiembro(req.user.id, empresaId, dto);
  }

  @Patch(':empresaId/miembros/:miembroId')
  actualizarMiembro(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('miembroId', ParseIntPipe) miembroId: number,
    @Body() dto: ActualizarMiembroEmpresaDto,
  ) {
    return this.empresasService.actualizarMiembro(req.user.id, empresaId, miembroId, dto);
  }

  private parseOptionalInt(value?: string) {
    if (!value) return undefined;
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
  }

  private parseOffset(value?: string) {
    if (!value) return undefined;
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed >= 0 ? parsed : undefined;
  }
}
