import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActividadesController } from './actividades.controller';
import { ActividadesService } from './actividades.service';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService, PrismaService],
  exports: [ActividadesService],
})
export class ActividadesModule {}
