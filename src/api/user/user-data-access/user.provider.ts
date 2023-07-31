import { Injectable } from '@nestjs/common';
import { User } from 'infrastructure/entities';
import { DataSource, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { Find } from 'types/generic-types';

@Injectable()
export class UserProvider extends Repository<User> {
  constructor(private db: DataSource) {
    super(User, db.createEntityManager());
  }

  async getUser(filters: Partial<User>, ...columns: Array<keyof User>): Promise<Find<User>> {
    if (!filters || !Object.keys(filters).length) {
      throw new Error('Invalid filtering parameters');
    }

    const connection = this.db.createEntityManager().connection;
    const queryBuilder = connection.createQueryBuilder(User, 'u').select(columns);

    this.filterPure(queryBuilder, 'u', filters);

    return queryBuilder.getRawOne();
  }

  private async filterPure<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    alias: string,
    filters: Partial<T>,
  ): Promise<T | undefined> {
    for (const [key, value] of Object.entries(filters)) {
      queryBuilder.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
    }

    return queryBuilder.getRawOne();
  }
}
