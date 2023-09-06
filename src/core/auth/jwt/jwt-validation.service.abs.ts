import { Injectable } from '@nestjs/common';
import { User } from 'infrastructure/data-access/entities';

@Injectable()
export abstract class IJwtValidationService {
  abstract validateCredentials(password: string, user?: User | null): Promise<void>;
}
