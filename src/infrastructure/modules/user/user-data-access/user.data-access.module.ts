import { Module } from '@nestjs/common';

import { UserProvider } from './user.provider';
import { UserWriter } from './user.writer';
import { DataAccessModule } from 'core/data-access/data-access.module';
import { IUserProvider } from 'core/user/user.provider.abs';
import { IUserWriter } from 'core/user/user.writer.abs';

@Module({
  imports: [DataAccessModule],
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
