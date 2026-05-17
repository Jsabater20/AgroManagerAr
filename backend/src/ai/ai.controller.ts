import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { AiService } from './ai.service';
import { AiChatDto } from './dto/ai.dto';
import type { Request } from 'express';

interface AuthRequest extends Request {
  user: { userId: number };
}

@UseGuards(JwtAuthGuard, DemoGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Req() req: AuthRequest, @Body() dto: AiChatDto) {
    const text = await this.aiService.chat(req.user.userId, dto.history, dto.message);
    return { text };
  }

  @Get('insights')
  async insights(@Req() req: AuthRequest) {
    const items = await this.aiService.insights(req.user.userId);
    return { insights: items };
  }
}
