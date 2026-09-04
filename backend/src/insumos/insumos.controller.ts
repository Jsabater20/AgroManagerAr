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
import { InsumosService } from './insumos.service';
import { CreateInsumoDto, UpdateInsumoDto } from './dto/insumos.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('insumos')
export class InsumosController {
  constructor(private insumosService: InsumosService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.insumosService.findAll(req.user.id, req.organizacionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.insumosService.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  create(@Body() dto: CreateInsumoDto, @Request() req: AuthRequest) {
    return this.insumosService.create(dto, req.user.id, req.organizacionId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInsumoDto,
    @Request() req: AuthRequest,
  ) {
    return this.insumosService.update(id, dto, req.user.id, req.organizacionId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.insumosService.remove(id, req.user.id, req.organizacionId);
  }
}
