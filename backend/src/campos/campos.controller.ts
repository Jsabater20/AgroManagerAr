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
import { CamposService } from './campos.service';
import {
  CreateCampoDto,
  UpdateCampoDto,
  CreateLoteDto,
} from './dto/campos.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';

interface AuthRequest {
  user: { id: number; email: string; nombre: string; rol: string };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('campos')
export class CamposController {
  constructor(private camposService: CamposService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.camposService.findAll(req.user.id, req.organizacionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.camposService.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  create(@Body() dto: CreateCampoDto, @Request() req: AuthRequest) {
    return this.camposService.create(dto, req.user.id, req.organizacionId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCampoDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.update(id, dto, req.user.id, req.organizacionId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.camposService.remove(id, req.user.id, req.organizacionId);
  }

  @Post(':id/lotes')
  addLote(
    @Param('id', ParseIntPipe) campoId: number,
    @Body() dto: CreateLoteDto,
    @Request() req: AuthRequest,
  ) {
    return this.camposService.addLote(campoId, dto, req.user.id, req.organizacionId);
  }
}
