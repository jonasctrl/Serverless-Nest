import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IJwtAuthStrategy } from 'core/auth/jwt/strategies/jwt-auth.strategy.abs';
import { DateTime } from 'luxon';
import { Strategy } from 'passport-jwt';

import { SESSION_KEY } from '../../constants/constants';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) implements IJwtAuthStrategy {
  constructor(configService: ConfigService) {
    const extractJwtFromCookie = (req: any) => {
      let token = null;

      // TODO: Token extraction unity.
      // Use token in header and extract it: jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      if (req && req.cookies) {
        token = req.cookies[SESSION_KEY];
      }
      if (!token) {
        token = req.headers.authorization?.split(' ')[1];
      }

      return token;
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    Logger.log(`Validating user [${payload.email}] request`, 'JwtAuthStrategy');

    this.validatePayload(payload);

    return payload;
  }

  private validatePayload(payload: any) {
    const { exp } = payload;

    const nowDate = DateTime.local();
    const expDate = DateTime.fromSeconds(exp);

    const diff = expDate.diff(nowDate, 'seconds').toObject();

    if (!diff.seconds || diff.seconds < 0) {
      Logger.warn('Token is expired', 'JwtAuthStrategy');
      throw new UnauthorizedException('Token is expired');
    }
  }
}
