import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { PlanModule } from '../plan/plan.module';
import { TamboController } from './tambo.controller';
import { TamboService } from './tambo.service';

@Module({
  imports: [OrganizationsModule, PlanModule],
  controllers: [TamboController],
  providers: [TamboService],
})
export class TamboModule {}
