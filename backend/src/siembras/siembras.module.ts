import { Module } from '@nestjs/common';
import { SiembrasService } from './siembras.service';
import { SiembrasController } from './siembras.controller';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [PlanModule],
  providers: [SiembrasService],
  controllers: [SiembrasController],
})
export class SiembrasModule {}
