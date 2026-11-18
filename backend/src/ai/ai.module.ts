import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanModule } from '../plan/plan.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { AlertasModule } from '../alertas/alertas.module';
import { ClimaModule } from '../clima/clima.module';
import { AgroBotConsultasService } from './agrobot-consultas.service';
import { AgroBotAccionesService } from './agrobot-acciones.service';
import { CamposModule } from '../campos/campos.module';
import { ActividadesModule } from '../actividades/actividades.module';
import { TareasModule } from '../tareas/tareas.module';
import { AgroBotLimitesService } from './agrobot-limites.service';

@Module({
  imports: [PrismaModule, PlanModule, OrganizationsModule, AlertasModule, ClimaModule, CamposModule, ActividadesModule, TareasModule],
  controllers: [AiController],
  providers: [AiService, AgroBotConsultasService, AgroBotAccionesService, AgroBotLimitesService],
})
export class AiModule {}
