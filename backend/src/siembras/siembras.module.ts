import { Module } from '@nestjs/common';
import { SiembrasService } from './siembras.service';
import { SiembrasController } from './siembras.controller';

@Module({
  providers: [SiembrasService],
  controllers: [SiembrasController],
})
export class SiembrasModule {}
