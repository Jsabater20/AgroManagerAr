import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { AvicolaService } from './avicola.service';
import { CreateGalponAvicolaDto, CreateRegistroAvicolaDto } from './dto/avicola.dto';

interface AuthRequest { user: { id: number }; organizacionId: number; }

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('avicola')
export class AvicolaController {
  constructor(private readonly service: AvicolaService) {}

  @Get()
  findAll(@Request() req: AuthRequest) { return this.service.findAll(req.user.id, req.organizacionId); }

  @Get('resumen')
  resumen(@Request() req: AuthRequest) { return this.service.resumen(req.user.id, req.organizacionId); }

  @Post('galpones')
  createGalpon(@Body() dto: CreateGalponAvicolaDto, @Request() req: AuthRequest) { return this.service.createGalpon(dto, req.user.id, req.organizacionId); }

  @Post('galpones/:id/registros')
  createRegistro(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateRegistroAvicolaDto, @Request() req: AuthRequest) { return this.service.createRegistro(id, dto, req.user.id, req.organizacionId); }

  @Delete('registros/:id')
  removeRegistro(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) { return this.service.removeRegistro(id, req.user.id, req.organizacionId); }
}
