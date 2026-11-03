import { Module } from '@nestjs/common';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';
import { MailerModule } from '../mailer/mailer.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NovedadesController } from './novedades.controller';
import { NovedadesService } from './novedades.service';

@Module({
  imports: [PrismaModule, NotificacionesModule, MailerModule],
  controllers: [NovedadesController],
  providers: [NovedadesService],
})
export class NovedadesModule {}
