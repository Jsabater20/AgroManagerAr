import { Module } from '@nestjs/common';
import { SiembrasService } from './siembras.service';
import { SiembrasController } from './siembras.controller';
import { PlanModule } from '../plan/plan.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [PlanModule, OrganizationsModule],
  providers: [SiembrasService],
  controllers: [SiembrasController],
})
export class SiembrasModule {}
