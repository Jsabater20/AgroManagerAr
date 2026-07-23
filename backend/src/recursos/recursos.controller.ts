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
import { RecursoResponse } from './dto/recurso-response.dto';

@Controller('recursos')
@UseGuards(JwtAuthGuard)
export class RecursosController {
  constructor(private recursosService: RecursosService) {}

  @Get('por-tipo')
  async obtenerPorTipo(
    @Query('tipo')
    tipo: 'CAMPO' | 'TAREA' | 'CULTIVO' | 'MAQUINARIA' | 'GANADO',
    @Request() req: any,
  ): Promise<RecursoResponse[]> {
    if (
      !['CAMPO', 'TAREA', 'CULTIVO', 'MAQUINARIA', 'GANADO'].includes(tipo)
    ) {
      throw new BadRequestException(`Tipo de recurso inválido: ${tipo}`);
    }

    const organizacionId = req.user.organizacionId;
    return this.recursosService.obtenerPorTipo(tipo, organizacionId);
  }
}
