import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { MaquinariasService } from './maquinarias.service';
import { PlanService } from '../plan/plan.service';
import {
  CreateGastoDto,
  CreateMaquinariaDto,
  CreateMantenimientoDto,
  UpdateMaquinariaDto,
} from './dto/maquinarias.dto';
import { Auditar } from '../audit/decorators/audit.decorator';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, OrganizationGuard)
@Controller('maquinarias')
export class MaquinariasController {
  constructor(
    private readonly maquinariasService: MaquinariasService,
    private readonly planService: PlanService,
  ) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.maquinariasService.findAll(req.user.id, req.organizacionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.maquinariasService.findOne(id, req.user.id, req.organizacionId);
  }

  @UseGuards(DemoGuard)
  @Post()
  @Auditar('crear_maquinaria', 'Maquinaria')
  async create(@Request() req: AuthRequest, @Body() dto: CreateMaquinariaDto) {
    await this.planService.checkMaquinariasLimit(req.user.id);
    return this.maquinariasService.create(
      req.user.id,
      req.organizacionId,
      dto,
    );
  }

  @UseGuards(DemoGuard)
  @Patch(':id')
  @Auditar('modificar_maquinaria', 'Maquinaria')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
    @Body() dto: UpdateMaquinariaDto,
  ) {
    return this.maquinariasService.update(
      id,
      req.user.id,
      req.organizacionId,
      dto,
    );
  }

  @UseGuards(DemoGuard)
  @Delete(':id')
  @Auditar('eliminar_maquinaria', 'Maquinaria')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.maquinariasService.remove(
      id,
      req.user.id,
      req.organizacionId,
    );
  }

  // ── Mantenimientos ────────────────────────────────────────────────────────

  @UseGuards(DemoGuard)
  @Post(':id/mantenimientos')
  @Auditar('crear_mantenimiento', 'MantenimientoMaquinaria')
  addMantenimiento(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
    @Body() dto: CreateMantenimientoDto,
  ) {
    return this.maquinariasService.addMantenimiento(
      id,
      req.user.id,
      req.organizacionId,
      dto,
    );
  }

  @UseGuards(DemoGuard)
  @Delete(':id/mantenimientos/:mantenimientoId')
  @Auditar('eliminar_mantenimiento', 'MantenimientoMaquinaria')
  removeMantenimiento(
    @Param('id', ParseIntPipe) id: number,
    @Param('mantenimientoId', ParseIntPipe) mantenimientoId: number,
    @Request() req: AuthRequest,
  ) {
    return this.maquinariasService.removeMantenimiento(
      id,
      mantenimientoId,
      req.user.id,
      req.organizacionId,
    );
  }

  // ── Gastos ────────────────────────────────────────────────────────────────

  @UseGuards(DemoGuard)
  @Post(':id/gastos')
  @Auditar('crear_gasto_maquinaria', 'GastoMaquinaria')
  addGasto(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
    @Body() dto: CreateGastoDto,
  ) {
    return this.maquinariasService.addGasto(
      id,
      req.user.id,
      req.organizacionId,
      dto,
    );
  }

  @UseGuards(DemoGuard)
  @Delete(':id/gastos/:gastoId')
  @Auditar('eliminar_gasto_maquinaria', 'GastoMaquinaria')
  removeGasto(
    @Param('id', ParseIntPipe) id: number,
    @Param('gastoId', ParseIntPipe) gastoId: number,
    @Request() req: AuthRequest,
  ) {
    return this.maquinariasService.removeGasto(
      id,
      gastoId,
      req.user.id,
      req.organizacionId,
    );
  }
}
