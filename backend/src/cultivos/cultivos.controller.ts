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
import { CultivosService } from './cultivos.service';
import { CreateTipoCultivoDto, UpdateTipoCultivoDto } from './dto/cultivos.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('cultivos')
export class CultivosController {
  constructor(private cultivosService: CultivosService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.cultivosService.findAll(req.user.id, req.organizacionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.cultivosService.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  create(@Body() dto: CreateTipoCultivoDto, @Request() req: AuthRequest) {
    return this.cultivosService.create(dto, req.user.id, req.organizacionId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipoCultivoDto,
    @Request() req: AuthRequest,
  ) {
    return this.cultivosService.update(id, dto, req.user.id, req.organizacionId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.cultivosService.remove(id, req.user.id, req.organizacionId);
  }
}
