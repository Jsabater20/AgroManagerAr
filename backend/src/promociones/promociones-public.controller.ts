import { Controller, Get } from '@nestjs/common';
import { PromocionesService } from './promociones.service';

@Controller('promociones')
export class PromocionesPublicController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Get('lanzamiento')
  obtenerLanzamiento() {
    return this.promocionesService.obtenerLanzamientoPublico();
  }
}
