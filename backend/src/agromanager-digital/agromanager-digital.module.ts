import { Module } from '@nestjs/common';
import { MailerModule } from '../mailer/mailer.module';
import { AgroManagerDigitalController } from './agromanager-digital.controller';
import { AgroManagerDigitalService } from './agromanager-digital.service';

@Module({ imports: [MailerModule], controllers: [AgroManagerDigitalController], providers: [AgroManagerDigitalService] })
export class AgroManagerDigitalModule {}
