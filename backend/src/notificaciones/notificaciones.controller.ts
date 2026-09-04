import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DesactivarDispositivoPushDto } from './dto/desactivar-dispositivo-push.dto';
import { RegistrarDispositivoPushDto } from './dto/registrar-dispositivo-push.dto';
import { NotificacionesService } from './notificaciones.service';

interface AuthRequest extends Request {
  user?: { id: number };
}

@Controller('notificaciones')
@UseGuards(JwtAuthGuard)
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post('dispositivos')
  registrarDispositivo(
    @Body() dto: RegistrarDispositivoPushDto,
    @Request() request: AuthRequest,
  ) {
    return this.notificacionesService.registrarDispositivo(request.user!.id, dto);
  }

  @Get()
  listar(@Request() request: AuthRequest) {
    return this.notificacionesService.listar(request.user!.id);
  }

  @Patch(':id/leida')
  marcarLeida(@Param('id') id: string, @Request() request: AuthRequest) {
    return this.notificacionesService.marcarLeida(request.user!.id, id);
  }

  @Delete('dispositivos')
  async desactivarDispositivo(
    @Body() dto: DesactivarDispositivoPushDto,
    @Request() request: AuthRequest,
  ) {
    await this.notificacionesService.desactivarDispositivo(
      request.user!.id,
      dto.expoPushToken,
    );
  }
}
