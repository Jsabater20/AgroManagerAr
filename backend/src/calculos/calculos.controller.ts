import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Auditar } from '../audit/decorators/audit.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { CalculosService } from './calculos.service';
import { GuardarCalculoDto } from './dto/guardar-calculo.dto';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('calculos')
export class CalculosController {
  constructor(private readonly calculosService: CalculosService) {}

  @Get('contexto/campos')
  obtenerCamposDisponibles(@Request() req: AuthRequest) {
    return this.calculosService.obtenerCamposDisponibles(
      req.user.id,
      req.organizacionId,
    );
  }

  @Get('contexto/maquinarias')
  obtenerMaquinariasDisponibles(@Request() req: AuthRequest) {
    return this.calculosService.obtenerMaquinariasDisponibles(
      req.user.id,
      req.organizacionId,
    );
  }

  @Get('contexto/costos')
  obtenerCostosRegistrados(
    @Request() req: AuthRequest,
    @Query('campoId') campoId: string,
  ) {
    return this.calculosService.obtenerCostosRegistrados(
      req.user.id,
      req.organizacionId,
      Number(campoId),
    );
  }

  @Get()
  listar(@Request() req: AuthRequest) {
    return this.calculosService.listar(req.user.id, req.organizacionId);
  }

  @Post()
  @Auditar('guardar_calculo', 'Calculo')
  guardar(@Body() dto: GuardarCalculoDto, @Request() req: AuthRequest) {
    return this.calculosService.guardar(dto, req.user.id, req.organizacionId);
  }
}
