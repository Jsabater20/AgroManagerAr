import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { YerbaService } from './yerba.service';
import { CreateCosechaYerbaDto, CreateCuadroYerbaDto } from './dto/yerba.dto';

interface AuthRequest { user: { id: number }; organizacionId: number; }

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('yerba')
export class YerbaController {
  constructor(private readonly service: YerbaService) {}
  @Get() findAll(@Request() req: AuthRequest) { return this.service.findAll(req.user.id, req.organizacionId); }
  @Get('resumen') resumen(@Request() req: AuthRequest) { return this.service.resumen(req.user.id, req.organizacionId); }
  @Post('cuadros') createCuadro(@Body() dto: CreateCuadroYerbaDto, @Request() req: AuthRequest) { return this.service.createCuadro(dto, req.user.id, req.organizacionId); }
  @Post('cuadros/:id/cosechas') createCosecha(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCosechaYerbaDto, @Request() req: AuthRequest) { return this.service.createCosecha(id, dto, req.user.id, req.organizacionId); }
  @Delete('cosechas/:id') removeCosecha(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) { return this.service.removeCosecha(id, req.user.id, req.organizacionId); }
}
