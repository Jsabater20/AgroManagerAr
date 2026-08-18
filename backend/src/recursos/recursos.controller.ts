import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { RecursoResponse } from './dto/recurso-response.dto';

@Controller('recursos')
@UseGuards(JwtAuthGuard, OrganizationGuard)
export class RecursosController {
  constructor(private recursosService: RecursosService) {}

  @Get('por-tipo')
  async obtenerPorTipo(
    @Query('tipo')
    tipo: 'CAMPO' | 'LOTE' | 'SIEMBRA' | 'ANIMAL' | 'GANADO' | 'TAREA' | 'MAQUINARIA' | 'CAMPANIA' | 'CULTIVO',
    @Request() req: any,
  ): Promise<RecursoResponse[]> {
    if (
      !['CAMPO', 'LOTE', 'SIEMBRA', 'ANIMAL', 'GANADO', 'TAREA', 'MAQUINARIA', 'CAMPANIA', 'CULTIVO'].includes(tipo)
    ) {
      throw new BadRequestException(`Tipo de recurso inválido: ${tipo}`);
    }

    const organizacionId = req.organizacionId;
    return this.recursosService.obtenerPorTipo(tipo, organizacionId);
  }
}
