import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { ClimaController } from './clima.controller';
import { ClimaService } from './clima.service';

@Module({
  imports: [OrganizationsModule],
  controllers: [ClimaController],
  providers: [ClimaService],
  exports: [ClimaService],
})
export class ClimaModule {}
