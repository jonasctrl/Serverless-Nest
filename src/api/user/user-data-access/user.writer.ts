import { Injectable } from '@nestjs/common';
import { User } from 'infrastructure/entities';
import { AuditableEntity } from 'infrastructure/entities/base/auditableEntity';
import { DataSource, Repository } from 'typeorm';
import { PartialBy } from 'types/generic-types';

@Injectable()
export class UserWriter extends Repository<User> {
  constructor(private db: DataSource) {
    super(User, db.createEntityManager());
  }

  async createUser(user: PartialBy<User, keyof AuditableEntity>): Promise<User> {
    const connection = this.db.createEntityManager().connection;
    const repository = connection.getRepository(User);

    const persistedUser = repository.create(user);
    await repository.save(persistedUser);

    return persistedUser;
  }
}
