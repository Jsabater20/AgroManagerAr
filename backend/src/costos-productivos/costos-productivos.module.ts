import { Module } from '@nestjs/common';
import { PlanModule } from '../plan/plan.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CostosProductivosController } from './costos-productivos.controller';
import { CostosProductivosService } from './costos-productivos.service';

@Module({
  imports: [PrismaModule, PlanModule],
  controllers: [CostosProductivosController],
  providers: [CostosProductivosService],
})
export class CostosProductivosModule {}
