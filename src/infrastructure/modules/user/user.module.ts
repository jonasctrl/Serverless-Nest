import { Module } from '@nestjs/common';

import { UserDataAccessModule } from './user-data-access/user.data-access.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserDataAccessModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, UserDataAccessModule],
})
export class UserModule {}
