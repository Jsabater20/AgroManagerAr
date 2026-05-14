import { Module } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CamposController } from './campos.controller';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [PlanModule],
  providers: [CamposService],
  controllers: [CamposController],
})
export class CamposModule {}
