import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { PlanModule } from '../plan/plan.module';
import { CalculosController } from './calculos.controller';
import { CalculosService } from './calculos.service';

@Module({
  imports: [OrganizationsModule, PlanModule],
  controllers: [CalculosController],
  providers: [CalculosService],
})
export class CalculosModule {}
