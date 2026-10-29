import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { AlertasService } from './alertas.service';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@Controller('alertas')
@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
export class AlertasController {
  constructor(private readonly alertasService: AlertasService) {}

  @Get()
  listar(@Request() req: AuthRequest) {
    return this.alertasService.obtenerParaOrganizacion(
      req.user.id,
      req.organizacionId,
    );
  }
}
