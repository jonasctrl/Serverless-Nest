import { Injectable } from '@nestjs/common';
import { User } from 'infrastructure/data-access/entities';

import { AuthOptions, Token } from './interfaces';

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
