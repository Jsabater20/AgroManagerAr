import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SiembrasService } from './siembras.service';
import {
  CreateSiembraDto,
  UpdateSiembraDto,
  CreateCosechaDto,
  CreateAplicacionDto,
} from './dto/siembras.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('siembras')
export class SiembrasController {
  constructor(private siembrasService: SiembrasService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.siembrasService.findAll(req.user.id, req.organizacionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.siembrasService.findOne(id, req.user.id, req.organizacionId);
  }

  @Post()
  create(@Body() dto: CreateSiembraDto, @Request() req: AuthRequest) {
    return this.siembrasService.create(dto, req.user.id, req.organizacionId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSiembraDto,
    @Request() req: AuthRequest,
  ) {
    return this.siembrasService.update(
      id,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }

  @Post(':id/cosechas')
  addCosecha(
    @Param('id', ParseIntPipe) siembraId: number,
    @Body() dto: CreateCosechaDto,
    @Request() req: AuthRequest,
  ) {
    return this.siembrasService.addCosecha(
      siembraId,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }

  @Post(':id/aplicaciones')
  addAplicacion(
    @Param('id', ParseIntPipe) siembraId: number,
    @Body() dto: CreateAplicacionDto,
    @Request() req: AuthRequest,
  ) {
    return this.siembrasService.addAplicacion(
      siembraId,
      dto,
      req.user.id,
      req.organizacionId,
    );
  }
}
