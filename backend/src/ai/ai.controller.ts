import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { AiService } from './ai.service';
import { PlanService } from '../plan/plan.service';
import { AiChatDto } from './dto/ai.dto';
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
    };
  }

  @Get('insights')
  async insights(@Req() req: AuthRequest) {
    await this.planService.checkProAccess(req.organizacionId, 'Análisis IA');
    const items = await this.aiService.insights(req.user.id, req.organizacionId);
    return { insights: items };
  }
}
