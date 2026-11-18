import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { AiService } from './ai.service';
import { PlanService } from '../plan/plan.service';
import { AiChatDto } from './dto/ai.dto';
import { ConfirmarCrearCampoAgroBotDto } from './dto/confirmar-crear-campo.dto';
import { ConfirmarCrearTrabajoAgroBotDto } from './dto/confirmar-crear-trabajo.dto';
import { ConfirmarCompletarTareaAgroBotDto } from './dto/confirmar-completar-tarea.dto';
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

  @Post('acciones/crear-campo')
  @Auditar('crear_campo_desde_agrobot', 'Campo')
  async confirmarCreacionCampo(
    @Req() req: AuthRequest,
    @Body() dto: ConfirmarCrearCampoAgroBotDto,
  ) {
    await this.planService.checkProAccess(req.organizacionId, 'AgroBot IA');
    const campo = await this.aiService.confirmarCreacionCampo(
      req.user.id,
      req.organizacionId,
      dto,
    );
    return {
      id: campo.id,
      campo,
      referencia: {
        etiqueta: 'Ver campos',
        href: `/org/${req.organizacionId}/campos`,
      },
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
