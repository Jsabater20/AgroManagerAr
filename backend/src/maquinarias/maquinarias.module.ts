import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanModule } from '../plan/plan.module';
import { MaquinariasController } from './maquinarias.controller';
import { MaquinariasService } from './maquinarias.service';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [PrismaModule, PlanModule, OrganizationsModule],
  controllers: [MaquinariasController],
  providers: [MaquinariasService],
})
export class MaquinariasModule {}
