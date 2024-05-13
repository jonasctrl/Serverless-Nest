import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { S3Module } from './aws/s3/s3.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { CoreModule } from 'core/core.module';
import DatabaseModule from 'infrastructure/data-access/database.module';
import EnvironmentModule from 'infrastructure/environment/environment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    HealthModule,
    S3Module,
  ],
})
export class ApiModule {}
