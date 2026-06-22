import { Controller, Get, Param } from '@nestjs/common';
import { UbicacionService, type Provincia, type Localidad } from './ubicacion.service';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Get('provincias')
  async getProvincias(): Promise<{ provincias: Provincia[] }> {
    const provincias = await this.ubicacionService.getProvincias();
    return { provincias };
  }

  @Get('localidades/:provinciaId')
  async getLocalidades(@Param('provinciaId') provinciaId: string): Promise<{ localidades: Localidad[] }> {
    const localidades = await this.ubicacionService.getLocalidades(provinciaId);
    return { localidades };
  }
}
