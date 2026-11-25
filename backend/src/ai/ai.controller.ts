import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { AiService } from './ai.service';
import { PlanService } from '../plan/plan.service';
import { AiChatDto } from './dto/ai.dto';
import { ConfirmarCrearTrabajoAgroBotDto } from './dto/confirmar-crear-trabajo.dto';
import { ConfirmarCompletarTareaAgroBotDto } from './dto/confirmar-completar-tarea.dto';
import { ConfirmarCrearMaquinariaAgroBotDto } from './dto/confirmar-crear-maquinaria.dto';
import { ConfirmarCrearSiembraAgroBotDto } from './dto/confirmar-crear-siembra.dto';
import { Auditar } from '../audit/decorators/audit.decorator';
import type { Request } from 'express';

interface AuthRequest extends Request {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly planService: PlanService,
  ) {}

  @Post('chat')
  async chat(@Req() req: AuthRequest, @Body() dto: AiChatDto) {
    await this.planService.checkProAccess(req.organizacionId, 'AgroBot IA');
    const respuesta = await this.aiService.chat(
      req.user.id,
      req.organizacionId,
      dto.history,
      dto.message,
    );
    return {
      text: respuesta.texto,
      indicadores: respuesta.indicadores ?? [],
      referencias: respuesta.referencias ?? [],
      basadaEnDatos: respuesta.basadaEnDatos,
      accion: respuesta.accion ?? null,
    };
  }

  @Post('acciones/crear-trabajo')
  async confirmarCreacionTrabajo(
    @Req() req: AuthRequest,
    @Body() dto: ConfirmarCrearTrabajoAgroBotDto,
  ) {
    await this.planService.checkProAccess(req.organizacionId, 'AgroBot IA');
    const trabajo = await this.aiService.confirmarCreacionTrabajo(
      req.user.id,
      req.organizacionId,
      dto,
    );
    return {
      id: trabajo.id,
      trabajo,
      referencia: { etiqueta: 'Ver trabajos', href: `/org/${req.organizacionId}/tareas` },
    };
  }

  @Post('acciones/crear-maquinaria')
  @Auditar('crear_maquinaria_desde_agrobot', 'Maquinaria')
  async confirmarCreacionMaquinaria(
    @Req() req: AuthRequest,
    @Body() dto: ConfirmarCrearMaquinariaAgroBotDto,
  ) {
    await this.planService.checkProAccess(req.organizacionId, 'AgroBot IA');
    await this.planService.checkMaquinariasLimit(req.organizacionId);
    const maquinaria = await this.aiService.confirmarCreacionMaquinaria(
      req.user.id,
      req.organizacionId,
      dto,
    );
    return {
      id: maquinaria.id,
      maquinaria,
      referencia: { etiqueta: 'Ver maquinarias', href: `/org/${req.organizacionId}/maquinarias` },
    };
  }

  @Post('acciones/crear-siembra')
  @Auditar('crear_siembra_desde_agrobot', 'Siembra')
  async confirmarCreacionSiembra(
    @Req() req: AuthRequest,
    @Body() dto: ConfirmarCrearSiembraAgroBotDto,
  ) {
    await this.planService.checkProAccess(req.organizacionId, 'AgroBot IA');
    const siembra = await this.aiService.confirmarCreacionSiembra(
      req.user.id,
      req.organizacionId,
      dto,
    );
    return {
      id: siembra.id,
      siembra,
      referencia: { etiqueta: 'Ver siembras', href: `/org/${req.organizacionId}/siembras` },
    };
  }

  @Post('acciones/completar-tarea')
  @Auditar('completar_tarea_desde_agrobot', 'Tarea')
  async confirmarCompletarTarea(
    @Req() req: AuthRequest,
    @Body() dto: ConfirmarCompletarTareaAgroBotDto,
  ) {
    await this.planService.checkProAccess(req.organizacionId, 'AgroBot IA');
    const tarea = await this.aiService.confirmarCompletarTarea(
      req.user.id,
      req.organizacionId,
      dto,
    );
    return {
      id: tarea.id,
      tarea,
      referencia: { etiqueta: 'Ver tareas', href: `/org/${req.organizacionId}/tareas` },
    };
  }

  @Get('insights')
  async insights(@Req() req: AuthRequest) {
    await this.planService.checkProAccess(req.organizacionId, 'Análisis IA');
    const items = await this.aiService.insights(req.user.id, req.organizacionId);
    return { insights: items };
  }
}
