import { Injectable } from '@nestjs/common';

import { AuthOptions, Token } from './interfaces';
import { User } from 'infrastructure/data-access/entities';

@Injectable()
export abstract class IJwtAuthService {
  abstract login(
    request: {
      email: string;
      password: string;
    },
    options?: AuthOptions,
  ): Promise<Token>;

  abstract register(requestUser: User): Promise<void>;
}
