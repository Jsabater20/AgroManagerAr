import { Module } from '@nestjs/common';
import { CultivosService } from './cultivos.service';
import { CultivosController } from './cultivos.controller';

@Module({
  providers: [CultivosService],
  controllers: [CultivosController],
})
export class CultivosModule {}
