import {
  Body,
  Controller,
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
import { FrutihorticulturaService } from './frutihorticultura.service';
import {
  CreateCosechaFrutihorticolaDto,
  CreateCultivoFrutihorticolaDto,
  UpdateCultivoFrutihorticolaDto,
} from './dto/frutihorticultura.dto';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('frutihorticultura')
export class FrutihorticulturaController {
  constructor(private readonly service: FrutihorticulturaService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.service.findAll(req.user.id, req.organizacionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.service.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  create(@Body() dto: CreateCultivoFrutihorticolaDto, @Request() req: AuthRequest) {
    return this.service.create(dto, req.user.id, req.organizacionId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCultivoFrutihorticolaDto,
    @Request() req: AuthRequest,
  ) {
    return this.service.update(id, dto, req.user.id, req.organizacionId);
  }

  @Post(':id/cosechas')
  addCosecha(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCosechaFrutihorticolaDto,
    @Request() req: AuthRequest,
  ) {
    return this.service.addCosecha(id, dto, req.user.id, req.organizacionId);
  }
}
