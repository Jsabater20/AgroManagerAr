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
import { OrganizationGuard } from '../organizations/organization.guard';
import { FinanzasService } from './finanzas.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from './dto/finanzas.dto';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('finanzas')
export class FinanzasController {
  constructor(private finanzasService: FinanzasService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.finanzasService.findAll(req.user.id, req.organizacionId);
  }

  @Get('resumen')
  resumen(@Request() req: AuthRequest) {
    return this.finanzasService.resumen(req.user.id, req.organizacionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.finanzasService.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  create(@Body() dto: CreateMovimientoDto, @Request() req: AuthRequest) {
    return this.finanzasService.create(req.user.id, req.organizacionId, dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovimientoDto,
    @Request() req: AuthRequest,
  ) {
    return this.finanzasService.update(id, req.user.id, req.organizacionId, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.finanzasService.remove(id, req.user.id, req.organizacionId);
  }
}
