import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanModule } from '../plan/plan.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { AlertasModule } from '../alertas/alertas.module';
import { AgroBotConsultasService } from './agrobot-consultas.service';

@Module({
  imports: [PrismaModule, PlanModule, OrganizationsModule, AlertasModule],
  controllers: [AiController],
  providers: [AiService, AgroBotConsultasService],
})
export class AiModule {}
