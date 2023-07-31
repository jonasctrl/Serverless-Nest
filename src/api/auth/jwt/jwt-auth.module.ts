import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'api/user/user.module';

import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtAuthController } from './jwt-auth.controller';
import { JwtAuthService } from './jwt-auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, JwtModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: parseInt(configService.get('JWT_EXPIRE')!) },
      }),
    }),
  ],
  controllers: [JwtAuthController],
  providers: [JwtAuthStrategy, JwtAuthService, ConfigService],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}
