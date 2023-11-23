import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AzureAuthModule } from './azure-auth/azure-auth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';

@Global()
@Module({
  imports: [UserModule, PassportModule, JwtAuthModule, AzureAuthModule],
  exports: [JwtAuthModule],
})
export class AuthModule {}
