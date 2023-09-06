import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'infrastructure/modules/user/user.module';

import { JwtAuthService } from './services/jwt-auth.service';
import { JwtEncodingService } from './services/jwt-encoding.service';
import { JwtValidationService } from './services/jwt-validation.service';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtAuthController } from './jwt-auth.controller';

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
  providers: [
    JwtAuthStrategy,
    JwtAuthService,
    JwtEncodingService,
    JwtValidationService,
    ConfigService,
  ],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}
