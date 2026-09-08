import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { FrutihorticulturaController } from './frutihorticultura.controller';
import { FrutihorticulturaService } from './frutihorticultura.service';

@Module({
  imports: [OrganizationsModule],
  controllers: [FrutihorticulturaController],
  providers: [FrutihorticulturaService],
})
export class FrutihorticulturaModule {}
