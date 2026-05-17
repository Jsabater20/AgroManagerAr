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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { CampaniasService } from './campanias.service';
import { CreateCampaniaDto, UpdateCampaniaDto } from './dto/campanias.dto';

type AuthRequest = { user: { id: number } };

@UseGuards(JwtAuthGuard, DemoGuard)
@Controller('campanias')
export class CampaniasController {
  constructor(private campaniasService: CampaniasService) {}

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.campaniasService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.campaniasService.findOne(id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateCampaniaDto, @Request() req: AuthRequest) {
    return this.campaniasService.create(req.user.id, dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCampaniaDto,
    @Request() req: AuthRequest,
  ) {
    return this.campaniasService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.campaniasService.remove(id, req.user.id);
  }

  @Patch(':id/siembras')
  asignarSiembras(
    @Param('id', ParseIntPipe) id: number,
    @Body('siembraIds') siembraIds: number[],
    @Request() req: AuthRequest,
  ) {
    return this.campaniasService.asignarSiembras(id, req.user.id, siembraIds);
  }
}
