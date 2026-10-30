import { Controller, Get, Param, ParseIntPipe, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DesgloseProductivoQueryDto } from './dto/reporte-periodico-query.dto';
import { ReportesEmpresaService } from './reportes-empresa.service';

interface AuthRequest {
  user: { id: number };
}

@Controller('empresas/:empresaId/reportes')
@UseGuards(JwtAuthGuard)
export class ReportesEmpresaController {
  constructor(private readonly reportesEmpresaService: ReportesEmpresaService) {}

  @Get('consolidado')
  obtenerConsolidado(
    @Request() req: AuthRequest,
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Query() query: DesgloseProductivoQueryDto,
  ) {
    return this.reportesEmpresaService.obtenerConsolidado(
      req.user.id,
      empresaId,
      query.tipo ?? 'MENSUAL',
      query.fechaReferencia ? new Date(query.fechaReferencia) : undefined,
    );
  }
}
