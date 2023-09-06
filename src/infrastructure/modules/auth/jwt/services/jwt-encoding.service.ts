import { Injectable } from '@nestjs/common';
import { IJwtEncodingService } from 'core/auth/jwt/jwt-encoding.service.abs';
import crypto from 'crypto';

import {
  HASHING_ALGORITHM,
  HASHING_ENCODING,
  HASHING_ITERATIONS,
  HASHING_KEY_LENGTH,
  RANDOM_BYTES_LENGTH,
} from './constants';

@Injectable()
export class JwtEncodingService implements IJwtEncodingService {
  public async hashPassword(password: string) {
    const salt = crypto.randomBytes(RANDOM_BYTES_LENGTH).toString(HASHING_ENCODING);
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, HASHING_ITERATIONS, HASHING_KEY_LENGTH, HASHING_ALGORITHM)
      .toString(HASHING_ENCODING);

    return this.formatHashedPassword(hashedPassword, salt);
  }

  private formatHashedPassword(hashedPassword: string, salt: string) {
    return `${hashedPassword}.${salt}`;
  }
}
