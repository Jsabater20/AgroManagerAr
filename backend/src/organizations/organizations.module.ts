import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerModule } from '../mailer/mailer.module';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationsController } from '../organizations/organizations.controller';

@Module({
  imports: [PrismaModule, MailerModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
