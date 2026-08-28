import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { EvidenciasController } from './evidencias.controller';
import { EvidenciasService } from './evidencias.service';
import { R2StorageService } from './r2-storage.service';

@Module({
  imports: [OrganizationsModule],
  controllers: [EvidenciasController],
  providers: [EvidenciasService, R2StorageService],
})
export class EvidenciasModule {}
