import {
  Controller,
  Get,
  Post,
  Body,
  Query,
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

  // Público: información de precios para la página /precios
  @Get('precios')
  getPrecios() {
    return this.planService.getPrecios();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getPlan(
    @Request() req: AuthRequest,
    @Query('organizacionId') organizacionId: string,
  ) {
    return this.planService.getPlanOrganizacion(
      req.user.id,
      parseInt(organizacionId, 10),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  checkout(
    @Request() req: AuthRequest,
    @Body('tipo') tipo: 'mensual' | 'anual' = 'mensual',
    @Query('organizacionId') organizacionId: string,
  ) {
    return this.planService.crearCheckout(
      req.user.id,
      req.user.email,
      parseInt(organizacionId, 10),
      tipo,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('cancelar')
  cancelar(
    @Request() req: AuthRequest,
    @Query('organizacionId') organizacionId: string,
  ) {
    return this.planService.cancelarSuscripcion(
      req.user.id,
      parseInt(organizacionId, 10),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('verificar')
  verificar(
    @Request() req: AuthRequest,
    @Body('preapprovalId') preapprovalId: string,
    @Query('organizacionId') organizacionId: string,
  ) {
    return this.planService.verificarYActivar(
      req.user.id,
      parseInt(organizacionId, 10),
      preapprovalId,
    );
  }

  // Webhook público para MercadoPago
  @Post('webhook')
  webhook(@Body() body: Record<string, unknown>) {
    return this.planService.procesarWebhook(body);
  }
}
