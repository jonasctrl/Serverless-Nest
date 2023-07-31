import { Module } from '@nestjs/common';

import { UserProvider } from './user.provider';
import { UserWriter } from './user.writer';

const providers = [UserWriter, UserProvider];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class UserDataAccessModule {}
