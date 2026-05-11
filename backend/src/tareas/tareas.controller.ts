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

interface AuthRequest {
  user: { id: number };
}

@UseGuards(JwtAuthGuard)
@Controller('tareas')
export class TareasController {
  constructor(private tareasService: TareasService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.tareasService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.tareasService.findOne(id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateTareaDto, @Request() req: AuthRequest) {
    return this.tareasService.create(dto, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTareaDto,
    @Request() req: AuthRequest,
  ) {
    return this.tareasService.update(id, dto, req.user.id);
  }

  @Patch(':id/estado')
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTareaEstadoDto,
    @Request() req: AuthRequest,
  ) {
    return this.tareasService.updateEstado(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.tareasService.remove(id, req.user.id);
  }
}
