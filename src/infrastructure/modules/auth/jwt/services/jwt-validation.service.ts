import { Injectable } from '@nestjs/common';
import { ConflictException, UnauthorizedException } from '@nestjs/common/exceptions';
import crypto from 'crypto';

import {
  HASHING_ALGORITHM,
  HASHING_ENCODING,
  HASHING_ITERATIONS,
  HASHING_KEY_LENGTH,
} from './constants';
import { IJwtValidationService } from 'core/auth/jwt/jwt-validation.service.abs';
import { User } from 'infrastructure/data-access/entities';

@Injectable()
export class JwtValidationService implements IJwtValidationService {
  public async validateCredentials(password: string, user?: User | null) {
    if (!user) {
      throw new ConflictException('User does not exist');
    }

    const isUserValid = user && user.password;
    const passwordMatch = isUserValid && (await this.compareWithSalt(password, user.password));

    if (!passwordMatch) {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  private async compareWithSalt(password: string, hash: string) {
    const [passwordHash, salt] = hash.split('.');
    const rehashedPassword = crypto
      .pbkdf2Sync(password, salt, HASHING_ITERATIONS, HASHING_KEY_LENGTH, HASHING_ALGORITHM)
      .toString(HASHING_ENCODING);

    return rehashedPassword === passwordHash;
  }
}
