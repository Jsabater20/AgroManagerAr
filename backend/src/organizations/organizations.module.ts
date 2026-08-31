import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerModule } from '../mailer/mailer.module';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationsController } from '../organizations/organizations.controller';
import { MemberAccessService } from './member-access.service';
import { PlanModule } from '../plan/plan.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [PrismaModule, MailerModule, PlanModule, StorageModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, MemberAccessService],
  exports: [OrganizationsService, MemberAccessService],
})
export class OrganizationsModule {}
