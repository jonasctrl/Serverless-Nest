import { Injectable } from '@nestjs/common';

import { DatabaseFacadeService } from 'core/data-access/database-facade.service';
import { IUserProvider } from 'core/user/user.provider.abs';
import { User } from 'infrastructure/data-access/entities';
import {
  filterByProperties,
  getRawOne,
} from 'infrastructure/data-access/utils/data-access-utils/provider-utils';

@Injectable()
export class UserProvider implements IUserProvider {
  constructor(private readonly db: DatabaseFacadeService) {}

  async getUser(filters: Partial<User>, ...columns: Array<keyof User>): Promise<User | undefined> {
    if (!filters) {
      throw new Error('Invalid filtering parameters');
    }

    const connection = this.db.manager.connection;
    const queryBuilder = connection.createQueryBuilder(User, 'u');

    filterByProperties(queryBuilder, filters);

    return getRawOne(queryBuilder, columns);
  }
}
