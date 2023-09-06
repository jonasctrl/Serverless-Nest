import { Injectable } from '@nestjs/common';
import { IUserWriter } from 'core/user/user.writer.abs';
import { User } from 'infrastructure/data-access/entities';
import { AuditableEntity } from 'infrastructure/data-access/entities/base/auditableEntity';
import { PartialBy } from 'infrastructure/types/generic-types';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserWriter extends Repository<User> implements IUserWriter {
  constructor(private db: DataSource) {
    super(User, db.createEntityManager());
  }

  async createUser(user: PartialBy<User, keyof AuditableEntity>) {
    const connection = this.db.createEntityManager().connection;
    const repository = connection.getRepository(User);

    const persistedUser = repository.create(user);
    await repository.save(persistedUser);
  }
}
