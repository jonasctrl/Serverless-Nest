import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthModule } from './jwt/jwt-auth.module';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [UserModule, PassportModule, JwtAuthModule],
  exports: [JwtAuthModule],
})
export class AuthModule {}
