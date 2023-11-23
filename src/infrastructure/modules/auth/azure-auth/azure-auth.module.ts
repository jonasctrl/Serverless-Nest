import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AzureOAuthController } from './azure-auth.controller';
import { AzureADStrategy } from './strategies/azuread.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  controllers: [AzureOAuthController],
  providers: [AzureADStrategy, ConfigService],
})
export class AzureAuthModule {}
