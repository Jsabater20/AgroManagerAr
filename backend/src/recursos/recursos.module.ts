import { Module } from '@nestjs/common';
import { RecursosController } from './recursos.controller';
import { RecursosService } from './recursos.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RecursosController],
  providers: [RecursosService, PrismaService],
})
export class RecursosModule {}
