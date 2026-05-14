import { Module } from '@nestjs/common';
import { GanadoController } from './ganado.controller';
import { GanadoService } from './ganado.service';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [PlanModule],
  controllers: [GanadoController],
  providers: [GanadoService],
})
export class GanadoModule {}
