import { Module } from '@nestjs/common';
import { OrganizationsModule } from '../organizations/organizations.module';
import { YerbaController } from './yerba.controller';
import { YerbaService } from './yerba.service';
@Module({ imports: [OrganizationsModule], controllers: [YerbaController], providers: [YerbaService] })
export class YerbaModule {}
