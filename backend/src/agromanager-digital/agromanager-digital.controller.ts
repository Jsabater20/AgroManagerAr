import { Body, Controller, Get, Post, Query, Request, UseGuards, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CrearSolicitudDigitalDto, ActualizarSolicitudDigitalDto, RegistrarEventoDigitalDto } from './dto/solicitud-digital.dto';
import { AgroManagerDigitalService } from './agromanager-digital.service';
import { Throttle } from '@nestjs/throttler';

@Controller('agromanager-digital')
export class AgroManagerDigitalController {
  constructor(private readonly service: AgroManagerDigitalService) {}

  @Post('solicitudes')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  crear(@Body() dto: CrearSolicitudDigitalDto) { return this.service.crear(dto); }

  @Post('eventos')
  @Throttle({ default: { limit: 60, ttl: 60_000 } })
  registrarEvento(@Body() dto: RegistrarEventoDigitalDto) { return this.service.registrarEvento(dto); }

  @UseGuards(JwtAuthGuard)
  @Get('admin/analitica') analitica(@Request() req: { user: { id: number } }) {
    return this.service.analitica(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/solicitudes/exportar') exportar(@Request() req: { user: { id: number } }, @Query('buscar') buscar?: string, @Query('estado') estado?: string) {
    return this.service.exportar(req.user.id, buscar, estado);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/solicitudes') listar(@Request() req: { user: { id: number } }, @Query('buscar') buscar?: string, @Query('estado') estado?: string) {
    return this.service.listar(req.user.id, buscar, estado);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/solicitudes/:id') actualizar(@Request() req: { user: { id: number } }, @Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarSolicitudDigitalDto) {
    return this.service.actualizar(req.user.id, id, dto);
  }
}
