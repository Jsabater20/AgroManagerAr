import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { EvidenciasController } from './evidencias.controller';
import { EvidenciasService } from './evidencias.service';
import { StorageModule } from '../storage/storage.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [OrganizationsModule, StorageModule, PlanModule],
  controllers: [EvidenciasController],
  providers: [EvidenciasService],
})
export class EvidenciasModule {}
