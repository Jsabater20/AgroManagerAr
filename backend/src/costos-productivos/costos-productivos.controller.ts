import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsOwnerGuard } from '../organizations/guards/is-owner.guard';
import { CostosProductivosService } from './costos-productivos.service';
import { CreateCostoActividadDto } from './dto/create-costo-actividad.dto';
import { CreateCostoEstimadoDto } from './dto/create-costo-estimado.dto';

interface AuthRequest {
  user?: { id: number };
}

@Controller('organizaciones')
@UseGuards(JwtAuthGuard, IsOwnerGuard)
export class CostosProductivosController {
  constructor(
    private readonly costosProductivosService: CostosProductivosService,
  ) {}

  @Get(':orgId/actividades/:actividadId/costos')
  listarPorActividad(
    @Param('orgId', ParseIntPipe) orgId: number,
    @Param('actividadId', ParseIntPipe) actividadId: number,
  ) {
    return this.costosProductivosService.listarPorActividad(orgId, actividadId);
  }

  @Post(':orgId/actividades/:actividadId/costos')
  crearDesdeActividad(
    @Param('orgId', ParseIntPipe) orgId: number,
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: CreateCostoActividadDto,
    @Request() req: AuthRequest,
  ) {
    return this.costosProductivosService.crearDesdeActividad(
      orgId,
      actividadId,
      dto,
      req.user?.id ?? 0,
    );
  }

  @Post(':orgId/costos-productivos/estimados')
  crearEstimado(
    @Param('orgId', ParseIntPipe) orgId: number,
    @Body() dto: CreateCostoEstimadoDto,
    @Request() req: AuthRequest,
  ) {
    return this.costosProductivosService.crearEstimado(
      orgId,
      dto,
      req.user?.id ?? 0,
    );
  }
}
