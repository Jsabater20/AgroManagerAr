import { Module } from '@nestjs/common';
import { AlertasModule } from '../alertas/alertas.module';
import { EmpresasModule } from '../empresas/empresas.module';
import { MailerModule } from '../mailer/mailer.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { PlanModule } from '../plan/plan.module';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { ReportesAutomaticosService } from './reportes-automaticos.service';
import { ReportesEmpresaController } from './reportes-empresa.controller';
import { ReportesEmpresaService } from './reportes-empresa.service';

@Module({
  imports: [AlertasModule, EmpresasModule, MailerModule, OrganizationsModule, PlanModule],
  controllers: [ReportesController, ReportesEmpresaController],
  providers: [ReportesService, ReportesAutomaticosService, ReportesEmpresaService],
  exports: [ReportesService],
})
export class ReportesModule {}
