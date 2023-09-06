import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule from 'infrastructure/data-access/database.module';
import EnvironmentModule from 'infrastructure/environment/environment.module';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

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
