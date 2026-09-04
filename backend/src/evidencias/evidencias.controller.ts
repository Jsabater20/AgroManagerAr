import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TipoRecursoEvidencia } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EvidenciasService } from './evidencias.service';
import { PrepararEvidenciaDto } from './dto/preparar-evidencia.dto';

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

@Controller('organizaciones/:orgId/evidencias')
@UseGuards(JwtAuthGuard)
export class EvidenciasController {
  constructor(private readonly evidenciasService: EvidenciasService) {}

  @Post('subidas')
  prepararCarga(
    @Param('orgId') orgId: string,
    @Body() dto: PrepararEvidenciaDto,
    @Request() req: AuthRequest,
  ) {
    return this.evidenciasService.prepararCarga(
      this.parsearId(orgId),
      req.user?.id ?? 0,
      dto,
    );
  }

  @Post(':evidenciaId/confirmar')
  confirmar(
    @Param('orgId') orgId: string,
    @Param('evidenciaId') evidenciaId: string,
    @Request() req: AuthRequest,
  ) {
    return this.evidenciasService.confirmar(
      this.parsearId(orgId),
      evidenciaId,
      req.user?.id ?? 0,
    );
  }

  @Get()
  listar(
    @Param('orgId') orgId: string,
    @Query('tipoRecurso') tipoRecurso: TipoRecursoEvidencia,
    @Query('recursoId') recursoId: string,
    @Request() req: AuthRequest,
  ) {
    if (!Object.values(TipoRecursoEvidencia).includes(tipoRecurso)) {
      throw new BadRequestException('Tipo de recurso inválido');
    }

    return this.evidenciasService.listar(
      this.parsearId(orgId),
      req.user?.id ?? 0,
      tipoRecurso,
      this.parsearId(recursoId),
    );
  }

  @Get(':evidenciaId/archivos/:archivoId/url')
  obtenerUrlArchivo(
    @Param('orgId') orgId: string,
    @Param('evidenciaId') evidenciaId: string,
    @Param('archivoId') archivoId: string,
    @Request() req: AuthRequest,
  ) {
    return this.evidenciasService.obtenerUrlArchivo(
      this.parsearId(orgId),
      evidenciaId,
      archivoId,
      req.user?.id ?? 0,
    );
  }

  @Delete(':evidenciaId')
  eliminar(
    @Param('orgId') orgId: string,
    @Param('evidenciaId') evidenciaId: string,
    @Request() req: AuthRequest,
  ) {
    return this.evidenciasService.eliminar(
      this.parsearId(orgId),
      evidenciaId,
      req.user?.id ?? 0,
    );
  }

  private parsearId(valor: string): number {
    const id = Number(valor);
    if (!Number.isInteger(id) || id < 1) {
      throw new BadRequestException('Identificador inválido');
    }
    return id;
  }
}
