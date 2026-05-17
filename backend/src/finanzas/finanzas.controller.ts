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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { FinanzasService } from './finanzas.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto/finanzas.dto';

type AuthRequest = { user: { id: number } };

@UseGuards(JwtAuthGuard, DemoGuard)
@Controller('finanzas')
export class FinanzasController {
  constructor(private finanzasService: FinanzasService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.finanzasService.findAll(req.user.id);
  }

  @Get('resumen')
  resumen(@Request() req: AuthRequest) {
    return this.finanzasService.resumen(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.finanzasService.findOne(id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateMovimientoDto, @Request() req: AuthRequest) {
    return this.finanzasService.create(req.user.id, dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovimientoDto,
    @Request() req: AuthRequest,
  ) {
    return this.finanzasService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.finanzasService.remove(id, req.user.id);
  }
}
