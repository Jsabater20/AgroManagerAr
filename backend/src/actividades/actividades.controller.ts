import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsOwnerGuard } from '../organizations/guards/is-owner.guard';
import { ActividadesService } from './actividades.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { CambiarEstadoActividadDto } from './dto/cambiar-estado-actividad.dto';
import { ReasignarActividadDto } from './dto/reasignar-actividad.dto';
import { PrologarActividadDto } from './dto/prolongar-actividad.dto';
import { AgregarObservacionDto } from './dto/agregar-observacion.dto';
import { EstadoActividad } from '@prisma/client';

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

@Controller('organizaciones')
@UseGuards(JwtAuthGuard)
export class ActividadesController {
  constructor(private actividadesService: ActividadesService) {}

  // ─── CREAR ACTIVIDAD ──────────────────────────────────────────────────

  @Post(':orgId/actividades')
  @UseGuards(IsOwnerGuard)
  async crear(
    @Param('orgId') orgId: string,
    @Body() dto: CreateActividadDto,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.crear(orgIdNum, dto, userId);
  }

  // ─── LISTAR ACTIVIDADES ───────────────────────────────────────────────

  @Get(':orgId/actividades')
  async listar(
    @Param('orgId') orgId: string,
    @Request() req: AuthRequest,
    @Query('estado') estado?: EstadoActividad,
    @Query('prioridad') prioridad?: string,
    @Query('activo') activo?: string,
    @Query('usuarioOrganizacionId') usuarioOrgId?: string,
  ) {
    const orgIdNum = parseInt(orgId);
    const userId = req.user?.id || 0;

    const filtros: any = {};
    if (estado) filtros.estado = estado;
    if (prioridad) filtros.prioridad = prioridad;
    if (activo !== undefined) filtros.activo = activo === 'true';
    if (usuarioOrgId) filtros.usuarioOrganizacionId = parseInt(usuarioOrgId);

    return await this.actividadesService.listar(orgIdNum, userId, filtros);
  }

  // ─── OBTENER UNA ACTIVIDAD ────────────────────────────────────────────

  @Get(':orgId/actividades/:actividadId')
  async obtener(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.obtener(
      orgIdNum,
      actividadIdNum,
      userId,
    );
  }

  // ─── ACTUALIZAR ACTIVIDAD ─────────────────────────────────────────────

  @Patch(':orgId/actividades/:actividadId')
  @UseGuards(IsOwnerGuard)
  async actualizar(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Body() dto: UpdateActividadDto,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.actualizar(
      orgIdNum,
      actividadIdNum,
      dto,
      userId,
    );
  }

  // ─── REASIGNAR ACTIVIDAD ──────────────────────────────────────────────

  @Patch(':orgId/actividades/:actividadId/reasignar')
  @UseGuards(IsOwnerGuard)
  async reasignar(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Body() dto: ReasignarActividadDto,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.reasignar(
      orgIdNum,
      actividadIdNum,
      dto,
      userId,
    );
  }

  // ─── PROLONGAR FECHA ──────────────────────────────────────────────────

  @Patch(':orgId/actividades/:actividadId/prolongar')
  @UseGuards(IsOwnerGuard)
  async prolongar(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Body() dto: PrologarActividadDto,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.prolongar(
      orgIdNum,
      actividadIdNum,
      dto,
      userId,
    );
  }

  // ─── CAMBIAR ESTADO ───────────────────────────────────────────────────

  @Patch(':orgId/actividades/:actividadId/estado')
  async cambiarEstado(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Body() dto: CambiarEstadoActividadDto,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.cambiarEstado(
      orgIdNum,
      actividadIdNum,
      dto,
      userId,
    );
  }

  // ─── ARCHIVAR ─────────────────────────────────────────────────────────

  @Patch(':orgId/actividades/:actividadId/archivar')
  @UseGuards(IsOwnerGuard)
  async archivar(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.archivar(
      orgIdNum,
      actividadIdNum,
      userId,
    );
  }

  // ─── AGREGAR OBSERVACIÓN ──────────────────────────────────────────────

  @Post(':orgId/actividades/:actividadId/observaciones')
  async agregarObservacion(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Body() dto: AgregarObservacionDto,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.agregarObservacion(
      orgIdNum,
      actividadIdNum,
      dto,
      userId,
    );
  }

  // ─── OBTENER OBSERVACIONES ────────────────────────────────────────────

  @Get(':orgId/actividades/:actividadId/observaciones')
  async obtenerObservaciones(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.obtenerObservaciones(
      orgIdNum,
      actividadIdNum,
      userId,
    );
  }

  // ─── OBTENER HISTORIAL ────────────────────────────────────────────────

  @Get(':orgId/actividades/:actividadId/historial')
  @UseGuards(IsOwnerGuard)
  async obtenerHistorial(
    @Param('orgId') orgId: string,
    @Param('actividadId') actividadId: string,
    @Request() req: AuthRequest,
  ) {
    const orgIdNum = parseInt(orgId);
    const actividadIdNum = parseInt(actividadId);
    const userId = req.user?.id || 0;

    return await this.actividadesService.obtenerHistorial(
      orgIdNum,
      actividadIdNum,
      userId,
    );
  }
}
