import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoGuard } from '../auth/demo.guard';
import { OrganizationGuard } from '../organizations/organization.guard';
import { AnaliticaService } from './analitica.service';

interface AuthRequest {
  user: { id: number };
  organizacionId: number;
}

@UseGuards(JwtAuthGuard, DemoGuard, OrganizationGuard)
@Controller('analitica')
export class AnaliticaController {
  constructor(private analiticaService: AnaliticaService) {}

  @Get('rentabilidad')
  getRentabilidad(@Request() req: AuthRequest) {
    return this.analiticaService.getRentabilidad(
      req.user.id,
      req.organizacionId,
    );
  }
}
