import { Body, Controller, Post } from '@nestjs/common';
import { DesuscribirNovedadesDto } from './dto/novedades.dto';
import { NovedadesService } from './novedades.service';

@Controller('novedades-publicas')
export class NovedadesPublicController {
  constructor(private readonly novedadesService: NovedadesService) {}

  @Post('desuscribir')
  desuscribir(@Body() dto: DesuscribirNovedadesDto) {
    return this.novedadesService.desuscribirDeNovedades(dto.usuarioId, dto.firma);
  }
}
