import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  controllers: [DemoController],
  providers: [DemoService],
  exports: [DemoService],
})
export class DemoModule {}
