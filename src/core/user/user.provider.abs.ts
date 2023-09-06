import { Injectable } from '@nestjs/common';
import { User } from 'infrastructure/data-access/entities';

@Injectable()
export abstract class IUserProvider {
  abstract getUser(
    filters: Partial<User>,
    ...columns: Array<keyof User>
  ): Promise<User | undefined>;
}
