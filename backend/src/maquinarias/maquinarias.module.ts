import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MaquinariasController } from './maquinarias.controller';
import { MaquinariasService } from './maquinarias.service';

@Module({
  imports: [PrismaModule],
  controllers: [MaquinariasController],
  providers: [MaquinariasService],
})
export class MaquinariasModule {}
