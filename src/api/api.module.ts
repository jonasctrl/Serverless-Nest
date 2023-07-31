import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import DatabaseModule from '../infrastructure/database/database.module';
import EnvironmentModule from '../infrastructure/environment/environment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
})
export class ApiModule {}
