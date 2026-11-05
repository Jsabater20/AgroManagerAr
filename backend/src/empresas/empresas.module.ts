import { Module } from '@nestjs/common';
import { EmpresaAccessService } from './empresa-access.service';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { AlertasModule } from '../alertas/alertas.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [AlertasModule, PlanModule],
  controllers: [EmpresasController],
  providers: [EmpresasService, EmpresaAccessService],
  exports: [EmpresaAccessService],
})
export class EmpresasModule {}
