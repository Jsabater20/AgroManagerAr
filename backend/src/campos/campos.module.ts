import { Module } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CamposController } from './campos.controller';
import { PlanModule } from '../plan/plan.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { ReferidosModule } from '../referidos/referidos.module';

@Module({
  imports: [PlanModule, OrganizationsModule, ReferidosModule],
  providers: [CamposService],
  controllers: [CamposController],
})
export class CamposModule {}
