import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { AiService } from './ai.service';
import { PlanService } from '../plan/plan.service';
import { AiChatDto } from './dto/ai.dto';
import type { Request } from 'express';

interface AuthRequest extends Request {
  user: { id: number };
}

@UseGuards(JwtAuthGuard, DemoGuard)
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly planService: PlanService,
  ) {}

  @Post('chat')
  async chat(@Req() req: AuthRequest, @Body() dto: AiChatDto) {
    await this.planService.checkProAccess(req.user.id, 'AgroBot IA');
    const text = await this.aiService.chat(
      req.user.id,
      dto.history,
      dto.message,
    );
    return { text };
  }

  @Get('insights')
  async insights(@Req() req: AuthRequest) {
    await this.planService.checkProAccess(req.user.id, 'Análisis IA');
    const items = await this.aiService.insights(req.user.id);
    return { insights: items };
  }
}
