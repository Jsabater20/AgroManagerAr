import { Body, Controller, Get, Patch, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import {
  DesgloseProductivoQueryDto,
  ReportePeriodicoQueryDto,
} from './dto/reporte-periodico-query.dto';
import { UpdatePreferenciasReporteDto } from './dto/update-preferencias-reporte.dto';
import { ReportesService } from './reportes.service';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@Controller('reportes')
@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('capacidades')
  obtenerCapacidades(@Request() req: AuthRequest) {
    return this.reportesService.obtenerCapacidades(
      req.user.id,
      req.organizacionId,
    );
  }

  @Get('preferencias')
  obtenerPreferencias(@Request() req: AuthRequest) {
    return this.reportesService.obtenerPreferencias(req.user.id, req.organizacionId);
  }

  @Patch('preferencias')
  actualizarPreferencias(
    @Request() req: AuthRequest,
    @Body() datos: UpdatePreferenciasReporteDto,
  ) {
    return this.reportesService.actualizarPreferencias(
      req.user.id,
      req.organizacionId,
      datos,
    );
  }

  @Get('historial')
  listarHistorial(@Request() req: AuthRequest) {
    return this.reportesService.listarHistorial(req.user.id, req.organizacionId);
  }

  @Get('semanal')
  generarSemanal(
    @Request() req: AuthRequest,
    @Query() query: ReportePeriodicoQueryDto,
  ) {
    return this.reportesService.generarSemanal(
      req.user.id,
      req.organizacionId,
      query.fechaReferencia ? new Date(query.fechaReferencia) : undefined,
    );
  }

  @Get('mensual')
  generarMensual(
    @Request() req: AuthRequest,
    @Query() query: ReportePeriodicoQueryDto,
  ) {
    return this.reportesService.generarMensual(
      req.user.id,
      req.organizacionId,
      query.fechaReferencia ? new Date(query.fechaReferencia) : undefined,
    );
  }

  @Get('desglose-productivo')
  generarDesgloseProductivo(
    @Request() req: AuthRequest,
    @Query() query: DesgloseProductivoQueryDto,
  ) {
    return this.reportesService.generarDesgloseProductivo(
      req.user.id,
      req.organizacionId,
      query.tipo ?? 'MENSUAL',
      query.fechaReferencia ? new Date(query.fechaReferencia) : undefined,
    );
  }
}
