import { Module } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CamposController } from './campos.controller';

@Module({
  providers: [CamposService],
  controllers: [CamposController],
})
export class CamposModule {}
