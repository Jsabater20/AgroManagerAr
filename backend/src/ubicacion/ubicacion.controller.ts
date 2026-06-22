import { Controller, Get, Param } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get('provincias')
  async getProvincias() {
    const provincias = await this.ubicacionService.getProvincias();
    return { provincias };
  }

  @Get('localidades/:provinciaId')
  async getLocalidades(@Param('provinciaId') provinciaId: string) {
    const localidades = await this.ubicacionService.getLocalidades(provinciaId);
    return { localidades };
  }
}
