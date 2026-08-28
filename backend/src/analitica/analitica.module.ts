import { Module } from '@nestjs/common';
import { AnaliticaController } from './analitica.controller';
import { AnaliticaService } from './analitica.service';
import { OrganizationsModule } from '../organizations/organizations.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [OrganizationsModule, PlanModule],
  controllers: [AnaliticaController],
  providers: [AnaliticaService],
})
export class AnaliticaModule {}
