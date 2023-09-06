import { Injectable } from '@nestjs/common';
import { IUserProvider } from 'core/user/user.provider.abs';
import { User } from 'infrastructure/data-access/entities';
import {
  filterByProperties,
  getRawOne,
} from 'infrastructure/data-access/utils/data-access-utils/provider-utils';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserProvider extends Repository<User> implements IUserProvider {
  constructor(private db: DataSource) {
    super(User, db.createEntityManager());
  }

  async getUser(filters: Partial<User>, ...columns: Array<keyof User>): Promise<User | undefined> {
    if (!filters) {
      throw new Error('Invalid filtering parameters');
    }

    const connection = this.db.createEntityManager().connection;
    const queryBuilder = connection.createQueryBuilder(User, 'u');

    filterByProperties(queryBuilder, filters);

    return getRawOne(queryBuilder, columns);
  }
}
