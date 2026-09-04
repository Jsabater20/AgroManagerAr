import { Module } from '@nestjs/common';
import { CultivosService } from './cultivos.service';
import { CultivosController } from './cultivos.controller';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [OrganizationsModule],
  providers: [CultivosService],
  controllers: [CultivosController],
})
export class CultivosModule {}
