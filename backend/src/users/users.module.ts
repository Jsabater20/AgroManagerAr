import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { StorageModule } from '../storage/storage.module';
import { DemoModule } from '../demo/demo.module';

@Module({
  imports: [StorageModule, DemoModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
