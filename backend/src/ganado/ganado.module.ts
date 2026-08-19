import { Module } from '@nestjs/common';
import { GanadoController } from './ganado.controller';
import { GanadoService } from './ganado.service';
import { PlanModule } from '../plan/plan.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [PlanModule, OrganizationsModule],
  controllers: [GanadoController],
  providers: [GanadoService],
})
export class GanadoModule {}
