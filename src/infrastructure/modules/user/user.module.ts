import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDataAccessModule } from './user-data-access/user.data-access.module';
import { DataAccessModule } from 'core/data-access/data-access.module';

@Module({
  imports: [UserDataAccessModule, DataAccessModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, UserDataAccessModule],
})
export class UserModule {}
