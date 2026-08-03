// backend/src/campos/campos.controller.ts - COMPLETO
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
  Query,
} from '@nestjs/common';
import { CamposService } from './campos.service';
import {
  CreateCampoDto,
  UpdateCampoDto,
  CreateLoteDto,
} from './dto/campos.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { Auditar } from '../audit/decorators/audit.decorator';

interface AuthRequest {
  user: { id: number; email: string; nombre: string; rol: string; usuarioOrganizacionId?: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('campos')
export class CamposController {
  constructor(private camposService: CamposService) {}

  @Get()
  findAll(@Request() req: AuthRequest, @Query('campoId') campoId?: string) {
    // Si viene un campoId específico, retornar solo ese
    if (campoId) {
      return this.camposService.findOne(parseInt(campoId), req.user.id, req.organizacionId);
    }

    // Si no, retornar con filtro automático si tiene usuarioOrganizacionId
    return this.camposService.findAll(
      req.user.id,
      req.organizacionId,
      req.user.usuarioOrganizacionId,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.camposService.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  @Auditar('crear_campo', 'Campo')
  create(@Body() dto: CreateCampoDto, @Request() req: AuthRequest) {
    return this.camposService.create(dto, req.user.id, req.organizacionId);
  }

  @Patch(':id')
  @Auditar('modificar_campo', 'Campo')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCampoDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.update(id, dto, req.user.id, req.organizacionId);
  }

  @Delete(':id')
  @Auditar('eliminar_campo', 'Campo')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.camposService.remove(id, req.user.id, req.organizacionId);
  }

  @Post(':id/lotes')
  @Auditar('crear_lote', 'Lote')
  addLote(
    @Param('id', ParseIntPipe) campoId: number,
    @Body() dto: CreateLoteDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.addLote(
      campoId,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }
}
