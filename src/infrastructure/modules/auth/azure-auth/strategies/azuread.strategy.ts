import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as jwksRsa from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AzureADStrategy extends PassportStrategy(Strategy, 'AzureAD') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('AZURE_AD_TENANT_ID'),
      identityMetadata: `https://login.microsoftonline.com/${configService.get<string>(
        'AZURE_AD_TENANT_ID',
      )}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get<string>('AZURE_AD_CLIENT_ID'),
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${configService.get<string>(
          'AZURE_AD_TENANT_ID',
        )}/discovery/v2.0/keys`,
      }),
    });
  }
}
