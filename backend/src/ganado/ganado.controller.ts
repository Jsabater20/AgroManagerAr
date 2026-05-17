import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GanadoService } from './ganado.service';
import {
  CreateAnimalDto,
  UpdateAnimalDto,
  CreatePrenezDto,
  UpdatePrenezEstadoDto,
  CreateRegistroPesoDto,
} from './dto/ganado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';

interface AuthRequest {
  user: { id: number };
}

@UseGuards(JwtAuthGuard, DemoGuard)
@Controller('ganado')
export class GanadoController {
  constructor(private ganadoService: GanadoService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.ganadoService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.ganadoService.findOne(id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateAnimalDto, @Request() req: AuthRequest) {
    return this.ganadoService.create(dto, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAnimalDto,
    @Request() req: AuthRequest,
  ) {
    return this.ganadoService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.ganadoService.remove(id, req.user.id);
  }

  @Post(':id/preneces')
  addPrenez(
    @Param('id', ParseIntPipe) animalId: number,
    @Body() dto: CreatePrenezDto,
    @Request() req: AuthRequest,
  ) {
    return this.ganadoService.addPrenez(animalId, dto, req.user.id);
  }

  @Patch('preneces/:prenezId/estado')
  updatePrenezEstado(
    @Param('prenezId', ParseIntPipe) prenezId: number,
    @Body() dto: UpdatePrenezEstadoDto,
    @Request() req: AuthRequest,
  ) {
    return this.ganadoService.updatePrenezEstado(prenezId, dto, req.user.id);
  }

  // ─── Historial de pesos ──────────────────────────────────────────────────────

  @Get(':id/pesos')
  getPesos(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.ganadoService.getPesos(id, req.user.id);
  }

  @Post(':id/pesos')
  addPeso(
    @Param('id', ParseIntPipe) animalId: number,
    @Body() dto: CreateRegistroPesoDto,
    @Request() req: AuthRequest,
  ) {
    return this.ganadoService.addPeso(animalId, dto, req.user.id);
  }

  @Delete('pesos/:pesoId')
  removePeso(
    @Param('pesoId', ParseIntPipe) pesoId: number,
    @Request() req: AuthRequest,
  ) {
    return this.ganadoService.removePeso(pesoId, req.user.id);
  }
}
