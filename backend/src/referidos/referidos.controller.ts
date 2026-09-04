import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReferidosService } from './referidos.service';

@UseGuards(JwtAuthGuard)
@Controller('referidos')
export class ReferidosController {
  constructor(private referidosService: ReferidosService) {}

  @Get('resumen')
  getResumen(@Request() req: { user: { id: number } }) {
    return this.referidosService.getResumen(req.user.id);
  }
}
