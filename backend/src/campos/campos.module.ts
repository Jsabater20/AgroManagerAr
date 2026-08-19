import { Module } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CamposController } from './campos.controller';
import { PlanModule } from '../plan/plan.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [PlanModule, OrganizationsModule],
  providers: [CamposService],
  controllers: [CamposController],
})
export class CamposModule {}
