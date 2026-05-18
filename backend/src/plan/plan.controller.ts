import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Request,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthRequest {
  user: { id: number; email: string; nombre: string; rol: string };
  rawBody: Buffer;
}

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getPlan(@Request() req: AuthRequest) {
    return this.planService.getUsuarioPlan(req.user.id);
  }

  // ─── MercadoPago ─────────────────────────────────────────────────────────

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

  @Post('webhook')
  webhook(@Body() body: Record<string, unknown>) {
    return this.planService.procesarWebhook(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('setup')
  setup() {
    return this.planService.crearPlanMP();
  }

  // ─── Stripe ──────────────────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard)
  @Post('stripe/checkout')
  stripeCheckout(@Request() req: AuthRequest) {
    return this.planService.crearCheckoutStripe(req.user.id, req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('stripe/cancelar')
  stripeCancelar(@Request() req: AuthRequest) {
    return this.planService.cancelarSuscripcionStripe(req.user.id);
  }

  // Webhook público — Stripe envía body crudo para verificar firma
  @Post('stripe/webhook')
  stripeWebhook(
    @Headers('stripe-signature') sig: string,
    @Req() req: AuthRequest,
  ) {
    return this.planService.procesarWebhookStripe(req.rawBody, sig);
  }
}
