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
import { TareasService } from './tareas.service';
import {
  CreateTareaDto,
  UpdateTareaDto,
  UpdateTareaEstadoDto,
} from './dto/tareas.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('tareas')
export class TareasController {
  constructor(private tareasService: TareasService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.tareasService.findAll(req.user.id, req.organizacionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.tareasService.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  create(@Body() dto: CreateTareaDto, @Request() req: AuthRequest) {
    return this.tareasService.create(dto, req.user.id, req.organizacionId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTareaDto,
    @Request() req: AuthRequest,
  ) {
    return this.tareasService.update(id, dto, req.user.id, req.organizacionId);
  }

  @Patch(':id/estado')
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTareaEstadoDto,
    @Request() req: AuthRequest,
  ) {
    return this.tareasService.updateEstado(id, dto, req.user.id, req.organizacionId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.tareasService.remove(id, req.user.id, req.organizacionId);
  }
}
