import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReferidosController } from './referidos.controller';
import { ReferidosService } from './referidos.service';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [PrismaModule, NotificacionesModule],
  controllers: [ReferidosController],
  providers: [ReferidosService],
  exports: [ReferidosService],
})
export class ReferidosModule {}
