import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PromocionesController } from './promociones.controller';
import { PromocionesPublicController } from './promociones-public.controller';
import { PromocionesService } from './promociones.service';

@Module({
  imports: [PrismaModule],
  controllers: [PromocionesController, PromocionesPublicController],
  providers: [PromocionesService],
  exports: [PromocionesService],
})
export class PromocionesModule {}
