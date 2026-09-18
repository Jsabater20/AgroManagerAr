import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { PlanModule } from '../plan/plan.module';
import { AvicolaController } from './avicola.controller';
import { AvicolaService } from './avicola.service';

@Module({ imports: [OrganizationsModule, PlanModule], controllers: [AvicolaController], providers: [AvicolaService] })
export class AvicolaModule {}
