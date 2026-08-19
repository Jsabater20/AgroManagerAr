import { Module } from '@nestjs/common';
import { CampaniasController } from './campanias.controller';
import { CampaniasService } from './campanias.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [PrismaModule, PlanModule],
  controllers: [CampaniasController],
  providers: [CampaniasService],
})
export class CampaniasModule {}
