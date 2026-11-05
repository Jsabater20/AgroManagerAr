import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Auditar } from '../audit/decorators/audit.decorator';
import { DemoGuard } from '../auth/demo.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { ClimaService } from './clima.service';
import {
  CreateRegistroPrecipitacionDto,
  UpdateRegistroPrecipitacionDto,
} from './dto/registro-precipitacion.dto';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@Controller('clima')
@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

  @Get('campos/:campoId/pronostico')
  obtenerPronostico(@Request() req: AuthRequest, @Param('campoId', ParseIntPipe) campoId: number) {
    return this.climaService.obtenerPronostico(req.user.id, req.organizacionId, campoId);
  }

  @Get('campos/:campoId/precipitaciones')
  listarPrecipitaciones(@Request() req: AuthRequest, @Param('campoId', ParseIntPipe) campoId: number) {
    return this.climaService.listarPrecipitaciones(req.user.id, req.organizacionId, campoId);
  }

  @Get('campos/:campoId/precipitaciones/resumen')
  resumenPrecipitaciones(@Request() req: AuthRequest, @Param('campoId', ParseIntPipe) campoId: number) {
    return this.climaService.resumenPrecipitaciones(req.user.id, req.organizacionId, campoId);
  }

  @Post('precipitaciones')
  @Auditar('crear_registro_precipitacion', 'RegistroPrecipitacion')
  crearPrecipitacion(@Request() req: AuthRequest, @Body() dto: CreateRegistroPrecipitacionDto) {
    return this.climaService.crearPrecipitacion(req.user.id, req.organizacionId, dto);
  }

  @Patch('precipitaciones/:id')
  @Auditar('corregir_registro_precipitacion', 'RegistroPrecipitacion')
  actualizarPrecipitacion(
    @Request() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRegistroPrecipitacionDto,
  ) {
    return this.climaService.actualizarPrecipitacion(req.user.id, req.organizacionId, id, dto);
  }
}
