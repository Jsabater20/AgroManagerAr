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
import { MaquinariasService } from './maquinarias.service';
import {
  CreateGastoDto,
  CreateMaquinariaDto,
  CreateMantenimientoDto,
  UpdateMaquinariaDto,
} from './dto/maquinarias.dto';

type AuthRequest = Request & { user: { id: number } };

@UseGuards(JwtAuthGuard)
@Controller('maquinarias')
export class MaquinariasController {
  constructor(private readonly maquinariasService: MaquinariasService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.maquinariasService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.maquinariasService.findOne(id, req.user.id);
  }

  @UseGuards(DemoGuard)
  @Post()
  create(@Request() req: AuthRequest, @Body() dto: CreateMaquinariaDto) {
    return this.maquinariasService.create(req.user.id, dto);
  }

  @UseGuards(DemoGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
    @Body() dto: UpdateMaquinariaDto,
  ) {
    return this.maquinariasService.update(id, req.user.id, dto);
  }

  @UseGuards(DemoGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.maquinariasService.remove(id, req.user.id);
  }

  // ── Mantenimientos ────────────────────────────────────────────────────────

  @UseGuards(DemoGuard)
  @Post(':id/mantenimientos')
  addMantenimiento(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
    @Body() dto: CreateMantenimientoDto,
  ) {
    return this.maquinariasService.addMantenimiento(id, req.user.id, dto);
  }

  @UseGuards(DemoGuard)
  @Delete(':id/mantenimientos/:mantenimientoId')
  removeMantenimiento(
    @Param('id', ParseIntPipe) id: number,
    @Param('mantenimientoId', ParseIntPipe) mantenimientoId: number,
    @Request() req: AuthRequest,
  ) {
    return this.maquinariasService.removeMantenimiento(
      id,
      mantenimientoId,
      req.user.id,
    );
  }

  // ── Gastos ────────────────────────────────────────────────────────────────

  @UseGuards(DemoGuard)
  @Post(':id/gastos')
  addGasto(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
    @Body() dto: CreateGastoDto,
  ) {
    return this.maquinariasService.addGasto(id, req.user.id, dto);
  }

  @UseGuards(DemoGuard)
  @Delete(':id/gastos/:gastoId')
  removeGasto(
    @Param('id', ParseIntPipe) id: number,
    @Param('gastoId', ParseIntPipe) gastoId: number,
    @Request() req: AuthRequest,
  ) {
    return this.maquinariasService.removeGasto(id, gastoId, req.user.id);
  }
}
