import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { TamboService } from './tambo.service';
import { CreateRegistroOrdeneDto } from './dto/tambo.dto';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('tambo')
export class TamboController {
  constructor(private readonly service: TamboService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.service.findAll(req.user.id, req.organizacionId);
  }

  @Get('resumen')
  resumen(@Request() req: AuthRequest) {
    return this.service.resumen(req.user.id, req.organizacionId);
  }

  @Post()
  create(@Body() dto: CreateRegistroOrdeneDto, @Request() req: AuthRequest) {
    return this.service.create(dto, req.user.id, req.organizacionId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.service.remove(id, req.user.id, req.organizacionId);
  }
}
