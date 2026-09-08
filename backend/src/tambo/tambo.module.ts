import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { TamboController } from './tambo.controller';
import { TamboService } from './tambo.service';

@Module({
  imports: [OrganizationsModule],
  controllers: [TamboController],
  providers: [TamboService],
})
export class TamboModule {}
