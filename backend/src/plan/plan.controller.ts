import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthRequest {
  user: { id: number; email: string; nombre: string; rol: string };
}

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getPlan(@Request() req: AuthRequest) {
    return this.planService.getUsuarioPlan(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  checkout(@Request() req: AuthRequest) {
    return this.planService.crearCheckout(req.user.id, req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('cancelar')
  cancelar(@Request() req: AuthRequest) {
    return this.planService.cancelarSuscripcion(req.user.id);
  }

  // Endpoint público para webhook de MercadoPago
  @Post('webhook')
  webhook(@Body() body: Record<string, unknown>) {
    return this.planService.procesarWebhook(body);
  }

  // Admin: crear plan en MP una sola vez
  @UseGuards(JwtAuthGuard)
  @Post('setup')
  setup() {
    return this.planService.crearPlanMP();
  }
}
