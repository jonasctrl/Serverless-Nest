import { Module } from '@nestjs/common';
import { IUserProvider } from 'core/user/user.provider.abs';
import { IUserWriter } from 'core/user/user.writer.abs';

import { UserProvider } from './user.provider';
import { UserWriter } from './user.writer';

@Module({
  providers: [
    {
      useClass: UserProvider,
      provide: IUserProvider,
    },
    {
      useClass: UserWriter,
      provide: IUserWriter,
    },
  ],
  exports: [
    {
      useClass: UserProvider,
      provide: IUserProvider,
    },
    {
      useClass: UserWriter,
      provide: IUserWriter,
    },
  ],
})
export class UserDataAccessModule {}
