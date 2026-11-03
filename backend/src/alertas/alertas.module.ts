import { Module } from '@nestjs/common';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';
import { MailerModule } from '../mailer/mailer.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { PlanModule } from '../plan/plan.module';
import { ActividadesModule } from '../actividades/actividades.module';
import { ClimaModule } from '../clima/clima.module';
import { AlertasController } from './alertas.controller';
import { AlertasService } from './alertas.service';

@Module({
  imports: [OrganizationsModule, NotificacionesModule, PlanModule, MailerModule, ActividadesModule, ClimaModule],
  controllers: [AlertasController],
  providers: [AlertasService],
  exports: [AlertasService],
})
export class AlertasModule {}
